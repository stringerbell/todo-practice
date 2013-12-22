$(function () {
    //check to see if there's anything in Local storage, and add them if there is
    if (localStorage && localStorage.getItem('items')) {
        var items = JSON.parse(localStorage.getItem('items'));
        for (var item in items) {
            addItem(items[item]);
        }
    }
    // capture form submit, and add items to view, and local storage
    $('form').on('submit', function (e) {
        e.preventDefault();
        var item = $('#addTodoItem').val();
        addItem(item);
        addItemToLocalStorage(item);
    });

    // add item function
    function addItem(item) {
        $('.items-container').append(
            '<div class="item"><h1>' +
            '<span class="text-danger glyphicon glyphicon-remove"></span> '
            + item +
            '</h1></div> ');
    }

    // remove item from view and local storage when clicking it (could target the remove icon instead)
    $('body').on('click', '.item', function (e, i) {
        var index = $(this).index('.item');
        $(this).remove();
        removeFromLocalStorage(index);
    });

    function addItemToLocalStorage(item) {
        var items = JSON.parse(localStorage.getItem('items'));
        // nothing in local storage
        if (items === null) {
            localStorage.setItem('items', JSON.stringify([item]));
        } else {
            items.push(item);
            localStorage.setItem('items', JSON.stringify(items));
        }
    }

    function removeFromLocalStorage(index) {
        var items = JSON.parse(localStorage.getItem('items'));
        items.splice(index, 1);
        localStorage.setItem('items', JSON.stringify(items));
    }
});
