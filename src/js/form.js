const form = document.getElementById("portfolioForm");
const photoInput = document.getElementById("photo");
const preview = document.getElementById("preview");
const templateSelect = document.getElementById("template");
const templatePreview = document.getElementById("templatePreview");
const themeInput = document.getElementById("themeColor");

let photoBase64 = "";

const savedData = JSON.parse(localStorage.getItem("portfolioData"));

if (savedData) {
  document.getElementById("name").value = savedData.name || "";
  document.getElementById("role").value = savedData.role || "";
  document.getElementById("about").value = savedData.about || "";
  document.getElementById("skills").value = savedData.skills || "";
  document.getElementById("email").value = savedData.email || "";
  templateSelect.value = savedData.template || "creative";
  themeInput.value = savedData.theme || "#4f46e5";

  // ✅ Restore photo preview SAFELY
  if (savedData.photo) {
    const img = document.createElement("img");
    img.src = savedData.photo;
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";

    preview.innerHTML = "";
    preview.appendChild(img);

    photoBase64 = savedData.photo;
  }
}


/* APPLY DEFAULT THEME */
document.documentElement.style.setProperty("--theme", themeInput.value);

/* LIVE THEME PREVIEW */
themeInput.addEventListener("input", e=>{
  document.documentElement.style.setProperty("--theme", e.target.value);
});

/* PHOTO PREVIEW */
photoInput.addEventListener("change", () => {
  const file = photoInput.files[0];
  if (!file) return;

  const img = document.createElement("img");
  img.src = URL.createObjectURL(file);
  preview.innerHTML = "";
  preview.appendChild(img);

  const reader = new FileReader();
  reader.onload = () => photoBase64 = reader.result;
  reader.readAsDataURL(file);
});

/* TEMPLATE LIVE PREVIEW */
templateSelect.addEventListener("change", () => {
const n = document.getElementById("name").value || "Your Name";
const r = document.getElementById("role").value || "Your Role";

  if(templateSelect.value === "creative"){
    templatePreview.innerHTML = `
      <div class="preview-card">
        <h3>${n}</h3>
        <p>${r}</p>
      </div>`;
  }

  if(templateSelect.value === "editorial"){
    templatePreview.innerHTML = `
      <div class="preview-editorial">
        <strong>${n}</strong>
        <p>${r}</p>
      </div>`;
  }

  if(templateSelect.value === "modern"){
    templatePreview.innerHTML = `
      <div class="preview-dark">
        <h3>${n}</h3>
        <p>${r}</p>
      </div>`;
  }
});

/* SUBMIT */
form.addEventListener("submit", e => {
  e.preventDefault();

  const portfolioData = {
    name: document.getElementById("name").value,
    role: document.getElementById("role").value,
    about: document.getElementById("about").value,
    skills: document.getElementById("skills").value,
    email: document.getElementById("email").value,
    template: document.getElementById("template").value,
    photo: photoBase64,
    theme: document.getElementById("themeColor").value
  };

  localStorage.setItem("portfolioData", JSON.stringify(portfolioData));
  window.location.href = "portfolio.html";
});

document.getElementById("resetForm").addEventListener("click", () => {
  if (confirm("This will clear all data. Continue?")) {
    localStorage.removeItem("portfolioData");
    location.reload();
  }
});
