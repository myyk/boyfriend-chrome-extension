var elements = document.getElementsByTagName('*');

var sourceWordsToTargetWords = [
    [['bro', 'bruh', 'bruv', 'brah', 'broseph'], 'boyfriend'],
    [['bros', 'bruhs', 'bruvs', 'brahs'], 'boyfriends'],
];

function makeRegex(sourceWords) {
    return new RegExp('\\b' + sourceWords.join('\\b|\\b') + '\\b', 'g');
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

function makeRegexToTargetWords(sourceWordsToTargetWords, capitalize) {
    return sourceWordsToTargetWords.map(function(sourceAndTarget) {
        var [source,target] = sourceAndTarget;
        if (capitalize) {
            source = source.map(capitalizeFirstLetter);
            target = capitalizeFirstLetter(target);
        }
        return [makeRegex(source), target];
    });
};

var sourceRegexToTargetWords = makeRegexToTargetWords(sourceWordsToTargetWords, true).concat(makeRegexToTargetWords(sourceWordsToTargetWords, false));

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