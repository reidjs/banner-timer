chrome.storage.sync.get("urls", (data) => {
  const urls = data.urls || [];
  const currentUrl = window.location.href;

  // Check if the current URL matches any configured URLs
  if (urls.some((url) => currentUrl.includes(url))) {
    // Create the banner element
    const banner = document.createElement("div");
    banner.id = "banner-timer";
    banner.style.position = "fixed";
    banner.style.top = "0";
    banner.style.left = "0";
    banner.style.width = "100%";
    banner.style.height = "20px";
    banner.style.padding = "10px";
    banner.style.backgroundColor = "rgba(51, 51, 51, 0.9)";
    banner.style.color = "#fff";
    banner.style.textAlign = "center";
    banner.style.fontSize = "20px";
    banner.style.zIndex = "9999";
    banner.style.display = "flex";
    banner.style.justifyContent = "center";
    banner.style.alignItems = "center";
    banner.style.backdropFilter = "blur(5px)";

    // Append banner to the body
    document.body.appendChild(banner);

    // Wrap existing body content in a new container to apply the transform
    const contentWrapper = document.createElement("div");
    while (document.body.firstChild !== banner) {
      contentWrapper.appendChild(document.body.firstChild);
    }
    document.body.appendChild(contentWrapper);

    // Apply a transform to push the contentWrapper down, not the banner
    contentWrapper.style.transform = "translateY(50px)";
    contentWrapper.style.transition = "transform 0.3s ease"; // Smooth transition for better UX

    // Create the close button
    const closeButton = document.createElement("span");
    closeButton.innerText = "✖";
    closeButton.style.marginLeft = "20px";
    closeButton.style.cursor = "pointer";
    closeButton.style.color = "#fff";
    closeButton.style.fontWeight = "bold";
    closeButton.title = "Close banner";

    // Close button click handler
    closeButton.addEventListener("click", () => {
      banner.remove();
      contentWrapper.style.transform = "translateY(0)"; // Reset transform when banner is removed
    });

    // Append close button to banner
    banner.appendChild(closeButton);

    let timeElapsed = parseInt(localStorage.getItem("elapsedTime")) || 0;

    const updateTimer = () => {
      const minutes = Math.floor(timeElapsed / 60);
      const seconds = timeElapsed % 60;
      banner.innerText = `Time wasted: ${minutes}:${
        seconds < 10 ? "0" : ""
      }${seconds}`;
      banner.appendChild(closeButton); // Re-attach the close button
      timeElapsed++;
      localStorage.setItem("elapsedTime", timeElapsed);
      setTimeout(updateTimer, 1000);
    };

    updateTimer();
  }
});
