import { gsap } from "gsap";

export class _cursorBubble {
    constructor(props) {
        this.target = props.target ?? document.body;

        this.el = {
            main: document.createElement("div"),
            bg: document.createElement("div"),
            text: document.createElement("div"),
        };

        this.coords = {
            x: 0,
            y: 0,
        };

        this.visible = false;

        this.events = props?.events ?? {};
        this.listeners = {};

        this.init();
    }

    init() {
        // for styling
        this.styles();

        document.body.classList.add("bg-white");

        // for main
        document.body.appendChild(this.el.main);
        this.el.main.classList.add(
            "js-cursor-bubble",
            "z-[999]",
            "fixed",
            "top-0",
            "left-0",
            "will-change-transform",
            "pointer-events-none"
        );

        // for bg
        this.el.main.appendChild(this.el.bg);
        this.el.bg.classList.add(
            "js-cursor-bubble-indicator",
            "absolute",
            "flex",
            "items-center",
            "justify-center",
            "top-0",
            "left-0",
            "w-4",
            "h-4",
            "bg-white",
            "rounded-full"
        );

        // for text container
        this.el.main.appendChild(this.el.text);
        this.el.text.classList.add(
            "js-cursor-bubble-text",
            "z-[1]",
            "absolute",
            "flex",
            "items-center",
            "justify-center",
            "top-0",
            "left-0",
            "w-full",
            "h-full",
            "font-sanss",
            "text-p2-semibold"
        );

        // for mouse events
        this.mouseevents();

        this.emit("init");
    }

    mouseevents() {
        this.target.addEventListener("mouseenter", (e) => {
            this.coords.x = e.clientX;
            this.coords.y = e.clientY;

            this.el.main.classList.add("is-visible");
            this.el.main.classList.remove("is-hidden");

            gsap.set(this.el.main, {
                x: this.coords.x - this.el.main.offsetWidth * 0.5,
                y: this.coords.y - this.el.main.offsetHeight * 0.5,
            });

            this.emit("mouseenter", e);
        });

        this.target.addEventListener("mouseleave", (e) => {
            this.el.main.classList.remove("is-visible");
            this.el.main.classList.add("is-hidden");

            this.emit("mouseleave", e);
        });

        let _mouseMoveTimer = null;
        this.target.addEventListener("mousemove", (e) => {
            this.coords.x = e.clientX;
            this.coords.y = e.clientY;

            this.el.main.classList.add("is-visible");
            this.el.main.classList.remove("is-hidden");

            this.el.main.classList.add("is-moving");

            clearTimeout(_mouseMoveTimer);
            _mouseMoveTimer = setTimeout(() => {
                this.el.main.classList.remove("is-moving");
            }, 100);

            if (!this.visible) {
                this.visible = true;
                this.el.main.classList.add("is-visible");

                gsap.set(this.el.main, {
                    x: this.coords.x - this.el.main.offsetWidth * 0.5,
                    y: this.coords.y - this.el.main.offsetHeight * 0.5,
                });
            }

            gsap.to(this.el.main, {
                duration: 0.3,
                x: e.clientX - this.el.main.offsetWidth * 0.5,
                y: e.clientY - this.el.main.offsetHeight * 0.5,
            });

            this.emit("mousemove", e);
        });

        this.target.addEventListener("mousedown", (e) => {
            this.el.main.classList.add("is-clicked");

            this.emit("mousedown", e);
        });

        this.target.addEventListener("mouseup", (e) => {
            this.el.main.classList.remove("is-clicked");

            this.emit("mouseup", e);
        });
    }

    on(type, callback) {
        if (!this.listeners[type]) this.listeners[type] = [];
        this.listeners[type].push(callback);
    }

    off(type, callback) {
        if (!this.listeners[type]) return;
        this.listeners[type] = this.listeners[type].filter((cb) => cb !== callback);
    }

    emit(type, event) {
        if (this.events[type]) this.events[type](this, event);

        if (!this.listeners[type]) return;
        this.listeners[type].forEach((callback) => callback(this, event));
    }

    styles() {
        let _style = document.querySelector(".js-cursor-bubble-style");
        if (!_style) {
            _style = document.createElement("style");
            _style.classList.add("js-cursor-bubble-style");
            document.head.appendChild(_style);

            _style.innerHTML =
                `.js-cursor-bubble { opacity: 0; transition: opacity 0.3s; transform-origin: 50% 50%; }` +
                `.js-cursor-bubble.is-visible { opacity: 1; }` +
                `.js-cursor-bubble-indicator, .js-cursor-bubble-text { transform: translate(-50%, -50%); }`;
        }
    }
}
