(function() {
    //console.log("hi");
    var paper, circs, i, nowX, nowY, timer, props = {}, toggler = 0, elie, dx, dy, rad, cur, opa;
    // Returns a random integer between min and max  
    // Using Math.round() will give you a non-uniform distribution!  
    function ran(min, max)  
    {  
        return Math.floor(Math.random() * (max - min + 1)) + min;  
    } 
    
    function moveIt()
    {
        for(i = 0; i < circs.length; ++i)
        {            
            // Reset when time is at zero
            if (! circs[i].time) 
            {
                circs[i].time  = ran(30, 100);
                circs[i].deg   = ran(-179, 180);
                circs[i].vel   = ran(1, 5);  
                circs[i].curve = ran(0, 1);
                circs[i].fade  = ran(0, 1);
                circs[i].grow  = ran(-2, 2); 
            }                
            
            // Get position
            nowX = circs[i].attr("cx");
            nowY = circs[i].attr("cy");   
            // Calc movement
            dx = circs[i].vel * Math.cos(circs[i].deg * Math.PI/180);
            dy = circs[i].vel * Math.sin(circs[i].deg * Math.PI/180);
            // Calc new position
            nowX += dx;
            nowY += dy;
            
            // Calc wrap around
            var height = screen.height - 10;
            var width = screen.width - 10;
            if (nowX < 0) nowX = width + nowX;
            else          nowX = nowX % width;            
            if (nowY < 0) nowY = height + nowY;
            else          nowY = nowY % height;
            
            // Render moved particle
            circs[i].attr({cx: nowX, cy: nowY});
            
            // Calc growth
            rad = circs[i].attr("r");
            if (circs[i].grow > 0) circs[i].attr("r", Math.min(30, rad +  .1));
            else                   circs[i].attr("r", Math.max(10,  rad -  .1));
            
                // Calc curve
            if (circs[i].curve > 0) circs[i].deg = circs[i].deg + 2;
            else                    circs[i].deg = circs[i].deg - 2;
            
                // Calc opacity
            opa = circs[i].attr("fill-opacity");
            if (circs[i].fade > 0) {
                circs[i].attr("fill-opacity", Math.max(.3, opa -  .01));
                circs[i].attr("stroke-opacity", Math.max(.3, opa -  .01)); 
            } else {
                circs[i].attr("fill-opacity", Math.min(1, opa +  .01));
                circs[i].attr("stroke-opacity", Math.min(1, opa +  .01)); 
            }

            // Progress timer for particle
            circs[i].time = circs[i].time - 1;
            
                // Calc damping
            if (circs[i].vel < 1) circs[i].time = 0;
            else circs[i].vel = circs[i].vel - .05;              
       
        } 
        timer = setTimeout(moveIt, 60);
    }
    
    window.onload = function () {
        //console.log(screen.height);
        //console.log(screen.width);
        var height = screen.height-50;
        var width = screen.width-50;
        paper = Raphael("canvas", width, height);
        circs = paper.set();
        for (i = 0; i < 30; ++i) {
            opa = ran(3,10)/10;
            circs.push(paper.circle(ran(0,width), ran(0,height), ran(10,30)).attr({"fill-opacity": opa,
                                                                           "stroke-opacity": opa}));
        }
        circs.attr({fill: "#00DDAA", stroke: "#00DDAA"});
        moveIt();
        elie = document.getElementById("toggle");
        elie.onclick = function() {
            (toggler++ % 2) ? (function(){
                    moveIt();
                    elie.value = " Stop ";
                }()) : (function(){
                    clearTimeout(timer);
                    elie.value = " Start ";
                }());
        }
    };
}());



(function() {
    document.onmousemove = handleMouseMove;
    function handleMouseMove(event) {
        var dot, eventDoc, doc, body, pageX, pageY;

        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
              (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
              (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
              (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
              (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }

        // Use event.pageX / event.pageY here
        //console.log(event.pageX + ", " + event.pageY);
    }
})();