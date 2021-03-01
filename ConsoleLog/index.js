import showToast from '@goosemod/toast';

export default {
  goosemodHandlers: {
    onImport: () => {
      console.log('This is a log from ConsoleLog');
      showToast('This is a toast from ConsoleLog');
    },
    onRemove: () => {
      console.log('ConsoleLog has been uninstalled');
      showToast('ConsoleLog has been uninstalled');
    },
  },
};
