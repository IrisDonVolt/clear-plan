function changeBookColor(button) {
    var book_div = document.getElementById('book');
    book_div.style.display = "flex"; 
    document.getElementById('placeholder-text').style.display = "none"; 
    var color = button.style.backgroundColor; 
    book_div.style.backgroundColor = color; 
}

function changeBinderColor(button) {
    var color = button.style.backgroundColor; 
    var binder_div = document.getElementById('binder'); 
    binder_div.style.display = "flex"; 
    document.getElementById('placeholder-text').style.display = "none";
    binder_div.style.backgroundColor = color;
}