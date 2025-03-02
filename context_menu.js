// import { getMediaFile } from "./scripts/anki_connect.js";

// When the service worker starts running, it adds the context
// menu when the user selects it.
chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        title: "Add selection to Anki",
        id: "selection",
        contexts: ["selection"]
    });
});

const PAPAGO_BASE_URL = "https://papago.naver.com/?sk=ko&tk=en&st="

function getMediaFile(word) {
    chrome.tabs.create({
        url: PAPAGO_BASE_URL + word
    }, (tab) => {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                // wait for the page to load...
                setTimeout(function() {
                    const toolbar = document.getElementById("btn-toolbar-source");
                    const buttons = toolbar.getElementsByTagName("button");
                    buttons[0].click();

                    let definitionSpan = document.getElementById("txtTarget").children[0];
                    
                }, 1000);
            }
        });
    });
}

async function genericCallback(info, tab) {

    // requestToAnki("deckNames", 6)
    // .then((response) => response.json()) // promise that returns JSON value from response body
    // .then((data) => console.log(data));  // gets the result

    // guiAddRequest(info.selectionText);
    getMediaFile(info.selectionText);
}

chrome.webRequest.onCompleted.addListener((details) => {
        console.log(details.url);
    },  
    { urls: ["https://papago.naver.com/apis/*"], types: ["media"] }
);

chrome.contextMenus.onClicked.addListener(genericCallback);