/**
 * This is an injectable script
 * It is added to the "web_accessible_resources"
 * field in manifest.json and can be injected by
 * the content script.
 *
 * It is useful for modifying the DOM of different
 * tabs easily
 */

import DomObserver from "./dom_observer";

import React from "react";
import ReactDOM from "react-dom";
import { renderKohortButton } from "./KohortButton.tsx";

setTimeout(() => {
  console.log(chrome.extension);
  const stories = [...document.querySelectorAll(".story")];
  stories.forEach((el) => {
    const header = el.querySelector("header");
    const renderContainer = document.createElement("div");
    // renderContainer.dataset.dataRole = "send-to-kohort";
    // renderContainer.innerText = "kohort";

    if (header) {
      header.appendChild(renderContainer);
      renderKohortButton(renderContainer);
    }
  });
}, 2000);

// new DomObserver().onElementMutation((el: HTMLElement) => {
//   if ([...el.classList].includes("story")) {
//     renderContainer.innerText = "kohort";
//
//     const header = el.querySelector("header");
//     conosle.log(el);
//     conosle.log(header);
//     if (header) {
//       header.appendChild(renderContainer);
//     }
//   }
// });
