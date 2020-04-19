export default class Clock {
    constructor() {
        this.startTime = 0;
        this.oldTime = 0;
        this.elapsedTime = 0;
        this.running = false;
        this.timeFunction = typeof performance === 'undefined' ? Date : performance;
    }
    start() {
        this.running = true;
        this.startTime = this.timeFunction.now();
        this.oldTime = this.startTime;
        this.elapsedTime = 0;
    }
    stop() {
        this.running = false;
    }
    getDelta() {
        const newTime = this.timeFunction.now();
        const difference = (newTime - this.oldTime) / 1000;
        this.oldTime = newTime;
        this.elapsedTime += difference;
        return difference;
    }
    getElapsed() {
        return this.elapsedTime;
    }
}
//# sourceMappingURL=Clock.js.map