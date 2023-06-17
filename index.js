class ClickCountAnimation {
    constructor(root) {
        this.root = root || document.body
        this.rootFrame = document.createElement("div");
        this.count = 1;
        this.init();
    }

    makeTick(event) {
        const tick = document.createElement("div");
        tick.classList.add("tick");
        tick.textContent = this.count;
        tick.style.top = `${event.offsetY}px`;
        tick.style.left = `${event.offsetX}px`;
        this.rootFrame.append(tick);
        this.count++;
    }

    clickHandler(event) {
        this.makeTick(event);
    }

    tick() {
        Array.from(this.rootFrame.querySelectorAll(".tick")).map((tick) => {
            const currentStyle = tick.getBoundingClientRect();
            const newSize = currentStyle.width + 2;
            tick.style.width = `${newSize}px`;
            tick.style.height = `${newSize}px`;
            tick.style.opacity = (400 - newSize) / 400;
            if(newSize > 400) tick.remove();
        });

        requestAnimationFrame(() => this.tick())
    }

    createFrame() {
        this.rootFrame.classList.add("square");
        this.root.append(this.rootFrame);
        this.rootFrame.addEventListener("click", (event) => this.clickHandler(event))
    }

    init() {
        this.createFrame();
        window.requestAnimationFrame(() => this.tick())
    }
}

new ClickCountAnimation();