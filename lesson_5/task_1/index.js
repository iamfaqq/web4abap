/************ ACTION READ *************/

let objList;
let object;

fetchin('', 'read');

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
  event.preventDefault();
  let data = formToJSON(form.elements);
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

function UpdateObjectList() {
  fetch('SOME URL INSERT HERE')
    .then(res => {
      if (res.status == 200) {
        return res.json()
          .then(res => { objList = res; return objList })
      }
    })
  return objList;
}

// GET DATA FROM SERVER
function fetchin(data, action) {
  let url = 'SOME URL INSERT HERE';
  let method = 'POST';

  // MAKE URL WHEN UPDATE OR DELETE
  if (action == 'update') {
    url = url.concat('/' + updSelect.selectedOptions[0].value);
  } else if (action == 'delete') {
    url = url.concat('/' + delSelect.selectedOptions[0].value);
    method = 'DELETE'
  };

  // GETTING DATA WITH BODY, WHEN READ WITHOUT BODY, WHEN DELETE DELETE OBJECT FROM TABLE AND RELOAD OBJLIST
  if (action !== 'read') {
    fetch(url, {
      method: method, // PUT not work
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: data
    })
      .then(res => {
        if (res.status == 200) {
          if (action != 'delete') {
            return res.json()
              .then(res => { object = res, render(object), UpdateObjectList() })
          } else {
            obj = findObject(delSelect.selectedOptions[0].value);
            sameObject(obj);
            objList = UpdateObjectList();
            updSelect.remove(delSelect.selectedIndex);
            delSelect.remove(delSelect.selectedIndex);
          }
        }
        else { return res.json() }
      })
      .then(res => console.log(res))
      .catch(error => console.error(error));
  } else {
    fetch('SOME URL INSERT HERE')
      .then(res => {
        if (res.status == 200) {
          return res.json()
            .then(res => { if (typeof res !== 'undefined' && res.length > 0) { objList = res, render(objList) } })
        }
      })
      .then(res => console.log(res))
      .catch(error => console.error(error));
  };
};

const sameObject = object => {
  let table = document.getElementsByTagName('table')[0];
  let delArea = document.getElementById('collapseDelete');
  for (let i = 0; i < table.rows.length; i++) {
    if (table.rows[i].textContent.indexOf(object.id) !== -1 && delArea.classList.value == 'collapse show') {
      table.deleteRow(i);
      return true;
    } else if (table.rows[i].textContent.indexOf(object.id) !== -1 && form.elements.submit.textContent == 'Update') {
      for (j = 0; j < Object.keys(object).length; j++) {
        table.rows[i].cells[j].innerHTML = Object.values(object)[j]
      }
      return true
    }
  }
}

// MAKE TABLE, ADDING UPDATE DELETE AN OBJECT
function render(data) {
  let header;
  if (Array.isArray(data)) {
    header = Object.keys(data[0]);
  } else {
    header = Object.keys(data);
  }
  if (!document.getElementsByTagName('table')[0]) {
    const table = document.createElement("table");
    table.classList = "table table-striped table-light"; // table.classList.add('table table-dark') why?!
    let tr = table.insertRow(-1);
    for (let i = 0; i < header.length; i++) {
      const th = document.createElement("th");
      th.innerHTML = header[i];
      tr.appendChild(th);
    }
    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        tr = table.insertRow(-1);
        for (let j = 0; j < header.length; j++) {
          let tabCell = tr.insertCell(-1);
          tabCell.innerHTML = data[i][header[j]];
        }
      }
    } else {
      tr = table.insertRow(-1);
      for (let i = 0; i < header.length; i++) {
        let tabCell = tr.insertCell(-1);
        tabCell.innerHTML = Object.values(data)[i];
      }
    }
    const divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
  } else {
    table = document.getElementsByTagName('table')[0];
    let tr = table.insertRow(-1);
    if (!sameObject(data)) {
      for (let i = 0; i < Object.keys(data).length; i++) {
        let tabCell = tr.insertCell(-1);
        tabCell.innerHTML = Object.values(data)[i];
      }
    }
  }
  return data;
};

// LOAD OBJECT TO SELECT OPTION
function loadObject(select) {
  updSelect.selectedIndex = 0;
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
}

const findObject = id => {
  let obj = objList.find(obj => { return obj.id === id })
  return obj
}

// LOAD SELECTED OBJECT TO FORM
function loadForm() {

  obj = findObject(updSelect.selectedOptions[0].value)

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


