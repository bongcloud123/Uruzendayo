document.getElementById('adt').addEventListener('click', function() {
    // Get the value of the input field
    const newItemText = document.getElementById('newItemText').value;

    // If the input field is not empty
    if (newItemText.trim() !== '') {
        // Create a new list item
        const newItem = document.createElement('li');
        newItem.textContent = newItemText;

        // Add the new item to the list
        document.getElementById('sortable-list').appendChild(newItem);

        // Clear the input field
        document.getElementById('newItemText').value = '';
    }
});
