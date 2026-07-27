(() => {
  'use strict';

  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const isThai = document.documentElement.lang.toLowerCase().startsWith('th');

  const copy = isThai ? {
    imageFallback: 'รูปภาพ',
    chooseSupported: 'กรุณาเลือกไฟล์ JPG, PNG, WebP, HEIC หรือ HEIF',
    tooLarge: 'แต่ละไฟล์ต้องมีขนาดไม่เกิน 50 MB',
    tooMany: 'เลือกได้สูงสุด 20 ไฟล์ต่อครั้ง',
    totalTooLarge: 'ไฟล์ทั้งหมดต้องมีขนาดรวมไม่เกิน 200 MB',
    readError: 'เราไม่สามารถอ่านรูปนี้ได้ ไฟล์อาจเสียหายหรือใช้ encoding ที่ไม่รองรับ',
    heicError: 'ไม่สามารถถอดรหัส HEIC นี้ได้ กรุณาลองรูปอื่นหรือแปลงจากอุปกรณ์ต้นทางก่อน',
    exportError: 'Browser ไม่สามารถ export รูปภาพได้',
    dimensionTooLarge: 'ขนาดภาพที่ขอใหญ่เกินไปสำหรับการประมวลผลใน browser อย่างปลอดภัย',
    invalidDimensions: 'กรุณาใส่ค่าความกว้างและความสูงที่ถูกต้อง',
    targetRange: 'กรุณาเลือกขนาดเป้าหมายระหว่าง 5 KB ถึง 50,000 KB',
    genericError: 'เกิดข้อผิดพลาดระหว่างประมวลผลรูปภาพ',
    smaller: (value) => `เล็กลง ${value}%`,
    larger: (value) => `ใหญ่ขึ้น ${value}%`,
    fileCount: (value) => `${value} ไฟล์`,
    rotation: (value) => `หมุน ${value}°`,
    processing: (current, total) => `กำลังประมวลผล ${current}/${total}`,
    processOne: 'ประมวลผลรูปภาพ',
    processMany: (value) => `ประมวลผล ${value} รูป`,
    downloadOne: 'ดาวน์โหลดรูปภาพ',
    downloadMany: 'ดาวน์โหลดทั้งหมดเป็น ZIP',
    resultOne: 'รูปภาพของคุณพร้อมดาวน์โหลด',
    resultMany: (value) => `${value} รูปพร้อมดาวน์โหลด`,
    pngQuality: 'PNG เป็นรูปแบบ lossless จึงไม่ใช้ค่า quality แต่ยังลดขนาดด้วย dimensions ได้',
    qualityNote: 'ใช้เป็นคุณภาพ export หรือคุณภาพสูงสุดในโหมดเป้าหมาย KB',
    select: 'เลือก',
    remove: 'ลบ',
    rotate: 'หมุน',
    download: 'ดาวน์โหลด'
  } : {
    imageFallback: 'Image',
    chooseSupported: 'Choose a JPG, PNG, WebP, HEIC, or HEIF image.',
    tooLarge: 'Each file must be no larger than 50 MB.',
    tooMany: 'Choose no more than 20 files at a time.',
    totalTooLarge: 'The combined file size must be no more than 200 MB.',
    readError: 'We could not read this image. It may be damaged or use an unsupported encoding.',
    heicError: 'This HEIC file could not be decoded. Try another photo or convert it on the source device first.',
    exportError: 'The browser could not export the image.',
    dimensionTooLarge: 'The requested dimensions are too large for safe browser processing.',
    invalidDimensions: 'Enter valid width and height values.',
    targetRange: 'Choose a target between 5 KB and 50,000 KB.',
    genericError: 'Something went wrong while processing the image.',
    smaller: (value) => `${value}% smaller`,
    larger: (value) => `${value}% larger`,
    fileCount: (value) => `${value} files`,
    rotation: (value) => `${value}° rotation`,
    processing: (current, total) => `Processing ${current}/${total}`,
    processOne: 'Process image',
    processMany: (value) => `Process ${value} images`,
    downloadOne: 'Download image',
    downloadMany: 'Download all as ZIP',
    resultOne: 'Your image is ready to download.',
    resultMany: (value) => `${value} images are ready to download.`,
    pngQuality: 'PNG is lossless, so the quality setting is not used. Dimensions can still reduce its size.',
    qualityNote: 'Used as export quality or the maximum quality in target-KB mode.',
    select: 'Select',
    remove: 'Remove',
    rotate: 'Rotate',
    download: 'Download'
  };

  const els = {
    menuToggle: $('.menu-toggle'),
    mainNav: $('.main-nav'),
    dropZone: $('#drop-zone'),
    fileInput: $('#file-input'),
    uploadView: $('#upload-view'),
    editorView: $('#editor-view'),
    removeFile: $('#remove-file'),
    rotateFile: $('#rotate-file'),
    batchList: $('#batch-list'),
    tinyPreview: $('#tiny-preview'),
    mainPreview: $('#main-preview'),
    fileName: $('#file-name'),
    fileMeta: $('#file-meta'),
    modeTabs: $$('.mode-tab'),
    panels: $$('.setting-panel'),
    targetSize: $('#target-size'),
    quickSizes: $$('[data-size]'),
    keepDimensions: $('#keep-dimensions'),
    percentage: $('#percentage'),
    percentageValue: $('#percentage-value'),
    percentageDimensions: $('#percentage-dimensions'),
    quickPercents: $$('[data-percent]'),
    presetSelect: $('#preset-select'),
    widthInput: $('#width-input'),
    heightInput: $('#height-input'),
    ratioLock: $('#ratio-lock'),
    formatSelect: $('#format-select'),
    qualityRow: $('#quality-row'),
    qualityInput: $('#quality-input'),
    qualityValue: $('#quality-value'),
    qualityNote: $('#quality-note'),
    quickQualities: $$('[data-quality]'),
    processButton: $('#process-button'),
    processLabel: $('#process-button .button-label'),
    errorMessage: $('#error-message'),
    previewTabs: $$('.preview-tab'),
    previewStage: $('#preview-stage'),
    checkerToggle: $('#checker-toggle'),
    emptyResult: $('#empty-result'),
    previewSize: $('#preview-size'),
    previewDimensions: $('#preview-dimensions'),
    previewFormat: $('#preview-format'),
    compareView: $('#compare-view'),
    compareOriginal: $('#compare-original'),
    compareResult: $('#compare-result'),
    compareResultWrap: $('#compare-result-wrap'),
    compareSlider: $('#compare-slider'),
    resultBar: $('#result-bar'),
    resultSummaryText: $('#result-summary-text'),
    beforeSize: $('#before-size'),
    afterSize: $('#after-size'),
    savedBadge: $('#saved-badge'),
    downloadButton: $('#download-button'),
    batchResults: $('#batch-results'),
    year: $('#current-year')
  };

  const state = {
    items: [],
    activeIndex: 0,
    file: null,
    bitmap: null,
    objectUrl: null,
    results: [],
    mode: 'target',
    ratioLocked: true,
    activePreview: 'original',
    rawWidth: 0,
    rawHeight: 0,
    originalWidth: 0,
    originalHeight: 0,
    originalType: '',
    originalHasTransparency: false
  };

  const MAX_FILES = 20;
  const MAX_FILE_BYTES = 50 * 1024 * 1024;
  const MAX_TOTAL_BYTES = 200 * 1024 * 1024;
  const supportedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
  const staticSvg = {
    rotate: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 7v5h-5M19 12a7 7 0 1 1-2-5l3 3"/></svg>',
    remove: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 7 10 10M17 7 7 17"/></svg>'
  };

  const currentItem = () => state.items[state.activeIndex] || null;
  const isHeic = (file) => /\.(heic|heif)$/i.test(file.name) || ['image/heic', 'image/heif'].includes(file.type);
  const isSupported = (file) => supportedTypes.includes(file.type) || /\.(jpe?g|png|webp|heic|heif)$/i.test(file.name);
  const orientedDimensions = (bitmap, rotation) => rotation % 180 === 0
    ? { width: bitmap.width, height: bitmap.height }
    : { width: bitmap.height, height: bitmap.width };

  const formatBytes = (bytes) => {
    if (!Number.isFinite(bytes)) return '—';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(bytes < 10240 ? 1 : 0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const typeLabel = (type) => ({
    'image/jpeg': 'JPG',
    'image/png': 'PNG',
    'image/webp': 'WebP',
    'image/heic': 'HEIC',
    'image/heif': 'HEIF'
  }[type] || (type.split('/')[1] || copy.imageFallback).toUpperCase());

  const extensionForType = (type) => ({
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp'
  }[type] || 'jpg');

  const safeBaseName = (name) => {
    const base = name.replace(/\.[^.]+$/, '').replace(/[^a-z0-9_-]+/gi, '-').replace(/^-+|-+$/g, '');
    return base || 'djai-image';
  };

  const setError = (message = '') => {
    els.errorMessage.textContent = message;
    els.errorMessage.hidden = !message;
  };

  const revokeUrl = (key) => {
    if (state[key]) URL.revokeObjectURL(state[key]);
    state[key] = null;
  };

  const clearResults = () => {
    state.results.forEach(result => URL.revokeObjectURL(result.url));
    state.results = [];
    els.resultBar.hidden = true;
    els.batchResults.hidden = true;
    els.batchResults.replaceChildren();
    els.previewTabs.forEach(tab => {
      if (tab.dataset.preview !== 'original') tab.disabled = true;
    });
    if (state.activePreview !== 'original') showPreview('original');
  };

  const loadLocalScript = (src, globalName) => new Promise((resolve, reject) => {
    if (window[globalName]) {
      resolve(window[globalName]);
      return;
    }
    const existing = document.querySelector(`script[data-djai-lib="${globalName}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve(window[globalName]), { once: true });
      existing.addEventListener('error', reject, { once: true });
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.dataset.djaiLib = globalName;
    script.addEventListener('load', () => resolve(window[globalName]), { once: true });
    script.addEventListener('error', () => reject(new Error(`Unable to load ${globalName}`)), { once: true });
    document.head.appendChild(script);
  });

  const normalizeHeic = async (file) => {
    try {
      const decoder = await loadLocalScript('vendor/heic2any.min.js', 'heic2any');
      const converted = await decoder({ blob: file, toType: 'image/jpeg', quality: .96 });
      return Array.isArray(converted) ? converted[0] : converted;
    } catch (error) {
      console.error(error);
      throw new Error(copy.heicError);
    }
  };

  const decodeItem = async (item) => {
    const source = isHeic(item.file) ? await normalizeHeic(item.file) : item.file;
    const bitmap = await createImageBitmap(source, { imageOrientation: 'from-image' });
    const type = ['image/jpeg', 'image/png', 'image/webp'].includes(source.type) ? source.type : 'image/jpeg';
    return { source, bitmap, type };
  };

  const hasTransparency = async (bitmap, type) => {
    if (type !== 'image/png' && type !== 'image/webp') return false;
    const sampleWidth = Math.min(bitmap.width, 320);
    const sampleHeight = Math.max(1, Math.round(bitmap.height * sampleWidth / bitmap.width));
    const canvas = document.createElement('canvas');
    canvas.width = sampleWidth;
    canvas.height = sampleHeight;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(bitmap, 0, 0, sampleWidth, sampleHeight);
    const data = ctx.getImageData(0, 0, sampleWidth, sampleHeight).data;
    for (let index = 3; index < data.length; index += 4) {
      if (data[index] < 250) return true;
    }
    return false;
  };

  const getResultForActive = () => state.results.find(result => result.itemId === currentItem()?.id) || null;

  const applyPreviewRotation = () => {
    const rotation = currentItem()?.rotation || 0;
    els.mainPreview.style.transform = state.activePreview === 'original' ? `rotate(${rotation}deg)` : '';
    els.tinyPreview.style.transform = `rotate(${rotation}deg)`;
    els.compareOriginal.style.transform = `rotate(${rotation}deg)`;
  };

  const updatePercentageUI = () => {
    if (!state.bitmap) return;
    const percent = Number(els.percentage.value);
    const width = Math.max(1, Math.round(state.originalWidth * percent / 100));
    const height = Math.max(1, Math.round(state.originalHeight * percent / 100));
    els.percentageValue.textContent = `${percent}%`;
    els.percentageDimensions.textContent = `${width.toLocaleString()} × ${height.toLocaleString()} px`;
    els.quickPercents.forEach(button => button.classList.toggle('selected', Number(button.dataset.percent) === percent));
  };

  const getImageType = (sourceType = state.originalType) => {
    if (els.formatSelect.value !== 'original') return els.formatSelect.value;
    return ['image/jpeg', 'image/png', 'image/webp'].includes(sourceType) ? sourceType : 'image/jpeg';
  };

  const updateQualityUI = () => {
    const value = Number(els.qualityInput.value);
    els.qualityValue.textContent = `${value}%`;
    els.quickQualities.forEach(button => button.classList.toggle('selected', Number(button.dataset.quality) === value));
    const pngOnly = state.items.length === 1 && getImageType() === 'image/png';
    els.qualityInput.disabled = pngOnly;
    els.qualityRow.classList.toggle('disabled', pngOnly);
    els.qualityNote.textContent = pngOnly ? copy.pngQuality : copy.qualityNote;
  };

  const showPreview = (kind) => {
    const result = getResultForActive();
    if ((kind === 'result' || kind === 'compare') && !result) kind = 'original';
    state.activePreview = kind;
    els.previewTabs.forEach(tab => tab.classList.toggle('active', tab.dataset.preview === kind));
    els.mainPreview.hidden = kind === 'compare';
    els.compareView.hidden = kind !== 'compare';
    els.emptyResult.hidden = true;

    if (kind === 'compare') {
      els.compareOriginal.src = state.objectUrl || '';
      els.compareResult.src = result.url;
      els.previewSize.textContent = formatBytes(result.blob.size);
      els.previewDimensions.textContent = `${result.width.toLocaleString()} × ${result.height.toLocaleString()} px`;
      els.previewFormat.textContent = typeLabel(result.type);
    } else if (kind === 'result') {
      els.mainPreview.src = result.url;
      els.previewSize.textContent = formatBytes(result.blob.size);
      els.previewDimensions.textContent = `${result.width.toLocaleString()} × ${result.height.toLocaleString()} px`;
      els.previewFormat.textContent = typeLabel(result.type);
    } else {
      els.mainPreview.src = state.objectUrl || '';
      els.mainPreview.hidden = !state.objectUrl;
      els.previewSize.textContent = state.file ? formatBytes(state.file.size) : '—';
      els.previewDimensions.textContent = state.bitmap ? `${state.originalWidth.toLocaleString()} × ${state.originalHeight.toLocaleString()} px` : '—';
      els.previewFormat.textContent = state.originalType ? typeLabel(state.originalType) : '—';
    }
    applyPreviewRotation();
  };

  const updateProcessLabel = () => {
    els.processLabel.textContent = state.items.length > 1 ? copy.processMany(state.items.length) : copy.processOne;
  };

  const renderBatchList = () => {
    els.batchList.replaceChildren();
    els.batchList.hidden = state.items.length < 2;
    if (state.items.length < 2) return;

    state.items.forEach((item, index) => {
      const row = document.createElement('div');
      row.className = `batch-item${index === state.activeIndex ? ' active' : ''}`;

      const selectButton = document.createElement('button');
      selectButton.type = 'button';
      selectButton.textContent = item.file.name;
      selectButton.title = `${copy.select}: ${item.file.name}`;
      selectButton.addEventListener('click', () => loadActiveItem(index, false));

      const rotation = document.createElement('small');
      rotation.textContent = `${item.rotation}°`;

      const rotateButton = document.createElement('button');
      rotateButton.type = 'button';
      rotateButton.className = 'batch-action';
      rotateButton.title = copy.rotate;
      rotateButton.setAttribute('aria-label', `${copy.rotate}: ${item.file.name}`);
      rotateButton.innerHTML = staticSvg.rotate;
      rotateButton.addEventListener('click', () => rotateItem(index));

      const removeButton = document.createElement('button');
      removeButton.type = 'button';
      removeButton.className = 'batch-action';
      removeButton.title = copy.remove;
      removeButton.setAttribute('aria-label', `${copy.remove}: ${item.file.name}`);
      removeButton.innerHTML = staticSvg.remove;
      removeButton.addEventListener('click', () => removeItem(index));

      row.append(selectButton, rotation, rotateButton, removeButton);
      els.batchList.append(row);
    });
  };

  const loadActiveItem = async (index, initializeDimensions = false) => {
    const item = state.items[index];
    if (!item) return;
    setError();
    try {
      if (state.bitmap?.close) state.bitmap.close();
      revokeUrl('objectUrl');
      const decoded = await decodeItem(item);
      state.activeIndex = index;
      state.file = item.file;
      state.bitmap = decoded.bitmap;
      state.rawWidth = decoded.bitmap.width;
      state.rawHeight = decoded.bitmap.height;
      state.originalType = decoded.type;
      state.originalHasTransparency = await hasTransparency(decoded.bitmap, decoded.type);
      const dimensions = orientedDimensions(decoded.bitmap, item.rotation);
      state.originalWidth = dimensions.width;
      state.originalHeight = dimensions.height;
      state.objectUrl = URL.createObjectURL(decoded.source);

      els.fileName.textContent = item.file.name;
      const queueMeta = state.items.length > 1 ? ` · ${index + 1}/${state.items.length}` : '';
      els.fileMeta.textContent = `${formatBytes(item.file.size)} · ${dimensions.width.toLocaleString()} × ${dimensions.height.toLocaleString()} px${queueMeta}`;
      els.tinyPreview.src = state.objectUrl;
      if (initializeDimensions) {
        els.widthInput.value = dimensions.width;
        els.heightInput.value = dimensions.height;
      }
      updatePercentageUI();
      updateQualityUI();
      renderBatchList();
      showPreview(getResultForActive() ? state.activePreview : 'original');
    } catch (error) {
      console.error(error);
      setError(error.message || copy.readError);
    }
  };

  const reset = () => {
    if (state.bitmap?.close) state.bitmap.close();
    state.bitmap = null;
    state.file = null;
    state.items = [];
    state.activeIndex = 0;
    revokeUrl('objectUrl');
    clearResults();
    state.rawWidth = 0;
    state.rawHeight = 0;
    state.originalWidth = 0;
    state.originalHeight = 0;
    state.originalType = '';
    state.originalHasTransparency = false;
    els.fileInput.value = '';
    els.editorView.hidden = true;
    els.uploadView.hidden = false;
    setError();
  };

  const addFiles = async (fileList) => {
    setError();
    const candidates = [...fileList].filter(isSupported);
    if (!candidates.length) {
      setError(copy.chooseSupported);
      return;
    }
    if (candidates.some(file => file.size > MAX_FILE_BYTES)) {
      setError(copy.tooLarge);
      return;
    }
    if (candidates.length > MAX_FILES) {
      setError(copy.tooMany);
      return;
    }
    if (candidates.reduce((total, file) => total + file.size, 0) > MAX_TOTAL_BYTES) {
      setError(copy.totalTooLarge);
      return;
    }

    if (state.bitmap?.close) state.bitmap.close();
    revokeUrl('objectUrl');
    clearResults();
    state.items = candidates.map((file, index) => ({ id: `${Date.now()}-${index}`, file, rotation: 0 }));
    state.activeIndex = 0;
    els.uploadView.hidden = true;
    els.editorView.hidden = false;
    updateProcessLabel();
    await loadActiveItem(0, true);
    setTimeout(() => els.editorView.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 80);
  };

  const removeItem = async (index) => {
    if (state.items.length === 1) {
      reset();
      return;
    }
    clearResults();
    state.items.splice(index, 1);
    const nextIndex = Math.min(index === state.activeIndex ? index : state.activeIndex, state.items.length - 1);
    updateProcessLabel();
    await loadActiveItem(nextIndex, true);
  };

  const rotateItem = async (index) => {
    const item = state.items[index];
    if (!item) return;
    clearResults();
    item.rotation = (item.rotation + 90) % 360;
    if (index === state.activeIndex) {
      const dimensions = orientedDimensions(state.bitmap, item.rotation);
      state.originalWidth = dimensions.width;
      state.originalHeight = dimensions.height;
      els.widthInput.value = dimensions.width;
      els.heightInput.value = dimensions.height;
      els.fileMeta.textContent = `${formatBytes(item.file.size)} · ${dimensions.width.toLocaleString()} × ${dimensions.height.toLocaleString()} px · ${copy.rotation(item.rotation)}`;
      updatePercentageUI();
      showPreview('original');
    }
    renderBatchList();
  };

  const switchMode = (mode) => {
    state.mode = mode;
    els.modeTabs.forEach(tab => {
      const active = tab.dataset.mode === mode;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
    });
    els.panels.forEach(panel => {
      const active = panel.dataset.panel === mode;
      panel.classList.toggle('active', active);
      panel.hidden = !active;
    });
    clearResults();
  };

  const canvasToBlob = (canvas, type, quality) => new Promise((resolve, reject) => {
    canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error(copy.exportError)), type, quality);
  });

  const renderBitmapBlob = async (bitmap, rotation, width, height, type, quality = .82) => {
    const maxDimension = 20000;
    if (width > maxDimension || height > maxDimension || width * height > 100_000_000) {
      throw new Error(copy.dimensionTooLarge);
    }
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d', { alpha: type !== 'image/jpeg' });
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    if (type === 'image/jpeg') {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
    }
    ctx.translate(width / 2, height / 2);
    ctx.rotate(rotation * Math.PI / 180);
    const rotated = rotation % 180 !== 0;
    const drawWidth = rotated ? height : width;
    const drawHeight = rotated ? width : height;
    ctx.drawImage(bitmap, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
    const blob = await canvasToBlob(canvas, type, quality);
    canvas.width = 1;
    canvas.height = 1;
    return blob;
  };

  const bestQualityAtDimensions = async (bitmap, rotation, width, height, type, targetBytes, maxQuality) => {
    const highBlob = await renderBitmapBlob(bitmap, rotation, width, height, type, maxQuality);
    if (highBlob.size <= targetBytes) return { blob: highBlob, quality: maxQuality };
    const lowBlob = await renderBitmapBlob(bitmap, rotation, width, height, type, .05);
    if (lowBlob.size > targetBytes) return { blob: lowBlob, quality: .05, tooLarge: true };

    let low = .05;
    let high = maxQuality;
    let best = lowBlob;
    for (let iteration = 0; iteration < 9; iteration += 1) {
      const middle = (low + high) / 2;
      const blob = await renderBitmapBlob(bitmap, rotation, width, height, type, middle);
      if (blob.size <= targetBytes) {
        best = blob;
        low = middle;
      } else {
        high = middle;
      }
      await new Promise(resolve => setTimeout(resolve, 0));
    }
    return { blob: best };
  };

  const compressToTarget = async (context, targetBytes, type, keepDimensions, maxQuality) => {
    let { width, height } = context.dimensions;
    let blob;

    if (type === 'image/png') {
      for (let attempt = 0; attempt < 12; attempt += 1) {
        blob = await renderBitmapBlob(context.bitmap, context.rotation, width, height, type, 1);
        if (blob.size <= targetBytes || keepDimensions) return { blob, width, height };
        const ratio = Math.sqrt(targetBytes / blob.size) * .94;
        const scale = Math.min(.9, Math.max(.45, ratio));
        width = Math.max(1, Math.round(width * scale));
        height = Math.max(1, Math.round(height * scale));
      }
      return { blob, width, height };
    }

    for (let attempt = 0; attempt < 12; attempt += 1) {
      const qualityResult = await bestQualityAtDimensions(context.bitmap, context.rotation, width, height, type, targetBytes, maxQuality);
      blob = qualityResult.blob;
      if (!qualityResult.tooLarge || keepDimensions) return { blob, width, height };
      const ratio = Math.sqrt(targetBytes / blob.size) * .9;
      const scale = Math.min(.86, Math.max(.5, ratio));
      width = Math.max(1, Math.round(width * scale));
      height = Math.max(1, Math.round(height * scale));
      await new Promise(resolve => setTimeout(resolve, 0));
    }
    return { blob, width, height };
  };

  const fitWithin = (originalWidth, originalHeight, maxWidth, maxHeight) => {
    const scale = Math.min(maxWidth / originalWidth, maxHeight / originalHeight);
    return {
      width: Math.max(1, Math.round(originalWidth * scale)),
      height: Math.max(1, Math.round(originalHeight * scale))
    };
  };

  const getDimensions = (originalWidth, originalHeight) => {
    if (state.mode === 'percentage') {
      const factor = Number(els.percentage.value) / 100;
      return { width: Math.max(1, Math.round(originalWidth * factor)), height: Math.max(1, Math.round(originalHeight * factor)) };
    }
    if (state.mode === 'dimensions') {
      const width = Math.round(Number(els.widthInput.value));
      const height = Math.round(Number(els.heightInput.value));
      if (!width || !height || width < 1 || height < 1) throw new Error(copy.invalidDimensions);
      return state.ratioLocked ? fitWithin(originalWidth, originalHeight, width, height) : { width, height };
    }
    return { width: originalWidth, height: originalHeight };
  };

  const renderBatchResults = () => {
    els.batchResults.replaceChildren();
    els.batchResults.hidden = state.results.length < 2;
    if (state.results.length < 2) return;
    state.results.forEach(result => {
      const row = document.createElement('div');
      row.className = 'batch-result';
      const name = document.createElement('strong');
      name.textContent = result.name;
      const details = document.createElement('span');
      details.textContent = `${formatBytes(result.before)} → ${formatBytes(result.blob.size)}`;
      const link = document.createElement('a');
      link.href = result.url;
      link.download = result.name;
      link.textContent = copy.download;
      row.append(name, details, link);
      els.batchResults.append(row);
    });
  };

  const processImages = async () => {
    if (!state.items.length) return;
    setError();
    clearResults();
    els.processButton.classList.add('processing');
    els.processButton.setAttribute('aria-busy', 'true');

    try {
      const targetKB = Number(els.targetSize.value);
      if (state.mode === 'target' && (!Number.isFinite(targetKB) || targetKB < 5 || targetKB > 50000)) {
        throw new Error(copy.targetRange);
      }
      const quality = Number(els.qualityInput.value) / 100;
      const results = [];

      for (let index = 0; index < state.items.length; index += 1) {
        els.processLabel.textContent = copy.processing(index + 1, state.items.length);
        const item = state.items[index];
        const decoded = await decodeItem(item);
        try {
          const original = orientedDimensions(decoded.bitmap, item.rotation);
          const type = getImageType(decoded.type);
          const context = { bitmap: decoded.bitmap, rotation: item.rotation, dimensions: getDimensions(original.width, original.height) };
          const output = state.mode === 'target'
            ? await compressToTarget(context, targetKB * 1024, type, els.keepDimensions.checked, quality)
            : {
                blob: await renderBitmapBlob(decoded.bitmap, item.rotation, context.dimensions.width, context.dimensions.height, type, quality),
                width: context.dimensions.width,
                height: context.dimensions.height
              };
          const name = `${safeBaseName(item.file.name)}-djai.${extensionForType(type)}`;
          results.push({ itemId: item.id, name, blob: output.blob, url: URL.createObjectURL(output.blob), width: output.width, height: output.height, type, before: item.file.size });
        } finally {
          if (decoded.bitmap?.close) decoded.bitmap.close();
        }
      }

      state.results = results;
      const beforeTotal = results.reduce((total, result) => total + result.before, 0);
      const afterTotal = results.reduce((total, result) => total + result.blob.size, 0);
      const reduction = Math.round((1 - afterTotal / beforeTotal) * 100);
      els.beforeSize.textContent = formatBytes(beforeTotal);
      els.afterSize.textContent = formatBytes(afterTotal);
      els.savedBadge.textContent = reduction >= 0 ? copy.smaller(reduction) : copy.larger(Math.abs(reduction));
      els.savedBadge.classList.toggle('larger', reduction < 0);
      els.resultSummaryText.textContent = results.length > 1 ? copy.resultMany(results.length) : copy.resultOne;
      els.downloadButton.lastChild.textContent = ` ${results.length > 1 ? copy.downloadMany : copy.downloadOne}`;
      els.resultBar.hidden = false;
      els.previewTabs.forEach(tab => {
        if (tab.dataset.preview !== 'original') tab.disabled = false;
      });
      renderBatchResults();
      showPreview(results.length === 1 ? 'compare' : 'result');
      els.resultBar.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (error) {
      console.error(error);
      clearResults();
      setError(error.message || copy.genericError);
    } finally {
      els.processButton.classList.remove('processing');
      els.processButton.removeAttribute('aria-busy');
      updateProcessLabel();
    }
  };

  const downloadResults = async () => {
    if (!state.results.length) return;
    if (state.results.length === 1) {
      const link = document.createElement('a');
      link.href = state.results[0].url;
      link.download = state.results[0].name;
      link.click();
      return;
    }
    try {
      const Zip = await loadLocalScript('vendor/jszip.min.js', 'JSZip');
      const zip = new Zip();
      state.results.forEach(result => zip.file(result.name, result.blob));
      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'djai-images.zip';
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
      console.error(error);
      setError(copy.genericError);
    }
  };

  const applyPagePreset = () => {
    const { presetMode, presetFormat, presetTarget, presetPercent } = document.body.dataset;
    if (presetFormat) els.formatSelect.value = presetFormat;
    if (presetTarget) els.targetSize.value = presetTarget;
    if (presetPercent) els.percentage.value = presetPercent;
    if (presetMode) switchMode(presetMode);
    updateQualityUI();
  };

  els.year.textContent = new Date().getFullYear();
  els.menuToggle.addEventListener('click', () => {
    const open = els.mainNav.classList.toggle('open');
    els.menuToggle.setAttribute('aria-expanded', String(open));
  });
  $$('.main-nav a').forEach(link => link.addEventListener('click', () => {
    els.mainNav.classList.remove('open');
    els.menuToggle.setAttribute('aria-expanded', 'false');
  }));

  els.dropZone.addEventListener('click', () => els.fileInput.click());
  els.fileInput.addEventListener('change', event => addFiles(event.target.files));
  ['dragenter', 'dragover'].forEach(type => els.dropZone.addEventListener(type, event => {
    event.preventDefault();
    els.dropZone.classList.add('dragover');
  }));
  ['dragleave', 'drop'].forEach(type => els.dropZone.addEventListener(type, event => {
    event.preventDefault();
    els.dropZone.classList.remove('dragover');
  }));
  els.dropZone.addEventListener('drop', event => addFiles(event.dataTransfer.files));
  els.removeFile.addEventListener('click', () => removeItem(state.activeIndex));
  els.rotateFile.addEventListener('click', () => rotateItem(state.activeIndex));

  els.modeTabs.forEach(tab => tab.addEventListener('click', () => switchMode(tab.dataset.mode)));
  els.quickSizes.forEach(button => button.addEventListener('click', () => {
    els.targetSize.value = button.dataset.size;
    els.quickSizes.forEach(item => item.classList.toggle('selected', item === button));
    clearResults();
  }));
  els.targetSize.addEventListener('input', () => {
    els.quickSizes.forEach(button => button.classList.toggle('selected', Number(button.dataset.size) === Number(els.targetSize.value)));
    clearResults();
  });
  els.keepDimensions.addEventListener('change', clearResults);

  els.percentage.addEventListener('input', () => { updatePercentageUI(); clearResults(); });
  els.quickPercents.forEach(button => button.addEventListener('click', () => {
    els.percentage.value = button.dataset.percent;
    updatePercentageUI();
    clearResults();
  }));

  els.presetSelect.addEventListener('change', () => {
    if (els.presetSelect.value !== 'custom') {
      const [width, height] = els.presetSelect.value.split('x');
      els.widthInput.value = width;
      els.heightInput.value = height;
      state.ratioLocked = true;
      els.ratioLock.classList.add('active');
      els.ratioLock.setAttribute('aria-pressed', 'true');
    }
    clearResults();
  });
  els.ratioLock.addEventListener('click', () => {
    state.ratioLocked = !state.ratioLocked;
    els.ratioLock.classList.toggle('active', state.ratioLocked);
    els.ratioLock.setAttribute('aria-pressed', String(state.ratioLocked));
    els.presetSelect.value = 'custom';
    clearResults();
  });
  els.widthInput.addEventListener('input', () => {
    els.presetSelect.value = 'custom';
    if (state.ratioLocked && state.originalWidth) {
      els.heightInput.value = Math.max(1, Math.round(Number(els.widthInput.value || 1) * state.originalHeight / state.originalWidth));
    }
    clearResults();
  });
  els.heightInput.addEventListener('input', () => {
    els.presetSelect.value = 'custom';
    if (state.ratioLocked && state.originalHeight) {
      els.widthInput.value = Math.max(1, Math.round(Number(els.heightInput.value || 1) * state.originalWidth / state.originalHeight));
    }
    clearResults();
  });
  els.formatSelect.addEventListener('change', () => { updateQualityUI(); clearResults(); });
  els.qualityInput.addEventListener('input', () => { updateQualityUI(); clearResults(); });
  els.quickQualities.forEach(button => button.addEventListener('click', () => {
    els.qualityInput.value = button.dataset.quality;
    updateQualityUI();
    clearResults();
  }));
  els.processButton.addEventListener('click', processImages);

  els.previewTabs.forEach(tab => tab.addEventListener('click', () => {
    if (!tab.disabled) showPreview(tab.dataset.preview);
  }));
  els.compareSlider.addEventListener('input', () => {
    els.compareResultWrap.style.clipPath = `inset(0 ${100 - Number(els.compareSlider.value)}% 0 0)`;
  });
  els.checkerToggle.addEventListener('click', () => {
    const active = els.previewStage.classList.toggle('checker');
    els.checkerToggle.setAttribute('aria-pressed', String(active));
  });
  els.downloadButton.addEventListener('click', downloadResults);

  window.addEventListener('beforeunload', () => {
    revokeUrl('objectUrl');
    state.results.forEach(result => URL.revokeObjectURL(result.url));
    if (state.bitmap?.close) state.bitmap.close();
  });

  applyPagePreset();
})();
