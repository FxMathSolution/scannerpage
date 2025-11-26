# Aether IoT - Futuristic Landing Page

A premium, high-performance landing page for an IoT solutions provider, featuring a glassmorphism design, dynamic blog, and interactive widgets.

## 🚀 Features

### 1. **Modern UI/UX**
*   **Futuristic Design:** Dark mode with neon cyan/purple accents and glassmorphism effects.
*   **Animations:** Scroll-reveal animations, glowing cursor, and smooth transitions.
*   **Responsive:** Fully optimized for desktop, tablet, and mobile devices.

### 2. **Dynamic Blog System**
*   **JSON-Based:** No database required. All posts are stored in `blog.json`.
*   **Auto-Rendering:** `blog.html` automatically lists all posts, and `post.html` displays individual articles.
*   **Management Script:** Includes `add_post.py` to easily add new articles via terminal.

### 3. **Interactive Widgets**
*   **Promo Popup:** A configurable modal that appears once per session to offer deals.
*   **Floating Social Widget:** An expandable button in the bottom-right for quick contact via Telegram, WhatsApp, and Email.
*   **Contact Form:** Integrated with **Formspree** for real email delivery without a backend.

---

## ⚙️ Configuration

You can customize the site without touching the code by editing these JSON files:

### 1. **Blog Posts (`blog.json`)**
Add or edit articles here.
```json
[
    {
        "id": "my-new-post",
        "title": "My New Post",
        "date": "Nov 26, 2025",
        "summary": "Short description...",
        "content": "<p>Full content here...</p>",
        "image": "assets/image.png"
    }
]
```
*Tip: Use `python3 add_post.py` to add posts automatically.*

### 2. **Promo Popup (`promo.json`)**
Control the popup message and visibility.
```json
{
    "enabled": true,
    "title": "Special Offer!",
    "message": "Get 20% OFF...",
    "buttonText": "Claim Now",
    "buttonLink": "#contact"
}
```

### 3. **Social Links (`social.json`)**
Update your contact links for the floating widget.
```json
{
    "telegram": "https://t.me/yourusername",
    "whatsapp": "https://wa.me/1234567890",
    "email": "mailto:contact@aetheriot.com"
}
```

---

## 🛠️ How to Run Locally

Since this project uses `fetch()` to load JSON files, it requires a local server (browsers block local file access by default).

1.  Open your terminal in the project folder.
2.  Run the Python server:
    ```bash
    python3 -m http.server
    ```
3.  Open your browser to: **http://localhost:8000**

---

## 🌐 Deployment

This site is **Static**, meaning it can be hosted for free on **GitHub Pages**, **Netlify**, or **Vercel**.

**GitHub Pages:**
1.  Upload the folder to a GitHub repository.
2.  Go to **Settings > Pages**.
3.  Select `main` branch and save.

---

## 📂 File Structure

```
Aether_IoT/
├── assets/          # Images and icons
├── index.html       # Main landing page
├── styles.css       # All styling
├── script.js        # Logic for blog, popup, and widgets
├── blog.html        # Blog listing page
├── post.html        # Single blog post template
├── blog.json        # Blog data
├── promo.json       # Popup config
├── social.json      # Social widget config
└── add_post.py      # Script to add blog posts
```
