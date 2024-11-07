document.getElementById("save").addEventListener("click", () => {
  const urls = document
    .getElementById("urls")
    .value.split("\n")
    .map((url) => url.trim());
  chrome.storage.sync.set({ urls }, () => {
    alert("URLs saved!");
  });
});

// Load the saved URLs when the options page is opened
chrome.storage.sync.get("urls", (data) => {
  if (data.urls) {
    document.getElementById("urls").value = data.urls.join("\n");
  }
});
