document.getElementsByClassName('btn-primary')[0].addEventListener("click", open_google);
document.getElementsByClassName('btn-danger')[0].addEventListener("click", delete_function);

let inner_form = document.getElementById('form').innerHTML;
let buttons = document.getElementsByClassName('btn');

function open_google() {
    window.open('http://google.com', '_blank');
}

function button_change(button) {
    switch(button) {
        case "success":
            buttons[1].innerHTML = 'Add form';
            buttons[1].className = 'btn btn-success';
            buttons[1].removeEventListener('click', delete_function);
            buttons[1].addEventListener("click", add_function);
            break;
        case "danger":
            buttons[1].innerHTML = 'Delete form';
            buttons[1].className = 'btn btn-danger';
            buttons[1].removeEventListener('click', add_function);
            buttons[1].addEventListener("click", delete_function);
            break;
        default:
            break;
    }
}

function delete_function() {
    let element = document.getElementById('form');
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    button_change("success");
}

function add_function() {
    document.getElementById('form').innerHTML = inner_form;
    button_change("danger");
}

/* // alternative solution

document.getElementsByClassName('btn-primary')[0].addEventListener("click", open_google);

let inner_form = document.getElementById('form').innerHTML;

let add_delete_button = document.querySelector('#add-delete-button');
add_delete_button.addEventListener("click", on_add_delete_clicked);

function open_google() {
    window.open('http://google.com', '_blank');
}

function on_add_delete_clicked() {
    let is_adding = add_delete_button.classList.contains("btn-success");
    if (is_adding) {
        add_function();
    } else {
        delete_function();
    }
}

function add_function() {
    const button = add_delete_button;
    document.getElementById('form').innerHTML = inner_form;

    // Update button
    button.textContent = 'Delete form';
    button.classList.remove("btn-success");
    button.classList.add("btn-danger");
}

function delete_function() {
    let element = document.getElementById('form');
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    // Update button
    const button = add_delete_button;
    button.textContent = 'Add form';
    button.classList.remove("btn-danger");
    button.classList.add("btn-success");
}

*/