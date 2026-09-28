export class _accordion {
    constructor(props) {
        this.target = props.target;

        this.closeOthers = props.closeOthers ?? true;
        this.openFirst = props.openFirst ?? true;

        this.animating = false;

        this.init();
    }

    init() {
        document.querySelectorAll(".js-accordion-set").forEach((item, index) => {
            const _item = item;
            const _title = _item.querySelector(".js-accordion-set-title");
            const _content = _item.querySelector(".js-accordion-set-content");

            _content.style.display = "none";

            _title.addEventListener("click", (e) => {
                e.preventDefault();

                _item.classList.contains("active")
                    ? this.animating
                        ? null
                        : this.close(_item)
                    : this.open(_item);
            });

            if (this.openFirst && index === 0) this.open(_item);
        });
    }

    open(target) {
        this.animating = true;

        document.querySelectorAll(".js-accordion-set").forEach((item, index) => {
            const _item = item;

            if (_item === target) {
                const _content = _item.querySelector(".js-accordion-set-content");

                _content.style.overflow = "hidden";
                _content.style.display = "block";
                _content.style.maxHeight = "0px";

                const _targetHeight = _content.scrollHeight;

                animate({
                    from: 0,
                    to: _targetHeight,
                    duration: 200,
                    onUpdate: (latest) => {
                        _content.style.maxHeight = `${latest}px`;
                    },
                    onComplete: () => {
                        _content.style.maxHeight = "";

                        this.animating = false;
                    },
                });

                _item.classList.add("active");
            } else {
                // if close others
                if (this.closeOthers) this.close(_item);
            }
        });
    }

    close(target) {
        this.animating = true;

        const _item = target;
        const _content = _item.querySelector(".js-accordion-set-content");

        const _startHeight = _content.scrollHeight; // current full height

        _content.style.overflow = "hidden";
        _content.style.maxHeight = `${_startHeight}px`;

        animate({
            from: _startHeight,
            to: 0,
            duration: 200,
            onUpdate: (latest) => {
                _content.style.maxHeight = `${latest}px`;
            },
            onComplete: () => {
                _content.style.display = "none";
                _content.style.maxHeight = "";

                this.animating = false;
            },
        });

        _item.classList.remove("active");
    }
}
