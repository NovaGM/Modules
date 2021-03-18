import { createItem, removeItem } from '@goosemod/settings';
import { version } from './goosemodModule.json';
import { textInputField } from './custom-settings.js';

let comfy;
let vars;

let settingsPage = "Comfy Theme";
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
      comfy.innerText = "@import url('https://nyri4.github.io/Comfy/betterdiscord/comfy.theme.css')";
      document.head.appendChild(comfy);
    },

    onLoadingFinished: () => {
      createItem(settingsPage, [
        `(${version})`,
        {
          type: "header",
          text: "USRBG settings",
        },
        {
          type: "custom",
          element: textInputField(
            "USRBG modal x offset",
            `Default: ${defaultSettings.usrbgXoff}`,
            defaultSettings.usrbgXoff,
            value => {
              settings.usrbgXoff = value;
              updateVars();
            },
            () => settings.usrbgXoff,
          ),
        },
        {
          type: "custom",
          element: textInputField(
            "USRBG modal y offset",
            `Default: ${defaultSettings.usrbgYoff}`,
            defaultSettings.usrbgYoff,
            value => {
              settings.usrbgYoff = value;
              updateVars();
            },
            () => settings.usrbgYoff,
          ),
        },
        {
          type: "custom",
          element: textInputField(
            "USRBG modal width",
            `Default: ${defaultSettings.usrbgWidth}`,
            defaultSettings.usrbgWidth,
            value => {
              settings.usrbgWidth = value;
              updateVars();
            },
            () => settings.usrbgWidth,
          ),
        },
        {
          type: "custom",
          element: textInputField(
            "USRBG modal height",
            `Default: ${defaultSettings.usrbgHeight}`,
            defaultSettings.usrbgHeight,
            value => {
              settings.usrbgHeight = value;
              updateVars();
            },
            () => settings.usrbgHeight,
          ),
        },

        {
          type: "header",
          text: "User info settings (avatar, popout and modal)",
        },
        {
          type: "custom",
          element: textInputField(
            "Avatar roundness",
            `Default: ${defaultSettings.modalAvatarRoundness}`,
            defaultSettings.modalAvatarRoundness,
            value => {
              settings.modalAvatarRoundness = value;
              updateVars();
            },
            () => settings.modalAvatarRoundness,
          ),
        },
        {
          type: "custom",
          element: textInputField(
            "Modal avatar width",
            `Default: ${defaultSettings.modalAvatarWidth}`,
            defaultSettings.modalAvatarWidth,
            value => {
              settings.modalAvatarWidth = value;
              updateVars();
            },
            () => settings.modalAvatarWidth,
          ),
        },
        {
          type: "custom",
          element: textInputField(
            "Popout role circles' size (0px to remove them)",
            `Default: ${defaultSettings.popoutRoleCircles}`,
            defaultSettings.popoutRoleCircles,
            value => {
              settings.popoutRoleCircles = value;
              updateVars();
            },
            () => settings.popoutRoleCircles,
          ),
        },

        {
          type: "header",
          text: "Server list settings",
        },
        {
          type: "custom",
          element: textInputField(
            "Server icon roundness",
            `Default: ${defaultSettings.serverIconRoundness}`,
            defaultSettings.serverIconRoundness,
            value => {
              settings.serverIconRoundness = value;
              updateVars();
            },
            () => settings.serverIconRoundness,
          ),
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
      removeItem(settingsPage);

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
