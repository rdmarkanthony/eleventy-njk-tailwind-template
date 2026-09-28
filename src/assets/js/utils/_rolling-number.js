import { animate } from "popmotion";

export class _rollingNumber {
    constructor(props) {
        this.target = props.target ?? null;

        this.el = {
            main: document.createElement("div"),
            numbers: [],
        };

        this.numeric = props.numeric ?? true;

        this.maxNumber = Math.min(props.maxNumber ?? 9, 9) + 1;
        this.duration = props.duration ?? 750;
        this.currentNumber = null;
        this.startNumber = props.startNumber ?? 0;

        this.height = 0;
        this.currentOffset = 0;

        this.debug = props.debug ?? false;

        if (this.target) this.init();
    }

    init() {
        this.target.appendChild(this.el.main);

        this.target.style.position = "relative";
        this.target.style.overflow = "hidden";

        this.el.main.style.pointerEvents = "none";
        this.el.main.style.willChange = "transform";

        // create numbers
        for (let i = 0; i < this.maxNumber; i++) {
            this.createNumber(i);
        }
        this.createNumber(0);
        if (!this.numeric) {
            this.createNumber(",");
            this.createNumber(".");
        }

        let _resizeTimer = 0;
        window.addEventListener("resize", () => {
            clearTimeout(_resizeTimer);

            _resizeTimer = setTimeout(() => this.resize(), 10);
        });
        this.resize("init");

        if (this.debug) console.log("_rollingNumber", this);
    }

    createNumber(value) {
        let _number = document.createElement("div");
        const _span = document.createElement("span");
        _number.appendChild(_span);

        _span.innerText = value;
        this.el.numbers.push(_number);
        this.el.main.appendChild(_number);
    }

    roll(props) {
        let _from = props?.from ?? this.currentNumber ?? 0;
        let _to = props?.to ?? 0;
        const _duration = props?.duration ?? this.duration;

        if (_to === ",") {
            _to = this.el.numbers.length - 2;
            if (_from === 0) _from = this.maxNumber;
        }
        if (_to === ".") {
            _to = this.el.numbers.length - 1;
            if (_from === 0) _from = this.maxNumber;
        }

        // if (_to >= this.maxNumber) _to = this.maxNumber - 1;
        if (
            this.numeric &&
            this.currentNumber === 0 &&
            _from === 0 &&
            parseFloat(_to) === this.maxNumber - 1
        )
            _from = this.el.numbers.length - 1; // for countdowns
        if (_from === _to) return;

        animate({
            from: _from * this.height,
            to: _to * this.height,
            duration: _duration,
            onUpdate: (value) => {
                this.el.main.style.transform = `translate3d(0, -${value}px, 0)`;
                this.currentOffset = value;
            },
            onComplete: () => {
                this.currentNumber = parseFloat(_to);

                if (props.callback) props.callback(this);
            },
        });

        // animate the width
        if (!this.numeric)
            animate({
                from: this.el.numbers[_from].querySelector("span").offsetWidth,
                to: this.el.numbers[_to].querySelector("span").offsetWidth,
                duration: _duration * 0.5,
                elapsed: _duration * 0.5 * -1,
                onUpdate: (value) => {
                    this.target.style.width = `${value}px`;
                },
            });
    }

    resize(status) {
        let _height = 0;

        this.el.numbers.forEach((item) => {
            if (item.offsetHeight > _height) _height = item.offsetHeight;
        });

        if (_height === this.height) return;

        if (!this.numeric)
            this.target.style.width = `${
                this.el.numbers[this.currentNumber ?? 0].querySelector("span").offsetWidth
            }px`;

        this.height = _height;
        this.target.style.height = `${_height}px`;

        // need to reposition
        animate({
            from: status === "init" ? this.startNumber * this.height : this.currentOffset,
            to: (status === "init" ? this.startNumber : this.currentNumber) * this.height,
            duration: this.duration,
            onUpdate: (value) => {
                this.el.main.style.transform = `translate3d(0, -${value}px, 0)`;
                this.currentOffset = value;
            },
        });
    }
}
