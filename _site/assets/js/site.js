'use strict';
(() => {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.getElementById('site-navigation');
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
      menu.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      menu.focus();
    }
  });
  // Keep the existing dental library accordions usable without the old Vue/jQuery bundle.
  document.querySelectorAll('.knowledge-article [data-toggle="collapse"]').forEach(button => {
    const target = document.querySelector(button.dataset.target);
    if (!target) return;
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(open));
      target.classList.toggle('show', open);
    });
  });

  const galleryRoot = document.querySelector('[data-gallery]');
  const cards = Array.from(document.querySelectorAll('.gallery-card'));
  const filters = Array.from(document.querySelectorAll('[data-filter]'));
  const search = document.getElementById('gallery-search');
  const allowed = new Set(['all', 'dental', 'aesthetics', 'doctors', 'training', 'practice']);
  const params = new URLSearchParams(location.search);
  let category = allowed.has(params.get('category')) ? params.get('category') : 'all';
  if (search) search.value = params.get('q') || '';
  function filterGallery(updateUrl = true) {
    if (!galleryRoot) return;
    const words = search.value.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
    let count = 0;
    cards.forEach(card => {
      const matches = (category === 'all' || card.dataset.category === category)
        && words.every(word => card.dataset.search.includes(word));
      card.hidden = !matches;
      if (matches) count++;
    });
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
    document.getElementById('gallery-count').textContent = `Showing ${count} of ${cards.length} photos`;
    document.getElementById('gallery-empty').hidden = count !== 0;
    if (updateUrl) {
      const url = new URL(location.href);
      category === 'all' ? url.searchParams.delete('category') : url.searchParams.set('category', category);
      search.value.trim() ? url.searchParams.set('q', search.value.trim()) : url.searchParams.delete('q');
      history.replaceState(null, '', url);
    }
  }
  filters.forEach(button => button.addEventListener('click', () => {
    category = button.dataset.filter;
    filterGallery();
  }));
  search?.addEventListener('input', () => filterGallery());
  document.getElementById('gallery-reset')?.addEventListener('click', () => {
    category = 'all'; search.value = ''; filterGallery(); search.focus();
  });
  filterGallery(false);

  const viewer = document.getElementById('gallery-viewer');
  if (viewer && typeof viewer.showModal === 'function') {
    const photos = JSON.parse(document.getElementById('gallery-data').textContent);
    const byId = new Map(photos.map(photo => [photo.id, photo]));
    const image = document.getElementById('viewer-image');
    const frame = document.getElementById('viewer-image-frame');
    const stage = viewer.querySelector('.viewer-stage');
    const zoom = document.getElementById('viewer-zoom');
    let sequence = [];
    let active = 0;
    let lastTrigger = null;
    function fitImage() {
      const photo = sequence[active];
      if (!photo) return;
      const fitWidth = Math.min(stage.clientWidth - 16, (stage.clientHeight - 4) * photo.width / photo.visibleHeight);
      frame.style.setProperty('--fit-width', `${Math.max(80, fitWidth)}px`);
      frame.style.setProperty('--full-width', `${Math.max(photo.width, stage.clientWidth - 16)}px`);
    }
    function render() {
      const photo = sequence[active];
      if (!photo) return;
      image.src = photo.image;
      image.alt = photo.title;
      frame.style.setProperty('--ratio', `${photo.width} / ${photo.visibleHeight}`);
      frame.style.setProperty('--offset', `${photo.offset}%`);
      document.getElementById('viewer-title').textContent = photo.title;
      document.getElementById('viewer-description').textContent = photo.description;
      document.getElementById('viewer-category').textContent = photo.label;
      document.getElementById('viewer-position').textContent = `${active + 1} / ${sequence.length}`;
      document.getElementById('viewer-original').href = photo.image;
      stage.classList.remove('is-zoomed');
      zoom.setAttribute('aria-pressed', 'false');
      zoom.textContent = 'Enlarge text';
      stage.scrollTo(0, 0);
      document.getElementById('viewer-prev').disabled = sequence.length < 2;
      document.getElementById('viewer-next').disabled = sequence.length < 2;
      requestAnimationFrame(fitImage);
    }
    function step(direction) { active = (active + direction + sequence.length) % sequence.length; render(); }
    document.querySelectorAll('[data-gallery-id]').forEach(link => link.addEventListener('click', event => {
      const photo = byId.get(link.dataset.galleryId);
      if (!photo) return;
      event.preventDefault();
      const displayed = galleryRoot ? cards.filter(card => !card.hidden).map(card => card.querySelector('[data-gallery-id]').dataset.galleryId) : Array.from(document.querySelectorAll('[data-gallery-id]')).map(a => a.dataset.galleryId);
      sequence = [...new Set(displayed)].map(id => byId.get(id)).filter(Boolean);
      active = sequence.findIndex(p => p.id === photo.id);
      if (active < 0) { sequence = [photo]; active = 0; }
      lastTrigger = link;
      viewer.showModal();
      document.body.classList.add('viewer-is-open');
      render();
      document.getElementById('viewer-close').focus();
    }));
    function close() { viewer.close(); }
    document.getElementById('viewer-close').addEventListener('click', close);
    document.getElementById('viewer-prev').addEventListener('click', () => step(-1));
    document.getElementById('viewer-next').addEventListener('click', () => step(1));
    zoom.addEventListener('click', () => {
      const enlarged = stage.classList.toggle('is-zoomed');
      zoom.setAttribute('aria-pressed', String(enlarged));
      zoom.textContent = enlarged ? 'Fit image' : 'Enlarge text';
      stage.scrollTo(0, 0);
    });
    viewer.addEventListener('close', () => {
      document.body.classList.remove('viewer-is-open');
      lastTrigger?.focus({preventScroll:true});
    });
    viewer.addEventListener('click', event => {
      const rect = viewer.getBoundingClientRect();
      if (event.target === viewer && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) close();
    });
    viewer.addEventListener('keydown', event => {
      if (stage.classList.contains('is-zoomed')) return;
      if (event.key === 'ArrowRight') { event.preventDefault(); step(1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); step(-1); }
    });
    window.addEventListener('resize', fitImage);
    if (typeof ResizeObserver !== 'undefined') new ResizeObserver(fitImage).observe(stage);
  }

  const form = document.getElementById('appointment-form');
  if (form) {
    const doctor = params.get('doctor');
    if (['haris', 'sufia'].includes(doctor)) form.elements.doctor.value = doctor;
    const today = new Date();
    form.elements.date.min = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
    if (typeof window.flatpickr === 'function') {
      const clearDate = document.getElementById('clear-appointment-date');
      const picker = window.flatpickr(form.elements.date, {
        altInput: true,
        altFormat: 'j F Y',
        dateFormat: 'Y-m-d',
        ariaDateFormat: 'F j, Y',
        minDate: 'today',
        disableMobile: true,
        allowInput: false,
        onReady: (_dates, _value, instance) => {
          instance.altInput.id = 'appointment-date-display';
          instance.altInput.placeholder = 'Choose a date';
          document.getElementById('appointment-date-label').htmlFor = instance.altInput.id;
        },
        onChange: dates => { clearDate.hidden = dates.length === 0; }
      });
      clearDate.addEventListener('click', () => {
        picker.clear();
        picker.altInput.focus();
      });
    }
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const doctorNames = {any:'No preference',haris:'Dr. Haris',sufia:'Dr. Sufia'};
      const message = ['Hello Haris Family Dentistry and Cosmetic Center,', 'I would like to request an appointment.', '', `Name: ${String(data.get('name')).trim()}`, `Mobile: ${String(data.get('phone')).trim()}`, `Doctor: ${doctorNames[data.get('doctor')]}`, `Service: ${data.get('service')}`, `Preferred date: ${data.get('date') || 'Please suggest a date'}`, data.get('note') ? `Note: ${String(data.get('note')).trim()}` : '', '', 'Please confirm an available date and time.'].filter(line => line !== '').join('\n');
      const email = event.submitter?.value === 'email';
      const url = email ? `mailto:${form.dataset.email}?subject=${encodeURIComponent('Appointment request — Haris Family Dentistry')}&body=${encodeURIComponent(message)}` : `https://wa.me/${form.dataset.phone}?text=${encodeURIComponent(message)}`;
      document.getElementById('appointment-status').textContent = email ? 'Your email app will open with the request. Send the email to contact the clinic.' : 'Your request is opening in WhatsApp. Send the message there, then wait for the clinic to confirm your visit.';
      if (email) location.href = url;
      else {
        window.open(url, '_blank', 'noopener,noreferrer');
        // The visible link also works if the browser blocks a new window.
        const fallback = document.createElement('a');
        fallback.href = url; fallback.target = '_blank'; fallback.rel = 'noopener noreferrer';
        fallback.textContent = 'Open your request in WhatsApp ↗';
        const status = document.getElementById('appointment-status');
        status.append(document.createElement('br'), fallback);
      }
    });
  }
})();
