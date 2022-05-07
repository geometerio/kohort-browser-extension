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
  addKohortToStories();
}, 1000);

function addKohortToStories() {
  const stories = [...document.querySelectorAll(".story")].map(
    (el) => <HTMLElement>el
  );
  stories.forEach((storyEl) => {
    addKohortButton(storyEl);
  });
}

function addKohortButton(storyEl: HTMLElement) {
  const header = storyEl.querySelector("header");
  const renderContainer = document.createElement("div");

  if (header) {
    header.appendChild(renderContainer);
    renderKohortButton(renderContainer, () => {
      sendTopicToStandup(header.innerText);
    });
  }
}

new DomObserver().onElementMutation((el: HTMLElement) => {
  if ([...el.classList].includes("story")) {
    addKohortButton(el);
  }
});

async function sendTopicToStandup(story_name: string) {
  chrome.runtime.sendMessage({
    type: "create_kohort_topic",
    payload: { story_name }
  });
}
