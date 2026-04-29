var lightwash = localStorage.getItem("lightwash"); 
var primarycolor = localStorage.getItem("primary-color"); 
var secondarycolor = localStorage.getItem("secondary-color"); 
var accentcolor = localStorage.getItem("accent-color"); 
var primaryfont = localStorage.getItem("primary-font"); 

var root = document.documentElement; 
root.style.setProperty("--lightwash", lightwash); 
root.style.setProperty("--primary-color", primarycolor); 
root.style.setProperty("--secondary-color", secondarycolor); 
root.style.setProperty("--accent-color", accentcolor);
root.style.setProperty("--primary-font", primaryfont); 
