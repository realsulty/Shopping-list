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



function onClear(){
    
    const itemList = document.getElementById('item-list');
    const items = itemList.querySelector('li');
    while (itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }
}

const clearBtn = document.querySelector('#clear');
clearBtn.addEventListener('click', ( )=> onClear());

// Create a function track dragging
// *** can be used in games and such
// These called event hanlder functions -- evt -- e -- event -- different names 
function onDrag(e){
    document.querySelector('h1').textContent= `X ${e.pageX} Y ${e.pageY}`}; // This will make this h1
    // used as a counter to track the movment of the notepad *** could be used on games ***

document.querySelector('img').addEventListener('drag', onDrag);