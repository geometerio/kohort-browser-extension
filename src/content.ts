/**
 * This is a content script
 * It is used to inject other scripts into
 * the opened windows
 *
 * Read more about content scripts:
 * https://developer.chrome.com/docs/extensions/mv2/content_scripts/
 */

import DomObserver from "./dom_observer";

import { renderKohortButton } from "./KohortButton";

setTimeout(() => {
  const stories = [...document.querySelectorAll(".story")].map(
    (el) => <HTMLElement>el
  );
  stories.forEach((storyEl) => {
    const header = storyEl.querySelector("header");
    const renderContainer = document.createElement("div");
    // renderContainer.dataset.dataRole = "send-to-kohort";
    // renderContainer.innerText = "kohort";

    if (header) {
      header.appendChild(renderContainer);
      renderKohortButton(renderContainer, () => {
        sendTopicToStandup();
      });
    }
  });
}, 300);

async function sendTopicToStandup() {
  chrome.extension.sendMessage(
    { type: "send_to_standup" },
    function (results) {}
  );
}

export {};
// function addScriptToWindow(scriptLocation: string) {
//   try {
//     const container = document.head || document.documentElement,
//       script = document.createElement("script");
//
//     script.setAttribute("async", "false");
//     script.setAttribute("type", "text/javascript");
//     script.setAttribute("src", scriptLocation);
//     container.insertBefore(script, container.children[0]);
//     container.removeChild(script);
//   } catch (e) {
//     console.error("Failed to inject script\n", e);
//   }
// }
//
// console.log("content script");
//
// inject the "injected.ts" script
// addScriptToWindow(chrome.extension.getURL("/build/injected.js"));
