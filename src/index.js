import VField from './v-field.js';
import './style.css';

export default {
  install(Vue, directiveName = 'field') {
    Vue.directive(directiveName, VField);
  },
  directive: VField,
};