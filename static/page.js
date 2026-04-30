// ================= NOTES =================
function addEntity(){
    stopDrawingMode(); // stops drawing when switching tool

    const note = document.createElement("div"); // creates a new div
    note.className = "note";
    note.contentEditable = true; // allows typing inside the notepad
    note.innerHTML = "<br>"; 
    note.style.left = "100px"; 
    note.style.top = "100px";
    
    document.getElementById("canvas").appendChild(note); // adds notepad to the page
    makeDraggable(note); // makes note movable
    addDeleteButton(note); // add delete icon
    note.focus(); 
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
    stopDrawingMode(); // stops drawing when switching tool

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

// ================= DRAW =================
const drawCanvas = document.getElementById("drawCanvas");
const ctx = drawCanvas.getContext("2d");

let drawing = false;
let drawMode = false;
let erasing = false;

// resize canvas
function resizeCanvas() {
    drawCanvas.width = window.innerWidth;
    drawCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// toggle drawing mode
function toggleDraw() {
    drawMode = true;
    erasing = false;

    drawCanvas.style.pointerEvents = "auto";
    drawCanvas.style.cursor = "crosshair"; // crosshair - cursor shanges to plus 
    drawCanvas.style.zIndex = "2";
}

// stop drawing
function stopDrawingMode() {
    drawMode = false;
    erasing = false;
    drawing = false;

    drawCanvas.style.pointerEvents = "none";
    drawCanvas.style.cursor = "default";
    drawCanvas.style.zIndex = "0";
}

// start drawing
drawCanvas.addEventListener("mousedown", (e) => {
    if (!drawMode) return;

    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
});

// drawing
drawCanvas.addEventListener("mousemove", (e) => {
    if (!drawing || !drawMode) return;

    ctx.lineTo(e.clientX, e.clientY);

    if (erasing) {
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineWidth = 20;
    } else {
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
    }

    ctx.lineCap = "round";
    ctx.stroke();
});

// stop drawing
drawCanvas.addEventListener("mouseup", () => {
    drawing = false;
});

drawCanvas.addEventListener("mouseleave", () => {
    drawing = false;
});

// switch tools////////
document.addEventListener("mousedown", function(e) {

    if (
        e.target.closest(".sidebar") ||
        e.target.closest(".toolbar") ||
        e.target.closest(".task-bar") ||
        e.target.closest(".note") ||
        e.target.closest(".todo") ||
        e.target.closest(".table-box") ||
        e.target.closest(".image-box") ||
        e.target.closest("button") ||
        e.target.closest("input")
    ) {
        stopDrawingMode();
    }
});

// ================ ERASER ====================
function toggleEraser() {
    drawMode = true;
    erasing = true;

    drawCanvas.style.pointerEvents = "auto";
    drawCanvas.style.cursor = "cell";
    drawCanvas.style.zIndex = "2";
}

// ================= TABLE ====================
function addTable() {
    stopDrawingMode();

    let rows = prompt("Enter number of rows:");
    let cols = prompt("Enter number of columns:");

    rows = parseInt(rows);
    cols = parseInt(cols);
    

    if (isNaN(rows) || isNaN(cols) || rows <= 0 || cols <= 0) {
        alert("Please enter valid numbers!");
        return;
    }

    const tableBox = document.createElement("div");
    tableBox.className = "table-box";
    tableBox.style.left = "200px";
    tableBox.style.top = "200px";

    const table = document.createElement("table");

    for (let i = 0; i < rows; i++) {
        const row = document.createElement("tr");

        for (let j = 0; j < cols; j++) {
            const cell = document.createElement("td");
            cell.contentEditable = true;
            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    tableBox.appendChild(table);
    document.getElementById("canvas").appendChild(tableBox);

    makeDraggable(tableBox);
    addDeleteButton(tableBox);
}

// ================= ADD IMAGE ====================
function addImage() {
    stopDrawingMode();

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = function() {
        const file = input.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = function(e) {
            const imgBox = document.createElement("div");
            imgBox.className = "image-box";

            imgBox.style.left = "200px";
            imgBox.style.top = "200px";
            imgBox.style.width = "200px";
            imgBox.style.height = "150px";

            const img = document.createElement("img");
            img.src = e.target.result;

            imgBox.appendChild(img);
            document.getElementById("canvas").appendChild(imgBox);

            makeDraggable(imgBox);
            addDeleteButton(imgBox);
        };

        reader.readAsDataURL(file);
    };

    input.click();
}