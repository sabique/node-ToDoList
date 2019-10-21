document.addEventListener('click', (e) => {
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
})