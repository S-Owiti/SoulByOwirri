# Owirri Artist Website

A static HTML, CSS and JavaScript version of the Owirri artist-profile website, ready for GitHub Pages.

## Files

- `index.html` — website content and structure
- `styles.css` — visual design and responsive layout
- `interactions.css` — navigation and motion states
- `script.js` — mobile navigation, reveal effects and automatic footer year
- `assets/og.png` — social-sharing artwork
- `.nojekyll` — tells GitHub Pages to serve the files directly

## Publish with GitHub Pages

1. Create a new public GitHub repository.
2. Upload every file and the `assets` folder to the repository root.
3. Open the repository's **Settings**.
4. Select **Pages** in the sidebar.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select the `main` branch and `/ (root)` folder, then click **Save**.
7. GitHub will show the public website address after deployment finishes.

## Before publishing

The page currently loads artist photographs from the existing WordPress media library. This keeps the download lightweight. To make the new site fully independent, download those photographs into `assets/`, replace each remote image URL in `index.html` with its local path, and keep the same filenames.

For accurate social previews on WhatsApp and other platforms, replace `assets/og.png` in the `og:image` metadata with the full public URL after GitHub Pages is live.
