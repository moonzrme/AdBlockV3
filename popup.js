// popup.js

document.addEventListener('DOMContentLoaded', () => {
    const countElement = document.getElementById('block-count');
    const resetBtn = document.getElementById('reset-btn');

    
    function updateDisplay() {
        chrome.storage.local.get(['totalBlocked'], (result) => {
            const count = result.totalBlocked || 0;
            countElement.textContent = count;
        });
    }

    
    updateDisplay();

    
    resetBtn.addEventListener('click', () => {
        chrome.storage.local.set({ totalBlocked: 0 }, () => {
            updateDisplay();
            chrome.action.setBadgeText({ text: "" }); // Прибрати бейдж
        });
    });

    
    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'local' && changes.totalBlocked) {
            countElement.textContent = changes.totalBlocked.newValue;
        }
    });
});