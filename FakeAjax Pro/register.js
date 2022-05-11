//sign up 
function signUp(event) {
    event.preventDefault();
    let input = event.target
    if (checkMail(input.email.value)) {
        if (input.password.value === input.passwordReapet.value) {
            let fxhr = new FXMLHttpRequest();
            let family = new Family(input.name.value, input.email.value, input.phone.value, input.adress.value, input.password.value, []);
            fxhr.open("POST", "users/postFamily", family);
            let response = fxhr.send()
            console.log(`status:${response.status}  statuseText:${response.statusText}`);
            if (response.status == 200) {
                app.change('application');
                let fxhr = new FXMLHttpRequest();
                fxhr.open("GET", "users/getCurrentUser", {});
                let response2 = fxhr.send()
                console.log(`status:${response2.status}  statuseText:${response2.statusText}`)
                if (response2.status == 200) {
                    printCurrentUser(response2.body)
                }
            }
        }
    }
    else{
        alert("the email not correct");
    }


}

//log in
function logIn(event) {
    log(event, "putCurrentUser", 'application');
}

//admenistor log in
function logInPrinciple(event) {
    log(event, "putManager", 'applicationPrinciple');
}

//help method of loggin 
function log(event, func, appl) {
    event.preventDefault();
    let input = event.target;
    if (checkMail(input.email.value)) {
        let fxhr = new FXMLHttpRequest();
        fxhr.open("PUT", `currentUser/${func}`, { email: input.email.value, password: input.password.value });
        let response = fxhr.send()
        console.log(`status:${response.status}  statuseText:${response.statusText}`);
        if (response.status == 200) {
            app.change(appl);
            let fxhr = new FXMLHttpRequest();
            fxhr.open("GET", "users/getCurrentUser", {});
            let response2 = fxhr.send()
            console.log(`status:${response2.status}  statuseText:${response2.statusText}`)
            if (response2.status == 200) {
                printCurrentUser(response2.body)
            }
        }
    }
    else {
        alert("the email not correct");
    }
}

//log out
function logOut() {
    let fxhr = new FXMLHttpRequest();
    fxhr.open("PUT", "currentUser/putCurrentUserNull", {});
    let response = fxhr.send()
    console.log(`status:${response.status}  statuseText:${response.statusText}`);
    if (response.status == 200) {
        alert("you log out seccsfuly")
    }
}

//show in html the current user
function printCurrentUser(currentUser) {
    document.getElementById('current').innerHTML = `Hello Family: ${currentUser.familyName}`;
}

//help fuction check if the email correct
let checkMail = mail => {
    let reg = /^\w{2,20}@(gmail[.]com|\w{2,10}[.]co[.]il)$/i;
    return reg.test(mail);
}