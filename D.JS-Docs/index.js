import { commands, internalMessage } from '@goosemod/patcher';

const get = (url, callback) => {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';

  xhr.onload = () => {
    var status = xhr.status;
    if (status == 200) {
      callback(null, xhr.response);
    } else {
      callback(status);
    }
  };

  xhr.send();
};

export default {
  goosemodHandlers: {
    onImport: () => {
      commands.add(
        'echo',
        "Prints out all of the message's text in an internal message.",
        (args) => {
          internalMessage(args.text[0].text);
          console.log(args);
        },
        [
          {
            type: 3,
            name: 'text',
            description: 'Text to be printed in an internal message.',
            required: true,
          },
        ],
      );

      commands.add(
        'docs',
        'Sends documentation about the specified query.',
        (args) => {
          var queryString = args.query[0].text;
          get(`https://djsdocs.sorta.moe/v2/embed?src=master&q=${queryString}`, (err, data) => {
            if (err != null) {
              console.error(err);
            } else {
              data['type'] = 'rich';
              internalMessage(data);
            }
          });
        },
        [{ type: 3, name: 'query', description: 'What to query the docs with.', required: true }],
      );
    },
    onRemove: () => {
      commands.remove('echo');
    },
  },
};
