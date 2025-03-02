const button = document.querySelector('button');
button.addEventListener('click', async () => {
        chrome.tabs.create({ url : "https://chatgpt.com/"}, (tab) => {
                chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        func: function () {
                                console.log("test");
                        }
                });
        });
});




      