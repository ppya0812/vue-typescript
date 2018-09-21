import Vue from "vue"
import DetailComponent from "./components/Hello"

let v = new Vue({
    el: "#app",
    template: `
    <div>
        Name: <input v-model="name" type="text">
        <detail-component :name="name" :initialEnthusiasm="5" />
    </div>
    `,
    data: { name: "detail" },
    components: {
      DetailComponent
    }
})
