document.getElementById("portfolioForm").addEventListener("submit", function(e) {
  e.preventDefault();

  var reader = new FileReader();
  var photo = document.getElementById("photo").files[0];

  reader.onload = function () {
    var data = {
      name: name.value,
      role: role.value,
      about: about.value,
      skills: skills.value,
      email: email.value,
      theme: theme.value,
      layout: layout.value,
      photo: reader.result
    };

    localStorage.setItem("portfolioData", JSON.stringify(data));
    window.location.href = "portfolio.html";
  };

  if (photo) {
    reader.readAsDataURL(photo);
  } else {
    reader.onload();
  }
});
