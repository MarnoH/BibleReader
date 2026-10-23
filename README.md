# Bybel

Die Bybel as 'n boek om deur te blaai (AOV, KJV, BSB), met kruisverwysings, notas, preke en 'n leesregister.
Werk sonder internet sodra dit een keer oopgemaak is.

## What is in here

```
index.html            the reader (the program only)
leesregister.html     the reading register
sw.js, manifest.webmanifest, icons   what makes it installable and offline
fonts/                the typeface
data/catalog.json     the list of translations
data/base.v1.json     book names, chapter and verse numbering
data/aov.v1.json      one file per translation
data/kjv.v1.json
data/bsb.v1.json
data/orig.v1.json     Hebrew Old Testament and Greek New Testament (TR)
data/sbl.v1.json      Greek New Testament (SBLGNT); its Old Testament is the Hebrew
data/byz.v1.json      Greek New Testament (Byzantine Textform), with Strong's numbers and parsing; OT the Hebrew
data/na.v1.json       Greek New Testament (NA27/UBS4 readings), with Strong's numbers and parsing; OT the Hebrew
data/xrefs.v1.json    the cross-references
data/strongs.v1.json  Strong's dictionary (Hebrew and Greek)
data/tags-kjv.v1.json Strong's numbers for each word of the KJV
data/tags-heb.v1.json Strong's numbers and parsing for each Hebrew word
data/tags-grk.v1.json Greek words with Strong's numbers and parsing (BSB interlinear), for the KJV's NT
data/defs.v1.json     BDB outlines and short definitions (BSB interlinear)
data/tags-bsb.v1.json each BSB word linked to the Hebrew or Greek word it renders
data/tags-hbsb.v1.json Strong's numbers and parsing of the BSB's Hebrew words
data/tags-aov.v1.json first-draft links of each AOV word to the Hebrew or Greek (machine alignment, to be corrected)
boeke.html            the library: other Christian books on their own shelves
data/library.json     the books in the online library
data/books/           one file per online book
vendor/pdfjs/         PDF.js, which reads a PDF when one is added to the library
tekste.html           the Greek New Testaments compared (TR, Byzantine, Nestle 1904, Westcott-Hort, NA27, SBL)
data/nt-compare.v3.json  the six Greek texts, verse by verse, for tekste.html
boek-sjabloon.md      a template for writing a book in Markdown (see "The library")
```

A phone downloads the program, the numbering and the AOV when it is installed. Another translation or the
cross-references are downloaded the first time they are chosen, and kept on the phone after that.

## The library

`boeke.html` has its own bookshelves, reader and reading-time log, kept apart from the Bible and its register.
Only books that may be shared go in `data/library.json` and `data/books/` (public domain, or a licence that allows it,
like the Quakers' Catechism under CC BY-NC-ND).

### Adding your own books

Tap **Add books** and choose a file. Before a book goes on the shelf you can put its title, author, year and
shelf right. It is kept on that device only (add it again on each phone or computer), and your own books must not
be uploaded here.

| File | What happens |
|---|---|
| **PDF** (`.pdf`) with real text | Read on the device: chapters from the larger type, paragraphs rebuilt, page headers and page numbers left out, italics and footnotes kept, the first page as the cover. The first time, PDF.js (1.8 MB) is downloaded; after that it works offline. |
| **Scanned PDF** (pages that are pictures) | Turned away: there is no text in it to read. Have it read (OCR) and made into a book file in a chat, or save the recognised text as Markdown. |
| **Markdown** (`.md`) | Your own text as a book, in the simple format below. |
| **Text** (`.txt`) | Plain paragraphs, one blank line between them. |
| **Book file** (`.json`) | A book already made for the library (for example converted in a chat). |

### Writing a book in Markdown

Start from [`boek-sjabloon.md`](boek-sjabloon.md): a small example book with these instructions inside it.
Open it in any text editor, put your own text in, save it and add it with **Add books**.

```
---
title: The Title of the Book
author: The Author
year: 1660
shelf: Puritans
---

# Chapter I. Of Faith
## The First Doctrine

A paragraph. Lines written straight under each other
run on as one paragraph; a blank line starts the next.

*italic* or _italic_, **bold**

> A quotation, printed small.

- a list item
1. a numbered item

***
```

| You write | In the book |
|---|---|
| `#`, `##`, `###` | chapter, section, smaller heading (the highest level you use becomes the chapter) |
| a blank line | a new paragraph |
| `*words*` or `_words_` / `**words**` | italics / bold |
| `> words` | a quotation in small type |
| `- item`, `1. item` | list items |
| `***` on its own line | a break (* * *) |
| `<!-- a note -->` | a note to yourself, not shown in the book |

The block between the two `---` lines is optional. `shelf` can be Puritans, Reformers, Confessions, Devotional,
Sermons, Church history or Other, in English or Afrikaans (Puriteine, Hervormers, Stigtelik, Preke …). Without it,
a single `#` heading on the first line is taken as the book's title.

## Put it online (GitHub Pages)

1. Upload all files and both folders to a public repository (**Add file → Upload files**; folders can be dragged in), then **Commit changes**.
2. **Settings → Pages**: source **Deploy from a branch**, branch **main**, folder **/ (root)**, **Save**.
3. After a minute or two the address shows at the top of that page, e.g. `https://yourname.github.io/bybel/`.

## Install on a phone

Open the address in Chrome, tap **⋮** and choose **Install app** or **Add to Home screen**
(iPhone: Safari → **Share → Add to Home Screen**). Open it once with signal; after that it works offline.

## Updating

- Program changes: upload the new `index.html` / `leesregister.html`. Phones show "’n Nuwe weergawe is gereed · Herlaai".
- Texts never change in place: a corrected text gets a new name (`aov.v2.json`) and a new line in `data/catalog.json`.

## Your data

Readings, notes, sermons and markings are saved only on the device where they are made.
Use **Stoor rugsteun** (leesregister) and **Save notes backup** (reader) to move them between devices.

Hebrew: Westminster Leningrad Codex via the Open Scriptures Hebrew Bible (public domain text). Greek: Scrivener 1894 Textus Receptus (public domain), and the SBL Greek New Testament, © 2010 Society of Biblical Literature and Logos Bible Software (CC BY 4.0).
Strong's numbers in the KJV: CrossWire KJV module (general public licence). Strong's dictionary: Open Scriptures (CC BY-SA). Hebrew parsing: Open Scriptures Hebrew Bible (CC BY 4.0). Greek words, parsing and short definitions: BSB interlinear tables (Berean, public domain).
Hebrew verse mapping: TVTMS, STEPBible / Tyndale House (CC BY 4.0). Noto Serif Hebrew and Greek, SIL Open Font License.
Text: AOV, KJV, BSB and the Treasury of Scripture Knowledge cross-references from CrossReferences.org
(cross-references CC BY 4.0). Source Serif 4 © Adobe, SIL Open Font License.

Greek texts compared (tekste.html, data/nt-compare.v3.json): Textus Receptus, Scrivener 1894 (public domain);
Byzantine Textform, M. A. Robinson & W. G. Pierpont (CrossWire module "Byz", CC BY-NC-SA 4.0); Nestle 1904
(CrossWire module "Nestle1904", public domain); Westcott & Hort 1881 with the NA27/UBS4 readings (CrossWire module
"WHNU", CC BY-NC-SA 4.0); SBL Greek New Testament, © 2010 Society of Biblical Literature and Logos Bible Software
(CC BY 4.0). The comparison data is shared under CC BY-NC-SA 4.0, as the Byz and WHNU modules require.
Heb/Byz and Heb/NA27 (data/byz.v1.json, data/na.v1.json): the Byzantine Textform (Robinson & Pierpont) and the
NA27/UBS4 readings from the CrossWire modules "Byz" and "WHNU", with their Strong's numbers and Robinson parsing,
CC BY-NC-SA 4.0; the Hebrew Old Testament as in Heb/TR.
PDF import in the library: PDF.js 4.10.38 (vendor/pdfjs), Mozilla Foundation, Apache License 2.0 (vendor/pdfjs/LICENSE).
