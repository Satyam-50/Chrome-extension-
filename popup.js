document.addEventListener("DOMContentLoaded", loadBookmarks);

document.getElementById("saveBtn").addEventListener("click", async () => {

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab.url.includes("youtube.com/watch")) {
    alert("Open a YouTube video first!");
    return;
  }

  const results = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      const video = document.querySelector("video");
      const titleElement = document.querySelector("h1.ytd-watch-metadata");
      if (!video) return null;
      return {
        time: video.currentTime,
        url: window.location.href.split("&")[0],
        title: titleElement ? titleElement.innerText : document.title
      };
    }
  });

  if (results && results[0] && results[0].result) {
    saveBookmark(results[0].result);
  }
});

function saveBookmark(data) {
  chrome.storage.local.get(["bookmarks"], (result) => {
    const bookmarks = result.bookmarks || [];
    bookmarks.push(data);
    chrome.storage.local.set({ bookmarks }, loadBookmarks);
  });
}

function loadBookmarks() {
  chrome.storage.local.get(["bookmarks"], (result) => {
    const container = document.getElementById("bookmarks");
    container.innerHTML = "";
    const bookmarks = result.bookmarks || [];

    bookmarks.forEach((bm, index) => {
      const div = document.createElement("div");
      div.className = "bookmark";

      const timestampLink = `${bm.url}&t=${Math.floor(bm.time)}s`;

      div.innerHTML = `
        <div class="time">${formatTime(bm.time)}</div>
        <div class="title">${bm.title}</div>
        <div class="actions">
          <div class="small-btn watch">Watch</div>
          <div class="small-btn share">Share</div>
          <div class="small-btn delete">Delete</div>
        </div>
      `;

      div.querySelector(".watch").onclick = async () => {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        chrome.tabs.update(tab.id, { url: timestampLink });
      };

      div.querySelector(".share").onclick = async () => {
        await navigator.clipboard.writeText(timestampLink);
        alert("Timestamp link copied!");
      };

      div.querySelector(".delete").onclick = () => {
        deleteBookmark(index);
      };

      container.appendChild(div);
    });
  });
}

function deleteBookmark(index) {
  chrome.storage.local.get(["bookmarks"], (result) => {
    const bookmarks = result.bookmarks || [];
    bookmarks.splice(index, 1);
    chrome.storage.local.set({ bookmarks }, loadBookmarks);
  });
}

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0)
    return `${h}:${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`;
  return `${m}:${s.toString().padStart(2,"0")}`;
}
