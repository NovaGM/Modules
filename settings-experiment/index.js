import { createItem, removeItem } from '@goosemod/settings';
import showToast from '@goosemod/toast';
import { version } from './goosemodModule.json';
import { textInputField } from './custom-settings.js';

let settingsPage = "Settings Experiment";
let settings;
let defaultSettings = {
};

export default {
  goosemodHandlers: {
    onImport: () => {
    },

    onLoadingFinished: () => {
      createItem(settingsPage, [
        `(${version})`,
        {
          type: "header",
          text: "Header text"
        },
        {
          type: "text",
          text: "Text without subtext"
        },
        {
          type: "text",
          text: "Text with subtext",
          subtext: "Subtext goes there"
        },
        {
          type: "button",
          text: "Simple button -> no divider",
          onclick: () => {
            showToast(`Simple button: button clicked`);
          }
        },
        {
          type: "button",
          text: "Simple button -> divider following",
          onclick: () => {
            showToast(`Simple button: button clicked`);
          }
        },
        {
          type: "divider",
        },
        {
          type: "text-and-button",
          text: "Button",
          subtext: "Subtext goes there",
          buttonText: "Button Text",
          onclick: () => {
            showToast(`Button: button clicked`);
          }
        },
        {
          type: "text-and-danger-button",
          text: "Button (danger)",
          subtext: "Subtext goes there",
          buttonText: "Button Text",
          onclick: () => {
            showToast(`Button (danger): button clicked`);
          }
        },
        {
          type: "toggle",
          text: "Simple toggle switch",
          subtext: "Subtext goes there",
          onToggle: value => {
            showToast(`Simple toggle: ${value}`);
          },
          isToggled: () => false
        },
        {
          type: "toggle-text-button",
          text: "Toggle switch with button",
          subtext: "Subtext goes there",
          onToggle: value => {
            showToast(`Toggle+Button: ${value}`);
          },
          isToggled: () => false,
          buttonText: "Button text",
          onclick: () => {
            showToast(`Toggle+Button: button clicked`);
          }
        },
        {
          type: "toggle-text-danger-button",
          text: "Toggle switch with danger button",
          subtext: "Subtext goes there",
          onToggle: value => {
            showToast(`Toggle+Button (danger): ${value}`);
          },
          isToggled: () => false,
          buttonText: "Button (danger) text",
          onclick: () => {
            showToast(`Toggle+Button (danger): button clicked`);
          }
        },
        {
          type: "text-and-color",
          text: "Colour picker",
          subtext: "Doesn't support alpha for now",
          oninput: value => {
            showToast(`Colour picker: ${value}`);
          },
          initialValue: () => "#000000"
        },
        {
          type: "custom",
          element: (() => {
            let e = document.createElement("span");
            e.innerText = "Custom Element";
            return e;
          })()
        },
        {
          type: "custom",
          element: textInputField(
            "Text Input",
            "Prototype",
            "Placeholder",
            value => {
              showToast(`Text Input: ${value}`);
            }
          )
        },
        {
          type: "custom",
          element: textInputField(
            "Text Input",
            "Prototype",
            "Placeholder",
            value => {
              showToast(`Text Input: ${value}`);
            },
            "Preset value"
          )
        }
      ]);
    },

    onRemove: () => {
      removeItem(settingsPage);
    },

    getSettings: () => [settings],
    loadSettings: ([_settings]) => {
      settings = _settings || defaultSettings;
    },
  },
};
