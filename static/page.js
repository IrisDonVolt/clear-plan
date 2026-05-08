var pgno_value = document.getElementById('page-number').textContent.toString(); 
var pgno = pgno_value.substring(pgno_value.indexOf(' ')).trim(); 

var date_value = document.getElementById('date-display').textContent.toString();

var canvas = document.getElementById('canvas'); 

var page_title_input = document.getElementById('title-input'); 
page_title_input.addEventListener('blur', (e) => {
    document.forms['page-title'].submit(); 
});

var prev_button = document.getElementById('prev-button'); 
var next_button = document.getElementById('next-button'); 

// ================================ CLICK LISTENER FOR BUTTON ==============================
document.addEventListener('click', (e) => {
    if (e.target.parentNode.className == "checked") {
        e.stopPropagation(); 
        let item = e.target.parentNode.parentNode; 
        item.children[1].style.textDecoration = null; 
        let value = 0;
        e.target.parentNode.className = "unchecked";
        location.href = `/updateTaskCheck/${date_value}/${pgno}/${item.id}/${value}`;
    }
    if (e.target.className == "unchecked") {
        e.stopPropagation(); 
        let item = e.target.parentNode; 
        item.children[1].style.textDecoration = "line-through"; 
        let value = 1;
        e.target.className = "checked"; 
        location.href = `/updateTaskCheck/${date_value}/${pgno}/${item.id}/${value}`;
    }
}); 

prev_button.addEventListener('click', (e) => {
    if (pgno != "1") {
        location.href = "/turnPage/" + date_value + "/" + (parseInt(pgno)-1); 
    }
}); 

next_button.addEventListener('click', (e) => {
    location.href = "/turnPage/" + date_value + "/" + (parseInt(pgno)+1);
}); 
// ================= BLUR LISTENER FOR NOTE =================

function addNoteListener(note) {

    note.addEventListener('blur', (e) => {
        let note_content_with_x= e.target.innerText; 
        let note_content= note_content_with_x.slice(0, note_content_with_x.length-1).trim(); // get the value of note after it loses focus

        document.getElementById('hidden-note-id').setAttribute('value', e.target.id); 
        document.getElementById('hidden-note-content').setAttribute('value', note_content); 
        document.getElementById('hidden-note-position-top').setAttribute('value', e.target.style.top);
        document.getElementById('hidden-note-position-left').setAttribute('value', e.target.style.left);  
        
        document.forms['hidden-note-form'].submit();  
    });
}

// ================= BLUR LISTENER FOR TODO =================

function addBlurListener(taskitem) {

    taskitem.addEventListener('blur', (e) => {

        document.getElementById('hidden-taskitem-id').setAttribute('value', e.target.parentNode.id); 
        document.getElementById('hidden-container-id').setAttribute('value', e.target.parentNode.parentNode.id);
        document.getElementById('hidden-taskitem-content').setAttribute('value', e.target.innerText); 

        document.forms['hidden-taskitem-form'].submit(); 
    });
}

// ================ TYPING LISTENERS FOR TASK ITEMS =================================
function addTypingListeners(text) {
    // press enter to create new task
    item = text.parentNode; 
    container = item.parentNode;
    text.addEventListener("keydown", function(e) {

        if (e.code == "Enter") {
            e.preventDefault();  
            addTodoItem(container);

            setTimeout(() => {
                container.lastChild.querySelector(".todo-text").focus();
            }, 0);

        }

        if (e.code == "Backspace" && text.innerText.trim() == "") {
            e.preventDefault(); 

            if (container.children.length > 2) {
                item.remove();
                location.href = `/deleteEntity/${date_value}/${pgno}/${item.id}`;
            }
        }
    });
}

// ================ LOAD READER ===================

function loadReader(file) {
    var reader = new FileReader();

    reader.onload = function(e) {
        var imgBox = document.createElement("div");
        imgBox.className = "image-box";

        imgBox.style.left = "200px";
        imgBox.style.top = "200px";
        imgBox.style.width = "200px";
        imgBox.style.height = "150px";

        var img = document.createElement("img");
        img.id = crypto.randomUUID(); 
        img.src = e.target.result;

        imgBox.appendChild(img);
        canvas.appendChild(imgBox);

        makeImageDraggable(imgBox);
        addDeleteButton(imgBox);

        document.getElementById('hidden-image-id').setAttribute('value', img.id);
        document.getElementById('hidden-image-position-top').setAttribute('value', imgBox.style.top); 
        document.getElementById('hidden-image-position-left').setAttribute('value', imgBox.style.left); 
        document.getElementById('hidden-image-position-width').setAttribute('value', imgBox.style.width); 
        document.getElementById('hidden-image-position-height').setAttribute('value', imgBox.style.height); 

        document.forms['hidden-image-form'].submit(); 
    };

    reader.readAsDataURL(file);
}

// ================= NOTES =================
function addNote(){
    const note = document.createElement("div"); // creates a new div
    note.id = crypto.randomUUID();  
    note.className = "note";
    note.contentEditable = true; // allows typing inside the notepad
    note.innerHTML = "<br>"; 
    note.style.left = "100px"; 
    note.style.top = "100px";

    canvas.appendChild(note); // adds notepad to the page
    makeNoteDraggable(note); // makes note movable
    addDeleteButton(note); // add delete icon
    note.focus();  

    // add listeners to note 
    addNoteListener(note);   
}

// ================= DRAG =================
function makeNoteDraggable(element){
    let offsetX = 0, offsetY = 0; // stores mouse offset 

    element.onmousedown = function(e){ // when mouse is pressed
        offsetX = e.clientX - element.offsetLeft; // calculate x offset
        offsetY = e.clientY - element.offsetTop; // calculate y offset
        
        document.onmousemove = function(e){ // when mouse moves
            element.style.left = (e.clientX - offsetX) + "px"; // move horizontally
            element.style.top = (e.clientY - offsetY) + "px"; // move vertically
        }

        document.onmouseup = function(e){ // when mouse is released
            document.onmousemove = null; // stops moving
        }
    }
}

function makeTaskDraggable(element){
    let offsetX = 0, offsetY = 0; // stores mouse offset 

    element.onmousedown = function(e){ // when mouse is pressed
        offsetX = e.clientX - element.offsetLeft; // calculate x offset
        offsetY = e.clientY - element.offsetTop; // calculate y offset
        
        document.onmousemove = function(e){ // when mouse moves
            element.style.left = (e.clientX - offsetX) + "px"; // move horizontally
            element.style.top = (e.clientY - offsetY) + "px"; // move vertically
        }

        element.onmouseup = function(e){ // when mouse is released
            document.onmousemove = null; // stops moving
                document.getElementById('task-id').setAttribute('value', element.id)
                document.getElementById('taskposition-top').setAttribute('value', element.style.top); 
                document.getElementById('taskposition-left').setAttribute('value', element.style.left); 

                document.forms['hidden-taskposition-form'].submit();
            
        }
    }
}

function makeImageDraggable(element) {
    let offsetX = 0, offsetY = 0; // stores mouse offset 

    element.onmousedown = function(e){ // when mouse is pressed
        offsetX = e.clientX - element.offsetLeft; // calculate x offset
        offsetY = e.clientY - element.offsetTop; // calculate y offset
        
        document.onmousemove = function(e){ // when mouse moves
            element.style.left = (e.clientX - offsetX) + "px"; // move horizontally
            element.style.top = (e.clientY - offsetY) + "px"; // move vertically
        }

        document.onmouseup = function(){ // when mouse is released
            document.onmousemove = null; // stops moving
        }
    }
}

// ================= DELETE BUTTON =================
function addDeleteButton(container) {
    const del = document.createElement("span");
    del.innerHTML = "⨂"; //DELETE ICONNNNNNNNNNNN
    del.className = "delete-btn";

    del.contentEditable = false;

    del.onclick = function(e) {
        e.stopPropagation(); // prevents drag
        container.remove(); // delete that element

        location.href="/deleteEntity/" + date_value + "/" + pgno + "/" + container.id; 
    };

    container.appendChild(del);

    
}

// ================= TODO =================
function addTodo() {

    const todo = document.createElement("div");
    todo.id = crypto.randomUUID();  // creates todo container
    todo.className = "todo";
    todo.style.left = "100px";
    todo.style.top = "100px";

    canvas.appendChild(todo); // adds todo to page
    makeTaskDraggable(todo); // makes todo movable
    addDeleteButton(todo); // add delete icon // add onblur listener for the taskbox 
    
    addTodoItem(todo); // adds first task
}

function addTodoItem(container) {
    const item = document.createElement("div");
    item.id = crypto.randomUUID();  // creates one task row
    item.className = "todo-item";

    const checkbox = document.createElement("div"); // creates checkbox
    checkbox.className = "unchecked"; 

    const text = document.createElement("div"); // creates text area
    text.className = "todo-text";
    text.contentEditable = true; // allows typing
    text.textContent="Task"; 

    item.appendChild(checkbox);
    item.appendChild(text);
    container.appendChild(item);

    addTypingListeners(text);
    addBlurListener(text); 

    document.getElementById('hidden-taskitem-id').setAttribute('value', item.id); 
    document.getElementById('hidden-container-id').setAttribute('value', container.id);
    document.getElementById('hidden-taskitem-content').setAttribute('value', item.children[1].innerText); 

    document.forms['hidden-taskitem-form'].submit(); 
}


// ================= ADD IMAGE ====================
function addImage() {

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = function() {
        var file = input.files[0];
        if (!file) return;

        document.getElementById('hidden-image').setAttribute('value', file); 

        loadReader(file); 
    };

    input.click();
}