$epaper = "C:\laragon\www\epaper"

# 1. update_studio_terbaru.zip
$staging = "$epaper\_staging_studio"
if (Test-Path $staging) { Remove-Item -Path $staging -Recurse -Force }
New-Item -ItemType Directory -Path "$staging\js" -Force | Out-Null
Copy-Item "$epaper\studio.html" "$staging\studio.html"
Copy-Item "$epaper\api.php" "$staging\api.php"
Copy-Item "$epaper\js\studio.js" "$staging\js\studio.js"

$dest1 = "$epaper\update_studio_terbaru.zip"
if (Test-Path $dest1) { Remove-Item $dest1 -Force }
Compress-Archive -Path "$staging\*" -DestinationPath $dest1 -Force
Remove-Item -Path $staging -Recurse -Force
Write-Host "update_studio_terbaru.zip created successfully."

# 2. update_scripts_only.zip
$dest2 = "$epaper\update_scripts_only.zip"
if (Test-Path $dest2) { Remove-Item $dest2 -Force }
Compress-Archive -Path "$epaper\js", "$epaper\api.php", "$epaper\studio.html", "$epaper\index.html" -DestinationPath $dest2 -Force
Write-Host "update_scripts_only.zip created successfully."

# 3. patch_vps.zip
$dest3 = "$epaper\patch_vps.zip"
if (Test-Path $dest3) { Remove-Item $dest3 -Force }
Compress-Archive -Path "$epaper\assets", "$epaper\js", "$epaper\api.php", "$epaper\favicon.ico", "$epaper\favicon.png", "$epaper\index.html", "$epaper\logo-mtsn.png", "$epaper\og-banner.jpg", "$epaper\og-icon.jpg", "$epaper\og-icon.png", "$epaper\pin_config.txt", "$epaper\studio.html" -DestinationPath $dest3 -Force
Write-Host "patch_vps.zip created successfully."
