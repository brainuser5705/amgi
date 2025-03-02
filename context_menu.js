import { addNoteRequest } from "./scripts/anki_connect.js";

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
                    chrome.storage.local.set({"def": definitionSpan.innerHTML }, () => {
                        console.log("put in defintion");
                    });
                }, 1000);
            }
        });
    });

}

async function genericCallback(info, tab) {

    chrome.tabs.query(
        { active: true, lastFocusedWindow: true }, ([tab]) => {
        chrome.storage.local.set({"last_tab": tab }, () => {
            console.log("put in defintion");
        });
    });

    getMediaFile(info.selectionText);

    setTimeout(() => {
        chrome.storage.local.get(["def", "url"], (result) => {
            addNoteRequest(info.selectionText, result.def, result.url);
        });
    }, 3000);

}

chrome.webRequest.onCompleted.addListener((details) => {

        let queryOptions = { active: true, lastFocusedWindow: true };
        chrome.tabs.query(queryOptions, ([tab]) => {
            // `tab` will either be a `tabs.Tab` instance or `undefined`.
            console.log("removing!");
            chrome.tabs.remove(tab.id);
        });

        chrome.storage.local.set({"url": details.url }, () => {
            console.log("put in url");
        });

        chrome.storage.local.get(["last_tab"], (result) => {
            chrome.tabs.update(result.last_tab.id, { active: true });
        });

    },  
    { urls: ["https://papago.naver.com/apis/*"], types: ["media"] }
);

chrome.contextMenus.onClicked.addListener(genericCallback);