var prevButton = document.getElementById('prevButton'); 
var nextButton = document.getElementById('nextButton'); 
var monthYear = document.getElementById('monthYear'); 
var daysContainer = document.getElementById('days');
var selectDate = null; 
var display_pages_created = document.getElementById('pages-created'); 
var display_entities_created = document.getElementById('entities-created'); 

var monthArray = {
    'January': 0, 
    'February': 1, 
    'March': 2, 
    'April': 3, 
    'May': 4, 
    'June': 5, 
    'July': 6, 
    'August': 7, 
    'September': 8, 
    'October': 9, 
    'November': 10, 
    'December': 11
}

var currentDate = new Date(); 
// var month = null;  
// var year = null;

var dropdown = document.getElementById("dropdown-content"); 

function settingsDropdown() {
    if (dropdown.style.display == "none") {
        dropdown.style.display = "flex"; 
    }
    else {
        dropdown.style.display = "none"; 
    }
}

function positionToggle(position) {
    var complete_bar = document.getElementById('complete-bottom-bar');
    var taskbar = document.getElementById('taskbar'); 
    var element_flex_box = document.getElementById('element-flex-box'); 

    if (position == "right") {
        if (complete_bar.parentNode == element_flex_box) {
            element_flex_box.removeChild(complete_bar); 
        }
        element_flex_box.appendChild(complete_bar); 

        dropdown.style.right = "100%";
        dropdown.style.left = null; 
        complete_bar.style.flexDirection = "column"; 
        complete_bar.style.left = null; 
        complete_bar.style.right = "30px"; 
        complete_bar.style.bottom = "200px"; 
        complete_bar.style.top = null; 
        complete_bar.style.position = "absolute"

        taskbar.style.flexDirection = "column"; 
        taskbar.style.borderRadius = "20px";

        dropdown.style.display = "none"; 
    }

    if (position == "left") {
        if (complete_bar.parentNode == element_flex_box) {
            element_flex_box.removeChild(complete_bar); 
        }

        dropdown.style.left="100%"; 
        dropdown.style.right = null; 
        complete_bar.style.flexDirection = "column"; 
        complete_bar.style.left="0px"; 
        complete_bar.style.bottom = null; 
        complete_bar.style.top = "100px"; 

        taskbar.style.flexDirection = "column"; 
        taskbar.style.borderRadius = "20px"; 
        element_flex_box.insertBefore(complete_bar, element_flex_box.firstChild); 
        complete_bar.style.position = "relative"; 

        dropdown.style.display = "none"; 
    }

    if (position == "bottom") {
        dropdown.style.bottom = "100%";  
        complete_bar.style.flexDirection = "row"; 
        complete_bar.style.left = null;  
        complete_bar.style.top = null; 
        complete_bar.style.right = null; 

        taskbar.style.flexDirection = "row"; 
        taskbar.style.borderRadius = "48px"; 
        complete_bar.style.position = "fixed"; 
        complete_bar.style.bottom = "30px";

        dropdown.style.display = "none"; 

        if (complete_bar.parentNode == element_flex_box) {
            element_flex_box.removeChild(complete_bar); 
            document.body.appendChild(complete_bar); 
        }
    }
}

function renderCalendar() {
    var month = currentDate.getMonth(); 
    var year = currentDate.getFullYear(); 
    
    var firstDayOfMonth = new Date(year, month, 1); 
    var lastDayOfMonth = new Date(year, month + 1, 0); 

    var daysInMonth = lastDayOfMonth.getDate(); 
    var startingDay = firstDayOfMonth.getDay(); 

    monthYear.textContent = firstDayOfMonth.toLocaleString('default', {month:'long'}) + " " + year; 

    daysContainer.innerHTML = ''; 

    // add empty cells for the days before the start of the month 
    for (let i=0; i<startingDay; i++) {
        var emptyCell = document.createElement('div'); 
        emptyCell.classList.add('day-cell'); 
        daysContainer.appendChild(emptyCell); 
    }

    // add actual days of the month 
    for (var day=1; day <= daysInMonth; day++) {
        var dayCell = document.createElement('div'); 
        dayCell.classList.add('date-text'); 
        dayCell.textContent = day; 

        // highlight the current day 
        if (
            day == currentDate.getDate() && 
            month == currentDate.getMonth() && 
            year == currentDate.getFullYear()
        ) {
            dayCell.classList.add('current-day'); 
        }

        dayCell.addEventListener('click', function() {
            selectedDate(this); 
        }); 
        daysContainer.appendChild(dayCell); 
    }
}

// navigate to the previous month 
prevButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1); 
    renderCalendar(); 
});

nextButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1); 
    renderCalendar(); 
}); 

function selectedDate(date) {
    var date_display = document.getElementById('date-display'); 

    var day = date.textContent; 
    var monthYear = document.getElementById('monthYear').textContent;

    date_display.textContent = day + " " + monthYear;
    var yearBuilder = monthYear.slice(-4).toString(); 
    var monthName = monthYear.substring(0, monthYear.indexOf(' ')); 
    var monthBuilder = monthArray[monthName] + 1

    var dateBuilderWithFormat = day + "-" + monthBuilder + "-" + yearBuilder; 
    document.getElementById('selected-date').setAttribute('value', dateBuilderWithFormat); 

}
    



// initial render of calendar 
renderCalendar(); 