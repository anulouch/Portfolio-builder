/* FETCH DATA */
const data = JSON.parse(localStorage.getItem("portfolioData"));
if(!data){
  document.body.innerHTML = "No portfolio data found";
  throw new Error("No data");
}

/* APPLY THEME */
document.documentElement.style.setProperty(
  "--theme",
  data.theme || "#4f46e5"
);

const skills = data.skills
  .split(",")
  .map(s=>`<span>${s.trim()}</span>`)
  .join("");

const photo = data.photo ? `<img src="${data.photo}" class="avatar">` : "";

let html = "";

/* TEMPLATE SWITCH */
if(data.template === "creative"){
  html = `
  <div class="container creative">
    <div class="creative-left">
      ${photo}
      <h3>${data.name}</h3>
      <span class="badge">${data.role}</span>
    </div>
    <div class="creative-right">
      <h1>About Me</h1>
      <p>${data.about}</p>
      <h3>Skills</h3>
      <div class="skills">${skills}</div>
      <p>${data.email}</p>
    </div>
  </div>`;
}

if(data.template === "editorial"){
  html = `
  <div class="container editorial">
    <div class="editorial-left">
      ${photo}
      <h2>${data.name}</h2>
      <p>${data.role}</p>
      <p>${data.email}</p>
    </div>
    <div class="editorial-right">
      <h1>Profile</h1>
      <p>${data.about}</p>
      <h3>Expertise</h3>
      <div class="skills">${skills}</div>
    </div>
  </div>`;
}

if(data.template === "modern"){
  html = `
  <div class="container modern">
    ${photo}
    <h1>${data.name}</h1>
    <h3>${data.role}</h3>
    <p>${data.about}</p>
    <div class="skills">${skills}</div>
    <p>${data.email}</p>
  </div>`;
}

if(data.template === "persona"){
  html = `
  <div class="persona">
    <div class="left">
      ${photo}
      <h2>${data.name}</h2>
      <div class="badge">${data.role}</div>
      <p style="margin-top:20px">${data.email}</p>
    </div>
    <div class="right">
      <h3>Bio</h3>
      <p>${data.about}</p>
      <h3>Goals</h3>
      <ul>
        <li>Create meaningful user experiences</li>
        <li>Work with design-driven teams</li>
        <li>Build impactful digital products</li>
      </ul>
      <h3>Frustrations</h3>
      <ul>
        <li>Being judged before proving skills</li>
        <li>Lack of time for creative work</li>
      </ul>
    </div>
  </div>`;
}

if(data.template === "editorialPro"){
  html = `
  <div class="resume">
    <div class="sidebar">
      ${photo}
      <h2>${data.name}</h2>
      <p>${data.role}</p>
      <p>${data.email}</p>
      <h3>Skills</h3>
      ${data.skills.split(",").map(s=>`
        <div>${s.trim()}</div>
        <div class="skill-bar"><span></span></div>
      `).join("")}
    </div>
    <div class="main">
      <h2>About Me</h2>
      <p>${data.about}</p>
      <h2>Experience</h2>
      <ul>
        <li>Designed high-conversion landing pages</li>
        <li>Worked with cross-functional teams</li>
        <li>Improved engagement metrics</li>
      </ul>
      <h2>Education</h2>
      <p>BFA / Design</p>
    </div>
  </div>`;
}

document.getElementById("app").innerHTML = html;

/* PDF */
function downloadPDF(){
  const element = document.getElementById("pdfArea");
  html2pdf().from(element).save("portfolio.pdf");
}

/* ZIP */
function downloadZIP(){
  const zip = new JSZip();
  zip.file("index.html", document.documentElement.outerHTML);

  zip.generateAsync({type:"blob"}).then(blob=>{
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "portfolio.zip";
    a.click();
  });
}
