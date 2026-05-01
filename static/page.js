var pgno_value = document.getElementById('page-number').textContent.toString(); 
var pgno = pgno_value.substring(pgno_value.indexOf(' ')).trim(); 

var date_value = document.getElementById('date-display').textContent.toString();

var canvas = document.getElementById('canvas'); 

var page_title_input = document.getElementById('title-input'); 
page_title_input.addEventListener('blur', (e) => {
    document.forms['page-title'].submit(); 
});

// ================= WHEN NOTE IS LOADED IN HTML =================
function loadNote(note) {
    
    canvas.appendChild(note); // adds notepad to the page
    makeDraggable(note); // makes note movable
    addDeleteButton(note); // add delete icon
    note.focus(); 

    // logic: when the note loses focus, update its value in db 
    note.addEventListener('blur', (e) => {
        let note_content_with_x= e.target.innerText; 
        let note_content= note_content_with_x.slice(0, note_content_with_x.length-1); // get the value of note after it loses focus

        let canvas_array = canvas.children; 
        let index = Array.from(canvas_array).indexOf(e.target) + 1;
        
        document.getElementById('hidden-note-id').setAttribute('value', index); 
        document.getElementById('hidden-note-content').setAttribute('value', note_content); 

        document.forms['hidden-form'].submit();
        
    });
}

// ================= NOTES =================
function addNote(){
    const note = document.createElement("div"); // creates a new div
    note.className = "note";
    note.contentEditable = true; // allows typing inside the notepad
    note.innerHTML = "<br>"; 
    note.style.left = "100px"; 
    note.style.top = "100px";
    loadNote(note);    
}

// ================= DRAG =================
function makeDraggable(element){
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
    };

    container.appendChild(del);
}

// ================= TODO =================
function addTodo() {

    const todo = document.createElement("div"); // creates todo container
    todo.className = "todo";
    todo.style.left = "150px";
    todo.style.top = "150px";

    addTodoItem(todo); // adds first task

    document.getElementById("canvas").appendChild(todo); // adds todo to page
    makeDraggable(todo); // makes todo movable
    addDeleteButton(todo); // add delete icon
}

function addTodoItem(container) {
    const item = document.createElement("div"); // creates one task row
    item.className = "todo-item";

    const checkbox = document.createElement("input"); // creates checkbox
    checkbox.type = "checkbox";

    const text = document.createElement("div"); // creates text area
    text.className = "todo-text";
    text.contentEditable = true; // allows typing

    // press enter to create new task
    text.addEventListener("keydown", function(e) {

        if (e.key === "Enter") {
            e.preventDefault();
            addTodoItem(container);

            setTimeout(() => {
                container.lastChild.querySelector(".todo-text").focus();
            }, 0);
        }

        if (e.key === "Backspace" && text.innerText.trim() === "") {
            e.preventDefault();

            if (container.children.length > 1) {
                item.remove();

                setTimeout(() => {
                    const last = container.lastChild.querySelector(".todo-text");
                    if (last) last.focus();
                }, 0);
            }
        }
    });

    item.appendChild(checkbox);
    item.appendChild(text);
    container.appendChild(item);

    text.focus();
}