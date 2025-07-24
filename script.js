// ***************** Creating Cards *****************

// Create-Popup Open and Close

let plus = document.querySelector('.plus');
let popup = document.querySelector('.popup-overlay');


plus.addEventListener('click',function(){
    popup.style.display = 'flex';
})


// Selecting colors from the popup

let popupColors = document.querySelectorAll('.popup-colors .color-option');

popupColors.forEach(function(element){
    element.addEventListener('click', function(){
        popupColors.forEach(function(el){
            el.style.border = '2px solid transparent';
            el.classList.remove('selected');
        });
        selectedColor = this.getAttribute('data-color');
        this.style.border = '2px solid white';
        this.classList.add('selected');
    })
})

document.querySelector('#cancel-popup').addEventListener('click', function(){
    popup.style.display = 'none';
    popupColors.forEach(function(el){
        el.style.border = '2px solid transparent';
        el.classList.remove('selected');
    })
    document.querySelector('#card-title').value='';
    selectedColor=null;
})

// Creating Cards

document.querySelector('#create-card').addEventListener('click', function(){
    let selectedColor = document.querySelector('.popup-colors .color-option.selected');
    if(document.querySelector('#card-title').value=='' && selectedColor==null){
        alert('Pick a color & Add the card Title')
    }
    else if(document.querySelector('#card-title').value==''){
        alert('Add the card Title');
    }
    else if(selectedColor==null){
        alert('Pick a color');
    }
    else{
        let newCardDiv = document.createElement('div');
        newCardDiv.classList.add('ticket-card');
        newCardDiv.classList.add('modern-glass');
        newCardDiv.innerHTML = `
            <div class="ticket-color-bar" style="background-color: ${selectedColor.getAttribute('data-color')}"></div>
            <div class="ticket-content">
                <h3 class="ticket-title">${document.querySelector('#card-title').value}</h3>
                <p class="ticket-body">${document.querySelector('#card-body').value}</p>
            </div>
        `
        document.querySelector('.task-area').appendChild(newCardDiv);
        popup.style.display = 'none';
        document.querySelector('#card-title').value='';
        document.querySelector('#card-body').value='';
        popupColors.forEach(function(el){
            el.style.border = '2px solid transparent';
            el.classList.remove('selected');
        })
        selectedColor=null;
    }
})


//***************** Broom - Deleteing all tickets at once *****************

//Clear-Popup open and close

let clearPopup = document.querySelector('#warningModal');

let broom = document.querySelector('.clear-all');
broom.addEventListener('click', function(){
    clearPopup.style.display = 'flex';
})

// Clearing all tickets

document.querySelector('#confirmDelete').addEventListener('click',function(){
    let ticketList = document.querySelectorAll('.ticket-card');
    ticketList.forEach(function(element){
        element.remove();
    })
    clearPopup.style.display = 'none';
})

document.querySelector('#cancelDelete').addEventListener('click',function(){
    clearPopup.style.display = 'none';
})


// ***************** Deleting Cards *****************

let bin = document.querySelector('.delete');
let isActive = false;

bin.addEventListener('click', function(){
    if(!isActive){
        bin.classList.add('active-delete');
        isActive = true;
    }
})

document.addEventListener('click', function(e){
    if(isActive && e.target.classList.contains('delete')){
        isActive = false;
        bin.classList.remove('active-delete');
    }
    else if(isActive && e.target.closest('.ticket-card')){
        let card = e.target.closest('.ticket-card')
        card.remove();
    }
})


// ***************** Reload Page *****************

let refresh = document.querySelector('.refresh');

refresh.addEventListener('click', function(){
    location.reload();
})


// ***************** Theme Change *****************

let isChanged = false;

let themeChange = document.querySelector('.theme')

themeChange.addEventListener('click', function(){
    if(!isChanged){
        document.documentElement.classList.add('light');
        isChanged = true;
    }
    else{
        document.documentElement.classList.remove('light');
        isChanged = false;
    }
})

// Selecting Cards

let selectedCard;

document.addEventListener('click', function(e){
    let ticketList = document.querySelectorAll('.ticket-card');
    let card = e.target.closest('.ticket-card'); // closest() climbs the DOM tree and looks for the 1st match

    if(e.target.classList.contains('download')){
        return;
    }
    if(!card){
        ticketList.forEach((element)=>{
            element.style.border = '';
        })
        selectedCard = null;
        return;
    }
    ticketList.forEach((element)=>{
        element.style.border = '';
    })
    if(isChanged){
        card.style.border = '3px solid grey';
    }
    else{
        card.style.border = '3px solid white';
    }
    if(card == null){
        return;
    }
    selectedCard = card;
})


// ***************** Download Cards in JSON *****************

document.querySelector('.download').addEventListener('click', function () {
    if (!selectedCard) {
        alert("Select a card to download");
        return;
    }

    const title = selectedCard.querySelector('.ticket-title')?.textContent.trim() || '';
    const description = selectedCard.querySelector('.ticket-body')?.textContent.trim() || '';
    const color = selectedCard.querySelector('.ticket-color-bar')?.style.backgroundColor || '';

    const colorMap = {
        '#ffc0cb': 'pink',
        '#90ee90': 'green',
        '#add8e6': 'blue',
        '#ffd700': 'yellow'
    };

    const colorName = colorMap[color.toLowerCase()] || color;

    const data = {
        title,
        description,
        priority: colorName
    };

    const jsonData = JSON.stringify(data, null, 2);

    const blob = new Blob([jsonData], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'card.json';
    link.click();
});


// ***************** Filtering cards based on colors *****************

let colorList = document.querySelectorAll('.color-palette .color-option')

colorList.forEach(function(color){
    color.addEventListener('click',function(){
        colorList.forEach(function(c){
            c.style.border = '';
        })
        color.style.border = '2px solid white'
        let selectedColor = color.style.backgroundColor;
        let cardList = document.querySelectorAll('.ticket-card');
        cardList.forEach(function(co){
            if(getComputedStyle(co.querySelector('.ticket-color-bar')).backgroundColor!=selectedColor){
                co.style.display = 'none';
            }
            else{
                co.style.display = 'block';
            }
        })

    })
})

document.addEventListener('click', function(e){
    let cardList = document.querySelectorAll('.ticket-card');
    let clickedOnColor = Array.from(colorList).some(color => color.contains(e.target));
    if(!clickedOnColor){
        cardList.forEach(function(co){
            co.style.display = 'block';
        })
        colorList.forEach(function(element){
            element.style.border = ''
        })
    }
})

// ***************** Changing the View *****************

let eye = document.querySelector('.eye');
let eyeActive = false;
eye.addEventListener('click', function(){
    if(!eyeActive){
        const taskArea = document.querySelector('.task-area');
        taskArea.style.flexDirection = 'column';
        taskArea.style.alignItems = 'stretch';
        taskArea.style.gap = '1.2rem';

        document.querySelectorAll('.ticket-card').forEach(card => {
            card.style.width = '100%';
            card.style.height = 'auto';
        });
        eyeActive = true;
    }
    else{
        const taskArea = document.querySelector('.task-area');
        taskArea.style.flexDirection = '';
        taskArea.style.alignItems = '';
        taskArea.style.gap = '1rem';

        document.querySelectorAll('.ticket-card').forEach(card => {
            card.style.width = '';
            card.style.height = '';
        });
        eyeActive = false;
    }

})
