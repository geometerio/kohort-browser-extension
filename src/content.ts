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
}, 1000);

// enum Messages = {
//   GET_ACTIVE_KOHORT_MEETING: "get_active_kohort_meeting"
// };
interface GetActiveKohortMeetingResponse {
  organization_slug: string;
  room_slug: string;
}

async function sendTopicToStandup() {
  chrome.runtime.sendMessage(
    { type: "get_active_kohort_meeting" },
    function (resp: GetActiveKohortMeetingResponse | null) {
      if (resp) {
        console.log(resp);
      } else {
        console.warn("no active kohort meeting");
      }
    }
  );
}

async function import_topic(
  organization_slug: string,
  meeting_slug: string,
  content: string
) {
  await fetch("https://localhost:4001/api/v1/import_topic", {
    method: "POST",
    headers: new Headers({
      "Content-Type": "text/plain"
    }),
    body: JSON.stringify({
      organization: organization_slug,
      meeting: meeting_slug,
      content: content
    })
  });
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
