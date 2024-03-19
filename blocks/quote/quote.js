export default function decorate(block){
    const quoteDiv = block.querySelector(':scope > div > div');
    const blockquote = document.createElement(tagName : 'blockquote');
    blockquote.innerHTML = `"${quoteDiv.innerHTML}"`;
}