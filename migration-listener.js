window.addEventListener("message", (event) => {
if (
  event.origin !== "https://sank0403.github.io"
) return;


  const data = event.data;
  if (!data || data.type !== "LOCALSTORAGE_MIGRATION") return;

  try {
    const oldData = JSON.parse(data.payload);

    for (const key in oldData) {
      localStorage.setItem(key, oldData[key]);
    }

    localStorage.setItem("migrationDone", "true");
    location.reload();

  } catch (err) {
    console.error("Migration failed:", err);
  }
});

if (!localStorage.getItem("migrationDone")) {
window.open(
  "https://sank0403.github.io/chnlnk/migrate.html",
  "migrationPopup",
  "width=400,height=400,noopener=no"
);
}
