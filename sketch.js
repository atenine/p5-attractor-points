w = window.innerWidth;
h = window.innerHeight;

function setup(){
    createCanvas(w, h);
    background(0, 0, 0);
}

dots = [];

function touchStarted(){
    return false;
}

function touchMoved(){
    return false;
}

for (i = 0; i < 50; i++){
    dots.push(
        {
            x : Math.random() * w,
            y : Math.random() * h,
            dx : Math.random() - 1,
            dy : Math.random() - 1,
            iterate : function(){
                this.x += this.dx * 0.0002;
                this.y += this.dy * 0.0002;
                this.x = max(this.x, 0);
                this.x = min(this.x, w);
                this.y = max(this.y, 0);
                this.y = min(this.y, h);
                this.dx *= 0.5;
                this.dy *= 0.5;
            }
        }
    )
}

function touchStarted(e) {
    return(e);
}

function getDistance(a, b) {
    dx = a.x - b.x;
    dy = a.y - b.y;
    return(Math.sqrt((dx * dx) + (dy * dy)));
}

function pline(a, b){
    stroke(255, 255, 255, (getDistance(a, b)/20));
    line(a.x, a.y, b.x, b.y);
}


function draw() {

    background(0, 0, 0);

    dots.forEach(e => {
        dots.forEach(f => {

            if(getDistance(e, f) < 150){
                e.dx -= (f.x - e.x) * 100;
                e.dy -= (f.y - e.y) * 100;
                pline(e, f);
            }
            else if(getDistance(e, f) < 500){
                e.dx += (f.x - e.x);
                e.dy += (f.y - e.y);
                pline(e, f);
            }
        })

        if(mouseIsPressed === true){
            if(getDistance({x: mouseX, y: mouseY}, e) < 150){
                e.dx -= (mouseX - e.x) * 1000;
                e.dy -= (mouseY - e.y) * 1000;
            }
        }
    });

    dots.forEach(e => {
        e.iterate();
        stroke(0);
        ellipse(e.x, e.y, 5, 5);
    });
  }