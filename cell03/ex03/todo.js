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
    localStorage.setItem("todo", JSON.stringify(toDoArray));
}

function loadToDo() {
    const savedToDo = localStorage.getItem("todo");
    if (savedToDo) {
        try {
            const toDoArray = JSON.parse(savedToDo);
            toDoArray.forEach(item => addToDo(item));
        } catch (error) {
            console.error("Error parsing todo data from LocalStorage:", error);
        }
    }
}
