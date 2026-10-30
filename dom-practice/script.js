const container = document.getElementById('container');
const itemInput = document.getElementById('itemInput');
const addItemButton = document.getElementById('addItemButton');
const removeItemButton = document.getElementById('removeItemButton');
const list = document.getElementById('list');

addItemButton.addEventListener('click', () => {
    const itemText = itemInput.value.trim();
    if (itemText) {
        const itemElement = document.createElement('p');
        itemElement.textContent = itemText;
        list.appendChild(itemElement);
        itemInput.value = '';
    }
});

removeItemButton.addEventListener('click', () => {
    const lastItem = list.lastElementChild;
    if (lastItem) {
        list.removeChild(lastItem);
    }
});