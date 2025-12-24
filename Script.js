const API_KEY = "AIzaSyDWQsVnpG_CZVP6xRYMqbBipd7R8OV5hU0";
const ROOT_FOLDER_ID = "1vabZ842htVTx745S7y8QuHO3CJNExYtn";

const list = document.getElementById("list");
const backBtn = document.getElementById("backBtn");
const searchInput = document.getElementById("search");

let folderStack = [ROOT_FOLDER_ID];
let currentItems = [];

function icon(type) {
  if (type.includes("pdf")) return "📕";
  if (type.includes("zip")) return "🗜️";
  if (type.includes("image")) return "🖼️";
  return "📄";
}

function loadFolder(folderId) {
  list.innerHTML = `<p class="col-span-full text-center dark:text-white">Loading...</p>`;
  backBtn.classList.toggle("hidden", folderStack.length <= 1);

  fetch(`https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType)`)
    .then(res => res.json())
    .then(data => {
      currentItems = data.files;
      renderItems(currentItems);
    });
}

function renderItems(items) {
  list.innerHTML = "";

  items.forEach(item => {

    // 📁 Folder
    if (item.mimeType === "application/vnd.google-apps.folder") {
      list.innerHTML += `
        <div onclick="openFolder('${item.id}')"
          class="bg-white dark:bg-slate-700 dark:text-white
                 rounded-xl shadow-md p-4 cursor-pointer
                 hover:shadow-xl hover:-translate-y-1 transition">

          <div class="text-5xl mb-3">📁</div>
          <h2 class="font-semibold truncate">${item.name}</h2>
          <p class="text-xs opacity-70">Folder</p>
        </div>
      `;
    }

    // 📄 File
    else {
      list.innerHTML += `
        <div
          class="bg-white dark:bg-slate-700 dark:text-white
                 rounded-xl shadow-md p-4
                 hover:shadow-xl hover:-translate-y-1 transition">

          <div class="text-5xl mb-3">${icon(item.mimeType)}</div>
          <h2 class="font-medium truncate">${item.name}</h2>

          <a href="https://drive.google.com/uc?id=${item.id}&export=download"
             class="block mt-4 text-center text-sm px-3 py-2 rounded-lg
                    bg-blue-600 text-white hover:bg-blue-700 transition">
            ⬇ Download
          </a>
        </div>
      `;
    }
  });
}

function openFolder(folderId) {
  folderStack.push(folderId);
  searchInput.value = "";
  loadFolder(folderId);
}

function goBack() {
  folderStack.pop();
  searchInput.value = "";
  loadFolder(folderStack[folderStack.length - 1]);
}

function filterItems() {
  const q = searchInput.value.toLowerCase();
  const filtered = currentItems.filter(i =>
    i.name.toLowerCase().includes(q)
  );
  renderItems(filtered);
}

function toggleDark() {
  document.documentElement.classList.toggle("dark");
}

// Initial load
loadFolder(ROOT_FOLDER_ID);
