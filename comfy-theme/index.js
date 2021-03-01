import {version} from './goosemodModule.json';


let comfy;
let vars;

let settings;
let defaultSettings = {
  usrbgXoff: "-180px",
  usrbgYoff: "-95px",
  usrbgWidth: "700px",
  usrbgHeight: "600px",
  modalAvatarRoundness: "10%",
  modalAvatarWidth: "130px",
  popoutRoleCircles: "7px",
  serverIconRoundness: "8px",
  colouredEmoji: true,
  messageButtonsColour: "#6E85D3",
  mentionBarColour: "#C66262",
  mentionBackgroundColour: "#C662621F",
  mentionHoverColour: "#C6626226",
  discordTitlebar: false,
  tooltips: true,
  settingsButtonsColour: "096DC0",
  spotifySeekColour: "096DC0",
};

function updateVars() {
  try {
    vars.remove();
  } catch {}

  vars = document.createElement("style");
  vars.innerText = "/* Comfy Theme overrides */ ";
  vars.innerText += ":root{"

  // USRBG
  if (settings.usrbgXoff != defaultSettings.usrbgXoff)
    vars.innerText += `--usrbg-modal-x-offset: ${settings.usrbgXoff} !important;`;

  if (settings.usrbgYoff != defaultSettings.usrbgYoff)
    vars.innerText += `--usrbg-modal-y-offset: ${settings.usrbgYoff} !important;`;

  if (settings.usrbgWidth != defaultSettings.usrbgWidth)
    vars.innerText += `--usrbg-modal-width: ${settings.usrbgWidth} !important;`;

  if (settings.usrbgHeight != defaultSettings.usrbgHeight)
    vars.innerText += `--usrbg-modal-height: ${settings.usrbgHeight} !important;`;

  // User info
  if (settings.modalAvatarRoundness != defaultSettings.modalAvatarRoundness)
    vars.innerText += `--avatar-radius: ${settings.modalAvatarRoundness} !important;`;

  if (settings.modalAvatarWidth != defaultSettings.modalAvatarWidth)
    vars.innerText += `--avatar-width: ${settings.modalAvatarWidth} !important;`;

  if (settings.popoutRoleCircles != defaultSettings.popoutRoleCircles)
    vars.innerText += `--role-circles: ${settings.popoutRoleCircles} !important;`;

  // Server list
  if (settings.serverIconRoundness != defaultSettings.serverIconRoundness)
    vars.innerText += `--server-radius: ${settings.serverIconRoundness} !important;`;

  // Message bar
  if (settings.colouredEmoji != defaultSettings.colouredEmoji)
    vars.innerText += `--colored-emoji: grayscale(${settings.colouredEmoji ? 0 : 100}%) !important;`;

  if (settings.messageButtonsColour != defaultSettings.messageButtonsColour)
    vars.innerText += `--chat-buttons: ${settings.messageButtonsColour} !important;`;

  // Message area
  if (settings.mentionBarColour != defaultSettings.mentionBarColour)
    vars.innerText += `--mention-color-bar: ${settings.mentionBarColour} !important;`;

  if (settings.mentionBackgroundColour != defaultSettings.mentionBackgroundColour)
    vars.innerText += `--mention-color-background: ${settings.mentionBackgroundColour} !important;`;

  if (settings.mentionHoverColour != defaultSettings.mentionHoverColour)
    vars.innerText += `--mention-color-hover: ${settings.mentionHoverColour} !important;`;

  // Other
  if (settings.discordTitlebar != defaultSettings.discordTitlebar)
    vars.innerText += `--discord-logo: ${settings.discordTitlebar ? "block" : "none" } !important;`;

  if (settings.tooltips != defaultSettings.tooltips)
    vars.innerText += `--tooltips: ${settings.tooltips ? "block" : "none" } !important;`;

  if (settings.settingsButtonsColour != defaultSettings.settingsButtonsColour)
    vars.innerText += `--user-buttons-color: ${settings.settingsButtonsColour} !important;`;

  if (settings.spotifySeekColour != defaultSettings.spotifySeekColour)
    vars.innerText += `--spotify-color: ${settings.spotifySeekColour} !important;`;

  vars.innerText += "}"
  document.head.appendChild(vars);
}

export default {
  goosemodHandlers: {
    onImport: () => {
      comfy = document.createElement("style");
      comfy.innerText = "@import url('https://nyri4.github.io/Comfy/support/comfy.theme.css')";
      document.head.appendChild(comfy);
    },

    onLoadingFinished: () => {
      goosemodScope.settings.createItem('Comfy Theme', [
        `(${version})`,
        {
          type: "header",
          text: "USRBG settings",
        },
        {
          type: "text",
          text: "USRBG modal x offset",
          subtext: `Default: ${defaultSettings.usrbgXoff}`,
        },
        {
          type: "text",
          text: "USRBG modal y offset",
          subtext: `Default: ${defaultSettings.usrbgYoff}`,
        },
        {
          type: "text",
          text: "USRBG modal width",
          subtext: `Default: ${defaultSettings.usrbgWidth}`,
        },
        {
          type: "text",
          text: "USRBG modal height",
          subtext: `Default: ${defaultSettings.usrbgHeight}`,
        },

        {
          type: "header",
          text: "User info settings (avatar, popout and modal)",
        },
        {
          type: "text",
          text: "Modal avatar roundness",
          subtext: `Default: ${defaultSettings.modalAvatarRoundness}`,
        },
        {
          type: "text",
          text: "Modal avatar width",
          subtext: `Default: ${defaultSettings.modalAvatarWidth}`,
        },
        {
          type: "text",
          text: "Popout role circles' size (0px to remove them)",
          subtext: `Default: ${defaultSettings.popoutRoleCircles}`,
        },

        {
          type: "header",
          text: "Server list settings",
        },
        {
          type: "text",
          text: "Server icon roundness",
          subtext: `Default: ${defaultSettings.serverIconRoundness}`,
        },

        {
          type: "header",
          text: "Message bar settings",
        },
        {
          type: "toggle",
          text: "Coloured or grayscale emoji picker",
          subtext: `Default: ${defaultSettings.colouredEmoji ? "coloured (on)" : "grayscale (off)"}`,
          onToggle: value => {
            settings.colouredEmoji = value;
            updateVars();
          },
          isToggled: () => settings.colouredEmoji,
        },
        {
          type: "text-and-color",
          text: "Message bar buttons colour",
          subtext: `Default: ${defaultSettings.messageButtonsColour}`,
          oninput: value => {
            settings.messageButtonsColour = value;
            updateVars();
          },
          initialValue: () => settings.messageButtonsColour,
        },

        {
          type: "header",
          text: "Messages area settings",
        },
        {
          type: "text-and-color",
          text: "Mention bar colour",
          subtext: `Default: ${defaultSettings.mentionBarColour}`,
          oninput: value => {
            settings.mentionBarColour = value;
            updateVars();
          },
          initialValue: () => settings.mentionBarColour,
        },
        {
          type: "text-and-color",
          text: "Mention background colour",
          subtext: `Default: ${defaultSettings.mentionBackgroundColour} (colour picker doesn't support alpha yet)`,
          oninput: value => {
            settings.mentionBackgroundColour = value;
            updateVars();
          },
          initialValue: () => settings.mentionBackgroundColour,
        },
        {
          type: "text-and-color",
          text: "Mention hover colour",
          subtext: `Default: ${defaultSettings.mentionHoverColour} (colour picker doesn't support alpha yet)`,
          oninput: value => {
            settings.mentionHoverColour = value;
            updateVars();
          },
          initialValue: () => settings.mentionHoverColour,
        },

        {
          type: "header",
          text: "Other settings",
        },
        {
          type: "toggle",
          text: "Discord logo in the titlebar",
          subtext: `Default: ${defaultSettings.discordTitlebar ? "shown (on)" : "hidden (off)"}`,
          onToggle: value => {
            settings.discordTitlebar = value;
            updateVars();
          },
          isToggled: () => settings.discordTitlebar,
        },
        {
          type: "toggle",
          text: "Tooltips",
          subtext: `Default: ${defaultSettings.tooltips ? "enabled (on)" : "disabled (off)"}`,
          onToggle: value => {
            settings.tooltips = value;
            updateVars();
          },
          isToggled: () => settings.tooltips,
        },
        {
          type: "text-and-color",
          text: "Mute, deafen, settings buttons colour",
          subtext: `Default: ${defaultSettings.settingsButtonsColour}`,
          oninput: value => {
            settings.settingsButtonsColour = value;
            updateVars();
          },
          initialValue: () => settings.settingsButtonsColour,
        },
        {
          type: "text-and-color",
          text: "Spotify seek bar colour",
          subtext: `Default: ${defaultSettings.spotifySeekColour}`,
          oninput: value => {
            settings.spotifySeekColour = value;
            updateVars();
          },
          initialValue: () => settings.spotifySeekColour,
        },
      ]);
    },

    onRemove: () => {
      goosemodScope.settings.removeItem("Comfy Theme");

      comfy.remove();
      vars.remove();
    },

    getSettings: () => [settings],
    loadSettings: ([_settings]) => {
      settings = _settings || defaultSettings;

      updateVars();
    },
  },
};
