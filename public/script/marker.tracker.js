/**
 * 
 * http://apis.map.daum.net/web/sample/markerTracker/
 * 
 * @param {daum.maps.LatLng} position 
 * @param {*} tooltipText 
 */
function TooltipMarker(position, tooltipText) {

    this.position = position;

    var node = document.createElement('div');
    node.className = 'node';
    this.node = node;

    var tooltip = document.createElement('div');
    tooltip.className = 'tooltip';

    tooltip.appendChild(document.createTextNode(tooltipText));
    node.appendChild(tooltip);

    // 툴팁 엘리먼트에 마우스 인터랙션에 따라
    // 보임/숨김 기능을 하도록 이벤트 등록
    node.onmouseover = () => tooltip.style.display = 'block';
    node.onmouseout = () => tooltip.style.display = 'none';
}

// extend AbstractOverlay
// connect prototype chain
TooltipMarker.prototype = new daum.maps.AbstractOverlay;

// override runs when setMap(map)
TooltipMarker.prototype.onAdd = function() {
    const panel = this.getPanels().overlayLayer;
    panel.appendChild(this.node);
};

TooltipMarker.prototype.onRemove = function() {
    this.node.parentNode.removeChild(this.node);
};

TooltipMarker.prototype.draw = function() {
    const projection = this.getProjection();
    const point = projection.pointFromCoords(this.position);
    const width = this.node.offsetWidth;
    const height = this.node.offsetHeight;
    this.node.style.left = (point.x - width/2) + "px";
    this.node.style.top = (point.y - height/2) + "px";
};

TooltipMarker.prototype.getPosition = function() {
    return this.position;
};

/**
 * 
 */
function MarkerTracker(map, target) {
    const OUTCODE = {
        INSIDE: 0,  // 0b0000
        TOP: 8,     // 0b1000
        RIGHT: 2,   // 0b0010
        BOTTOM: 4,  // 0b0100
        LEFT: 1     // 0b0001
    };

    const BOUNDS_BUFFER = 30;
    const CLIP_BUFFER = 40;

    var tracker = document.createElement('div');
    tracker.className = 'tracker';

    var icon = document.createElement('div');
    icon.className = 'icon';

    var balloon = document.createElement('div');
    balloon.className = 'balloon';

    tracker.appendChild(balloon);
    tracker.appendChild(icon);

    map.getNode().appendChild(tracker);

    tracker.onclick = function() {
        map.setCenter(target.getPosition());
        setVisible(false);
    };

    function tracking() {
        const proj = map.getProjection();
        const bounds = map.getBounds();
        const extBounds = extendBounds(bounds, proj);
        if (extBounds.contain(target.getPosition())) {
            setVisible(false);
        } else {
            const pos = proj.containerPointFromCoords(target.getPosition());
            const center = proj.containerPointFromCoords(map.getCenter());
            const sw = proj.containerPointFromCoords(bounds.getSouthWest());
            const ne = proj.containerPointFromCoords(bounds.getNorthEast());
            const top = (ne.y + CLIP_BUFFER);
            const right = (ne.x - CLIP_BUFFER);
            const bottom = (sw.y - CLIP_BUFFER);
            const left = (sw.x + CLIP_BUFFER);

            const clipPosition = getClipPosition(top, right, bottom, left, center, pos);
            tracker.style.top = clipPosition.y + 'px';
            tracker.style.left = clipPosition.x + 'px';

            const angle = getAngle(center, pos);

            balloon.style.cssText += 
                '-ms-transform: rotate(' + angle + 'deg);' +
                '-webkit-transform: rotate(' + angle + 'deg);' +
                'transform: rotate(' + angle + 'deg);';

            setVisible(true);
        }
    }

    function extendBounds(bounds, proj) {
        const sw = proj.pointFromCoords(bounds.getSouthWest());
        const ne = proj.pointFromCoords(bounds.getNorthEast());
        sw.x -= BOUNDS_BUFFER;
        sw.y += BOUNDS_BUFFER;
        ne.x += BOUNDS_BUFFER;
        ne.y += BOUNDS_BUFFER;

        return new daum.maps.LatLngBounds(
            proj.coordsFromPoint(sw), proj.coordsFromPoint(ne)
        );
    }

    function getClipPosition(top, right, bottom, left, inner, outer) {
        function calcOutcode(x, y) {
            let outcode = OUTCODE.INSIDE;
            if (x < left) outcode |= OUTCODE.LEFT;
            else if (x > right) outcode |= OUTCODE.RIGHT;
            if (y < top) outcode |= OUTCODE.TOP;
            else if (y > bottom) outcode |= OUTCODE.BOTTOM;
            return outcode;
        }

        const ix = inner.x;
        const iy = inner.y;
        let ox = outer.x;
        let oy = outer.y;

        let code = calcOutcode(ox, oy);

        while (true) {
            if (!code) break;

            if (code & OUTCODE.TOP) {
                ox = ox + (ix - ox) / (iy - oy) * (top - oy);
                oy = top;
            } else if (code & OUTCODE.RIGHT) {
                oy = oy + (iy - oy) / (ix - ox) * (right - ox);
                ox = right;
            } else if (code & OUTCODE.BOTTOM) {
                ox = ox + (ix - ox) / (iy - oy) * (bottom - oy);
                oy = bottom;
            } else if (code & OUTCODE.LEFT) {
                oy = oy + (iy - oy) / (ix - ox) * (left - ox);
                ox = left;
            }

            code = calcOutcode(ox, oy);
        }

        return { x: ox, y: oy };
    }

    function getAngle(center, target) {
        const dx = (target.x - center.x);
        const dy = (center.y - target.y);
        const deg = Math.atan2(dy, dx) * 180 / Math.PI;
        return ((-deg + 360) % 360 | 0) + 90;
    }

    function setVisible(visible) {
        tracker.style.display = visible ? 'block' : 'none';
    }

    function hideTracker() {
        setVisible(false);
    }

    this.run = function() {
        daum.maps.event.addListener(map, 'zoom_start', hideTracker);
        daum.maps.event.addListener(map, 'zoom_changed', tracking);
        daum.maps.event.addListener(map, 'center_changed', tracking);
        tracking();
    };

    this.stop = function() {
        daum.maps.event.removeListener(map, 'zoom_start', hideTracker);
        daum.maps.event.removeListener(map, 'zoom_changed', tracking);
        daum.maps.event.removeListener(map, 'center_changed', tracking);
        setVisible(false);
    };
}