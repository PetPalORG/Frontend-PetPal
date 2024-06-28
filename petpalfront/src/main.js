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
import TabMenu from "primevue/tabmenu";
import Image from "primevue/image";

import StyleClass from 'primevue/styleclass';
import Ripple from "primevue/ripple";


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDhluQEF6xZ2OLlbiCUx1zexp-JUaJNCqI",
    authDomain: "pet-pal-66fcd.firebaseapp.com",
    projectId: "pet-pal-66fcd",
    storageBucket: "pet-pal-66fcd.appspot.com",
    messagingSenderId: "695763079137",
    appId: "1:695763079137:web:b2e2be02283326fd8ecca0"
};

initializeApp(firebaseConfig);



createApp(App)
    .use(PrimeVue, {ripple: true})
    .use(router)
    .use(ToastService)
    .component('pv-button', Button)
    .component('pv-toolbar', Toolbar)
    .component('pv-inputText', InputText)
    .component('pv-sidebar', Sidebar)
    .component('pv-card', Card)
    .component('pv-image', Image)
    .component('pv-password', Password)
    .component('pv-routerLink', router)
    .component('pv-toast', Toast)
    .component('pv-toastService', ToastService)
    .component('pv-floatLabel', FloatLabel)
    .component('pv-fileUpload', FileUpload)
    .component('pv-inputGroup', InputGroup)
    .component('pv-inputGroupAddon', InputGroupAddon)
    .component('pv-speedDial', SpeedDial)
    .component('pv-tabMenu', TabMenu)

    .directive('ripple', Ripple)
    .directive('styleclass', StyleClass)


    .mount('#app')
