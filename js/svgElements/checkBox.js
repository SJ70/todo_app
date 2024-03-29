export default function getCheckBoxSvgEl() {
    
    const checkBoxSvgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    checkBoxSvgEl.setAttribute('id', 'svg');
    checkBoxSvgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    checkBoxSvgEl.setAttribute('height', '24');
    checkBoxSvgEl.setAttribute('viewBox', '0 -960 960 960');
    checkBoxSvgEl.setAttribute('width', '24');
    
    const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathEl.setAttribute('d', 'm424-312 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z');
    
    checkBoxSvgEl.appendChild(pathEl);

    return checkBoxSvgEl;
}