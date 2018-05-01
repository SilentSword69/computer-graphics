define(["require", "exports", "./utils"], function (require, exports, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function bezier(ctx, points, segment = 10, subline = false, animate = false, time = 3) {
        let step = 1 / segment;
        let midPoints = [];
        let curvePoints = [];
        let Interval = animate && time * 1000 / segment;
        let config = {
            //control point
            CP_Color: '#999999',
            CP_Radius: 5,
            //middle point
            MP_Color: '#000000',
            MP_radius: 3,
            //point on curve
            VP_Color: 'red',
            VP_Radius: 5,
            //control point line
            CL_Color: '#000000',
            CL_Width: 1,
            //subline
            SL_Color: '#000000',
            SL_Width: 1,
            //point on curve line
            VL_Color: 'red',
            VL_Width: 2
        };
        ctx.lineCap = 'round';
        curvePoints.push = function (...points) {
            ctx.save();
            Object.assign(ctx, { strokeStyle: config.VL_Color, lineWidth: config.VL_Width, fillStyle: config.VP_Color });
            if (this.length !== 0) {
                utils_1.line(ctx, animate ? [...this, ...points] : [this[this.length - 1], ...points]);
            }
            !animate && utils_1.circle(ctx, config.VP_Radius, points);
            ctx.restore();
            Array.prototype.push.apply(this, points);
        };
        //draw controll points
        function drawStatic() {
            ctx.save();
            Object.assign(ctx, { strokeStyle: config.CL_Color, lineWidth: config.CL_Width, fillStyle: config.CP_Color });
            utils_1.line(ctx, points);
            utils_1.circle(ctx, config.CP_Radius, points);
            ctx.restore();
        }
        function draw(i) {
            animate && (ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height),
                drawStatic());
            if (i === segment) {
                curvePoints.push(points[points.length - 1]);
                return;
            }
            let u = i * step;
            midPoints = points;
            while (true) {
                if (midPoints.length < 2)
                    break;
                midPoints = midPoints.map((v, i, p) => i !== p.length - 1 && { x: v.x + (p[i + 1]['x'] - v.x) * u, y: v.y + (p[i + 1]['y'] - v.y) * u });
                midPoints.pop();
                subline && i !== segment && (utils_1.line(ctx, midPoints),
                    utils_1.circle(ctx, config.MP_radius, midPoints));
            }
            curvePoints.push(midPoints[0]);
            animate ? setTimeout(draw, Interval, ++i) : draw(++i);
        }
        drawStatic();
        curvePoints.push(points[0]);
        Object.assign(ctx, { strokeStyle: config.SL_Color, lineWidth: config.SL_Width, fillStyle: config.MP_Color });
        draw(1);
    }
    exports.bezier = bezier;
});
