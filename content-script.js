// content-script.js


const autoSkip = () => {
    const skipTerms = ['skip', 'пропустити', 'закрити', 'close', 'advertisement', 'реклама', '✕'];
    const elements = document.querySelectorAll('button, div, span, a');
    
    elements.forEach(el => {
        const text = el.innerText.toLowerCase();
        if (skipTerms.some(term => text.includes(term)) && el.offsetWidth > 0) {
            el.click();
        }
    });
};


const killVideoAds = () => {
    const videos = document.querySelectorAll('video');
    videos.forEach(v => {
        
        if (v.duration > 0 && v.duration < 61) {
            v.muted = true;
            v.playbackRate = 16.0; // Прискорюємо в 16 разів
            v.currentTime = v.duration - 0.1;
        }
    });
};


const removeInvisibleOverlays = () => {
    const allDivs = document.querySelectorAll('div');
    allDivs.forEach(div => {
        const zIndex = window.getComputedStyle(div).zIndex;
        if (zIndex && parseInt(zIndex) > 1000) {
            const rect = div.getBoundingClientRect();
            
            if (rect.width > window.innerWidth * 0.9 && rect.height > window.innerHeight * 0.9) {
                
                if (!div.querySelector('video')) {
                    div.remove();
                }
            }
        }
    });
};


const stopPopups = () => {
    if (!window.isPopupsOverridden) {
        const originalOpen = window.open;
        window.open = function() {
            console.log("AdBlock: Спроба відкрити рекламне вікно заблокована.");
            return null;
        };
        window.isPopupsOverridden = true;
    }
};


const cleanByAttributes = () => {
    const adKeywords = ['ads', 'adv', 'banner', 'reklama', 'popunder', 'teaser'];
    adKeywords.forEach(word => {
        document.querySelectorAll(`[class*="${word}"], [id*="${word}"]`).forEach(el => {
            
            if (!el.innerText.includes('фільм') && !el.innerText.includes('серіал')) {
                el.remove();
            }
        });
    });
};


const run = () => {
    stopPopups();
    cleanByAttributes();
    removeInvisibleOverlays();
    killVideoAds();
    autoSkip();
};


setInterval(run, 500);


window.canRunAds = true;
window.isAdblock = false;

console.log("AdBlock Ultimate: Активовано на всіх сайтах.");