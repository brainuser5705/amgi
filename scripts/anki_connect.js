// import { getMediaFile } from "./get_audio";

const PAPAGO_BASE_URL = "https://papago.naver.com/?sk=ko&tk=en&st="

// fetch this site
// then we are "intercept" the request url from the network
// make sure that the content type is audio/mpeg
// send back the request url

// make a listener...

function getMediaFile(word) {
    // get the button element and click it
    // the listener should intercept the request...
    console.log("We got the audio message.")
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
                    console.log(definitionSpan.innerHTML);
                }, 1000);
            }
        });
    });

    // chrome.runtime.sendMessage({action: "get-audio", word: word});
}

const ANKI_CONNECT_URL = "http://127.0.0.1:8765"

/**
 * Creates a basic Request promise to Anki-Connect
 * running on localhost
 * 
 * @param {*} action    the Anki-Connect action
 * @param {*} version   the version of the action
 * @param {*} params    additional parameters of the request
 * @returns Request Promise
 */
function requestToAnki(action, version, params={}) {

    let request = new Request(ANKI_CONNECT_URL, {
        method: "POST",
        body: JSON.stringify({action, version, params})
    });

    return fetch(request);

};

function guiAddRequest(selection){

    requestToAnki("guiAddCards", 6, {
        "note": {
            "deckName": "Default",
            "modelName": "Basic",
            "fields": {
                "Front": selection,
                "Back": "the meaning of " + selection
            }
        }
    })
    .then((response) => {
        if (response.status == 200) {
            console.log(response.status);
        }else{
            console.log("User pressed no?");
        }
    });

}

function addNoteRequest(selection){

    getMediaFile(selection);

    // requestToAnki("addNote", 6, {
    //     "note": {
    //         "deckName": "Default",
    //         "modelName": "Basic",
    //         "fields": {
    //             "Front": selection,
    //             "Back": "definition of" + selection
    //         },
    //         "options": {
    //             "allowDuplicate": false,
    //         },
    //         "audio": [{
    //             "url": "https://dict-dn.pstatic.net/v?_lsu_sa_=3ff83f5e5dc731467c9c514c3c8438fa7dca6dd508039fa16da2ba779b9c6151b15ab7646e450b71b9a36525d627d06b1c151fa8a169b6a535f5ab2f6cbb558ac9faf76ee926f64710f1906280bc37e720c9667dc99f9001929a0f6886089aa5c04857b8d3f682352b06f0de09f4bb3b3bfa20442ebc101cb33cdfd2614e76d8",
    //             "filename": "test.mp3",
    //             "fields": [
    //                 "Front"
    //             ]
    //         }]
    //     }
    // })
    // .then((response) => {
    //     if (response.status == 200) {
    //         console.log("Added a card");
    //     }else{
    //         console.log("User pressed no?");
    //     }
    // });
}

export { guiAddRequest, addNoteRequest };