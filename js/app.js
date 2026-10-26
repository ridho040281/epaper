/**
 * AL QALAM E-Paper 3D Flipbook Viewer
 * Built with Tailwind CSS, StPageFlip, and Mozilla PDF.js
 * Enhanced Edition: Fast Base64 Stream, Canvas 2D Engine, Page Deletion & File Management
 */

// Configure PDF.js Worker
if (window.pdfjsLib) {
  window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'js/pdf.worker.min.js';
}

const PUBLICATIONS = {
  alqalam: {
    id: 'alqalam',
    name: 'AL QALAM',
    badge: 'Literasi GTK',
    titlePrefix: 'AL QALAM',
    fullName: 'AL QALAM (Aksi Literasi - Qudwah Amanah Lintas Aksara Madrasah)',
    themeColor: 'emerald',
    activeClass: 'bg-emerald-600 text-white shadow',
    icon: 'newspaper',
    badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
  },
  korma: {
    id: 'korma',
    name: 'KORMA',
    badge: 'Koran Madrasah',
    titlePrefix: 'KORMA',
    fullName: 'KORMA (Koran Madrasah - MTsN 1 Blitar)',
    themeColor: 'teal',
    activeClass: 'bg-teal-600 text-white shadow',
    icon: 'book-open',
    badgeClass: 'bg-teal-500/20 text-teal-300 border-teal-500/30'
  },
  kafana: {
    id: 'kafana',
    name: 'KAFANA',
    badge: 'Buletin Madrasah',
    titlePrefix: 'KAFANA',
    fullName: 'Buletin KAFANA - MTsN 1 Blitar',
    themeColor: 'amber',
    activeClass: 'bg-amber-600 text-white shadow',
    icon: 'file-text',
    badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
  }
};

class EPaperApp {
  constructor() {
    this.pdfDoc        = null;
    this.pageFlip      = null;
    this.totalPages    = 0;
    this.currentPage   = 0;
    this.pageImages    = [];   // Array of { pageNumber, dataUrl, width, height, aspectRatio }
    this.soundEnabled  = true;
    this.audioCtx      = null;
    this.isRendering   = false;
    this.zoomScale     = 1.0;
    this.isPanning     = false;
    this.panStart      = { x: 0, y: 0 };
    this.currentPan    = { x: 0, y: 0 };
    this.currentPdfName = '';
    this.currentPdfUrl  = '';
    this.currentLocalFile = null;
    this.isShelfActive = true;

    // Deteksi publikasi aktif dari parameter URL (?pub=alqalam | korma | kafana)
    const urlParams = new URLSearchParams(window.location.search);
    const pubParam = (urlParams.get('pub') || urlParams.get('koran') || '').toLowerCase();

    this.initElements();
    this.initEventListeners();

    if (PUBLICATIONS[pubParam]) {
      this.currentPublication = pubParam;
      this.openPublication(pubParam, false);
    } else {
      this.currentPublication = 'alqalam';
      this.showShelf(false);
    }
  }

  // ─────────────────────────────────────────────────────────
  //  Init DOM Elements
  // ─────────────────────────────────────────────────────────
  initElements() {
    this.shelfView       = document.getElementById('shelf-view');
    this.readerView      = document.getElementById('reader-view');
    this.btnBackShelf    = document.getElementById('btn-back-shelf');
    this.btnShelfManage  = document.getElementById('btn-shelf-manage');
    this.btnSecretAdmin  = document.getElementById('btn-secret-admin');

    // PIN Modal Elements
    this.pinModal             = document.getElementById('pin-modal');
    this.formVerifyPin        = document.getElementById('form-verify-pin');
    this.inputAdminPin        = document.getElementById('input-admin-pin');
    this.btnTogglePinEye      = document.getElementById('btn-toggle-pin-visibility');
    this.iconPinEye           = document.getElementById('icon-pin-eye');
    this.pinErrorMsg          = document.getElementById('pin-error-msg');
    this.btnCancelPin         = document.getElementById('btn-cancel-pin');

    // Change PIN Elements
    this.btnToggleChangePin   = document.getElementById('btn-toggle-change-pin');
    this.changePinPanel       = document.getElementById('change-pin-panel');
    this.btnCloseChangePin    = document.getElementById('btn-close-change-pin');
    this.formChangePin        = document.getElementById('form-change-pin');
    this.inputOldPin          = document.getElementById('input-old-pin');
    this.inputNewPin          = document.getElementById('input-new-pin');
    this.inputConfirmPin      = document.getElementById('input-confirm-pin');
    this.changePinMsg         = document.getElementById('change-pin-msg');

    this.container       = document.getElementById('flipbook-container');
    this.bookElement     = document.getElementById('flipbook');
    this.loadingOverlay  = document.getElementById('loading-overlay');
    this.loadingText     = document.getElementById('loading-text');
    this.progressBar     = document.getElementById('loading-progress-bar');

    // Header controls
    this.pageIndicator   = document.getElementById('page-indicator');
    this.pdfTitle        = document.getElementById('pdf-title');
    this.btnClosePdf     = document.getElementById('btn-close-pdf');
    this.btnPrev         = document.getElementById('btn-prev');
    this.btnNext         = document.getElementById('btn-next');
    this.btnFirst        = document.getElementById('btn-first');
    this.btnLast         = document.getElementById('btn-last');
    this.btnSound        = document.getElementById('btn-sound');
    this.btnFullscreen   = document.getElementById('btn-fullscreen');
    this.btnThumbnails   = document.getElementById('btn-thumbnails');
    this.btnZoom         = document.getElementById('btn-zoom');
    this.btnDownload     = document.getElementById('btn-download');
    this.fileInput       = document.getElementById('file-input');
    this.btnManageEditions = document.getElementById('btn-manage-editions');
    this.btnCombineAll     = document.getElementById('btn-combine-all');
    this.btnModalCombineAll = document.getElementById('btn-modal-combine-all');

    // Thumbnails Drawer
    this.thumbnailDrawer = document.getElementById('thumbnail-drawer');
    this.thumbnailList   = document.getElementById('thumbnail-list');

    // Editions Modal
    this.editionsModal        = document.getElementById('editions-modal');
    this.btnCloseEditions     = document.getElementById('btn-close-editions');
    this.editionsFileList     = document.getElementById('editions-file-list');
    this.formUploadPdf        = document.getElementById('form-upload-pdf');
    this.inputModalPdf        = document.getElementById('input-modal-pdf');
    this.inputModalCover      = document.getElementById('input-modal-cover');
    this.btnModalUsePdfCover  = document.getElementById('btn-modal-use-pdf-cover');
    this.coverModalPubName    = document.getElementById('cover-modal-pub-name');

    // Download Modal Elements
    this.downloadModal               = document.getElementById('download-modal');
    this.btnCloseDownload            = document.getElementById('btn-close-download');
    this.btnCloseDownloadFooter      = document.getElementById('btn-close-download-footer');
    this.btnDownloadCombinedAction   = document.getElementById('btn-download-combined-action');
    this.btnDownloadActiveAction     = document.getElementById('btn-download-active-action');
    this.downloadActiveSingleSection = document.getElementById('download-active-single-section');
    this.downloadActiveFilename      = document.getElementById('download-active-filename');
    this.downloadPageCount           = document.getElementById('download-page-count');
    this.downloadCombinedDesc        = document.getElementById('download-combined-desc');
    this.downloadServerFilesList     = document.getElementById('download-server-files-list');
    this.downloadServerCount         = document.getElementById('download-server-count');

    // Zoom Modal
    this.zoomModal           = document.getElementById('zoom-modal');
    this.zoomCanvasContainer = document.getElementById('zoom-canvas-container');
    this.zoomPageSelect      = document.getElementById('zoom-page-select');
    this.btnZoomPrevPage     = document.getElementById('btn-zoom-prev-page');
    this.btnZoomNextPage     = document.getElementById('btn-zoom-next-page');
    this.zoomInBtn           = document.getElementById('btn-zoom-in');
    this.zoomOutBtn          = document.getElementById('btn-zoom-out');
    this.zoomResetBtn        = document.getElementById('btn-zoom-reset');
    this.zoomCloseBtn        = document.getElementById('btn-zoom-close');
    this.zoomLevelLabel      = document.getElementById('zoom-level-label');

    // Drag-Drop Overlay
    this.dragOverlay = document.getElementById('drag-overlay');
  }

  // ─────────────────────────────────────────────────────────
  //  Event Listeners
  // ─────────────────────────────────────────────────────────
  initEventListeners() {
    this.btnPrev?.addEventListener('click',  () => this.pageFlip?.flipPrev());
    this.btnNext?.addEventListener('click',  () => this.pageFlip?.flipNext());
    this.btnFirst?.addEventListener('click', () => this.pageFlip?.flip(0));
    this.btnLast?.addEventListener('click',  () => this.pageFlip?.flip(this.totalPages - 1));

    this.btnClosePdf?.addEventListener('click', () => this.closeDocument());

    this.btnSound?.addEventListener('click', () => {
      this.soundEnabled = !this.soundEnabled;
      this.updateSoundIcon();
    });

    this.btnFullscreen?.addEventListener('click', () => this.toggleFullscreen());

    this.btnThumbnails?.addEventListener('click', () => {
      this.thumbnailDrawer?.classList.toggle('translate-y-full');
    });

    this.btnZoom?.addEventListener('click', () => this.openZoomModal());
    this.zoomCloseBtn?.addEventListener('click', () => this.closeZoomModal());

    this.btnZoomPrevPage?.addEventListener('click', () => {
      if (this.currentPage > 0) {
        this.renderZoomPage(this.currentPage - 1);
      }
    });
    this.btnZoomNextPage?.addEventListener('click', () => {
      if (this.currentPage < this.pageImages.length - 1) {
        this.renderZoomPage(this.currentPage + 1);
      }
    });

    this.zoomInBtn?.addEventListener('click',   () => this.setZoom(this.zoomScale + 0.3));
    this.zoomOutBtn?.addEventListener('click',  () => this.setZoom(this.zoomScale - 0.3));
    this.zoomResetBtn?.addEventListener('click',() => this.setZoom(1.0, true));
    this.zoomPageSelect?.addEventListener('change', (e) => {
      this.renderZoomPage(parseInt(e.target.value, 10));
    });

    // Panning & Gestures in Zoom Modal (Mouse & Touch for Mobile)
    let initialPinchDistance = null;
    let initialPinchScale = 1.0;
    let lastTapTime = 0;
    let isPinching = false;
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    const getTouchDist = (touches) => {
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    // Mouse Panning
    this.zoomCanvasContainer?.addEventListener('mousedown', (e) => {
      this.isPanning = true;
      this.panStart  = { x: e.clientX - this.currentPan.x, y: e.clientY - this.currentPan.y };
      this.zoomCanvasContainer.style.cursor = 'grabbing';
    });
    window.addEventListener('mousemove', (e) => {
      if (!this.isPanning) return;
      this.currentPan = { x: e.clientX - this.panStart.x, y: e.clientY - this.panStart.y };
      this.applyPanZoomTransform(true);
    });
    window.addEventListener('mouseup', () => {
      if (this.isPanning) {
        this.isPanning = false;
        if (this.zoomCanvasContainer) this.zoomCanvasContainer.style.cursor = 'grab';
      }
    });

    // Touch Controller: Pinch-to-zoom, Pan, Double-tap, and 1-finger Swipe for Mobile
    this.zoomModal?.addEventListener('touchstart', (e) => {
      // Don't intercept touches on buttons, selects, or header controls
      if (e.target.closest('button, select, a, input')) return;

      if (e.touches.length === 1) {
        const t = e.touches[0];
        touchStartX = t.clientX;
        touchStartY = t.clientY;
        touchStartTime = Date.now();
        isPinching = false;

        // Double-tap detector (toggles between 100% and 200%)
        const now = Date.now();
        if (now - lastTapTime < 320) {
          e.preventDefault();
          const target = this.zoomScale > 1.2 ? 1.0 : 2.0;
          this.setZoom(target, target === 1.0, false);
          lastTapTime = 0;
          return;
        }
        lastTapTime = now;

        if (this.zoomScale > 1.05) {
          this.isPanning = true;
          this.panStart = {
            x: t.clientX - this.currentPan.x,
            y: t.clientY - this.currentPan.y
          };
        } else {
          this.isPanning = false;
        }
      } else if (e.touches.length === 2) {
        e.preventDefault();
        isPinching = true;
        this.isPanning = false;
        initialPinchDistance = getTouchDist(e.touches);
        initialPinchScale = this.zoomScale;
      }
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
      if (!this.zoomModal || this.zoomModal.classList.contains('hidden')) return;

      if (e.touches.length === 2 && isPinching && initialPinchDistance) {
        e.preventDefault();
        const dist = getTouchDist(e.touches);
        const factor = dist / initialPinchDistance;
        const newScale = initialPinchScale * factor;
        this.setZoom(newScale, false, true); // instant = true, smooth 60fps tracking
      } else if (e.touches.length === 1 && this.isPanning && this.zoomScale > 1.05) {
        e.preventDefault();
        const t = e.touches[0];
        this.currentPan = {
          x: t.clientX - this.panStart.x,
          y: t.clientY - this.panStart.y
        };
        this.applyPanZoomTransform(true); // instant = true
      }
    }, { passive: false });

    window.addEventListener('touchend', (e) => {
      if (!this.zoomModal || this.zoomModal.classList.contains('hidden')) return;

      if (e.touches.length === 0) {
        if (isPinching) {
          isPinching = false;
          initialPinchDistance = null;
          // Smooth snap if close to 100%
          if (this.zoomScale <= 1.08) {
            this.setZoom(1.0, true, false);
          }
          return;
        }

        if (this.isPanning) {
          this.isPanning = false;
        }

        // 1-Finger horizontal swipe navigation between pages (only at 100% zoom)
        if (this.zoomScale <= 1.05 && e.changedTouches && e.changedTouches.length === 1) {
          const t = e.changedTouches[0];
          const deltaX = t.clientX - touchStartX;
          const deltaY = t.clientY - touchStartY;
          const elapsed = Date.now() - touchStartTime;

          // Swipe threshold: > 40px horizontal, distinctly horizontal (|dx| > 1.3 * |dy|), within 500ms
          if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3 && elapsed < 500) {
            if (deltaX < 0) {
              // Swipe Left -> Next Page
              if (this.currentPage < this.pageImages.length - 1) {
                this.renderZoomPage(this.currentPage + 1);
              }
            } else {
              // Swipe Right -> Previous Page
              if (this.currentPage > 0) {
                this.renderZoomPage(this.currentPage - 1);
              }
            }
          }
        }
      } else if (e.touches.length === 1) {
        isPinching = false;
        initialPinchDistance = null;
        if (this.zoomScale > 1.05) {
          this.isPanning = true;
          this.panStart = {
            x: e.touches[0].clientX - this.currentPan.x,
            y: e.touches[0].clientY - this.currentPan.y
          };
        }
      }
    });

    window.addEventListener('touchcancel', () => {
      this.isPanning = false;
      isPinching = false;
      initialPinchDistance = null;
    });

    // Mouse Wheel Zoom
    this.zoomCanvasContainer?.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.2 : -0.2;
      this.setZoom(this.zoomScale + delta);
    }, { passive: false });

    // Handle Window Resize for Zoom Modal
    window.addEventListener('resize', () => {
      if (this.zoomModal && !this.zoomModal.classList.contains('hidden')) {
        this.renderZoomPage(this.currentPage);
      }
    });

    // Editions Modal
    this.btnManageEditions?.addEventListener('click', () => this.openEditionsModal());
    this.btnCloseEditions?.addEventListener('click',  () => this.closeEditionsModal());
    this.btnCombineAll?.addEventListener('click',     () => this.loadAllCombinedPDFs());
    this.btnModalCombineAll?.addEventListener('click',() => this.loadAllCombinedPDFs());
    this.formUploadPdf?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleModalUpload();
    });

    // Download PDF Modal & Actions
    this.btnDownload?.addEventListener('click', () => this.openDownloadModal());
    this.btnCloseDownload?.addEventListener('click', () => this.closeDownloadModal());
    this.btnCloseDownloadFooter?.addEventListener('click', () => this.closeDownloadModal());
    this.btnDownloadCombinedAction?.addEventListener('click', () => this.downloadCombinedPDF());
    this.btnDownloadActiveAction?.addEventListener('click', () => this.downloadActiveFile());

    // Local file input
    this.fileInput?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file && file.type === 'application/pdf') {
        this.loadPDFFromFile(file);
      }
    });

    // Drag and Drop
    window.addEventListener('dragover', (e) => {
      e.preventDefault();
      this.dragOverlay?.classList.remove('hidden');
    });
    this.dragOverlay?.addEventListener('dragleave', (e) => {
      e.preventDefault();
      this.dragOverlay?.classList.add('hidden');
    });
    this.dragOverlay?.addEventListener('drop', (e) => {
      e.preventDefault();
      this.dragOverlay?.classList.add('hidden');
      const file = e.dataTransfer.files[0];
      if (file && file.type === 'application/pdf') {
        this.loadPDFFromFile(file);
      } else {
        alert('Silakan masukkan file berekstensi PDF.');
      }
    });

    // Back to Bookshelf
    this.btnBackShelf?.addEventListener('click', () => this.showShelf(true));

    // Manage PDF Button on Shelf (Secret Disguised Badge)
    this.btnSecretAdmin?.addEventListener('click', () => this.openEditionsModal());
    this.btnShelfManage?.addEventListener('click', () => this.openEditionsModal());

    // PIN Modal Events
    this.btnCancelPin?.addEventListener('click', () => this.closePinModal());
    this.formVerifyPin?.addEventListener('submit', (e) => this.handlePinSubmit(e));
    this.btnTogglePinEye?.addEventListener('click', () => {
      if (!this.inputAdminPin) return;
      const isPass = this.inputAdminPin.type === 'password';
      this.inputAdminPin.type = isPass ? 'text' : 'password';
      if (this.iconPinEye) {
        this.iconPinEye.setAttribute('data-lucide', isPass ? 'eye-off' : 'eye');
        if (window.lucide) window.lucide.createIcons();
      }
    });

    // Change PIN Events
    this.btnToggleChangePin?.addEventListener('click', () => this.toggleChangePinPanel());
    this.btnCloseChangePin?.addEventListener('click', () => this.changePinPanel?.classList.add('hidden'));
    this.formChangePin?.addEventListener('submit', (e) => this.handleChangePinSubmit(e));

    // Shelf Cover Card Clicks
    document.querySelectorAll('[data-shelf-pub]').forEach(card => {
      card.addEventListener('click', () => {
        const pub = card.getAttribute('data-shelf-pub');
        if (pub) this.openPublication(pub, true);
      });
    });

    // Card Cover Upload (Directly from Shelf Cards)
    document.querySelectorAll('.input-card-cover').forEach(input => {
      input.addEventListener('change', (e) => {
        const pub = input.getAttribute('data-pub');
        const file = e.target.files[0];
        if (file && pub) {
          this.uploadCoverFile(pub, file);
        }
      });
    });

    // Modal Cover Upload
    this.inputModalCover?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        this.uploadCoverFile(this.currentPublication, file);
      }
    });

    // Modal: Use First Page of PDF as Cover
    this.btnModalUsePdfCover?.addEventListener('click', () => {
      this.useFirstPageAsCover(this.currentPublication);
    });

    // Handle Browser Back / Forward Button
    window.addEventListener('popstate', () => {
      const params = new URLSearchParams(window.location.search);
      const pub = (params.get('pub') || params.get('koran') || '').toLowerCase();
      if (PUBLICATIONS[pub]) {
        this.openPublication(pub, false);
      } else {
        this.showShelf(false);
      }
    });

    // Publication tab switchers (Desktop)
    document.querySelectorAll('.btn-pub-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        const pub = btn.getAttribute('data-pub');
        if (pub) this.switchPublication(pub);
      });
    });

    // Publication selector (Mobile)
    const pubMobileSelect = document.getElementById('pub-select-mobile');
    pubMobileSelect?.addEventListener('change', (e) => {
      this.switchPublication(e.target.value);
    });

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      // When Zoom Modal is active
      if (this.zoomModal && !this.zoomModal.classList.contains('hidden')) {
        if (e.key === 'ArrowRight' || e.key === 'PageDown') {
          if (this.currentPage < this.pageImages.length - 1) this.renderZoomPage(this.currentPage + 1);
          return;
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
          if (this.currentPage > 0) this.renderZoomPage(this.currentPage - 1);
          return;
        } else if (e.key === '+' || e.key === '=') {
          this.setZoom(this.zoomScale + 0.3);
          return;
        } else if (e.key === '-') {
          this.setZoom(this.zoomScale - 0.3);
          return;
        } else if (e.key === '0') {
          this.setZoom(1.0, true);
          return;
        } else if (e.key === 'Escape') {
          this.closeZoomModal();
          return;
        }
      }

      if (e.key === 'ArrowRight' || e.key === 'PageDown') this.pageFlip?.flipNext();
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') this.pageFlip?.flipPrev();
      else if (e.key === 'Home') this.pageFlip?.flip(0);
      else if (e.key === 'End')  this.pageFlip?.flip(this.totalPages - 1);
      else if (e.key === 'f' || e.key === 'F') this.toggleFullscreen();
      else if (e.key === 'z' || e.key === 'Z') this.openZoomModal();
      else if (e.key === 'Escape') {
        this.closeZoomModal();
        this.closeEditionsModal();
        this.closeDownloadModal();
        this.thumbnailDrawer?.classList.add('translate-y-full');
      }
    });

    // Window Resize -> Debounced Re-render
    window.addEventListener('resize', () => {
      if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        if (this.pageFlip && !this.isRendering && this.pageImages.length > 0) {
          this.rebuildFlipbook();
        }
      }, 350);
    });
  }

  // ─────────────────────────────────────────────────────────
  //  Digital Bookshelf & View Management
  // ─────────────────────────────────────────────────────────
  showShelf(updateHistory = true) {
    this.isShelfActive = true;
    if (this.shelfView) this.shelfView.classList.remove('hidden');
    if (this.readerView) this.readerView.classList.add('hidden');
    if (this.loadingOverlay) {
      this.loadingOverlay.classList.add('opacity-0', 'pointer-events-none');
    }

    if (updateHistory) {
      const url = new URL(window.location.href);
      url.searchParams.delete('pub');
      url.searchParams.delete('koran');
      window.history.pushState({}, '', url.pathname);
    }

    this.fetchShelfStats();
    if (window.lucide) window.lucide.createIcons();
  }

  openPublication(pubId, updateHistory = true) {
    if (!PUBLICATIONS[pubId]) pubId = 'alqalam';
    this.isShelfActive = false;
    this.currentPublication = pubId;

    if (this.shelfView) this.shelfView.classList.add('hidden');
    if (this.readerView) this.readerView.classList.remove('hidden');

    if (updateHistory) {
      const url = new URL(window.location.href);
      url.searchParams.set('pub', pubId);
      window.history.pushState({}, '', url.toString());
    }

    this.updatePublicationUI();
    this.autoLoadAllPDFs();
  }

  // Alias for backward compatibility
  switchPublication(pubId) {
    this.openPublication(pubId, true);
  }

  async fetchShelfStats() {
    for (const pubId of Object.keys(PUBLICATIONS)) {
      try {
        const res = await fetch(`api.php?action=list&pub=${pubId}`);
        const data = await res.json();
        const statEl = document.getElementById(`shelf-stat-${pubId}`);
        if (!statEl) continue;

        if (data.success && Array.isArray(data.files) && data.files.length > 0) {
          const count = data.files.length;
          const totalPages = data.files.reduce((acc, f) => acc + (f.pages || 0), 0);
          if (totalPages > 0) {
            statEl.innerText = `${count} Edisi (${totalPages} Hal)`;
          } else {
            statEl.innerText = `${count} Edisi`;
          }
        } else {
          statEl.innerText = (pubId === 'kafana') ? 'Segera Terbit' : 'Belum Ada Edisi';
        }
      } catch (e) {
        console.warn(`Gagal memuat stats untuk ${pubId}:`, e);
      }
    }
  }

  async uploadCoverFile(pubId, file) {
    if (!file) return;
    const pubInfo = PUBLICATIONS[pubId] || PUBLICATIONS.alqalam;
    try {
      this.showLoading(`Mengunggah sampul baru ${pubInfo.name}...`);
      const formData = new FormData();
      formData.append('cover_file', file);
      formData.append('pub', pubId);

      const res = await fetch(`api.php?action=upload_cover&pub=${pubId}`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      this.hideLoading();

      if (data.success) {
        const img = document.getElementById(`shelf-cover-img-${pubId}`);
        if (img) {
          img.src = `covers/${pubId}.jpg?t=${Date.now()}`;
        }
        alert(`Berhasil! Sampul ${pubInfo.name} telah berhasil diperbarui.`);
      } else {
        alert('Gagal mengunggah sampul: ' + (data.message || 'Terjadi kesalahan.'));
      }
    } catch (err) {
      this.hideLoading();
      console.error('Error uploading cover:', err);
      alert('Terjadi kesalahan saat mengunggah sampul: ' + err.message);
    }
  }

  async useFirstPageAsCover(pubId) {
    const pubInfo = PUBLICATIONS[pubId] || PUBLICATIONS.alqalam;
    if (!this.pageImages || this.pageImages.length === 0) {
      alert(`Buka naskah PDF ${pubInfo.name} terlebih dahulu untuk mengambil halaman pertama sebagai sampul.`);
      return;
    }

    try {
      this.showLoading(`Menyimpan halaman 1 sebagai sampul ${pubInfo.name}...`);
      const page1 = this.pageImages[0];
      const base64 = page1.dataUrl;

      const res = await fetch(`api.php?action=save_cover_base64&pub=${pubId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ base64: base64 })
      });
      const data = await res.json();
      this.hideLoading();

      if (data.success) {
        const img = document.getElementById(`shelf-cover-img-${pubId}`);
        if (img) {
          img.src = `covers/${pubId}.jpg?t=${Date.now()}`;
        }
        alert(`Berhasil! Halaman 1 kini telah menjadi sampul resmi ${pubInfo.name}.`);
      } else {
        alert('Gagal menyimpan sampul: ' + (data.message || 'Terjadi kesalahan.'));
      }
    } catch (err) {
      this.hideLoading();
      console.error('Error saving PDF cover:', err);
      alert('Terjadi kesalahan saat menyimpan sampul: ' + err.message);
    }
  }

  updatePublicationUI() {
    const pub = PUBLICATIONS[this.currentPublication] || PUBLICATIONS.alqalam;

    // 1. Update Brand Header
    const brandName  = document.getElementById('brand-name');
    const brandBadge = document.getElementById('brand-badge');
    const brandIcon  = document.getElementById('brand-icon');
    if (brandName)  brandName.innerText = pub.name;
    if (brandBadge) {
      brandBadge.innerText = pub.badge;
      brandBadge.className = `text-[10px] font-semibold border px-2 py-0.5 rounded-full ${pub.badgeClass}`;
    }
    if (brandIcon) {
      brandIcon.setAttribute('data-lucide', pub.icon);
    }

    // 2. Update Tabs Desktop Header
    document.querySelectorAll('.btn-pub-tab').forEach(btn => {
      const p = btn.getAttribute('data-pub');
      if (p === this.currentPublication) {
        btn.className = `btn-pub-tab flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition active:scale-95 ${pub.activeClass}`;
      } else {
        btn.className = 'btn-pub-tab flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/80 transition active:scale-95';
      }
    });

    // 3. Update Mobile Dropdown
    const mobileSelect = document.getElementById('pub-select-mobile');
    if (mobileSelect) mobileSelect.value = this.currentPublication;

    // 4. Update Modal Titles & Paths
    const editionsPubLabel = document.getElementById('editions-modal-pub-name');
    if (editionsPubLabel) editionsPubLabel.innerText = pub.name;

    const coverModalLabel = document.getElementById('cover-modal-pub-name');
    if (coverModalLabel) coverModalLabel.innerText = pub.name;

    const editionsFolderPath = document.getElementById('editions-folder-path');
    if (editionsFolderPath) editionsFolderPath.innerText = `pdf/${this.currentPublication}/`;

    const downloadPubName = document.getElementById('download-modal-pub-name');
    if (downloadPubName) downloadPubName.innerText = pub.name;

    if (window.lucide) window.lucide.createIcons();
  }

  showEmptyPublicationCanvas(pubInfo) {
    if (!this.container) return;
    if (this.pageFlip) {
      try { this.pageFlip.destroy(); } catch (_) {}
      this.pageFlip = null;
    }
    this.pageImages = [];
    this.totalPages = 0;
    this.currentPage = 0;
    this.currentPdfName = '';
    this.currentPdfUrl  = '';
    this.currentLocalFile = null;

    if (this.pdfTitle)      this.pdfTitle.innerText = `${pubInfo.name} - Belum Ada Edisi`;
    if (this.pageIndicator) this.pageIndicator.innerText = '-';
    if (this.thumbnailList) this.thumbnailList.innerHTML = '';

    const themeColors = {
      emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', btn: 'bg-emerald-600 hover:bg-emerald-500' },
      teal:    { bg: 'bg-teal-500/10',    border: 'border-teal-500/30',    text: 'text-teal-400',    btn: 'bg-teal-600 hover:bg-teal-500' },
      amber:   { bg: 'bg-amber-500/10',   border: 'border-amber-500/30',   text: 'text-amber-400',   btn: 'bg-amber-600 hover:bg-amber-500' }
    };
    const c = themeColors[pubInfo.themeColor] || themeColors.emerald;

    this.container.innerHTML = `
      <div class="flex flex-col items-center justify-center p-8 sm:p-12 bg-slate-900/80 border-2 border-dashed border-slate-700/80 rounded-3xl max-w-lg mx-auto text-center shadow-2xl backdrop-blur-sm">
        <div class="w-16 h-16 rounded-2xl ${c.bg} border ${c.border} flex items-center justify-center ${c.text} mb-4 shadow-inner">
          <i data-lucide="${pubInfo.icon}" class="w-8 h-8"></i>
        </div>
        <h3 class="font-bold text-white text-lg mb-1">${pubInfo.fullName}</h3>
        <p class="text-xs text-slate-300 mb-2">Folder arsip <code class="text-emerald-400">pdf/${pubInfo.id}/</code> masih kosong.</p>
        <p class="text-xs text-slate-400 mb-6 max-w-sm">Silakan unggah file PDF edisi pertama ${pubInfo.name} melalui menu Kelola Edisi di bawah ini:</p>
        
        <div class="flex flex-wrap items-center justify-center gap-3">
          <button onclick="window.app.openEditionsModal()" class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold ${c.btn} text-white shadow-lg transition active:scale-95">
            <i data-lucide="upload" class="w-4 h-4"></i>
            <span>Unggah PDF ke ${pubInfo.name}</span>
          </button>
          <button onclick="window.app.showShelf()" class="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition">
            <i data-lucide="arrow-left" class="w-4 h-4 text-emerald-400"></i>
            <span>Kembali ke Rak</span>
          </button>
        </div>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
  }

  // ─────────────────────────────────────────────────────────
  //  Loading Overlay Helpers
  // ─────────────────────────────────────────────────────────
  showLoading(text = 'Memuat E-Paper...') {
    if (this.loadingOverlay) {
      this.loadingOverlay.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
      const title = document.getElementById('loading-title');
      if (title) {
        const pub = PUBLICATIONS[this.currentPublication];
        title.innerText = `Membuka ${pub ? pub.name : 'E-Paper'}`;
      }
      if (this.loadingText) this.loadingText.innerText = text;
      if (this.progressBar) this.progressBar.style.width = '10%';
    }
  }

  updateProgress(pct, text) {
    if (this.progressBar) this.progressBar.style.width = `${pct}%`;
    if (text && this.loadingText) this.loadingText.innerText = text;
  }

  hideLoading() {
    if (this.loadingOverlay) {
      this.loadingOverlay.classList.add('opacity-0', 'pointer-events-none');
      setTimeout(() => {
        if (this.loadingOverlay.classList.contains('opacity-0')) {
          this.loadingOverlay.classList.add('hidden');
        }
      }, 350);
    }
  }

  // ─────────────────────────────────────────────────────────
  //  Data Loading: Server & Local File
  // ─────────────────────────────────────────────────────────
  async autoLoadAllPDFs() {
    try {
      const pubInfo = PUBLICATIONS[this.currentPublication] || PUBLICATIONS.alqalam;
      this.showLoading(`Membuka publikasi ${pubInfo.name}...`);
      const res = await fetch(`api.php?action=list&pub=${encodeURIComponent(this.currentPublication)}`);
      const data = await res.json();
      if (data.success && data.files && data.files.length > 0) {
        // Otomatis gabungkan dan tampilkan seluruh halaman koran (semua file PDF)
        await this.loadAllCombinedPDFs();
      } else {
        this.showEmptyPublicationCanvas(pubInfo);
        this.hideLoading();
      }
    } catch (err) {
      console.warn('Gagal memuat koran awal:', err);
      const pubInfo = PUBLICATIONS[this.currentPublication] || PUBLICATIONS.alqalam;
      this.showEmptyPublicationCanvas(pubInfo);
      this.hideLoading();
    }
  }

  async loadFromServerFile(filename) {
    try {
      this.showLoading(`Mengunduh ${filename}...`);
      this.currentPdfName = filename;
      this.currentLocalFile = null;
      if (this.pdfTitle) this.pdfTitle.innerText = `${filename.replace(/\.pdf$/i, '')} (Edisi Satuan)`;

      // Tampilkan tombol "Koran Lengkap" agar pengguna bisa kembali ke mode gabung semua
      if (this.btnCombineAll) {
        this.btnCombineAll.classList.remove('hidden');
        const span = this.btnCombineAll.querySelector('span');
        if (span) span.innerText = 'Koran Lengkap';
      }

      const raw = `pdf/${this.currentPublication}/${decodeURIComponent(filename)}`;
      const fileUrl = encodeURI(raw);
      try {
        const binRes = await fetch(fileUrl);
        if (!binRes.ok) throw new Error(`HTTP ${binRes.status}`);
        const arrayBuf = await binRes.arrayBuffer();
        await this.processPDF(new Uint8Array(arrayBuf));
      } catch (directErr) {
        const res = await fetch(`api.php?action=get_pdf&pub=${encodeURIComponent(this.currentPublication)}&file=${encodeURIComponent(filename)}`);
        const data = await res.json();
        if (!data.success || !data.base64) {
          throw new Error(data.message || 'File PDF tidak ditemukan di server.');
        }
        const binStr = atob(data.base64);
        const len    = binStr.length;
        const bytes  = new Uint8Array(len);
        for (let i = 0; i < len; i++) bytes[i] = binStr.charCodeAt(i);
        await this.processPDF(bytes);
      }
    } catch (err) {
      console.error('Gagal mengambil PDF dari server:', err);
      alert('Gagal membuka file dari server: ' + err.message);
      this.hideLoading();
    }
  }

  // ─────────────────────────────────────────────────────────
  //  Gabungkan Seluruh File PDF Menjadi Satu Buku Koran Utuh (Ultra-Fast Engine)
  // ─────────────────────────────────────────────────────────
  async loadAllCombinedPDFs(selectedFileNames = null) {
    try {
      const pubInfo = PUBLICATIONS[this.currentPublication] || PUBLICATIONS.alqalam;
      this.showLoading(`Membuka koleksi ${pubInfo.name}...`);
      const res = await fetch(`api.php?action=list&pub=${encodeURIComponent(this.currentPublication)}`);
      const data = await res.json();
      if (!data.success || !data.files || data.files.length === 0) {
        this.showEmptyPublicationCanvas(pubInfo);
        this.hideLoading();
        this.isRendering = false;
        return;
      }

      this.isRendering = true;
      if (this.pageFlip) {
        try { this.pageFlip.destroy(); } catch (_) {}
        this.pageFlip = null;
      }
      if (this.container) {
        this.container.innerHTML = '<div id="flipbook" class="st-page-flip"></div>';
        this.bookElement = document.getElementById('flipbook');
      }

      this.pageImages = [];
      this.currentPage = 0;
      this.totalPages = 0;
      if (this.thumbnailList) this.thumbnailList.innerHTML = '';
      if (this.zoomPageSelect) this.zoomPageSelect.innerHTML = '';
      this.updatePageIndicator();

      this.currentPdfName = `Gabungan Semua Edisi ${pubInfo.name}`;
      this.currentLocalFile = null;
      if (this.pdfTitle) this.pdfTitle.innerText = `${pubInfo.name} - Memuat Halaman...`;

      // Sort files naturally (0001, 0002, 0003...)
      let files = data.files.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

      // Filter if specific files selected
      if (Array.isArray(selectedFileNames) && selectedFileNames.length > 0) {
        files = files.filter(f => selectedFileNames.includes(f.name));
      }

      this.updateProgress(15, `Mengunduh ${files.length} edisi publikasi...`);

      // ─── Parallel Direct Binary Fetch (Triple-Resilient Loading) ───
      const loadedDocs = await Promise.all(files.map(async (file) => {
        const raw = file.path ? decodeURIComponent(file.path) : (file.url ? decodeURIComponent(file.url) : `pdf/${this.currentPublication}/${file.name}`);
        const fileUrl = encodeURI(raw);

        // Strategi 1: Direct Native PDF.js URL
        try {
          const doc = await window.pdfjsLib.getDocument({
            url: fileUrl
          }).promise;
          return { file, doc };
        } catch (err1) {
          console.warn(`[PDF.js URL] Gagal memuat ${file.name}, mencoba ArrayBuffer...`, err1);
        }

        // Strategi 2: Direct Binary Fetch ArrayBuffer
        try {
          const binRes = await fetch(fileUrl);
          if (binRes.ok) {
            const buf = await binRes.arrayBuffer();
            const doc = await window.pdfjsLib.getDocument({
              data: new Uint8Array(buf)
            }).promise;
            return { file, doc };
          }
        } catch (err2) {
          console.warn(`[Direct Fetch] Gagal memuat ${file.name}, mencoba PHP API...`, err2);
        }

        // Strategi 3: PHP API Fallback (Langsung dari filesystem server)
        try {
          const apiRes = await fetch(`api.php?action=get_pdf&pub=${encodeURIComponent(this.currentPublication)}&file=${encodeURIComponent(file.name)}`);
          const apiData = await apiRes.json();
          if (apiData.success && apiData.base64) {
            const binStr = atob(apiData.base64);
            const len    = binStr.length;
            const bytes  = new Uint8Array(len);
            for (let i = 0; i < len; i++) bytes[i] = binStr.charCodeAt(i);
            const doc = await window.pdfjsLib.getDocument({ data: bytes }).promise;
            return { file, doc };
          }
        } catch (err3) {
          console.error(`[Fallback API] Gagal total memuat ${file.name}:`, err3);
        }

        return { file, doc: null };
      }));

      let globalPageNum = 1;
      const isMobile = window.innerWidth < 768;
      let totalPagesAll = 0;
      loadedDocs.forEach(item => { if (item.doc) totalPagesAll += item.doc.numPages; });

      for (let fIdx = 0; fIdx < loadedDocs.length; fIdx++) {
        const { file, doc } = loadedDocs[fIdx];
        if (!doc) continue;

        for (let p = 1; p <= doc.numPages; p++) {
          const progressPct = Math.round(20 + ((globalPageNum - 1) / Math.max(1, totalPagesAll)) * 75);
          this.updateProgress(progressPct, `Menyiapkan Halaman ${globalPageNum} (${file.name})...`);

          const page = await doc.getPage(p);

          // Optimal resolution: high-DPI crisp text rendering for A3/A4 newspapers
          const baseVp = page.getViewport({ scale: 1.0 });
          const targetH = isMobile ? Math.min(window.innerHeight * 2.2, 2000) : 2400;
          const optimalScale = Math.min(2.0, Math.max(1.2, targetH / baseVp.height));
          const viewport = page.getViewport({ scale: optimalScale });

          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const ctx = canvas.getContext('2d', { alpha: false });
          await page.render({ canvasContext: ctx, viewport }).promise;

          const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
          this.pageImages.push({
            pageNumber: globalPageNum,
            sourceFile: file.name,
            sourcePage: p,
            dataUrl: dataUrl,
            aspectRatio: viewport.width / viewport.height,
            width: viewport.width,
            height: viewport.height
          });

          // Zoom dropdown
          if (this.zoomPageSelect) {
            const opt = document.createElement('option');
            opt.value = globalPageNum - 1;
            opt.innerText = `Hal. ${globalPageNum} (${file.name} Hal. ${p})`;
            this.zoomPageSelect.appendChild(opt);
          }

          globalPageNum++;
        }
      }

      this.totalPages = this.pageImages.length;
      if (this.totalPages === 0) {
        this.showEmptyPublicationCanvas(pubInfo);
        this.hideLoading();
        this.isRendering = false;
        return;
      }
      if (this.pdfTitle) {
        this.pdfTitle.innerText = `${pubInfo.name} - Edisi Lengkap (${this.totalPages} Halaman)`;
      }
      this.initPageFlipEngine();
      this.buildThumbnails();

      // Sembunyikan tombol "Koran Lengkap" karena seluruh koran sudah aktif ditampilkan
      if (this.btnCombineAll) {
        this.btnCombineAll.classList.add('hidden');
      }

      this.updateProgress(100, 'Selesai!');
      setTimeout(() => this.hideLoading(), 200);
      this.isRendering = false;
      this.closeEditionsModal();
    } catch (err) {
      console.error('Gagal menggabungkan PDF:', err);
      alert('Gagal menggabungkan file: ' + err.message);
      this.hideLoading();
      this.isRendering = false;
    }
  }

  async loadPDFFromFile(file) {
    try {
      this.showLoading(`Membaca file ${file.name}...`);
      this.currentPdfName = file.name;
      this.currentLocalFile = file;
      if (this.pdfTitle) this.pdfTitle.innerText = `${file.name.replace(/\.pdf$/i, '')} (File Lokal)`;

      // Tampilkan tombol "Koran Lengkap" agar pengguna bisa kembali ke mode gabung semua
      if (this.btnCombineAll) {
        this.btnCombineAll.classList.remove('hidden');
        const span = this.btnCombineAll.querySelector('span');
        if (span) span.innerText = 'Koran Lengkap';
      }

      const arrayBuffer = await file.arrayBuffer();
      await this.processPDF(new Uint8Array(arrayBuffer));
    } catch (err) {
      console.error('Gagal membaca file lokal:', err);
      alert('Gagal membaca file: ' + err.message);
      this.hideLoading();
    }
  }

  // ─────────────────────────────────────────────────────────
  //  Core Processing: PDF.js -> Offscreen Canvas -> Data URLs
  // ─────────────────────────────────────────────────────────
  async processPDF(pdfBytes) {
    try {
      this.showLoading('Membaca naskah PDF A3...');
      this.isRendering = true;

      // 1. Reset StPageFlip instance & ALWAYS recreate fresh DOM element
      if (this.pageFlip) {
        try { this.pageFlip.destroy(); } catch (_) {}
        this.pageFlip = null;
      }
      if (this.container) {
        this.container.innerHTML = '<div id="flipbook" class="st-page-flip"></div>';
        this.bookElement = document.getElementById('flipbook');
      }

      this.pageImages = [];
      if (this.thumbnailList) this.thumbnailList.innerHTML = '';
      if (this.zoomPageSelect) this.zoomPageSelect.innerHTML = '';

      // 2. Load PDF with PDF.js (100% Offline / No External CDN)
      const loadingTask = window.pdfjsLib.getDocument({
        data: pdfBytes
      });

      this.pdfDoc = await loadingTask.promise;
      this.totalPages = this.pdfDoc.numPages;

      this.updateProgress(25, `Merender ${this.totalPages} halaman buletin...`);

      // 3. Render each page to an offscreen canvas at device-optimal resolution
      const isMobile = window.innerWidth < 768;

      for (let pageNum = 1; pageNum <= this.totalPages; pageNum++) {
        const progressPct = Math.round(25 + (pageNum / this.totalPages) * 65);
        this.updateProgress(progressPct, `Merender halaman ${pageNum} dari ${this.totalPages}...`);

        const page     = await this.pdfDoc.getPage(pageNum);
        const baseVp   = page.getViewport({ scale: 1.0 });
        const targetH  = isMobile ? Math.min(window.innerHeight * 2.2, 2000) : 2400;
        const optimalScale = Math.min(2.0, Math.max(1.2, targetH / baseVp.height));
        const viewport = page.getViewport({ scale: optimalScale });

        const canvas   = document.createElement('canvas');
        canvas.width   = viewport.width;
        canvas.height  = viewport.height;
        const ctx      = canvas.getContext('2d', { alpha: false });

        await page.render({ canvasContext: ctx, viewport }).promise;

        const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
        this.pageImages.push({
          pageNumber:  pageNum,
          dataUrl:     dataUrl,
          aspectRatio: viewport.width / viewport.height,
          width:       viewport.width,
          height:      viewport.height
        });

        // Add to Zoom dropdown
        if (this.zoomPageSelect) {
          const opt = document.createElement('option');
          opt.value = pageNum - 1;
          opt.innerText = `Halaman ${pageNum}`;
          this.zoomPageSelect.appendChild(opt);
        }
      }

      this.updateProgress(95, 'Menyiapkan efek lembaran 3D...');

      // 4. Initialize StPageFlip Engine via loadFromImages
      this.initPageFlipEngine();
      this.buildThumbnails();

      this.updateProgress(100, 'Selesai!');
      setTimeout(() => this.hideLoading(), 250);
      this.isRendering = false;

    } catch (err) {
      console.error('Gagal memproses PDF:', err);
      alert('Terjadi kesalahan saat memproses PDF:\n' + err.message);
      this.hideLoading();
      this.isRendering = false;
    }
  }

  // ─────────────────────────────────────────────────────────
  //  Init StPageFlip Engine with Canvas Rendering
  // ─────────────────────────────────────────────────────────
  initPageFlipEngine() {
    if (!this.pageImages.length || !this.bookElement) return;

    const isMobile = window.innerWidth < 768;
    const stageW   = this.container?.clientWidth  || window.innerWidth;
    const stageH   = this.container?.clientHeight || (window.innerHeight - 64);
    const aspect   = this.pageImages[0]?.aspectRatio || 0.707; // A3 aspect ratio

    let singleW, singleH;

    if (isMobile) {
      // Mobile: single page portrait
      singleH = Math.min(stageH - 30, 800);
      singleW = Math.round(singleH * aspect);
      if (singleW > stageW - 20) {
        singleW = stageW - 20;
        singleH = Math.round(singleW / aspect);
      }
    } else {
      // Desktop: 2-page spread
      singleH = Math.min(stageH - 50, 840);
      singleW = Math.round(singleH * aspect);
      if (singleW * 2 > stageW - 60) {
        singleW = Math.round((stageW - 60) / 2);
        singleH = Math.round(singleW / aspect);
      }
    }

    // Safety bounds
    singleW = Math.max(singleW, 250);
    singleH = Math.max(singleH, 350);

    // Apply explicit sizing to bookElement
    const totalW = isMobile ? singleW : singleW * 2;
    this.bookElement.style.width  = `${totalW}px`;
    this.bookElement.style.height = `${singleH}px`;
    this.bookElement.style.margin = '0 auto';

    if (typeof St === 'undefined' || typeof St.PageFlip !== 'function') {
      console.error('StPageFlip library tidak ditemukan!');
      alert('Pustaka StPageFlip tidak dapat dimuat.');
      return;
    }

    this.pageFlip = new St.PageFlip(this.bookElement, {
      width:        singleW,
      height:       singleH,
      size:         'fixed',
      minWidth:     200,
      maxWidth:     2000,
      minHeight:    280,
      maxHeight:    2500,
      showCover:    true,
      usePortrait:  isMobile,
      drawShadow:   true,
      flippingTime: 650,
      useMouseEvents:      true,
      swipeDistance:       30,
      mobileScrollSupport: true,
      autoSize:    false
    });

    // Pass data URLs directly to canvas renderer
    const imageUrls = this.pageImages.map(img => img.dataUrl);
    this.pageFlip.loadFromImages(imageUrls);

    // Flip events
    this.pageFlip.on('flip', (e) => {
      this.currentPage = e.data;
      this.updatePageIndicator();
      this.highlightThumbnail(this.currentPage);
      this.playFlipSound();
    });

    // Double click / double tap on book canvas triggers detail zoom
    let lastBookTap = 0;
    const triggerZoomFromClick = (clientX) => {
      if (!this.bookElement || this.totalPages === 0) return;
      const rect = this.bookElement.getBoundingClientRect();
      const isRightHalf = (clientX - rect.left) > (rect.width / 2);
      let targetPage = this.currentPage;

      if (!isMobile && this.totalPages > 1) {
        if (this.currentPage === 0) {
          targetPage = 0; // Cover page
        } else {
          const leftIdx = (this.currentPage % 2 !== 0) ? this.currentPage : this.currentPage - 1;
          const rightIdx = leftIdx + 1;
          if (isRightHalf && rightIdx < this.totalPages) {
            targetPage = rightIdx;
          } else {
            targetPage = Math.max(0, leftIdx);
          }
        }
      }
      this.openZoomModal(targetPage);
    };

    this.bookElement.addEventListener('dblclick', (e) => {
      triggerZoomFromClick(e.clientX);
    });

    this.bookElement.addEventListener('touchend', (e) => {
      if (e.changedTouches && e.changedTouches.length === 1) {
        const now = Date.now();
        if (now - lastBookTap < 350) {
          triggerZoomFromClick(e.changedTouches[0].clientX);
          lastBookTap = 0;
          return;
        }
        lastBookTap = now;
      }
    });

    this.currentPage = 0;
    this.updatePageIndicator();
  }

  // ─────────────────────────────────────────────────────────
  //  Rebuild Flipbook (After deleting a page or window resize)
  // ─────────────────────────────────────────────────────────
  rebuildFlipbook() {
    if (!this.pageImages.length) {
      this.showEmptyCanvas();
      return;
    }

    // Re-index remaining pages
    this.pageImages.forEach((img, i) => { img.pageNumber = i + 1; });
    this.totalPages = this.pageImages.length;
    const curIdx = Math.min(this.currentPage, this.totalPages - 1);

    if (this.pageFlip) {
      try { this.pageFlip.destroy(); } catch (_) {}
      this.pageFlip = null;
    }
    if (this.container) {
      this.container.innerHTML = '<div id="flipbook" class="st-page-flip"></div>';
      this.bookElement = document.getElementById('flipbook');
    }

    this.initPageFlipEngine();
    this.buildThumbnails();
    this.updateZoomPageSelect();

    if (curIdx >= 0 && curIdx < this.totalPages) {
      setTimeout(() => {
        try { this.pageFlip?.flip(curIdx); } catch (_) {}
      }, 200);
    }
  }

  // ─────────────────────────────────────────────────────────
  //  Hapus Halaman Tertentu (Delete Page)
  // ─────────────────────────────────────────────────────────
  deletePage(pageIndex) {
    if (pageIndex < 0 || pageIndex >= this.pageImages.length) return;
    const pageNum = this.pageImages[pageIndex].pageNumber;

    if (!confirm(`⚠️ Apakah Anda yakin ingin menghapus Halaman ${pageNum} dari tampilan buletin ini?`)) {
      return;
    }

    this.pageImages.splice(pageIndex, 1);
    this.rebuildFlipbook();
    alert(`✅ Halaman ${pageNum} berhasil dihapus dari lembaran flipbook!`);
  }

  // ─────────────────────────────────────────────────────────
  //  Bottom Thumbnails Drawer
  // ─────────────────────────────────────────────────────────
  buildThumbnails() {
    if (!this.thumbnailList) return;
    this.thumbnailList.innerHTML = '';

    this.pageImages.forEach((imgObj, idx) => {
      const isCur = idx === this.currentPage;
      const card  = document.createElement('div');
      card.className = `relative flex-shrink-0 cursor-pointer group flex flex-col items-center transition-all duration-150 p-1.5 rounded-lg border-2 ${isCur ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-700 bg-slate-800/80 hover:border-slate-500'}`;
      card.setAttribute('data-page-index', idx);

      card.innerHTML = `
        <div class="relative w-24 h-32 overflow-hidden rounded bg-white shadow flex items-center justify-center">
          <img src="${imgObj.dataUrl}" alt="Thumbnail ${imgObj.pageNumber}" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
          
          <!-- Tombol Hapus Halaman -->
          <button class="btn-delete-page absolute top-1 right-1 p-1 rounded bg-rose-600/90 hover:bg-rose-500 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" title="Hapus Halaman ${imgObj.pageNumber}">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
        </div>
        <span class="text-[11px] font-medium mt-1 text-slate-300 group-hover:text-white">Hal ${imgObj.pageNumber}</span>
      `;

      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-delete-page')) {
          e.stopPropagation();
          this.deletePage(idx);
          return;
        }
        this.currentPage = idx;
        this.highlightThumbnail(idx);
        this.updatePageIndicator();
        try {
          this.pageFlip?.flip(idx);
        } catch (_) {}
        this.thumbnailDrawer?.classList.add('translate-y-full');
      });

      this.thumbnailList.appendChild(card);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  highlightThumbnail(pageIndex) {
    if (!this.thumbnailList) return;
    this.thumbnailList.querySelectorAll('div[data-page-index]').forEach(card => {
      const idx = parseInt(card.getAttribute('data-page-index'), 10);
      if (idx === pageIndex) {
        card.classList.add('border-emerald-500', 'bg-emerald-500/10');
        card.classList.remove('border-slate-700', 'bg-slate-800/80');
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        card.classList.remove('border-emerald-500', 'bg-emerald-500/10');
        card.classList.add('border-slate-700', 'bg-slate-800/80');
      }
    });
  }

  updatePageIndicator() {
    if (!this.pageIndicator) return;
    const total = this.totalPages;
    const cur   = this.currentPage;

    if (total === 0) {
      this.pageIndicator.innerText = '0 Halaman';
      return;
    }

    if (cur === 0) {
      this.pageIndicator.innerText = `Cover (Hal. 1 dari ${total})`;
    } else if (cur >= total - 1) {
      this.pageIndicator.innerText = `Hal. ${total} dari ${total}`;
    } else {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        this.pageIndicator.innerText = `Hal. ${cur + 1} dari ${total}`;
      } else {
        const right = Math.min(cur + 2, total);
        this.pageIndicator.innerText = `Hal. ${cur + 1} – ${right} dari ${total}`;
      }
    }
  }

  updateZoomPageSelect() {
    if (!this.zoomPageSelect) return;
    this.zoomPageSelect.innerHTML = '';
    this.pageImages.forEach((p, idx) => {
      const opt     = document.createElement('option');
      opt.value     = idx;
      opt.innerText = `Halaman ${p.pageNumber}`;
      this.zoomPageSelect.appendChild(opt);
    });
  }

  // ─────────────────────────────────────────────────────────
  //  Kelola Arsip & File PDF di Server (Terproteksi PIN)
  // ─────────────────────────────────────────────────────────
  openEditionsModal() {
    const isAuth = sessionStorage.getItem('epaper_admin_auth') === 'true';
    if (isAuth) {
      this.showEditionsModalDirect();
    } else {
      this.openPinModal();
    }
  }

  showEditionsModalDirect() {
    this.editionsModal?.classList.remove('hidden');
    this.changePinPanel?.classList.add('hidden');
    this.loadEditionsList();
  }

  openPinModal() {
    if (!this.pinModal) return;
    this.pinModal.classList.remove('hidden');
    if (this.pinErrorMsg) {
      this.pinErrorMsg.classList.add('hidden');
      this.pinErrorMsg.innerText = '';
    }
    if (this.inputAdminPin) {
      this.inputAdminPin.value = '';
      setTimeout(() => this.inputAdminPin?.focus(), 150);
    }
    if (window.lucide) window.lucide.createIcons();
  }

  closePinModal() {
    this.pinModal?.classList.add('hidden');
    if (this.inputAdminPin) this.inputAdminPin.value = '';
  }

  async verifyPin(pin) {
    try {
      const res = await fetch('api.php?action=verify_pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin })
      });
      return await res.json();
    } catch (e) {
      const localPin = localStorage.getItem('epaper_admin_pin') || '30305758';
      if (pin === localPin) {
        return { success: true, message: 'PIN valid (offline)' };
      }
      return { success: false, message: 'PIN salah. Silakan coba lagi.' };
    }
  }

  async handlePinSubmit(e) {
    e.preventDefault();
    const pin = (this.inputAdminPin?.value || '').trim();
    if (!pin) return;

    const btn = document.getElementById('btn-submit-pin');
    if (btn) btn.disabled = true;

    const res = await this.verifyPin(pin);
    if (btn) btn.disabled = false;

    if (res.success) {
      sessionStorage.setItem('epaper_admin_auth', 'true');
      this.closePinModal();
      this.showEditionsModalDirect();
    } else {
      if (this.pinErrorMsg) {
        this.pinErrorMsg.innerText = res.message || 'PIN salah. Silakan coba lagi.';
        this.pinErrorMsg.classList.remove('hidden');
      }
      if (this.inputAdminPin) {
        this.inputAdminPin.classList.add('ring-2', 'ring-rose-500', 'border-rose-500');
        setTimeout(() => {
          this.inputAdminPin?.classList.remove('ring-2', 'ring-rose-500', 'border-rose-500');
        }, 1200);
        this.inputAdminPin.focus();
        this.inputAdminPin.select();
      }
    }
  }

  toggleChangePinPanel() {
    if (!this.changePinPanel) return;
    const isHidden = this.changePinPanel.classList.contains('hidden');
    if (isHidden) {
      this.changePinPanel.classList.remove('hidden');
      if (this.inputOldPin) this.inputOldPin.focus();
    } else {
      this.changePinPanel.classList.add('hidden');
    }
    if (this.changePinMsg) {
      this.changePinMsg.classList.add('hidden');
      this.changePinMsg.innerText = '';
    }
  }

  async handleChangePinSubmit(e) {
    e.preventDefault();
    const oldPin = (this.inputOldPin?.value || '').trim();
    const newPin = (this.inputNewPin?.value || '').trim();
    const confirmPin = (this.inputConfirmPin?.value || '').trim();

    if (!oldPin || !newPin || !confirmPin) {
      this.showChangePinMsg('Mohon lengkapi semua kolom PIN.', 'error');
      return;
    }

    if (newPin !== confirmPin) {
      this.showChangePinMsg('Konfirmasi PIN baru tidak cocok.', 'error');
      return;
    }

    if (newPin.length < 4) {
      this.showChangePinMsg('PIN baru minimal harus 4 angka/karakter.', 'error');
      return;
    }

    const btn = document.getElementById('btn-submit-change-pin');
    if (btn) btn.disabled = true;

    try {
      const res = await fetch('api.php?action=change_pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ current_pin: oldPin, new_pin: newPin })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('epaper_admin_pin', newPin);
        this.showChangePinMsg('✅ ' + data.message, 'success');
        this.formChangePin?.reset();
        setTimeout(() => {
          this.changePinPanel?.classList.add('hidden');
        }, 2200);
      } else {
        this.showChangePinMsg('❌ ' + data.message, 'error');
      }
    } catch (err) {
      this.showChangePinMsg('❌ Gagal menghubungi server.', 'error');
    } finally {
      if (btn) btn.disabled = false;
    }
  }

  showChangePinMsg(msg, type = 'info') {
    if (!this.changePinMsg) return;
    this.changePinMsg.innerText = msg;
    this.changePinMsg.className = 'text-xs mt-2.5 p-2 rounded-lg ' + 
      (type === 'error' ? 'bg-rose-950/60 border border-rose-800 text-rose-300' : 'bg-emerald-950/60 border border-emerald-800 text-emerald-300');
    this.changePinMsg.classList.remove('hidden');
  }

  closeEditionsModal() {
    this.editionsModal?.classList.add('hidden');
  }

  async loadEditionsList() {
    if (!this.editionsFileList) return;
    this.editionsFileList.innerHTML = `
      <div class="text-center py-6 text-slate-400">
        <div class="w-6 h-6 border-2 border-slate-600 border-t-emerald-500 rounded-full animate-spin mx-auto mb-2"></div>
        <span class="text-xs">Memuat daftar file PDF di server...</span>
      </div>
    `;

    try {
      const res  = await fetch(`api.php?action=list&pub=${encodeURIComponent(this.currentPublication)}`);
      const data = await res.json();

      if (!data.success || !data.files || data.files.length === 0) {
        const pubInfo = PUBLICATIONS[this.currentPublication] || PUBLICATIONS.alqalam;
        this.editionsFileList.innerHTML = `
          <div class="text-center py-8 text-slate-500 border-2 border-dashed border-slate-800 rounded-xl">
            <i data-lucide="folder-x" class="w-10 h-10 mx-auto mb-2 text-slate-600"></i>
            <p class="text-sm font-semibold text-slate-300">Belum ada file PDF di folder ${pubInfo.name}</p>
            <p class="text-xs text-slate-500 mt-1">Gunakan formulir di atas untuk mengunggah edisi pertama.</p>
          </div>
        `;
        if (window.lucide) window.lucide.createIcons();
        return;
      }

      this.editionsFileList.innerHTML = '';

      // Action toolbar for multi-select merge
      const toolbar = document.createElement('div');
      toolbar.className = 'flex items-center justify-between pb-2 mb-1 border-b border-slate-800 text-xs';
      toolbar.innerHTML = `
        <div class="flex items-center gap-2">
          <button id="btn-select-all-files" class="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 transition">Pilih Semua</button>
          <button id="btn-unselect-all-files" class="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 transition">Batal Pilih</button>
        </div>
        <button id="btn-merge-selected-files" class="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition shadow">
          <i data-lucide="layers" class="w-3.5 h-3.5"></i>
          <span>Gabung yang Dicentang</span>
        </button>
      `;
      this.editionsFileList.appendChild(toolbar);

      data.files.forEach(file => {
        const isCurrent = this.currentPdfName === file.name;
        const item      = document.createElement('div');
        item.className  = `flex items-center justify-between p-3.5 rounded-xl border transition cursor-pointer select-none group ${isCurrent ? 'bg-emerald-500/10 border-emerald-500/50 shadow-sm' : 'bg-slate-800/60 border-slate-700/60 hover:border-emerald-500/60 hover:bg-slate-800/90'}`;
        item.setAttribute('title', isCurrent ? 'File ini sedang aktif dibuka' : `Klik untuk langsung membuka ${file.name}`);

        item.innerHTML = `
          <div class="flex items-center gap-3 min-w-0">
            <input type="checkbox" class="file-merge-checkbox w-4 h-4 rounded border-slate-600 text-emerald-500 bg-slate-900 focus:ring-emerald-500 cursor-pointer flex-shrink-0" data-filename="${file.name}" title="Centang untuk digabung">
            <div class="w-10 h-10 rounded-lg ${isCurrent ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300 group-hover:bg-emerald-600/80 group-hover:text-white'} flex items-center justify-center flex-shrink-0 transition">
              <i data-lucide="file-text" class="w-5 h-5"></i>
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <span class="font-semibold text-sm text-white group-hover:text-emerald-300 truncate max-w-xs md:max-w-md transition">${file.name}</span>
                ${isCurrent ? '<span class="text-[10px] bg-emerald-500/30 text-emerald-300 border border-emerald-500/50 px-2 py-0.5 rounded font-bold">Sedang Dibuka</span>' : ''}
              </div>
              <div class="text-xs text-slate-400 mt-0.5 flex items-center gap-3">
                <span class="text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">${file.pages || 1} Halaman</span>
                <span>•</span>
                <span>Ukuran: ${file.size}</span>
                <span>•</span>
                <span>Dimodifikasi: ${file.date}</span>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-2 flex-shrink-0">
            <button class="btn-open-edition px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center gap-1.5 shadow" data-filename="${file.name}">
              <i data-lucide="book-open" class="w-3.5 h-3.5"></i>
              <span>Buka</span>
            </button>
            <button class="btn-delete-edition p-1.5 rounded-lg bg-slate-700 hover:bg-rose-600 text-slate-300 hover:text-white transition" title="Hapus File PDF dari Server" data-filename="${file.name}">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>
        `;

        // Klik di mana saja pada baris file -> langsung membuka dokumen
        item.addEventListener('click', (e) => {
          if (e.target.closest('.btn-delete-edition') || e.target.closest('.file-merge-checkbox')) {
            return;
          }
          this.loadFromServerFile(file.name);
          this.closeEditionsModal();
        });

        // Tombol hapus file
        item.querySelector('.btn-delete-edition')?.addEventListener('click', (e) => {
          e.stopPropagation();
          this.deletePdfFile(file.name);
        });

        this.editionsFileList.appendChild(item);
      });

      // Events toolbar checkbox
      toolbar.querySelector('#btn-select-all-files')?.addEventListener('click', () => {
        this.editionsFileList.querySelectorAll('.file-merge-checkbox').forEach(cb => { cb.checked = true; });
      });
      toolbar.querySelector('#btn-unselect-all-files')?.addEventListener('click', () => {
        this.editionsFileList.querySelectorAll('.file-merge-checkbox').forEach(cb => { cb.checked = false; });
      });
      toolbar.querySelector('#btn-merge-selected-files')?.addEventListener('click', () => {
        const checked = Array.from(this.editionsFileList.querySelectorAll('.file-merge-checkbox:checked')).map(cb => cb.getAttribute('data-filename'));
        if (checked.length === 0) {
          alert('Silakan centang minimal 1 file PDF yang ingin digabungkan.');
          return;
        }
        this.loadAllCombinedPDFs(checked);
      });

      if (window.lucide) window.lucide.createIcons();
    } catch (err) {
      this.editionsFileList.innerHTML = `
        <div class="text-center py-6 text-rose-400 text-xs">
          Gagal mengambil daftar file: ${err.message}
        </div>
      `;
    }
  }

  async deletePdfFile(filename) {
    if (!confirm(`⚠️ PERINGATAN HAPUS FILE:\n\nApakah Anda yakin ingin MENGHAPUS file "${filename}" dari server lokal?\nFile yang dihapus tidak dapat dikembalikan.`)) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append('action', 'delete');
      formData.append('pub', this.currentPublication);
      formData.append('filename', filename);

      const res  = await fetch('api.php', { method: 'POST', body: formData });
      const data = await res.json();

      if (data.success) {
        alert(`✅ ${data.message}`);
        if (this.currentPdfName === filename) {
          this.closeDocument();
        }
        this.loadEditionsList();
      } else {
        alert(`❌ Gagal: ${data.message}`);
      }
    } catch (err) {
      alert(`Terjadi kesalahan: ${err.message}`);
    }
  }

  async handleModalUpload() {
    const file = this.inputModalPdf?.files[0];
    if (!file) return;

    const btnSubmit = document.getElementById('btn-submit-upload');
    if (btnSubmit) {
      btnSubmit.disabled  = true;
      btnSubmit.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> <span>Mengunggah...</span>`;
      if (window.lucide) window.lucide.createIcons();
    }

    try {
      const formData = new FormData();
      formData.append('action', 'upload');
      formData.append('pub', this.currentPublication);
      formData.append('pdf_file', file);

      const res  = await fetch('api.php', { method: 'POST', body: formData });
      const data = await res.json();

      if (data.success) {
        alert('🎉 ' + data.message);
        if (this.inputModalPdf) this.inputModalPdf.value = '';
        this.loadEditionsList();
        // Langsung buka PDF yang baru diunggah
        await this.loadFromServerFile(file.name);
        this.closeEditionsModal();
      } else {
        alert('❌ Gagal: ' + data.message);
      }
    } catch (err) {
      alert('Gagal mengunggah file: ' + err.message);
    } finally {
      if (btnSubmit) {
        btnSubmit.disabled  = false;
        btnSubmit.innerHTML = `<i data-lucide="upload" class="w-4 h-4"></i> <span>Simpan PDF ke Server</span>`;
        if (window.lucide) window.lucide.createIcons();
      }
    }
  }

  // ─────────────────────────────────────────────────────────
  //  Fitur Unduh / Download Dokumen PDF
  // ─────────────────────────────────────────────────────────
  openDownloadModal() {
    if (!this.downloadModal) return;

    const totalPages = this.pageImages ? this.pageImages.length : 0;
    if (this.downloadPageCount) {
      this.downloadPageCount.innerText = totalPages;
    }
    if (this.downloadCombinedDesc) {
      if (totalPages > 0) {
        this.downloadCombinedDesc.innerText = `Gabungkan seluruh ${totalPages} halaman koran aktif ke dalam 1 file PDF A3 utuh siap cetak atau arsip.`;
      } else {
        this.downloadCombinedDesc.innerText = 'Belum ada halaman koran yang dimuat.';
      }
    }

    // Tampilkan tombol unduh file aktif jika edisi tunggal sedang dibuka
    const isSinglePdf = this.currentPdfName && /\.pdf$/i.test(this.currentPdfName);
    if (this.downloadActiveSingleSection) {
      if (isSinglePdf) {
        this.downloadActiveSingleSection.classList.remove('hidden');
        if (this.downloadActiveFilename) {
          this.downloadActiveFilename.innerText = `Edisi Aktif: ${this.currentPdfName}`;
        }
      } else {
        this.downloadActiveSingleSection.classList.add('hidden');
      }
    }

    this.downloadModal.classList.remove('hidden');
    this.loadDownloadServerFilesList();
    if (window.lucide) window.lucide.createIcons();
  }

  closeDownloadModal() {
    this.downloadModal?.classList.add('hidden');
  }

  async loadDownloadServerFilesList() {
    if (!this.downloadServerFilesList) return;
    this.downloadServerFilesList.innerHTML = `
      <div class="p-4 text-center text-xs text-slate-400">
        <div class="w-5 h-5 border-2 border-slate-600 border-t-emerald-500 rounded-full animate-spin mx-auto mb-2"></div>
        <span>Memuat daftar file PDF di server...</span>
      </div>
    `;

    try {
      const res = await fetch(`api.php?action=list&pub=${encodeURIComponent(this.currentPublication)}`);
      const data = await res.json();

      if (!data.success || !data.files || data.files.length === 0) {
        this.downloadServerFilesList.innerHTML = `
          <div class="p-3 text-center text-xs text-slate-400 bg-slate-800/40 rounded-lg">
            Tidak ada file PDF di folder ${this.currentPublication.toUpperCase()}
          </div>
        `;
        if (this.downloadServerCount) this.downloadServerCount.innerText = '0 File';
        return;
      }

      if (this.downloadServerCount) {
        this.downloadServerCount.innerText = `${data.files.length} File Tersedia`;
      }

      this.downloadServerFilesList.innerHTML = '';
      data.files.forEach(file => {
        const row = document.createElement('div');
        row.className = 'flex items-center justify-between p-2.5 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-xl transition';
        row.innerHTML = `
          <div class="flex items-center gap-2.5 min-w-0 pr-2">
            <div class="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center flex-shrink-0">
              <i data-lucide="file-text" class="w-4 h-4"></i>
            </div>
            <div class="min-w-0">
              <h5 class="text-xs font-semibold text-slate-200 truncate">${file.name}</h5>
              <p class="text-[10px] text-slate-400">${file.pages} Halaman &bull; ${file.size}</p>
            </div>
          </div>
          <button class="btn-download-item flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600/90 hover:bg-emerald-500 active:scale-95 text-white text-xs font-semibold rounded-lg shadow transition flex-shrink-0">
            <i data-lucide="download" class="w-3.5 h-3.5"></i>
            <span>Unduh</span>
          </button>
        `;

        const btn = row.querySelector('.btn-download-item');
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.downloadServerFile(file.name);
        });

        this.downloadServerFilesList.appendChild(row);
      });

      if (window.lucide) window.lucide.createIcons();
    } catch (err) {
      this.downloadServerFilesList.innerHTML = `
        <div class="p-3 text-center text-xs text-rose-400 bg-rose-950/20 rounded-lg">
          Gagal mengambil arsip file: ${err.message}
        </div>
      `;
    }
  }

  downloadServerFile(filename) {
    if (!filename) return;
    const url = `api.php?action=download&pub=${encodeURIComponent(this.currentPublication)}&file=${encodeURIComponent(filename)}`;
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  downloadActiveFile() {
    if (this.currentLocalFile) {
      const url = URL.createObjectURL(this.currentLocalFile);
      const a = document.createElement('a');
      a.href = url;
      a.download = this.currentLocalFile.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else if (this.currentPdfName && /\.pdf$/i.test(this.currentPdfName)) {
      this.downloadServerFile(this.currentPdfName);
    } else {
      this.downloadCombinedPDF();
    }
  }

  async downloadCombinedPDF() {
    if (!this.pageImages || this.pageImages.length === 0) {
      alert('Tidak ada halaman aktif untuk diunduh.');
      return;
    }

    try {
      this.showLoading(`Menyiapkan 1 file PDF gabungan (${this.pageImages.length} halaman)...`);

      const jspdfModule = window.jspdf;
      if (!jspdfModule || !jspdfModule.jsPDF) {
        throw new Error('Library jsPDF belum termuat.');
      }

      const { jsPDF } = jspdfModule;
      // Inisialisasi dokumen format A3 Portrait (297 x 420 mm)
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a3',
        compress: true
      });

      const total = this.pageImages.length;
      for (let i = 0; i < total; i++) {
        const pct = Math.round(((i + 1) / total) * 90);
        this.updateProgress(pct, `Menyusun halaman PDF ${i + 1} dari ${total}...`);

        // Waktu sejenak agar progres bar tampil responsif
        await new Promise(r => setTimeout(r, 30));

        if (i > 0) {
          doc.addPage('a3', 'portrait');
        }

        const pageItem = this.pageImages[i];
        // Standar A3 dalam milimeter = lebar 297, tinggi 420
        doc.addImage(pageItem.dataUrl, 'JPEG', 0, 0, 297, 420, undefined, 'FAST');
      }

      this.updateProgress(95, 'Menyimpan file PDF ke perangkat Anda...');
      await new Promise(r => setTimeout(r, 80));

      const pubInfo = PUBLICATIONS[this.currentPublication] || PUBLICATIONS.alqalam;
      const filename = `${pubInfo.name}-E-Paper-Gabungan-${new Date().toISOString().slice(0, 10)}.pdf`;
      doc.save(filename);

      this.updateProgress(100, 'Unduhan Selesai!');
      setTimeout(() => {
        this.hideLoading();
        this.closeDownloadModal();
      }, 500);
    } catch (err) {
      console.error('Gagal membuat PDF gabungan:', err);
      alert('Gagal membuat PDF gabungan: ' + err.message);
      this.hideLoading();
    }
  }

  // ─────────────────────────────────────────────────────────
  //  Close / Empty Document Canvas
  // ─────────────────────────────────────────────────────────
  closeDocument() {
    if (this.pageFlip) {
      try { this.pageFlip.destroy(); } catch (_) {}
      this.pageFlip = null;
    }
    this.pageImages     = [];
    this.totalPages     = 0;
    this.currentPage    = 0;
    this.currentPdfName = '';
    this.currentPdfUrl  = '';
    this.currentLocalFile = null;

    if (this.pdfTitle)      this.pdfTitle.innerText = 'Tidak Ada Dokumen Aktif';
    if (this.pageIndicator) this.pageIndicator.innerText = '-';
    if (this.thumbnailList) this.thumbnailList.innerHTML = '';

    this.showEmptyCanvas();
  }

  showEmptyCanvas() {
    if (!this.container) return;
    this.container.innerHTML = `
      <div class="flex flex-col items-center justify-center p-12 bg-slate-900/60 border-2 border-dashed border-slate-700 rounded-3xl max-w-md mx-auto text-center shadow-xl">
        <div class="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
          <i data-lucide="file-up" class="w-8 h-8"></i>
        </div>
        <h3 class="font-bold text-white text-base mb-1">Kanvas Kosong</h3>
        <p class="text-xs text-slate-400 mb-5">Tarik &amp; lepaskan file PDF A3 Anda ke sini, atau klik tombol di bawah:</p>
        <label for="file-input" class="cursor-pointer text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl shadow-lg transition">
          Pilih File PDF dari Komputer
        </label>
        <p class="text-xs text-slate-400 mt-4 flex items-center justify-center gap-2">
          <button onclick="window.app.showShelf()" class="text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-2">Rak Koran</button>
          <span class="text-slate-600">&bull;</span>
          <button onclick="window.app.loadAllCombinedPDFs()" class="text-teal-400 hover:text-teal-300 font-semibold underline underline-offset-2">Koran Lengkap</button>
          <span class="text-slate-600">&bull;</span>
          <button onclick="window.app.openEditionsModal()" class="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2">Kelola Edisi</button>
        </p>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
  }

  // ─────────────────────────────────────────────────────────
  //  Procedural Realistic Paper Flip Sound (Web Audio API)
  // ─────────────────────────────────────────────────────────
  playFlipSound() {
    if (!this.soundEnabled) return;
    try {
      if (!this.audioCtx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new AC();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const bufSize = this.audioCtx.sampleRate * 0.15;
      const buffer  = this.audioCtx.createBuffer(1, bufSize, this.audioCtx.sampleRate);
      const output  = buffer.getChannelData(0);
      for (let i = 0; i < bufSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufSize * 0.35));
      }

      const src = this.audioCtx.createBufferSource();
      src.buffer = buffer;

      const filter = this.audioCtx.createBiquadFilter();
      filter.type  = 'bandpass';
      filter.frequency.setValueAtTime(1400, this.audioCtx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(400, this.audioCtx.currentTime + 0.14);
      filter.Q.setValueAtTime(3.0, this.audioCtx.currentTime);

      const gain = this.audioCtx.createGain();
      gain.gain.setValueAtTime(0.35, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.14);

      src.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);
      src.start();
    } catch (e) {
      console.warn('Audio playback error:', e);
    }
  }

  updateSoundIcon() {
    if (!this.btnSound) return;
    if (this.soundEnabled) {
      this.btnSound.innerHTML = `<i data-lucide="volume-2" class="w-4 h-4"></i>`;
      this.btnSound.classList.add('text-emerald-400');
    } else {
      this.btnSound.innerHTML = `<i data-lucide="volume-x" class="w-4 h-4"></i>`;
      this.btnSound.classList.remove('text-emerald-400');
    }
    if (window.lucide) window.lucide.createIcons();
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  // ─────────────────────────────────────────────────────────
  //  Ultra-HD Deep Zoom Modal
  // ─────────────────────────────────────────────────────────
  openZoomModal(pageIndex = null) {
    if (!this.pageImages.length) return;
    if (typeof pageIndex === 'number' && pageIndex >= 0 && pageIndex < this.pageImages.length) {
      this.currentPage = pageIndex;
    }
    this.zoomModal?.classList.remove('hidden');
    if (this.zoomPageSelect) this.zoomPageSelect.value = this.currentPage;
    this.renderZoomPage(this.currentPage);
    if (window.lucide) window.lucide.createIcons();
  }

  closeZoomModal() {
    this.zoomModal?.classList.add('hidden');
    if (this.pageFlip && typeof this.currentPage === 'number') {
      try {
        this.pageFlip.flip(this.currentPage);
      } catch (_) {}
    }
  }

  setZoom(scale, resetPan = false, instant = false) {
    this.zoomScale = Math.max(1.0, Math.min(4.0, scale));
    if (this.zoomLevelLabel) {
      this.zoomLevelLabel.innerText = `${Math.round(this.zoomScale * 100)}%`;
    }
    if (resetPan || this.zoomScale <= 1.01) {
      this.currentPan = { x: 0, y: 0 };
    }
    this.applyPanZoomTransform(instant);
  }

  applyPanZoomTransform(instant = false) {
    const img = this.zoomCanvasContainer?.querySelector('img');
    if (img) {
      img.style.transition = instant ? 'none' : 'transform 0.12s ease-out';
      img.style.transform = `translate(${this.currentPan.x}px, ${this.currentPan.y}px) scale(${this.zoomScale})`;
    }
  }

  renderZoomPage(pageIndex) {
    if (pageIndex < 0 || pageIndex >= this.pageImages.length) return;
    this.currentPage = pageIndex;
    const pageData = this.pageImages[pageIndex];
    if (!pageData) return;

    // Sync Dropdown Selector
    if (this.zoomPageSelect && this.zoomPageSelect.value != pageIndex) {
      this.zoomPageSelect.value = pageIndex;
    }

    // Sync Prev/Next Page Buttons in Zoom Header
    if (this.btnZoomPrevPage) {
      const isFirst = pageIndex <= 0;
      this.btnZoomPrevPage.disabled = isFirst;
      this.btnZoomPrevPage.style.opacity = isFirst ? '0.35' : '1';
      this.btnZoomPrevPage.style.cursor = isFirst ? 'not-allowed' : 'pointer';
    }
    if (this.btnZoomNextPage) {
      const isLast = pageIndex >= this.pageImages.length - 1;
      this.btnZoomNextPage.disabled = isLast;
      this.btnZoomNextPage.style.opacity = isLast ? '0.35' : '1';
      this.btnZoomNextPage.style.cursor = isLast ? 'not-allowed' : 'pointer';
    }

    // Sync Background Flipbook indicator & Thumbnails
    this.updatePageIndicator();
    this.highlightThumbnail(pageIndex);

    if (this.zoomCanvasContainer) {
      this.zoomCanvasContainer.innerHTML = '';
      const img        = document.createElement('img');
      img.src          = pageData.dataUrl;
      img.alt          = `Zoom Halaman ${pageIndex + 1}`;
      img.className    = 'max-w-none shadow-2xl select-none pointer-events-none rounded';
      img.style.transformOrigin = 'center center';
      img.style.transition = 'none';
      img.draggable    = false;

      // Fit page perfectly within the available container space at 100% zoom
      const containerW = Math.max(280, this.zoomCanvasContainer.clientWidth || window.innerWidth);
      const containerH = Math.max(300, this.zoomCanvasContainer.clientHeight || (window.innerHeight - 60));
      const margin = containerW < 640 ? 12 : 36;
      const availW = Math.max(200, containerW - margin);
      const availH = Math.max(200, containerH - margin);
      
      const pageRatio = (pageData.width && pageData.height) ? (pageData.width / pageData.height) : (1 / 1.414);
      let renderW, renderH;

      if ((availW / availH) < pageRatio) {
        renderW = availW;
        renderH = availW / pageRatio;
      } else {
        renderH = availH;
        renderW = availH * pageRatio;
      }

      img.style.width  = `${Math.round(renderW)}px`;
      img.style.height = `${Math.round(renderH)}px`;
      this.zoomCanvasContainer.appendChild(img);
    }
    this.setZoom(1.0, true, false);
  }
}

// ─────────────────────────────────────────────────────────
//  Bootstrap on DOM Ready
// ─────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  window.app = new EPaperApp();
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (window.lucide) window.lucide.createIcons();
});
