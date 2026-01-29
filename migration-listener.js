console.log("[LISTENER] Script loaded on:", location.origin);

// Listen for migration data from popup
window.addEventListener("message", (event) => {
  console.log("[LISTENER] Message received:", event.origin, event.data);

  if (event.origin !== "https://sank0403.github.io") {
    console.warn("[LISTENER] Rejected message due to origin mismatch:", event.origin);
    return;
  }

  const data = event.data;
  if (!data || data.type !== "LOCALSTORAGE_MIGRATION") {
    console.warn("[LISTENER] Ignored message: wrong type or empty");
    return;
  }

  try {
    const oldData = JSON.parse(data.payload);
    console.log("[LISTENER] Writing keys:", Object.keys(oldData));

    for (const key in oldData) {
      localStorage.setItem(key, oldData[key]);
    }

    localStorage.setItem("migrationDone", "true");
    console.log("[LISTENER] Migration complete. Reloading...");

    setTimeout(() => location.reload(), 50);

  } catch (err) {
    console.error("[LISTENER] Migration failed:", err);
  }
});

// Show modal if migration not done
if (!localStorage.getItem("migrationDone")) {
  console.log("[LISTENER] Migration needed. Showing modal.");

  const modal = document.getElementById("migrationModal");
  const okBtn = document.getElementById("migrationOkBtn");

  if (!modal || !okBtn) {
    console.error("[LISTENER] Modal elements not found in DOM");
  } else {
    modal.style.display = "flex";

    okBtn.addEventListener("click", () => {
      console.log("[LISTENER] User clicked OK to migrate");

      window.open(
        "https://sank0403.github.io/geordle/migrate.html?ts=" + Date.now(),
        "migrationPopup",
        "width=400,height=400,noopener=no,noreferrer=no"
      );

      modal.style.display = "none";
    });
  }
} else {
  console.log("[LISTENER] Migration already done.");
}
