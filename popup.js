
async function translateText(text) {
    const keyApi = 'trnsl.1.1.20200426T161332Z.7fe1817dbba3ab2e.3a4922173ab967494faa385ba295a9e747945d76'
    let url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${keyApi}&text=${text}&lang=en-ru`
    url = encodeURI(url)
    return await fetch(url)
}

window.onload = () => {
    const translateEl = document.getElementById('translate')
    const original = document.getElementById('original')

    const code = `
        text = Array.from(document.querySelectorAll('.rc-Phrase.active')).map(el=>el.innerText);
        text
    `
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            { code },
            async function (text) {
                original.innerText = text
                res = await translateText(text)
                translate_text = (await res.json()).text
                translateEl.innerText = translate_text[0].split(" ").join(" ")
            });
    });

}

