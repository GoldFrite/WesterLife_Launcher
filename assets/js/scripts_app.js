// Importations
const { shell } = require("electron");
const ipc = require("electron").ipcRenderer;
const util = require('minecraft-server-util');
// --------------------

// Avertissement console
console.log("%c⚠ Attends !", "color: red; font-size: 28px; font-weight: 500; font-family: 'Roboto', sans-serif; text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5)");
console.log("%cNe tape rien ici à moins que tu sois sûr(e) de ce que tu fais !", "color: red; font-size: 17px; font-weight: 500; font-family: 'Roboto', sans-serif; text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);");
console.log("%cCopier-coller quelque chose dictée par un inconnu risque fortement d'être une arnaque !", "color: red; font-size: 17px; font-weight: 500; font-family: 'Roboto', sans-serif; text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5)");
// --------------------

// Co OK
console.log("%c[Launcher]" + "%c [Connexion]" + "%c Connection successful!", "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100")

// Var HTML
const accountInfos = document.getElementById('account-infos');
const status = document.getElementById("status");
const players = document.getElementById("players");
const playButton = document.getElementById("play-button");
const settingsButton = document.getElementById("settings-button");
// --------------------

// Infos du compts
document.getElementById("account-pseudo").innerHTML = "<b>" + localStorage.getItem("name") + "</b>";
document.getElementById("account-email").innerHTML = localStorage.getItem("email");
document.getElementById("account-skin").src = "https://minotar.net/avatar/" + localStorage.getItem("name") + "/43.png";
// --------------------

// Pour masquer AccountInfos
document.getElementById('account-icon').addEventListener('click', () => {
    if (getComputedStyle(accountInfos).display != "none") {
        accountInfos.style = "display: none"
    } else {
        accountInfos.style = "display: block"
    }
});
// --------------------

// Jouer
playButton.addEventListener("mouseenter", () => {
    playButton.style.width = "190px"
})

playButton.addEventListener("mouseleave", async function () {
    playButton.style.width = "83px"
})

playButton.addEventListener("click", () => {
    ipc.send("play", { u: localStorage.getItem("username"), })
})
// ----------

// Settings
settingsButton.addEventListener("mouseenter", () => {
    settingsButton.style.width = "126px"
})

settingsButton.addEventListener("mouseleave", async function () {
    settingsButton.style.width = "43px"
})
// ----------

// UUID
var ifUUID = 0
document.getElementById("uuid-button").addEventListener("click", () => {

    if (ifUUID === 0) {

        document.getElementById("uuid").innerHTML = "<input type='text' value='" + localStorage.getItem("uuid") + "' class='uuid-input' id='uuid-input' disabled='disabled'><button class='uuid-copy-button hover-shadow' id='uuid-copy-button'>Copier</button>"
        ifUUID = 1

        const uuidCopyButton = document.getElementById("uuid-copy-button");
        const uuidInput = document.getElementById("uuid-input");

        uuidCopyButton.addEventListener("click", () => {
            uuidInput.disabled = false
            uuidInput.select()
            document.execCommand("copy");
            uuidInput.disabled = true
            console.log("%c[Launcher]" + "%c [Account]" + "%c UUID copied!", "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100");
            uuidCopyButton.style.background = "#245429";
            uuidInput.style.borderColor = "#245429"

            function uuidColor() {
                uuidCopyButton.style.background = "rgb(61, 61, 61)";
                uuidInput.style.borderColor = "rgb(61, 61, 61)"
            }
            setTimeout(uuidColor, 1500)
        })

    } else {
        document.getElementById("uuid").innerHTML = ""
        ifUUID = 0
    }
});
// --------------------

// Logout
document.getElementById("logout-button").addEventListener("click", () => {
    var logout = {
        url: "https://www.pentagone2.hostim.me/api/auth/logout",
        method: "POST",
        timeout: 0,
        data: {
            access_token: localStorage.getItem("accessToken")
        }
    }

    axios(logout)
        .then(function (response) {
            console.log("%c[Launcher]" + "%c [Connexion]" + "%c Logout successful", "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100");
        })
        .catch(function (error) { })
    localStorage.clear();

    ipc.send("logout")
});
// --------------------


// News
document.getElementById("more-news-button").addEventListener("click", () => {
    ipc.send("news")
})
// --------------------

// Settings
document.getElementById("settings-button").addEventListener("click", () => {
    ipc.send("settings")
});
// --------------------

document.getElementById('site-button').addEventListener('click', () => {
    shell.openExternal("https://www.westerlife.fr/")
});

document.getElementById('discord-button').addEventListener('click', () => {
    shell.openExternal("https://discord.gg/f8z96sy668")
});

// document.getElementById('twitter-button').addEventListener('click', () => {
//     shell.openExternal("https://twitter.com/pentagone2_/")
// });

// document.getElementById('insta-button').addEventListener('click', () => {
//     shell.openExternal("https://www.instagram.com/pentagone2_/")
// });

// document.getElementById('yt-button').addEventListener('click', () => {
//     shell.openExternal("https://www.youtube.com/channel/UCUAzUO3TnBZ8AanSOHDaoaQ")
// });

document.getElementById('help-site-button').addEventListener('click', () => {
    shell.openExternal("https://www.westerlife.fr/support/tickets");
});

document.getElementById('help-discord-button').addEventListener('click', () => {
    shell.openExternal("https://discord.com/invite/FePaQ7v");
});
// --------------------

// Status du serveur

servStatus()

document.getElementById("status-refresh").addEventListener("click", () => {
    servStatus()
})

function servStatus() {

    util.status('145.239.177.187', { port: 25576 }) ///////////////////////////
        .then((response) => {

            var playersJSON = JSON.stringify(response.onlinePlayers)

            console.log(response)
            console.log("%c[Server]" + "%c [Status] " + "%cOnline", "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100");
            console.log("%c[Server]" + "%c [Players] " + "%c" + playersJSON, "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100");
            status.innerHTML = '<b>Status :</b> 🟢 En ligne'
            players.innerHTML = '<b>Joueurs :</b> ' + playersJSON
        })
        .catch(function (error) {
            console.log("%c[Server]" + "%c [Status] " + "%c" + error, "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100");
            status.innerHTML = '<b>Status :</b> 🔴 Hors ligne';
            players.innerHTML = '<b>Joueurs :</b> ::'
        });

}
// --------------------

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}