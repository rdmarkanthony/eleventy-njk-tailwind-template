import { _event } from "./utils/_event";

class _projName {
    constructor(props) {
        if (window._projName) return;
        window._projName = this;

        this.debug = props.debug || false;

        this.el = {
            header: document.querySelector(".header-content"),
            footer: document.querySelector(".footer-content"),
            main: document.querySelector(".main-content"),
        };

        this.init();
    }

    init() {
        // for resize
        _event.resize((state) => this.resize(state));

        if (this.debug) console.log("_projName", this);
    }

    resize(state) {
        // states: init, ready, resize, after
    }
}

new _projName({ debug: true });
