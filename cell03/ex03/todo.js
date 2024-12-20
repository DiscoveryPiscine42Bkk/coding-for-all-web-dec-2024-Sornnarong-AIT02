window.onload = () => {
    loadToDo();
};

document.getElementById("newBtn").onclick = () => {
    const todoText = prompt("Enter your TO DO:");
    if (todoText && todoText.trim() !== "") {
        addToDo(todoText);
        saveToDo();
    }
};

function addToDo(text) {
    const toDoDiv = document.createElement("div");
    toDoDiv.textContent = text;
    toDoDiv.onclick = () => deleteToDo(toDoDiv);
    const list = document.getElementById("ft_list");
    list.insertBefore(toDoDiv, list.firstChild);
}

function deleteToDo(toDoDiv) {
    if (confirm("Do you really want to delete this TO DO?")) {
        toDoDiv.remove();
        saveToDo();
    }
}


function saveToDo() {
    const list = document.querySelectorAll("#ft_list div");
    const toDoArray = [];
    list.forEach(item => toDoArray.push(item.textContent));
    document.cookie = "todo=" + JSON.stringify(toDoArray) + ";path=/";
}

function loadToDo() {
    const cookie = document.cookie.split("; ").find(row => row.startsWith("todo="));
    if (cookie) {
        const toDoArray = JSON.parse(cookie.split("=")[1]);
        toDoArray.forEach(item => addToDo(item));
    }
}
