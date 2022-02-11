let customElement = document.querySelector('.custom-select');
let cE = document.querySelector('.select-box');

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

    fetch('select.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        appendData(data);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });

    function appendData(data) {

        for (let i = 0; i < data.length; i++) {
            let innerLabel = document.querySelector("label");
            innerLabel.innerHTML = data[i].labelText;
            
        }
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
