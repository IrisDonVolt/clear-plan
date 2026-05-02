var pgno_value = document.getElementById('page-number').textContent.toString(); 
var pgno = pgno_value.substring(pgno_value.indexOf(' ')).trim(); 

var date_value = document.getElementById('date-display').textContent.toString();

var canvas = document.getElementById('canvas'); 

var page_title_input = document.getElementById('title-input'); 
page_title_input.addEventListener('blur', (e) => {
    document.forms['page-title'].submit(); 
});

// ================= WHEN NOTE IS LOADED IN HTML =================

function addListener(note) {
    
    // blur listener 
    note.addEventListener('blur', (e) => {
        let note_content_with_x= e.target.innerText; 
        let note_content= note_content_with_x.slice(0, note_content_with_x.length-1).trim(); // get the value of note after it loses focus

        document.getElementById('hidden-note-id').setAttribute('value', e.target.id); 
        document.getElementById('hidden-note-content').setAttribute('value', note_content); 
        document.getElementById('hidden-note-position-top').setAttribute('value', e.target.style.top);
        document.getElementById('hidden-note-position-left').setAttribute('value', e.target.style.left); 
        document.getElementById('hidden-note-width').setAttribute('value', e.target.style.width); 
        document.getElementById('hidden-note-height').setAttribute('value', e.target.style.height); 
        
        document.forms['hidden-form'].submit();  
    });
}

function addResizeListener(note, resizer_r, resizer_b) {
    // current position of the mouse 
    let x = 0; 
    let y = 0; 

    // dimensions of the element 
    let w = 0; 
    let h = 0; 

    const mouseDownHandler = function(e) {
        // get the current mouse position 
        x = e.clientX; 
        y = e.clientY; 

        // calculate the dimension of the element 
        const styles = window.getComputedStyle(note);
        w = parseInt(styles.width, 10); 
        h = parseInt(styles.height, 10); 

        document.addEventListener('mousemove', mouseMoveHandler); 
        document.addEventListener('mouseup', mouseUpHandler); 
    }; 

    const mouseMoveHandler = function(e) {
        // how far the mouse has been moved 
        const dx = e.clientX - x; 
        const dy = e.clientY - y; 

        note.style.width = `${w + dx}px`; 
        note.style.height = `${h + dy}px`; 
    }; 

    const mouseUpHandler = function(e) {
        document.removeEventListener('mousemove', mouseMoveHandler); 
        document.removeEventListener('mouseup', mouseUpHandler); 
    };

    resizer_b.addEventListener('mousedown', mouseDownHandler); 
    resizer_r.addEventListener('mousedown', mouseDownHandler); 
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
    makeDraggable(note); // makes note movable
    addDeleteButton(note); // add delete icon
    note.focus();  

    // add listeners to note 
    addListener(note);   
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

        location.href="/deleteNote/" + date_value + "/" + pgno + "/" + container.id; 
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