//

function newran(input) {
  return Math.floor(Math.random() * input);
}

const canv = document.querySelector(".canv");
let ctx = canv.getContext("2d");
const dpr = window.devicePixelRatio;
const rect = canv.getBoundingClientRect();
canv.width = rect.width * dpr;
canv.height = rect.height * dpr;
ctx.font = "70px serif";
ctx.fillStyle = "black";

let target = null;

let mouse = [];

let mousedown = false;

let atoms = [];

let counter = 0;

function circleification(px, py, r, ang) {
  return [px + r * Math.cos(ang), py + r * Math.sin(ang)];
}

function toradian(degree) {
  return degree * (Math.PI / 180);
}

function drawcirc(posx, posy, rad) {
  ctx.beginPath();
  ctx.arc(posx, posy, rad, 0, Math.PI * 2, true);
  ctx.stroke();
}

function render() {
  counter++;
  ctx.clearRect(0, 0, canv.width, canv.height);
  for (let a of atoms) {
    ctx.font = "20px serif";
    ctx.globalCompositeOperation = "destination-over";
    for (let l = 0; l < a.elec.length; l++) {
      for (let i = 0; i < 360; i += 360 / a.elec[l]) {
        let turn = toradian(i + counter / (l + 3));
        let pos = circleification(a.X + 15, a.Y - 5, 15 * (l + 1) + 40, turn);
        drawcirc(a.X + 18, a.Y - 6, 15 * (l + 1) + 40);
        ctx.fillText("x", pos[0], pos[1]);
      }
    }
    ctx.globalCompositeOperation = "source-over";
    ctx.font = "70px serif";
    if (a.bonds.length > 0) {
      for (let b of a.bonds) {
        ctx.beginPath();
        ctx.moveTo(a.X + 28, a.Y);
        ctx.lineTo(b.X + 28, b.Y);
        ctx.stroke();
      }
    }
    ctx.beginPath();
    ctx.arc(a.X + 9 * a.elem.length, a.Y - 12, 40, 0, Math.PI * 2, true);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.fillStyle = "black";

    ctx.font = "30px serif";
    ctx.fillText(a.elem, a.X, a.Y);
    ctx.font = "20px serif";
    ctx.fillText(a.elec.join(","), a.X + 2, a.Y + 20);
    if (a.charge > 0) ctx.fillText("+" + a.charge, a.X + 2, a.Y - 25);
    if (a.charge < 0) ctx.fillText(a.charge, a.X + 2, a.Y - 25);

    ctx.font = "70px serif";
  }
}

function dist(x1, y1, x2, y2) {
  return Math.abs(Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2));
}

function iterate() {
  let bound = canv.getBoundingClientRect();
  if (mousedown && target === null) {
    for (let a of atoms) {
      if (dist(a.X, a.Y, mouse.x, mouse.y) < 60) {
        target = a;
        console.log(`${a.elem}: ${a.X} ${a.Y}`);
        console.log(`mouse ${mouse.x} ${mouse.y}`);
      }
    }
  }

  if (mousedown && target != null) {
    target.X = mouse.x;
    target.Y = mouse.y;
  }

  for (let o of atoms) {
    for (let p of atoms) {
      if (p != o) {
        if (dist(o.X, o.Y, p.X, p.Y) < 170 && o.bonds.includes(p) === false && p.bonds.includes(p) === false) {
          let ov = o.elec[o.elec.length - 1];
          let pv = p.elec[p.elec.length - 1];
          if (ov + pv === 8 || (o.charge * -1 === p.charge && o.charge != 0 && p.charge != 0)) {
            o.bonds.push(p);
            if (ov > pv && ov + pv === 8) {
              o.elec[o.elec.length - 1] = 8;
              o.charge -= pv;
              p.charge += pv;
              p.elec.pop();
            } else if (ov + pv === 8) {
              o.elec.pop();
              p.elec[p.elec.length - 1] = 8;
              p.charge -= ov;
              o.charge += ov;
            }
          } else {
            // fix later
          }
        }
      }
    }
    o.update();
  }
}

function clamp(n1, n2) {
  if (n1 < n2) {
    return n1;
  } else {
    return n2;
  }
}

class atom {
  constructor(e, x, y, ele) {
    this.pos = [];
    this.X = x;
    this.Y = y;
    this.elem = e;
    this.elec = ele;
    this.charge = 0;
    this.valence = ele[ele.length - 1];
    this.vx = 0 + newran(1);
    this.vy = 0 + newran(1);
    this.bonds = [];
  }

  update() {
    //console.log(this);
    this.X += this.vx;
    this.Y += this.vy;
    if (this.bonds.length > 0) {
      for (let b of this.bonds) {
        let dis = dist(this.X, this.Y, b.X, b.Y); // dizrance
        if (dis > 350) {
          this.bonds.splice(this.bonds.indexOf(b), 1);
        }
        let k = 0.0005; // springyness
        let r = 130; // radius
        let dx = this.X - b.X; // direction
        let dy = this.Y - b.Y;

        let ux = dx / dis; //unit direction
        let uy = dy / dis;

        let bx = -k * (dis - r) * ux;
        let by = -k * (dis - r) * uy;
        b.vx -= bx; // The others velo
        b.vy -= by;
        this.vx += bx; // our velo
        this.vy += by;

        this.vx *= 0.99; // dampening
        this.vy *= 0.99;
        b.vx *= 0.99;
        b.vy *= 0.99;
      }
    }

    // if (this.vx > 0) this.vx /= 1.02;
    // if (this.vy > 0) this.vy /= 1.02;
    if (this.X > window.innerWidth * 2 || this.X < 1) {
      this.vx *= -1;
    }
    if (this.Y > window.innerHeight * 2 || this.Y < 5) {
      this.vy *= -1;
    }
    if (this.X > window.innerWidth * 2 + 10 || this.X < 1 - 10) {
      this.X = 5;
    }
    if (this.Y > window.innerHeight * 2 + 10 || this.Y < 5 - 10) {
      this.Y = 5;
    }
  }
}
for (let oshan = 0; oshan < 10; oshan++) {
  atoms.push(new atom("Na", newran(window.innerWidth * 2), newran(1500), [2, 8, 1]));
  atoms.push(new atom("Cl", newran(window.innerWidth * 2), newran(1500), [2, 8, 7]));
}

atoms.push(new atom("Mg", newran(window.innerWidth * 2), newran(1500), [2, 8, 2]));
atoms.push(new atom("O", newran(window.innerWidth * 2), newran(1500), [2, 6]));
atoms.push(new atom("Li", newran(window.innerWidth * 2), newran(1500), [2, 1]));
atoms.push(new atom("Cl", newran(window.innerWidth * 2), newran(1500), [2, 8, 7]));

document.onmousemove = (event) => {
  mouse.x = (event.clientX - rect.left) * dpr;
  mouse.y = (event.clientY - rect.top) * dpr;
};

document.onmousedown = (event) => {
  mousedown = true;
};
document.onmouseup = (event) => {
  mousedown = false;
  target = null;
};

render();

setInterval(render, 0);
setInterval(iterate, 0);
