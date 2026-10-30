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
    this.headerMode                 = 'default';
    this.headerDatePosition         = 'overlay'; // 'overlay', 'below', 'hide'
    this.btnModeDefaultHeader       = document.getElementById('btn-mode-default-header');
    this.btnModeCustomHeader        = document.getElementById('btn-mode-custom-header');
    this.badgeHeaderStatus          = document.getElementById('badge-header-status');
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
    this.dateOffset                 = 42;
    this.btnDateUp                  = document.getElementById('btn-date-up');
    this.btnDateDown                = document.getElementById('btn-date-down');
    this.labelDateOffset            = document.getElementById('label-date-offset');
    this.viewDefaultDateBox         = document.getElementById('view-default-date-box');

    // Pengatur Ukuran & Lebar Kop Utama
    this.kopSizes = [
      { label: 'Normal', h: 100, dateMt: 26 },
      { label: 'Lebar', h: 144, dateMt: 42 },
      { label: 'Ekstra Lebar', h: 180, dateMt: 62 },
      { label: 'Maksimal', h: 220, dateMt: 82 }
    ];
    this.kopSizeIndex               = 1; // Default 'Lebar' (144px, ~312px wide)
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
    this.inpHeadline            = document.getElementById('inp-headline');
    this.inpSubheadline         = document.getElementById('inp-subheadline');
    this.inpBodyText            = document.getElementById('inp-body-text');
    this.textWordCount          = document.getElementById('text-word-count');
    this.inpActivityPhoto       = document.getElementById('inp-activity-photo');
    this.previewActivityImg     = document.getElementById('preview-activity-img');
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
    this.viewAuthorBadge        = document.getElementById('view-author-badge');
    this.viewByline         = document.getElementById('view-byline');
    this.viewHeadline       = document.getElementById('view-headline');
    this.viewSubheadline    = document.getElementById('view-subheadline');
    this.viewNewspaperContent = document.getElementById('view-newspaper-content');
    this.viewActivityImg    = document.getElementById('view-activity-img');
    this.containerViewActivity = document.getElementById('container-view-activity');
    this.viewCalloutQuote   = document.getElementById('view-callout-quote');
    this.containerViewEventLogo = document.getElementById('container-view-event-logo');
    this.viewEventLogoImg   = document.getElementById('view-event-logo-img');
    this.viewFooterPage     = document.getElementById('view-footer-page');

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
    this.btnModeDefaultHeader?.addEventListener('click', () => this.setHeaderMode('default'));
    this.btnModeCustomHeader?.addEventListener('click', () => {
      this.setHeaderMode('custom');
      const curSrc = this.viewCustomHeaderImg?.getAttribute('src');
      if (!curSrc || curSrc === '') {
        this.inpCustomHeader?.click();
      }
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
    bindLive(this.inpCalloutQuote, this.viewCalloutQuote, () => {
      this.viewCalloutQuote.innerText = `"${this.inpCalloutQuote.value}"`;
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

    // Photo Uploads
    this.inpAuthorPhoto?.addEventListener('change', (e) => this.handleAuthorPhotoUpload(e));
    this.btnClearAuthorPhoto?.addEventListener('click', () => this.setAuthorPhoto(null));
    this.inpActivityPhoto?.addEventListener('change', (e) => this.handleImageUpload(e, this.viewActivityImg, this.previewActivityImg));

    // Show/Hide Activity Photo
    this.chkShowActivityImg?.addEventListener('change', () => {
      if (this.containerViewActivity) {
        this.containerViewActivity.style.display = this.chkShowActivityImg.checked ? 'flex' : 'none';
      }
    });

    // Event Logo Selector
    this.selEventLogo?.addEventListener('change', () => {
      const val = this.selEventLogo.value;
      if (!this.containerViewEventLogo || !this.viewEventLogoImg) return;
      if (val === 'none') {
        this.containerViewEventLogo.style.display = 'none';
      } else if (val === 'hari_santri') {
        this.containerViewEventLogo.style.display = 'flex';
        this.viewEventLogoImg.src = 'covers/alqalam.jpg'; // fallback
      } else {
        this.containerViewEventLogo.style.display = 'flex';
        this.viewEventLogoImg.src = 'assets/template/demo_logo_sumpah_pemuda.jpg';
      }
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
        if (data.success) {
          console.log('Master header tersimpan di server:', data.header_url);
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
    // 1. Coba ambil dari server template terlebih dahulu (sinkronisasi antar komputer)
    try {
      const res = await fetch('api.php?action=get_template_header');
      const data = await res.json();
      if (data.success && data.has_custom_header && data.header_url) {
        this.applyCustomHeader(data.header_url, true);
        return;
      }
    } catch (e) {
      console.warn('Gagal cek header di server, coba cache lokal:', e);
    }

    // 2. Jika di server belum ada, periksa cache lokal
    const localHeader = localStorage.getItem('alqalam_master_header');
    if (localHeader) {
      this.applyCustomHeader(localHeader, true);
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
    if (this.viewBrandHeaderImg) {
      this.viewBrandHeaderImg.style.height = `${current.h}px`;
    }
    this.setDateOffset(current.dateMt);
  }

  updateHeaderFullBleed() {
    const isFull = this.chkFullWidthHeader?.checked ?? false;
    if (this.containerSheetHeader) {
      if (isFull) {
        this.containerSheetHeader.classList.add('-mx-8', '-mt-8', 'px-8', 'pt-6', 'bg-white');
      } else {
        this.containerSheetHeader.classList.remove('-mx-8', '-mt-8', 'px-8', 'pt-6', 'bg-white');
      }
    }
  }

  setHeaderDatePosition(pos) {
    this.headerDatePosition = pos;
    this.updateHeaderDisplay();
  }

  updateHeaderDisplay() {
    if (this.headerMode === 'custom') {
      // Tombol selector model kop
      this.btnModeCustomHeader?.classList.add('border-emerald-500', 'bg-emerald-500/10', 'text-emerald-300');
      this.btnModeCustomHeader?.classList.remove('border-slate-700', 'bg-slate-800/60', 'text-slate-400');
      this.btnModeDefaultHeader?.classList.remove('border-emerald-500', 'bg-emerald-500/10', 'text-emerald-300');
      this.btnModeDefaultHeader?.classList.add('border-slate-700', 'bg-slate-800/60', 'text-slate-400');

      if (this.badgeHeaderStatus) {
        this.badgeHeaderStatus.innerText = 'Kop Master Aktif';
        this.badgeHeaderStatus.className = 'text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30';
      }

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

      // Tampilan di Sheet A3
      this.viewCustomHeaderWrapper?.classList.remove('hidden');
      this.viewDefaultHeaderWrapper?.classList.add('hidden');

      // Box Hari & Tanggal (Rata Kanan)
      if (this.viewCustomHeaderOverlayBox) {
        this.viewCustomHeaderOverlayBox.style.display = (this.headerDatePosition === 'overlay') ? 'block' : 'none';
      }
      if (this.viewCustomHeaderEditionBar) {
        this.viewCustomHeaderEditionBar.style.display = (this.headerDatePosition === 'below') ? 'flex' : 'none';
      }
    } else {
      // Kop bawaan AL QALAM
      this.btnModeDefaultHeader?.classList.add('border-emerald-500', 'bg-emerald-500/10', 'text-emerald-300');
      this.btnModeDefaultHeader?.classList.remove('border-slate-700', 'bg-slate-800/60', 'text-slate-400');
      this.btnModeCustomHeader?.classList.remove('border-emerald-500', 'bg-emerald-500/10', 'text-emerald-300');
      this.btnModeCustomHeader?.classList.add('border-slate-700', 'bg-slate-800/60', 'text-slate-400');

      if (this.badgeHeaderStatus) {
        this.badgeHeaderStatus.innerText = 'Kop Bawaan';
        this.badgeHeaderStatus.className = 'text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700';
      }

      this.containerCustomEditionToggle?.classList.add('hidden');

      // Tampilan di Sheet A3
      this.viewCustomHeaderWrapper?.classList.add('hidden');
      this.viewDefaultHeaderWrapper?.classList.remove('hidden');
      if (this.viewCustomHeaderOverlayBox) {
        this.viewCustomHeaderOverlayBox.style.display = 'none';
      }
      if (this.viewCustomHeaderEditionBar) {
        this.viewCustomHeaderEditionBar.style.display = 'none';
      }
    }
    if (window.lucide) window.lucide.createIcons();
  }

  async resetMasterHeader() {
    if (!confirm('Kembalikan ke kop bawaan AL QALAM dan hapus kop master tersimpan?')) return;

    localStorage.removeItem('alqalam_master_header');
    if (this.viewCustomHeaderImg) this.viewCustomHeaderImg.src = '';
    if (this.previewCustomHeaderImg) this.previewCustomHeaderImg.src = '';
    if (this.containerPreviewHeader) this.containerPreviewHeader.classList.add('hidden');
    if (this.labelUploadHeader) this.labelUploadHeader.innerText = 'Upload File Kop / Header Master';
    if (this.inpCustomHeader) this.inpCustomHeader.value = '';

    this.setHeaderMode('default');

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

    if (window.lucide) window.lucide.createIcons();
  }

  handleAuthorPhotoUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const dataUrl = evt.target.result;
      this.setAuthorPhoto(dataUrl);
      try {
        localStorage.setItem('alqalam_author_photo', dataUrl);
      } catch (err) {
        console.warn('LocalStorage limit for author photo:', err);
      }
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
      if (this.labelAuthorPhoto) {
        this.labelAuthorPhoto.innerText = 'Ganti Foto Penulis';
      }
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
    if (this.viewCalloutQuote) this.viewCalloutQuote.innerText = `"${this.inpCalloutQuote.value}"`;
    if (this.viewFooterPage) this.viewFooterPage.innerText = 'Halaman 6';

    // Author & Activity Images for Demo
    this.setAuthorPhoto('assets/template/demo_author_jamil.jpg');
    if (this.viewActivityImg) this.viewActivityImg.src = 'assets/template/demo_activity_math.jpg';
    if (this.previewActivityImg) this.previewActivityImg.src = 'assets/template/demo_activity_math.jpg';

    this.formatNewspaperContent();
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
        imageTimeout: 15000
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
