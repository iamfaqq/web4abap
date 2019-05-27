document.getElementsByClassName('btn-primary')[0].addEventListener("click", prompt_name);

function prompt_name() {
    let field = document.getElementsByClassName('input')[1];
    field.value = prompt('Whats you name?', 'Harvey Birdman');
    validate_username(field);
}

function validate_username(fld) {
    let error = "";
    let illegalChars = /\W/; // allow letters, numbers, and underscores

    if (fld.value == "") {
        fld.style.background = 'LightSalmon';
        error = "You didn't enter a username.\n";
        alert(error);
        return false;

    } else if ((fld.length < 5) || (fld.length > 15)) {
        fld.style.background = 'LightSalmon';
        error = "The username is the wrong length.\n";
        alert(error);
        return false;

    } else if (illegalChars.test(fld.value)) {
        let reversed = '';
        for(i = fld.value.length - 1; i >= 0; i--) {
            reversed += fld.value[i];
        }
        fld.value = reversed;
        fld.style.background = 'LightSalmon';
        error = "The username contains illegal characters.\n";
        alert(error);
        return false;

    } else {
        fld.value = fld.value.toLocaleUpperCase();
        fld.style.background = 'LimeGreen';
    }
    return true;

}