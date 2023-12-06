// Quick and messy way 
function createListItem(item) {
    const li = document.createElement('li');
    

    li.innerHTML = `${item}
    <button class="remove-item btn-link text-red">
      <i class="fa-solid fa-xmark"></i>
    </button>    
    `; 
    document.querySelector('.items').appendChild(li)
    item = document.getElementById('item-input');
}
// createListItem('banan');