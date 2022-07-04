import { boot } from 'quasar/wrappers';
import WalletDialogComponent from '../components/WalletDialogue.vue';
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  // somethin
  app.component('WalletDialogue', WalletDialogComponent);
});
