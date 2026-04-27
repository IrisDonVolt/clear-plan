let hidden_lightwash = document.getElementById('hidden-lightwash');
let hidden_primarycolor = document.getElementById('hidden-primarycolor'); 
let hidden_secondarycolor = document.getElementById('hidden-secondarycolor'); 
let hidden_accentcolor = document.getElementById('hidden-accentcolor'); 
let hidden_primaryfont = document.getElementById('hidden-primaryfont'); 

function changeTheme(button) {
    if (button.id == "waffle-theme-image") {
        hidden_lightwash.setAttribute("value", "#FFDAB7"); 
        hidden_primarycolor.setAttribute("value", "#872E0B");
        hidden_secondarycolor.setAttribute("value", "#9A5A16");
        hidden_accentcolor.setAttribute("value", "#000000");
        hidden_primaryfont.setAttribute("value", "'Courier New', Courier, monospace");

        document.body.style.setProperty("--lightwash", "#FFDAB7");
        document.body.style.setProperty("--primary-color", "#872E0B");
        document.body.style.setProperty("--secondary-color", "#9A5A16");
        document.body.style.setProperty("--accent-color", "#000000");
        document.body.style.setProperty("--primary-font", "'Courier New', Courier, monospace"); 
    }

    if (button.id == "icecream-theme-image") {
        hidden_lightwash.setAttribute("value", "#DAF9DE"); 
        hidden_primarycolor.setAttribute("value", "#FF0073");
        hidden_secondarycolor.setAttribute("value", "#00CCFF");
        hidden_accentcolor.setAttribute("value", "#FF94CB");
        hidden_primaryfont.setAttribute("value", "icecream_font");

        document.body.style.setProperty("--lightwash", "#DAF9DE");
        document.body.style.setProperty("--primary-color", "#ff0073"); 
        document.body.style.setProperty("--secondary-color", "#00ccff"); 
        document.body.style.setProperty("--accent-color", "#ff94cb");
        document.body.style.setProperty("--primary-font", "icecream_font");  
    }

    if (button.id == "sage-theme-image") {
        hidden_lightwash.setAttribute("value", "#F8F3E1"); 
        hidden_primarycolor.setAttribute("value", "#737816");
        hidden_secondarycolor.setAttribute("value", "#E3DBBB");
        hidden_accentcolor.setAttribute("value", "#ABB774");
        hidden_primaryfont.setAttribute("value", "sage_font");

        document.body.style.setProperty("--lightwash", "#F8F3E1");
        document.body.style.setProperty("--primary-color", "#737816");
        document.body.style.setProperty("--secondary-color", "#E3DBBB");
        document.body.style.setProperty("--accent-color", "#abb774");
        document.body.style.setProperty("--primary-font", "sage_font");
    }    

    if (button.id == "strawberry-theme-image") {
        hidden_lightwash.setAttribute("value", "#FFDBDB"); 
        hidden_primarycolor.setAttribute("value", "#C3324C");
        hidden_secondarycolor.setAttribute("value", "#009222");
        hidden_accentcolor.setAttribute("value", "#0071189B");
        hidden_primaryfont.setAttribute("value", "strawberry_font");

        document.body.style.setProperty("--lightwash", "#ffdbdb");
        document.body.style.setProperty("--secondary-color", "#c3324c");
        document.body.style.setProperty("--accent-color", "#009222");
        document.body.style.setProperty("--primary-color", "#0071189b");
        document.body.style.setProperty("--primary-font", "strawberry_font"); 
    }

    if (button.id == "fmn-theme-image") {
        hidden_lightwash.setAttribute("value", "#BDE8F5"); 
        hidden_primarycolor.setAttribute("value", "#1C4EA4");
        hidden_secondarycolor.setAttribute("value", "#4988C4");
        hidden_accentcolor.setAttribute("value", "#3D6CA9");
        hidden_primaryfont.setAttribute("value", "fmn_font");

        document.body.style.setProperty("--lightwash", "#BDE8F5");
        document.body.style.setProperty("--primary-color", "#1c4ea4");
        document.body.style.setProperty("--secondary-color", "#4988C4");
        document.body.style.setProperty("--accent-color", "#3d6ca9");
        document.body.style.setProperty("--primary-font", "fmn_font"); 
    }

    if (button.id == "bw-theme-image") {
        hidden_lightwash.setAttribute("value", "#FAFAFA"); 
        hidden_primarycolor.setAttribute("value", "#1E1E1E");
        hidden_secondarycolor.setAttribute("value", "#444343");
        hidden_accentcolor.setAttribute("value", "#1E1E1E");

        document.body.style.setProperty("--lightwash", "#fafafa");
        document.body.style.setProperty("--primary-color", "#1e1e1e"); 
        document.body.style.setProperty("--secondary-color", "#444343");
        document.body.style.setProperty("--accent-color", "#1e1e1e");
    }   
    
    if (button.id == "dys-font-1-image") {
        hidden_primaryfont.setAttribute("value", "'Verdana', Geneva, Tahoma, sans-serif");

        document.body.style.setProperty("--primary-font", "'Verdana', Geneva, Tahoma, sans-serif"); 
    }

    if (button.id == "dys-font-2-image") {
        hidden_primaryfont.setAttribute("value", "comic_sans"); 
        
        document.body.style.setProperty("--primary-font", "comic_sans"); 
    }
}