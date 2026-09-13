# Marie Rose Shop

**A multilingual, offline-capable e-commerce front end for a neighbourhood grocery shop in Kigali, Rwanda.**

Live site: `https://murokorepierrot.github.io/marie-rose-shop/`

---

## Project Overview

Marie Rose Shop is a real-world web project built for a family-run grocery shop in Kabuye, Jabana Sector, Gasabo District, Kigali. Rather than a generic e-commerce template, the site is designed around how this specific shop actually operates: customers browse products, build a shopping list, and place their order over WhatsApp — with cash or Mobile Money payment and an official EBM receipt collected in person at the shop.

The goal of this project was twofold:

1. **Build a genuinely useful tool** for a small business that has no online storefront, no delivery infrastructure, and serves a multilingual customer base (English, Kinyarwanda, and French).
2. **Practice full front-end ownership** — structuring a data-driven product catalog, writing responsive layouts by hand, and reasoning about real constraints like slow network conditions, low-end devices, and offline access — all without relying on a framework to do the thinking for me.

This repository represents that build: a static site, deployed on GitHub Pages, that behaves like an installable app.

---

## Features

- **Data-driven product catalog.** All ~90 products across 4 categories (Grains & Staples, Beverages, Cooking Essentials, Household & Care) live in a single `products.json` file. A small renderer script (`products-render.js`) builds the product cards and category sections from that data at page load, so adding or repricing a product never requires touching HTML.
- **Multilingual support (EN / RW / FR).** Every piece of customer-facing copy — navigation, product names and descriptions, FAQs, testimonials, forms, and the chat assistant's replies — exists in all three languages and switches instantly via a language toggle, with the preference remembered on return visits.
- **Live product search.** An instant-filter search bar with autosuggestions scrolls to and highlights matching products across all categories, including matches on hidden search-alias keywords.
- **Digital shopping list → WhatsApp checkout.** Since the shop has no payment gateway or delivery service, customers build a shopping list in the browser (persisted via `localStorage`), which calculates a running total and quantity per item, and hands off to WhatsApp with the order pre-filled as a message — the actual sale and payment (cash or Mobile Money) happen in person.
- **EBM receipt transparency, built into the experience.** Rwanda's Electronic Billing Machine (EBM) system is central to how this shop operates legally and transparently. The site treats "every sale comes with an official EBM receipt" as a first-class trust signal — reinforced in the FAQ, the shopping list checkout note, and the site's chat assistant — rather than burying it in fine print. *(Note: this is a customer-facing policy and messaging feature, not a live integration with EBM hardware or Rwanda Revenue Authority systems.)*
- **Installable Progressive Web App (PWA).** A service worker precaches core assets and serves pages with a network-first strategy (falling back to cache when offline), so the site keeps working on an unreliable connection — a realistic condition for many customers in the area. An install banner lets users add the site to their home screen like a native app.
- **Rule-based multilingual shop assistant.** A lightweight, client-side FAQ chatbot answers common questions (hours, location, payment methods, delivery policy, product availability) in whichever of the three languages the user has selected — including basic guardrails against prompt-injection-style and abusive inputs. It is a scripted response system, not a call to an external AI/LLM API.
- **Interactive galleries and carousels.** Auto-advancing, swipeable image carousels for the shop interior, the team, and the "About" story, plus a full-screen lightbox viewer.
- **Fully responsive, hand-tuned layout.** Every section — product grids, carousels, forms, the chat widget — was tested and refined at desktop, tablet, and phone breakpoints without a CSS framework doing the layout work.

---

## Technologies Used

- **HTML5** — semantic structure, PWA manifest linkage, and structured data (Schema.org `GroceryStore`/`Person` JSON-LD) for search engine visibility.
- **CSS3** — hand-written, using CSS custom properties (design tokens) for a consistent color/spacing/typography system, CSS Grid and Flexbox for layout, and media queries for full responsiveness. *No CSS framework (e.g. Bootstrap, Tailwind) was used — all layout and styling logic is original.*
- **Vanilla JavaScript (ES5/ES6, no framework)** — DOM rendering from JSON data, search/filter logic, carousel and lightbox behavior, `localStorage`-backed state (shopping list, language preference), and a Service Worker for offline support and caching strategy.
- **JSON** — as the single source of truth for the product catalog, decoupling content updates from code changes.
- **GitHub Pages** — static hosting and deployment.

---

## AI Collaboration Statement

I used Claude (Anthropic's AI assistant) as a development tool throughout this project, in the same spirit that a professional developer uses a linter, a pair programmer, or a code reviewer — to move faster and catch mistakes, not to replace my own design decisions or understanding of the codebase.

Concretely, AI assistance was used to:

- Diagnose and fix bugs (for example, tracing a broken product catalog on the live site back to a `SyntaxError` caused by a missing/misconfigured file, by reading browser console output together)
- Refactor the shopping list from a simple item-name list into a proper quantity-and-price-aware structure with a live total, while preserving existing behavior (WhatsApp handoff, copy-to-clipboard, persistence)
- Review and tighten CSS and JavaScript I had already written, and explain trade-offs (e.g., service worker caching strategies, why a synchronous XHR was used deliberately for the product renderer)
- Draft and refine this documentation

Every change was reviewed, tested in the browser, and understood before being committed — I can explain what each part of this codebase does and why. I see this as consistent with, not a departure from, my background in Software Development: knowing how to use modern tools effectively, verify their output, and remain accountable for the final product is itself a core software engineering skill.

---

## How to Run It Locally

This is a static site with no build step and no server-side dependencies.

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/marie-rose-shop.git
   cd marie-rose-shop
   ```

2. **Serve it locally** (opening `index.html` directly works for browsing, but a local server is recommended so the Service Worker and `fetch`/XHR calls to `products.json` behave exactly as they do in production):

   Using Python:
   ```bash
   python3 -m http.server 8000
   ```

   Using Node (with `npx`):
   ```bash
   npx serve .
   ```

3. **Open in your browser**
   ```
   http://localhost:8000
   ```

4. **To update products**, edit `products.json` — no HTML changes required. To deploy a change, remember to bump the cache-busting version strings in `index.html` (`?v=...`) and the `CACHE_VERSION` constant in `sw.js`, so returning visitors' browsers fetch the new files instead of a stale cached copy.

---

## Author

Built by **Gikundiro Pierrot** as a portfolio project demonstrating front-end web development for a real local business.
