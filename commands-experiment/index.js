import {commands, internalMessage} from '@goosemod/patcher';

export default {
  goosemodHandlers: {
    onImport: () => {
      commands.add(
        "command-name",
        "command-description",
        (...args) => console.log(args),
        [
          {
            type: 3,
            name: "command-string-parameter",
            description: "parameter-description",
            required: false
          }
        ]
      );
      commands.add(
        "echo",
        "Prints out all of the message's text in an internal message.",
        (args) => {
          internalMessage(args.text[0].text);
          console.log(args);
        },
        [
          {
            type: 3,
            name: "text",
            description: "Text to be printed in an internal message.",
            required: true
          }
        ]
      );
    },
    onRemove: () => {
      commands.remove("command-name");
      commands.remove("echo");
    },
  },
};
