/************ ACTION READ *************/

let objList;
render();

/************ ACTION CREATE *************/

const collapseUpdate = document.getElementById('collapseUpdate');
const form = document.getElementsByClassName('contact-form')[0];
const createButton = document.getElementById('createButton');

const isValidElement = element => { return element.name && element.value; };

// FORM DATA TO JSON OBJECT
const formToJSON = elements => [].reduce.call(elements, (data, element) => {
  if (isValidElement(element)) {
    data[element.name] = element.value;
  }
  return data;
}, {});

// SEND JSON OBJECT TO SERVER
const handleFormSubmit = event => {
  event.preventDefault(); // event ?
  let data = formToJSON(form.elements); // form?
  data = JSON.stringify(data);
  if (form.elements.submit.textContent == 'Create') {
    fetchin(data, 'create');
  } else if (form.elements.submit.textContent == 'Update') {
    fetchin(data, 'update');
  }
};

form.addEventListener('submit', handleFormSubmit);

createButton.addEventListener('click', prepareForm);

function prepareForm() {
  collapseUpdate.classList = "collapse";
  form.reset();
  form.elements.submit.textContent = 'Create';
  form.elements.password.disabled = false;

};
/************** ACTION UPDATE *************/

const collapseForm = document.getElementById('collapseCreate');
const updSelect = document.getElementById('updateSelect');
const updButton = document.getElementById('updateButton');

updButton.addEventListener('click', upd => loadObject(updSelect));
updSelect.addEventListener('change', loadForm);

/************** ACTION DELETE *************/

const delSelect = document.getElementById('deleteSelect');
const delButton = document.getElementById('deleteButton');
const confirmButton = document.getElementById('confirmDelete');

delButton.addEventListener('click', del => loadObject(delSelect));
confirmButton.addEventListener('click', del => fetchin('', 'delete')); 

/************ FUNCTION *************/

function fetchin(data, action) {
  let url = '';
  let method = 'POST';
  if (action == 'create') {
    url = 'http://195.50.2.67:2403/a-khabibulin';  
  } else if (action == 'update') {
    url = url.concat('http://195.50.2.67:2403/a-khabibulin' + '/' + updSelect.selectedOptions[0].value);
  } else if(action == 'delete'){
    url = url.concat('http://195.50.2.67:2403/a-khabibulin' + '/' + delSelect.selectedOptions[0].value);
    method = 'DELETE'
  };
  fetch(url, {
    method: method, // PUT not work
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: data
  })
    .then(res => res.json())
    .then(res => console.log(res))
    .then(render());
};

// LOAD OBJECT TO SELECT OPTION
function loadObject(select) {
  collapseForm.classList = "collapse";
  for (let i = 0; i < objList.length; i++) {
    const opt = document.createElement("option");
    opt.value = objList[i].id;
    opt.innerHTML = objList[i].username;
    if (select.options[i + 1] == undefined) {
      select.appendChild(opt);
    } else if (select.options[i + 1].value != objList[i].id) {
      select.appendChild(opt);
    }
  }
};

// LOAD OBJECT FROM SELECTED OPTION TO FORM
function loadForm() {
  let obj = objList.find(obj => {
    return obj.id === updSelect.selectedOptions[0].value
  })
  if (obj !== undefined) {
    form.elements.username.value = obj.username;
    form.elements.lastname.value = obj.lastname;
    form.elements.password.disabled = true;
    form.elements.company.value = obj.company;
    form.elements.placeofwork.value = obj.placeofwork;
    form.elements.speciality.value = obj.speciality;
    form.elements.gender.value = obj.gender;
    form.elements.age.value = obj.age;
    form.elements.experience.value = obj.experience;
    form.elements.submit.textContent = 'Update'
    collapseForm.classList = "collapse show";
  }
};

// TABLE MAKE AND ADDING NEW OBJECT
function render() {
  fetch('http://195.50.2.67:2403/a-khabibulin')
    .then(response => response.json())
    .then(data => {
      objList = data;
      const header = Object.keys(data[0]);
      const table = document.createElement("table");
      table.classList = "table table-striped table-dark"; // table.classList.add('table table-dark') why?!
      let tr = table.insertRow(-1);
      for (let i = 0; i < header.length; i++) {
        const th = document.createElement("th");
        th.innerHTML = header[i];
        tr.appendChild(th);
      }
      for (let i = 0; i < data.length; i++) {
        tr = table.insertRow(-1);
        for (let j = 0; j < header.length; j++) {
          let tabCell = tr.insertCell(-1);
          tabCell.innerHTML = data[i][header[j]];
        }
      }
      const divContainer = document.getElementById("showData");
      divContainer.innerHTML = "";
      divContainer.appendChild(table);
    })
    .catch(error => console.error(error))
};

