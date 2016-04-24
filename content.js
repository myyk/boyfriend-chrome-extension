var elements = document.getElementsByTagName('*');

var sourceWordsToTargetWords = [
    [['bro', 'bruh', 'bruv', 'brah', 'broseph'], 'boyfriend'],
    [['Bro', 'Bruh', 'Bruv', 'Brah', 'Broseph'], 'Boyfriend'],
    [['bros', 'bruhs', 'bruvs', 'brahs'], 'boyfriends'],
    [['Bros', 'Bruhs', 'Bruvs', 'Brahs'], 'Boyfriends'],
];

function makeRegex(sourceWords) {
    return new RegExp('\\b' + sourceWords.join('\\b|\\b') + '\\b', 'g');
};

var sourceRegexToTargetWords = sourceWordsToTargetWords.map(function(sourceAndTarget) {
    var [source,target] = sourceAndTarget;
    return [makeRegex(source), target];
});

function replaceTextWithRegexes(text, sourceRegexToTargetWords) {
    for (var k = 0; k < sourceRegexToTargetWords.length; k++) {
        var [regex, targetWord] = sourceRegexToTargetWords[k];
        var replacedText = text.replace(regex, targetWord);
        text = replacedText
    }
    return text;
};

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
            var text = node.nodeValue;
            replacedText = replaceTextWithRegexes(text, sourceRegexToTargetWords);

            if (replacedText !== text) {
                console.log('replaced');
                element.replaceChild(document.createTextNode(replacedText), node);
            }
        }
    }
}