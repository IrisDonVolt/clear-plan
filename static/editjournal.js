function changeBookColor(button) {
    var book_div = document.getElementById('book');
    var color = button.style.backgroundColor; 
    book_div.style.backgroundColor = color; 
}

function changeBinderColor(button) {
    var color = button.style.backgroundColor; 
    var binder_div = document.getElementById('binder'); 
    binder_div.style.backgroundColor = color;
}

function saveInfo() {
    var book_color = document.getElementById('book');
    var binder_color = document.getElementById('binder'); 
}