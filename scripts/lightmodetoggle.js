function toggleLightMode() {
    var body = document.body;    
    var button = document.querySelector("#navbar button[onclick='toggleLightMode()']");

    body.classList.toggle("light-mode");    

    if (body.classList.contains("light-mode")) {
        button.textContent = "Toggle Dark Mode";
    } else {
        button.textContent = "Toggle Light Mode";
    }
}