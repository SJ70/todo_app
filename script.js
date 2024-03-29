import getCheckBoxSvgEl from './js/svgElements/checkBox.js';
import getCheckBoxBlankSvgEl from './js/svgElements/checkBoxBlank.js';
import getDeleteSvgEl from './js/svgElements/delete.js';
import getEditSvgEl from './js/svgElements/edit.js';

const DATA_PARSER = '|||||';
const DATA_KEY = 'items_data';

const createBtn = document.getElementById("create-btn");
const itemsEl = document.getElementById("items");

let itemList = [];

createBtn.addEventListener('click', addNewItem);

function addNewItem() {
    const item = createNewItem();
    itemList.unshift(item);
    const itemEl = createItemEl(item);
    itemsEl.prepend(itemEl);
    saveChange();
}

function createNewItem() {
    return {
        id: crypto.randomUUID(),
        date: new Date().getTime(),
        text: '',
        complete: false
    }
}

function createItemEl(item) {
    const itemEl = document.createElement('li');
    itemEl.classList.add('item');
    itemEl.classList.add(item.complete ? 'complete' : 'incomplete');

    const checkBoxButtonEl = document.createElement('button');
    const checkBoxSvgEl = getCheckBoxSvgElByComplete(item.complete);
    checkBoxButtonEl.append(checkBoxSvgEl);
    checkBoxButtonEl.addEventListener('click', () => switchComplete(item, itemEl, checkBoxButtonEl));

    const inputEl = document.createElement('input');
    inputEl.type = 'text';
    inputEl.value = item.text;
    inputEl.tabIndex = -1;
    inputEl.addEventListener('mousedown', (e) => e.preventDefault());
    inputEl.addEventListener('blur', () => updateText(inputEl, item));

    const editButtonEl = document.createElement('button');
    editButtonEl.append(getEditSvgEl());
    editButtonEl.addEventListener('click', () => focusInput(inputEl));

    const deleteButtonEl = document.createElement('button');
    deleteButtonEl.append(getDeleteSvgEl());
    deleteButtonEl.addEventListener('click', () => remove(itemEl, item));

    itemEl.append(checkBoxButtonEl);
    itemEl.append(inputEl);
    itemEl.append(editButtonEl);
    itemEl.append(deleteButtonEl);

    return itemEl;
}

function switchComplete(item, itemEl, checkBoxButtonEl) {
    item.complete = !item.complete;
    // console.log(item.complete);

    const classFrom = item.complete ? 'incomplete' : 'complete';
    const classTo = item.complete ? 'complete' : 'incomplete';
    itemEl.classList.replace(classFrom, classTo);

    const prevSvgEl = Array.from(checkBoxButtonEl.children)[0];
    checkBoxButtonEl.replaceChild(getCheckBoxSvgElByComplete(item.complete), prevSvgEl);
    saveChange();
}

function getCheckBoxSvgElByComplete(complete) {
    return complete ? getCheckBoxSvgEl() : getCheckBoxBlankSvgEl()
}

function focusInput(inputEl) {
    inputEl.focus();
}

function updateText(inputEl, item) {
    item.text = inputEl.value;
    // console.log(item.text);
    saveChange();
}

function remove(itemEl, item) {
    itemEl.remove();
    itemList = itemList.filter(i => i !== item);
    // console.log(item);
    // console.log(itemList);
    saveChange();
}

function saveChange() {
    let data = itemList.map(JSON.stringify).join(DATA_PARSER);
    // console.log(data);
    localStorage.setItem(DATA_KEY, data);
    console.log('saved :', data);
}

window.onload = function() {
    const data = localStorage.getItem(DATA_KEY);
    // console.log(data)
    if (!data) {
        return;
    }
    const savedItemList = data.split(DATA_PARSER).map(JSON.parse);
    // console.log(savedItemList);

    itemList = savedItemList.sort((i1, i2) => - i1.date + i2.date);
    for (let item of savedItemList) {
        const itemEl = createItemEl(item);
        itemsEl.append(itemEl);
    }
    console.log("loaded : ",itemList)
}