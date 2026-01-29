console.log("[LISTENER] Script loaded on:", location.origin);

// Listen for migration data from popup
window.addEventListener("message", (event) => {
  console.log("[LISTENER] Message received:", event.origin, event.data);

  // Only accept messages from your GitHub Pages origin
  if (event.origin !== "https://sank0403.github.io") {
    console.warn("[LISTENER] Rejected message due to origin mismatch:", event.origin);
    return;
  }

  const data = event.data;
  if (!data || data.type !== "LOCALSTORAGE_MIGRATION") {
    console.warn("[LISTENER] Message ignored: wrong type or empty data");
    return;
  }

  try {
    console.log("[LISTENER] Migration payload received:", data.payload);

    const oldData = JSON.parse(data.payload);

    console.log("[LISTENER] Writing keys:", Object.keys(oldData));

    // Write migrated keys
    for (const key in oldData) {
      localStorage.setItem(key, oldData[key]);
    }

    // Mark migration complete
    localStorage.setItem("migrationDone", "true");
    console.log("[LISTENER] Migration complete. Reloading soon...");

    // Reload safely after message finishes processing
    setTimeout(() => {
      console.log("[LISTENER] Reloading page now");
      location.reload();
    }, 50);

  } catch (err) {
    console.error("[LISTENER] Migration failed:", err);
  }
});

// Open popup ONLY if migration not done
if (!localStorage.getItem("migrationDone")) {
  console.log("[LISTENER] Opening migration popup...");

  const popup = window.open(
    "https://sank0403.github.io/chnlnk/migrate.html",
    "migrationPopup",
    "width=400,height=400,noopener=no,noreferrer=no"
  );

  console.log("[LISTENER] Popup opened:", popup);
} else {
  console.log("[LISTENER] Migration already done. No popup needed.");
}
