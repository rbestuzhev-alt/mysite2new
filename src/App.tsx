/* ═══════════════════════════════════════════
   BESTUZHEV.TECH — Main Component
   ═══════════════════════════════════════════ */

function App() {
  return (
    <>
      {/* ═══ HEADER ═══ */}
      <header className="site-header">
        <span className="header-left">роман бестужев</span>
        <span className="header-center">03:00:45</span>
        <span className="header-right">веб-разработка.</span>
      </header>

      {/* ═══ SIDE DETAILS ═══ */}
      <aside className="side-detail side-detail--left" aria-hidden="true">
        53.3477° n · 83.7777° e
      </aside>
      <aside className="side-detail side-detail--right" aria-hidden="true">
        656000 · барнаул
      </aside>

      {/* ═══ MAIN CONTENT ═══ */}
      <main>
        {/* ═══ HERO SECTION ═══ */}
        <section className="hero">
          {/* SVG 404 */}
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

          {/* Hero text */}
          <p className="hero-text">
            Пока тут ничего нет,<br />
            но не переживайте — я найду для вас решение.
          </p>

          {/* CTA Button */}
          <a href="#contact" className="btn-cta" aria-label="Перейти к контактам">
            Связаться
          </a>

          {/* Privacy note */}
          <p className="privacy-trigger">
            Нажимая кнопку, вы соглашаетесь с{' '}
            <a href="#" className="privacy-link">
              политикой конфиденциальности
            </a>
          </p>
        </section>

        {/* ═══ CONTACTS SECTION ═══ */}
        <section id="contact" className="contacts">
          <h2 className="contact-title">найдём решение вместе.</h2>
          <p className="contact-subtitle">Отвечу вам в течение дня</p>

          {/* Contact Row 1 — Phone */}
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

          {/* Contact Row 2 — Email */}
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

          {/* Contact Row 3 — Telegram */}
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

          {/* Contact Row 4 — MAX */}
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

          {/* Italic note */}
          <p className="contact-note">
            эта страница — временная заглушка: постоянный сайт уже в разработке.
          </p>
        </section>
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="site-footer">
        <span>роман бестужев — веб-разработка.</span>
        <span>барнаул, алтайский край · 656000</span>
      </footer>

      {/* ═══ PRIVACY MODAL (hidden, JS will be added later) ═══ */}
      <div
        id="privacy-modal"
        className="privacy-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-title"
      >
        <div className="privacy-modal__overlay"></div>
        <div className="privacy-modal__content">
          <button className="privacy-modal__close" aria-label="Закрыть">
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
