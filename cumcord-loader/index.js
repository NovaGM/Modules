import showToast from "@goosemod/toast";

function reqListener() {
    eval(this.responseText);
    showToast("Cumcord has injected.");
}

export default {
    goosemodHandlers: {
        onImport: () => {
            var oReq = new XMLHttpRequest();
            oReq.addEventListener("load", reqListener);
            oReq.open("GET", "https://raw.githubusercontent.com/Cumcord/Cumcord/stable/dist/build.js");
            oReq.send();
        },
        onRemove: () => {
            window.cumcord.uninject();
            showToast("Cumcord has been uninjected.");
        }
    }
};
