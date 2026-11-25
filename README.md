# Menu Studio · The Mangroves Abu Dhabi, LXR Hotels & Resorts

A browser tool the F&B team uses to edit outlet menus and export print-ready PDFs.
Every layout follows the original InDesign (IDML) files.

| Outlet | Menus |
|---|---|
| Lilia | Breakfast, Lunch & Dinner, Drinks, Kids, Signature Breakfast, Buffet tags |
| Diya Lobby Bar | Food, Drinks, Afternoon Tea |
| Tayō | Food, Drinks, Kids, Sunbeds (fold-out) |

## For the F&B team

1. Open the site link (see “Publish” below).
2. Choose the outlet, then the menu.
3. Edit dishes, prices and sections on the left. The preview on the right updates as you type.
4. Click **Export PDF**, then choose **Save as PDF** in the print window. Use Chrome or Edge, with **Margins: None** and **Background graphics** turned on.

### Things to know

- **Changes are kept.** Every edit saves automatically. Once shared saving is set up, edits also go to the team's shared Google Sheet, so the next person continues from the latest version on any computer. The top bar shows **Saved for everyone**.
- The first save on a computer asks for your name and the team passcode (once).
- **⋯ › Version history** lists every saved version, with who saved it and when, and can restore any of them.
- **⋯ › Download backup** saves a copy of all menus as a file. **⋯ › Reset to original** brings a menu back to the InDesign version.
- **Brand fonts.** Alverata, Greycliff Arabic CF, Garamond Premier Pro, Aktiv Grotesk Ex and Adobe Arabic are licensed, so they are **not** in this repository.
  - If they are installed on the computer, they are used automatically.
  - Otherwise close free stand-ins are used.
  - Each person can add the real font files under **⋯ › Brand fonts**. They are stored in that browser only.

## Publish with GitHub Pages

1. Upload the contents of this folder to the repository root, including `index.html`, `build.py`, `src/` and `.nojekyll`.
2. Open **Settings › Pages**. Set **Source** to “Deploy from a branch”, **Branch** to `main`, and the folder to `/ (root)`. Save.
3. After a minute the site is live at **https://auhpt.github.io/FB/**. Share that link with the team.
4. Set up shared saving (once): follow **`shared-saving/SETUP.md`**, then paste the web app link into **`config.json`**.
   - Until that's done, edits save only in each person's own browser.

## Changing the tool

`index.html` is **generated**. Don't edit it directly. Edit the files in `src/`, then rebuild:

```bash
python3 build.py          # rewrites index.html (Python 3, no extra packages)
```

Commit both the `src/` change and the new `index.html`.

| File | What it holds |
|---|---|
| `src/app_head.html` | Page shell and all CSS. The UI colours are at the top: Pantone 554 `#324F47` and Warm Grey 1 `#ECE6DA`. |
| `src/app.js` | The app: outlet and menu screens, the editor, page settings, export, backup and the fonts dialog. |
| `src/buffet_engine.js` | Buffet tags: the Lilia 85 × 55 mm card, A4 sheets of 9 with cut marks, and CSV import/export. |
| `src/sync.js` | Shared saving, conflict handling and version history. It talks to `shared-saving/Code.gs`. |
| `config.json` | The shared-saving web app link. Edit it on GitHub; no rebuild needed. |
| `src/engine.js` | Shared layout engine (pagination, measuring) and the **Lilia** templates. |
| `src/diya_engine.js`, `src/tayo_engine.js` | The **Diya** and **Tayō** templates. All positions are in pt, taken from the IDML files. |
| `src/seed.js`, `src/diya_seed.js`, `src/tayo_seed.js` (+ `src/data/`) | The original menu content, used by “Reset to original”. |
| `src/assets/`, `src/data/logos.json`, `src/data/tayo_art.json` | Logos and the vector illustrations. |
| `src/fonts/` | Free fonts (SIL Open Font License) built into the page. |

Each outlet is registered with `OUTLETS.push({...})` at the end of its seed file, and each menu layout is a `T.<template>` object with a `render()` function.

### Internal offline copy with Adobe Arabic

This copy has the licensed Adobe Arabic fonts built in. It is for internal use only, so never commit it.

```bash
python3 build.py --adobe-arabic /path/to/folder-with-AdobeArabic-fonts
# writes dist/Menu_Studio_internal.html (dist/ is git-ignored)
```
