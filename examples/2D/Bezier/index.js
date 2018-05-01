
require(['../../../dist/2D/Bezier'], function(Bezier) {
    let canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
        
    Bezier.bezier(ctx, [{x:100, y:200}, {x:200, y:100}, {x:300, y:300}, {x:400, y:200}], 100, true, true);
});