/* ═══════════════════════════════════════════
   BESTUZHEV.TECH — Main Component
   ═══════════════════════════════════════════ */

import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // === Animations ready (1 second delay) ===
    const enableAnimations = () => {
      document.body.classList.add('animations-ready');
    };
    
    let animationsTimeout: ReturnType<typeof setTimeout>;
    
    if (document.readyState === 'complete') {
      animationsTimeout = setTimeout(enableAnimations, 1000);
    } else {
      const handleLoad = () => {
        animationsTimeout = setTimeout(enableAnimations, 1000);
      };
      window.addEventListener('load', handleLoad);
    }

    // === Scramble text effect ===
    const CHARS = 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0123456789!@#$%&*<>?/';
    
    const scrambleLine = (element: HTMLElement, duration: number) => {
      const text = element.getAttribute('data-text');
      if (!text) return;
      
      const chars = text.split('');
      const totalFrames = Math.round(duration / 16);
      let frame = 0;
      
      const fixed = new Array(chars.length).fill(false);
      
      const render = () => {
        let result = '';
        for (let i = 0; i < chars.length; i++) {
          if (fixed[i]) {
            result += chars[i];
          } else {
            result += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
        element.textContent = result;
      };
      
      const tick = () => {
        frame++;
        const progress = frame / totalFrames;
        
        const fixedCount = Math.floor(progress * chars.length);
        for (let i = 0; i < fixedCount; i++) {
          fixed[i] = true;
        }
        
        render();
        
        if (frame < totalFrames) {
          requestAnimationFrame(tick);
        } else {
          element.textContent = text;
        }
      };
      
      render();
      requestAnimationFrame(tick);
    };
    
    const startScramble = () => {
      const lines = document.querySelectorAll('.hero__scramble-line') as NodeListOf<HTMLElement>;
      if (!lines.length) return;
      
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        lines.forEach(line => {
          const text = line.getAttribute('data-text');
          if (text) line.textContent = text;
        });
        return;
      }
      
      lines.forEach((line, index) => {
        const duration = 1200 + index * 300;
        setTimeout(() => {
          scrambleLine(line, duration);
        }, index * 200);
      });
    };
    
    const scrambleObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          if (document.body.classList.contains('animations-ready')) {
            startScramble();
            scrambleObserver.disconnect();
          }
        }
      });
    });
    
    scrambleObserver.observe(document.body, { attributes: true });
    
    if (document.body.classList.contains('animations-ready')) {
      startScramble();
      scrambleObserver.disconnect();
    }

    // === Live clock (Barnaul timezone) ===
    const clockElement = document.getElementById('header-clock');
    let clockInterval: ReturnType<typeof setInterval> | null = null;
    
    if (clockElement) {
      const updateClock = () => {
        const now = new Date();
        const timeStr = new Intl.DateTimeFormat('ru-RU', {
          timeZone: 'Asia/Barnaul',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).format(now);
        clockElement.textContent = timeStr;
      };
      
      updateClock();
      clockInterval = setInterval(updateClock, 1000);
    }

    // Smooth scroll to contacts
    const ctaButton = document.querySelector('.btn-cta') as HTMLAnchorElement | null;
    const handleCtaClick = (e: Event) => {
      e.preventDefault();
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const offset = window.innerWidth <= 760 ? 160 : 320;
        const top = contactSection.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    };
    if (ctaButton) {
      ctaButton.addEventListener('click', handleCtaClick);
    }

    // Privacy modal logic
    const modal = document.getElementById('privacy-modal');
    const closeBtn = modal?.querySelector('.privacy-modal__close') as HTMLButtonElement | null;
    const overlay = modal?.querySelector('.privacy-modal__overlay') as HTMLDivElement | null;
    const trigger = document.querySelector('.privacy-link') as HTMLAnchorElement | null;
    let lastFocusedElement: Element | null = null;

    const openModal = () => {
      lastFocusedElement = document.activeElement;
      document.body.style.overflow = 'hidden';
      modal?.classList.add('active');
      modal?.setAttribute('aria-hidden', 'false');
      setTimeout(() => closeBtn?.focus(), 100);
    };

    const closeModal = () => {
      modal?.classList.remove('active');
      modal?.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocusedElement && lastFocusedElement instanceof HTMLElement) {
        lastFocusedElement.focus();
      }
    };

    const handleTriggerClick = (e: Event) => {
      e.preventDefault();
      openModal();
    };

    // Open modal on trigger click
    if (trigger) {
      trigger.addEventListener('click', handleTriggerClick);
    }

    // Close modal on close button click
    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    // Close modal on overlay click
    if (overlay) {
      overlay.addEventListener('click', closeModal);
    }

    // Close modal on Escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modal?.classList.contains('active')) {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleEscape);

    // Focus trap inside modal
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !modal?.classList.contains('active')) return;
      
      const focusable = modal?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0] as HTMLElement;
      const last = focusable[focusable.length - 1] as HTMLElement;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    modal?.addEventListener('keydown', handleTab);

    // Cleanup
    return () => {
      clearTimeout(animationsTimeout);
      scrambleObserver.disconnect();
      if (clockInterval) {
        clearInterval(clockInterval);
      }
      if (ctaButton) {
        ctaButton.removeEventListener('click', handleCtaClick);
      }
      if (trigger) {
        trigger.removeEventListener('click', handleTriggerClick);
      }
      if (closeBtn) {
        closeBtn.removeEventListener('click', closeModal);
      }
      if (overlay) {
        overlay.removeEventListener('click', closeModal);
      }
      document.removeEventListener('keydown', handleEscape);
      modal?.removeEventListener('keydown', handleTab);
    };
  }, []);

  return (
    <>
      {/* ═══════════════════════════════════════════
          1. HEADER
          ═══════════════════════════════════════════ */}
      <header className="site-header">
        <span className="header-left">роман бестужев</span>
        <span className="header-center" id="header-clock">03:00:45</span>
        <span className="header-right">веб-разработка.</span>
      </header>

      {/* ═══════════════════════════════════════════
          2. SIDE DETAILS (hidden on mobile, visible on desktop)
          ═══════════════════════════════════════════ */}
      <aside className="side-detail side-detail--left" aria-hidden="true">
        53.3477° n · 83.7777° e
      </aside>
      <aside className="side-detail side-detail--right" aria-hidden="true">
        656000 · барнаул
      </aside>

      {/* ═══════════════════════════════════════════
          MAIN CONTENT
          ═══════════════════════════════════════════ */}
      <main>
        {/* ═══════════════════════════════════════════
            3. HERO SECTION
            ═══════════════════════════════════════════ */}
        <section className="hero">
          {/* 3.1. SVG «404» */}
          <svg
            className="hero-svg"
            viewBox="0 0 420 160"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="404"
            role="img"
          >
            {/* Guide lines */}
            <line x1="210" y1="10" x2="210" y2="155" stroke="var(--hair)" strokeWidth="0.5" />
            <line x1="10" y1="80" x2="410" y2="80" stroke="var(--hair)" strokeWidth="0.5" />

            {/* Mirrored group */}
            <g transform="translate(420 0) scale(-1 1)">
              {/* Left four */}
              <path
                d="M 35 94 L 35 14 L 85 74 L 15 74"
                stroke="var(--ink)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              {/* Zero (oval) */}
              <path
                d="M 175 74 C 175 39, 195 19, 215 19 C 235 19, 255 39, 255 74 C 255 109, 235 129, 215 129 C 195 129, 175 109, 175 74 C 175 66, 177 59, 180 54"
                stroke="var(--ink)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              {/* Right four */}
              <path
                d="M 355 92 L 355 12 L 405 72 L 335 72"
                stroke="var(--ink)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              {/* Wavy line */}
              <path
                d="M 20 152 Q 60 144, 100 152 Q 140 160, 180 152 Q 220 144, 260 152 Q 300 160, 340 152 Q 370 146, 400 152"
                stroke="var(--ink)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </g>
          </svg>

          {/* 3.2. Hero text with scramble effect */}
          <div className="hero__scramble" aria-label="Пока тут ничего нет, но не переживайте — я найду для вас решение.">
            <div className="hero__scramble-line" data-text="ПОКА ТУТ НИЧЕГО НЕТ,"></div>
            <div className="hero__scramble-line" data-text="НО НЕ ПЕРЕЖИВАЙТЕ — Я НАЙДУ ДЛЯ ВАС РЕШЕНИЕ."></div>
          </div>

          {/* 3.3. CTA Button */}
          <a href="#contact" className="btn-cta" aria-label="Перейти к контактам">
            Связаться
          </a>

          {/* 3.4. Privacy trigger text */}
          <p className="privacy-trigger">
            Нажимая кнопку, вы соглашаетесь с{' '}
            <a href="#" className="privacy-link">
              политикой конфиденциальности
            </a>
          </p>
        </section>

        {/* ═══════════════════════════════════════════
            4. CONTACTS SECTION
            ═══════════════════════════════════════════ */}
        <section id="contact" className="contacts">
          {/* 4.1. Section title */}
          <h2 className="contact-title">найдём решение вместе.</h2>

          {/* 4.2. Subtitle */}
          <p className="contact-subtitle">Отвечу вам в течение дня</p>

          {/* 4.3. Contact blocks */}

          {/* Block 1 — Phone */}
          <div className="contact-row">
            <p className="contact-label">Телефон</p>
            <span className="contact-value">+7 921 666 90 66</span>
            <a
              className="contact-action"
              href="tel:+79216669066"
              aria-label="Позвонить по номеру +7 921 666 90 66"
            >
              Позвонить <span className="arrow">→</span>
            </a>
          </div>

          {/* Block 2 — Email */}
          <div className="contact-row">
            <p className="contact-label">Почта</p>
            <span className="contact-value">fullstack@bestuzhev.tech</span>
            <a
              className="contact-action"
              href="mailto:fullstack@bestuzhev.tech"
              aria-label="Написать на почту fullstack@bestuzhev.tech"
            >
              Написать <span className="arrow">→</span>
            </a>
          </div>

          {/* Block 3 — Telegram */}
          <div className="contact-row">
            <p className="contact-label">Telegram</p>
            <span className="contact-value">rbestuzhev</span>
            <a
              className="contact-action"
              href="https://t.me/rbestuzhev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Написать в Telegram @rbestuzhev"
            >
              В Telegram <span className="arrow">→</span>
            </a>
          </div>

          {/* Block 4 — MAX */}
          <div className="contact-row">
            <p className="contact-label">MAX</p>
            <span className="contact-value">Роман Бестужев</span>
            <a
              className="contact-action"
              href="https://max.ru/u/f9LHodD0cOKhOQcmdKaXFYlTU4PCgvV05zr5zYjPgYNDeRWT6wqlngRQNXk"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Написать в MAX Роману Бестужеву"
            >
              В MAX <span className="arrow">→</span>
            </a>
          </div>

          {/* 4.4. Italic note */}
          <p className="contact-note">
            эта страница — временная заглушка: постоянный сайт уже в разработке.
          </p>
        </section>
      </main>

      {/* ═══════════════════════════════════════════
          5. FOOTER
          ═══════════════════════════════════════════ */}
      <footer className="site-footer">
        <span>роман бестужев — веб-разработка.</span>
        <span>барнаул, алтайский край · 656000</span>
      </footer>

      {/* ═══════════════════════════════════════════
          6. PRIVACY MODAL
          ═══════════════════════════════════════════ */}
      <div
        id="privacy-modal"
        className="privacy-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-title"
        aria-hidden="true"
      >
        <div className="privacy-modal__overlay"></div>
        <div className="privacy-modal__content">
          <button className="privacy-modal__close" aria-label="Закрыть окно политики конфиденциальности">
            &times;
          </button>
          <h2 id="privacy-title" className="privacy-modal__title">
            политика конфиденциальности
          </h2>
          <div className="privacy-modal__text">
            <p>
              <strong>01 — Цель.</strong> Обработка ваших обращений через формы связи на сайте
              bestuzhev.tech. Мы собираем данные исключительно для ответа на ваш запрос.
            </p>
            <p>
              <strong>02 — Данные.</strong> Мы обрабатываем только те данные, которые вы
              добровольно предоставляете: имя, телефон, e-mail, сообщение.
            </p>
            <p>
              <strong>03 — Конфиденциальность.</strong> Ваши данные не передаются третьим лицам
              и не используются для маркетинговых рассылок без вашего согласия.
            </p>
            <p>
              <strong>04 — Хранение.</strong> Данные хранятся не дольше, чем это необходимо
              для обработки вашего обращения, после чего удаляются.
            </p>
            <p>
              <strong>05 — Права.</strong> Вы вправе запросить удаление ваших данных, отправив
              запрос на fullstack@bestuzhev.tech.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
