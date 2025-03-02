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

function addNoteRequest(selection, definition, url){

    requestToAnki("addNote", 6, {
        "note": {
            "deckName": "Default",
            "modelName": "Basic",
            "fields": {
                "Front": selection,
                "Back": definition
            },
            "options": {
                "allowDuplicate": false,
            },
            "audio": [{
                "url": url,
                "filename": selection + ".mp3",
                "fields": [
                    "Front"
                ]
            }]
        }
    })
    .then((response) => {
        if (response.status == 200) {
            console.log("Added a card");
        }else{
            console.log("User pressed no?");
        }
    });
}

export { addNoteRequest };
