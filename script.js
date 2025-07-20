// Selecting Colours and Making Cards

let plus = document.querySelector('.plus');
let taskArea = document.querySelector('.task-area');


let selectedColour = '';

let color = document.querySelectorAll('.color-option');

color.forEach(function(element){
    element.addEventListener('click', function(){
        color.forEach(function(element){
            element.style.border = '1px solid rgba(255, 255, 255, 0.2)';
        })
        selectedColour = this.style.backgroundColor;
        this.style.border = '3px solid grey'
    })
})

plus.addEventListener('click', function(){
    if(selectedColour == ''){
        alert('Pick a Colour')
        return;
    }
    let newCard = document.createElement('div');
    newCard.classList.add('task-card');
    if(selectedColour=='pink'){
        newCard.style.backgroundColor = 'rgba(255, 182, 193, 0.25)'
    }
    else if(selectedColour=='lightgreen'){
        newCard.style.backgroundColor = 'rgba(144, 238, 144, 0.25)'
    }
    else if(selectedColour=='lightblue'){
        newCard.style.backgroundColor = 'rgba(173, 216, 230, 0.25)'
    }
    else if(selectedColour=='gold'){
        newCard.style.backgroundColor = 'rgba(255, 215, 0, 0.25)'
    }
    taskArea.appendChild(newCard);
})

document.addEventListener('click', function(e){
    if((!e.target.classList.contains('color-option') && !e.target.classList.contains('plus'))){
        color.forEach(function(element){
            element.style.border = '1px solid rgba(255, 255, 255, 0.2)';
        });
        selectedColour = '';
    }
});

// Selecting cards and Moving, editing them

let selectedCard;

document.addEventListener('click', function(e){
    if(e.target.classList.contains('task-card')){
        document.querySelectorAll('.task-card').forEach(function(element){
            element.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        })
        e.target.style.border = '3px solid white';
        selectedCard = e.target;
    }
    else{
        document.querySelectorAll('.task-card').forEach(function(element){
            element.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        })
        selectedCard = null;
    }
})

// Issue -> if we click anywhere else, then the card gets unselected, we need it for controls

document.addEventListener('click', function(e){
    if(e.target.classList.contains('task-card')){
        e.target.addEventListener('dblclick', function(){
            
        })
    }
})

