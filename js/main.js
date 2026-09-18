// ===== Header scroll state =====
const header = document.getElementById('header');
function onScroll() {
  if (window.scrollY > 12) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== Mobile menu =====
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('[data-reveal]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => observer.observe(el));

// ===== Contact form (demo only — no backend wired up) =====
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const subject = form.subject.value;
    const message = form.message.value.trim();

    if (!name || !phone) {
      formNote.textContent = 'Preencha nome e telefone para continuar.';
      formNote.style.color = '#e6968f';
      return;
    }

    const text = `Olá, Dra. Ana Cíntia! Meu nome é ${name}.%0AAssunto: ${subject}%0ATelefone: ${phone}%0A${message ? 'Mensagem: ' + message : ''}`;
    const waUrl = `https://wa.me/5587999931220?text=${encodeURIComponent(
      `Olá, Dra. Ana Cíntia! Meu nome é ${name}.\nAssunto: ${subject}\nTelefone: ${phone}${message ? '\nMensagem: ' + message : ''}`
    )}`;

    formNote.textContent = 'Abrindo o WhatsApp para concluir o envio...';
    formNote.style.color = '';
    window.open(waUrl, '_blank', 'noopener');
    form.reset();
  });
}

// ===== FAQ accordion (smooth height animation) =====
document.querySelectorAll('.faq-item').forEach(item => {
  const summary = item.querySelector('summary');
  const content = item.querySelector('.faq-content');

  if (item.open) content.style.height = 'auto';

  summary.addEventListener('click', (e) => {
    e.preventDefault();
    if (item.classList.contains('is-animating')) return;
    item.classList.add('is-animating');

    if (item.open) {
      content.style.height = content.scrollHeight + 'px';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => { content.style.height = '0px'; });
      });
      content.addEventListener('transitionend', function handler() {
        item.open = false;
        item.classList.remove('is-animating');
        content.removeEventListener('transitionend', handler);
      }, { once: true });
    } else {
      item.open = true;
      content.style.height = '0px';
      const target = content.scrollHeight;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => { content.style.height = target + 'px'; });
      });
      content.addEventListener('transitionend', function handler() {
        content.style.height = 'auto';
        item.classList.remove('is-animating');
        content.removeEventListener('transitionend', handler);
      }, { once: true });
    }
  });
});

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();
