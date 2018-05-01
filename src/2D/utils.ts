function line(ctx: CanvasRenderingContext2D, points: Array<Point>) {
    
    let length = points.length; 

    ctx.moveTo(points[0]['x'], points[0]['y']);

    for(let i = 0; ++i < length;) {
        ctx.lineTo(points[i]['x'], points[i]['y']);
    }

    ctx.stroke();
    ctx.beginPath();
}

function circle(ctx: CanvasRenderingContext2D, radius: number, points: Array<Point>) {
    points = Array.isArray(points) ? points : [points];
    
    points.forEach(v=> {
        ctx.arc(v.x, v.y, radius, 0, Math.PI*2);
        ctx.fill();
        ctx.beginPath();
    });
}

export { line, circle }
