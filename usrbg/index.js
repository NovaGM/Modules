import { version } from './goosemodModule.json';

let el;

const css = `@import url("https://keanuplayz.github.io/usrbg/dist/usrbg.css");`;

export default {
  goosemodHandlers: {
    onImport: async function () {
      el = document.createElement('style');

      document.head.appendChild(el);

      el.appendChild(document.createTextNode(css));
    },

    onRemove: async function () {
      el.remove();
    },
  },
};
