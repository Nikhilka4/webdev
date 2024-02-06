function addTask(){
    if(inputBox.value === ''){
        alert("You must write something")
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        let editIcon = document.createElement("span");
        editIcon.innerHTML = "\u270E"; // Unicode for edit icon
        editIcon.className = "edit";
        li.appendChild(editIcon);

        let span = document.createElement("span")
        span.innerHTML = "\u00d7"
        li.appendChild(span)
    }

    inputBox.value = ""
    saveData();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName ==="LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        if(e.target.className === "edit"){
            let newText = prompt("Enter new text:");
            if(newText){
                e.target.parentElement.firstChild.nodeValue = newText;
                saveData();
            }
        } else {
            e.target.parentElement.remove();
            saveData();
        }
    }
},false);
