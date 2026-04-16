# 💍 Nikah Invitation Website
## Zikra Fatima ♥ Tausif Lakha — 9 May 2026

A premium, cinematic, fully responsive Nikah invitation website with a luxurious white and gold Islamic aesthetic.

---

## 📁 Folder Structure

```
nikah-invitation/
├── index.html          ← Main HTML file (open this in browser)
├── css/
│   ├── reset.css       ← CSS reset & base styles
│   ├── style.css       ← Main styles (layout, components, colors)
│   └── animations.css  ← All animation keyframes & transitions
├── js/
│   ├── particles.js    ← Golden dust particle system
│   ├── animations.js   ← Scroll-triggered reveal animations
│   ├── countdown.js    ← Live countdown timer
│   ├── music.js        ← Background music toggle
│   └── main.js         ← General init & utilities
├── assets/
│   └── music.mp3       ← ⬅ PLACE YOUR MUSIC FILE HERE
└── README.md           ← This file
```

---

## 🚀 How to Run

### Option 1 — Direct Open
Simply double-click `index.html` to open in your browser.

### Option 2 — VS Code Live Server (Recommended)
1. Open the `nikah-invitation` folder in VS Code
2. Install the **Live Server** extension (if not already installed)
3. Right-click `index.html` → **"Open with Live Server"**
4. The site opens at `http://127.0.0.1:5500`

> Live Server is recommended because the Google Maps iframe may be blocked with `file://` protocol in some browsers.

---

## 🎵 Adding Background Music

1. Get a soft nasheed or anasheed MP3 (royalty-free)
2. Rename it to `music.mp3`
3. Place it in the `assets/` folder
4. The music button will now work — tap it to play!

Suggested search: *"royalty free nasheed instrumental"* on YouTube Audio Library or FreeSound.org

---

## 🗺️ Map Note

The Google Maps embed searches for **"Sarah Celebration Venue"**.

If the venue has a specific address or Google Maps link:
1. Open Google Maps → find your venue
2. Click Share → Embed a map → copy the `src` URL
3. Replace the `src` in the `<iframe>` inside `index.html`
4. Also update the `href` on the **"Open in Google Maps"** button

---

## 🎨 Customization

### Colors — Edit `css/style.css` top section:
```css
:root {
  --gold:      #D4AF37;   /* Main gold */
  --gold-light:#E6C97A;   /* Light gold */
  --ivory:     #F8F6F2;   /* Background ivory */
}
```

### Fonts — Already loaded via Google Fonts:
- **Cinzel** — headings (regal, formal)
- **Cormorant Garamond** — body text (elegant, literary)
- **Poppins** — labels & UI (clean, modern)

### Countdown Target Date — Edit `js/countdown.js`:
```javascript
const TARGET = new Date('2026-05-09T17:30:00').getTime();
// Change date/time as needed
```

---

## 📱 Mobile-First

The site is fully responsive and optimized for mobile:
- Single-column layout on phones
- Large tap targets (min 44px)
- Lightweight particle system on mobile
- Scroll-friendly map embed
- Touch-friendly music button

---

## ✅ Browser Support

- Chrome / Edge (latest) ✓
- Firefox (latest) ✓
- Safari iOS (latest) ✓
- Android Chrome ✓

---

## 🤲 Made with love for Zikra Fatima & Tausif Lakha
### Fatima Family & Lakha Family — May 2026
