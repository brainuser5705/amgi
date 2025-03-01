// When the service worker starts running, it adds the context
// menu when the user selects it.
chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        title: "Add selection to Anki",
        id: "selection",
        contexts: ["selection"]
    });

});