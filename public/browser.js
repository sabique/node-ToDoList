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