


// Initialize variables 
let localStorageList = "localStorageList";

// Function definitions
function getLocalList() {
    let list = localStorage.getItem(localStorageList);
    console.log(list)

    if (list === null) {        
        return []
    }
    else {
        return list.split(",");
    }
    
}


function displayList() {
    let listArray = getLocalList();
    // if listArray is null, then list Array = [] 

    listArray.forEach((item, index) => {
        let li = document.createElement("li");
        li.innerText = item;
        li.setAttribute('id', 'listItem-' + index);
        
        let deleteItem = document.createElement("button");
        deleteItem.innerText = 'X'
        deleteItem.setAttribute('id', 'deleteItemButton-' + item);
        deleteItem.setAttribute('class', 'deleteItemButton');

        li.appendChild(deleteItem)
        document.getElementById("currentList").appendChild(li);

    })    
}


let addElement = () => {
    let itemValue = document.getElementById("itemInput").value;
    console.log(itemValue)
    if (itemValue === '') {
        alert("No input given")
    }
    else {
        let listArray = getLocalList();
        listArray.push(itemValue);
        localStorage.setItem(localStorageList, listArray);

    }
}


function randomElementFromArray (arr) {
    return value = arr[Math.floor(Math.random() * arr.length)]; 
    
}



// Event handling
let addButton = document.getElementById("addButton");
addButton.addEventListener('click', addElement);

let randomizeButton = document.getElementById("randomizeButton")
randomizeButton.addEventListener('click', () => {
    console.log("randomize button")
    randomSelection = randomElementFromArray(getLocalList()) 
    document.getElementById("randomSelection").innerText = randomSelection;
})

let clearButton = document.getElementById("clearButton");
clearButton.addEventListener('click', () => {
    console.log("clear button");
    localStorage.removeItem(localStorageList);
    location.reload();
    
})


window.onload = () => {
    displayList();
    console.log("window onload fired")

 
    let deleteItemButton = document.getElementsByClassName("deleteItemButton");
    
    // deleteItem button operation kept inside window onload function 
    // since there were bugs when kept outside 1. Clicking on delete button
    // was not clearing the list 
    for (let i = 0; i < deleteItemButton.length; i++) {
        deleteItemButton[i].onclick = () => {
            let delItemId = deleteItemButton[i].parentElement.id;
            let delItemIndex = parseInt(delItemId.substring(delItemId.indexOf("-")+1, delItemId.length));

            let arr = getLocalList();
            arr.splice(delItemIndex, 1);
            console.log(arr)

            // Below conditional to ensure no blank item is shown 
            // after last item is deleted
            if (arr.length === 0) {
                localStorage.removeItem(localStorageList);
            }
            else {
                localStorage.setItem(localStorageList, arr);

            }            
            location.reload();
            
    
        }
    }

}




















