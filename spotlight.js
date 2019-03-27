function Spotlight(config = {}) {
    config = this.mergeConfig(config);
    document.body.addEventListener('mousemove', this.moveSpotlight);
    document.body.style.overflowX = 'hidden';

    let spotlight = document.createElement('div');
    spotlight.id = 'spotlight';
    document.body.appendChild(spotlight);

    var style = document.createElement('style');
    style.innerHTML =
        `#spotlight {` +
        `position:fixed;` +
        `z-index: 100;` +
        `height: ${config.height}px;` +
        `width: ${config.width}px;` +
        `outline: 200vh solid ${this.convertToRGBA(config.color)};` +
        `background: radial-gradient(ellipse at center, ${this.convertToRGBA(config.color, 0)} 0%,rgba(0,0,0,0) 40%,${this.convertToRGBA(config.color, 1)} 60%,${this.convertToRGBA(config.color, 1)} 100%);` +
        `cursor: crosshair;` +
        `pointer-events: none;` +
        '}';
    document.getElementsByTagName('head')[0].appendChild(style);
}

Spotlight.prototype.moveSpotlight = function(event) {
    let spotlight = document.getElementById('spotlight');
    let top = event.clientY - spotlight.clientHeight / 2;
    let left = event.clientX - spotlight.clientWidth / 2;
    spotlight.style.top = `${top}px`;
    spotlight.style.left = `${left}px`;
}

Spotlight.prototype.mergeConfig = function(config) {
    if (config.color === undefined) {
        config.color = '#FFFFFF';
    }
    if (config.height === undefined) {
        this.height = 200;
    }
    if (config.width === undefined) {
        this.width = 200;
    }
    return config;
}

Spotlight.prototype.convertToRGBA = function(hexValue, alpha) {
    let r = parseInt(hexValue.slice(1, 3), 16);
    let g = parseInt(hexValue.slice(3, 5), 16);
    let b = parseInt(hexValue.slice(5, 7), 16);

    if (alpha === undefined) {
        alpha = 1;
    }

    return `rgba(${r},${g},${b},${alpha})`
}

window.Spotlight = Spotlight;