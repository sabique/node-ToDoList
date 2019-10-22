function itemTemplate(item) {
    return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
        <span class="item-text">${item.text}</span>
        <div>
        <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
        <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
        </div>
        </li>`;
}

//Initial Load
let itemsHTML = items.map((item) => {
    return itemTemplate(item)
}).join('');

document.getElementById('item-list').insertAdjacentHTML('beforeend', itemsHTML);

//Create Item
let createField = document.getElementById('create-field');

document.getElementById('create-form').addEventListener('submit', (e) => {
    e.preventDefault();
    axios.post('/create-item', {text: createField.value})
    .then((response) => {
        document.getElementById('item-list').insertAdjacentHTML('beforeend', itemTemplate(response.data));
        createField.value = '';
        createField.focus();
    })
    .catch((err) => {
        console.log('Please try again later.');
    });
})

document.addEventListener('click', (e) => {
    //Update Item
    if(e.target.classList.contains("edit-me")) {
        let updateItem = e.target.parentElement.parentElement.querySelector('.item-text');
        let userInput = prompt("Enter your desired new text", updateItem.innerHTML);

        if(userInput) {
            axios.post('/update-item',{text: userInput, id: e.target.getAttribute('data-id')})
            .then(() => {
                updateItem.innerHTML = userInput;
            })
            .catch(() => {
                console.log('Please try again later.');
            });
        }
    }

    //Delete Item
    if(e.target.classList.contains("delete-me")) {
        let deleteItem = e.target.parentElement.parentElement;
        let userInput = confirm(`Are you sure you want to delete "${deleteItem.querySelector('.item-text').innerHTML}"?`);
      
        if(userInput) {
            axios.post('/delete-item',{id: e.target.getAttribute('data-id')})
            .then(() => {
                deleteItem.remove();
            })
            .catch(() => {
                console.log('Please try again later.');
            });
        }
    }
})