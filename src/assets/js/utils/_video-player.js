import Hls from "hls.js";

export class _videoPlayer {
    constructor(props) {
        this.target = props.target ?? null;
        this.src = props.src ?? null;

        if (!this.target && !this.src) return;

        this.el = {
            video: document.createElement("video"),
        };

        this.autoplay = props.autoplay ?? false;
        this.controls = props.controls || !this.autoplay;
        this.stretch = props.stretch ?? false;

        this.isPlaying = false;

        this.debug = props.debug ?? false;

        this.events = props.events ?? {}; // for events eg. 'beforeInit'
        this.listeners = {};

        this.init();
    }

    init() {
        this.emit("beforeInit");

        if (!window._videoPlayerList) window._videoPlayerList = []; // storage for video players
        window._videoPlayerList.push(this);

        this.target.appendChild(this.el.video);
        this.el.video.style.position = "absolute";
        this.el.video.style.top = 0;
        this.el.video.style.left = 0;
        this.el.video.style.width = "100%";
        this.el.video.style.maxWidth = "inherit";
        this.el.video.style.height = "100%";

        this.el.video.controls = this.controls;
        this.el.video.muted = this.autoplay; // if muted & autoplay
        this.el.video.loop = this.autoplay;
        this.el.video.autoplay = this.autoplay;

        this.el.video.playsInline = true; // enable inline playback
        this.el.video.setAttribute("playsinline", "");
        this.el.video.setAttribute("webkit-playsinline", "");

        if (this.src.endsWith(".m3u8")) {
            // if m3u8 file
            if (typeof Hls !== "undefined" && Hls.isSupported()) {
                this.hls = new Hls();
                this.hls.loadSource(this.src);
                this.hls.attachMedia(this.el.video);
                this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    if (this.autoplay) this.el.video.play();
                });
            } else if (this.el.video.canPlayType("application/vnd.apple.mpegurl")) {
                this.el.video.src = this.src;
            } else {
                console.error("HLS is not supported in this browser.");
            }
        } else {
            this.el.video.src = this.src; // for standard
        }

        this.el.video.addEventListener("play", () => {
            this.target.classList.add("video-playing");
            this.target.classList.remove("video-paused", "video-ended");

            if (!this.autoplay) _videoPlayer.pauseAll(this);

            this.emit("play");
        });
        this.el.video.addEventListener("pause", () => {
            this.target.classList.add("video-paused");
            this.target.classList.remove("video-playing", "video-ended");

            this.emit("pause");
        });
        this.el.video.addEventListener("ended", () => {
            this.target.classList.add("video-ended");
            this.target.classList.remove("video-playing", "video-paused");

            this.emit("ended");
        });

        if (this.stretch) {
            if (getComputedStyle(this.target).overflow === "visible")
                this.target.style.overflow = "hidden";

            let _resizeTimer = null;
            window.addEventListener("resize", () => {
                clearTimeout(_resizeTimer);

                _resizeTimer = setTimeout(() => this.resize(), 50);
            });
            this.resize();
        }

        this.emit("afterInit");
    }

    resize() {
        if (!this.stretch) return;

        const _parent = {
            width: this.target.offsetWidth,
            height: this.target.offsetHeight,
        };
        const _new = {
            width: 0,
            height: 0,
        };
        const _aspectRatio = 16 / 9;

        if (_parent.width / _parent.height > _aspectRatio) {
            _new.width = _parent.width;
            _new.height = _parent.width / _aspectRatio;
        } else {
            _new.width = _parent.height * _aspectRatio;
            _new.height = _parent.height;
        }

        this.el.video.style.top = `${(_parent.height - _new.height) / 2}px`;
        this.el.video.style.left = `${(_parent.width - _new.width) / 2}px`;
        this.el.video.style.width = `${_new.width}px`;
        this.el.video.style.height = `${_new.height}px`;
    }

    // register event listener
    on(event, callback) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(callback);
    }

    // remove event listener
    off(event, callback) {
        if (!this.listeners[event]) return;
        this.listeners[event] = this.listeners[event].filter((cb) => cb !== callback);
    }

    // emit certain event
    emit(event) {
        if (this.events[event]) this.events[event](this);

        if (!this.listeners[event]) return;
        this.listeners[event].forEach((callback) => callback(this));
    }

    static pauseAll(currentPlayer) {
        if (window._videoPlayerList)
            window._videoPlayerList.forEach((item) => {
                // for youtube
                if (
                    item.player &&
                    !item.autoplay &&
                    item.player.getPlayerState &&
                    item.player.getPlayerState() === 1
                ) {
                    if (!currentPlayer || item !== currentPlayer) item.player.pauseVideo();
                }

                // for video
                if (item.el.video && !item.autoplay) {
                    if (!currentPlayer || item !== currentPlayer) item.el.video.pause();
                }
            });
    }
}
