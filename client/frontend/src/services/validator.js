export const validator = (ev) => {
    var validemail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    var hasNumber = new RegExp(/\d/)
    var onlyDigit= new RegExp(/^[0-9.,]+$/)
    var onlyLetter= new RegExp(/^[a-zA-Z]+$/)
    var validURL =  new RegExp(/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/);

    if (ev.target.id==='username') {
        if (ev.target.value.length < 1) {
            return "Field should be populated."
        }
        else if(validemail.test(ev.target.value)===false) {
            return "Field should be populated with valid email Jhon@doe.xx"
        }
        else {
            return false
        } 
    }
    else if (ev.target.id==='password') {
        if (ev.target.value.length < 1) {
            return "Field should be populated."
        }
        else if (ev.target.value.length < 8) {
            return "Password must contain at least 8 characters."
        }
        else if(onlyDigit.test(ev.target.value)) {
            return "This password is entirely numeric."
        }
        else if(onlyLetter.test(ev.target.value)) {
            return "This password is entirely alphabetic."
        }
        else {
            return false
        } 
    }
    else if (ev.target.id==='first_name') {
        if (ev.target.value.length < 1) {
            return "First Name should be populated."
        }
        else if(ev.target.value.length > 20) {
            return "First Name should be max 20 chars long."
        }
        else if(hasNumber.test(ev.target.value)) {
            return "First Name should contain only letters."
        }
        else {
            return false
        } 
    }
    else if (ev.target.id==='last_name') {
        if (ev.target.value.length < 1) {
            return "Last Name should be populated."
        }
        else if(ev.target.value.length > 25) {
            return "Last Name should be max 25 chars long."
        }
        else if(hasNumber.test(ev.target.value)) {
            return "Last Name should contain only letters."
        }
        else {
            return false
        } 
    }
    else if (ev.target.id==='phone') {
        if (ev.target.value.length < 1) {
            return "Field should be populated"
        }
        else if(!onlyDigit.test(ev.target.value.slice(1))) {
            return "Field should be + and then numeric only."
        }
        else if(ev.target.value[0] !== '+') {
            return "Field should begin with + sign."
        }
        else {
            return false
        } 
    }
    else if (ev.target.id==='photo_url') {
        if (ev.target.value.length < 1) {
            return "Field should be populated."
        }
        else if(!validURL.test(ev.target.value)) {
            return "Not a valid URL."
        }
        else {
            return false
        } 
    }
    else if (ev.target.id==='city_office') {
        if (ev.target.value.length < 1) {
            return "You should select your office country from dropdown list."
        }
        else {
            return false
        } 
    }
    else if (ev.target.id==='manager') {
        if (ev.target.value.length < 1) {
            return "You should select your manager from dropdown list."
        }
        else {
            return false
        } 
    }
    else if (ev.target.id==='role_type') {
        if (ev.target.value.length < 1) {
            return "You should select your role type from dropdown list."
        }
        else {
            return false
        } 
    }
    else if (ev.target.id==='role_description') {
        if (ev.target.value.length < 1) {
            return "Please include brief description of your role."
        }
        else if(ev.target.value.length > 50) {
            return "Field should be max 50 chars long."
        }
        else {
            return false
        } 
    }
    else if (ev.target.id==='managing_city_offices') {
        if (ev.target.value.length < 1) {
            return "Please select city offices wich you will be responsible of."
        }
        else {
            return false
        } 
    }
    else if (ev.target.id==='title') {
        if (ev.target.value.length < 1) {
            return "Field should be populated."
        }
        else if(ev.target.value.length > 100) {
            return "Field should be max 100 chars long."
        }
        else {
            return false
        } 
    }

    else if (ev.target.id==='description') {
        if (ev.target.value.length < 1) {
            return "Field should be populated."
        }
        else if(ev.target.value.length > 100) {
            return "Field should be max 100 chars long."
        }
        else {
            return false
        } 
    }

    else if (ev.target.id==='name') {
        if (ev.target.value.length < 1) {
            return "Field should be populated."
        }
        else if(ev.target.value.length > 25) {
            return "Field should be max 25 chars long."
        }
        else {
            return false
        } 
    }

    else if (ev.target.id==='city') {
        if (ev.target.value.length < 1) {
            return "Field should be populated."
        }
        else if(ev.target.value.length > 25) {
            return "Field should be max 25 chars long."
        }
        else {
            return false
        } 
    }

    else if (ev.target.id==='managing_city') {
        if (ev.target.value.length < 1) {
            return "Please select city offices wich will be responsible for this clinet."
        }
        else {
            return false
        } 
    }

    else if (ev.target.id==='address') {
        if (ev.target.value.length < 1) {
            return "Field should be populated."
        }
        else if(ev.target.value.length > 100) {
            return "Field should be max 100 chars long."
        }
        else {
            return false
        } 
    }

    else if (ev.target.id==='discount') {
        if (ev.target.value < 0) {
            return "Please set discount to positive number"
        }
        else if(!Number.isInteger(Number(ev.target.value))) {
            return "Please set discount to integer whole number"
        }
        else {
            return false
        } 
    }

    if (ev.target.id==='contact') {
        if (ev.target.value.length < 1) {
            return "Field should be populated."
        }
        else if(validemail.test(ev.target.value)===false) {
            return "Field should be populated with valid email Jhon@doe.xx"
        }
        else {
            return false
        } 
    }

    else if (ev.target.id==='description') {
        if (ev.target.value.length < 1) {
            return "Field should be populated."
        }
        else if(ev.target.value.length > 100) {
            return "Field should be max 100 chars long."
        }
        else {
            return false
        } 
    }

    else if (ev.target.id==='price') {
        if (ev.target.value < 0) {
            return "Please set price to positive number"
        }
        else if(isNaN(Number(ev.target.value))) {
            return "Please set price to be a number"
        }
        else {
            return false
        } 
    }

    else if (ev.target.id==='close_date') {
        if (ev.target.value.length < 1) {
            return "Please include expected close date"
        }
        else {
            return false
        } 
    }
    
  } 