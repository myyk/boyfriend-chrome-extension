console.log('Content script loaded');

var sourceWordsToTargetWords = [
    [['bro', 'bruh', 'bruv', 'brah', 'broseph', 'mate'], 'boyfriend'],
    [['bros', 'bruhs', 'bruvs', 'brahs'], 'boyfriends'],
    [['brosephine'], 'girlfriend'],
    [['babe'], 'idk your name (so I\'m going to call you something that supposedly sounds like I\'m complimenting you because I have a favour to ask)'],
];

function replaceText(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        let text = node.nodeValue;
        sourceWordsToTargetWords.forEach(([sourceWords, targetWord]) => {
            sourceWords.forEach(sourceWord => {
                let regex = new RegExp(`\\b${sourceWord}\\b`, 'gi');
                text = text.replace(regex, (match) => {
                    if (match === match.toUpperCase()) {
                        return targetWord.toUpperCase();
                    } else if (match[0] === match[0].toUpperCase()) {
                        return targetWord.charAt(0).toUpperCase() + targetWord.slice(1);
                    } else {
                        return targetWord;
                    }
                });
            });
        });
        node.nodeValue = text;
    } else if (node.nodeType === Node.ELEMENT_NODE && node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') {
        node.childNodes.forEach(child => replaceText(child));
    }
}

window.onload = () => {
    console.log('Window onload event fired');
    replaceText(document.body);
};