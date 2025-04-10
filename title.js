// for the title screen
//

let atoms = [];

const canv = document.querySelector(".canv");
let ctx = canv.getContext("2d");
const dpr = window.devicePixelRatio;
const rect = canv.getBoundingClientRect();
canv.width = rect.width * dpr;
canv.height = rect.height * dpr;
ctx.font = "70px courier new";
ctx.fillStyle = "black";

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

let counter = 0;
function render() {
  counter++;
  ctx.clearRect(0, 0, canv.width, canv.height);
  for (let a of atoms) {
    ctx.font = "20px serif";

    ctx.beginPath();
    ctx.arc(a.X + 9 * a.elem.length, a.Y - 12, 40, 0, Math.PI * 2, true);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.fillStyle = "black";

    ctx.font = "bold 30px courier new";
    ctx.fillText(a.elem[0], a.X, a.Y);
    ctx.font = "bold 16px courier new";
    ctx.fillText(a.elem[1], a.X + 20, a.Y);
    ctx.font = "18px serif";
    ctx.fillText(a.neutrons + a.atomn, a.X - 25, a.Y - 15);
    ctx.font = "20px serif";
    ctx.fillText(a.elec.join(","), a.X + 2, a.Y + 20);

    //ctx.globalCompositeOperation = "destination-over";

    let repeats = a.elec.length;
    if (a.mbonds.length > 0) {
      repeats -= 1;
    }
    for (let l = 0; l < repeats; l++) {
      if (a.mbonds.length > 0) {
        ctx.save();
        ctx.strokeStyle = "rgb(84 133 255 / 8%)";
        ctx.lineWidth = 25;
        drawcirc(a.X + 18, a.Y - 2, 15 * (l + 1) + 40);
        ctx.restore();
      }
      drawcirc(a.X + 18, a.Y - 2, 15 * (l + 1) + 40);
      for (let i = 0; i < 360; i += 360 / a.elec[l]) {
        let turn = toradian(i + counter / 2 / (l + 3));
        let pos = circleification(a.X + 15, a.Y - 1, 15 * (l + 1) + 40, turn);

        ctx.fillText("x", pos[0], pos[1]);
      }
    }
    //ctx.globalCompositeOperation = "source-over";
    ctx.font = "70px serif";
    if (a.bonds.length > 0) {
      for (let b of a.bonds) {
        ctx.beginPath();
        ctx.moveTo(a.X + 28, a.Y);
        ctx.lineTo(b.X + 28, b.Y);
        ctx.stroke();
      }
    }
    if (a.cobonds.length > 0) {
      for (let b of a.cobonds) {
        ctx.save();

        if (a.cshared[a.cobonds.indexOf(b)] === 2) {
          ctx.lineWidth = 2;
          ctx.globalAlpha = 0.5;
        }
        if (a.cshared[a.cobonds.indexOf(b)] === 3) {
          ctx.lineWidth = 4;
          ctx.globalAlpha = 0.2;
        }
        ctx.beginPath();
        ctx.moveTo(a.X + 28, a.Y);
        ctx.lineTo(b.X + 28, b.Y);
        ctx.stroke();
        ctx.restore();
      }
    }
    if (a.mbonds.length > 0) {
      ctx.globalAlpha = 0.4;
      for (let b of a.mbonds) {
        ctx.beginPath();
        ctx.moveTo(a.X + 28, a.Y);
        ctx.lineTo(b.X + 28, b.Y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }

    ctx.font = "20px serif";
    ctx.fillStyle = "black";
    if (a.charge > 0) ctx.fillText("+" + a.charge, a.X + 2, a.Y - 25);
    if (a.charge < 0) ctx.fillText(a.charge, a.X + 2, a.Y - 25);

    ctx.font = "70px serif";
  }
}

class atom {
  constructor(e, x, y, ele, chg, n, an) {
    this.pos = [];
    this.X = x;
    this.Y = y;
    this.elem = e;
    this.elec = ele;
    this.charge = chg;
    this.atomn = 0;
    this.elecneg = 0;
    this.neutrons = n;
    this.atomn = an;
    //console.log(this.atomn);
    this.valence = ele[ele.length - 1];
    this.bonds = [];
    this.mbonds = [];
    this.cobonds = [];
    this.cshared = [];
  }
}
let w = 180;
atoms.push(new atom("C ", window.innerWidth - 4 * w, window.innerHeight, [2, 4], 0, 6, 6));
atoms.push(new atom("H ", window.innerWidth - 3 * w, window.innerHeight, [1], 0, 0, 1));
atoms.push(new atom("Eu", window.innerWidth - 2 * w, window.innerHeight, [2, 8, 18, 25, 8, 2], 0, 63, 63));
atoms.push(new atom("Mg", window.innerWidth - 1 * w, window.innerHeight, [2, 8, 2], 0, 12, 12));
atoms.push(new atom("I ", window.innerWidth - 0 * w, window.innerHeight, [2, 4], 0, 53, 53));
atoms.push(new atom("S ", window.innerWidth + 1 * w, window.innerHeight, [2, 4], 0, 6, 6));
atoms.push(new atom("Ti", window.innerWidth + 2 * w, window.innerHeight, [2, 4], 0, 6, 6));
atoms.push(new atom("Rn", window.innerWidth + 3 * w, window.innerHeight, [2, 4], 0, 6, 6));
atoms.push(new atom("Y ", window.innerWidth + 4 * w, window.innerHeight, [2, 4], 0, 6, 6));
setInterval(render, 1);
