/**Utils */
function el(id){
    return document.getElementById(id);
}

function newEl(el){
    return document.createElement(el);
}

function notificationBox(notification){
    var box = `<div id="notifId" class="warning-notification">
                   <span class="material-icons">error </span><span class="notif-text">${notification}</span>
               </div>`

    document.body.innerHTML += box;

    setTimeout(()=>{
        el('notifId').remove();
    }, 5000);
}





/**Registro */
var registrar = el('signup-button');

if(registrar !== null)
registrar.addEventListener('click', (event) => {

    var username = el('username-register').value;
    var email = el('email-register').value;
    var password = el('password-register').value;

    if( username && email && password)

        auth( '/mobileRegister' , email, password, username);

})





/**Ingresar */
var ingresar = el('login-button');

if(ingresar !== null)
ingresar.addEventListener('click', (event) => {
    
    event.preventDefault();
    
    var email = el('email-login').value;
    var password = el('password-login').value;
    
    if( email && password )
    
        auth( '/mobileLogin', email, password );
    
})





/**HTTP */
function auth( url, email, password, username ){

    var body = {
        email: email,
        password: password}

    if( username ) body.username = username;

    fetch( url , {
        credentials: 'include',
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(body)
    }).then(res => {

        console.log('res',res.status);

        if( res.status !== 200) return null;
        else return res.json();

    }).then(res => {
        if( res !== null ) {
              
            console.log('not null',res);

            localStorage.setItem("username", res.username);
            localStorage.setItem("id", res.id);
            localStorage.setItem("token", res.credentials);

            window.location.href = '/';

        } else {

            console.log( 'problem with credentials' );
            notificationBox('Problem with Credentials');

        }

    });
}