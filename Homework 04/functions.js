/*
Homework #4 - Pass / Fail

Peter Caliandro
WEB 150
Winter 2018
February 13, 2018

functions.js

*/

function validateForm(myForm) {
    var firstName = myForm.firstname.value;  //  Get text of firstname field.
    var lastName  = myForm.lastname.value;   //  Get text of lastname field.
    var password  = myForm.password.value;   //  Get text of password field.

    var validationMessage = "";  //  We will build the validation message one segment at a time.
    if (! validateName(firstName)) {
        validationMessage += validationMessageForTextField("first name", false);
    }
    if (! validateName(lastName)) {
        validationMessage += validationMessageForTextField("last name", false);
    }
    if (! validatePassword(password)) {
        validationMessage += validationMessageForTextField("password", true) +
            "A password must contain at least 8 characters, including at least " +
            "one lowercase letter and at least one uppercase letter.";
    }
    if (! validationMessage) {  //  If all entries are valid . . .
        validationMessage  =  "Thank you " + firstName +
            ".  You have successfully logged on.";
    }

    $("#message").html("<pre>" + validationMessage + "</pre>");  //  This is JQuery.  Display the validation message.

    return false;  //  Prevent page reload.  We'll leave this as is.
}

function validatePassword(password) {
    return (
        (8 <= password.length) &&
        (password != password.toUpperCase()) &&
        (password != password.toLowerCase())
    );
}

function validateName(name) {
    return  name.trim() != "";  //  True if the user entered some text other than whitespace.  Amazingly, trim() in JavaScript, unlike in some other contexts, removes ALL whitespace, including nonbreaking spaces, tabs, and newline characters.
}

function validationMessageForTextField(fieldName, valid) {
    return "Please enter a " +
        (valid ? "valid " : "") +  //  Note that parentheses are required around the expression with the ternary operator in this context.  Odd results will ensue otherwise.
        fieldName + " in the " + fieldName + " field." +
        String.fromCharCode(13);
}
