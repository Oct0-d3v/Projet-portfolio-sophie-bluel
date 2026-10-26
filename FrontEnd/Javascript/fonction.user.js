function affichageUser () {
    if (token === null) {
        const logoutcacher = document.querySelectorAll(".bandeauedition, .modifier, .logout");
        logoutcacher.forEach(element => {
        element.style.display = "none";
        })
        const logoutafficher = document.querySelectorAll(".filtres, .login");
        logoutafficher.forEach(element => {
        element.style.display = "block";
        })
    }
    else {
        const logincacher = document.querySelectorAll(".filtres, .login");
        logincacher.forEach(element => {
        element.style.display = "none";
        })
        const loginafficher = document.querySelectorAll(".bandeauedition, .modifier, .logout");
        loginafficher.forEach(element => {
        element.style.display = "block";
        })
    }
}

async function login () {
    const messageErreur = document.querySelector("#erreur");
    const valueEmail = document.querySelector("#email");
    const valuePass = document.querySelector("#pass");
    const email = valueEmail.value;
    const pass = valuePass.value;
    
    try { 
        const reponse = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: `{"email": "${email}", "password": "${pass}"}`
        });

        if (!reponse.ok) {
                throw new Error("Connexion impossible, vérifiez vos identifiants"); 

        }
        else {
            getToken (reponse);
            window.location = "index.html";
        }

        } 
    catch (erreur) {
                
        console.log(erreur.message);
        messageErreur.textContent = erreur.message;
    }
}

async function getToken (reponse) {
    const valeurToken = await reponse.json();
    token = valeurToken.token;
    window.localStorage.setItem("token", token);
}