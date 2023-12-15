const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const itemFilter = document.getElementById('filter');
let isEditMode = false;
const formBtn = itemForm.querySelector('button');

function displayItems() {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach((item) => addItemToDom(item));
    checkUI();
}
function onAddItemSubmit(e){
    e.preventDefault();

    const newItem = itemInput.value;

    // Validate input
    if (newItem === '') {
        alert('Please Insert an item');
        return;
    }
    if (isEditMode) {
        const itemToEdit = itemList.querySelector('.edit-mode');

        removeItemFromStorage(itemToEdit.textContent);
        // itemToEdit.style.color = 'black';
        itemToEdit.remove();
        isEditMode = false
    } else {
        if (checkIfItemExist(newItem)) {
            alert('That item already exists!');
            return;
        }
    }
    addItemToDom(newItem);

    // Add item to locsl sotrage
    addItemToStorage(newItem)
    checkUI();
    itemInput.value = '';  
};

function addItemToDom(item){
// create list item
const li = document.createElement('li');
li.appendChild(document.createTextNode(item)); 

const button = createButton('remove-item btn-link text-red'); // THE CLASS NAME SET TO BE AN ARGUMENT
li.appendChild(button);

itemList.appendChild(li);
}



function createButton(classes){ // CREATED THE FUNCTIONS WITH SET ARGMUNET FOT THE CLASS
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark'); //HERE THE CLASS IS ALREADY TO PASS AS AN ARGUMENT
    button.appendChild(icon);
    return button;

}
function createIcon(classes) { // EASIER WAY SINCE WE SAT THE CLASS AS AN ARGUMENT IN THE FUNC
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;

};
function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage()
    itemsFromStorage.push(item);
    // convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function getItemsFromStorage() {
    let itemsFromStorage;
    if (localStorage.getItem('items') === null){
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;

}

// // Quick and messy way 
// function createListItem(item) {
//     const li = document.createElement('li');
    

//     li.innerHTML = `${item}
//     <button class="remove-item btn-link text-red">
//       <i class="fa-solid fa-xmark"></i>
//     </button>    
//     `; 
//     document.querySelector('.items').appendChild(li)
//     item = document.getElementById('item-input');
// }
// createListItem('banan');



// now This is more efficent way of writing code 

// function newListItem(item){ ***
//     const li = document.createElement('li');
//     li.appendChild(document.createTextNode(item)); 
    
//     const button = createButton('remove-item btn-link text-red'); // THE CLASS NAME SET TO BE AN ARGUMENT
   
//     const icon = createIcon('fa-solid fa-xmark'); //HERE THE CLASS IS ALREADY TO PASS AS AN ARGUMENT

    
//     button.appendChild(icon);
//     li.appendChild(button);
//     document.querySelector('.items').appendChild(li);

// };

// function createButton(classes){ // CREATED THE FUNCTIONS WITH SET ARGMUNET FOT THE CLASS
//     const button = document.createElement('button');
//     button.className = classes;
//     return button;

// }
// function createIcon(classes) { // EASIER WAY SINCE WE SAT THE CLASS AS AN ARGUMENT IN THE FUNC
//     const icon = document.createElement('i');
//     icon.className = classes;
//     return icon;

// }
// newListItem('banan'); 



// // // Replacing an item on dom 
// // function replaceFirstItem() {
// //     const firstItem = document.querySelector('li:first-child');

// //     const li = document.createElement('li');
// //     li.textContent = 'Replaced First';

// //     firstItem.replaceWith(li); // Similar to append child you define the node or the elemnt with our qouts

// // }
// // replaceFirstItem();


// // Here we going to replace all items except for one item only going to be different 

// function replaceAllItems() {
//     const lis = document.querySelectorAll('li');

//     // lis.forEach((item, index) => {
//     //     if (index === 1 ){
//     //         item.innerHTML = 'Second Item';

//     //     } else {
//     //         item.innerHTML = 'Replace All';
//     //     }
//     // })

//     // A cleaner or shorter way of doing it 
//     // we stay inside the function
//     lis.forEach(
//         (item, index)=>
//         (item.innerHTML = index === 1 ? 'Seconded item' : 'Itemzz')
//     );
//     };

//     // replaceAllItems();

// // Remove an item from the dom 
// function removeFirstItem() {

//     const ul = document.querySelector('ul')
//     const li = document.querySelector('li:nth-child(2)')
    
//     ul.removeChild(li);
// }


// // removing an item from dom with a paramter ( argument ) so u could select which one

// function removeItem2(itemNumber){
// const ul = document.querySelector('ul');
// const li = document.querySelectorAll('li')[itemNumber - 1]; // This is the argument section
// ul.removeChild(li);
// }


// // Arrow function one line to remove item
// const removeItem4 = (itemNumber) =>
// document.querySelectorAll('li')[itemNumber - 1].remove();


// // removeFirstItem();
// removeItem4();
function onClickItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        itemClear(e.target.parentElement.parentElement);
    } else {
        setItemToEdit(e.target);
    }
}

function setItemToEdit(item){
    isEditMode = true;
    itemList
    .querySelectorAll('li')
    .forEach((i) => i.classList.remove('edit-mode'));

    item.classList.add('edit-mode')
    formBtn.innerHTML = '<i class="fa-solid fa-pen"> </i> Update Item';
    formBtn.style.backgroundColor = '#228b22'
    itemInput.value = item.textContent;
}

function checkIfItemExist(item){
    const itemsFromStorage = getItemsFromStorage();
    return itemsFromStorage.includes(item);
}
function itemClear(item){
          if (confirm('Are you sure?')) {
            // Removing item from DOM
             item.remove();

             // Remove item from storage 
             removeItemFromStorage(item.textContent);
             checkUI();
          } 
        
}


function removeItemFromStorage(item){
    let itemsFromStorage = getItemsFromStorage();

    // Filter out items to be removed AND Filter will return a new array with the delete items 
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

    // Re-Set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));

}


function onClear() {
    while (itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }

    // clear from local storage 
    localStorage.removeItem('items');
    checkUI();
}

const clearBtn = document.getElementById('clear'); // ** Look up the other event listeners ^



function filterItems(e){
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLocaleLowerCase();
        if (itemName.indexOf(text) != -1) {
            item.style.display ='flex'
        } else {
            item.style.display = 'none';
        }
    });


}




function checkUI() {
itemInput.value = '';

    const items = itemList.querySelectorAll('li'); // The reason this is here and not in the globalscop
    // beacuse you need to initiate this evrey time the function run
    if (items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } 
    else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }

    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = '#333'

}

// Here you can create a function to wrap up all the other functions
// just so you dont leave all of these functions in the global scoope 

function init() {

    // event listeners
    itemForm.addEventListener('submit', onAddItemSubmit);
    itemList.addEventListener('click', onClickItem);
    clearBtn.addEventListener('click', ( )=> onClear()); // The peranthese here fires the functions
    itemFilter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', displayItems);
    checkUI();
}
init();



// Create a function track dragging
// *** can be used in games and such
// These called event object functions -- evt -- e -- event -- different names 
// function onDrag(e){
//     document.querySelector('h1').textContent= `X ${e.pageX} Y ${e.pageY}`};
// This will make this h1
// used as a counter to track the movment of the notepad *** could be used on games ***

// document.querySelector('img').addEventListener('drag', onDrag);


// now This is more efficent way of writing code 