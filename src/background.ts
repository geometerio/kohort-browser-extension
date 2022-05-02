/**
 * This is a background script
 * It is running in the background process of chrome
 * You can debug it by clicking the "background page"
 * button in the extension settings
 *
 * Read more about background scripts:
 * https://developer.chrome.com/docs/extensions/mv2/background_pages/
 */

console.log("background script");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  chrome.tabs.query({ url: "https://localhost:4001/*" }, (results) => {
    if (results.length == 0) {
      sendResponse("no active tab");
      return;
    }
    if (!results[0].url) {
      sendResponse("no url");
      return;
    }

    const kohortUrl = new URL(results[0].url);
    const kohortUrlParts = kohortUrl.pathname.match(
      /^\/([a-zA-Z0-9\-_]+)\/([a-zA-Z0-9\-_]+)$/
    );
    if (kohortUrlParts) {
      fetch("https://localhost:4001/api/v1/import_topic", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "text/plain"
        }),
        body: JSON.stringify({
          organization: kohortUrlParts[1],
          meeting: kohortUrlParts[2],
          content: "hey from tracker"
        })
      });
    }
  });
  sendResponse("WTF");
});
export {};
