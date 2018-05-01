define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function line(ctx, points) {
        let length = points.length;
        ctx.moveTo(points[0]['x'], points[0]['y']);
        for (let i = 0; ++i < length;) {
            ctx.lineTo(points[i]['x'], points[i]['y']);
        }
        ctx.stroke();
        ctx.beginPath();
    }
    exports.line = line;
    function circle(ctx, radius, points) {
        points = Array.isArray(points) ? points : [points];
        points.forEach(v => {
            ctx.arc(v.x, v.y, radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
        });
    }
    exports.circle = circle;
});
