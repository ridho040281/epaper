/**
 * AL QALAM Studio - Generator Layout Koran A3 MTsN 1 Blitar
 * Created for automated instant publishing to E-Paper Flipbook
 */

class AlqalamStudio {
  constructor() {
    this.zoomScale = 0.75;
    this.currentTemplate = 'teacher_opinion';
    this.demoText = `Matematika sering kali dianggap sebagai mata pelajaran yang sulit dan kurang diminati oleh sebagian murid. Padahal, matematika merupakan ilmu penting yang tidak hanya dipelajari di bangku sekolah, tetapi juga diterapkan dalam berbagai aspek kehidupan sehari-hari. Untuk mengubah pandangan tersebut, penting bagi murid untuk mengenal matematika lebih dekat dan memahami manfaatnya melalui kegiatan belajar yang menyenangkan.

Matematika merupakan salah satu ilmu eksakta yang memiliki konsep, rumus, dan prinsip yang dapat dibuktikan melalui proses berpikir logis dan sistematis. Ilmu ini menjadi dasar bagi berbagai bidang pengetahuan, seperti fisika, ekonomi, teknologi, bahkan kesehatan. Oleh karena itu, kemampuan matematika sangat diperlukan untuk membantu seseorang memahami persoalan dan menemukan solusi yang tepat.

Ada pepatah mengatakan, "Tak kenal maka tak sayang." Begitu pula dengan matematika. Ketika murid mulai mengenal manfaat dan penerapannya, matematika tidak lagi sekadar kumpulan angka dan rumus, tetapi menjadi ilmu yang menarik untuk dipelajari.

Lalu, apa saja manfaat belajar matematika?
Pertama, melatih pola pikir sistematis. Dalam menyelesaikan soal matematika, murid perlu mengikuti langkah-langkah yang runtut dan teratur. Kebiasaan ini membantu murid berpikir lebih terstruktur ketika menghadapi berbagai persoalan, baik dalam pembelajaran maupun kehidupan sehari-hari.

Kedua, melatih kesabaran dan ketekunan. Tidak semua soal matematika dapat diselesaikan dalam waktu singkat. Terkadang, murid perlu mencoba beberapa cara sebelum menemukan jawaban yang tepat. Proses ini mengajarkan pentingnya kesabaran, ketelitian, dan semangat untuk terus berusaha meskipun menghadapi kesulitan.

Ketiga, mengembangkan kemampuan berpikir logis dan rasional. Matematika mengajarkan murid untuk menggunakan alasan yang masuk akal dalam mengambil keputusan. Setiap langkah penyelesaian perlu dipertimbangkan dengan cermat agar memperoleh hasil yang tepat. Kemampuan ini sangat berguna ketika murid harus menganalisis informasi dan menentukan pilihan.

Selain ketiga manfaat tersebut, matematika juga dapat dipelajari melalui berbagai permainan yang menarik. Permainan domino, kartu angka, teka-teki logika, hingga permainan berhitung dapat menjadi sarana untuk mengasah kemampuan numerasi tanpa membuat suasana belajar terasa membosankan. Melalui permainan, murid dapat belajar sambil bersenang-senang, berlatih bekerja sama, dan mengembangkan strategi.

Dalam kehidupan sehari-hari, matematika hadir dalam berbagai kegiatan sederhana. Ketika berbelanja, kita menggunakan matematika untuk menghitung total harga dan uang kembalian. Saat memasak, kita membutuhkan perhitungan takaran bahan. Ketika bepergian, kita dapat memperkirakan jarak, waktu, dan kecepatan. Bahkan, saat bermain atau menyusun jadwal kegiatan, kita juga menerapkan konsep matematika tanpa selalu menyadarinya.

Dengan menghubungkan matematika dengan kehidupan mereka, melakukan percobaan sederhana, bermain permainan edukatif, serta berdiskusi bersama teman. Dengan cara tersebut, matematika akan terasa lebih nyata, mudah dipahami, dan menyenangkan.

Pada akhirnya, matematika bukan sekadar mata pelajaran yang menuntut ketepatan jawaban, melainkan juga sarana untuk membentuk pola pikir yang kritis, kreatif, dan logis. Kunci untuk menguasainya adalah kemauan untuk belajar, berlatih secara konsisten, dan tidak takut melakukan kesalahan.

Yuk, kita ubah anggapan bahwa matematika itu sulit menjadi matematika itu seru!
Mari belajar matematika dengan penuh semangat, temukan keseruannya, dan rasakan manfaatnya dalam kehidupan sehari-hari. Karena dengan matematika, kita belajar bukan hanya menghitung angka, tetapi juga berpikir, memecahkan masalah, dan mengambil keputusan dengan lebih baik.`;

    this.initElements();
    this.initEvents();
    this.initDefaultContent();
    this.adjustZoomToFit();
    this.loadMasterHeader();
  }

  initElements() {
    // Header Master & Kop Inputs
    this.headerMode                 = 'custom'; // Selalu gunakan Kop Master Upload
    this.headerDatePosition         = 'overlay'; // 'overlay', 'below', 'hide'
    this.containerHeaderControls    = document.getElementById('container-header-upload-controls');
    this.containerPreviewHeader     = document.getElementById('container-preview-header');
    this.previewCustomHeaderImg     = document.getElementById('preview-custom-header-img');
    this.btnResetMasterHeader       = document.getElementById('btn-reset-master-header');
    this.labelUploadHeader          = document.getElementById('label-upload-header');
    this.btnTriggerUploadHeader     = document.getElementById('btn-trigger-upload-header');
    this.inpCustomHeader            = document.getElementById('inp-custom-header');
    this.containerCustomEditionToggle = document.getElementById('container-custom-edition-toggle');
    this.btnPosOverlay              = document.getElementById('btn-pos-overlay');
    this.btnPosBelow                = document.getElementById('btn-pos-below');
    this.btnPosHide                 = document.getElementById('btn-pos-hide');

    // Live Views Header on A3 Sheet
    this.viewCustomHeaderWrapper    = document.getElementById('view-custom-header-wrapper');
    this.viewDefaultHeaderWrapper   = document.getElementById('view-default-header-wrapper');
    this.viewCustomHeaderImg        = document.getElementById('view-custom-header-img');
    this.viewCustomHeaderOverlayBox = document.getElementById('view-custom-header-overlay-box');
    this.viewDayCustomOverlay       = document.getElementById('view-day-custom-overlay');
    this.viewDateMasehiCustomOverlay = document.getElementById('view-date-masehi-custom-overlay');
    this.viewDateHijriCustomOverlay = document.getElementById('view-date-hijri-custom-overlay');
    this.viewEditionNumCustomOverlay = document.getElementById('view-edition-num-custom-overlay');

    this.viewCustomHeaderEditionBar = document.getElementById('view-custom-header-edition-bar');
    this.viewDayCustomBar           = document.getElementById('view-day-custom-bar');
    this.viewDateMasehiCustomBar    = document.getElementById('view-date-masehi-custom-bar');
    this.viewDateHijriCustomBar     = document.getElementById('view-date-hijri-custom-bar');
    this.viewEditionNumCustomBar    = document.getElementById('view-edition-num-custom-bar');

    // Penyesuaian Offset Vertikal Hari & Tanggal (Sejajar Huruf M)
    this.dateOffset                 = 48;
    this.btnDateUp                  = document.getElementById('btn-date-up');
    this.btnDateDown                = document.getElementById('btn-date-down');
    this.labelDateOffset            = document.getElementById('label-date-offset');
    this.viewDefaultDateBox         = document.getElementById('view-default-date-box');

    // Pengatur Ukuran & Lebar Kop Utama (Bawaan & Upload)
    this.kopSizes = [
      { label: 'Sedang', h: 120, customScale: 1.0, dateMt: 32 },
      { label: 'Lebar', h: 160, customScale: 1.08, dateMt: 48 },
      { label: 'Ekstra Lebar', h: 195, customScale: 1.18, dateMt: 66 },
      { label: 'Maksimal', h: 235, customScale: 1.30, dateMt: 88 }
    ];
    this.kopSizeIndex               = 1; // Default 'Lebar' (160px height, ~347px wide for brand logo)
    this.btnKopSizeDown             = document.getElementById('btn-kop-size-down');
    this.btnKopSizeUp               = document.getElementById('btn-kop-size-up');
    this.labelKopSize               = document.getElementById('label-kop-size');
    this.chkFullWidthHeader         = document.getElementById('chk-full-width-header');
    this.viewBrandHeaderImg         = document.getElementById('view-brand-header-img');
    this.containerSheetHeader       = document.getElementById('container-sheet-header');

    // Inputs
    this.inpDay             = document.getElementById('inp-day');
    this.inpDateMasehi      = document.getElementById('inp-date-masehi');
    this.inpDateHijri       = document.getElementById('inp-date-hijri');
    this.inpEditionNum      = document.getElementById('inp-edition-num');
    this.inpAuthorName          = document.getElementById('inp-author-name');
    this.inpAuthorPhoto         = document.getElementById('inp-author-photo');
    this.previewAuthorImg       = document.getElementById('preview-author-img');
    this.placeholderPreviewAuthor = document.getElementById('placeholder-preview-author');
    this.labelAuthorPhoto       = document.getElementById('label-author-photo');
    this.btnClearAuthorPhoto    = document.getElementById('btn-clear-author-photo');
    this.btnMakeAuthorTransparent = document.getElementById('btn-make-author-transparent');
    this.btnTrimAuthorPhoto     = document.getElementById('btn-trim-author-photo');
    this.btnAuthorFrameNone     = document.getElementById('btn-author-frame-none');
    this.btnAuthorFrameBox      = document.getElementById('btn-author-frame-box');
    this.btnAuthorAlignLeft     = document.getElementById('btn-author-align-left');
    this.btnAuthorAlignCenter   = document.getElementById('btn-author-align-center');
    this.btnResetAuthorSize     = document.getElementById('btn-reset-author-size');
    this.labelAuthorSize        = document.getElementById('label-author-size');
    this.handleResizeAuthor     = document.getElementById('handle-resize-author');
    this.chkShowAuthorBadge     = document.getElementById('chk-show-author-badge');
    this.inpHeadline            = document.getElementById('inp-headline');
    this.inpSubheadline         = document.getElementById('inp-subheadline');
    this.inpBodyText            = document.getElementById('inp-body-text');
    this.textWordCount          = document.getElementById('text-word-count');
    this.inpActivityPhoto       = document.getElementById('inp-activity-photo');
    this.previewActivityImg     = document.getElementById('preview-activity-img');
    this.placeholderPreviewActivity = document.getElementById('placeholder-preview-activity');
    this.labelActivityPhoto     = document.getElementById('label-activity-photo');
    this.chkShowActivityImg     = document.getElementById('chk-show-activity-img');
    this.inpCalloutQuote        = document.getElementById('inp-callout-quote');
    this.selEventLogo           = document.getElementById('sel-event-logo');
    this.inpPageNum             = document.getElementById('inp-page-num');

    // Live Views on A3 Sheet
    this.viewDay                = document.getElementById('view-day');
    this.viewDateMasehi         = document.getElementById('view-date-masehi');
    this.viewDateHijri          = document.getElementById('view-date-hijri');
    this.viewEditionNum         = document.getElementById('view-edition-num');
    this.viewAuthorImg          = document.getElementById('view-author-img');
    this.placeholderViewAuthor  = document.getElementById('placeholder-view-author');
    this.authorPhotoFrame       = document.getElementById('author-photo-frame');
    this.containerAuthorPhoto   = document.getElementById('container-author-photo') || document.getElementById('container-author-card');
    this.viewAuthorBadge        = document.getElementById('view-author-badge');
    this.containerAuthorBadge   = document.getElementById('container-author-badge');
    this.authorSlotSpacer       = document.getElementById('author-slot-spacer');
    this.btnResetAuthorPhotoPos = document.getElementById('btn-reset-author-photo-pos') || document.getElementById('btn-reset-author-pos');
    this.btnResetAuthorBadgePos = document.getElementById('btn-reset-author-badge-pos');
    this.chkHeadlineSpacer      = document.getElementById('chk-headline-spacer');
    this.btnPosPresets          = document.querySelectorAll('.btn-pos-preset');

    // Pengaturan Gaya & Ukuran Foto Penulis Dinamis
    this.authorPhotoWidth       = 170; // Lebar foto dalam pixel (bisa di-resize dinamis dengan seret pojok kanan bawah)
    this.authorFrameMode        = 'none'; // 'none' (Tanpa Bingkai & Transparan PNG) atau 'box'
    this.viewByline             = document.getElementById('view-byline');
    this.viewHeadline           = document.getElementById('view-headline');
    this.viewSubheadline        = document.getElementById('view-subheadline');
    this.viewNewspaperContent   = document.getElementById('view-newspaper-content');
    this.containerBottomInserts = document.getElementById('container-bottom-inserts');
    this.viewActivityImg        = document.getElementById('view-activity-img');
    this.containerViewActivity  = document.getElementById('container-view-activity');
    this.viewCalloutQuote       = document.getElementById('view-callout-quote');
    this.containerViewIllustration = document.getElementById('container-view-illustration');
    this.viewIllustrationImg    = document.getElementById('view-illustration-img');
    this.containerViewEventLogo = document.getElementById('container-view-event-logo');
    this.viewEventLogoImg       = document.getElementById('view-event-logo-img');
    this.viewFooterPage         = document.getElementById('view-footer-page');

    // Preview Stage & Zoom
    this.a3Sheet            = document.getElementById('a3-sheet');
    this.previewStage       = document.getElementById('preview-stage');
    this.labelZoom          = document.getElementById('label-zoom');
    this.btnZoomIn          = document.getElementById('btn-zoom-in');
    this.btnZoomOut         = document.getElementById('btn-zoom-out');
    this.btnZoomFit         = document.getElementById('btn-zoom-fit');

    // Action Buttons
    this.btnDemoPreset      = document.getElementById('btn-demo-preset');
    this.btnExportPdf       = document.getElementById('btn-export-pdf');
    this.btnPublishEpaper   = document.getElementById('btn-publish-epaper');

    // Mobile View Toggle
    this.editorPanel        = document.getElementById('editor-panel');
    this.previewPanel       = document.getElementById('preview-panel');
    this.btnToggleEditor    = document.getElementById('btn-toggle-editor');
    this.btnTogglePreview   = document.getElementById('btn-toggle-preview');

    // Loading overlay
    this.loadingOverlay     = document.getElementById('studio-loading');
    this.loadingTitle       = document.getElementById('studio-loading-title');
    this.loadingDesc        = document.getElementById('studio-loading-desc');
  }

  initEvents() {
    // Kop Master & Header Event Listeners
    this.btnTriggerUploadHeader?.addEventListener('click', () => {
      this.inpCustomHeader?.click();
    });
    this.inpCustomHeader?.addEventListener('change', (e) => this.handleCustomHeaderUpload(e));
    this.btnResetMasterHeader?.addEventListener('click', () => this.resetMasterHeader());
    
    // Posisi Tanggal & Hari pada Kop Master
    this.btnPosOverlay?.addEventListener('click', () => this.setHeaderDatePosition('overlay'));
    this.btnPosBelow?.addEventListener('click', () => this.setHeaderDatePosition('below'));
    this.btnPosHide?.addEventListener('click', () => this.setHeaderDatePosition('hide'));

    // Pengatur Naik/Turun Vertikal Hari & Tanggal (Sejajar Huruf M)
    this.btnDateUp?.addEventListener('click', () => this.setDateOffset(this.dateOffset - 2));
    this.btnDateDown?.addEventListener('click', () => this.setDateOffset(this.dateOffset + 2));

    // Pengatur Skala & Lebar Kop Utama
    this.btnKopSizeDown?.addEventListener('click', () => this.changeKopSize(-1));
    this.btnKopSizeUp?.addEventListener('click', () => this.changeKopSize(1));
    this.chkFullWidthHeader?.addEventListener('change', () => this.updateHeaderFullBleed());

    // Live Input Event Listeners
    const bindLive = (inp, views) => {
      if (!inp) return;
      inp.addEventListener('input', () => {
        const val = inp.value;
        views.forEach(v => {
          if (v) v.innerText = val;
        });
      });
    };

    bindLive(this.inpDay, [this.viewDay, this.viewDayCustomOverlay, this.viewDayCustomBar]);
    bindLive(this.inpDateMasehi, [this.viewDateMasehi, this.viewDateMasehiCustomOverlay, this.viewDateMasehiCustomBar]);
    bindLive(this.inpDateHijri, [this.viewDateHijri, this.viewDateHijriCustomOverlay, this.viewDateHijriCustomBar]);
    bindLive(this.inpEditionNum, [this.viewEditionNum, this.viewEditionNumCustomOverlay, this.viewEditionNumCustomBar]);
    bindLive(this.inpHeadline, this.viewHeadline);
    bindLive(this.inpSubheadline, this.viewSubheadline);
    // Callout quote updates
    this.inpCalloutQuote?.addEventListener('input', () => {
      this.updateBottomInsertsVisibility();
    });
    bindLive(this.inpPageNum, this.viewFooterPage);

    // Author Name updates both Badge & Byline
    this.inpAuthorName?.addEventListener('input', () => {
      const name = this.inpAuthorName.value.trim();
      if (this.viewAuthorBadge) this.viewAuthorBadge.innerText = name;
      if (this.viewByline) this.viewByline.innerText = name;
    });

    // Body Text Live Formatter
    this.inpBodyText?.addEventListener('input', () => this.formatNewspaperContent());

    // Photo Uploads & Gaya Tampilan Penulis
    this.inpAuthorPhoto?.addEventListener('change', (e) => this.handleAuthorPhotoUpload(e));
    this.btnClearAuthorPhoto?.addEventListener('click', () => this.setAuthorPhoto(null));
    this.btnMakeAuthorTransparent?.addEventListener('click', () => this.makeAuthorPhotoTransparent());
    this.btnTrimAuthorPhoto?.addEventListener('click', () => this.trimAuthorPhoto(true));
    this.btnAuthorFrameNone?.addEventListener('click', () => this.setAuthorFrameMode('none'));
    this.btnAuthorFrameBox?.addEventListener('click', () => this.setAuthorFrameMode('box'));
    this.btnAuthorAlignLeft?.addEventListener('click', () => {
      this.setAuthorAlign('left');
      const curLeft = parseFloat(this.containerAuthorPhoto?.style.left);
      if (!isNaN(curLeft) && curLeft > -10 && curLeft < 350) {
        this.setAuthorPhotoPosition(-32, parseFloat(this.containerAuthorPhoto?.style.top) || 35, true);
      }
    });
    this.btnAuthorAlignCenter?.addEventListener('click', () => this.setAuthorAlign('center'));
    this.btnResetAuthorSize?.addEventListener('click', () => this.resetAuthorPhotoWidth());
    this.chkShowAuthorBadge?.addEventListener('change', () => this.toggleAuthorBadge(this.chkShowAuthorBadge.checked));
    this.inpActivityPhoto?.addEventListener('change', (e) => this.handleActivityPhotoUpload(e));

    // Author Photo & Name Badge Drag & Drop Events & Presets
    this.btnResetAuthorPhotoPos?.addEventListener('click', () => this.resetAuthorPhotoPosition());
    this.btnResetAuthorBadgePos?.addEventListener('click', () => this.resetAuthorBadgePosition());
    this.chkHeadlineSpacer?.addEventListener('change', () => this.toggleHeadlineSpacer(this.chkHeadlineSpacer.checked));
    this.btnPosPresets?.forEach(btn => {
      btn.addEventListener('click', () => {
        const posKey = btn.getAttribute('data-pos');
        this.applyAuthorPosPreset(posKey);
      });
    });
    this.initDraggables();
    this.initAuthorResizeHandle();

    // Show/Hide Activity Photo
    this.chkShowActivityImg?.addEventListener('change', () => {
      this.updateBottomInsertsVisibility();
    });

    // Event Logo Selector
    this.selEventLogo?.addEventListener('change', () => {
      const val = this.selEventLogo.value;
      if (this.viewEventLogoImg) {
        if (val === 'hari_santri') {
          this.viewEventLogoImg.src = 'covers/alqalam.jpg';
        } else if (val === 'sumpah_pemuda') {
          this.viewEventLogoImg.src = 'assets/template/demo_logo_sumpah_pemuda.jpg';
        } else {
          this.viewEventLogoImg.src = '';
        }
      }
      this.updateBottomInsertsVisibility();
    });

    // Zoom Controls
    this.btnZoomIn?.addEventListener('click', () => this.setZoom(this.zoomScale + 0.1));
    this.btnZoomOut?.addEventListener('click', () => this.setZoom(this.zoomScale - 0.1));
    this.btnZoomFit?.addEventListener('click', () => this.adjustZoomToFit());

    // Demo Preset
    this.btnDemoPreset?.addEventListener('click', () => {
      if (confirm('Muat ulang naskah dan gambar contoh (Pak Mohamad Jamil, S.Pd.)?')) {
        this.loadDemoPreset();
      }
    });

    // Export PDF
    this.btnExportPdf?.addEventListener('click', () => this.generateAndDownloadPdf());

    // Direct Publish
    this.btnPublishEpaper?.addEventListener('click', () => this.publishDirectToEpaper());

    // Mobile View Toggle
    this.btnToggleEditor?.addEventListener('click', () => {
      this.editorPanel?.classList.remove('hidden');
      this.previewPanel?.classList.add('hidden');
      this.btnToggleEditor.className = 'px-3 py-1 rounded-lg text-xs font-bold bg-emerald-600 text-white transition';
      this.btnTogglePreview.className = 'px-3 py-1 rounded-lg text-xs font-bold text-slate-300 hover:text-white transition';
    });
    this.btnTogglePreview?.addEventListener('click', () => {
      this.editorPanel?.classList.add('hidden');
      this.previewPanel?.classList.remove('hidden');
      this.btnTogglePreview.className = 'px-3 py-1 rounded-lg text-xs font-bold bg-emerald-600 text-white transition';
      this.btnToggleEditor.className = 'px-3 py-1 rounded-lg text-xs font-bold text-slate-300 hover:text-white transition';
      setTimeout(() => this.adjustZoomToFit(), 50);
    });

    // Window resize auto adjust
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) {
        this.editorPanel?.classList.remove('hidden');
        this.previewPanel?.classList.remove('hidden');
      }
    });
  }

  setZoom(scale) {
    this.zoomScale = Math.max(0.35, Math.min(1.5, scale));
    if (this.labelZoom) {
      this.labelZoom.innerText = `${Math.round(this.zoomScale * 100)}%`;
    }
    if (this.a3Sheet) {
      this.a3Sheet.style.transform = `scale(${this.zoomScale})`;
    }
  }

  adjustZoomToFit() {
    if (!this.previewStage || !this.a3Sheet) return;
    const stageW = this.previewStage.clientWidth - 48;
    const stageH = this.previewStage.clientHeight - 48;
    const sheetW = 840;
    const sheetH = 1188;

    const scaleW = stageW / sheetW;
    const scaleH = stageH / sheetH;
    const bestScale = Math.min(scaleW, scaleH);
    this.setZoom(Math.max(0.4, Math.min(1.0, bestScale)));
  }

  handleCustomHeaderUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const dataUrl = evt.target.result;
      this.applyCustomHeader(dataUrl, true);

      // Simpan di local storage browser
      try {
        localStorage.setItem('alqalam_master_header', dataUrl);
      } catch (err) {
        console.warn('LocalStorage quota limit:', err);
      }

      // Unggah ke server template agar semua pengguna/perangkat menggunakan kop yang sama
      const fd = new FormData();
      fd.append('header_file', file);
      fetch('api.php?action=upload_header', {
        method: 'POST',
        body: fd
      })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.header_url) {
          console.log('Master header tersimpan di server:', data.header_url);
          try {
            localStorage.setItem('alqalam_master_header', data.header_url);
          } catch (e) {}
        } else {
          console.warn('Server upload notice:', data.message);
        }
      })
      .catch(err => console.error('Gagal simpan header ke server:', err));

      if (this.labelUploadHeader) this.labelUploadHeader.innerText = 'Ganti File Kop Master';
      alert('🎉 File Kop Master Berhasil Dipasang!\n\nKop telah diterapkan pada lembaran koran A3 dan otomatis disimpan sebagai master.');
    };
    reader.readAsDataURL(file);
  }

  async loadMasterHeader() {
    // 1. Cek local storage browser terlebih dahulu (prioritas utama dan instan saat refresh)
    const localHeader = localStorage.getItem('alqalam_master_header');
    if (localHeader) {
      this.applyCustomHeader(localHeader, true);
    }

    // 2. Cek sinkronisasi master kop aktif dari server
    try {
      const res = await fetch('api.php?action=get_template_header&t=' + Date.now());
      const data = await res.json();
      if (data.success && data.has_custom_header && data.header_url) {
        // Jika belum ada di local cache, pasang dari server dan simpan ke local cache
        if (!localHeader) {
          this.applyCustomHeader(data.header_url, true);
          try {
            localStorage.setItem('alqalam_master_header', data.header_url);
          } catch (e) {}
        }
      }
    } catch (e) {
      console.warn('Gagal cek header di server:', e);
    }
  }

  applyCustomHeader(url, setMode = true) {
    if (this.viewCustomHeaderImg) this.viewCustomHeaderImg.src = url;
    if (this.previewCustomHeaderImg) this.previewCustomHeaderImg.src = url;
    if (this.containerPreviewHeader) this.containerPreviewHeader.classList.remove('hidden');
    if (this.labelUploadHeader) this.labelUploadHeader.innerText = 'Ganti File Kop Master';
    if (setMode) {
      this.setHeaderMode('custom');
    }
  }

  setHeaderMode(mode) {
    this.headerMode = mode;
    this.updateHeaderDisplay();
  }

  setDateOffset(val) {
    this.dateOffset = Math.max(0, Math.min(120, val));
    if (this.labelDateOffset) {
      this.labelDateOffset.innerText = `${this.dateOffset} px`;
    }
    if (this.viewDefaultDateBox) {
      this.viewDefaultDateBox.style.marginTop = `${this.dateOffset}px`;
    }
    if (this.viewCustomHeaderOverlayBox) {
      this.viewCustomHeaderOverlayBox.style.top = `${this.dateOffset + 24}px`;
    }
  }

  changeKopSize(delta) {
    this.kopSizeIndex = Math.max(0, Math.min(this.kopSizes.length - 1, this.kopSizeIndex + delta));
    const current = this.kopSizes[this.kopSizeIndex];
    if (this.labelKopSize) {
      this.labelKopSize.innerText = current.label;
    }

    // 1. Perubahan skala untuk Kop Bawaan (AL QALAM Logo Resmi)
    if (this.viewBrandHeaderImg) {
      this.viewBrandHeaderImg.style.height = `${current.h}px`;
    }

    // 2. Perubahan skala untuk Kop Upload (Master Custom Header Image)
    if (this.viewCustomHeaderImg) {
      this.viewCustomHeaderImg.style.transform = `scale(${current.customScale})`;
      this.viewCustomHeaderImg.style.transformOrigin = 'center top';
    }

    this.setDateOffset(current.dateMt);
  }

  updateHeaderFullBleed() {
    const isFull = this.chkFullWidthHeader?.checked ?? false;
    if (this.containerSheetHeader) {
      if (isFull) {
        // Melebar menembus batas margin kertas A3 (Full Bleed 100% tepi ke tepi)
        this.containerSheetHeader.classList.add('-mx-8', '-mt-8', 'bg-white');
        if (this.viewDefaultHeaderWrapper) {
          this.viewDefaultHeaderWrapper.classList.add('px-8', 'pt-6');
        }
      } else {
        this.containerSheetHeader.classList.remove('-mx-8', '-mt-8', 'bg-white');
        if (this.viewDefaultHeaderWrapper) {
          this.viewDefaultHeaderWrapper.classList.remove('px-8', 'pt-6');
        }
      }
    }
  }

  setHeaderDatePosition(pos) {
    this.headerDatePosition = pos;
    this.updateHeaderDisplay();
  }

  updateHeaderDisplay() {
    this.containerCustomEditionToggle?.classList.remove('hidden');

    // Update tombol posisi hari & tanggal
    const updateBtnStyle = (btn, isActive) => {
      if (!btn) return;
      if (isActive) {
        btn.className = 'px-2 py-1.5 rounded-lg text-[10px] font-semibold border border-emerald-500 bg-emerald-500/10 text-emerald-300 text-center transition cursor-pointer shadow-sm';
      } else {
        btn.className = 'px-2 py-1.5 rounded-lg text-[10px] font-semibold border border-slate-700 bg-slate-800/60 text-slate-400 hover:text-white text-center transition cursor-pointer';
      }
    };
    updateBtnStyle(this.btnPosOverlay, this.headerDatePosition === 'overlay');
    updateBtnStyle(this.btnPosBelow, this.headerDatePosition === 'below');
    updateBtnStyle(this.btnPosHide, this.headerDatePosition === 'hide');

    // Tampilan di Sheet A3: Selalu gunakan Kop Master Upload
    this.viewCustomHeaderWrapper?.classList.remove('hidden');
    this.viewDefaultHeaderWrapper?.classList.add('hidden');

    // Box Hari & Tanggal (Rata Kanan)
    if (this.viewCustomHeaderOverlayBox) {
      this.viewCustomHeaderOverlayBox.style.display = (this.headerDatePosition === 'overlay') ? 'block' : 'none';
    }
    if (this.viewCustomHeaderEditionBar) {
      this.viewCustomHeaderEditionBar.style.display = (this.headerDatePosition === 'below') ? 'flex' : 'none';
    }
    if (window.lucide) window.lucide.createIcons();
  }

  async resetMasterHeader() {
    if (!confirm('Hapus kop master yang terpasang?')) return;

    localStorage.removeItem('alqalam_master_header');
    if (this.viewCustomHeaderImg) this.viewCustomHeaderImg.src = '';
    if (this.previewCustomHeaderImg) this.previewCustomHeaderImg.src = '';
    if (this.containerPreviewHeader) this.containerPreviewHeader.classList.add('hidden');
    if (this.labelUploadHeader) this.labelUploadHeader.innerText = 'Upload File Kop / Header Master';
    if (this.inpCustomHeader) this.inpCustomHeader.value = '';

    try {
      await fetch('api.php?action=reset_template_header');
    } catch (e) {
      console.warn('Gagal reset master header di server:', e);
    }
  }

  handleImageUpload(event, targetImg, previewImg) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      if (targetImg) targetImg.src = dataUrl;
      if (previewImg) previewImg.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }

  formatNewspaperContent() {
    if (!this.inpBodyText || !this.viewNewspaperContent) return;
    const text = this.inpBodyText.value.trim();
    
    // Update word count
    const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
    if (this.textWordCount) {
      this.textWordCount.innerText = `${words} kata`;
    }

    if (!text) {
      this.viewNewspaperContent.innerHTML = '<p class="text-slate-400 italic">Belum ada naskah. Silakan tempel naskah artikel Anda pada form di sebelah kiri.</p>';
      return;
    }

    // Split paragraphs
    const paragraphs = text.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
    let html = '';

    paragraphs.forEach((p, idx) => {
      const safeText = p.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      if (idx === 0) {
        html += `<p class="drop-cap mb-3 leading-relaxed">${safeText}</p>`;
      } else {
        html += `<p class="mb-3 leading-relaxed text-justify" style="text-indent: 1.25rem;">${safeText}</p>`;
      }
    });

    this.viewNewspaperContent.innerHTML = html;
  }

  initDefaultContent() {
    this.formatNewspaperContent();

    // Pulihkan foto penulis dari localStorage jika pernah diunggah, jika belum ada biarkan KOSONG secara default
    const savedAuthorPhoto = localStorage.getItem('alqalam_author_photo');
    if (savedAuthorPhoto) {
      this.setAuthorPhoto(savedAuthorPhoto);
    } else {
      this.setAuthorPhoto(null); // Kosongkan secara default sesuai permintaan pengguna
    }

    // Default: Kosongkan & sembunyikan foto kegiatan, doodle, dan logo event
    if (this.chkShowActivityImg) this.chkShowActivityImg.checked = false;
    if (this.viewActivityImg) {
      this.viewActivityImg.src = '';
      this.viewActivityImg.classList.add('hidden');
    }
    if (this.previewActivityImg) {
      this.previewActivityImg.src = '';
      this.previewActivityImg.classList.add('hidden');
    }
    if (this.placeholderPreviewActivity) this.placeholderPreviewActivity.classList.remove('hidden');
    if (this.labelActivityPhoto) this.labelActivityPhoto.innerText = 'Upload Foto Kegiatan';

    if (this.inpCalloutQuote) this.inpCalloutQuote.value = '';
    if (this.viewCalloutQuote) this.viewCalloutQuote.style.display = 'none';

    if (this.selEventLogo) this.selEventLogo.value = 'none';
    if (this.viewEventLogoImg) this.viewEventLogoImg.src = '';
    if (this.containerViewEventLogo) this.containerViewEventLogo.style.display = 'none';

    if (this.viewIllustrationImg) this.viewIllustrationImg.src = '';
    if (this.containerViewIllustration) this.containerViewIllustration.style.display = 'none';

    this.updateBottomInsertsVisibility();
    this.initAuthorCardStyles();

    if (window.lucide) window.lucide.createIcons();
  }

  handleActivityPhotoUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const dataUrl = evt.target.result;
      if (this.viewActivityImg) {
        this.viewActivityImg.src = dataUrl;
        this.viewActivityImg.classList.remove('hidden');
      }
      if (this.previewActivityImg) {
        this.previewActivityImg.src = dataUrl;
        this.previewActivityImg.classList.remove('hidden');
      }
      if (this.placeholderPreviewActivity) {
        this.placeholderPreviewActivity.classList.add('hidden');
      }
      if (this.labelActivityPhoto) {
        this.labelActivityPhoto.innerText = 'Ganti Foto Kegiatan';
      }
      if (this.chkShowActivityImg) {
        this.chkShowActivityImg.checked = true;
      }
      this.updateBottomInsertsVisibility();
    };
    reader.readAsDataURL(file);
  }

  updateBottomInsertsVisibility() {
    const hasActivity = (this.chkShowActivityImg?.checked && this.viewActivityImg?.getAttribute('src')) ? true : false;
    const quoteText = this.inpCalloutQuote?.value?.trim() || '';
    const hasQuote = quoteText !== '';
    const logoVal = this.selEventLogo?.value || 'none';
    const hasLogo = (logoVal !== 'none' && this.viewEventLogoImg?.getAttribute('src')) ? true : false;
    const hasIllustration = (this.containerViewIllustration && this.containerViewIllustration.style.display !== 'none' && this.viewIllustrationImg?.getAttribute('src')) ? true : false;

    if (this.containerViewActivity) {
      this.containerViewActivity.style.display = hasActivity ? 'flex' : 'none';
    }
    if (this.viewCalloutQuote) {
      if (hasQuote) {
        this.viewCalloutQuote.innerText = `"${quoteText}"`;
        this.viewCalloutQuote.style.display = 'block';
      } else {
        this.viewCalloutQuote.style.display = 'none';
      }
    }
    if (this.containerViewEventLogo) {
      this.containerViewEventLogo.style.display = hasLogo ? 'flex' : 'none';
    }

    const shouldShowSection = hasActivity || hasQuote || hasLogo || hasIllustration;
    if (this.containerBottomInserts) {
      this.containerBottomInserts.style.display = shouldShowSection ? 'grid' : 'none';
    }
  }

  handleAuthorPhotoUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const dataUrl = evt.target.result;
      const testImg = new Image();
      testImg.onload = () => {
        try {
          const cvs = document.createElement('canvas');
          cvs.width = testImg.naturalWidth || testImg.width;
          cvs.height = testImg.naturalHeight || testImg.height;
          const ctx = cvs.getContext('2d');
          ctx.drawImage(testImg, 0, 0);
          const trimmedCvs = this.trimCanvas(cvs);
          const finalUrl = trimmedCvs.toDataURL('image/png');
          this.setAuthorPhoto(finalUrl);
          try {
            localStorage.setItem('alqalam_author_photo', finalUrl);
          } catch (err) {
            console.warn('LocalStorage limit for author photo:', err);
          }
        } catch (e) {
          this.setAuthorPhoto(dataUrl);
        }
      };
      testImg.onerror = () => {
        this.setAuthorPhoto(dataUrl);
      };
      testImg.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }

  setAuthorPhoto(dataUrl) {
    if (dataUrl) {
      if (this.viewAuthorImg) {
        this.viewAuthorImg.src = dataUrl;
        this.viewAuthorImg.classList.remove('hidden');
      }
      if (this.placeholderViewAuthor) {
        this.placeholderViewAuthor.classList.add('hidden');
      }
      if (this.previewAuthorImg) {
        this.previewAuthorImg.src = dataUrl;
        this.previewAuthorImg.classList.remove('hidden');
      }
      if (this.placeholderPreviewAuthor) {
        this.placeholderPreviewAuthor.classList.add('hidden');
      }
      if (this.btnClearAuthorPhoto) {
        this.btnClearAuthorPhoto.classList.remove('hidden');
      }
      if (this.btnMakeAuthorTransparent) {
        this.btnMakeAuthorTransparent.classList.remove('hidden');
      }
      if (this.btnTrimAuthorPhoto) {
        this.btnTrimAuthorPhoto.classList.remove('hidden');
      }
      if (this.labelAuthorPhoto) {
        this.labelAuthorPhoto.innerText = 'Ganti Foto Penulis';
      }
      this.applyAuthorCardStyles();
    } else {
      if (this.viewAuthorImg) {
        this.viewAuthorImg.src = '';
        this.viewAuthorImg.classList.add('hidden');
      }
      if (this.placeholderViewAuthor) {
        this.placeholderViewAuthor.classList.remove('hidden');
      }
      if (this.previewAuthorImg) {
        this.previewAuthorImg.src = '';
        this.previewAuthorImg.classList.add('hidden');
      }
      if (this.placeholderPreviewAuthor) {
        this.placeholderPreviewAuthor.classList.remove('hidden');
      }
      if (this.btnClearAuthorPhoto) {
        this.btnClearAuthorPhoto.classList.add('hidden');
      }
      if (this.btnMakeAuthorTransparent) {
        this.btnMakeAuthorTransparent.classList.add('hidden');
      }
      if (this.btnTrimAuthorPhoto) {
        this.btnTrimAuthorPhoto.classList.add('hidden');
      }
      if (this.labelAuthorPhoto) {
        this.labelAuthorPhoto.innerText = 'Upload Foto Penulis';
      }
      if (this.inpAuthorPhoto) {
        this.inpAuthorPhoto.value = '';
      }
      localStorage.removeItem('alqalam_author_photo');
    }
    if (window.lucide) window.lucide.createIcons();
  }

  initAuthorCardStyles() {
    // 1. Gaya Bingkai
    const savedFrameMode = localStorage.getItem('alqalam_author_frame_mode') || 'none';
    this.authorFrameMode = savedFrameMode;

    // 2. Perataan Tempel Foto (Mepet Tepi Kiri / Rata Tengah)
    const savedAlign = localStorage.getItem('alqalam_author_align') || 'left';
    this.authorAlign = savedAlign;

    // 3. Ukuran Foto Dinamis (Width dalam Pixel)
    const savedWidth = localStorage.getItem('alqalam_author_photo_width');
    if (savedWidth !== null) {
      const w = parseInt(savedWidth, 10);
      this.authorPhotoWidth = (!isNaN(w) && w >= 80 && w <= 650) ? w : 170;
    } else {
      this.authorPhotoWidth = 170;
    }

    // 4. Kotak Teks Nama Penulis (Badge Terpisah)
    const savedShowBadge = localStorage.getItem('alqalam_author_show_badge');
    const showBadge = (savedShowBadge !== null) ? (savedShowBadge === 'true') : true;
    if (this.chkShowAuthorBadge) this.chkShowAuthorBadge.checked = showBadge;
    this.toggleAuthorBadge(showBadge, false);

    // 5. Spacer Samping Judul (Default: false agar judul lebar penuh jika foto di kop)
    const savedSpacer = localStorage.getItem('alqalam_author_headline_spacer');
    const showSpacer = (savedSpacer !== null) ? (savedSpacer === 'true') : false;
    if (this.chkHeadlineSpacer) this.chkHeadlineSpacer.checked = showSpacer;
    this.toggleHeadlineSpacer(showSpacer, false);

    this.applyAuthorCardStyles();
  }

  setAuthorPhotoWidth(width, save = true) {
    this.authorPhotoWidth = Math.round(Math.max(80, Math.min(650, width)));
    if (save) {
      try {
        localStorage.setItem('alqalam_author_photo_width', this.authorPhotoWidth);
      } catch (e) {}
    }
    this.applyAuthorCardStyles();
  }

  resetAuthorPhotoWidth() {
    localStorage.removeItem('alqalam_author_photo_width');
    this.setAuthorPhotoWidth(170, true);
  }

  setAuthorAlign(align, save = true) {
    this.authorAlign = align || 'left';
    if (save) {
      try {
        localStorage.setItem('alqalam_author_align', this.authorAlign);
      } catch (e) {}
    }
    this.applyAuthorCardStyles();
  }

  setAuthorFrameMode(mode) {
    this.authorFrameMode = mode;
    try {
      localStorage.setItem('alqalam_author_frame_mode', mode);
    } catch (e) {}
    this.applyAuthorCardStyles();
  }

  applyAuthorCardStyles() {
    const isBox = (this.authorFrameMode === 'box');
    const width = this.authorPhotoWidth || 170;
    const isLeft = (this.authorAlign === 'left');
    const isRight = (this.authorAlign === 'right');
    const alignClass = isLeft ? 'items-start' : (isRight ? 'items-end' : 'items-center');
    const objPos = isLeft ? 'object-left-bottom' : (isRight ? 'object-right-bottom' : 'object-bottom');

    if (this.labelAuthorSize) {
      this.labelAuthorSize.innerText = `${width} px`;
    }
    if (this.containerAuthorPhoto) {
      this.containerAuthorPhoto.style.width = `${width}px`;
      this.containerAuthorPhoto.classList.remove('items-start', 'items-center', 'items-end');
      this.containerAuthorPhoto.classList.add(alignClass);
    }
    if (this.authorSlotSpacer) {
      this.authorSlotSpacer.style.width = `${width}px`;
    }

    if (this.authorPhotoFrame) {
      if (isBox) {
        this.authorPhotoFrame.className = 'w-full bg-white rounded-lg overflow-hidden border border-slate-300 shadow-md relative flex items-center justify-center transition-all';
        this.authorPhotoFrame.style.height = `${Math.round(width * 1.3)}px`;
        this.authorPhotoFrame.style.minHeight = '';
      } else {
        // Tanpa Frame & Transparan PNG (Cutout Editorial Mepet Tepi)
        this.authorPhotoFrame.className = `w-full bg-transparent border-0 shadow-none rounded-none overflow-visible relative flex flex-col ${alignClass} justify-end transition-all`;
        this.authorPhotoFrame.style.height = '';
        this.authorPhotoFrame.style.minHeight = `${Math.round(width * 1.0)}px`;
      }
    }

    if (this.viewAuthorImg) {
      const isHidden = this.viewAuthorImg.classList.contains('hidden');
      if (isBox) {
        this.viewAuthorImg.className = (isHidden ? 'hidden ' : '') + 'w-full h-full object-cover pointer-events-none select-none';
        this.viewAuthorImg.style.maxHeight = '';
      } else {
        this.viewAuthorImg.className = (isHidden ? 'hidden ' : '') + `w-auto max-w-full object-contain ${objPos} pointer-events-none select-none`;
        this.viewAuthorImg.style.maxHeight = `${Math.round(width * 1.65)}px`;
      }
    }

    const updateBtn = (btn, active) => {
      if (!btn) return;
      if (active) {
        btn.className = 'px-2.5 py-1.5 rounded-lg text-[10px] font-semibold border border-emerald-500 bg-emerald-500/10 text-emerald-300 flex items-center justify-center gap-1.5 transition cursor-pointer shadow-sm';
      } else {
        btn.className = 'px-2.5 py-1.5 rounded-lg text-[10px] font-semibold border border-slate-700 bg-slate-800/60 text-slate-400 hover:text-white flex items-center justify-center gap-1.5 transition cursor-pointer';
      }
    };
    updateBtn(this.btnAuthorFrameNone, !isBox);
    updateBtn(this.btnAuthorFrameBox, isBox);
    updateBtn(this.btnAuthorAlignLeft, isLeft);
    updateBtn(this.btnAuthorAlignCenter, !isLeft && !isRight);
  }

  toggleAuthorBadge(show, save = true) {
    if (save) {
      try {
        localStorage.setItem('alqalam_author_show_badge', show ? 'true' : 'false');
      } catch (e) {}
    }
    if (this.containerAuthorBadge) {
      this.containerAuthorBadge.style.display = show ? 'flex' : 'none';
    }
  }

  toggleHeadlineSpacer(show, save = true) {
    if (save) {
      try {
        localStorage.setItem('alqalam_author_headline_spacer', show ? 'true' : 'false');
      } catch (e) {}
    }
    if (this.authorSlotSpacer) {
      this.authorSlotSpacer.style.display = show ? 'block' : 'none';
    }
  }

  trimCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    if (w === 0 || h === 0) return canvas;

    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;

    let minX = w, maxX = -1, minY = h, maxY = -1;

    for (let y = 0; y < h; y++) {
      const rowOffset = y * w * 4;
      for (let x = 0; x < w; x++) {
        const alpha = data[rowOffset + x * 4 + 3];
        if (alpha > 15) { // Bukan pixel transparan
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    // Jika seluruhnya kosong/transparan
    if (maxX < minX || maxY < minY) return canvas;

    // Margin aman 1px
    minX = Math.max(0, minX - 1);
    minY = Math.max(0, minY - 1);
    maxX = Math.min(w - 1, maxX + 1);
    maxY = Math.min(h - 1, maxY + 1);

    const trimW = maxX - minX + 1;
    const trimH = maxY - minY + 1;

    const trimmed = document.createElement('canvas');
    trimmed.width = trimW;
    trimmed.height = trimH;
    const tCtx = trimmed.getContext('2d');
    tCtx.drawImage(canvas, minX, minY, trimW, trimH, 0, 0, trimW, trimH);
    return trimmed;
  }

  trimAuthorPhoto(showSuccessAlert = true) {
    if (!this.viewAuthorImg || !this.viewAuthorImg.src || this.viewAuthorImg.classList.contains('hidden')) {
      if (showSuccessAlert) alert('Silakan upload foto penulis terlebih dahulu.');
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const cvs = document.createElement('canvas');
      cvs.width = img.naturalWidth || img.width;
      cvs.height = img.naturalHeight || img.height;
      const ctx = cvs.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const trimmedCvs = this.trimCanvas(cvs);
      const trimmedDataUrl = trimmedCvs.toDataURL('image/png');
      this.setAuthorPhoto(trimmedDataUrl);
      try {
        localStorage.setItem('alqalam_author_photo', trimmedDataUrl);
      } catch (e) {}
      if (showSuccessAlert) {
        alert('✨ Selesai!\n\nRuang kosong transparan di sekeliling foto telah dipotong rapi sehingga foto bisa langsung menempel mepet pas ke tepi halaman.');
      }
    };
    img.src = this.viewAuthorImg.src;
  }

  makeAuthorPhotoTransparent() {
    if (!this.viewAuthorImg || !this.viewAuthorImg.src || this.viewAuthorImg.classList.contains('hidden')) {
      alert('Silakan upload foto penulis terlebih dahulu.');
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const cvs = document.createElement('canvas');
      const w = img.naturalWidth || img.width;
      const h = img.naturalHeight || img.height;
      cvs.width = w;
      cvs.height = h;
      const ctx = cvs.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;

      // Hapus latar putih/sangat terang dan ubah jadi transparan
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        if (r > 230 && g > 230 && b > 230) {
          data[i + 3] = 0; // 100% transparan
        } else if (r > 215 && g > 215 && b > 215) {
          const factor = (255 - Math.max(r, g, b)) / 25;
          data[i + 3] = Math.round(data[i + 3] * factor);
        }
      }

      ctx.putImageData(imgData, 0, 0);
      const trimmedCvs = this.trimCanvas(cvs);
      const transparentDataUrl = trimmedCvs.toDataURL('image/png');
      this.setAuthorPhoto(transparentDataUrl);
      try {
        localStorage.setItem('alqalam_author_photo', transparentDataUrl);
      } catch (e) {}
      alert('✨ Berhasil!\n\nLatar putih pada foto telah dibersihkan menjadi transparan PNG dan tepiannya dirapatkan agar mepet pas ke tepi halaman.');
    };
    img.src = this.viewAuthorImg.src;
  }

  initDraggables() {
    // 1. Inisialisasi Drag & Drop untuk Foto Penulis Mandiri
    this.makeElementDraggable(
      this.containerAuthorPhoto,
      'alqalam_author_photo_pos',
      0,
      35
    );

    // 2. Inisialisasi Drag & Drop untuk Kotak Teks Nama Penulis (Badge Terpisah)
    this.makeElementDraggable(
      this.containerAuthorBadge,
      'alqalam_author_badge_pos',
      32,
      235
    );
  }

  initAuthorResizeHandle() {
    const handle = this.handleResizeAuthor;
    const container = this.containerAuthorPhoto;
    if (!handle || !container || !this.a3Sheet) return;

    let isResizing = false;
    let startX = 0;
    let startY = 0;
    let initialWidth = 170;

    const onResizeStart = (e) => {
      // Hentikan agar drag perpindahan foto tidak ikut terpicu
      e.stopPropagation();
      if (e.type === 'mousedown' && e.button !== 0) return;

      isResizing = true;
      const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
      const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;

      startX = clientX;
      startY = clientY;

      initialWidth = container.offsetWidth || parseFloat(container.style.width) || this.authorPhotoWidth || 170;

      container.classList.add('ring-2', 'ring-emerald-400', 'ring-dashed');
      handle.classList.add('scale-125', 'bg-emerald-400');
      document.body.style.cursor = 'nwse-resize';

      if (e.cancelable) e.preventDefault();
    };

    const onResizeMove = (e) => {
      if (!isResizing) return;

      const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
      const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;

      const zoom = this.zoomScale || 1;
      const dx = (clientX - startX) / zoom;
      const dy = (clientY - startY) / zoom;

      // Geser ke kanan bawah (dx>0, dy>0) membesar, geser ke atas kiri (dx<0, dy<0) mengecil
      const delta = (dx + dy) / 1.414;
      const newWidth = Math.round(Math.max(80, Math.min(650, initialWidth + delta)));

      this.setAuthorPhotoWidth(newWidth, false);

      if (e.cancelable) e.preventDefault();
    };

    const onResizeEnd = () => {
      if (!isResizing) return;
      isResizing = false;

      container.classList.remove('ring-2', 'ring-emerald-400', 'ring-dashed');
      handle.classList.remove('scale-125', 'bg-emerald-400');
      document.body.style.cursor = '';

      const finalWidth = container.offsetWidth || parseFloat(container.style.width) || this.authorPhotoWidth || 170;
      this.setAuthorPhotoWidth(finalWidth, true);
    };

    handle.addEventListener('mousedown', onResizeStart);
    window.addEventListener('mousemove', onResizeMove);
    window.addEventListener('mouseup', onResizeEnd);

    handle.addEventListener('touchstart', onResizeStart, { passive: false });
    window.addEventListener('touchmove', onResizeMove, { passive: false });
    window.addEventListener('touchend', onResizeEnd);
  }

  makeElementDraggable(elem, storageKey, defaultLeft, defaultTop) {
    if (!elem || !this.a3Sheet) return;
    const sheet = this.a3Sheet;

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let initialLeft = defaultLeft;
    let initialTop = defaultTop;

    // Pulihkan posisi tersimpan jika pernah digeser
    const savedPos = localStorage.getItem(storageKey);
    if (savedPos) {
      try {
        const pos = JSON.parse(savedPos);
        if (typeof pos.left === 'number' && typeof pos.top === 'number') {
          elem.style.left = `${pos.left}px`;
          elem.style.top = `${pos.top}px`;
        }
      } catch (e) {
        console.warn(`Gagal memuat posisi ${storageKey}:`, e);
      }
    } else {
      elem.style.left = `${defaultLeft}px`;
      elem.style.top = `${defaultTop}px`;
    }

    const onStart = (e) => {
      if (e.type === 'mousedown' && e.button !== 0) return;

      isDragging = true;
      const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
      const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;

      startX = clientX;
      startY = clientY;

      const pLeft = parseFloat(elem.style.left);
      initialLeft = (!isNaN(pLeft)) ? pLeft : defaultLeft;
      const pTop = parseFloat(elem.style.top);
      initialTop = (!isNaN(pTop)) ? pTop : defaultTop;

      elem.classList.add('ring-2', 'ring-emerald-400', 'shadow-2xl', 'opacity-95', 'z-40');
      elem.style.cursor = 'grabbing';

      if (e.cancelable) e.preventDefault();
    };

    const onMove = (e) => {
      if (!isDragging) return;

      const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
      const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;

      // Skala pergerakan dibagi zoomScale agar kursor mouse menempel presisi 1:1
      const zoom = this.zoomScale || 1;
      const dx = (clientX - startX) / zoom;
      const dy = (clientY - startY) / zoom;

      let newLeft = initialLeft + dx;
      let newTop = initialTop + dy;

      // Batasi di dalam lembaran kertas A3
      const sheetW = sheet.offsetWidth || 840;
      const sheetH = sheet.offsetHeight || 1188;
      const elemW = elem.offsetWidth || 150;
      const elemH = elem.offsetHeight || 150;

      const isPhoto = (elem.id === 'container-author-photo');
      // Bebas geser tembus tepi kiri dan kanan secara simetris
      // Untuk foto penulis, izinkan drag menembus keluar lembaran (bleed mepet tepi)
      // Sisakan minimal 40px di atas lembaran agar handle tetap bisa disentuh/ditarik kembali
      const minLeft = isPhoto ? -(elemW - 40) : 0;
      const maxLeft = isPhoto ? (sheetW - 40) : (sheetW - elemW);
      const minTop  = isPhoto ? -(elemH - 60) : 0;
      const maxTop  = isPhoto ? (sheetH - 60) : (sheetH - elemH);

      newLeft = Math.max(minLeft, Math.min(maxLeft, newLeft));
      newTop = Math.max(minTop, Math.min(maxTop, newTop));

      elem.style.left = `${newLeft}px`;
      elem.style.top = `${newTop}px`;

      if (e.cancelable) e.preventDefault();
    };

    const onEnd = () => {
      if (!isDragging) return;
      isDragging = false;

      elem.classList.remove('ring-2', 'ring-emerald-400', 'shadow-2xl', 'opacity-95', 'z-40');
      elem.style.cursor = 'grab';

      const pLeft = parseFloat(elem.style.left);
      const currentLeft = (!isNaN(pLeft)) ? pLeft : defaultLeft;
      const pTop = parseFloat(elem.style.top);
      const currentTop = (!isNaN(pTop)) ? pTop : defaultTop;

      try {
        localStorage.setItem(storageKey, JSON.stringify({ left: currentLeft, top: currentTop }));
      } catch (err) {
        console.warn(`LocalStorage ${storageKey}:`, err);
      }
    };

    elem.addEventListener('mousedown', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);

    elem.addEventListener('touchstart', onStart, { passive: false });
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd);
  }

  setAuthorPhotoPosition(left, top, save = true) {
    if (!this.containerAuthorPhoto) return;
    this.containerAuthorPhoto.style.left = `${left}px`;
    this.containerAuthorPhoto.style.top = `${top}px`;
    if (save) {
      try {
        localStorage.setItem('alqalam_author_photo_pos', JSON.stringify({ left, top }));
      } catch (e) {}
    }
  }

  setAuthorBadgePosition(left, top, save = true) {
    if (!this.containerAuthorBadge) return;
    this.containerAuthorBadge.style.left = `${left}px`;
    this.containerAuthorBadge.style.top = `${top}px`;
    if (save) {
      try {
        localStorage.setItem('alqalam_author_badge_pos', JSON.stringify({ left, top }));
      } catch (e) {}
    }
  }

  resetAuthorPhotoPosition() {
    localStorage.removeItem('alqalam_author_photo_pos');
    this.setAuthorPhotoPosition(0, 35, false);
  }

  resetAuthorBadgePosition() {
    localStorage.removeItem('alqalam_author_badge_pos');
    this.setAuthorBadgePosition(32, 235, false);
  }

  applyAuthorPosPreset(key) {
    const sheetW = this.a3Sheet?.offsetWidth || 840;
    const currentW = this.authorPhotoWidth || 170;

    const presets = {
      'mepet-kiri':   { photo: { left: -32, top: 35 },  badge: { left: 20,  top: 320 }, align: 'left', spacer: true },
      'mepet-kanan':  { photo: { left: Math.max(0, sheetW - currentW + 32), top: 35 }, badge: { left: Math.max(0, sheetW - 220), top: 320 }, align: 'right', spacer: false },
      'on-kop':       { photo: { left: 0,   top: 35 },  badge: { left: 32,  top: 235 }, align: 'left', spacer: false },
      'top-left':     { photo: { left: 0,   top: 235 }, badge: { left: 32,  top: 495 }, align: 'left', spacer: true },
      'top-right':    { photo: { left: Math.max(0, sheetW - currentW - 32), top: 235 }, badge: { left: Math.max(0, sheetW - 220), top: 495 }, align: 'right', spacer: false },
      'mid-col2':     { photo: { left: 332, top: 520 }, badge: { left: 332, top: 780 }, align: 'center', spacer: false },
      'bottom-left':  { photo: { left: 0,   top: 820 }, badge: { left: 32,  top: 1080 }, align: 'left', spacer: false },
      'bottom-right': { photo: { left: Math.max(0, sheetW - currentW - 32), top: 820 }, badge: { left: Math.max(0, sheetW - 220), top: 1080 }, align: 'right', spacer: false }
    };
    const target = presets[key];
    if (!target) return;

    if (target.align) {
      this.setAuthorAlign(target.align);
    }
    this.setAuthorPhotoPosition(target.photo.left, target.photo.top, true);
    if (target.badge) {
      this.setAuthorBadgePosition(target.badge.left, target.badge.top, true);
    }

    if (this.chkHeadlineSpacer) {
      this.chkHeadlineSpacer.checked = target.spacer;
      this.toggleHeadlineSpacer(target.spacer, true);
    }
  }

  loadDemoPreset() {
    // Populate form fields
    if (this.inpDay) this.inpDay.value = 'Selasa Pahing';
    if (this.inpDateMasehi) this.inpDateMasehi.value = '27 Oktober 2026';
    if (this.inpDateHijri) this.inpDateHijri.value = '16 Jumadil Awal 1448 H';
    if (this.inpEditionNum) this.inpEditionNum.value = 'Tahun 2026 | Nomor : 0006';
    if (this.inpAuthorName) this.inpAuthorName.value = 'MOHAMAD JAMIL, S.Pd.';
    if (this.inpHeadline) this.inpHeadline.value = 'SIAPA BILANG MEMBOSANKAN !!!';
    if (this.inpSubheadline) this.inpSubheadline.value = 'Temukan Keseruan Matematika dalam Kehidupan Sehari-hari!';
    if (this.inpBodyText) this.inpBodyText.value = this.demoText;
    if (this.inpCalloutQuote) this.inpCalloutQuote.value = 'Oleh karena itu, belajar matematika tidak harus selalu dilakukan dengan menghafal rumus dan mengerjakan soal di buku. Murid dapat mulai belajar melalui kegiatan yang dekat dengan kehidupan sehari-hari.';
    if (this.inpPageNum) this.inpPageNum.value = 'Halaman 6';

    // Populate Views
    if (this.viewDay) this.viewDay.innerText = 'Selasa Pahing';
    if (this.viewDateMasehi) this.viewDateMasehi.innerText = '27 Oktober 2026';
    if (this.viewDateHijri) this.viewDateHijri.innerText = '16 Jumadil Awal 1448 H';
    if (this.viewEditionNum) this.viewEditionNum.innerText = 'Tahun 2026 | Nomor : 0006';
    if (this.viewAuthorBadge) this.viewAuthorBadge.innerText = 'MOHAMAD JAMIL, S.Pd.';
    if (this.viewByline) this.viewByline.innerText = 'MOHAMAD JAMIL, S.Pd.';
    if (this.viewHeadline) this.viewHeadline.innerText = 'SIAPA BILANG MEMBOSANKAN !!!';
    if (this.viewSubheadline) this.viewSubheadline.innerText = 'Temukan Keseruan Matematika dalam Kehidupan Sehari-hari!';
    if (this.viewFooterPage) this.viewFooterPage.innerText = 'Halaman 6';

    // Author & Activity Images for Demo
    this.setAuthorPhoto('assets/template/demo_author_jamil.jpg');

    if (this.viewActivityImg) {
      this.viewActivityImg.src = 'assets/template/demo_activity_math.jpg';
      this.viewActivityImg.classList.remove('hidden');
    }
    if (this.previewActivityImg) {
      this.previewActivityImg.src = 'assets/template/demo_activity_math.jpg';
      this.previewActivityImg.classList.remove('hidden');
    }
    if (this.placeholderPreviewActivity) this.placeholderPreviewActivity.classList.add('hidden');
    if (this.labelActivityPhoto) this.labelActivityPhoto.innerText = 'Ganti Foto Kegiatan';
    if (this.chkShowActivityImg) this.chkShowActivityImg.checked = true;

    // Doodle Illustration & Event Logo for Demo
    if (this.viewIllustrationImg) {
      this.viewIllustrationImg.src = 'assets/template/demo_math_doodle.jpg';
    }
    if (this.containerViewIllustration) {
      this.containerViewIllustration.style.display = 'block';
    }
    if (this.selEventLogo) this.selEventLogo.value = 'sumpah_pemuda';
    if (this.viewEventLogoImg) {
      this.viewEventLogoImg.src = 'assets/template/demo_logo_sumpah_pemuda.jpg';
    }

    this.formatNewspaperContent();
    this.updateBottomInsertsVisibility();
    if (window.lucide) window.lucide.createIcons();
  }

  showLoading(title, desc) {
    if (this.loadingOverlay) {
      if (this.loadingTitle) this.loadingTitle.innerText = title;
      if (this.loadingDesc) this.loadingDesc.innerText = desc;
      this.loadingOverlay.classList.remove('hidden');
    }
  }

  hideLoading() {
    if (this.loadingOverlay) {
      this.loadingOverlay.classList.add('hidden');
    }
  }

  async renderA3Canvas() {
    if (!this.a3Sheet) throw new Error('A3 Sheet element tidak ditemukan');

    // Temporarily reset zoom to 1.0 for accurate capture
    const prevTransform = this.a3Sheet.style.transform;
    this.a3Sheet.style.transform = 'none';

    try {
      // High-resolution capture (scale: 2.8 gives ~2350x3320 px, 300 DPI print quality)
      const canvas = await html2canvas(this.a3Sheet, {
        scale: 2.8,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        imageTimeout: 15000,
        ignoreElements: (element) => element.classList?.contains('export-ignore')
      });

      return canvas;
    } finally {
      this.a3Sheet.style.transform = prevTransform;
    }
  }

  async generateAndDownloadPdf() {
    try {
      this.showLoading('Menyiapkan Berkas PDF...', 'Sedang merender halaman A3 dengan resolusi cetak 300 DPI...');

      const canvas = await this.renderA3Canvas();
      const imgData = canvas.toDataURL('image/jpeg', 0.96);

      // Create A3 PDF (297 x 420 mm)
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a3'
      });

      pdf.addImage(imgData, 'JPEG', 0, 0, 297, 420, undefined, 'FAST');

      // Filename based on edition
      const edRaw = this.inpEditionNum?.value || '0006';
      const m = edRaw.match(/Nomor\s*:\s*(\d+)/i) || edRaw.match(/(\d+)/);
      const edNum = m ? m[1].padStart(4, '0') : '0006';
      const filename = `AL_QALAM_Edisi_${edNum}.pdf`;

      pdf.save(filename);

      this.hideLoading();
      setTimeout(() => {
        alert(`🎉 Berhasil!\n\nFile "${filename}" berhasil diunduh dalam format PDF A3 tajam beresolusi tinggi.`);
      }, 100);
    } catch (err) {
      this.hideLoading();
      console.error(err);
      alert('Gagal mengekspor PDF: ' + err.message);
    }
  }

  async publishDirectToEpaper() {
    try {
      // Determine file name (e.g. 0006.pdf)
      const edRaw = this.inpEditionNum?.value || '0006';
      const m = edRaw.match(/Nomor\s*:\s*(\d+)/i) || edRaw.match(/(\d+)/);
      const edNum = m ? m[1].padStart(4, '0') : '0006';
      const targetFilename = `${edNum}.pdf`;

      const confirmMsg = `🚀 KONFIRMASI TERBITKAN KE E-PAPER:\n\n` +
                         `Apakah Anda ingin langsung MENERBITKAN halaman ini ke publikasi AL QALAM?\n\n` +
                         `• Nama file di server: ${targetFilename}\n` +
                         `• Judul: ${this.inpHeadline?.value || 'Artikel Baru'}\n` +
                         `• Penulis: ${this.inpAuthorName?.value || 'Guru MTsN 1 Blitar'}\n\n` +
                         `Setelah diterbitkan, halaman ini langsung otomatis tayang dan dapat dibaca di 3D Flipbook!`;

      if (!confirm(confirmMsg)) return;

      this.showLoading('Menerbitkan ke Server E-Paper...', `Sedang mengunggah ${targetFilename} ke arsip publikasi AL QALAM...`);

      const canvas = await this.renderA3Canvas();
      const imgData = canvas.toDataURL('image/jpeg', 0.96);

      // Create PDF
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a3'
      });
      pdf.addImage(imgData, 'JPEG', 0, 0, 297, 420, undefined, 'FAST');

      const pdfBlob = pdf.output('blob');

      // Upload to server
      const formData = new FormData();
      formData.append('action', 'upload');
      formData.append('pub', 'alqalam');
      formData.append('pdf_file', pdfBlob, targetFilename);

      const res = await fetch('api.php', { method: 'POST', body: formData });
      const data = await res.json();

      this.hideLoading();

      if (data.success) {
        const successChoice = confirm(
          `🎉 ALHAMDULILLAH! BERHASIL DITERBITKAN!\n\n` +
          `Halaman ${targetFilename} ("${this.inpHeadline?.value}") telah resmi tayang di E-Paper MTsN 1 Blitar!\n\n` +
          `Klik OK untuk langsung membuka Flipbook E-Paper sekarang.`
        );
        if (successChoice) {
          window.location.href = 'index.html?v=' + Date.now();
        }
      } else {
        alert('❌ Gagal menerbitkan: ' + (data.message || 'Terjadi kesalahan di server.'));
      }
    } catch (err) {
      this.hideLoading();
      console.error(err);
      alert('Gagal menerbitkan naskah: ' + err.message);
    }
  }
}

// Bootstrap on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  window.studio = new AlqalamStudio();
  if (window.lucide) window.lucide.createIcons();
});
