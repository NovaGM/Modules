import { commands, internalMessage } from '@goosemod/patcher';

const discordEpoch = Number(1420070400000);

const idToBinary = (num) => {
  let bin = '';
  let high = parseInt(num.slice(0, -10)) || 0;
  let low = parseInt(num.slice(-10));
  try {
    while (low > 0 || high > 0) {
      bin = String(low & 1) + bin;
      low = Math.floor(low / 2);
      if (high > 0) {
        low += 5000000000 * (high % 2);
        high = Math.floor(high / 2);
      }
    }
  } catch (e) {
    console.error(e);
  }
  return bin;
};

export default {
  goosemodHandlers: {
    onImport: () => {
      commands.add(
        'snowflake',
        'Returns info about a given snowflake.',
        (args) => {
          // Check if the supplied argument is actually a snowflake or not
          if (!/\d{1,20}/.test(args.snowflake[0].text)) {
            internalMessage('The provided argument is not a snowflake.');
          } else {
            const binary = idToBinary(args.snowflake[0].text).toString(2).padStart(64, '0');

            const res = {
              timestamp: parseInt(binary.substring(0, 42), 2) + discordEpoch,
              workerID: parseInt(binary.substring(42, 47), 2),
              processID: parseInt(binary.substring(47, 52), 2),
              increment: parseInt(binary.substring(52, 64), 2),
              binary: binary,
            };

            internalMessage(
              `Snowflake info for \`${args.snowflake[0].text}\`\n\n` +
                `**Timestamp**: ${new Date(res.timestamp).toUTCString()} (${res.timestamp})\n` +
                `**Worker ID**: ${res.workerID}\n` +
                `**Process ID**: ${res.processID}\n` +
                `**Increment**: ${res.increment}\n` +
                `**Binary**: ${res.binary}\n`,
            );
          }
        },
        [
          {
            type: 3,
            name: 'snowflake',
            description: 'Snowflake to decrypt.',
            required: true,
          },
        ],
      );
    },
    onRemove: () => {
      commands.remove('snowflake');
    },
  },
};
