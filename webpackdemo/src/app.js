import Layer from "./components/layer/layer.js";
import "./css/common.css";

const app=function () {
    let dom=document.getElementById("app");
    let layer=new Layer();
    dom.innerHTML=layer.tpl({
        name:"jiejie",
        arr:["dog","pig","bird"]
    });
}

new app();