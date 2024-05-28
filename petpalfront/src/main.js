import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from "primevue/config";
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'

import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/lara-light-amber/theme.css'



import Password from "primevue/password";
import Toast from "primevue/toast";
import FloatLabel from "primevue/floatlabel";
import ToastService from "primevue/toastservice";
import Toolbar from "primevue/toolbar";
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Sidebar from 'primevue/sidebar';
import Card from "primevue/card";
import FileUpload from 'primevue/fileupload';
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import SpeedDial from "primevue/speeddial";

import StyleClass from 'primevue/styleclass';
import Ripple from "primevue/ripple";

createApp(App)
    .use(PrimeVue, {ripple: true})
    .use(router)
    .component('Button', Button)
    .component('pv-toolbar', Toolbar)
    .component('InputText', InputText)
    .component('pv-sidebar', Sidebar)
    .component('pv-card', Card)
    .component('Password', Password)
    .component('pv-routerLink', router)
    .component('pv-toast', Toast)
    .component('pv-toastService', ToastService)
    .component('pv-floatLabel', FloatLabel)
    .component('pv-fileUpload', FileUpload)
    .component('pv-inputGroup', InputGroup)
    .component('pv-inputGroupAddon', InputGroupAddon)
    .component('pv-speedDial', SpeedDial)

    .directive('ripple', Ripple)
    .directive('styleclass', StyleClass)


    .mount('#app')