function cardUp(){
    let card = document.querySelectorAll('.card');
    
    card[0].classList.add('cardGo');
    card[0].classList.remove('card');
}

function cancel(){
    let listTast = document.querySelectorAll('.listTast');
    let none = document.querySelectorAll('.none');
    
    listTast[0].innerHTML = '';
    none[0].style.display = 'none';
    
    pointUse('cancel');
}

function cardLeft(){
    let card = document.querySelectorAll('.cardGo');
    
    card[0].classList.add('cardGoLeft');
    card[0].classList.remove('cardGo');
    
    pointUse('false');
    
    setTimeout(()=>{
        card[0].classList.add('card');
        card[0].classList.remove('cardGoLeft');
    }, 1300);
}

function cardRight(){
    let card = document.querySelectorAll('.cardGo');
    let listTast = document.querySelectorAll('.listTast');
    let info = document.querySelectorAll('.info');
    let none = document.querySelectorAll('.none');
    
    if (listTast[0].innerHTML == ''){
        pointUse('true');
    } else {
        pointUse('closed');
    }
    
    card[0].classList.add('cardGoRight');
    card[0].classList.remove('cardGo');
    listTast[0].innerHTML = info[0].innerHTML;
    none[0].style.display = 'block';
    
    setTimeout(()=>{
        card[0].classList.add('card');
        card[0].classList.remove('cardGoRight');
    }, 1300);
}

function pointUse(e){
    let point = document.querySelectorAll('.point');
    
    point[0].classList.add('pointUp');
    point[0].classList.remove('point');
    
    let pointUp = document.querySelectorAll('.pointUp');
    
    if (e == 'true'){
        pointUp[0].innerHTML = 'Принято!';
        pointUp[0].style.color = 'green';
    } else if (e == 'closed') {
        pointUp[0].innerHTML = 'Отказано!';
        pointUp[0].style.color = 'red';
    } else if (e == 'cancel') {
        pointUp[0].innerHTML = 'Отменено!';
        pointUp[0].style.color = 'green';
    } else {
        pointUp[0].innerHTML = 'Отклонено!';
        pointUp[0].style.color = 'red';
    }
    
    setTimeout(()=>{
        pointUp[0].classList.add('point');
        pointUp[0].classList.remove('pointUp');
    }, 1700);
}

function bigPhotoOpen(e){
    let photo = document.querySelectorAll('.bigPhoto');
    let photoSet = document.querySelectorAll('.bigPh');
    
    if (e == 'open'){
        photo[0].style.display = 'block';
        photoSet[0].src = 'IMG/trash.jpg';
    } else {
        photo[0].style.display = 'none';
    }
}

function enter(e){
    let enterH = document.querySelectorAll('.enterH');
    let noneD = document.querySelectorAll('.noneD');
    let setRoute = document.querySelector('#setRoute');
    let name = document.querySelector('#name');
    let commonBut = document.querySelector('#commonBut');
    
    if (e == 'enter'){
        enterH[0].style.display = 'none';
        setRoute.style.display = 'none';
        for (let i = 0; i < noneD.length; i++){
            noneD[i].style.display = 'block';
        }
    } else {
        enterH[0].style.display = 'block';
        setRoute.style.display = 'block';
        for (let i = 0; i < noneD.length; i++){
            noneD[i].style.display = 'none';
        }
    }
    
    if (name.value == 'admin'){
        commonBut.setAttribute('onclick', "rule('open')");
        commonBut.innerHTML = 'управление';
        noneD[0].style.display = 'none';
        noneD[1].style.display = 'none';
    } else {
        commonBut.setAttribute('onclick', "rate('open')");
        commonBut.innerHTML = 'рейтинг';
    }
}

function rate(e){
    let photo = document.querySelectorAll('.rate');
    
    if (e == 'open'){
        photo[0].style.display = 'block';
    } else {
        photo[0].style.display = 'none';
    }
}

function rule(e){
    let rule = document.querySelectorAll('.rule');
    
    if (e == 'open'){
        rule[0].style.display = 'block';
    } else {
        rule[0].style.display = 'none';
    }
}