function Spotlight (config) {
    if(this.isEnabled()) {
        document.body.addEventListener('mousemove', this.moveSpotlight);
        document.body.style.overflowX = 'hidden';
        
        let spotlight = document.createElement('div');
        spotlight.id = 'spotlight';
        document.body.appendChild(spotlight);
        
        var style = document.createElement('style');
        style.innerHTML =
        	'#spotlight {' +
                'position:fixed;' +
                'z-index: 100;' +
        		`height: ${config.height}px;` +
                `width: ${config.width}px;` +
                'outline: 200vh solid black;' +
                `background: radial-gradient(ellipse at center, rgba(0,0,0,0) 0%,rgba(0,0,0,0) 40%,rgba(0,0,0,1) 60%,rgba(0,0,0,1) 100%);` +
                'cursor: crosshair;' +
                'pointer-events: none;' +
        	'}';
        document.getElementsByTagName('head')[0].appendChild(style, ref);
    }
}

Spotlight.prototype.moveSpotlight = function (event) {
    let spotlight = document.getElementById('spotlight');
    let top = event.clientY - spotlight.clientHeight / 2;
    let left = event.clientX - spotlight.clientWidth / 2;
    spotlight.style.top = `${top}px`;
    spotlight.style.left = `${left}px`;
}

Spotlight.prototype.isEnabled = function (event) {
    let result = null;
    let tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split('=');
            if (tmp[0] === 'cool' && tmp[1] === 'yo') result = decodeURIComponent(tmp[1]);
        });
    return (result === 'yo');
}

window.spotlight = new Spotlight({
    height: 400,
    width: 400
});
