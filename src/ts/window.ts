export function createWindow(
  icon: string,
  title: string,
  id: string,
  width: number,
  height: number,
  htmlContent: string,
  is_resizable: boolean,
) {
  let tabEl = document.createElement("div");
  let tabImg = document.createElement("img");
  let tabTitle = document.createElement("p");
  tabEl.classList.add("window-tab", "in");
  tabEl.id = id + "-tab";
  tabImg.src = icon;
  tabTitle.innerText = title;
  tabEl.append(tabImg, tabTitle);
  document.getElementsByTagName("footer")[0].appendChild(tabEl);

  let windowEl = document.createElement("div");
  windowEl.setAttribute("data-width", width + "px");
  windowEl.setAttribute("data-height", height + "px");
  windowEl.style.width = width + "px";
  windowEl.style.height = height + "px";
  windowEl.style.left = 320 - width * 0.5 + "px";
  windowEl.style.top = 240 - height * 0.5 + "px";
  windowEl.classList.add("window");
  windowEl.id = id;

  let windowHeader = document.createElement("div");
  windowHeader.classList.add("window-header");

  let headerImg = document.createElement("img");
  headerImg.src = icon;

  let headerTitle = document.createElement("strong");
  headerTitle.innerText = title;

  let minimizeButton = document.createElement("button");

  minimizeButton.addEventListener("click", () => {
    tabEl.classList.remove("in");
    windowEl.setAttribute("data-minimized", "yes");
    windowEl.setAttribute("data-x", windowEl.style.left);
    windowEl.setAttribute("data-y", windowEl.style.top);
    windowEl.style.left = "-10000px";
  });

  let maximizeButton = document.createElement("button");
  let maximizeFunction = () => {
    if (windowEl.getAttribute("data-maximized") == "yes") {
      windowEl.setAttribute("data-maximized", "no");
      windowEl.style.left = windowEl.getAttribute("data-x") || "0";
      windowEl.style.top = windowEl.getAttribute("data-y") || "0";
      // @ts-ignore
      windowEl.style.width = windowEl.getAttribute("data-width");
      // @ts-ignore
      windowEl.style.height = windowEl.getAttribute("data-height");
    } else {
      windowEl.setAttribute("data-maximized", "yes");
      windowEl.setAttribute("data-x", windowEl.style.left);
      windowEl.setAttribute("data-y", windowEl.style.top);
      windowEl.setAttribute("data-width", windowEl.style.width);
      windowEl.setAttribute("data-height", windowEl.style.height);
      windowEl.style.left = "0";
      windowEl.style.top = "0";
      windowEl.style.width = "634px";
      windowEl.style.height = "474px";
    }
  };

  maximizeButton.addEventListener("click", maximizeFunction);
  windowHeader.addEventListener("dblclick", maximizeFunction);

  let closeButton = document.createElement("button");

  closeButton.addEventListener("click", () => {
    windowEl.remove();
    tabEl.remove();
  });

  tabEl.addEventListener("click", () => {
    if (windowEl.getAttribute("data-minimized") == "yes") {
      tabEl.classList.add("in");
      windowEl.setAttribute("data-minimized", "no");
      // @ts-ignore
      windowEl.style.left = windowEl.getAttribute("data-x");
      // @ts-ignore
      windowEl.style.top = windowEl.getAttribute("data-y");
    } else {
      tabEl.classList.remove("in");
      windowEl.setAttribute("data-minimized", "yes");
      windowEl.setAttribute("data-x", windowEl.style.left);
      windowEl.setAttribute("data-y", windowEl.style.top);
      windowEl.style.left = "-10000px";
    }
  });

  let windowContent = document.createElement("div");
  windowContent.classList.add("window-content");
  windowContent.innerHTML = htmlContent;

  windowHeader.append(
    headerImg,
    headerTitle,
    minimizeButton,
    maximizeButton,
    closeButton,
  );

  windowEl.append(windowHeader, windowContent);

  // https://www.w3schools.com/howto/howto_js_draggable.asp
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  windowHeader.onmousedown = dragMouseDown;

  function dragMouseDown(e: MouseEvent) {
    pos3 = e.clientX / window.drawScale;
    pos4 = e.clientY / window.drawScale;
    document.onmouseup = closeDragElement;

    document.onmousemove = elementDrag;
  }

  function elementDrag(e: MouseEvent) {
    pos1 = pos3 - e.clientX / window.drawScale;
    pos2 = pos4 - e.clientY / window.drawScale;
    pos3 = e.clientX / window.drawScale;
    pos4 = e.clientY / window.drawScale;

    windowEl.style.top = windowEl.offsetTop - pos2 + "px";
    windowEl.style.left = windowEl.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }

  document.body.append(windowEl);
}
