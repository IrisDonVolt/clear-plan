function changeTheme(button) {
    if (button.id == "waffle-theme-image") {
        document.body.style.setProperty("--lightwash", "#FFDAB7");
        document.body.style.setProperty("--primary-color", "#872E0B");
        document.body.style.setProperty("--secondary-color", "#9A5A16");
        document.body.style.setProperty("--accent-color", "#000000");
        document.body.style.setProperty("--primary-font", "'Courier New', Courier, monospace"); 

        localStorage.setItem("lightwash", "#FFDAB7");
        localStorage.setItem("primary-color", "#872E0B");
        localStorage.setItem("secondary-color", "#9A5A16");
        localStorage.setItem("accent-color", "#000000");
        localStorage.setItem("primary-font", "'Courier New', Courier, monospace");

        document.cookie="primarycolor="+"#872E0B";

    }

    if (button.id == "icecream-theme-image") {
        document.body.style.setProperty("--lightwash", "#DAF9DE");
        document.body.style.setProperty("--primary-color", "#ff0073"); 
        document.body.style.setProperty("--secondary-color", "#00ccff"); 
        document.body.style.setProperty("--accent-color", "#ff94cb");
        document.body.style.setProperty("--primary-font", "icecream_font");  

        localStorage.setItem("lightwash", "#DAF9DE");
        localStorage.setItem("primary-color", "#FF0073");
        localStorage.setItem("secondary-color", "#00CCFF");
        localStorage.setItem("accent-color", "#FF94CB");
        localStorage.setItem("primary-font", "icecream_font"); 

        document.cookie="primarycolor="+"#FF0073";
    }

    if (button.id == "sage-theme-image") {
        document.body.style.setProperty("--lightwash", "#F8F3E1");
        document.body.style.setProperty("--primary-color", "#737816");
        document.body.style.setProperty("--secondary-color", "#E3DBBB");
        document.body.style.setProperty("--accent-color", "#abb774");
        document.body.style.setProperty("--primary-font", "sage_font");

        localStorage.setItem("lightwash", "#F8F3E1");
        localStorage.setItem("primary-color", "#737816");
        localStorage.setItem("secondary-color", "#E3DBBB");
        localStorage.setItem("accent-color", "#ABB774");
        localStorage.setItem("primary-font", "sage_font"); 

        document.cookie="primarycolor="+"#737816";
    }    

    if (button.id == "strawberry-theme-image") {
        document.body.style.setProperty("--lightwash", "#ffdbdb");
        document.body.style.setProperty("--secondary-color", "#c3324c");
        document.body.style.setProperty("--accent-color", "#009222");
        document.body.style.setProperty("--primary-color", "#0071189b");
        document.body.style.setProperty("--primary-font", "strawberry_font"); 

        localStorage.setItem("lightwash", "#FFDBDB");
        localStorage.setItem("primary-color", "#C3324C");
        localStorage.setItem("secondary-color", "#009222");
        localStorage.setItem("accent-color", "#00711898");
        localStorage.setItem("primary-font", "strawberry_font"); 

        document.cookie="primarycolor="+"#C3324C";
    }

    if (button.id == "fmn-theme-image") {
        document.body.style.setProperty("--lightwash", "#BDE8F5");
        document.body.style.setProperty("--primary-color", "#1c4ea4");
        document.body.style.setProperty("--secondary-color", "#4988C4");
        document.body.style.setProperty("--accent-color", "#3d6ca9");
        document.body.style.setProperty("--primary-font", "fmn_font"); 

        localStorage.setItem("lightwash", "#BDE8F5");
        localStorage.setItem("primary-color", "#1C4EA4");
        localStorage.setItem("secondary-color", "#4988C4");
        localStorage.setItem("accent-color", "#3D6CA9");
        localStorage.setItem("primary-font", "fmn_font"); 

        document.cookie="primarycolor="+"#1C4EA4";
    }

    if (button.id == "bw-theme-image") {
        document.body.style.setProperty("--lightwash", "#fafafa");
        document.body.style.setProperty("--primary-color", "#1e1e1e"); 
        document.body.style.setProperty("--secondary-color", "#444343");
        document.body.style.setProperty("--accent-color", "#1e1e1e");

        localStorage.setItem("lightwash", "#FAFAFA");
        localStorage.setItem("primary-color", "#1E1E1E");
        localStorage.setItem("secondary-color", "#444343");
        localStorage.setItem("accent-color", "#1E1E1E");

        document.cookie="primarycolor="+"1E1E1E";
    }   
    
    if (button.id == "dys-font-1-image") {
        document.body.style.setProperty("--primary-font", "'Verdana', Geneva, Tahoma, sans-serif"); 

        localStorage.setItem("primary-font", "'Verdana', Geneva, Tahoma, sans-serif");
    }

    if (button.id == "dys-font-2-image") { 
        document.body.style.setProperty("--primary-font", "comic_sans"); 

        localStorage.setItem("primary-font", "comic_sans"); 
    }
}