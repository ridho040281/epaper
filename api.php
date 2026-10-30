<?php
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('Expires: 0');

$allowedPubs = ['alqalam', 'korma', 'kafana'];
$pub = strtolower(trim($_GET['pub'] ?? $_POST['pub'] ?? 'alqalam'));
if (!in_array($pub, $allowedPubs)) {
    $pub = 'alqalam';
}

$baseDir = __DIR__ . DIRECTORY_SEPARATOR . 'pdf';
$pdfDir  = $baseDir . DIRECTORY_SEPARATOR . $pub;
if (!is_dir($pdfDir)) {
    mkdir($pdfDir, 0777, true);
}

function getAdminPin() {
    $pinFile = __DIR__ . DIRECTORY_SEPARATOR . 'pin_config.txt';
    if (file_exists($pinFile)) {
        $stored = trim(file_get_contents($pinFile));
        if (!empty($stored)) return $stored;
    }
    return '30305758';
}

function setAdminPin($newPin) {
    $pinFile = __DIR__ . DIRECTORY_SEPARATOR . 'pin_config.txt';
    return file_put_contents($pinFile, trim($newPin)) !== false;
}

$action = $_GET['action'] ?? $_POST['action'] ?? 'list';

switch ($action) {
    case 'verify_pin':
        $raw = file_get_contents('php://input');
        $json = json_decode($raw, true);
        $inputPin = trim($json['pin'] ?? $_POST['pin'] ?? '');
        $currentPin = getAdminPin();
        if ($inputPin === $currentPin) {
            echo json_encode(['success' => true, 'message' => 'PIN valid']);
        } else {
            echo json_encode(['success' => false, 'message' => 'PIN salah. Silakan coba lagi.']);
        }
        exit;
        break;

    case 'change_pin':
        $raw = file_get_contents('php://input');
        $json = json_decode($raw, true);
        $currentInput = trim($json['current_pin'] ?? $_POST['current_pin'] ?? '');
        $newPin = trim($json['new_pin'] ?? $_POST['new_pin'] ?? '');
        $savedPin = getAdminPin();

        if ($currentInput !== $savedPin) {
            echo json_encode(['success' => false, 'message' => 'PIN lama salah.']);
            exit;
        }

        if (strlen($newPin) < 4) {
            echo json_encode(['success' => false, 'message' => 'PIN baru minimal harus 4 karakter/angka.']);
            exit;
        }

        if (setAdminPin($newPin)) {
            echo json_encode(['success' => true, 'message' => 'PIN pengelola berhasil diubah!']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Gagal menyimpan PIN baru ke server.']);
        }
        exit;
        break;

    case 'log':
        $data = file_get_contents('php://input');
        file_put_contents(__DIR__ . '/browser_log.txt', date('Y-m-d H:i:s') . ' ' . $data . PHP_EOL, FILE_APPEND);
        echo json_encode(['success' => true]);
        break;

    case 'get_pdf':
        $filename = basename($_GET['file'] ?? '');
        $targetFile = $pdfDir . DIRECTORY_SEPARATOR . $filename;
        if (!file_exists($targetFile) && file_exists($baseDir . DIRECTORY_SEPARATOR . $filename)) {
            $targetFile = $baseDir . DIRECTORY_SEPARATOR . $filename;
        }
        if (!empty($filename) && file_exists($targetFile)) {
            $content = file_get_contents($targetFile);
            echo json_encode([
                'success' => true,
                'pub' => $pub,
                'filename' => $filename,
                'base64' => base64_encode($content)
            ]);
            exit;
        } else {
            echo json_encode(['success' => false, 'message' => 'File tidak ditemukan']);
            exit;
        }
        break;

    case 'download':
    case 'view':
        $filename = basename($_GET['file'] ?? '');
        if (!empty($filename) && !str_ends_with(strtolower($filename), '.pdf')) {
            if (file_exists($pdfDir . DIRECTORY_SEPARATOR . $filename . '.pdf')) {
                $filename .= '.pdf';
            } elseif (file_exists($baseDir . DIRECTORY_SEPARATOR . $filename . '.pdf')) {
                $filename .= '.pdf';
            }
        }
        $targetFile = $pdfDir . DIRECTORY_SEPARATOR . $filename;
        if (!file_exists($targetFile) && file_exists($baseDir . DIRECTORY_SEPARATOR . $filename)) {
            $targetFile = $baseDir . DIRECTORY_SEPARATOR . $filename;
        }
        if (!empty($filename) && file_exists($targetFile)) {
            while (ob_get_level()) {
                ob_end_clean();
            }
            $disposition = ($action === 'download') ? 'attachment' : 'inline';
            header('Content-Type: application/pdf', true);
            header('Content-Length: ' . filesize($targetFile));
            header('Content-Disposition: ' . $disposition . '; filename="' . $filename . '"');
            header('Cache-Control: private, max-age=0, must-revalidate');
            header('Pragma: public');
            readfile($targetFile);
            exit;
        } else {
            http_response_code(404);
            header('Content-Type: application/json; charset=utf-8', true);
            echo json_encode(['success' => false, 'message' => "File '$filename' tidak ditemukan di server."]);
            exit;
        }
        break;

    case 'list':
        $files = glob($pdfDir . DIRECTORY_SEPARATOR . '*.pdf');
        // Sort naturally (0001, 0002, 0003...)
        natsort($files);
        $result = [];
        foreach ($files as $file) {
            $filename = basename($file);
            $pageCount = 1;
            $fp = @fopen($file, 'rb');
            if ($fp) {
                $full = fread($fp, min(filesize($file), 15 * 1024 * 1024));
                if (preg_match_all('/\/Type\s*\/Page[^s]/', $full, $m2)) {
                    $pageCount = count($m2[0]);
                } elseif (preg_match('/\/Count\s+(\d+)/', $full, $m)) {
                    $pageCount = (int)$m[1];
                }
                fclose($fp);
            }
            $result[] = [
                'name' => $filename,
                'pub' => $pub,
                'path' => 'pdf/' . $pub . '/' . $filename,
                'url' => 'pdf/' . $pub . '/' . rawurlencode($filename),
                'size' => round(filesize($file) / 1024 / 1024, 2) . ' MB',
                'pages' => max(1, $pageCount),
                'date' => date('d M Y H:i', filemtime($file))
            ];
        }
        echo json_encode(['success' => true, 'pub' => $pub, 'files' => array_values($result)]);
        break;

    case 'delete':
        $filename = $_POST['filename'] ?? '';
        // Sanitize filename to prevent directory traversal
        $filename = basename($filename);
        $targetFile = $pdfDir . DIRECTORY_SEPARATOR . $filename;

        if (!empty($filename) && file_exists($targetFile)) {
            if (unlink($targetFile)) {
                echo json_encode(['success' => true, 'pub' => $pub, 'message' => "File '$filename' berhasil dihapus permanen dari arsip $pub."]);
            } else {
                echo json_encode(['success' => false, 'message' => "Gagal menghapus file '$filename' dari server."]);
            }
        } else {
            echo json_encode(['success' => false, 'message' => "File '$filename' tidak ditemukan atau nama tidak valid."]);
        }
        break;

    case 'replace_pdf':
        if (!isset($_FILES['pdf_file']) || $_FILES['pdf_file']['error'] !== UPLOAD_ERR_OK) {
            echo json_encode(['success' => false, 'message' => 'Gagal menerima file PDF yang diperbarui.']);
            exit;
        }

        $filename = basename($_POST['filename'] ?? $_FILES['pdf_file']['name'] ?? '');
        $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
        if ($ext !== 'pdf') {
            echo json_encode(['success' => false, 'message' => 'Format file harus PDF.']);
            exit;
        }

        $destination = $pdfDir . DIRECTORY_SEPARATOR . $filename;
        if (move_uploaded_file($_FILES['pdf_file']['tmp_name'], $destination)) {
            echo json_encode([
                'success' => true,
                'message' => "File '$filename' berhasil diperbarui di server $pub.",
                'pub' => $pub,
                'filename' => $filename
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => "Gagal menyimpan pembaruan file '$filename' di server."]);
        }
        break;

    case 'upload':
        if (!isset($_FILES['pdf_file']) || $_FILES['pdf_file']['error'] !== UPLOAD_ERR_OK) {
            echo json_encode(['success' => false, 'message' => 'Gagal mengunggah file.']);
            exit;
        }

        $file = $_FILES['pdf_file'];
        $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

        if ($ext !== 'pdf') {
            echo json_encode(['success' => false, 'message' => 'Hanya file format PDF yang diperbolehkan.']);
            exit;
        }

        $safeName = basename($file['name']);
        $destination = $pdfDir . DIRECTORY_SEPARATOR . $safeName;

        if (move_uploaded_file($file['tmp_name'], $destination)) {
            // Pertahankan 100% ketajaman & kejernihan teks asli seperti file lokal (hingga 35 MB)
            // Tidak mengompresi paksa agar kualitas teks tidak terdegradasi
            $fileSize = filesize($destination);
            $maxLimit = 35 * 1024 * 1024;
            $opt = null;
            if ($fileSize > $maxLimit) {
                $opt = autoOptimizePdfFile($destination, $maxLimit);
            }
            $msg = 'File PDF berhasil diunggah ke publikasi ' . strtoupper($pub) . '! (Kualitas asli 100% tajam dipertahankan)';
            if ($opt && !empty($opt['optimized'])) {
                $origMb = round($opt['original_size'] / 1024 / 1024, 2);
                $finalMb = round($opt['final_size'] / 1024 / 1024, 2);
                $msg .= " (Auto-kompres: {$origMb} MB ➔ {$finalMb} MB)";
            }

            echo json_encode([
                'success' => true,
                'message' => $msg,
                'pub' => $pub,
                'filename' => $safeName,
                'optimized' => $opt,
                'path' => 'pdf/' . $pub . '/' . rawurlencode($safeName)
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Gagal menyimpan file di server.']);
        }
        break;

    case 'optimize':
        $filename = basename($_POST['filename'] ?? $_GET['file'] ?? '');
        $targetFile = $pdfDir . DIRECTORY_SEPARATOR . $filename;
        if (!empty($filename) && file_exists($targetFile)) {
            $opt = autoOptimizePdfFile($targetFile, 2 * 1024 * 1024);
            if ($opt && !empty($opt['optimized'])) {
                $origMb = round($opt['original_size'] / 1024 / 1024, 2);
                $finalMb = round($opt['final_size'] / 1024 / 1024, 2);
                echo json_encode([
                    'success' => true,
                    'message' => "File '$filename' berhasil dioptimasi ({$origMb} MB ➔ {$finalMb} MB)!",
                    'details' => $opt
                ]);
            } else {
                echo json_encode([
                    'success' => true,
                    'message' => "Ukuran file '$filename' sudah optimal (di bawah 2 MB).",
                    'details' => $opt
                ]);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'File tidak ditemukan.']);
        }
        break;

    case 'upload_cover':
        if (!isset($_FILES['cover_file']) || $_FILES['cover_file']['error'] !== UPLOAD_ERR_OK) {
            echo json_encode(['success' => false, 'message' => 'Tidak ada file gambar yang diunggah.']);
            exit;
        }

        $file = $_FILES['cover_file'];
        $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        $allowedExts = ['jpg', 'jpeg', 'png', 'webp'];

        if (!in_array($ext, $allowedExts)) {
            echo json_encode(['success' => false, 'message' => 'Format file sampul harus berupa JPG, PNG, atau WEBP.']);
            exit;
        }

        $coversDir = __DIR__ . DIRECTORY_SEPARATOR . 'covers';
        if (!is_dir($coversDir)) {
            mkdir($coversDir, 0777, true);
        }

        $targetFile = $coversDir . DIRECTORY_SEPARATOR . $pub . '.jpg';

        if (in_array($ext, ['png', 'webp']) && extension_loaded('gd')) {
            $srcImg = ($ext === 'png') ? @imagecreatefrompng($file['tmp_name']) : @imagecreatefromwebp($file['tmp_name']);
            if ($srcImg) {
                $w = imagesx($srcImg);
                $h = imagesy($srcImg);
                $bg = imagecreatetruecolor($w, $h);
                $white = imagecolorallocate($bg, 255, 255, 255);
                imagefilledrectangle($bg, 0, 0, $w, $h, $white);
                imagecopy($bg, $srcImg, 0, 0, 0, 0, $w, $h);
                imagejpeg($bg, $targetFile, 92);
                imagedestroy($bg);
                imagedestroy($srcImg);
            } else {
                move_uploaded_file($file['tmp_name'], $targetFile);
            }
        } else {
            move_uploaded_file($file['tmp_name'], $targetFile);
        }

        echo json_encode([
            'success' => true,
            'message' => "Sampul $pub berhasil diperbarui!",
            'pub' => $pub,
            'cover_url' => "covers/{$pub}.jpg?t=" . time()
        ]);
        break;

    case 'save_cover_base64':
        $raw = file_get_contents('php://input');
        $json = json_decode($raw, true);
        $base64 = $json['base64'] ?? '';
        if (empty($base64)) {
            echo json_encode(['success' => false, 'message' => 'Data gambar kosong.']);
            exit;
        }
        $base64 = preg_replace('/^data:image\/\w+;base64,/', '', $base64);
        $imgData = base64_decode($base64);
        if ($imgData === false) {
            echo json_encode(['success' => false, 'message' => 'Data base64 tidak valid.']);
            exit;
        }
        $coversDir = __DIR__ . DIRECTORY_SEPARATOR . 'covers';
        if (!is_dir($coversDir)) {
            mkdir($coversDir, 0777, true);
        }
        $targetFile = $coversDir . DIRECTORY_SEPARATOR . $pub . '.jpg';
        file_put_contents($targetFile, $imgData);
        echo json_encode([
            'success' => true,
            'message' => "Sampul $pub berhasil disimpan!",
            'pub' => $pub,
            'cover_url' => "covers/{$pub}.jpg?t=" . time()
        ]);
        break;

    case 'upload_template_header':
    case 'upload_header':
        if (!isset($_FILES['header_file']) || $_FILES['header_file']['error'] !== UPLOAD_ERR_OK) {
            $errCode = $_FILES['header_file']['error'] ?? 'no file';
            echo json_encode(['success' => false, 'message' => "Gagal mengunggah file header (Kode: $errCode)."]);
            exit;
        }
        $file = $_FILES['header_file'];
        $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        $allowedExts = ['jpg', 'jpeg', 'png', 'webp'];
        if (!in_array($ext, $allowedExts)) {
            echo json_encode(['success' => false, 'message' => 'Format file harus JPG, PNG, atau WEBP.']);
            exit;
        }

        // Folder covers dipastikan writable oleh server web
        $targetDir = __DIR__ . DIRECTORY_SEPARATOR . 'covers';
        if (!is_dir($targetDir)) {
            @mkdir($targetDir, 0777, true);
            @chmod($targetDir, 0777);
        }

        // Gunakan nama unik bertimestamp agar tidak terhambat permission file lama dan anti-cache
        $destName = 'master_custom_header_' . time() . '.' . $ext;
        $destination = $targetDir . DIRECTORY_SEPARATOR . $destName;

        $moved = @move_uploaded_file($file['tmp_name'], $destination);
        if (!$moved) {
            $data = @file_get_contents($file['tmp_name']);
            if ($data && @file_put_contents($destination, $data) !== false) {
                $moved = true;
            }
        }

        if ($moved) {
            @chmod($destination, 0666);
            
            // Simpan info file aktif ke JSON
            $infoFile = $targetDir . DIRECTORY_SEPARATOR . 'active_master_header.json';
            @file_put_contents($infoFile, json_encode([
                'file' => 'covers/' . $destName,
                'time' => time()
            ]));
            @chmod($infoFile, 0666);

            echo json_encode([
                'success' => true,
                'message' => 'Header master berhasil disimpan di server!',
                'header_url' => 'covers/' . $destName . '?t=' . time()
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Gagal memindahkan file header ke folder server.']);
        }
        exit;
        break;

    case 'get_template_header':
        $found = null;
        $targetDir = __DIR__ . DIRECTORY_SEPARATOR . 'covers';
        $infoFile = $targetDir . DIRECTORY_SEPARATOR . 'active_master_header.json';
        
        // 1. Cek info file aktif dari JSON
        if (file_exists($infoFile)) {
            $info = @json_decode(@file_get_contents($infoFile), true);
            if (!empty($info['file'])) {
                $abs = __DIR__ . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $info['file']);
                if (file_exists($abs)) {
                    $found = $info['file'] . '?t=' . filemtime($abs);
                }
            }
        }

        // 2. Fallback cek file master_custom_header_* terbaru
        if (!$found && is_dir($targetDir)) {
            $files = glob($targetDir . DIRECTORY_SEPARATOR . 'master_custom_header_*.*');
            if (!empty($files)) {
                // Urutkan berdasarkan waktu modifikasi terbaru
                usort($files, function($a, $b) { return filemtime($b) - filemtime($a); });
                $latest = $files[0];
                $basename = basename($latest);
                $found = 'covers/' . $basename . '?t=' . filemtime($latest);
            }
        }

        echo json_encode([
            'success' => true,
            'has_custom_header' => ($found !== null),
            'header_url' => $found
        ]);
        exit;
        break;

    case 'reset_template_header':
        $targetDir = __DIR__ . DIRECTORY_SEPARATOR . 'covers';
        $infoFile = $targetDir . DIRECTORY_SEPARATOR . 'active_master_header.json';
        if (file_exists($infoFile)) @unlink($infoFile);
        
        $files = glob($targetDir . DIRECTORY_SEPARATOR . 'master_custom_header*.*');
        if (!empty($files)) {
            foreach ($files as $f) {
                @unlink($f);
            }
        }
        echo json_encode(['success' => true, 'message' => 'Header master kustom telah dibersihkan.']);
        exit;
        break;

    default:
        echo json_encode(['success' => false, 'message' => 'Aksi tidak dikenal.']);
        break;
}

/**
 * Auto-Compress PDF agar ukuran maksimal ~2 MB
 * Mendukung PDF 1-halaman raster (full JPEG) maupun hybrid vector/gambar.
 */
function autoOptimizePdfFile($filePath, $maxSizeBytes = 2097152) {
    if (!file_exists($filePath) || !extension_loaded('gd')) {
        return false;
    }

    $fileSize = filesize($filePath);
    if ($fileSize <= $maxSizeBytes) {
        return ['optimized' => false, 'reason' => 'Already within 2 MB limit', 'size' => $fileSize];
    }

    $content = file_get_contents($filePath);

    // 1. Cek apakah ini PDF 1-halaman dengan 1 gambar utama
    $reImage = '/\/Type\s*\/XObject[\s\S]*?\/Subtype\s*\/Image/i';
    $imgCount = preg_match_all($reImage, $content);

    if ($imgCount === 1) {
        $startMarker = "\xFF\xD8\xFF";
        $start = strpos($content, $startMarker);
        if ($start !== false) {
            $endStreamPos = strpos($content, "endstream", $start);
            if ($endStreamPos === false) $endStreamPos = strlen($content);
            $jpegData = substr($content, $start, $endStreamPos - $start);
            $lastD9 = strrpos($jpegData, "\xFF\xD9");
            if ($lastD9 !== false) {
                $jpegData = substr($jpegData, 0, $lastD9 + 2);
            }

            $img = @imagecreatefromstring($jpegData);
            if ($img) {
                $pageW = 841.89; // Default A3 (pt)
                $pageH = 1190.55;
                if (preg_match('/\/MediaBox\s*\[\s*([-\d\.]+)\s+([-\d\.]+)\s+([-\d\.]+)\s+([-\d\.]+)\s*\]/', $content, $mb)) {
                    $w = abs((float)$mb[3] - (float)$mb[1]);
                    $h = abs((float)$mb[4] - (float)$mb[2]);
                    if ($w > 10 && $h > 10) {
                        $pageW = $w;
                        $pageH = $h;
                    }
                }

                $imgW = imagesx($img);
                $imgH = imagesy($img);

                $targetW = $imgW;
                $targetH = $imgH;
                if ($targetW > 2800) {
                    $ratio = 2800 / $targetW;
                    $targetW = 2800;
                    $targetH = (int)round($imgH * $ratio);
                    $resized = imagecreatetruecolor($targetW, $targetH);
                    imagecopyresampled($resized, $img, 0, 0, 0, 0, $targetW, $targetH, $imgW, $imgH);
                    imagedestroy($img);
                    $img = $resized;
                }

                $bestQuality = 90;
                ob_start();
                imagejpeg($img, null, $bestQuality);
                $compJpeg = ob_get_clean();

                if (strlen($compJpeg) > 2800000) {
                    $bestQuality = 85;
                    ob_start();
                    imagejpeg($img, null, $bestQuality);
                    $compJpeg = ob_get_clean();
                }
                if (strlen($compJpeg) > 2800000) {
                    $bestQuality = 80;
                    ob_start();
                    imagejpeg($img, null, $bestQuality);
                    $compJpeg = ob_get_clean();
                }
                imagedestroy($img);

                if (strlen($compJpeg) < strlen($jpegData)) {
                    $wStr = number_format($pageW, 4, '.', '');
                    $hStr = number_format($pageH, 4, '.', '');
                    $streamContent = "q\n{$wStr} 0 0 {$hStr} 0 0 cm\n/Im1 Do\nQ\n";
                    $streamLen = strlen($streamContent);
                    $compJpegLen = strlen($compJpeg);

                    $pdf = "%PDF-1.4\n%\xE2\xE3\xCF\xD3\n";
                    $offsets = [];

                    $offsets[1] = strlen($pdf);
                    $pdf .= "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n";

                    $offsets[2] = strlen($pdf);
                    $pdf .= "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n";

                    $offsets[3] = strlen($pdf);
                    $pdf .= "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 {$wStr} {$hStr}] /Resources << /ProcSet [/PDF /ImageC] /XObject << /Im1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n";

                    $offsets[4] = strlen($pdf);
                    $pdf .= "4 0 obj\n<< /Type /XObject /Subtype /Image /Width {$targetW} /Height {$targetH} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length {$compJpegLen} >>\nstream\n";
                    $pdf .= $compJpeg . "\nendstream\nendobj\n";

                    $offsets[5] = strlen($pdf);
                    $pdf .= "5 0 obj\n<< /Length {$streamLen} >>\nstream\n{$streamContent}endstream\nendobj\n";

                    $xrefOffset = strlen($pdf);
                    $pdf .= "xref\n0 6\n";
                    $pdf .= "0000000000 65535 f \r\n";
                    for ($i = 1; $i <= 5; $i++) {
                        $pdf .= sprintf("%010d 00000 n \r\n", $offsets[$i]);
                    }
                    $pdf .= "trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n{$xrefOffset}\n%%EOF\n";

                    file_put_contents($filePath, $pdf);
                    return [
                        'optimized' => true,
                        'mode' => 'single_image',
                        'original_size' => $fileSize,
                        'final_size' => strlen($pdf),
                        'quality' => $bestQuality
                    ];
                }
            }
        }
    }

    // 2. Untuk dokumen multi-gambar, majalah, atau naskah vektor: pertahankan 100% struktur asli
    // Jangan ubah stream in-place karena dapat merusak profil warna ICC (CMYK) dan tabel xref PDF!
    return ['optimized' => false, 'reason' => 'Preserved original vector/multi-image PDF intact', 'size' => $fileSize];
}
