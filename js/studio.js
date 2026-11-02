/**
 * AL QALAM Studio - Generator Layout Koran A3 MTsN 1 Blitar
 * Created for automated instant publishing to E-Paper Flipbook
 */

// IndexedDB Helper for Studio Media Storage (No 5MB quota limit)
const STUDIO_IDB_NAME = 'epaper_studio_cache';
const STUDIO_IDB_STORE = 'media_files';

function openStudioDB() {
  return new Promise((resolve) => {
    if (!window.indexedDB) return resolve(null);
    const req = indexedDB.open(STUDIO_IDB_NAME, 1);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STUDIO_IDB_STORE)) {
        db.createObjectStore(STUDIO_IDB_STORE);
      }
    };
    req.onsuccess = (e) => resolve(e.target.result);
    req.onerror = () => resolve(null);
  });
}

async function idbStudioGet(key) {
  try {
    const db = await openStudioDB();
    if (!db) return null;
    return new Promise((resolve) => {
      const tx = db.transaction(STUDIO_IDB_STORE, 'readonly');
      const store = tx.objectStore(STUDIO_IDB_STORE);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch (e) {
    return null;
  }
}

async function idbStudioSet(key, val) {
  try {
    const db = await openStudioDB();
    if (!db) return false;
    return new Promise((resolve) => {
      const tx = db.transaction(STUDIO_IDB_STORE, 'readwrite');
      const store = tx.objectStore(STUDIO_IDB_STORE);
      const req = store.put(val, key);
      req.onsuccess = () => resolve(true);
      req.onerror = () => resolve(false);
    });
  } catch (e) {
    return false;
  }
}

async function idbStudioDelete(key) {
  try {
    const db = await openStudioDB();
    if (!db) return false;
    return new Promise((resolve) => {
      const tx = db.transaction(STUDIO_IDB_STORE, 'readwrite');
      const store = tx.objectStore(STUDIO_IDB_STORE);
      const req = store.delete(key);
      req.onsuccess = () => resolve(true);
      req.onerror = () => resolve(false);
    });
  } catch (e) {
    return false;
  }
}

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
    this.initCorelInterface();
    this.initUndoRedo();
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
    this.inpHeadlineIndent      = document.getElementById('inp-headline-indent');
    this.labelHeadlineIndent    = document.getElementById('label-headline-indent');
    this.btnResetHeadlineIndent = document.getElementById('btn-reset-headline-indent');
    this.headlineIndent         = 0;

    // Pengaturan Gaya & Ukuran Foto Penulis Dinamis
    this.authorPhotoWidth       = 170; // Lebar foto dalam pixel (bisa di-resize dinamis dengan seret pojok kanan bawah)
    this.authorFrameMode        = 'none'; // 'none' (Tanpa Bingkai & Transparan PNG) atau 'box'
    this.viewByline             = document.getElementById('view-byline');
    this.viewBylineContainer    = document.getElementById('view-byline-container');
    this.viewHeadline           = document.getElementById('view-headline');
    this.viewSubheadline        = document.getElementById('view-subheadline');
    this.viewNewspaperContent   = document.getElementById('view-newspaper-content');
    this.containerBottomInserts = document.getElementById('container-bottom-inserts');
    this.viewActivityImg        = document.getElementById('view-activity-img');
    this.containerViewActivity  = document.getElementById('container-view-activity');
    this.layerActivityPhotos    = document.getElementById('layer-activity-photos');
    this.listActivityPhotosDock = document.getElementById('list-activity-photos-dock');
    this.btnDockAddActivityPhoto= document.getElementById('btn-dock-add-activity-photo');
    this.activityPhotos         = [];
    this.selectedPhotoId        = null;
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

    this.selectedCanvasElement  = null;

    this.headlineFontSize       = 30;
    this.subheadlineFontSize    = 18;
    this.bodyFontSize           = 11.5;
    this.authorBadgeFontSize    = 11;
    this.customHeaderScale      = 1.0;
    this.headlineOffsetX        = 0;
    this.headlineOffsetY        = 0;
    this.subheadlineOffsetX     = 0;
    this.subheadlineOffsetY     = 0;
    this.bylineOffsetX          = 0;
    this.bylineOffsetY          = 0;
    this.headerOffsetX          = 0;
    this.headerOffsetY          = 0;
    this.bodyOffsetX            = 0;
    this.bodyOffsetY            = 0;
    this.justDragged            = false;

    // Action Buttons
    this.btnDemoPreset      = document.getElementById('btn-demo-preset');
    this.btnExportPdf       = document.getElementById('btn-export-pdf');
    this.btnPublishEpaper   = document.getElementById('btn-publish-epaper');

    // Mobile View Toggle
    this.editorPanel        = document.getElementById('editor-panel');
    this.previewPanel       = document.getElementById('preview-panel');
    this.btnToggleEditor    = document.getElementById('btn-toggle-editor');
    this.btnTogglePreview   = document.getElementById('btn-toggle-preview');

    // Smart Paste & Clipboard Modal
    this.modalPasteTarget       = document.getElementById('modal-paste-target');
    this.previewPastedImg       = document.getElementById('preview-pasted-img');
    this.labelPastedDimensions  = document.getElementById('label-pasted-dimensions');
    this.btnClosePasteModal     = document.getElementById('btn-close-paste-modal');
    this.btnCancelPasteModal    = document.getElementById('btn-cancel-paste-modal');
    this.btnPasteToAuthor       = document.getElementById('btn-paste-to-author');
    this.btnPasteToHeader       = document.getElementById('btn-paste-to-header');
    this.btnPasteToActivity     = document.getElementById('btn-paste-to-activity');
    this.btnPasteAuthorDirect   = document.getElementById('btn-paste-author-direct');
    this.btnPasteHeaderDirect   = document.getElementById('btn-paste-header-direct');

    // Corel Mini Studio Elements
    this.corelPropertyBar   = document.getElementById('corel-property-bar');
    this.corelPropertyContent = document.getElementById('corel-property-content');
    this.corelToolbox       = document.getElementById('corel-toolbox');
    this.btnToggleDock      = document.getElementById('btn-toggle-dock');
    this.btnCloseDock       = document.getElementById('btn-close-dock');

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

    // Live Input Event Listeners dengan Auto-Save ke LocalStorage
    const bindLive = (inp, views, storageKey = null) => {
      if (!inp) return;
      const targetViews = Array.isArray(views) ? views : [views];
      inp.addEventListener('input', () => {
        const val = inp.value;
        targetViews.forEach(v => {
          if (v) v.innerText = val;
        });
        if (storageKey) {
          try { localStorage.setItem(storageKey, val); } catch (e) {}
        }
      });
    };

    bindLive(this.inpDay, [this.viewDay, this.viewDayCustomOverlay, this.viewDayCustomBar], 'alqalam_day');
    bindLive(this.inpDateMasehi, [this.viewDateMasehi, this.viewDateMasehiCustomOverlay, this.viewDateMasehiCustomBar], 'alqalam_date_masehi');
    bindLive(this.inpDateHijri, [this.viewDateHijri, this.viewDateHijriCustomOverlay, this.viewDateHijriCustomBar], 'alqalam_date_hijri');
    bindLive(this.inpEditionNum, [this.viewEditionNum, this.viewEditionNumCustomOverlay, this.viewEditionNumCustomBar], 'alqalam_edition_num');
    bindLive(this.inpHeadline, this.viewHeadline, 'alqalam_headline_text');
    bindLive(this.inpSubheadline, this.viewSubheadline, 'alqalam_subheadline_text');
    bindLive(this.inpPageNum, this.viewFooterPage, 'alqalam_page_num');

    // Callout quote updates
    this.inpCalloutQuote?.addEventListener('input', () => {
      this.updateBottomInsertsVisibility();
      try { localStorage.setItem('alqalam_callout_quote', this.inpCalloutQuote.value); } catch(e) {}
    });

    // Author Name updates both Badge & Byline
    this.inpAuthorName?.addEventListener('input', () => {
      const name = this.inpAuthorName.value.trim();
      if (this.viewAuthorBadge) this.viewAuthorBadge.innerText = name;
      if (this.viewByline) this.viewByline.innerText = name;
      try { localStorage.setItem('alqalam_author_name', this.inpAuthorName.value); } catch(e) {}
    });

    // Body Text Live Formatter dengan Auto-Save
    this.inpBodyText?.addEventListener('input', () => {
      this.formatNewspaperContent(true);
    });

    // Simpan seluruh draft sebelum tab/jendela ditutup atau di-reload
    window.addEventListener('beforeunload', () => {
      this.saveArticleDraft();
    });

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
    this.inpHeadlineIndent?.addEventListener('input', () => this.updateHeadlineIndent(this.inpHeadlineIndent.value, true));
    this.btnResetHeadlineIndent?.addEventListener('click', () => {
      this.updateHeadlineIndent(0, true);
      this.setHeadlineOffset(0, 0, true);
      this.setSubheadlineOffset(0, 0, true);
      this.setBylineOffset(0, 0, true);
    });
    this.btnPosPresets?.forEach(btn => {
      btn.addEventListener('click', () => {
        const posKey = btn.getAttribute('data-pos');
        this.applyAuthorPosPreset(posKey);
      });
    });
    this.initDraggables();
    this.initTextElementsDirectDrag();
    this.initAuthorResizeHandle();
    this.initClipboardPaste();
    this.initCanvasInteractiveSelection();

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
    this.repositionCanvasHud();
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

  applyKopSize(index) {
    this.kopSizeIndex = Math.max(0, Math.min(this.kopSizes.length - 1, index));
    const current = this.kopSizes[this.kopSizeIndex];
    if (this.labelKopSize) {
      this.labelKopSize.innerText = current.label;
    }
    const propVal = document.getElementById('prop-val-kop-size');
    if (propVal) propVal.innerText = current.label;

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

  changeKopSize(delta) {
    this.applyKopSize(this.kopSizeIndex + delta);
    this.pushState('Ukuran Kop Master');
  }

  updateHeaderFullBleed(save = true) {
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
    const propChk = document.getElementById('prop-chk-fullbleed') || document.getElementById('prop-chk-kop-fullbleed');
    if (propChk) propChk.checked = isFull;
    if (save) this.pushState('Kop Penuh (Full-Bleed)');
  }

  setHeaderDatePosition(pos, save = true) {
    this.headerDatePosition = pos;
    this.updateHeaderDisplay();
    if (save) this.pushState('Posisi Tanggal Kop');
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
    this.pushState('Reset Kop Master');
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

  formatNewspaperContent(save = true) {
    if (!this.inpBodyText || !this.viewNewspaperContent) return;
    const text = this.inpBodyText.value.trim();

    // Simpan otomatis ke localStorage agar teks berita TIDAK HILANG saat di-reload
    if (save) {
      try {
        localStorage.setItem('alqalam_body_text', this.inpBodyText.value);
      } catch (e) {}
    }
    
    // Update word count
    const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
    if (this.textWordCount) {
      this.textWordCount.innerText = `${words} kata`;
    }
    const propWordCount = document.getElementById('prop-val-word-count');
    if (propWordCount) {
      propWordCount.innerText = `${words} kata`;
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
    // 1. Pulihkan Tipe Template (Opini Guru / Liputan Berita)
    const savedTemplate = localStorage.getItem('alqalam_template_type');
    if (savedTemplate) {
      this.setTemplateStyle(savedTemplate, false);
    }

    // 2. Pulihkan Teks Naskah Berita dari LocalStorage (Mencegah hilang saat reload)
    const savedBodyText = localStorage.getItem('alqalam_body_text');
    if (savedBodyText !== null && this.inpBodyText) {
      this.inpBodyText.value = savedBodyText;
    } else if (this.inpBodyText && !this.inpBodyText.value) {
      // Jika pertama kali buka dan belum ada di storage, muat teks demo bawaan
      this.inpBodyText.value = this.demoText;
      try { localStorage.setItem('alqalam_body_text', this.demoText); } catch(e){}
    }

    // 3. Pulihkan Judul Utama Berita
    const savedHeadline = localStorage.getItem('alqalam_headline_text');
    if (savedHeadline !== null && this.inpHeadline) {
      this.inpHeadline.value = savedHeadline;
      if (this.viewHeadline) this.viewHeadline.innerText = savedHeadline;
    }

    // 4. Pulihkan Subjudul Berita
    const savedSubheadline = localStorage.getItem('alqalam_subheadline_text');
    if (savedSubheadline !== null && this.inpSubheadline) {
      this.inpSubheadline.value = savedSubheadline;
      if (this.viewSubheadline) this.viewSubheadline.innerText = savedSubheadline;
    }

    // 5. Pulihkan Nama Penulis
    const savedAuthorName = localStorage.getItem('alqalam_author_name');
    if (savedAuthorName !== null && this.inpAuthorName) {
      this.inpAuthorName.value = savedAuthorName;
      if (this.viewAuthorBadge) this.viewAuthorBadge.innerText = savedAuthorName;
      if (this.viewByline) this.viewByline.innerText = savedAuthorName;
    }

    // 6. Pulihkan Kutipan / Callout Quote
    const savedQuote = localStorage.getItem('alqalam_callout_quote');
    if (savedQuote !== null && this.inpCalloutQuote) {
      this.inpCalloutQuote.value = savedQuote;
    }

    // 7. Pulihkan Hari & Tanggal Edisi
    const savedDay = localStorage.getItem('alqalam_day');
    if (savedDay !== null && this.inpDay) {
      this.inpDay.value = savedDay;
      [this.viewDay, this.viewDayCustomOverlay, this.viewDayCustomBar].forEach(v => { if (v) v.innerText = savedDay; });
    }

    const savedDateM = localStorage.getItem('alqalam_date_masehi');
    if (savedDateM !== null && this.inpDateMasehi) {
      this.inpDateMasehi.value = savedDateM;
      [this.viewDateMasehi, this.viewDateMasehiCustomOverlay, this.viewDateMasehiCustomBar].forEach(v => { if (v) v.innerText = savedDateM; });
    }

    const savedDateH = localStorage.getItem('alqalam_date_hijri');
    if (savedDateH !== null && this.inpDateHijri) {
      this.inpDateHijri.value = savedDateH;
      [this.viewDateHijri, this.viewDateHijriCustomOverlay, this.viewDateHijriCustomBar].forEach(v => { if (v) v.innerText = savedDateH; });
    }

    const savedEdition = localStorage.getItem('alqalam_edition_num');
    if (savedEdition !== null && this.inpEditionNum) {
      this.inpEditionNum.value = savedEdition;
      [this.viewEditionNum, this.viewEditionNumCustomOverlay, this.viewEditionNumCustomBar].forEach(v => { if (v) v.innerText = savedEdition; });
    }

    const savedPage = localStorage.getItem('alqalam_page_num');
    if (savedPage !== null && this.inpPageNum) {
      this.inpPageNum.value = savedPage;
      if (this.viewFooterPage) this.viewFooterPage.innerText = savedPage;
    }

    // 8. Format naskah ke 3 kolom koran dengan teks yang sudah dipulihkan
    this.formatNewspaperContent(false);

    // Pulihkan dan inisialisasi foto dokumentasi kegiatan dinamis (bisa banyak foto & di tengah naskah)
    this.initActivityPhotos();

    // Pulihkan foto penulis dari IndexedDB / LocalStorage / Server
    this.loadSavedAuthorPhoto();

    // Pulihkan pengaturan geser judul
    const savedIndent = localStorage.getItem('alqalam_headline_indent');
    if (savedIndent !== null) {
      this.updateHeadlineIndent(parseInt(savedIndent, 10), false);
    }

    // Pulihkan offset posisi judul
    const savedHeadlineOffset = localStorage.getItem('alqalam_headline_offset');
    if (savedHeadlineOffset) {
      try {
        const offset = JSON.parse(savedHeadlineOffset);
        if (typeof offset.x === 'number' && typeof offset.y === 'number') {
          this.setHeadlineOffset(offset.x, offset.y, false);
        }
      } catch(e) {}
    }

    // Pulihkan offset posisi subjudul
    const savedSubheadlineOffset = localStorage.getItem('alqalam_subheadline_offset');
    if (savedSubheadlineOffset) {
      try {
        const offset = JSON.parse(savedSubheadlineOffset);
        if (typeof offset.x === 'number' && typeof offset.y === 'number') {
          this.setSubheadlineOffset(offset.x, offset.y, false);
        }
      } catch(e) {}
    }

    // Pulihkan offset posisi byline
    const savedBylineOffset = localStorage.getItem('alqalam_byline_offset');
    if (savedBylineOffset) {
      try {
        const offset = JSON.parse(savedBylineOffset);
        if (typeof offset.x === 'number' && typeof offset.y === 'number') {
          this.setBylineOffset(offset.x, offset.y, false);
        }
      } catch(e) {}
    }

    // Pulihkan offset posisi Kop Master
    const savedHeaderOffset = localStorage.getItem('alqalam_header_offset');
    if (savedHeaderOffset) {
      try {
        const offset = JSON.parse(savedHeaderOffset);
        if (typeof offset.x === 'number' && typeof offset.y === 'number') {
          this.setHeaderOffset(offset.x, offset.y, false);
        }
      } catch(e) {}
    }

    // Pulihkan offset posisi Naskah Koran
    const savedBodyOffset = localStorage.getItem('alqalam_body_offset');
    if (savedBodyOffset) {
      try {
        const offset = JSON.parse(savedBodyOffset);
        if (typeof offset.x === 'number' && typeof offset.y === 'number') {
          this.setBodyOffset(offset.x, offset.y, false);
        }
      } catch(e) {}
    }

    // Pulihkan ukuran font langsung pada objek
    const savedHeadlineSize = localStorage.getItem('alqalam_headline_size');
    if (savedHeadlineSize) this.setHeadlineFontSize(parseInt(savedHeadlineSize, 10), false);

    const savedSubheadlineSize = localStorage.getItem('alqalam_subheadline_size');
    if (savedSubheadlineSize) this.setSubheadlineFontSize(parseInt(savedSubheadlineSize, 10), false);

    const savedBodySize = localStorage.getItem('alqalam_body_font_size');
    if (savedBodySize) this.setBodyFontSize(parseFloat(savedBodySize), false);

    const savedBadgeSize = localStorage.getItem('alqalam_author_badge_size');
    if (savedBadgeSize) this.setAuthorBadgeFontSize(parseInt(savedBadgeSize, 10), false);

    const savedHeaderScale = localStorage.getItem('alqalam_custom_header_scale');
    if (savedHeaderScale) this.setCustomHeaderScale(parseFloat(savedHeaderScale), false);

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

    this.updateBottomInsertsVisibility();

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
    const quoteText = this.inpCalloutQuote?.value?.trim() || '';
    const hasQuote = quoteText !== '';
    const logoVal = this.selEventLogo?.value || 'none';
    const hasLogo = (logoVal !== 'none' && this.viewEventLogoImg?.getAttribute('src')) ? true : false;
    const hasIllustration = (this.containerViewIllustration && this.containerViewIllustration.style.display !== 'none' && this.viewIllustrationImg?.getAttribute('src')) ? true : false;

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

    const shouldShowSection = hasQuote || hasLogo || hasIllustration;
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
          let targetW = testImg.naturalWidth || testImg.width || 800;
          let targetH = testImg.naturalHeight || testImg.height || 1000;
          const maxDim = 1600;
          if (targetW > maxDim || targetH > maxDim) {
            if (targetW >= targetH) {
              targetH = Math.round((targetH * maxDim) / targetW);
              targetW = maxDim;
            } else {
              targetW = Math.round((targetW * maxDim) / targetH);
              targetH = maxDim;
            }
          }
          cvs.width = targetW;
          cvs.height = targetH;
          const ctx = cvs.getContext('2d');
          ctx.drawImage(testImg, 0, 0, targetW, targetH);
          const trimmedCvs = this.trimCanvas(cvs);
          const finalUrl = trimmedCvs.toDataURL('image/png');
          this.setAuthorPhoto(finalUrl, true);
        } catch (e) {
          this.setAuthorPhoto(dataUrl, true);
        }
      };
      testImg.onerror = () => {
        this.setAuthorPhoto(dataUrl, true);
      };
      testImg.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }

  setAuthorPhoto(dataUrl, shouldSave = false) {
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
      if (shouldSave) {
        this.saveAuthorPhoto(dataUrl);
        this.pushState('Ganti Foto Penulis');
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
      if (shouldSave) {
        this.saveAuthorPhoto(null);
      }
    }
    if (window.lucide) window.lucide.createIcons();
  }

  async saveAuthorPhoto(dataUrl) {
    if (!dataUrl) {
      await idbStudioDelete('alqalam_author_photo');
      try { localStorage.removeItem('alqalam_author_photo'); } catch (e) {}
      try { localStorage.removeItem('alqalam_author_photo_url'); } catch (e) {}
      fetch('api.php?action=clear_author_photo').catch(() => {});
      return;
    }

    // 1. Simpan ke IndexedDB (kapasitas besar, tidak kena limit kuota 5MB)
    await idbStudioSet('alqalam_author_photo', dataUrl);

    // 2. Coba simpan ke localStorage sebagai fallback jika muat
    try {
      localStorage.setItem('alqalam_author_photo', dataUrl);
    } catch (e) {
      console.warn('LocalStorage limit reached for raw photo, saved in IndexedDB & Server instead');
    }

    // 3. Simpan permanen ke server lokal (api.php)
    try {
      const res = await fetch('api.php?action=upload_author_photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_data: dataUrl })
      });
      const data = await res.json();
      if (data.success && data.author_url) {
        console.log('Foto penulis berhasil tersimpan permanen di server:', data.author_url);
        try {
          localStorage.setItem('alqalam_author_photo_url', data.author_url);
        } catch (e) {}
      }
    } catch (err) {
      console.warn('Gagal menyimpan foto penulis ke server:', err);
    }
  }

  async loadSavedAuthorPhoto() {
    // 1. Prioritas utama: Cek IndexedDB (sangat cepat & data base64 utuh)
    try {
      const idbPhoto = await idbStudioGet('alqalam_author_photo');
      if (idbPhoto) {
        this.setAuthorPhoto(idbPhoto, false);
        return;
      }
    } catch (e) {}

    // 2. Cek localStorage
    try {
      const localPhoto = localStorage.getItem('alqalam_author_photo');
      if (localPhoto) {
        this.setAuthorPhoto(localPhoto, false);
        await idbStudioSet('alqalam_author_photo', localPhoto);
        return;
      }
      const localUrl = localStorage.getItem('alqalam_author_photo_url');
      if (localUrl) {
        this.setAuthorPhoto(localUrl, false);
        return;
      }
    } catch (e) {}

    // 3. Cek server lokal api.php (permanen lintas browser/setelah bersihkan cache)
    try {
      const res = await fetch('api.php?action=get_author_photo&t=' + Date.now());
      const data = await res.json();
      if (data.success && data.has_author_photo && data.author_url) {
        this.setAuthorPhoto(data.author_url, false);
        await idbStudioSet('alqalam_author_photo', data.author_url);
      } else {
        this.setAuthorPhoto(null, false);
      }
    } catch (e) {
      this.setAuthorPhoto(null, false);
    }
  }

  updateHeadlineIndent(value, save = true) {
    const val = parseInt(value, 10) || 0;
    this.headlineIndent = val;
    if (this.labelHeadlineIndent) this.labelHeadlineIndent.innerText = `${val} px`;
    if (this.inpHeadlineIndent) this.inpHeadlineIndent.value = val;
    const propVal = document.getElementById('prop-val-headline-indent');
    if (propVal) propVal.innerText = `${val} px`;

    if (this.authorSlotSpacer) {
      if (val > 0) {
        this.authorSlotSpacer.style.display = 'block';
        this.authorSlotSpacer.style.width = `${val}px`;
      } else {
        const showSpacer = this.chkHeadlineSpacer ? this.chkHeadlineSpacer.checked : false;
        this.authorSlotSpacer.style.display = showSpacer ? 'block' : 'none';
        this.authorSlotSpacer.style.width = `${Math.max(160, this.authorPhotoWidth || 170)}px`;
      }
    }

    const hudVal = document.getElementById('hud-val-headline-indent');
    if (hudVal) hudVal.innerText = `${val} px`;

    if (save) {
      try {
        localStorage.setItem('alqalam_headline_indent', val.toString());
      } catch (e) {}
      this.pushState('Indent Judul');
    }
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
      this.pushState('Lebar Foto Penulis');
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
      this.pushState('Perataan Foto Penulis');
    }
    this.applyAuthorCardStyles();
  }

  setAuthorFrameMode(mode) {
    this.authorFrameMode = mode;
    try {
      localStorage.setItem('alqalam_author_frame_mode', mode);
    } catch (e) {}
    this.applyAuthorCardStyles();
    this.pushState('Bingkai Foto Penulis');
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
    const propValWidth = document.getElementById('prop-val-author-width');
    if (propValWidth) propValWidth.innerText = `${width} px`;
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
      this.pushState('Tampilkan/Sembunyikan Badge Penulis');
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
      this.pushState('Ruang Judul');
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
      this.setAuthorPhoto(trimmedDataUrl, true);
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
      this.setAuthorPhoto(transparentDataUrl, true);
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

  initTextElementsDirectDrag() {
    this.makeTextElementDraggable(
      this.viewHeadline,
      () => ({ x: this.headlineOffsetX, y: this.headlineOffsetY }),
      (x, y, save) => this.setHeadlineOffset(x, y, save),
      'Geser Judul'
    );

    this.makeTextElementDraggable(
      this.viewSubheadline,
      () => ({ x: this.subheadlineOffsetX, y: this.subheadlineOffsetY }),
      (x, y, save) => this.setSubheadlineOffset(x, y, save),
      'Geser Subjudul'
    );

    this.makeTextElementDraggable(
      this.viewBylineContainer,
      () => ({ x: this.bylineOffsetX, y: this.bylineOffsetY }),
      (x, y, save) => this.setBylineOffset(x, y, save),
      'Geser Byline'
    );

    // Kop Master (Header) Langsung Geser Dinamis
    this.makeTextElementDraggable(
      this.containerSheetHeader || this.viewCustomHeaderWrapper,
      () => ({ x: this.headerOffsetX, y: this.headerOffsetY }),
      (x, y, save) => this.setHeaderOffset(x, y, save),
      'Geser Posisi Kop'
    );

    // Naskah Koran (3 Kolom Teks) Langsung Geser Dinamis
    this.makeTextElementDraggable(
      this.viewNewspaperContent,
      () => ({ x: this.bodyOffsetX, y: this.bodyOffsetY }),
      (x, y, save) => this.setBodyOffset(x, y, save),
      'Geser Posisi Naskah'
    );
  }

  makeTextElementDraggable(elem, getOffsetFn, setOffsetFn, actionLabel = 'Geser Teks') {
    if (!elem) return;

    elem.setAttribute('draggable', 'false');
    elem.addEventListener('dragstart', (e) => e.preventDefault());

    let isDown = false;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let initialX = 0;
    let initialY = 0;

    const onStart = (e) => {
      if (e.type === 'mousedown' && e.button !== 0) return;
      if (elem.isContentEditable || elem.classList.contains('canvas-inline-editing')) return;
      if (e.target.closest('.export-ignore')) return;

      isDown = true;
      isDragging = false;
      const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
      const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;
      startX = clientX;
      startY = clientY;

      const current = getOffsetFn();
      initialX = current.x || 0;
      initialY = current.y || 0;

      // Segera tandai seleksi canvas
      this.selectCanvasElement(elem);

      // PENTING: Cegah text selection agar browser tidak meng-highlight teks saat di-drag
      if (e.cancelable) e.preventDefault();
    };

    const onMove = (e) => {
      if (!isDown) return;

      const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
      const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;

      const zoom = this.zoomScale || 1;
      const dx = (clientX - startX) / zoom;
      const dy = (clientY - startY) / zoom;

      if (!isDragging && Math.hypot(dx, dy) > 3) {
        isDragging = true;
        elem.classList.add('cursor-grabbing');
        elem.style.transition = 'none';
      }

      if (isDragging) {
        if (e.cancelable) e.preventDefault();

        const newX = Math.round(initialX + dx);
        const newY = Math.round(initialY + dy);

        setOffsetFn(newX, newY, false);
        this.repositionCanvasHud();
      }
    };

    const onEnd = () => {
      if (!isDown) return;
      isDown = false;

      if (isDragging) {
        isDragging = false;
        elem.classList.remove('cursor-grabbing');
        elem.style.transition = '';

        const cur = getOffsetFn();
        setOffsetFn(cur.x, cur.y, true);
        this.repositionCanvasHud();

        this.justDragged = true;
        setTimeout(() => { this.justDragged = false; }, 120);
        this.pushState(actionLabel);
      }
    };

    elem.addEventListener('mousedown', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);

    elem.addEventListener('touchstart', onStart, { passive: false });
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd);
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
      this.pushState('Ukuran Foto');
    };

    handle.addEventListener('mousedown', onResizeStart);
    window.addEventListener('mousemove', onResizeMove);
    window.addEventListener('mouseup', onResizeEnd);

    handle.addEventListener('touchstart', onResizeStart, { passive: false });
    window.addEventListener('touchmove', onResizeMove, { passive: false });
    window.addEventListener('touchend', onResizeEnd);
  }

  /* ==========================================================================
     COREL-STYLE INTERACTIVE SELECTION & CONTEXTUAL PROPERTY BAR
     ========================================================================== */

  initCanvasInteractiveSelection() {
    if (!this.a3Sheet) return;

    // 1. Klik pada elemen di atas lembaran koran A3
    this.a3Sheet.addEventListener('click', (e) => {
      if (e.target.closest('.export-ignore')) {
        return;
      }
      if (this.justDragged) {
        this.justDragged = false;
        return;
      }

      const target = e.target.closest('.canvas-selectable');
      if (target) {
        e.stopPropagation();
        this.selectCanvasElement(target);
      } else {
        this.deselectCanvasElement();
      }
    });

    // 2. Klik di luar canvas untuk deselect (abaikan jika klik di toolbox/property-bar/dock/modals)
    document.addEventListener('click', (e) => {
      if (this.justDragged) return;
      if (!e.target.closest('#a3-sheet') && 
          !e.target.closest('#corel-property-bar') && 
          !e.target.closest('#corel-toolbox') && 
          !e.target.closest('#editor-panel') &&
          !e.target.closest('#modal-paste-target') &&
          !e.target.closest('header')) {
        this.deselectCanvasElement();
      }
    });

    // 3. Tombol Escape untuk deselect
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.deselectCanvasElement();
      }
    });

    // 4. Double click pada teks untuk inline WYSIWYG editing langsung di halaman
    this.a3Sheet.addEventListener('dblclick', (e) => {
      const target = e.target.closest('.canvas-selectable');
      if (target) {
        const type = target.getAttribute('data-canvas-type');
        if (type === 'headline' || type === 'subheadline' || type === 'author-badge' || type === 'byline') {
          e.stopPropagation();
          const editTarget = (type === 'byline' && this.viewByline) ? this.viewByline : target;
          this.startInlineEditing(editTarget);
        } else if (type === 'newspaper-content') {
          e.stopPropagation();
          this.toggleDock(true);
          this.switchDockTab('tab-pane-naskah');
          this.inpBodyText?.focus();
        }
      }
    });
  }

  selectCanvasElement(el) {
    if (!el) return;

    if (this.selectedCanvasElement && this.selectedCanvasElement !== el) {
      this.selectedCanvasElement.classList.remove('canvas-selected');
    }

    this.selectedCanvasElement = el;
    el.classList.add('canvas-selected');

    const type = el.getAttribute('data-canvas-type') || this.inferElementType(el);
    this.updateCorelPropertyBar(type, el);
    this.updateActiveTool(type);
  }

  deselectCanvasElement() {
    if (this.selectedCanvasElement) {
      this.selectedCanvasElement.classList.remove('canvas-selected');
      this.selectedCanvasElement = null;
    }
    this.updateCorelPropertyBar('page', null);
    this.updateActiveTool('pick');
  }

  repositionCanvasHud() {
    // Toolbar HUD melayang di halaman ditiadakan digantikan Top Property Bar ala CorelDRAW
  }

  renderHudControls(el) {
    // Digantikan oleh Contextual Property Bar di bagian atas
  }

  /* ==========================================================================
     COREL MINI STUDIO ENGINE (Toolbox, Property Bar, Collapsible Dock)
     ========================================================================== */

  initCorelInterface() {
    this.initCorelToolbox();
    this.initCorelDock();
    this.updateCorelPropertyBar('page', null);
  }

  inferElementType(el) {
    if (!el) return 'page';
    if (el.closest('.activity-photo-card') || el.classList.contains('activity-photo-card') || el.getAttribute('data-canvas-type') === 'activity-photo') {
      const card = el.closest('.activity-photo-card') || el;
      this.selectedPhotoId = card.getAttribute('data-photo-id') || null;
      return 'activity-photo';
    }
    if (el === this.viewHeadline || el.id === 'view-headline') return 'headline';
    if (el === this.viewSubheadline || el.id === 'view-subheadline') return 'subheadline';
    if (el === this.viewBylineContainer || el === this.viewByline || el.id === 'view-byline-container') return 'byline';
    if (el.closest('#container-author-photo')) return 'author-photo';
    if (el.closest('#container-author-badge')) return 'author-badge';
    if (el.closest('#view-custom-header-wrapper') || el.closest('#container-sheet-header')) return 'header';
    if (el === this.viewNewspaperContent || el.id === 'view-newspaper-content') return 'newspaper-content';
    if (el.closest('#container-bottom-inserts')) return 'bottom-inserts';
    return 'page';
  }

  updateActiveTool(type) {
    const toolMap = {
      'pick': 'tool-pick',
      'page': 'tool-pick',
      'headline': 'tool-headline',
      'subheadline': 'tool-subheadline',
      'author-photo': 'tool-photo',
      'author-badge': 'tool-badge',
      'header': 'tool-header',
      'newspaper-content': 'tool-body',
      'bottom-inserts': 'tool-activity',
      'activity-photo': 'tool-activity'
    };
    const activeToolId = toolMap[type] || 'tool-pick';
    document.querySelectorAll('#corel-toolbox .corel-tool-btn').forEach(btn => {
      if (btn.id === activeToolId) {
        btn.classList.add('active');
      } else if (btn.id.startsWith('tool-') && btn.id !== 'tool-dock-toggle' && btn.id !== 'tool-paste-direct' && btn.id !== 'tool-undo' && btn.id !== 'tool-redo') {
        btn.classList.remove('active');
      }
    });
  }

  initCorelToolbox() {
    const bindTool = (toolId, onSelect) => {
      const btn = document.getElementById(toolId);
      if (!btn) return;
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        onSelect();
      });
    };

    bindTool('tool-pick', () => {
      this.deselectCanvasElement();
    });

    bindTool('tool-headline', () => {
      if (this.viewHeadline) this.selectCanvasElement(this.viewHeadline);
    });

    bindTool('tool-subheadline', () => {
      if (this.viewSubheadline) this.selectCanvasElement(this.viewSubheadline);
    });

    bindTool('tool-photo', () => {
      if (this.containerAuthorPhoto) this.selectCanvasElement(this.containerAuthorPhoto);
    });

    bindTool('tool-badge', () => {
      if (this.containerAuthorBadge) this.selectCanvasElement(this.containerAuthorBadge);
    });

    bindTool('tool-header', () => {
      const headerEl = this.containerSheetHeader || this.viewCustomHeaderWrapper;
      if (headerEl) this.selectCanvasElement(headerEl);
    });

    bindTool('tool-body', () => {
      if (this.viewNewspaperContent) this.selectCanvasElement(this.viewNewspaperContent);
    });

    bindTool('tool-activity', () => {
      this.toggleDock(true);
      this.switchDockTab('tab-pane-sisipan');
      if (this.activityPhotos && this.activityPhotos.length > 0) {
        const firstPhoto = this.activityPhotos[0];
        const card = document.getElementById('card-photo-' + firstPhoto.id);
        if (card) {
          this.selectedPhotoId = firstPhoto.id;
          this.selectCanvasElement(card);
          return;
        }
      }
    });

    bindTool('tool-paste-direct', () => {
      if (this.btnPasteAuthorDirect) {
        this.btnPasteAuthorDirect.click();
      }
    });

    bindTool('tool-dock-toggle', () => {
      this.toggleDock();
    });
  }

  /* ==========================================================================
     DYNAMIC FLOATING ACTIVITY PHOTOS ENGINE (Multi-photo, Drag & Corner Resize)
     ========================================================================== */

  initActivityPhotos() {
    this.layerActivityPhotos = document.getElementById('layer-activity-photos');
    this.listActivityPhotosDock = document.getElementById('list-activity-photos-dock');

    const saved = localStorage.getItem('alqalam_activity_photos');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          this.activityPhotos = parsed;
        }
      } catch (e) {}
    }

    // Jika belum ada data sama sekali di storage, sediakan 1 foto demo bawaan di posisi tengah naskah
    if (!this.activityPhotos || this.activityPhotos.length === 0) {
      this.activityPhotos = [
        {
          id: 'photo_1',
          src: 'assets/template/demo_activity_math.jpg',
          caption: 'Suasana murid MTsN 1 Blitar saat aktif berdiskusi pelajaran matematika.',
          left: 275,
          top: 560,
          width: 290,
          visible: true
        }
      ];
    }

    if (!this.selectedPhotoId && this.activityPhotos.length > 0) {
      this.selectedPhotoId = this.activityPhotos[0].id;
    }

    this.renderActivityPhotos();
    this.renderActivityPhotosDockList();
  }

  saveActivityPhotos() {
    try {
      localStorage.setItem('alqalam_activity_photos', JSON.stringify(this.activityPhotos));
    } catch (e) {}
  }

  addNewActivityPhoto(customData = null) {
    const count = this.activityPhotos.length;
    const newId = 'photo_' + Date.now();
    const offset = (count * 30) % 150;
    const defaultLeft = Math.min(480, 260 + offset);
    const defaultTop = Math.min(800, 540 + offset);

    const newPhoto = Object.assign({
      id: newId,
      src: 'assets/template/demo_activity_math.jpg',
      caption: `Keterangan foto kegiatan #${count + 1}...`,
      left: defaultLeft,
      top: defaultTop,
      width: 290,
      visible: true
    }, customData || {});

    this.activityPhotos.push(newPhoto);
    this.selectedPhotoId = newId;
    this.saveActivityPhotos();
    this.renderActivityPhotos();
    this.renderActivityPhotosDockList();

    const newCard = document.getElementById('card-photo-' + newId);
    if (newCard) {
      this.selectCanvasElement(newCard);
    }

    this.pushState('Tambah Foto Kegiatan');

    // Jika belum ada custom image src, langsung buka pemilih file
    if (!customData || !customData.src) {
      setTimeout(() => {
        document.getElementById('inp-dock-upload-' + newId)?.click();
      }, 150);
    }
  }

  deleteActivityPhoto(photoId) {
    const idx = this.activityPhotos.findIndex(p => p.id === photoId);
    if (idx === -1) return;

    if (confirm(`Hapus foto kegiatan #${idx + 1} ini dari lembar koran?`)) {
      this.activityPhotos.splice(idx, 1);
      this.selectedPhotoId = this.activityPhotos.length > 0 ? this.activityPhotos[0].id : null;
      this.saveActivityPhotos();
      this.renderActivityPhotos();
      this.renderActivityPhotosDockList();
      this.deselectCanvasElement();
      this.pushState('Hapus Foto Kegiatan');
    }
  }

  setActivityPhotoWidth(photoId, width, save = true) {
    const photo = this.activityPhotos.find(p => p.id === photoId);
    if (!photo) return;
    photo.width = Math.round(Math.max(100, Math.min(800, width)));
    const card = document.getElementById('card-photo-' + photoId);
    if (card) {
      card.style.width = `${photo.width}px`;
    }
    const valSpan = document.getElementById('prop-val-photo-width');
    if (valSpan && this.selectedPhotoId === photoId) {
      valSpan.innerText = `${photo.width} px`;
    }
    if (save) {
      this.saveActivityPhotos();
      this.pushState('Ukuran Foto Kegiatan');
    }
  }

  setActivityPhotoPosition(photoId, left, top, save = true) {
    const photo = this.activityPhotos.find(p => p.id === photoId);
    if (!photo) return;
    photo.left = Math.round(left);
    photo.top = Math.round(top);
    const card = document.getElementById('card-photo-' + photoId);
    if (card) {
      card.style.left = `${photo.left}px`;
      card.style.top = `${photo.top}px`;
    }
    if (save) {
      this.saveActivityPhotos();
      this.pushState('Posisi Foto Kegiatan');
    }
  }

  handleActivityPhotoFile(photoId, file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const photo = this.activityPhotos.find(p => p.id === photoId);
      if (photo) {
        photo.src = dataUrl;
        this.saveActivityPhotos();
        this.renderActivityPhotos();
        this.renderActivityPhotosDockList();
        this.pushState('Upload Foto Kegiatan');
      }
    };
    reader.readAsDataURL(file);
  }

  renderActivityPhotos() {
    if (!this.layerActivityPhotos) {
      this.layerActivityPhotos = document.getElementById('layer-activity-photos');
    }
    if (!this.layerActivityPhotos) return;

    this.layerActivityPhotos.innerHTML = '';

    this.activityPhotos.forEach((photo, idx) => {
      if (photo.visible === false || !photo.src) return;

      const isSelected = this.selectedPhotoId === photo.id;
      const card = document.createElement('div');
      card.id = 'card-photo-' + photo.id;
      card.className = `activity-photo-card absolute flex flex-col select-none group touch-none z-20 canvas-selectable ${isSelected ? 'canvas-selected' : ''}`;
      card.setAttribute('data-canvas-type', 'activity-photo');
      card.setAttribute('data-photo-id', photo.id);
      card.style.left = `${photo.left || 275}px`;
      card.style.top = `${photo.top || 560}px`;
      card.style.width = `${photo.width || 290}px`;
      card.style.cursor = 'grab';
      card.title = `Foto Dokumentasi #${idx + 1} (Klik untuk pilih, geser ke posisi mana saja di halaman, seret sudut kanan bawah untuk ubah ukuran)`;

      card.innerHTML = `
        <div class="activity-photo-frame w-full bg-white rounded-xl p-2 shadow-lg border border-slate-300 relative transition-all group-hover:border-emerald-500">
          <!-- Gambar (Natural Aspect Ratio) -->
          <div class="w-full overflow-hidden rounded-lg bg-slate-100 flex items-center justify-center">
            <img src="${photo.src}" alt="${photo.caption || 'Foto Dokumentasi'}" class="w-full h-auto object-cover block pointer-events-none select-none max-h-[500px]">
          </div>
          <!-- Keterangan Jurnalistik -->
          ${photo.caption ? `
            <div class="activity-photo-caption text-[10px] font-sans text-slate-700 mt-1.5 px-1 leading-snug italic select-none" data-photo-id="${photo.id}">
              <span class="font-bold not-italic text-emerald-800 mr-1">▲ DOKUMENTASI:</span>${photo.caption}
            </div>
          ` : ''}
          <!-- Dynamic Corner Resize Handle -->
          <div class="handle-resize-activity-photo export-ignore absolute -bottom-2.5 -right-2.5 w-6 h-6 bg-emerald-500 hover:bg-emerald-400 active:scale-125 border-2 border-white rounded-full shadow-lg cursor-nwse-resize z-40 flex items-center justify-center transition-transform hover:scale-125 touch-none select-none"
               data-photo-id="${photo.id}"
               title="Klik tahan dan seret untuk memperbesar / memperkecil foto kegiatan">
            <i data-lucide="scaling" class="w-3.5 h-3.5 text-white pointer-events-none stroke-[2.5]"></i>
          </div>
        </div>
      `;

      this.layerActivityPhotos.appendChild(card);

      // Inisialisasi Direct Drag & Drop ke mana saja di lembaran koran (termasuk tengah teks)
      this.initActivityPhotoDrag(card, photo);

      // Inisialisasi Corner Resize Handle langsung pada objek di halaman
      const handle = card.querySelector('.handle-resize-activity-photo');
      if (handle) {
        this.initActivityPhotoResize(handle, card, photo);
      }
    });

    if (window.lucide) window.lucide.createIcons();
  }

  initActivityPhotoDrag(card, photo) {
    if (!card || !this.a3Sheet) return;

    let isDown = false;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let initialLeft = photo.left || 275;
    let initialTop = photo.top || 560;

    const onMove = (e) => {
      if (!isDown) return;
      const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
      const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;

      const zoom = this.zoomScale || 1;
      const dx = (clientX - startX) / zoom;
      const dy = (clientY - startY) / zoom;

      if (!isDragging && Math.hypot(dx, dy) > 3) {
        isDragging = true;
        card.style.cursor = 'grabbing';
      }

      if (isDragging) {
        if (e.cancelable) e.preventDefault();
        const sheetW = this.a3Sheet.offsetWidth || 840;
        const sheetH = this.a3Sheet.offsetHeight || 1188;

        const newLeft = Math.round(Math.max(-50, Math.min(sheetW - 50, initialLeft + dx)));
        const newTop = Math.round(Math.max(50, Math.min(sheetH - 50, initialTop + dy)));

        card.style.left = `${newLeft}px`;
        card.style.top = `${newTop}px`;
        photo.left = newLeft;
        photo.top = newTop;

        if (typeof this.repositionCanvasHud === 'function') {
          this.repositionCanvasHud();
        }
      }
    };

    const onEnd = () => {
      if (!isDown) return;
      isDown = false;

      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);

      if (isDragging) {
        isDragging = false;
        card.style.cursor = 'grab';
        this.saveActivityPhotos();
        this.justDragged = true;
        setTimeout(() => { this.justDragged = false; }, 120);
        this.pushState('Geser Foto Kegiatan');
      }
    };

    const onStart = (e) => {
      if (e.type === 'mousedown' && e.button !== 0) return;
      if (e.target.closest('.export-ignore')) return;

      isDown = true;
      isDragging = false;
      const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
      const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;
      startX = clientX;
      startY = clientY;

      initialLeft = parseFloat(card.style.left) || photo.left || 275;
      initialTop = parseFloat(card.style.top) || photo.top || 560;

      this.selectedPhotoId = photo.id;
      this.selectCanvasElement(card);

      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onEnd);
      window.addEventListener('touchmove', onMove, { passive: false });
      window.addEventListener('touchend', onEnd);

      if (e.cancelable) e.preventDefault();
    };

    card.addEventListener('mousedown', onStart);
    card.addEventListener('touchstart', onStart, { passive: false });
  }

  initActivityPhotoResize(handle, card, photo) {
    if (!handle || !card || !this.a3Sheet) return;

    let isResizing = false;
    let startX = 0;
    let startY = 0;
    let initialWidth = photo.width || 290;

    const onResizeMove = (e) => {
      if (!isResizing) return;
      const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
      const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;

      const zoom = this.zoomScale || 1;
      const dx = (clientX - startX) / zoom;
      const dy = (clientY - startY) / zoom;

      // Geser diagonal sudut kanan bawah: dx>0 dy>0 perbesar, sebaliknya perkecil
      const delta = (dx + dy) / 1.414;
      const newWidth = Math.round(Math.max(100, Math.min(800, initialWidth + delta)));

      card.style.width = `${newWidth}px`;
      photo.width = newWidth;

      const valSpan = document.getElementById('prop-val-photo-width');
      if (valSpan && this.selectedPhotoId === photo.id) {
        valSpan.innerText = `${newWidth} px`;
      }

      if (typeof this.repositionCanvasHud === 'function') {
        this.repositionCanvasHud();
      }

      if (e.cancelable) e.preventDefault();
    };

    const onResizeEnd = () => {
      if (!isResizing) return;
      isResizing = false;

      window.removeEventListener('mousemove', onResizeMove);
      window.removeEventListener('mouseup', onResizeEnd);
      window.removeEventListener('touchmove', onResizeMove);
      window.removeEventListener('touchend', onResizeEnd);

      card.classList.remove('ring-2', 'ring-emerald-400', 'ring-dashed');
      handle.classList.remove('scale-125', 'bg-emerald-400');
      document.body.style.cursor = '';

      photo.width = card.offsetWidth || photo.width || 290;
      this.saveActivityPhotos();
      this.justDragged = true;
      setTimeout(() => { this.justDragged = false; }, 120);
      this.pushState('Ukuran Foto Kegiatan');
    };

    const onResizeStart = (e) => {
      e.stopPropagation();
      if (e.type === 'mousedown' && e.button !== 0) return;

      isResizing = true;
      const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
      const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;
      startX = clientX;
      startY = clientY;

      initialWidth = card.offsetWidth || photo.width || 290;

      card.classList.add('ring-2', 'ring-emerald-400', 'ring-dashed');
      handle.classList.add('scale-125', 'bg-emerald-400');
      document.body.style.cursor = 'nwse-resize';

      this.selectedPhotoId = photo.id;
      this.selectCanvasElement(card);

      window.addEventListener('mousemove', onResizeMove);
      window.addEventListener('mouseup', onResizeEnd);
      window.addEventListener('touchmove', onResizeMove, { passive: false });
      window.addEventListener('touchend', onResizeEnd);

      if (e.cancelable) e.preventDefault();
    };

    handle.addEventListener('mousedown', onResizeStart);
    handle.addEventListener('touchstart', onResizeStart, { passive: false });
  }

  renderActivityPhotosDockList() {
    if (!this.listActivityPhotosDock) {
      this.listActivityPhotosDock = document.getElementById('list-activity-photos-dock');
    }
    if (!this.listActivityPhotosDock) return;

    if (!this.activityPhotos || this.activityPhotos.length === 0) {
      this.listActivityPhotosDock.innerHTML = `
        <div class="p-4 bg-slate-900 border border-slate-800 rounded-xl text-center text-slate-500 text-xs">
          <i data-lucide="image" class="w-8 h-8 text-slate-600 mx-auto mb-1"></i>
          <span>Belum ada foto kegiatan. Klik tombol <b>+ Tambah Foto</b> di atas untuk menyisipkan foto dokumentasi.</span>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    let html = '';
    this.activityPhotos.forEach((photo, idx) => {
      const isSelected = this.selectedPhotoId === photo.id;
      html += `
        <div class="bg-slate-900 border ${isSelected ? 'border-emerald-500 ring-1 ring-emerald-500/50' : 'border-slate-800'} rounded-xl p-3 space-y-2.5 transition">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-1.5">
              <span class="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[11px] flex items-center justify-center font-mono">#${idx + 1}</span>
              <span class="text-xs font-bold text-white">Foto Dokumentasi #${idx + 1}</span>
              <span class="text-[10px] font-mono bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">${photo.width || 290}px</span>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" class="btn-dock-photo-center p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-emerald-300 transition cursor-pointer" data-photo-id="${photo.id}" title="Posisikan ke Tengah Naskah">
                <i data-lucide="crosshair" class="w-3.5 h-3.5"></i>
              </button>
              <button type="button" class="btn-dock-photo-delete p-1 rounded hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 transition cursor-pointer" data-photo-id="${photo.id}" title="Hapus Foto ini">
                <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>

          <div class="flex gap-2.5 items-center">
            <!-- Thumbnail -->
            <div class="w-20 h-16 bg-slate-950 border border-slate-700/80 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center relative group">
              ${photo.src ? `<img src="${photo.src}" class="w-full h-full object-cover">` : `<i data-lucide="image" class="w-6 h-6 text-slate-600"></i>`}
              <label class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition">
                <i data-lucide="upload" class="w-4 h-4 text-white"></i>
                <input type="file" id="inp-dock-upload-${photo.id}" class="hidden inp-dock-upload-file" data-photo-id="${photo.id}" accept="image/*">
              </label>
            </div>

            <!-- Upload button & caption -->
            <div class="flex-1 space-y-1.5">
              <label class="cursor-pointer inline-flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[11px] font-semibold border border-slate-700 transition">
                <i data-lucide="upload" class="w-3 h-3 text-emerald-400"></i>
                <span>Ganti Gambar</span>
                <input type="file" class="hidden inp-dock-upload-file" data-photo-id="${photo.id}" accept="image/*">
              </label>
              <input type="text" 
                     class="inp-dock-photo-caption w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg text-white text-[11px] px-2 py-1 outline-none transition" 
                     data-photo-id="${photo.id}" 
                     placeholder="Keterangan / Caption foto..." 
                     value="${(photo.caption || '').replace(/"/g, '&quot;')}">
            </div>
          </div>
        </div>
      `;
    });

    this.listActivityPhotosDock.innerHTML = html;

    // Wire events inside dock list
    this.listActivityPhotosDock.querySelectorAll('.inp-dock-upload-file').forEach(inp => {
      inp.addEventListener('change', (e) => {
        const photoId = inp.getAttribute('data-photo-id');
        const file = e.target.files?.[0];
        if (photoId && file) {
          this.handleActivityPhotoFile(photoId, file);
        }
      });
    });

    this.listActivityPhotosDock.querySelectorAll('.inp-dock-photo-caption').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const photoId = inp.getAttribute('data-photo-id');
        const photo = this.activityPhotos.find(p => p.id === photoId);
        if (photo) {
          photo.caption = e.target.value;
          this.saveActivityPhotos();
          // Update live on canvas card caption
          const cardCaption = document.querySelector(`#card-photo-${photoId} .activity-photo-caption`);
          if (cardCaption) {
            if (photo.caption) {
              cardCaption.innerHTML = `<span class="font-bold not-italic text-emerald-800 mr-1">▲ DOKUMENTASI:</span>${photo.caption}`;
              cardCaption.style.display = 'block';
            } else {
              cardCaption.style.display = 'none';
            }
          } else if (photo.caption) {
            this.renderActivityPhotos();
          }
        }
      });
    });

    this.listActivityPhotosDock.querySelectorAll('.btn-dock-photo-center').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const photoId = btn.getAttribute('data-photo-id');
        if (photoId) {
          this.setActivityPhotoPosition(photoId, 275, 560, true);
          const card = document.getElementById('card-photo-' + photoId);
          if (card) {
            this.selectedPhotoId = photoId;
            this.selectCanvasElement(card);
          }
        }
      });
    });

    this.listActivityPhotosDock.querySelectorAll('.btn-dock-photo-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const photoId = btn.getAttribute('data-photo-id');
        if (photoId) {
          this.deleteActivityPhoto(photoId);
        }
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  saveArticleDraft() {
    try {
      if (this.inpBodyText) localStorage.setItem('alqalam_body_text', this.inpBodyText.value);
      if (this.inpHeadline) localStorage.setItem('alqalam_headline_text', this.inpHeadline.value);
      if (this.inpSubheadline) localStorage.setItem('alqalam_subheadline_text', this.inpSubheadline.value);
      if (this.inpAuthorName) localStorage.setItem('alqalam_author_name', this.inpAuthorName.value);
      if (this.inpCalloutQuote) localStorage.setItem('alqalam_callout_quote', this.inpCalloutQuote.value);
      if (this.inpDay) localStorage.setItem('alqalam_day', this.inpDay.value);
      if (this.inpDateMasehi) localStorage.setItem('alqalam_date_masehi', this.inpDateMasehi.value);
      if (this.inpDateHijri) localStorage.setItem('alqalam_date_hijri', this.inpDateHijri.value);
      if (this.inpEditionNum) localStorage.setItem('alqalam_edition_num', this.inpEditionNum.value);
      if (this.inpPageNum) localStorage.setItem('alqalam_page_num', this.inpPageNum.value);
    } catch (e) {
      console.warn('Gagal menyimpan draft artikel:', e);
    }
  }

  initCorelDock() {
    this.btnToggleDock = document.getElementById('btn-toggle-dock');
    this.btnCloseDock = document.getElementById('btn-close-dock');
    this.btnDockAddActivityPhoto = document.getElementById('btn-dock-add-activity-photo');
    this.btnDockAddActivityPhoto?.addEventListener('click', () => this.addNewActivityPhoto());

    this.btnToggleDock?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleDock();
    });

    this.btnCloseDock?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleDock(false);
    });

    // Tab buttons
    document.querySelectorAll('.btn-dock-tab').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetId = btn.getAttribute('data-target');
        this.switchDockTab(targetId);
      });
    });

    // Clear Text button in Naskah tab
    const btnClearText = document.getElementById('btn-clear-body-text');
    btnClearText?.addEventListener('click', () => {
      if (confirm('Kosongkan seluruh teks naskah artikel koran?')) {
        if (this.inpBodyText) {
          this.inpBodyText.value = '';
          this.formatNewspaperContent(true);
          this.pushState('Kosongkan Naskah');
        }
      }
    });

    // Quick Paste button in Naskah tab
    const btnPasteDock = document.getElementById('btn-paste-clipboard-dock');
    btnPasteDock?.addEventListener('click', async () => {
      try {
        if (!navigator.clipboard?.readText) {
          alert('Silakan tekan Ctrl+V pada kotak teks untuk menempel naskah.');
          this.inpBodyText?.focus();
          return;
        }
        const text = await navigator.clipboard.readText();
        if (text && this.inpBodyText) {
          this.inpBodyText.value = text;
          this.inpBodyText.dispatchEvent(new Event('input', { bubbles: true }));
          this.formatNewspaperContent();
        }
      } catch (err) {
        this.inpBodyText?.focus();
      }
    });

    // Demo button in Naskah tab
    const btnDemoDock = document.getElementById('btn-demo-preset-dock');
    btnDemoDock?.addEventListener('click', () => {
      if (this.btnDemoPreset) this.btnDemoPreset.click();
    });

    // Template selection buttons in detail tab
    document.querySelectorAll('.btn-template-select').forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.getAttribute('data-template-type');
        if (type) this.setTemplateStyle(type);
      });
    });
  }

  toggleDock(open = null) {
    const panel = this.editorPanel;
    if (!panel) return;
    const isHidden = panel.classList.contains('hidden');
    const shouldOpen = (open !== null) ? open : isHidden;

    if (shouldOpen) {
      panel.classList.remove('hidden');
      if (this.btnToggleDock) {
        this.btnToggleDock.classList.add('bg-slate-800', 'text-emerald-400', 'border-emerald-500/40');
      }
    } else {
      panel.classList.add('hidden');
      if (this.btnToggleDock) {
        this.btnToggleDock.classList.remove('bg-slate-800', 'text-emerald-400', 'border-emerald-500/40');
      }
    }
    setTimeout(() => this.adjustZoomToFit(), 100);
  }

  switchDockTab(targetPaneId) {
    document.querySelectorAll('.btn-dock-tab').forEach(btn => {
      if (btn.getAttribute('data-target') === targetPaneId) {
        btn.className = 'btn-dock-tab px-3 py-1 rounded-lg text-xs font-bold bg-slate-800 text-white shadow-sm transition';
      } else {
        btn.className = 'btn-dock-tab px-3 py-1 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition';
      }
    });

    document.querySelectorAll('.dock-tab-pane').forEach(pane => {
      if (pane.id === targetPaneId) {
        pane.classList.remove('hidden');
      } else {
        pane.classList.add('hidden');
      }
    });
  }

  /* ==========================================================================
     UNDO & REDO HISTORY MANAGER (Ctrl+Z / Ctrl+Y)
     ========================================================================== */

  initUndoRedo() {
    this.historyList = [];
    this.historyIndex = -1;
    this.maxHistory = 40;
    this.isApplyingHistory = false;

    // Tunggu sedikit sampai load master header & foto awal selesai termuat
    setTimeout(() => {
      this.pushState('Kondisi Awal');
    }, 300);

    // Hubungkan tombol Undo & Redo di Header Bar dan Toolbox Samping
    const undoButtons = [document.getElementById('btn-undo'), document.getElementById('tool-undo')];
    const redoButtons = [document.getElementById('btn-redo'), document.getElementById('tool-redo')];

    undoButtons.forEach(btn => {
      btn?.addEventListener('click', (e) => {
        e.stopPropagation();
        this.undo();
      });
    });

    redoButtons.forEach(btn => {
      btn?.addEventListener('click', (e) => {
        e.stopPropagation();
        this.redo();
      });
    });

    // Keyboard Shortcuts: Ctrl+Z (Undo) dan Ctrl+Y / Ctrl+Shift+Z (Redo)
    window.addEventListener('keydown', (e) => {
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;
      if (!isCtrlOrCmd) return;

      const activeEl = document.activeElement;
      const isTextInput = activeEl && (
        activeEl.tagName === 'INPUT' ||
        activeEl.tagName === 'TEXTAREA' ||
        activeEl.isContentEditable ||
        activeEl.classList?.contains('canvas-inline-editing')
      );

      const key = e.key.toLowerCase();

      // Ctrl + Z (Undo)
      if (key === 'z' && !e.shiftKey) {
        if (isTextInput) return; // Biarkan native undo browser bekerja pada kotak teks aktif
        e.preventDefault();
        this.undo();
      }
      // Ctrl + Y atau Ctrl + Shift + Z (Redo)
      else if (key === 'y' || (key === 'z' && e.shiftKey)) {
        if (isTextInput) return;
        e.preventDefault();
        this.redo();
      }
    });

    // Pasang listener 'change' pada form input agar perubahan teks tercatat saat selesai mengetik/blur
    const trackedInputs = [
      this.inpHeadline, this.inpSubheadline, this.inpAuthorName,
      this.inpBodyText, this.inpCalloutQuote, this.inpDay,
      this.inpDateMasehi, this.inpDateHijri, this.inpEditionNum, this.inpPageNum
    ];
    trackedInputs.forEach(input => {
      input?.addEventListener('change', () => {
        this.pushState('Ubah Teks');
      });
    });
  }

  captureState() {
    return {
      template: this.currentTemplate || 'teacher_opinion',

      headlineText: this.inpHeadline ? this.inpHeadline.value : (this.viewHeadline ? this.viewHeadline.innerText : ''),
      headlineFontSize: this.headlineFontSize || 30,
      headlineIndent: this.headlineIndent || 0,
      headlineOffsetX: this.headlineOffsetX || 0,
      headlineOffsetY: this.headlineOffsetY || 0,

      subheadlineText: this.inpSubheadline ? this.inpSubheadline.value : (this.viewSubheadline ? this.viewSubheadline.innerText : ''),
      subheadlineFontSize: this.subheadlineFontSize || 18,
      subheadlineOffsetX: this.subheadlineOffsetX || 0,
      subheadlineOffsetY: this.subheadlineOffsetY || 0,

      bylineOffsetX: this.bylineOffsetX || 0,
      bylineOffsetY: this.bylineOffsetY || 0,

      authorName: this.inpAuthorName ? this.inpAuthorName.value : '',
      authorPhotoSrc: (this.viewAuthorImg && !this.viewAuthorImg.classList.contains('hidden')) ? (this.viewAuthorImg.src || '') : '',
      authorPhotoHasImg: !!(this.viewAuthorImg && !this.viewAuthorImg.classList.contains('hidden') && this.viewAuthorImg.getAttribute('src')),
      authorPhotoWidth: this.authorPhotoWidth || 170,
      authorFrameMode: this.authorFrameMode || 'none',
      authorAlign: this.authorAlign || 'left',
      authorPhotoLeft: this.containerAuthorPhoto ? (parseFloat(this.containerAuthorPhoto.style.left) || -32) : -32,
      authorPhotoTop: this.containerAuthorPhoto ? (parseFloat(this.containerAuthorPhoto.style.top) || 35) : 35,
      showAuthorBadge: this.chkShowAuthorBadge ? this.chkShowAuthorBadge.checked : true,
      authorBadgeFontSize: this.authorBadgeFontSize || 11,
      authorBadgeLeft: this.containerAuthorBadge ? (parseFloat(this.containerAuthorBadge.style.left) || 0) : 0,
      authorBadgeTop: this.containerAuthorBadge ? (parseFloat(this.containerAuthorBadge.style.top) || 260) : 260,
      headlineSpacer: this.chkHeadlineSpacer ? this.chkHeadlineSpacer.checked : false,

      customHeaderSrc: (this.viewCustomHeaderImg && !this.viewCustomHeaderImg.classList.contains('hidden')) ? (this.viewCustomHeaderImg.src || '') : '',
      customHeaderHasImg: !!(this.viewCustomHeaderImg && !this.viewCustomHeaderImg.classList.contains('hidden') && this.viewCustomHeaderImg.getAttribute('src')),
      headerOffsetX: this.headerOffsetX || 0,
      headerOffsetY: this.headerOffsetY || 0,
      kopSizeIndex: (typeof this.kopSizeIndex === 'number') ? this.kopSizeIndex : 1,
      headerDatePosition: this.headerDatePosition || 'overlay',
      fullWidthHeader: this.chkFullWidthHeader ? this.chkFullWidthHeader.checked : false,
      dateOffset: this.dateOffset || 48,

      day: this.inpDay ? this.inpDay.value : '',
      dateMasehi: this.inpDateMasehi ? this.inpDateMasehi.value : '',
      dateHijri: this.inpDateHijri ? this.inpDateHijri.value : '',
      editionNum: this.inpEditionNum ? this.inpEditionNum.value : '',
      pageNum: this.inpPageNum ? this.inpPageNum.value : '8',

      bodyText: this.inpBodyText ? this.inpBodyText.value : '',
      bodyFontSize: this.bodyFontSize || 11.5,
      bodyOffsetX: this.bodyOffsetX || 0,
      bodyOffsetY: this.bodyOffsetY || 0,
      activityPhotos: JSON.parse(JSON.stringify(this.activityPhotos || [])),

      activityPhotoSrc: (this.viewActivityImg && !this.viewActivityImg.classList.contains('hidden')) ? (this.viewActivityImg.src || '') : '',
      showActivityImg: this.chkShowActivityImg ? this.chkShowActivityImg.checked : false,
      calloutQuote: this.inpCalloutQuote ? this.inpCalloutQuote.value : '',
      eventLogo: this.selEventLogo ? this.selEventLogo.value : 'none'
    };
  }

  areStatesEqual(a, b) {
    if (!a || !b) return false;
    for (const k in a) {
      if (k === '_action') continue;
      if (a[k] !== b[k]) return false;
    }
    for (const k in b) {
      if (k === '_action') continue;
      if (a[k] !== b[k]) return false;
    }
    return true;
  }

  pushState(action = '') {
    if (this.isApplyingHistory) return;

    const snapshot = this.captureState();
    snapshot._action = action;

    // Jangan rekam jika state sama persis dengan yang ada di index saat ini
    if (this.historyIndex >= 0 && this.historyList[this.historyIndex]) {
      if (this.areStatesEqual(this.historyList[this.historyIndex], snapshot)) {
        return;
      }
    }

    // Jika sedang berada di tengah-tengah riwayat lalu ada aksi baru, buang cabang redo
    if (this.historyIndex < this.historyList.length - 1) {
      this.historyList = this.historyList.slice(0, this.historyIndex + 1);
    }

    this.historyList.push(snapshot);
    if (this.historyList.length > this.maxHistory) {
      this.historyList.shift();
    }
    this.historyIndex = this.historyList.length - 1;

    this.updateUndoRedoButtons();
  }

  undo() {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      const targetState = this.historyList[this.historyIndex];
      this.applyState(targetState);
      this.showUndoToast(`Urungkan: ${targetState._action || 'Perubahan'}`);
    }
  }

  redo() {
    if (this.historyIndex < this.historyList.length - 1) {
      this.historyIndex++;
      const targetState = this.historyList[this.historyIndex];
      this.applyState(targetState);
      this.showUndoToast(`Ulangi: ${targetState._action || 'Perubahan'}`);
    }
  }

  applyState(state) {
    if (!state) return;
    this.isApplyingHistory = true;

    try {
      // 1. Template
      if (state.template && state.template !== this.currentTemplate) {
        this.setTemplateStyle(state.template, false);
      }

      // 2. Headline & Subheadline & Byline
      if (state.headlineText !== undefined) {
        if (this.inpHeadline) this.inpHeadline.value = state.headlineText;
        if (this.viewHeadline) this.viewHeadline.innerText = state.headlineText;
      }
      if (state.headlineFontSize !== undefined) {
        this.setHeadlineFontSize(state.headlineFontSize, false);
      }
      if (state.headlineIndent !== undefined) {
        this.updateHeadlineIndent(state.headlineIndent, false);
      }
      if (state.headlineOffsetX !== undefined && state.headlineOffsetY !== undefined) {
        this.setHeadlineOffset(state.headlineOffsetX, state.headlineOffsetY, false);
      }

      if (state.subheadlineText !== undefined) {
        if (this.inpSubheadline) this.inpSubheadline.value = state.subheadlineText;
        if (this.viewSubheadline) this.viewSubheadline.innerText = state.subheadlineText;
      }
      if (state.subheadlineFontSize !== undefined) {
        this.setSubheadlineFontSize(state.subheadlineFontSize, false);
      }
      if (state.subheadlineOffsetX !== undefined && state.subheadlineOffsetY !== undefined) {
        this.setSubheadlineOffset(state.subheadlineOffsetX, state.subheadlineOffsetY, false);
      }

      if (state.bylineOffsetX !== undefined && state.bylineOffsetY !== undefined) {
        this.setBylineOffset(state.bylineOffsetX, state.bylineOffsetY, false);
      }

      // 3. Author Name & Photo & Badge
      if (state.authorName !== undefined) {
        if (this.inpAuthorName) this.inpAuthorName.value = state.authorName;
        if (this.viewAuthorBadge) this.viewAuthorBadge.innerText = state.authorName;
        if (this.viewByline) this.viewByline.innerText = state.authorName;
      }
      if (state.authorPhotoSrc !== undefined) {
        if (state.authorPhotoHasImg && state.authorPhotoSrc) {
          this.setAuthorPhoto(state.authorPhotoSrc, false);
        } else {
          if (this.viewAuthorImg) {
            this.viewAuthorImg.src = '';
            this.viewAuthorImg.classList.add('hidden');
          }
          if (this.placeholderViewAuthor) {
            this.placeholderViewAuthor.classList.remove('hidden');
          }
        }
      }
      if (state.authorPhotoWidth !== undefined) {
        this.setAuthorPhotoWidth(state.authorPhotoWidth, false);
      }
      if (state.authorFrameMode !== undefined) {
        this.setAuthorFrameMode(state.authorFrameMode);
      }
      if (state.authorAlign !== undefined) {
        this.setAuthorAlign(state.authorAlign, false);
      }
      if (state.authorPhotoLeft !== undefined && state.authorPhotoTop !== undefined && this.containerAuthorPhoto) {
        this.setAuthorPhotoPosition(state.authorPhotoLeft, state.authorPhotoTop, false);
      }
      if (state.showAuthorBadge !== undefined && this.chkShowAuthorBadge) {
        this.chkShowAuthorBadge.checked = state.showAuthorBadge;
        this.toggleAuthorBadge(state.showAuthorBadge, false);
      }
      if (state.authorBadgeFontSize !== undefined) {
        this.setAuthorBadgeFontSize(state.authorBadgeFontSize, false);
      }
      if (state.authorBadgeLeft !== undefined && state.authorBadgeTop !== undefined && this.containerAuthorBadge) {
        this.containerAuthorBadge.style.left = `${state.authorBadgeLeft}px`;
        this.containerAuthorBadge.style.top = `${state.authorBadgeTop}px`;
      }
      if (state.headlineSpacer !== undefined && this.chkHeadlineSpacer) {
        this.chkHeadlineSpacer.checked = state.headlineSpacer;
        this.toggleHeadlineSpacer(state.headlineSpacer, false);
      }

      // 4. Header & Kop
      if (state.headerOffsetX !== undefined && state.headerOffsetY !== undefined) {
        this.setHeaderOffset(state.headerOffsetX, state.headerOffsetY, false);
      }
      if (state.kopSizeIndex !== undefined) {
        this.applyKopSize(state.kopSizeIndex);
      }
      if (state.headerDatePosition !== undefined) {
        this.setHeaderDatePosition(state.headerDatePosition, false);
      }
      if (state.fullWidthHeader !== undefined && this.chkFullWidthHeader) {
        this.chkFullWidthHeader.checked = state.fullWidthHeader;
        this.updateHeaderFullBleed(false);
      }
      if (state.dateOffset !== undefined) {
        this.setDateOffset(state.dateOffset);
      }

      // 5. Editions & Dates
      if (state.day !== undefined && this.inpDay) {
        this.inpDay.value = state.day;
        [this.viewDay, this.viewDayCustomOverlay, this.viewDayCustomBar].forEach(v => { if (v) v.innerText = state.day; });
      }
      if (state.dateMasehi !== undefined && this.inpDateMasehi) {
        this.inpDateMasehi.value = state.dateMasehi;
        [this.viewDateMasehi, this.viewDateMasehiCustomOverlay, this.viewDateMasehiCustomBar].forEach(v => { if (v) v.innerText = state.dateMasehi; });
      }
      if (state.dateHijri !== undefined && this.inpDateHijri) {
        this.inpDateHijri.value = state.dateHijri;
        [this.viewDateHijri, this.viewDateHijriCustomOverlay, this.viewDateHijriCustomBar].forEach(v => { if (v) v.innerText = state.dateHijri; });
      }
      if (state.editionNum !== undefined && this.inpEditionNum) {
        this.inpEditionNum.value = state.editionNum;
        [this.viewEditionNum, this.viewEditionNumCustomOverlay, this.viewEditionNumCustomBar].forEach(v => { if (v) v.innerText = state.editionNum; });
      }
      if (state.pageNum !== undefined && this.inpPageNum) {
        this.inpPageNum.value = state.pageNum;
        if (this.viewFooterPage) this.viewFooterPage.innerText = state.pageNum;
      }

      // 6. Body Content
      if (state.bodyText !== undefined && this.inpBodyText && this.inpBodyText.value !== state.bodyText) {
        this.inpBodyText.value = state.bodyText;
        this.formatNewspaperContent();
      }
      if (state.bodyFontSize !== undefined) {
        this.setBodyFontSize(state.bodyFontSize, false);
      }
      if (state.bodyOffsetX !== undefined && state.bodyOffsetY !== undefined) {
        this.setBodyOffset(state.bodyOffsetX, state.bodyOffsetY, false);
      }
      if (state.activityPhotos !== undefined) {
        this.activityPhotos = JSON.parse(JSON.stringify(state.activityPhotos));
        this.saveActivityPhotos();
        this.renderActivityPhotos();
        this.renderActivityPhotosDockList();
      }

      // 7. Bottom Inserts
      if (state.showActivityImg !== undefined && this.chkShowActivityImg) {
        this.chkShowActivityImg.checked = state.showActivityImg;
      }
      if (state.calloutQuote !== undefined && this.inpCalloutQuote) {
        this.inpCalloutQuote.value = state.calloutQuote;
        if (this.viewCalloutQuote) this.viewCalloutQuote.innerText = state.calloutQuote;
      }
      if (state.eventLogo !== undefined && this.selEventLogo) {
        this.selEventLogo.value = state.eventLogo;
      }
      this.updateBottomInsertsVisibility();

      // Simpan pemulihan Undo/Redo ke localStorage
      this.saveArticleDraft();

      // Refresh HUD and Property Bar
      this.repositionCanvasHud();
      const curType = this.selectedCanvasElement ? (this.selectedCanvasElement.getAttribute('data-canvas-type') || this.inferElementType(this.selectedCanvasElement)) : 'page';
      this.updateCorelPropertyBar(curType, this.selectedCanvasElement);
    } finally {
      this.isApplyingHistory = false;
      this.updateUndoRedoButtons();
    }
  }

  updateUndoRedoButtons() {
    const canUndo = this.historyIndex > 0;
    const canRedo = this.historyIndex < this.historyList.length - 1;

    const setBtnState = (btn, enabled) => {
      if (!btn) return;
      btn.disabled = !enabled;
      if (enabled) {
        btn.classList.remove('opacity-30', 'pointer-events-none');
        btn.classList.add('opacity-100', 'cursor-pointer');
      } else {
        btn.classList.add('opacity-30', 'pointer-events-none');
        btn.classList.remove('opacity-100', 'cursor-pointer');
      }
    };

    setBtnState(document.getElementById('btn-undo'), canUndo);
    setBtnState(document.getElementById('btn-redo'), canRedo);
    setBtnState(document.getElementById('tool-undo'), canUndo);
    setBtnState(document.getElementById('tool-redo'), canRedo);
  }

  showUndoToast(message) {
    let toast = document.getElementById('studio-history-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'studio-history-toast';
      toast.className = 'fixed bottom-5 right-5 z-[9999] px-3.5 py-2 rounded-xl bg-slate-900/95 border border-slate-700/80 text-white text-xs font-medium shadow-2xl flex items-center gap-2 pointer-events-none transition-all duration-300 opacity-0 transform translate-y-2';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i data-lucide="history" class="w-4 h-4 text-emerald-400"></i><span>${message}</span>`;
    if (window.lucide) window.lucide.createIcons();

    toast.classList.remove('opacity-0', 'translate-y-2');
    toast.classList.add('opacity-100', 'translate-y-0');

    clearTimeout(this._historyToastTimer);
    this._historyToastTimer = setTimeout(() => {
      toast.classList.remove('opacity-100', 'translate-y-0');
      toast.classList.add('opacity-0', 'translate-y-2');
    }, 1500);
  }

  setTemplateStyle(templateType, save = true) {
    this.currentTemplate = templateType;
    if (save) {
      try {
        localStorage.setItem('alqalam_template_type', templateType);
      } catch(e) {}
    }
    try {
      localStorage.setItem('alqalam_template_type', templateType);
    } catch(e) {}

    document.querySelectorAll('.btn-template-select').forEach(btn => {
      const t = btn.getAttribute('data-template-type');
      if (t === templateType) {
        btn.className = 'btn-template-select p-2 rounded-xl border border-emerald-500 bg-emerald-500/10 text-emerald-300 text-xs font-bold flex items-center gap-2 text-left transition shadow-sm';
      } else {
        btn.className = 'btn-template-select p-2 rounded-xl border border-slate-700 bg-slate-800/60 text-slate-400 hover:text-white text-xs font-semibold flex items-center gap-2 text-left transition';
      }
    });

    if (templateType === 'news_report') {
      if (this.containerAuthorPhoto) this.containerAuthorPhoto.style.display = 'none';
      if (this.containerAuthorBadge) this.containerAuthorBadge.style.display = 'none';
      if (this.authorSlotSpacer) this.authorSlotSpacer.classList.add('hidden');
      if (this.chkShowActivityImg) {
        this.chkShowActivityImg.checked = true;
        this.chkShowActivityImg.dispatchEvent(new Event('change'));
      }
    } else {
      if (this.containerAuthorPhoto) this.containerAuthorPhoto.style.display = '';
      if (this.containerAuthorBadge && (this.chkShowAuthorBadge ? this.chkShowAuthorBadge.checked : true)) {
        this.containerAuthorBadge.style.display = '';
      }
      if (this.chkHeadlineSpacer?.checked && this.authorSlotSpacer) {
        this.authorSlotSpacer.classList.remove('hidden');
      }
    }

    this.updateCorelPropertyBar(this.selectedCanvasElement ? (this.selectedCanvasElement.getAttribute('data-canvas-type') || this.inferElementType(this.selectedCanvasElement)) : 'page');
    if (save) {
      this.pushState('Ganti Template');
    }
  }

  updateCorelPropertyBar(type = 'page', el = null) {
    const container = document.getElementById('corel-property-content');
    if (!container) return;

    if (!type) type = 'page';

    let html = '';

    if (type === 'page') {
      html = `
        <div class="flex items-center gap-2 flex-wrap">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700/80 font-semibold text-xs">
            <i data-lucide="file-text" class="w-3.5 h-3.5 text-emerald-400"></i>
            <span>A3 Koran (297 × 420 mm)</span>
          </span>
          <div class="h-4 w-px bg-slate-800 hidden sm:block"></div>
          <div class="flex items-center gap-1">
            <button type="button" id="prop-tmpl-opinion" class="px-2.5 py-1 rounded-lg text-xs font-semibold ${this.currentTemplate === 'teacher_opinion' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300 hover:text-white'} transition">
              Opini Guru
            </button>
            <button type="button" id="prop-tmpl-news" class="px-2.5 py-1 rounded-lg text-xs font-semibold ${this.currentTemplate === 'news_report' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300 hover:text-white'} transition">
              Liputan Berita
            </button>
          </div>
          <div class="h-4 w-px bg-slate-800 hidden lg:block"></div>
          <label class="hidden lg:flex items-center gap-1.5 text-[11px] text-slate-300 cursor-pointer select-none">
            <input type="checkbox" id="prop-chk-fullbleed" ${this.chkFullWidthHeader?.checked ? 'checked' : ''} class="w-3.5 h-3.5 rounded accent-emerald-500">
            <span>Full-Bleed Kop</span>
          </label>
          <div class="h-4 w-px bg-slate-800 hidden sm:block"></div>
          <button type="button" id="prop-btn-open-drawer" class="px-2.5 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 font-semibold flex items-center gap-1.5 text-xs transition active:scale-95">
            <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
            <span>Buka Panel Naskah</span>
          </button>
        </div>
      `;
    } else if (type === 'headline') {
      html = `
        <div class="flex items-center gap-2 flex-wrap">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-xs">
            <i data-lucide="heading-1" class="w-3.5 h-3.5"></i>
            <span>Judul Utama</span>
          </span>
          <div class="h-4 w-px bg-slate-800"></div>
          <div class="flex items-center gap-1 bg-slate-800/80 p-0.5 rounded-lg border border-slate-700/80">
            <button type="button" id="prop-btn-headline-size-down" class="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-700 text-slate-300 hover:text-white font-bold" title="Kecilkan Huruf">A-</button>
            <span id="prop-val-headline-size" class="w-12 text-center font-mono font-bold text-white text-xs">${this.headlineFontSize} px</span>
            <button type="button" id="prop-btn-headline-size-up" class="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-700 text-slate-300 hover:text-white font-bold" title="Besarkan Huruf">A+</button>
          </div>
          <div class="h-4 w-px bg-slate-800"></div>
          <div class="flex items-center gap-1.5">
            <span class="text-slate-400 text-[11px] hidden sm:inline">Geser:</span>
            <div class="flex items-center gap-1 bg-slate-800/80 p-0.5 rounded-lg border border-slate-700/80">
              <button type="button" id="prop-btn-headline-indent-down" class="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-700 text-slate-300 hover:text-white font-bold" title="Kurangi Geser">◀</button>
              <span id="prop-val-headline-indent" class="w-12 text-center font-mono font-bold text-emerald-400 text-xs">${this.headlineIndent} px</span>
              <button type="button" id="prop-btn-headline-indent-up" class="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-700 text-slate-300 hover:text-white font-bold" title="Tambah Geser">▶</button>
            </div>
            <button type="button" id="prop-btn-headline-indent-reset" class="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] rounded border border-slate-700 transition" title="Reset Geser Kanan">Reset</button>
          </div>
          <div class="h-4 w-px bg-slate-800"></div>
          <button type="button" id="prop-btn-headline-reset-offset" class="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs rounded-lg border border-slate-700 transition flex items-center gap-1" title="Kembalikan Judul ke Posisi Standar">
            <i data-lucide="rotate-ccw" class="w-3.5 h-3.5 text-emerald-400"></i>
            <span>Reset Posisi</span>
          </button>
          <span class="text-slate-400 text-[11px] hidden xl:inline ml-auto">💡 Geser bebas di kertas atau klik ganda untuk ketik teks</span>
        </div>
      `;
    } else if (type === 'subheadline') {
      html = `
        <div class="flex items-center gap-2 flex-wrap">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-xs">
            <i data-lucide="heading-2" class="w-3.5 h-3.5"></i>
            <span>Subjudul</span>
          </span>
          <div class="h-4 w-px bg-slate-800"></div>
          <div class="flex items-center gap-1 bg-slate-800/80 p-0.5 rounded-lg border border-slate-700/80">
            <button type="button" id="prop-btn-subheadline-size-down" class="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-700 text-slate-300 hover:text-white font-bold" title="Kecilkan Huruf">A-</button>
            <span id="prop-val-subheadline-size" class="w-12 text-center font-mono font-bold text-white text-xs">${this.subheadlineFontSize} px</span>
            <button type="button" id="prop-btn-subheadline-size-up" class="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-700 text-slate-300 hover:text-white font-bold" title="Besarkan Huruf">A+</button>
          </div>
          <div class="h-4 w-px bg-slate-800"></div>
          <button type="button" id="prop-btn-subheadline-reset-offset" class="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs rounded-lg border border-slate-700 transition flex items-center gap-1" title="Kembalikan Subjudul ke Posisi Standar">
            <i data-lucide="rotate-ccw" class="w-3.5 h-3.5 text-emerald-400"></i>
            <span>Reset Posisi</span>
          </button>
          <span class="text-slate-400 text-[11px] hidden xl:inline ml-auto">💡 Geser bebas di kertas atau klik ganda untuk ketik teks</span>
        </div>
      `;
    } else if (type === 'byline') {
      html = `
        <div class="flex items-center gap-2 flex-wrap">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-xs">
            <i data-lucide="user" class="w-3.5 h-3.5"></i>
            <span>Byline Penulis</span>
          </span>
          <div class="h-4 w-px bg-slate-800"></div>
          <button type="button" id="prop-btn-byline-reset-offset" class="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs rounded-lg border border-slate-700 transition flex items-center gap-1">
            <i data-lucide="rotate-ccw" class="w-3.5 h-3.5 text-emerald-400"></i>
            <span>Reset Posisi</span>
          </button>
          <button type="button" id="prop-btn-byline-edit-name" class="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-300 text-xs rounded-lg border border-slate-700 transition flex items-center gap-1 font-semibold">
            <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
            <span>Ganti Nama Penulis</span>
          </button>
          <span class="text-slate-400 text-[11px] hidden xl:inline ml-auto">💡 Geser bebas di lembaran kertas</span>
        </div>
      `;
    } else if (type === 'author-photo') {
      html = `
        <div class="flex items-center gap-2 flex-wrap">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-xs">
            <i data-lucide="user-check" class="w-3.5 h-3.5"></i>
            <span>Foto Penulis</span>
          </span>
          <div class="h-4 w-px bg-slate-800"></div>
          <div class="flex items-center gap-1 bg-slate-800/80 p-0.5 rounded-lg border border-slate-700/80">
            <button type="button" id="prop-btn-author-width-down" class="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-700 text-slate-300 hover:text-white font-bold" title="Kecilkan Foto">➖</button>
            <span id="prop-val-author-width" class="w-14 text-center font-mono font-bold text-emerald-400 text-xs">${this.authorPhotoWidth || 170} px</span>
            <button type="button" id="prop-btn-author-width-up" class="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-700 text-slate-300 hover:text-white font-bold" title="Besarkan Foto">➕</button>
          </div>
          <div class="flex items-center gap-1 bg-slate-800/80 p-0.5 rounded-lg border border-slate-700/80">
            <button type="button" id="prop-btn-frame-none" class="px-2 py-0.5 rounded text-[11px] font-semibold ${this.authorFrameMode === 'none' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'} transition">
              ✨ Transparan
            </button>
            <button type="button" id="prop-btn-frame-box" class="px-2 py-0.5 rounded text-[11px] font-semibold ${this.authorFrameMode === 'box' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'} transition">
              🖼️ Kotak
            </button>
          </div>
          <div class="h-4 w-px bg-slate-800"></div>
          <button type="button" id="prop-btn-author-upload" class="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700 transition flex items-center gap-1 font-semibold">
            <i data-lucide="upload" class="w-3.5 h-3.5 text-emerald-400"></i>
            <span>Upload</span>
          </button>
          <button type="button" id="prop-btn-author-paste" class="px-2.5 py-1 bg-indigo-950/70 hover:bg-indigo-900 text-indigo-300 text-xs rounded-lg border border-indigo-700 transition flex items-center gap-1 font-semibold" title="Tempel dari Canva">
            <i data-lucide="clipboard-paste" class="w-3.5 h-3.5 text-indigo-400"></i>
            <span>📋 Canva</span>
          </button>
          <button type="button" id="prop-btn-author-trans" class="px-2.5 py-1 bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 text-xs rounded-lg border border-emerald-700 transition flex items-center gap-1 font-semibold" title="Hapus Background Putih">
            <i data-lucide="wand-2" class="w-3.5 h-3.5 text-emerald-400"></i>
            <span>🪄 Transparan</span>
          </button>
          <button type="button" id="prop-btn-author-trim" class="px-2.5 py-1 bg-blue-950/70 hover:bg-blue-900 text-blue-300 text-xs rounded-lg border border-blue-700 transition flex items-center gap-1 font-semibold" title="Rapatkan Tepi Foto">
            <i data-lucide="scissors" class="w-3.5 h-3.5 text-blue-400"></i>
            <span>✂️ Rapatkan</span>
          </button>
          <button type="button" id="prop-btn-author-reset-pos" class="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs rounded-lg border border-slate-700 transition flex items-center gap-1" title="Kembalikan Foto ke Posisi Mepet Kiri Semula">
            <i data-lucide="rotate-ccw" class="w-3.5 h-3.5 text-emerald-400"></i>
            <span>Reset Posisi</span>
          </button>
          <button type="button" id="prop-btn-author-clear" class="p-1 text-rose-400 hover:text-rose-300 hover:bg-rose-950/60 rounded border border-rose-800 transition" title="Hapus Foto Penulis">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      `;
    } else if (type === 'author-badge') {
      html = `
        <div class="flex items-center gap-2 flex-wrap">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-xs">
            <i data-lucide="tag" class="w-3.5 h-3.5"></i>
            <span>Kotak Nama Penulis</span>
          </span>
          <div class="h-4 w-px bg-slate-800"></div>
          <label class="flex items-center gap-1.5 text-slate-300 cursor-pointer text-xs select-none">
            <input type="checkbox" id="prop-chk-author-badge" ${this.chkShowAuthorBadge?.checked ? 'checked' : ''} class="w-3.5 h-3.5 rounded accent-emerald-500">
            <span>Tampilkan Badge</span>
          </label>
          <div class="h-4 w-px bg-slate-800"></div>
          <div class="flex items-center gap-1 bg-slate-800/80 p-0.5 rounded-lg border border-slate-700/80">
            <button type="button" id="prop-btn-badge-size-down" class="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-700 text-slate-300 hover:text-white font-bold" title="Kecilkan Huruf">A-</button>
            <span id="prop-val-badge-size" class="w-12 text-center font-mono font-bold text-white text-xs">${this.authorBadgeFontSize || 11} px</span>
            <button type="button" id="prop-btn-badge-size-up" class="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-700 text-slate-300 hover:text-white font-bold" title="Besarkan Huruf">A+</button>
          </div>
          <div class="h-4 w-px bg-slate-800"></div>
          <button type="button" id="prop-btn-badge-reset-pos" class="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs rounded-lg border border-slate-700 transition flex items-center gap-1" title="Kembalikan Posisi Badge Nama">
            <i data-lucide="rotate-ccw" class="w-3.5 h-3.5 text-emerald-400"></i>
            <span>Reset Posisi</span>
          </button>
          <span class="text-slate-400 text-[11px] hidden xl:inline ml-auto">💡 Geser bebas di kertas atau klik ganda untuk ganti nama</span>
        </div>
      `;
    } else if (type === 'header') {
      html = `
        <div class="flex items-center gap-2 flex-wrap">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-xs">
            <i data-lucide="layout-template" class="w-3.5 h-3.5"></i>
            <span>Kop Koran Master</span>
          </span>
          <div class="h-4 w-px bg-slate-800"></div>
          <div class="flex items-center gap-1 bg-slate-800/80 p-0.5 rounded-lg border border-slate-700/80">
            <button type="button" id="prop-btn-kop-size-down" class="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-700 text-slate-300 hover:text-white font-bold" title="Kecilkan Kop">➖</button>
            <span id="prop-val-kop-size" class="w-20 text-center font-mono font-bold text-emerald-400 text-xs">${this.kopSizes[this.kopSizeIndex]?.label || 'Lebar'}</span>
            <button type="button" id="prop-btn-kop-size-up" class="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-700 text-slate-300 hover:text-white font-bold" title="Perlebar Kop">➕</button>
          </div>
          <label class="flex items-center gap-1.5 text-slate-300 cursor-pointer text-xs select-none">
            <input type="checkbox" id="prop-chk-kop-fullbleed" ${this.chkFullWidthHeader?.checked ? 'checked' : ''} class="w-3.5 h-3.5 rounded accent-emerald-500">
            <span>Full-Bleed 100%</span>
          </label>
          <div class="h-4 w-px bg-slate-800"></div>
          <button type="button" id="prop-btn-kop-reset-offset" class="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-semibold flex items-center gap-1 border border-slate-700" title="Kembalikan posisi Kop ke posisi normal (0, 0)">
            <i data-lucide="rotate-ccw" class="w-3.5 h-3.5 text-amber-400"></i>
            <span>Reset Posisi</span>
          </button>
          <div class="h-4 w-px bg-slate-800"></div>
          <div class="flex items-center gap-1 bg-slate-800/80 p-0.5 rounded-lg border border-slate-700/80">
            <button type="button" id="prop-btn-kop-pos-overlay" class="px-2 py-0.5 rounded text-[11px] font-semibold ${this.headerDatePosition === 'overlay' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'} transition" title="Pojok Kanan Atas">Pojok Atas</button>
            <button type="button" id="prop-btn-kop-pos-below" class="px-2 py-0.5 rounded text-[11px] font-semibold ${this.headerDatePosition === 'below' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'} transition" title="Di Bawah Kop">Di Bawah</button>
            <button type="button" id="prop-btn-kop-pos-hide" class="px-2 py-0.5 rounded text-[11px] font-semibold ${this.headerDatePosition === 'hide' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'} transition" title="Sembunyikan">Sembunyi</button>
          </div>
          <div class="h-4 w-px bg-slate-800"></div>
          <button type="button" id="prop-btn-kop-upload" class="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700 transition flex items-center gap-1 font-semibold">
            <i data-lucide="upload" class="w-3.5 h-3.5 text-emerald-400"></i>
            <span>Upload File</span>
          </button>
          <button type="button" id="prop-btn-kop-paste" class="px-2.5 py-1 bg-indigo-950/70 hover:bg-indigo-900 text-indigo-300 text-xs rounded-lg border border-indigo-700 transition flex items-center gap-1 font-semibold" title="Tempel dari Canva">
            <i data-lucide="clipboard-paste" class="w-3.5 h-3.5 text-indigo-400"></i>
            <span>📋 Canva</span>
          </button>
          <button type="button" id="prop-btn-kop-reset" class="p-1 text-rose-400 hover:text-rose-300 hover:bg-rose-950/60 rounded border border-rose-800 transition" title="Hapus Kop Master">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      `;
    } else if (type === 'newspaper-content') {
      const words = this.inpBodyText ? this.inpBodyText.value.trim().split(/\s+/).filter(Boolean).length : 0;
      html = `
        <div class="flex items-center gap-2 flex-wrap">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-xs">
            <i data-lucide="columns-3" class="w-3.5 h-3.5"></i>
            <span>Naskah 3 Kolom</span>
          </span>
          <div class="h-4 w-px bg-slate-800"></div>
          <div class="flex items-center gap-1 bg-slate-800/80 p-0.5 rounded-lg border border-slate-700/80">
            <button type="button" id="prop-btn-body-size-down" class="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-700 text-slate-300 hover:text-white font-bold" title="Kecilkan Huruf Naskah">A-</button>
            <span id="prop-val-body-size" class="w-14 text-center font-mono font-bold text-white text-xs">${this.bodyFontSize} pt</span>
            <button type="button" id="prop-btn-body-size-up" class="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-700 text-slate-300 hover:text-white font-bold" title="Besarkan Huruf Naskah">A+</button>
          </div>
          <span id="prop-val-word-count" class="px-2 py-0.5 bg-slate-800 text-emerald-400 rounded font-mono text-[11px] border border-slate-700">
            ${words} kata
          </span>
          <div class="h-4 w-px bg-slate-800"></div>
          <button type="button" id="prop-btn-body-reset-offset" class="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-semibold flex items-center gap-1 border border-slate-700" title="Kembalikan posisi naskah ke posisi normal (0, 0)">
            <i data-lucide="rotate-ccw" class="w-3.5 h-3.5 text-amber-400"></i>
            <span>Reset Posisi</span>
          </button>
          <div class="h-4 w-px bg-slate-800"></div>
          <button type="button" id="prop-btn-open-body-editor" class="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold flex items-center gap-1.5 shadow transition active:scale-95 text-xs">
            <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
            <span>Buka Editor Teks Naskah</span>
          </button>
        </div>
      `;
    } else if (type === 'activity-photo') {
      const photoId = this.selectedPhotoId;
      const photoIndex = this.activityPhotos.findIndex(p => p.id === photoId);
      const photo = photoIndex !== -1 ? this.activityPhotos[photoIndex] : (this.activityPhotos[0] || null);
      const photoNum = photoIndex !== -1 ? (photoIndex + 1) : 1;
      const width = photo ? (photo.width || 290) : 290;

      html = `
        <div class="flex items-center gap-2 flex-wrap">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-xs">
            <i data-lucide="image" class="w-3.5 h-3.5"></i>
            <span>Foto Kegiatan #${photoNum}</span>
          </span>
          <div class="h-4 w-px bg-slate-800"></div>
          <div class="flex items-center gap-1 bg-slate-800/80 p-0.5 rounded-lg border border-slate-700/80">
            <button type="button" id="prop-btn-photo-width-down" class="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-700 text-slate-300 hover:text-white font-bold" title="Kecilkan Ukuran Foto">➖</button>
            <span id="prop-val-photo-width" class="w-16 text-center font-mono font-bold text-emerald-400 text-xs">${width} px</span>
            <button type="button" id="prop-btn-photo-width-up" class="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-700 text-slate-300 hover:text-white font-bold" title="Perbesar Ukuran Foto">➕</button>
          </div>
          <div class="h-4 w-px bg-slate-800"></div>
          <button type="button" id="prop-btn-photo-center" class="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700 transition flex items-center gap-1 font-semibold" title="Posisikan tepat di tengah naskah koran">
            <i data-lucide="crosshair" class="w-3.5 h-3.5 text-emerald-400"></i>
            <span>Tengah Naskah</span>
          </button>
          <button type="button" id="prop-btn-photo-upload" class="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700 transition flex items-center gap-1 font-semibold" title="Ganti File Foto Kegiatan">
            <i data-lucide="upload" class="w-3.5 h-3.5 text-emerald-400"></i>
            <span>Ganti Foto</span>
          </button>
          <button type="button" id="prop-btn-photo-add" class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow transition active:scale-95" title="Tambah Foto Kegiatan Lainnya">
            <i data-lucide="plus" class="w-3.5 h-3.5"></i>
            <span>+ Tambah Foto</span>
          </button>
          <button type="button" id="prop-btn-photo-delete" class="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/60 rounded-lg border border-rose-800 transition" title="Hapus Foto Kegiatan ini">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      `;
    } else if (type === 'bottom-inserts') {
      html = `
        <div class="flex items-center gap-2 flex-wrap">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-xs">
            <i data-lucide="award" class="w-3.5 h-3.5"></i>
            <span>Kutipan & Logo Acara</span>
          </span>
          <div class="h-4 w-px bg-slate-800"></div>
          <button type="button" id="prop-btn-open-sisipan" class="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-300 text-xs rounded-lg border border-slate-700 transition flex items-center gap-1 font-semibold">
            <i data-lucide="sliders" class="w-3.5 h-3.5"></i>
            <span>Panel Sisipan Lengkap</span>
          </button>
        </div>
      `;
    }

    container.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();
    this.wirePropertyBarEvents(type);
  }

  wirePropertyBarEvents(type) {
    if (type === 'page') {
      document.getElementById('prop-tmpl-opinion')?.addEventListener('click', () => {
        this.setTemplateStyle('teacher_opinion');
      });
      document.getElementById('prop-tmpl-news')?.addEventListener('click', () => {
        this.setTemplateStyle('news_report');
      });
      document.getElementById('prop-chk-fullbleed')?.addEventListener('change', (e) => {
        if (this.chkFullWidthHeader) {
          this.chkFullWidthHeader.checked = e.target.checked;
          this.updateHeaderFullBleed();
        }
      });
      document.getElementById('prop-btn-open-drawer')?.addEventListener('click', () => {
        this.toggleDock(true);
        this.switchDockTab('tab-pane-naskah');
      });
    } else if (type === 'headline') {
      document.getElementById('prop-btn-headline-size-down')?.addEventListener('click', () => {
        this.setHeadlineFontSize(this.headlineFontSize - 2);
      });
      document.getElementById('prop-btn-headline-size-up')?.addEventListener('click', () => {
        this.setHeadlineFontSize(this.headlineFontSize + 2);
      });
      document.getElementById('prop-btn-headline-indent-down')?.addEventListener('click', () => {
        this.updateHeadlineIndent(Math.max(0, this.headlineIndent - 10), true);
      });
      document.getElementById('prop-btn-headline-indent-up')?.addEventListener('click', () => {
        this.updateHeadlineIndent(Math.min(360, this.headlineIndent + 10), true);
      });
      document.getElementById('prop-btn-headline-indent-reset')?.addEventListener('click', () => {
        this.updateHeadlineIndent(0, true);
      });
      document.getElementById('prop-btn-headline-reset-offset')?.addEventListener('click', () => {
        this.setHeadlineOffset(0, 0, true);
      });
    } else if (type === 'subheadline') {
      document.getElementById('prop-btn-subheadline-size-down')?.addEventListener('click', () => {
        this.setSubheadlineFontSize(this.subheadlineFontSize - 2);
      });
      document.getElementById('prop-btn-subheadline-size-up')?.addEventListener('click', () => {
        this.setSubheadlineFontSize(this.subheadlineFontSize + 2);
      });
      document.getElementById('prop-btn-subheadline-reset-offset')?.addEventListener('click', () => {
        this.setSubheadlineOffset(0, 0, true);
      });
    } else if (type === 'byline') {
      document.getElementById('prop-btn-byline-reset-offset')?.addEventListener('click', () => {
        this.setBylineOffset(0, 0, true);
      });
      document.getElementById('prop-btn-byline-edit-name')?.addEventListener('click', () => {
        this.toggleDock(true);
        this.switchDockTab('tab-pane-detail');
        this.inpAuthorName?.focus();
      });
    } else if (type === 'author-photo') {
      document.getElementById('prop-btn-author-width-down')?.addEventListener('click', () => {
        this.setAuthorPhotoWidth(this.authorPhotoWidth - 10, true);
      });
      document.getElementById('prop-btn-author-width-up')?.addEventListener('click', () => {
        this.setAuthorPhotoWidth(this.authorPhotoWidth + 10, true);
      });
      document.getElementById('prop-btn-frame-none')?.addEventListener('click', () => {
        this.setAuthorFrameMode('none');
        this.updateCorelPropertyBar('author-photo');
      });
      document.getElementById('prop-btn-frame-box')?.addEventListener('click', () => {
        this.setAuthorFrameMode('box');
        this.updateCorelPropertyBar('author-photo');
      });
      document.getElementById('prop-btn-author-upload')?.addEventListener('click', () => {
        this.inpAuthorPhoto?.click();
      });
      document.getElementById('prop-btn-author-paste')?.addEventListener('click', () => {
        this.btnPasteAuthorDirect?.click();
      });
      document.getElementById('prop-btn-author-trans')?.addEventListener('click', () => {
        this.makeAuthorPhotoTransparent();
      });
      document.getElementById('prop-btn-author-trim')?.addEventListener('click', () => {
        this.trimAuthorPhoto(true);
      });
      document.getElementById('prop-btn-author-reset-pos')?.addEventListener('click', () => {
        this.resetAuthorPhotoPosition();
      });
      document.getElementById('prop-btn-author-clear')?.addEventListener('click', () => {
        this.setAuthorPhoto(null);
      });
    } else if (type === 'author-badge') {
      document.getElementById('prop-chk-author-badge')?.addEventListener('change', (e) => {
        if (this.chkShowAuthorBadge) {
          this.chkShowAuthorBadge.checked = e.target.checked;
          this.toggleAuthorBadge(e.target.checked);
        }
      });
      document.getElementById('prop-btn-badge-size-down')?.addEventListener('click', () => {
        this.setAuthorBadgeFontSize(this.authorBadgeFontSize - 1);
      });
      document.getElementById('prop-btn-badge-size-up')?.addEventListener('click', () => {
        this.setAuthorBadgeFontSize(this.authorBadgeFontSize + 1);
      });
      document.getElementById('prop-btn-badge-reset-pos')?.addEventListener('click', () => {
        this.resetAuthorBadgePosition();
      });
    } else if (type === 'header') {
      document.getElementById('prop-btn-kop-size-down')?.addEventListener('click', () => {
        this.changeKopSize(-1);
      });
      document.getElementById('prop-btn-kop-size-up')?.addEventListener('click', () => {
        this.changeKopSize(1);
      });
      document.getElementById('prop-chk-kop-fullbleed')?.addEventListener('change', (e) => {
        if (this.chkFullWidthHeader) {
          this.chkFullWidthHeader.checked = e.target.checked;
          this.updateHeaderFullBleed();
        }
      });
      document.getElementById('prop-btn-kop-pos-overlay')?.addEventListener('click', () => {
        this.setHeaderDatePosition('overlay');
        this.updateCorelPropertyBar('header');
      });
      document.getElementById('prop-btn-kop-pos-below')?.addEventListener('click', () => {
        this.setHeaderDatePosition('below');
        this.updateCorelPropertyBar('header');
      });
      document.getElementById('prop-btn-kop-pos-hide')?.addEventListener('click', () => {
        this.setHeaderDatePosition('hide');
        this.updateCorelPropertyBar('header');
      });
      document.getElementById('prop-btn-kop-reset-offset')?.addEventListener('click', () => {
        this.setHeaderOffset(0, 0, true);
      });
      document.getElementById('prop-btn-kop-upload')?.addEventListener('click', () => {
        this.inpCustomHeader?.click();
      });
      document.getElementById('prop-btn-kop-paste')?.addEventListener('click', () => {
        this.btnPasteHeaderDirect?.click();
      });
      document.getElementById('prop-btn-kop-reset')?.addEventListener('click', () => {
        this.resetMasterHeader();
      });
    } else if (type === 'newspaper-content') {
      document.getElementById('prop-btn-body-size-down')?.addEventListener('click', () => {
        this.setBodyFontSize(this.bodyFontSize - 0.5);
      });
      document.getElementById('prop-btn-body-size-up')?.addEventListener('click', () => {
        this.setBodyFontSize(this.bodyFontSize + 0.5);
      });
      document.getElementById('prop-btn-body-reset-offset')?.addEventListener('click', () => {
        this.setBodyOffset(0, 0, true);
      });
      document.getElementById('prop-btn-open-body-editor')?.addEventListener('click', () => {
        this.toggleDock(true);
        this.switchDockTab('tab-pane-naskah');
        this.inpBodyText?.focus();
      });
    } else if (type === 'activity-photo') {
      const photoId = this.selectedPhotoId;
      document.getElementById('prop-btn-photo-width-down')?.addEventListener('click', () => {
        if (!photoId) return;
        const photo = this.activityPhotos.find(p => p.id === photoId);
        if (photo) this.setActivityPhotoWidth(photoId, Math.max(100, (photo.width || 290) - 15), true);
      });
      document.getElementById('prop-btn-photo-width-up')?.addEventListener('click', () => {
        if (!photoId) return;
        const photo = this.activityPhotos.find(p => p.id === photoId);
        if (photo) this.setActivityPhotoWidth(photoId, Math.min(800, (photo.width || 290) + 15), true);
      });
      document.getElementById('prop-btn-photo-center')?.addEventListener('click', () => {
        if (!photoId) return;
        this.setActivityPhotoPosition(photoId, 275, 560, true);
      });
      document.getElementById('prop-btn-photo-upload')?.addEventListener('click', () => {
        if (!photoId) return;
        document.getElementById('inp-dock-upload-' + photoId)?.click();
      });
      document.getElementById('prop-btn-photo-add')?.addEventListener('click', () => {
        this.addNewActivityPhoto();
      });
      document.getElementById('prop-btn-photo-delete')?.addEventListener('click', () => {
        if (!photoId) return;
        this.deleteActivityPhoto(photoId);
      });
    } else if (type === 'bottom-inserts') {
      document.getElementById('prop-btn-open-sisipan')?.addEventListener('click', () => {
        this.toggleDock(true);
        this.switchDockTab('tab-pane-sisipan');
      });
    }
  }

  startInlineEditing(el) {
    if (!el) return;
    el.setAttribute('contenteditable', 'true');
    el.classList.add('canvas-inline-editing');
    el.focus();

    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);

    const onInput = () => {
      const text = el.innerText.trim();
      const type = el.getAttribute('data-canvas-type') || (el.id === 'view-byline' ? 'byline' : '');
      if (type === 'headline' && this.inpHeadline) {
        this.inpHeadline.value = text;
      } else if (type === 'subheadline' && this.inpSubheadline) {
        this.inpSubheadline.value = text;
      } else if (type === 'author-badge') {
        if (this.inpAuthorName) this.inpAuthorName.value = text;
        if (this.viewByline) this.viewByline.innerText = text;
      } else if (type === 'byline') {
        if (this.inpAuthorName) this.inpAuthorName.value = text;
        if (this.viewAuthorBadge) this.viewAuthorBadge.innerText = text;
      }
    };

    const onBlur = () => {
      el.removeAttribute('contenteditable');
      el.classList.remove('canvas-inline-editing');
      el.removeEventListener('input', onInput);
      el.removeEventListener('blur', onBlur);
      el.removeEventListener('keydown', onKeyDown);
      this.repositionCanvasHud();
      this.saveArticleDraft();
      this.pushState('Edit Teks');
    };

    const onKeyDown = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        el.blur();
      }
      if (e.key === 'Escape') {
        el.blur();
      }
    };

    el.addEventListener('input', onInput);
    el.addEventListener('blur', onBlur);
    el.addEventListener('keydown', onKeyDown);
  }

  setHeadlineFontSize(size, save = true) {
    const val = Math.max(16, Math.min(60, Math.round(size)));
    this.headlineFontSize = val;
    if (this.viewHeadline) {
      this.viewHeadline.style.fontSize = `${val}px`;
      this.viewHeadline.style.lineHeight = `${Math.round(val * 1.15)}px`;
    }
    const propVal = document.getElementById('prop-val-headline-size');
    if (propVal) propVal.innerText = `${val} px`;
    if (save) {
      try { localStorage.setItem('alqalam_headline_size', val.toString()); } catch(e){}
      this.pushState('Ukuran Judul');
    }
  }

  setSubheadlineFontSize(size, save = true) {
    const val = Math.max(12, Math.min(36, Math.round(size)));
    this.subheadlineFontSize = val;
    if (this.viewSubheadline) {
      this.viewSubheadline.style.fontSize = `${val}px`;
      this.viewSubheadline.style.lineHeight = `${Math.round(val * 1.25)}px`;
    }
    const propVal = document.getElementById('prop-val-subheadline-size');
    if (propVal) propVal.innerText = `${val} px`;
    if (save) {
      try { localStorage.setItem('alqalam_subheadline_size', val.toString()); } catch(e){}
      this.pushState('Ukuran Subjudul');
    }
  }

  setBodyFontSize(size, save = true) {
    const val = Math.max(9, Math.min(18, parseFloat(size.toFixed(1))));
    this.bodyFontSize = val;
    if (this.viewNewspaperContent) {
      this.viewNewspaperContent.style.fontSize = `${val}px`;
      this.viewNewspaperContent.style.lineHeight = `${(val * 1.5).toFixed(1)}px`;
    }
    const propVal = document.getElementById('prop-val-body-size');
    if (propVal) propVal.innerText = `${val} pt`;
    if (save) {
      try { localStorage.setItem('alqalam_body_font_size', val.toString()); } catch(e){}
      this.pushState('Ukuran Font Naskah');
    }
  }

  setAuthorBadgeFontSize(size, save = true) {
    const val = Math.max(9, Math.min(20, Math.round(size)));
    this.authorBadgeFontSize = val;
    if (this.viewAuthorBadge) {
      this.viewAuthorBadge.style.fontSize = `${val}px`;
      this.viewAuthorBadge.style.padding = `${Math.round(val * 0.35)}px ${Math.round(val * 0.9)}px`;
    }
    const propVal = document.getElementById('prop-val-badge-size');
    if (propVal) propVal.innerText = `${val} px`;
    if (save) {
      try { localStorage.setItem('alqalam_author_badge_size', val.toString()); } catch(e){}
      this.pushState('Ukuran Badge Penulis');
    }
  }

  setCustomHeaderScale(scale, save = true) {
    const val = Math.max(0.6, Math.min(1.5, parseFloat(scale.toFixed(2))));
    this.customHeaderScale = val;
    if (this.viewCustomHeaderImg) {
      this.viewCustomHeaderImg.style.transform = `scale(${val})`;
      this.viewCustomHeaderImg.style.transformOrigin = 'center top';
    }
    const hudVal = document.getElementById('hud-val-header-scale');
    if (hudVal) hudVal.innerText = `${Math.round(val * 100)}%`;
    if (save) {
      try { localStorage.setItem('alqalam_custom_header_scale', val.toString()); } catch(e){}
    }
  }

  setHeadlineOffset(x, y, save = true) {
    this.headlineOffsetX = Math.round(x) || 0;
    this.headlineOffsetY = Math.round(y) || 0;
    if (this.viewHeadline) {
      const transform = (this.headlineOffsetX !== 0 || this.headlineOffsetY !== 0)
        ? `translate(${this.headlineOffsetX}px, ${this.headlineOffsetY}px)`
        : '';
      this.viewHeadline.style.transform = transform;
    }
    if (save) {
      try {
        localStorage.setItem('alqalam_headline_offset', JSON.stringify({
          x: this.headlineOffsetX,
          y: this.headlineOffsetY
        }));
      } catch(e) {}
      this.pushState('Offset Judul');
    }
  }

  setSubheadlineOffset(x, y, save = true) {
    this.subheadlineOffsetX = Math.round(x) || 0;
    this.subheadlineOffsetY = Math.round(y) || 0;
    if (this.viewSubheadline) {
      const transform = (this.subheadlineOffsetX !== 0 || this.subheadlineOffsetY !== 0)
        ? `translate(${this.subheadlineOffsetX}px, ${this.subheadlineOffsetY}px)`
        : '';
      this.viewSubheadline.style.transform = transform;
    }
    if (save) {
      try {
        localStorage.setItem('alqalam_subheadline_offset', JSON.stringify({
          x: this.subheadlineOffsetX,
          y: this.subheadlineOffsetY
        }));
      } catch(e) {}
      this.pushState('Offset Subjudul');
    }
  }

  setBylineOffset(x, y, save = true) {
    this.bylineOffsetX = Math.round(x) || 0;
    this.bylineOffsetY = Math.round(y) || 0;
    if (this.viewBylineContainer) {
      const transform = (this.bylineOffsetX !== 0 || this.bylineOffsetY !== 0)
        ? `translate(${this.bylineOffsetX}px, ${this.bylineOffsetY}px)`
        : '';
      this.viewBylineContainer.style.transform = transform;
    }
    if (save) {
      try {
        localStorage.setItem('alqalam_byline_offset', JSON.stringify({
          x: this.bylineOffsetX,
          y: this.bylineOffsetY
        }));
      } catch(e) {}
      this.pushState('Offset Byline');
    }
  }

  setHeaderOffset(x, y, save = true) {
    this.headerOffsetX = Math.round(x) || 0;
    this.headerOffsetY = Math.round(y) || 0;
    const headerEl = this.containerSheetHeader || this.viewCustomHeaderWrapper;
    if (headerEl) {
      const transform = (this.headerOffsetX !== 0 || this.headerOffsetY !== 0)
        ? `translate(${this.headerOffsetX}px, ${this.headerOffsetY}px)`
        : '';
      headerEl.style.transform = transform;
    }
    if (save) {
      try {
        localStorage.setItem('alqalam_header_offset', JSON.stringify({
          x: this.headerOffsetX,
          y: this.headerOffsetY
        }));
      } catch(e) {}
      this.pushState('Geser Posisi Kop');
    }
  }

  setBodyOffset(x, y, save = true) {
    this.bodyOffsetX = Math.round(x) || 0;
    this.bodyOffsetY = Math.round(y) || 0;
    if (this.viewNewspaperContent) {
      const transform = (this.bodyOffsetX !== 0 || this.bodyOffsetY !== 0)
        ? `translate(${this.bodyOffsetX}px, ${this.bodyOffsetY}px)`
        : '';
      this.viewNewspaperContent.style.transform = transform;
    }
    if (save) {
      try {
        localStorage.setItem('alqalam_body_offset', JSON.stringify({
          x: this.bodyOffsetX,
          y: this.bodyOffsetY
        }));
      } catch(e) {}
      this.pushState('Geser Posisi Naskah');
    }
  }

  makeElementDraggable(elem, storageKey, defaultLeft, defaultTop) {
    if (!elem || !this.a3Sheet) return;
    const sheet = this.a3Sheet;

    elem.setAttribute('draggable', 'false');
    elem.querySelectorAll('img').forEach(img => {
      img.setAttribute('draggable', 'false');
      img.addEventListener('dragstart', (e) => e.preventDefault());
    });
    elem.addEventListener('dragstart', (e) => e.preventDefault());

    let isDown = false;
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
      if (e.target.closest('#handle-resize-author') || e.target.closest('.export-ignore')) return;

      isDown = true;
      isDragging = false;
      const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
      const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;

      startX = clientX;
      startY = clientY;

      const pLeft = parseFloat(elem.style.left);
      initialLeft = (!isNaN(pLeft)) ? pLeft : defaultLeft;
      const pTop = parseFloat(elem.style.top);
      initialTop = (!isNaN(pTop)) ? pTop : defaultTop;

      this.selectCanvasElement(elem);

      if (e.cancelable) e.preventDefault();
    };

    const onMove = (e) => {
      if (!isDown) return;

      const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
      const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;

      // Skala pergerakan dibagi zoomScale agar kursor mouse menempel presisi 1:1
      const zoom = this.zoomScale || 1;
      const dx = (clientX - startX) / zoom;
      const dy = (clientY - startY) / zoom;

      if (!isDragging && Math.hypot(dx, dy) > 3) {
        isDragging = true;
        elem.classList.add('ring-2', 'ring-emerald-400', 'shadow-2xl', 'opacity-95', 'z-40');
        elem.style.cursor = 'grabbing';
      }

      if (isDragging) {
        if (e.cancelable) e.preventDefault();

        let newLeft = initialLeft + dx;
        let newTop = initialTop + dy;

        // Batasi di dalam lembaran kertas A3
        const sheetW = sheet.offsetWidth || 840;
        const sheetH = sheet.offsetHeight || 1188;
        const elemW = elem.offsetWidth || 150;
        const elemH = elem.offsetHeight || 150;

        const isPhoto = (elem.id === 'container-author-photo');
        const minLeft = isPhoto ? -(elemW - 40) : 0;
        const maxLeft = isPhoto ? (sheetW - 40) : (sheetW - elemW);
        const minTop  = isPhoto ? -(elemH - 60) : 0;
        const maxTop  = isPhoto ? (sheetH - 60) : (sheetH - elemH);

        newLeft = Math.max(minLeft, Math.min(maxLeft, newLeft));
        newTop = Math.max(minTop, Math.min(maxTop, newTop));

        elem.style.left = `${newLeft}px`;
        elem.style.top = `${newTop}px`;

        this.repositionCanvasHud();
      }
    };

    const onEnd = () => {
      if (!isDown) return;
      isDown = false;

      if (isDragging) {
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

        this.repositionCanvasHud();
        this.justDragged = true;
        setTimeout(() => { this.justDragged = false; }, 120);
        this.pushState('Geser Objek');
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
      this.pushState('Posisi Foto Penulis');
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
    this.repositionCanvasHud();
    this.pushState('Reset Posisi Foto');
  }

  resetAuthorBadgePosition() {
    localStorage.removeItem('alqalam_author_badge_pos');
    this.setAuthorBadgePosition(32, 235, false);
    this.repositionCanvasHud();
    this.pushState('Reset Posisi Badge');
  }

  applyAuthorPosPreset(key) {
    const sheetW = this.a3Sheet?.offsetWidth || 840;
    const currentW = this.authorPhotoWidth || 170;

    const presets = {
      'mepet-kiri':   { photo: { left: -32, top: 35 },  badge: { left: 20,  top: 320 }, align: 'left', spacer: true },
      'mepet-kanan':  { photo: { left: Math.max(0, sheetW - currentW + 32), top: 35 }, badge: { left: Math.max(0, sheetW - 220), top: 320 }, align: 'right', spacer: false },
      'on-kop':       { photo: { left: 0,   top: 35 },  badge: { left: 32,  top: 235 }, align: 'left', spacer: true },
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
    this.pushState('Preset Posisi Penulis');
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

    this.setHeaderOffset(0, 0, false);
    this.setBodyOffset(0, 0, false);
    this.setHeadlineOffset(0, 0, false);
    this.setSubheadlineOffset(0, 0, false);
    this.setBylineOffset(0, 0, false);
    this.activityPhotos = [
      {
        id: 'photo_1',
        src: 'assets/template/demo_activity_math.jpg',
        caption: 'Suasana murid MTsN 1 Blitar saat aktif berdiskusi pelajaran matematika.',
        left: 275,
        top: 560,
        width: 290,
        visible: true
      }
    ];
    this.selectedPhotoId = 'photo_1';
    this.saveActivityPhotos();
    this.renderActivityPhotos();
    this.renderActivityPhotosDockList();
    this.formatNewspaperContent(true);
    this.saveArticleDraft();
    this.updateBottomInsertsVisibility();
    if (window.lucide) window.lucide.createIcons();
    this.pushState('Muat Ulang Demo');
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

    this.deselectCanvasElement();

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

  // ==========================================
  // SMART CLIPBOARD PASTE (CANVA DESKTOP & WEB)
  // ==========================================
  initClipboardPaste() {
    // 1. Tombol Paste Langsung di Bagian Kop
    this.btnPasteHeaderDirect?.addEventListener('click', () => {
      this.triggerDirectPaste('header');
    });

    // 2. Tombol Paste Langsung di Bagian Foto Penulis
    this.btnPasteAuthorDirect?.addEventListener('click', () => {
      this.triggerDirectPaste('author');
    });

    // 3. Tombol-tombol di Modal Pemilih Bagian Koran
    this.btnClosePasteModal?.addEventListener('click', () => this.closePasteModal());
    this.btnCancelPasteModal?.addEventListener('click', () => this.closePasteModal());
    this.btnPasteToAuthor?.addEventListener('click', () => this.applyPastedToAuthor());
    this.btnPasteToHeader?.addEventListener('click', () => this.applyPastedToHeader());
    this.btnPasteToActivity?.addEventListener('click', () => this.applyPastedToActivity());

    // Tutup modal jika klik di luar box modal (backdrop)
    this.modalPasteTarget?.addEventListener('click', (e) => {
      if (e.target === this.modalPasteTarget) {
        this.closePasteModal();
      }
    });

    // 4. Tombol Esc untuk menutup modal
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modalPasteTarget && !this.modalPasteTarget.classList.contains('hidden')) {
        this.closePasteModal();
      }
    });

    // 5. Global Paste Listener (Ctrl + V di mana saja di halaman)
    window.addEventListener('paste', async (e) => {
      const activeElem = document.activeElement;
      const isInput = activeElem && (activeElem.tagName === 'INPUT' || activeElem.tagName === 'TEXTAREA');

      const items = (e.clipboardData || window.clipboardData)?.items;
      
      // 1. Cek Image Blob langsung (dari Snipping Tool, Canva "Copy to clipboard", atau salin gambar browser)
      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type && items[i].type.startsWith('image/')) {
            const file = items[i].getAsFile();
            if (file) {
              e.preventDefault();
              this.handlePastedImageFile(file);
              return;
            }
          }
        }
      }

      // 2. Cek text/html jika ada tag <img> atau <svg> dari Canva
      const html = (e.clipboardData || window.clipboardData)?.getData('text/html');
      if (html) {
        try {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const img = doc.querySelector('img');
          if (img && img.src && !img.src.startsWith('about:')) {
            e.preventDefault();
            this.handlePastedImageUrl(img.src);
            return;
          }
          const svg = doc.querySelector('svg');
          if (svg) {
            e.preventDefault();
            const svgString = new XMLSerializer().serializeToString(svg);
            const svgUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
            this.handlePastedImageUrl(svgUrl);
            return;
          }
        } catch (err) {
          console.warn('HTML parse error:', err);
        }
      }

      // 3. Cek text/plain jika berisi URL gambar atau Base64
      const text = (e.clipboardData || window.clipboardData)?.getData('text/plain')?.trim();
      if (text && (text.startsWith('data:image/') || text.match(/\.(png|jpe?g|webp|svg)(\?.*)?$/i) || text.includes('canva.com/media'))) {
        e.preventDefault();
        this.handlePastedImageUrl(text);
        return;
      }

      // Jika user sedang di luar form input dan menekan Ctrl+V tapi tidak ada gambar terdeteksi
      if (!isInput) {
        console.log('Clipboard paste contains no supported image data.');
      }
    });

    // 6. Dukungan Drag & Drop File Gambar langsung dari Desktop/Canva ke Lembaran Kertas A3
    const stage = document.getElementById('preview-stage');
    const dropTargets = [this.a3Sheet, stage].filter(Boolean);
    dropTargets.forEach(dt => {
      dt.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        this.a3Sheet?.classList.add('ring-4', 'ring-emerald-400');
      });
      dt.addEventListener('dragleave', (e) => {
        e.preventDefault();
        this.a3Sheet?.classList.remove('ring-4', 'ring-emerald-400');
      });
      dt.addEventListener('drop', (e) => {
        e.preventDefault();
        this.a3Sheet?.classList.remove('ring-4', 'ring-emerald-400');
        const files = e.dataTransfer?.files;
        if (files && files.length > 0 && files[0].type.startsWith('image/')) {
          this.handlePastedImageFile(files[0]);
        }
      });
    });
  }

  async triggerDirectPaste(targetMode) {
    if (navigator.clipboard && navigator.clipboard.read) {
      try {
        const clipItems = await navigator.clipboard.read();
        for (const item of clipItems) {
          for (const type of item.types) {
            if (type.startsWith('image/')) {
              const blob = await item.getType(type);
              const file = new File([blob], 'canva_pasted.png', { type: blob.type || 'image/png' });
              if (targetMode === 'author') {
                this.processAndApplyAuthorFile(file);
              } else if (targetMode === 'header') {
                this.processAndApplyHeaderFile(file);
              } else {
                this.handlePastedImageFile(file);
              }
              return;
            }
          }
        }
      } catch (err) {
        console.warn('Clipboard read notice:', err);
      }
    }

    // Jika belum ada data gambar di clipboard, buka pemilih file Canva langsung
    if (targetMode === 'header') {
      this.inpCustomHeader?.click();
    } else {
      this.inpAuthorPhoto?.click();
    }
  }

  handlePastedImageUrl(url) {
    if (!url) return;
    this.pendingPastedFile = null;
    this.pendingPastedDataUrl = url;

    if (this.previewPastedImg) {
      this.previewPastedImg.src = url;
    }

    const img = new Image();
    img.onload = () => {
      if (this.labelPastedDimensions) {
        this.labelPastedDimensions.innerText = `Dimensi: ${img.naturalWidth} x ${img.naturalHeight} px`;
      }
    };
    img.src = url;

    if (this.modalPasteTarget) {
      this.modalPasteTarget.classList.remove('hidden');
    }
    if (window.lucide) window.lucide.createIcons();
  }

  handlePastedImageFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const dataUrl = evt.target.result;
      this.pendingPastedFile = file;
      this.pendingPastedDataUrl = dataUrl;

      if (this.previewPastedImg) {
        this.previewPastedImg.src = dataUrl;
      }

      const img = new Image();
      img.onload = () => {
        if (this.labelPastedDimensions) {
          this.labelPastedDimensions.innerText = `Dimensi Asli: ${img.naturalWidth} x ${img.naturalHeight} px`;
        }
      };
      img.src = dataUrl;

      if (this.modalPasteTarget) {
        this.modalPasteTarget.classList.remove('hidden');
      }
      if (window.lucide) window.lucide.createIcons();
    };
    reader.readAsDataURL(file);
  }

  closePasteModal() {
    if (this.modalPasteTarget) {
      this.modalPasteTarget.classList.add('hidden');
    }
    this.pendingPastedFile = null;
    this.pendingPastedDataUrl = null;
  }

  applyPastedToAuthor() {
    if (!this.pendingPastedDataUrl) return;
    const dataUrl = this.pendingPastedDataUrl;
    this.closePasteModal();

    // Langsung terapkan seketika agar tidak blank
    this.setAuthorPhoto(dataUrl, true);

    // Rapatkan tepi transparan di background
    const testImg = new Image();
    testImg.crossOrigin = 'anonymous';
    testImg.onload = () => {
      try {
        const cvs = document.createElement('canvas');
        let targetW = testImg.naturalWidth || testImg.width || 800;
        let targetH = testImg.naturalHeight || testImg.height || 1000;
        const maxDim = 1600;
        if (targetW > maxDim || targetH > maxDim) {
          if (targetW >= targetH) {
            targetH = Math.round((targetH * maxDim) / targetW);
            targetW = maxDim;
          } else {
            targetW = Math.round((targetW * maxDim) / targetH);
            targetH = maxDim;
          }
        }
        cvs.width = targetW;
        cvs.height = targetH;
        cvs.getContext('2d').drawImage(testImg, 0, 0, targetW, targetH);
        const trimmedCvs = this.trimCanvas(cvs);
        const finalUrl = trimmedCvs.toDataURL('image/png');
        this.setAuthorPhoto(finalUrl, true);
      } catch (err) {
        console.warn('Trim canvas notice:', err);
      }
    };
    testImg.src = dataUrl;

    alert('✨ Berhasil!\n\nGambar dari Canva telah ditempel sebagai Foto Penulis.');
  }

  processAndApplyAuthorFile(file) {
    const reader = new FileReader();
    reader.onload = (evt) => {
      const dataUrl = evt.target.result;
      this.setAuthorPhoto(dataUrl, true);

      const testImg = new Image();
      testImg.crossOrigin = 'anonymous';
      testImg.onload = () => {
        try {
          const cvs = document.createElement('canvas');
          let targetW = testImg.naturalWidth || testImg.width || 800;
          let targetH = testImg.naturalHeight || testImg.height || 1000;
          const maxDim = 1600;
          if (targetW > maxDim || targetH > maxDim) {
            if (targetW >= targetH) {
              targetH = Math.round((targetH * maxDim) / targetW);
              targetW = maxDim;
            } else {
              targetW = Math.round((targetW * maxDim) / targetH);
              targetH = maxDim;
            }
          }
          cvs.width = targetW;
          cvs.height = targetH;
          cvs.getContext('2d').drawImage(testImg, 0, 0, targetW, targetH);
          const trimmedCvs = this.trimCanvas(cvs);
          const finalUrl = trimmedCvs.toDataURL('image/png');
          this.setAuthorPhoto(finalUrl, true);
        } catch (err) {}
      };
      testImg.src = dataUrl;

      alert('✨ Berhasil!\n\nFoto Penulis dari Canva telah ditempel dan siap diatur posisinya.');
    };
    reader.readAsDataURL(file);
  }

  applyPastedToHeader() {
    if (!this.pendingPastedDataUrl) return;
    const file = this.pendingPastedFile;
    const dataUrl = this.pendingPastedDataUrl;
    this.closePasteModal();

    this.applyCustomHeader(dataUrl, true);
    try {
      localStorage.setItem('alqalam_master_header', dataUrl);
    } catch (e) {}

    if (file) {
      const fd = new FormData();
      fd.append('header_file', file);
      fetch('api.php?action=upload_header', {
        method: 'POST',
        body: fd
      })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.header_url) {
          try { localStorage.setItem('alqalam_master_header', data.header_url); } catch(e){}
        }
      })
      .catch(err => console.warn('Sync header server:', err));
    }

    if (this.labelUploadHeader) this.labelUploadHeader.innerText = 'Ganti File Kop';
    alert('🎉 Berhasil!\n\nKop Koran dari Canva berhasil dipasang sebagai Header Master AL QALAM.');
  }

  processAndApplyHeaderFile(file) {
    const reader = new FileReader();
    reader.onload = (evt) => {
      const dataUrl = evt.target.result;
      this.applyCustomHeader(dataUrl, true);
      try {
        localStorage.setItem('alqalam_master_header', dataUrl);
      } catch (e) {}

      const fd = new FormData();
      fd.append('header_file', file);
      fetch('api.php?action=upload_header', { method: 'POST', body: fd })
      .catch(e => console.warn(e));

      if (this.labelUploadHeader) this.labelUploadHeader.innerText = 'Ganti File Kop';
      alert('🎉 Berhasil!\n\nKop Koran dari Canva berhasil dipasang sebagai Header Master AL QALAM.');
    };
    reader.readAsDataURL(file);
  }

  applyPastedToActivity() {
    if (!this.pendingPastedDataUrl) return;
    const dataUrl = this.pendingPastedDataUrl;
    this.closePasteModal();

    // Jika ada foto kegiatan yang sedang dipilih, gantikan fotonya
    if (this.selectedPhotoId) {
      const photo = this.activityPhotos.find(p => p.id === this.selectedPhotoId);
      if (photo) {
        photo.src = dataUrl;
        this.saveActivityPhotos();
        this.renderActivityPhotos();
        this.renderActivityPhotosDockList();
        this.pushState('Ganti Gambar Foto Kegiatan');
        alert('✅ Berhasil!\n\nGambar dari Canva telah dipasang pada Foto Kegiatan #' + (this.activityPhotos.indexOf(photo) + 1));
        return;
      }
    }

    // Jika belum ada / tidak ada yang dipilih, tambahkan foto kegiatan baru
    this.addNewActivityPhoto({
      src: dataUrl,
      caption: 'Foto Dokumentasi Kegiatan'
    });
    alert('✅ Berhasil!\n\nGambar dari Canva telah ditambahkan sebagai Foto Kegiatan baru.');
  }
}

// Bootstrap on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  window.studio = new AlqalamStudio();
  if (window.lucide) window.lucide.createIcons();
});
