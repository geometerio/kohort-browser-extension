console.log("loaded kohort content.ts");

chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
  console.log("received message in kohort: ", req);

  sendResponse({ farewell: "goodbye" });
});
