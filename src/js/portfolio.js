var data = JSON.parse(localStorage.getItem("portfolioData"));

if (data) {
  name.innerText = data.name;
  role.innerText = data.role;
  about.innerText = data.about;
  email.innerText = data.email;

  themeBody.className = data.theme;
  layoutBox.classList.add(data.layout);

  if (data.photo) {
    profilePhoto.src = data.photo;
  }

  var skillsArray = data.skills.split(",");
  for (var i = 0; i < skillsArray.length; i++) {
    var li = document.createElement("li");
    li.innerText = skillsArray[i];
    skills.appendChild(li);
  }
}

function downloadPDF() {
  window.print();
}
