// 1. Select DOM Elements
const form = document.getElementById("portfolioForm");
const previewBox = document.getElementById("previewBox");
const photoInput = document.getElementById("photo");
const templateSelect = document.getElementById("template");
const resetBtn = document.getElementById("resetBtn");

let photoURL = "";

// 2. Event Listeners for REAL-TIME updates
document.querySelectorAll("input, textarea, select").forEach((input) => {
  input.addEventListener("input", renderPreview);
});

// 3. Handle Photo Upload
photoInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      photoURL = e.target.result;
      renderPreview();
    };
    reader.readAsDataURL(file);
  }
});

// 4. The Render Function (Updated to show Email)
function renderPreview() {
  const name = document.getElementById("name").value || "Your Name";
  const role = document.getElementById("role").value || "Your Role";
  const about = document.getElementById("about").value || "About section...";
  const skills = document.getElementById("skills").value || "Skills...";
  const email = document.getElementById("email").value || ""; // Grab Email
  const template = templateSelect.value;

  const imgHTML = photoURL ? `<img src="${photoURL}" class="mini-photo">` : "";

  let html = "";

  if (template === "creative") {
    html = `
      <div class="t-creative">
        ${imgHTML}
        <h3 style="margin:5px 0; color:#667eea">${name}</h3>
        <p style="color:#666; font-size:13px; margin-bottom:8px">${role}</p>
        <p style="font-size:12px; color:#333">${about}</p>
        <div style="margin-top:8px; font-size:11px; font-weight:bold; color:#444">Skills: ${skills}</div>
        <div style="margin-top:8px; font-size:11px; color:#667eea">📧 ${email}</div>
      </div>`;
  } else if (template === "editorial") {
    html = `
      <div class="t-editorial">
        ${imgHTML}
        <h2 style="margin:0">${name}</h2>
        <i style="color:#555; font-size:14px">${role}</i>
        <div style="font-size:12px; color:#666; margin-bottom:5px">${email}</div>
        <hr style="margin:8px 0; opacity:0.3">
        <p style="font-size:13px">${about}</p>
      </div>`;
  } else if (template === "modern") {
    html = `
      <div class="t-modern">
        ${imgHTML}
        <h3 style="margin:0; color:#fff">${name}</h3>
        <p style="color:#aaa; font-size:11px; letter-spacing:1px; margin-bottom:10px">${role.toUpperCase()}</p>
        <p style="font-size:12px; color:#ccc">${about}</p>
        <div style="margin-top:10px; font-size:11px; color:#667eea">${email}</div>
      </div>`;
  }

  previewBox.innerHTML = html;
}

// 5. Reset Button
resetBtn.addEventListener("click", () => {
  if (confirm("Clear form?")) {
    form.reset();
    photoURL = "";
    renderPreview();
  }
});

// 6. Initial Call
renderPreview();
