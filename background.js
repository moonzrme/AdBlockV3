// background.js


chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.get(['totalBlocked'], (result) => {
        if (result.totalBlocked === undefined) {
            chrome.storage.local.set({ totalBlocked: 0 });
        }
    });
    console.log("AdBlock V3: Service Worker запущено.");
});


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "adBlocked") {
        const count = request.count;

        
        chrome.storage.local.get(['totalBlocked'], (result) => {
            let newTotal = (result.totalBlocked || 0) + count;
            
            
            chrome.storage.local.set({ totalBlocked: newTotal });

            
            if (newTotal > 0) {
                chrome.action.setBadgeText({ text: newTotal.toString() });
                chrome.action.setBadgeBackgroundColor({ color: "#FF0000" });
            }
        });
    }
});