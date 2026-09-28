import { DateTime } from "luxon";

export class _countdownTimer {
    constructor(props) {
        this.timeZone = props.timeZone ?? "Asia/Manila";

        const _parsedDateTime = props.dateTime ? DateTime.fromISO(props.dateTime) : null;
        this.dateTime = {
            target:
                _parsedDateTime && _parsedDateTime.isValid
                    ? _parsedDateTime.setZone(this.timeZone)
                    : null, // target date & time
            now: null, // current date
            diff: null, // difference
            ended: false, // if countdown has ended
        };

        this.interval = null;

        this.debug = props.debug ?? false;

        this.events = props.events ?? {}; // for events eg. 'beforeInit'
        this.listeners = {};

        if (this.dateTime.target) this.init();
    }

    init() {
        this.emit("beforeInit");

        this.update();
        if (!this.dateTime.ended) this.interval = setInterval(() => this.update(), 1000);

        this.emit("afterInit");
    }

    update() {
        if (this.dateTime.ended) return; // stop updating if already ended

        this.dateTime.now = DateTime.now().setZone(this.timeZone);
        this.dateTime.diff = this.dateTime.target
            .diff(this.dateTime.now, ["days", "hours", "minutes", "seconds"])
            .toObject();
        this.dateTime.diff = {
            days: Math.max(0, this.dateTime.diff.days),
            hours: Math.max(0, this.dateTime.diff.hours),
            minutes: Math.max(0, this.dateTime.diff.minutes),
            seconds: Math.max(0, Math.floor(this.dateTime.diff.seconds)),
        }; // avoid returning negative diff values

        // once countdown has ended
        if (
            this.dateTime.diff.days <= 0 &&
            this.dateTime.diff.hours <= 0 &&
            this.dateTime.diff.minutes <= 0 &&
            parseInt(this.dateTime.diff.seconds) <= 0
        ) {
            this.dateTime.ended = true;
            this.destroy();
        }

        this.emit("update");

        if (this.debug) console.log("_countdownTimer", this);
    }

    destroy() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        this.emit("end");
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
}
