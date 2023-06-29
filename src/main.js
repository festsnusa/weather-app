import './assets/main.scss';
import 'ant-design-vue/dist/antd.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

import AntDesign from 'ant-design-vue';

const app = createApp(App);

app.use(createPinia());
app.use(AntDesign);

app.mount('#app');
