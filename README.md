# Passion Creek Church - Website

A modern, responsive church website replica inspired by [Passion Creek Church](https://passioncreek.church/) in Queen Creek, Arizona.

## 🌟 Key Features

- **Responsive Design**: Designed with a curated color palette (signature crimson `#a71e30`, dark charcoal `#111111`, and clean light surfaces) and typography using Google Fonts (`Outfit` & `Inter`).
- **Interactive Experience**:
  - Full-screen slide-out mobile drawer navigation.
  - Sticky sub-navigation bar with active section scrollspy.
  - Video lightbox modal supporting YouTube embeds.
  - Interactive **Plan Your Visit** modal and form validation with instant toast confirmations.
  - Interactive **Giving Card** supporting one-time and recurring donations, preset buttons, and fund selection.
  - Expandable **FAQ accordions** with smooth CSS transitions.
- **Complete Page Suite**:
  - `index.html` - Homepage (Hero, 3 Invitations, Sunday Gathering, Together Groups, Practices & Podcast, Upcoming Events, Footer).
  - `sundays.html` - Sunday morning walkthrough, ancient rhythms, kids ministry, and FAQs.
  - `about.html` - Vision, church history from theater to building, Discipleship Pathway, and pastoral team.
  - `teaching.html` - Latest sermon video player, podcast hub, and message series archive.
  - `groups.html` - Together Groups living room community, directory by location/night, and host contact form.
  - `give.html` - Interactive giving calculator, four ways to give, and biblical convictions of generosity.

## 🚀 Getting Started

No build tools or heavy frameworks required. You can serve the static files with any local HTTP server:

```bash
# Using Python
python -m http.server 8080

# Or using Node.js / npx
npx serve .
```

Open `http://localhost:8080` in your web browser.

## 📁 Project Structure

```
├── css/
│   └── style.css       # Core design system, variables, components & responsive queries
├── js/
│   └── main.js         # Navigation, modals, scrollspy, interactive widgets & toast notifications
├── index.html          # Homepage
├── sundays.html        # Sundays & Plan Your Visit
├── about.html          # About, Vision & Leadership
├── teaching.html       # Sermons & Media
├── groups.html         # Together Groups directory
├── give.html           # Generosity & Online Giving
└── README.md
```

## 📜 License

MIT License.
