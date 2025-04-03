import { createApp } from "vue"
import { createPinia } from "pinia"
import "./style.css"
import App from "./App.vue"

import { Plus, Trash2 } from "lucide-vue-next"

const app = createApp(App)

app.component("Plus", Plus)
app.component("Trash2", Trash2)

app.use(createPinia())
app.mount("#app")
