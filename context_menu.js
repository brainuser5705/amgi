import { guiAddRequest, addNoteRequest } from "./scripts/anki_connect.js";

// When the service worker starts running, it adds the context
// menu when the user selects it.
chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        title: "Add selection to Anki",
        id: "selection",
        contexts: ["selection"]
    });

});

async function genericCallback(info, tab) {

    console.log("fetching...");

    // requestToAnki("deckNames", 6)
    // .then((response) => response.json()) // promise that returns JSON value from response body
    // .then((data) => console.log(data));  // gets the result

    // guiAddRequest(info.selectionText);
    addNoteRequest(info.selectionText);

}

chrome.contextMenus.onClicked.addListener(genericCallback);