# Soft & Creative Personal Portfolio 💜

A simple one-page personal portfolio inspired by the **layout** of the reference website: Home → About → Service → Portfolio → Contact. This is original HTML, CSS and JavaScript, not copied source code.

## 1. Open the project

1. Extract the ZIP.
2. Open the `soft-creative-portfolio` folder in **VS Code**.
3. Open `index.html` using the **Live Server** extension, or double-click the file to preview in your browser.
4. You do not need Node.js, npm, Vue or any installation to start this version.

## 2. Project files

- `index.html` — website text, sections and layout.
- `style.css` — colours, font, card designs, mobile styles.
- `script.js` — mobile navigation, active sections, contact form.
- `assets/` — add your photo, resume and screenshots here.

## 3. Update content

- `index.html`: Find `Syamimi Adlina` and edit display name/headline/bio if needed.
- `index.html`: Update About, skills, project descriptions.
- Replace the `SA` placeholders with an actual portrait when you are ready.
- For project screenshots, add your own images to `assets/`; replace the decorative `.project-image` content with an `<img src="assets/your-project.png" alt="Project screenshot" />` and set `width:100%;height:100%;object-fit:cover` in CSS.
- `script.js`: Change `CONTACT_EMAIL` to an email address you are comfortable publishing.
- Contact form **opens the visitor's email application** and does not send mail itself or save messages.
- Add `assets/resume.pdf` and replace the disabled Download Resume button using the comment in `index.html`.

### Photo example

Replace `<div class="about-photo-placeholder">...</div>` with `<img class="about-photo" src="assets/profile.jpg" alt="Portrait of Syamimi" />` and add in `style.css`:

```css
.about-photo { width: 82%; height: 86%; object-fit: cover; border-radius: 150px 150px 16px 16px; }
```

## 4. Change theme

Open `style.css` and modify the CSS custom properties under `:root`.

## 5. Publish later

Upload these files to a GitHub repository and enable **GitHub Pages** (Settings → Pages → Deploy from a branch). A static site like this can be hosted directly; no build step is needed.

## Privacy and accuracy

Use only screenshots and data you are permitted to share. Remove identifying student information from SPP screenshots. Do not add private phone numbers or addresses unless you intentionally want them publicly visible. Confirm project technologies and descriptions before publishing.
