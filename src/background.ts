/**
 * This is a background script
 * It is running in the background process of chrome
 * You can debug it by clicking the "background page"
 * button in the extension settings
 *
 * Read more about background scripts:
 * https://developer.chrome.com/docs/extensions/mv2/background_pages/
 */

chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  if (request.type == "get_active_kohort_meeting") {
    chrome.tabs.query(
      { url: "https://localhost:4001/*" },
      function (tabs: chrome.tabs.Tab[]) {
        if (tabs.length == 0) {
          sendResponse("no active kohort tab");
          return;
        }
        if (!tabs[0].url) {
          sendResponse("no url");
          return;
        }

        console.log("found tab: ", tabs[0]);

        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: (note_name: string) => {
            const event = new CustomEvent("create_note", {
              detail: { note_name: note_name }
            });
            document.dispatchEvent(event);
          },
          args: [request.payload.story_name]
        });
        // chrome.tabs.sendMessage(
        //   tabs[0].id || 0,
        //   { greeting: "hello" },
        //   function (response) {
        //     console.log("response from Kohort: ", response);
        //   }
        // );
      }
    );
  }

  // const kohortUrl = new URL(results[0].url);
  // const kohortUrlParts = kohortUrl.pathname.match(
  //   /^\/([a-zA-Z0-9\-_]+)\/([a-zA-Z0-9\-_]+)$/
  // );
  // console.log(kohortUrl);
  // console.log(kohortUrlParts);
  // if (kohortUrlParts) {
  //   sendResponse({
  //     organization_slug: kohortUrlParts[0],
  //     meeting_slug: kohortUrlParts[1]
  //   });
  // }
});
export {};
