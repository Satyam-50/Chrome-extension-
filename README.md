# 🎬 YouTube Timestamp Bookmarker

A powerful Chrome Extension that allows users to:

- 📌 Save YouTube video timestamps
- ▶ Watch saved timestamps instantly
- 🔗 Share exact timestamp links
- 🗑 Delete bookmarks
- 📺 View video title with each bookmark

Built using **Manifest V3** and dynamic script injection (SPA-safe).

---

## 🚀 Features

✅ Add Bookmark at current video time  
✅ Display YouTube video title  
✅ Watch timestamp in same tab  
✅ Share timestamp link (copies to clipboard)  
✅ Delete saved bookmarks  
✅ Works without page refresh  
✅ Compatible with latest Chrome (Manifest V3)

---

## 📦 Installation

1. Download or clone this repository.
2. Go to `chrome://extensions/`
3. Enable **Developer Mode**
4. Click **Load Unpacked**
5. Select the extension folder

Done 🎉

---

## 🛠 Tech Stack

- HTML
- CSS
- JavaScript
- Chrome Extension API (Manifest V3)
- Chrome Scripting API
- Chrome Storage API

---

## 📁 Project Structure


---

## 🧠 How It Works

- Uses `chrome.scripting.executeScript()` to fetch:
  - Current video timestamp
  - Video title
  - Clean YouTube URL
- Stores bookmarks using `chrome.storage.local`
- Generates shareable links using `&t=seconds`

---

## ⚠ Limitations

- Works only on desktop browsers (Chrome, Edge, Brave)
- Does NOT work inside the YouTube mobile app

---

## 📌 Future Improvements

- Thumbnail preview
- Bookmark search
- Export bookmarks to JSON
- Cloud sync
- Chrome Web Store publishing

---

## 👨‍💻 Author

Satyam Vishwakarma  
CSE 2028 – NIT Jamshedpur

---

## ⭐ If you like this project, give it a star!
