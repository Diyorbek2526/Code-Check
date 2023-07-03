const tex = document.querySelector("#tex");
const tex2 = document.querySelector("#tex2");
const tex3 = document.querySelector("#tex3");
const nevcod = document.getElementById("nevcod");
const add = document.getElementById("add");

let texHtml = tex.value;
let texCss = tex2.value;
let texJs = tex3.value;

const dataBaza = JSON.parse(localStorage.getItem("Code-Check")) || [];

const saveToLacalStorage = () => {
  localStorage.setItem("Code-Check", JSON.stringify(dataBaza));
};

const validation = (title) => title.trim().length > 0;

const clr = () => {
  tex.value = "";
  tex2.value = "";
  tex3.value = "";
  localStorage.clear();
};

function run() {
  const editorPreview = document.getElementById("editorPreview");
  dataBaza.find((item, index) => {
    if (item.projectName === codName.innerHTML) {
      dataBaza[index].html = tex.value;
      dataBaza[index].css = tex2.value;
      dataBaza[index].js = tex3.value;
      saveToLacalStorage();
    }
  });

  let texHtml = tex.value;
  let texCss = tex2.value;
  let texJs = tex3.value;

  editorPreview.contentDocument.body.innerHTML =
    texHtml + "<style>" + texCss + "</style>";
  editorPreview.contentWindow.eval(texJs);
}

const fullscreen = () => {
  var fullscreenElement = document.getElementById("fullscreen-element");
  var fullscreenToggle = document.getElementById("fullscreen-toggle");
  var ifram = document.querySelector("iframe");

  fullscreenToggle.addEventListener("click", function () {
    if (fullscreenToggle.classList.toggle("active")) {
      fullscreenToggle.innerHTML = `<i class="fa-solid fa-minimize"></i>`;
      ifram.style.border = "none";
    } else {
      fullscreenToggle.innerHTML = `<i class="fa-solid fa-expand"></i>`;
      ifram.style.border = "1px solid rgba(255, 0, 0, 0.545)";
    }

    if (!document.fullscreenElement) {
      // Request fullscreen
      if (fullscreenElement.requestFullscreen) {
        fullscreenElement.requestFullscreen();
      } else if (fullscreenElement.mozRequestFullScreen) {
        // Firefox
        fullscreenElement.mozRequestFullScreen();
      } else if (fullscreenElement.webkitRequestFullscreen) {
        // Chrome, Safari and Opera
        fullscreenElement.webkitRequestFullscreen();
      } else if (fullscreenElement.msRequestFullscreen) {
        // IE/Edge
        fullscreenElement.msRequestFullscreen();
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        // Chrome, Safari and Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        // IE/Edge
        document.msExitFullscreen();
      }
    }
  });
};

const seeCode = () => {
  const seeCodeId = document.getElementById("seeCode");
  seeCodeId.innerHTML = `
<pre class="m-0">
<textarea class="texhtml" readonly>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
${tex2.value}
</style>
</head>
<body>
${tex.value}
<script>
${tex3.value}
</script>
</body>
</html>
</textarea>
</pre>
`;
  var appropriation = seeCodeId.innerText;

  const downloadDoc = document.getElementById("download");

  downloadDoc.addEventListener("click", () => {
    var fileName = "Natija Tayyor.html";

    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(appropriation)
    );
    element.setAttribute("download", fileName);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  });
};

const htmlCopy = () => {
  navigator.clipboard.writeText(tex.value);
};

const cssCopy = () => {
  navigator.clipboard.writeText(tex2.value);
};

const jsCopy = () => {
  navigator.clipboard.writeText(tex3.value);
};

const addcode = () => {
  menu.innerHTML = "";
  dataBaza.map((item, index) => {
    menu.innerHTML += `<div class="codecard d-flex align-items-center justify-content-center fw-bold" onclick="openCode(${index})">${item.projectName}</div>`;
  });

  menu.innerHTML += `
  <div class="d-flex gap-5 flex-wrap"></div>
      <div class="p-3 border add rounded-2">
        <input
          type="text"
          placeholder="Project name"
          class="me-3 nameAdd"
          id="addName"
        />
        <button class="btn btn-primary" onclick="addCard()">+</button>
  </div>
  `;
};

const menu = document.querySelector("#menu");
const addCard = () => {
  const addName = document.querySelector("#addName");
  if (!validation(addName.value)) return;

  let s = addName.value;

  dataBaza.push({ projectName: s, html: texHtml, css: texCss, js: texJs });

  addName.value = "";
  saveToLacalStorage();
  addcode();
};

const allMenu = document.querySelector("#allMenu");
const openCode = (index) => {
  const codName = document.querySelector("#codName");
  menu.innerHTML = "";
  allMenu.classList.remove("d-none");
  codName.innerHTML = dataBaza[index].projectName;

  tex.value = dataBaza[index].html;
  tex2.value = dataBaza[index].css;
  tex3.value = dataBaza[index].js;
  run();
};

document.getElementById("backMenu").addEventListener("click", () => {
  allMenu.className = "d-none";
  addcode();
});

const init = () => {
  fullscreen();
  addcode();
};

init();
