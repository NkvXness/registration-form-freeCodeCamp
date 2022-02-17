let customElement = document.querySelector('.custom-select');
let cE = document.querySelector('.select-container');

let newOption = document.createElement('div');
let newOptionSpan = document.createElement('span');
newOption.classList.add('selected');
newOptionSpan.innerHTML = 'Select an option...';
cE.appendChild(newOption);
newOption.appendChild(newOptionSpan);

for(let i = 0; i < 6; i++){
    let newItemOption = document.createElement('div');
    newItemOption.classList.add('option');

    let newInput = document.createElement('input');
    newInput.setAttribute('type', 'radio');
    newInput.setAttribute('name', 'category');
    newInput.classList.add('radio');

    let newlabel = document.createElement('label');
    newlabel.setAttribute('for', 'id_from_input');
    newlabel.classList.add('label');

    customElement.appendChild(newItemOption);
    newItemOption.appendChild(newInput);
    newItemOption.appendChild(newlabel);

}

fetch('select.json')
.then(function (response) {
    return response.json();
})
.then(function (data) {
    appendData(data);
});

function appendData(data) {
    for (let j = 0; j < data.length; j++) {
        let innerLabel = document.getElementsByClassName("label");
        innerLabel[j].innerHTML += data[j].labelText;
    }
}

const selected = document.querySelector(".selected");
const optionsList = document.querySelectorAll(".option");

selected.addEventListener("click", () => {
  customElement.classList.toggle("active");
});

optionsList.forEach(o => {
  o.addEventListener("click", () => {
    selected.innerHTML = o.querySelector("label").innerHTML;
    customElement.classList.remove("active");
  });
});


const password = document.getElementById('password');
const toggle = document.getElementById('toggle');

toggle.addEventListener("click", () => {
    if (password.type === 'password'){
        password.setAttribute('type', 'text');
        toggle.classList.add('hide');
    }else{
        password.setAttribute('type', 'password');
        toggle.classList.remove('hide');
    }
});

const form = document.getElementById('survey-form');
const email = document.getElementById('email');
const age = document.getElementById('number');
const phoneNumber = document.getElementById('phoneNumber');
const checkIconClass = document.querySelector('.checkClass');

const ckeckIcon = document.getElementsByClassName('emailPass');
    for(let i = 0; i < ckeckIcon.length; i++){
        ckeckIcon[i].style.display = "none";
    }

const errorMessage = document.getElementsByClassName('errorMessage');
    for(let i = 0; i < errorMessage.length; i++){
        errorMessage[i].style.display = "none";
    }

const validPhoneNumber = phoneNumber => {
    const phoneExpression = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return phoneExpression.test(Number(phoneNumber));
}

const validMail = email => {
    const mailExpression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return mailExpression.test(String(email).toLowerCase());
}
const invalidChars = ['+', '-', 'e'];

age.addEventListener('input', () => {
  age.value = age.value.replace(/[e\+\-]/gi, '');
});

age.addEventListener("keydown", k => {
  if (invalidChars.includes(k.key)) {
    k.preventDefault();
  }
});

form.addEventListener('submit', e => {
    e.preventDefault();

    validateInput();
})

const validateInput = () => {
    const emailValue = email.value.trim();
    const phoneValue = phoneNumber.value;
    const ageValue = age.value;

    if(emailValue === ''){
        for(let i = 0; i < errorMessage.length; i++){
            errorMessage[0].style.display = 'none';
        }
        for(let i = 0; i < ckeckIcon.length; i++){
            ckeckIcon[0].style.display = 'none';
        }
    }else if(!validMail(emailValue)){
        for(let i = 0; i < errorMessage.length; i++){
            errorMessage[0].style.display = 'inline-block';
        }
        for(let i = 0; i < ckeckIcon.length; i++){
            ckeckIcon[0].style.display = 'inline-block';
        }
        checkIconClass.classList.add('warning');
    }else{
        for(let i = 0; i < ckeckIcon.length; i++){
            ckeckIcon[0].style.display = 'inline-block';
        }
        checkIconClass.classList.remove('warning');
        for(let i = 0; i < errorMessage.length; i++){
            errorMessage[0].style.display = 'none';
        }
    }

    if(phoneValue === ''){
        for(let i = 0; i < errorMessage.length; i++){
            errorMessage[1].style.display = 'none';
        }
        for(let i = 0; i < ckeckIcon.length; i++){
            ckeckIcon[1].style.display = 'none';
        }
    }else if(!validPhoneNumber(phoneValue)){
        for(let i = 0; i < errorMessage.length; i++){
            errorMessage[1].style.display = 'inline-block';
        }
        for(let i = 0; i < ckeckIcon.length; i++){
            ckeckIcon[1].style.display = 'inline-block';
            ckeckIcon[1].classList.add('warning');
        }
    }else{
        for(let i = 0; i < ckeckIcon.length; i++){
            ckeckIcon[1].style.display = 'inline-block';
        }
        ckeckIcon[1].classList.remove('warning');
        for(let i = 0; i < errorMessage.length; i++){
            errorMessage[1].style.display = 'none';
        }
    }

    if(ageValue === ''){
        for(let i = 0; i < errorMessage.length; i++){
            errorMessage[2].style.display = 'none';
        }
        for(let i = 0; i < ckeckIcon.length; i++){
            ckeckIcon[2].style.display = 'none';
        }
    }else if(ageValue < 18 || ageValue > 100){
        for(let i = 0; i < errorMessage.length; i++){
            errorMessage[2].style.display = 'inline-block';
        }
        for(let i = 0; i < ckeckIcon.length; i++){
            ckeckIcon[2].style.display = 'inline-block';
            ckeckIcon[2].classList.add('warning');
        }
    }else{
        for(let i = 0; i < ckeckIcon.length; i++){
            ckeckIcon[2].style.display = 'inline-block';
        }
        ckeckIcon[2].classList.remove('warning');
        for(let i = 0; i < errorMessage.length; i++){
            errorMessage[2].style.display = 'none';
        }
    }
}
