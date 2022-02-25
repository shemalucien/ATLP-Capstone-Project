function locationHashChanged() {
    if (location.hash === '#signup') {
        alert("You're visiting a signup page");
    }
    else if (location.hash === '#login') {
        alert("You're visiting a signin page");
    }
}
window.onhashchange = locationHashChanged;

function validateLoginForm() {
    var email = document.getElementById("logemail").value;
    var password = document.getElementById("logpassword").value;

    if (email == "" || password == "") {
        document.getElementById("errorMsg").innerHTML = "Please fill the required fields"
        return false;
    }

    else if (password.length < 6) {
        document.getElementById("errorMsg").innerHTML = "Your password must include atleast 6 characters"
        return false;
    }
    else {
        alert("Successfully logged in");
        return true;
    }
}
function validateSignupForm() {
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirm_password = document.getElementById("confirm_password").value;
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (firstname == "" || lastname == "" || email == "" || password == "" || confirm_password == "") {
        document.getElementById("errorMsg").innerHTML = "Please fill the required fields"
        return false;
    }
    else if (password.length < 6) {
        document.getElementById("errorMsg").innerHTML = "Your password must include atleast 6 characters"
        return false;
    }
    else if (password != confirm_password) {
        document.getElementById("errorMsg").innerHTML = "password does not match"
    }
    else {
        alert("Successfully signed up");
        return true;
    }
}

function validateQueriesForm() {

    var qname = document.getElementById("qname").value;
    var qemail = document.getElementById("qemail").value;
    var message = document.getElementById("message").value;
    if (qname == '' || qemail == '' || message == '') {
        document.getElementById("errorMsg").innerHTML = "Please fill the required fields"
        return false;
    }
    else if (message.length < 0) {
        document.getElementById("errorMsg").innerHTML = "message can not be empty"
    }
    else {
        alert("Message Sent Successfully");
        return true;
    }
}
