import { createWindow } from "./window.ts";

window.addEventListener("load", () => {
  // @ts-ignore
  document.getElementById("start-button").addEventListener("click", () => {
    let menu = document.getElementById("start-menu");
    // @ts-ignore
    if (menu.style.display == "none") {
      // @ts-ignore
      menu.style.display = "block";
    } else {
      // @ts-ignore
      menu.style.display = "none";
    }
  });

  for (let el of document.getElementsByClassName("start-tab")) {
    if (el.id == "shutdown") {
      el.addEventListener("click", () => {
        window.close();
      });
    } else if (el.classList.contains("start-category")) {
      el.addEventListener("click", () => {
        let category = document.getElementById(
          el.getAttribute("data-for") + "-menu",
        );
        // @ts-ignore
        if (category.style.display == "none") {
          // @ts-ignore
          category.style.display = "block";
        } else {
          // @ts-ignore
          category.style.display = "none";
        }
      });
    } else {
      el.addEventListener("click", () => {
        createWindow(
          "/img/icon.png",
          // @ts-ignore
          el.lastElementChild.textContent,
          // @ts-ignore
          el.lastElementChild.textContent.toLowerCase(),
          parseInt(el.getAttribute("data-width") || "200"),
          parseInt(el.getAttribute("data-height") || "100"),
          el.getAttribute("data-src") || "",
          true,
        );
      });
    }
  }
});
