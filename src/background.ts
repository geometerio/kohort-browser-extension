/**
 * This is a background script
 * It is running in the background process of chrome
 * You can debug it by clicking the "background page"
 * button in the extension settings
 *
 * Read more about background scripts:
 * https://developer.chrome.com/docs/extensions/mv2/background_pages/
 */

// @ts-ignore
import { KOHORT_URL } from "env";

chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  if (request.type == "create_and_start_kohort_topic") {
    chrome.tabs.query(
      { url: `${KOHORT_URL}/*` },
      function (tabs: chrome.tabs.Tab[]) {
        const activeMeetingTab = tabs.find((t) => {
          return t.url && isActiveKohortMeeting(new URL(t.url));
        });

        if (!activeMeetingTab || !activeMeetingTab.id) {
          sendResponse("no active kohort meeting");
          return;
        }

        // @ts-ignore
        chrome.scripting.executeScript({
          target: { tabId: activeMeetingTab.id },
          function: (note_name: string) => {
            const event = new CustomEvent("create_and_start_note", {
              detail: { note_name: note_name }
            });
            document.dispatchEvent(event);
          },
          args: [request.payload.story_name]
        });
      }
    );
  }

  // Returning true indicates to keep port open long enough that message is received by content script
  return true;
});

function isActiveKohortMeeting(url: URL): boolean {
  return !!url.pathname.match(/^\/([a-zA-Z0-9\-_]+)\/([a-zA-Z0-9\-_]+)$/);
}
