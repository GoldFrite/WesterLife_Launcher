// Importations
const axios = require("axios");
const { shell, ipcMain } = require("electron");
const ipc = require("electron").ipcRenderer;
const os = require('os');
// --------------------

// Avertissement console 
console.log("%c⚠ Attends !", "color: red; font-size: 28px; font-weight: 500; font-family: 'Roboto', sans-serif; text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5)");
console.log("%cNe tape rien ici à moins que tu sois sûr(e) de ce que tu fais !", "color: red; font-size: 17px; font-weight: 500; font-family: 'Roboto', sans-serif; text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);");
console.log("%cCopier-coller quelque chose dictée par un inconnu risque fortement d'être une arnaque !", "color: red; font-size: 17px; font-weight: 500; font-family: 'Roboto', sans-serif; text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5)");
// --------------------

// Var HTML
const emailInput = document.getElementById("email")
const passInput = document.getElementById("password")
const loginButton = document.getElementById("login-button")
// --------------------

// Clic sur le bouton Connexion ou Entrer
document.addEventListener("keypress", function (event) {
    if (event.keyCode == 13) {
        login()
    }
})
loginButton.addEventListener("click", () => {
    login()
})
// --------------------

// Connexion
function login() {

    let email = document.getElementById("email").value
    let password = document.getElementById("password").value

    if (email && password) {

        ipc.send("login", { user: email, password: password })
        loginButton.disabled = true
        loginButton.innerHTML = "Connexion en cours..."
        localStorage.setItem("email", email)

    } else {

        console.log("%c[Launcher]" + "%c [Connexion]" + "%c Cannot connect: Empty credentials", "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100")
        document.getElementById("error-modal").style.display = "block"
        document.getElementById("error-text").innerHTML = "Veuillez indiquer une adresse email et un mot de passe !"
        document.getElementById("close-modal-button").addEventListener("click", () => {
            document.getElementById("error-modal").style.display = "none"
            loginButton.disabled = false
            loginButton.innerHTML = "Connexion"
        })

    }

}

ipc.on("err", (event, data) => {
    console.log("%c[Launcher]" + "%c [Connexion]" + "%c Cannot connect: " + data.er, "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100")
    localStorage.clear();
    loginButton.disabled = false
    document.getElementById("error-modal").style.display = "block"
    document.getElementById("error-text").innerHTML = "Identifiants invalides !"
    document.getElementById("close-modal-button").addEventListener("click", () => {
        document.getElementById("error-modal").style.display = "none"
        loginButton.disabled = false
        loginButton.innerHTML = "Connexion"
    })
    loginButton.innerHTML = "Connexion"
})

ipc.on("user", (event, user) => {
    localStorage.setItem("accessToken", user.access_token)
    localStorage.setItem("clientToken", user.client_token)
    localStorage.setItem("selectedProfile", JSON.stringify(user.selected_profile))
    localStorage.setItem("name", user.name)
    localStorage.setItem("uuid", user.uuid)
})
// --------------------

// Voir le MdP
var eye = 0
const eyeButton = document.getElementById("view-pwd")
eyeButton.addEventListener("click", () => {

    if (eye === 0) {
        eyeButton.innerHTML = "<i class='far fa-eye-slash'></i>"
        passInput.type = "text"
        eye = 1
    } else {
        eyeButton.innerHTML = "<i class='far fa-eye'></i>"
        passInput.type = "password"
        eye = 0
    }

})
// --------------------

// Ouverture liens
const buyButton = document.getElementById('buy-button');
buyButton.addEventListener('click', () => {
    shell.openExternal("https://www.minecraft.net/fr-fr/store/minecraft-java-edition");
})

const fpwLink = document.getElementById('fpw-link');
fpwLink.addEventListener('click', () => {
    shell.openExternal("https://www.minecraft.net/fr-fr/password/forgot");
})
// --------------------