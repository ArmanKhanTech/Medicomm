const loader = document.querySelector('.loader');

// select inputs 
const submitBtn = document.querySelector('.submit-btn');
const name = document.querySelector('#name') || null;
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const number = document.querySelector('#number') || null;
const tac = document.querySelector('#terms-and-cond') || null;
const notification = document.querySelector('#notification') || null;

submitBtn.addEventListener('click', () => {
    if(name!=null){  //signup page
        if(name.value.length < 3){
            showAlert('Name Must be 3 Letters Long');
        } else if(!email.value.length){
            showAlert('Enter Your E - Mail');
        } else if(password.value.length < 8){
            showAlert('Password Should be 8 Letters Long');
        } else if(!number.value.length){
            showAlert('Enter Your Phone Number');
        } else if(!Number(number.value) || number.value.length < 10){
            showAlert('Invalid Number');
        } else if(!tac.checked){
            showAlert('You Must Agree All Terms and Conditions');
        }else{
            // submit form
            loader.style.display = 'block';
            sendData('/signup', {
                name: name.value,
                email: email.value,
                password: password.value,
                number: number.value,
                tac: tac.checked,
                notification: notification.checked,
                seller: false
            })
        }
    }else{
        //login page
        if(!email.value.length || !password.value.length){
            showAlert('Fill All the Inputs');
        } else{
            loader.style.display = 'block';
            sendData('/login', {
                email: email.value,
                password: password.value
            })
        }
    }
})

//redirect to homepage is user is already logged in
window.onload = () => {
    if(sessionStorage.user){
        user = JSON.parse(sessionStorage.user)
        if(compareToken(user.authToken, user.email)){
            location.replace('/');
        }
    }
}