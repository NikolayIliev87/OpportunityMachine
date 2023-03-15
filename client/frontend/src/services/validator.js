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
            return "Field should be populated."
        }
        else if(ev.target.value.length > 20) {
            return "Field should be max 20 chars long."
        }
        else if(hasNumber.test(ev.target.value)) {
            return "Field should contain only letters."
        }
        else {
            return false
        } 
    }
    else if (ev.target.id==='last_name') {
        if (ev.target.value.length < 1) {
            return "Field should be populated."
        }
        else if(ev.target.value.length > 25) {
            return "Field should be max 25 chars long."
        }
        else if(hasNumber.test(ev.target.value)) {
            return "Field should contain only letters."
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
        else if(ev.target.value.length > 500) {
            return "Field should be max 500 chars long."
        }
        else {
            return false
        } 
    }
  } 