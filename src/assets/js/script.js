import { gsap } from "gsap";
import { DateTime } from "luxon";
import flatpickr from "flatpickr";

import { _event } from "./utils/_event";
import { _inview } from "./utils/_inview";
import { _splitText } from "./utils/_splitText";
import { _animate } from "./utils/_animate";
import { _animatedNumber } from "./utils/_animated-number";
import { _rollingNumber } from "./utils/_rolling-number";
import { _countdownTimer } from "./utils/_countdown-timer";
import { _accordion } from "./utils/_accordion";
import { _cursorBubble } from "./utils/_cursorBubble";
import { _lightbox } from "./utils/_lightbox";
import { _typing } from "./utils/_typing";
import { _videoPlayer } from "./utils/_video-player";
import { _youtubePlayer } from "./utils/_youtube-player";

// expose for inline scripts
Object.assign(window, {
    gsap,
    DateTime,
    flatpickr,
    _event,
    _inview,
    _splitText,
    _animate,
    _animatedNumber,
    _rollingNumber,
    _countdownTimer,
    _accordion,
    _cursorBubble,
    _lightbox,
    _typing,
    _videoPlayer,
    _youtubePlayer,
});

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

        this.headerHeight = 0;
        this.footerHeight = 0;

        this.init();
    }

    init() {
        // for resize
        _event.resize(() => this.resize());

        if (this.debug) console.log("_projName", this);
    }

    resize() {
        this.headerHeight = this.el.header?.offsetHeight ?? 0;
        document.body.style.setProperty("--header-height", `${this.headerHeight}px`);

        this.footerHeight = this.el.footer?.offsetHeight ?? 0;
        document.body.style.setProperty("--footer-height", `${this.footerHeight}px`);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new _projName({ debug: true });
});
