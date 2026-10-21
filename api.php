<?php
header('Content-Type: application/json; charset=utf-8');

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
                'path' => 'pdf/' . $pub . '/' . rawurlencode($filename),
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
                echo json_encode(['success' => true, 'pub' => $pub, 'message' => "File '$filename' berhasil dihapus dari $pub."]);
            } else {
                echo json_encode(['success' => false, 'message' => "Gagal menghapus file '$filename'."]);
            }
        } else {
            echo json_encode(['success' => false, 'message' => "File tidak ditemukan atau nama tidak valid."]);
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
            // Tentukan batas kompresi cerdas:
            // - Koran 1 lembar (alqalam, korma): max 2 MB
            // - Majalah tebal (kafana ~50 hal): max 30 MB (~500 KB per halaman)
            $maxLimit = ($pub === 'kafana') ? 30 * 1024 * 1024 : 2 * 1024 * 1024;
            $opt = autoOptimizePdfFile($destination, $maxLimit);
            $msg = 'File PDF berhasil diunggah ke publikasi ' . strtoupper($pub) . '!';
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
                if ($targetW > 2400) {
                    $ratio = 2400 / $targetW;
                    $targetW = 2400;
                    $targetH = (int)round($imgH * $ratio);
                    $resized = imagecreatetruecolor($targetW, $targetH);
                    imagecopyresampled($resized, $img, 0, 0, 0, 0, $targetW, $targetH, $imgW, $imgH);
                    imagedestroy($img);
                    $img = $resized;
                }

                $bestQuality = 84;
                ob_start();
                imagejpeg($img, null, $bestQuality);
                $compJpeg = ob_get_clean();

                if (strlen($compJpeg) > 1900000) {
                    $bestQuality = 78;
                    ob_start();
                    imagejpeg($img, null, $bestQuality);
                    $compJpeg = ob_get_clean();
                }
                if (strlen($compJpeg) > 1900000) {
                    $bestQuality = 72;
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

    // 2. Jika ada multiple images atau vector text, lakukan kompresi stream in-place
    $pattern = '/(?:\/Filter\s*(?:\[\s*\/DCTDecode\s*\]|\/DCTDecode)[\s\S]*?\/Length\s+(\d+)|\/Length\s+(\d+)[\s\S]*?\/Filter\s*(?:\[\s*\/DCTDecode\s*\]|\/DCTDecode))[\s\S]*?>>\s*stream\r?\n/i';
    $pos = 0;
    $modified = false;
    $chunks = [];
    $lastEnd = 0;

    while (preg_match($pattern, $content, $m, PREG_OFFSET_CAPTURE, $pos)) {
        $headerMatch = $m[0][0];
        $headerOffset = $m[0][1];
        $headerLen = strlen($headerMatch);
        $streamStart = $headerOffset + $headerLen;
        $len = !empty($m[1][0]) ? (int)$m[1][0] : (int)$m[2][0];
        $rawJpeg = substr($content, $streamStart, $len);

        if ($len > 120 * 1024) {
            $img = @imagecreatefromstring($rawJpeg);
            if ($img) {
                $w = imagesx($img);
                $h = imagesy($img);

                if ($w > 1800) {
                    $ratio = 1800 / $w;
                    $nw = 1800;
                    $nh = (int)round($h * $ratio);
                    $res = imagecreatetruecolor($nw, $nh);
                    imagecopyresampled($res, $img, 0, 0, 0, 0, $nw, $nh, $w, $h);
                    imagedestroy($img);
                    $img = $res;
                }

                ob_start();
                imagejpeg($img, null, 78);
                $compJpeg = ob_get_clean();
                imagedestroy($img);

                if (strlen($compJpeg) < $len) {
                    $oldLenStr = (string)$len;
                    $newLenStr = (string)strlen($compJpeg);
                    $newHeader = preg_replace('/(\/Length\s+)' . preg_quote($oldLenStr, '/') . '/', '${1}' . $newLenStr, $headerMatch, 1);

                    $chunks[] = substr($content, $lastEnd, $headerOffset - $lastEnd);
                    $chunks[] = $newHeader;
                    $chunks[] = $compJpeg;

                    $lastEnd = $streamStart + $len;
                    $modified = true;
                    $pos = $lastEnd;
                    continue;
                }
            }
        }
        $pos = $streamStart + $len;
    }

    if ($modified) {
        $chunks[] = substr($content, $lastEnd);
        $newContent = implode('', $chunks);
        file_put_contents($filePath, $newContent);
        return [
            'optimized' => true,
            'mode' => 'in_place_streams',
            'original_size' => $fileSize,
            'final_size' => strlen($newContent)
        ];
    }

    return ['optimized' => false, 'reason' => 'No compression needed', 'size' => $fileSize];
}
