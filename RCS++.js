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

let cval = "";

// Data from CHATGPT
const data = [
  { symbol: "H", shells: [1], neut: 0, electronegativity: 2.2, section: "Nonmetals" },
  { symbol: "He", shells: [2], neut: 2, electronegativity: 0, section: "Noble gases" },
  { symbol: "Li", shells: [2, 1], neut: 4, electronegativity: 0.98, section: "Alkali metals" },
  { symbol: "Be", shells: [2, 2], neut: 5, electronegativity: 1.57, section: "Alkaline earth metals" },
  { symbol: "B", shells: [2, 3], neut: 6, electronegativity: 2.04, section: "Metalloids" },
  { symbol: "C", shells: [2, 4], neut: 6, electronegativity: 2.55, section: "Nonmetals" },
  { symbol: "N", shells: [2, 5], neut: 7, electronegativity: 3.04, section: "Nonmetals" },
  { symbol: "O", shells: [2, 6], neut: 8, electronegativity: 3.44, section: "Nonmetals" },
  { symbol: "F", shells: [2, 7], neut: 10, electronegativity: 3.98, section: "Halogens" },
  { symbol: "Ne", shells: [2, 8], neut: 10, electronegativity: 0, section: "Noble gases" },
  { symbol: "Na", shells: [2, 8, 1], neut: 12, electronegativity: 0.93, section: "Alkali metals" },
  { symbol: "Mg", shells: [2, 8, 2], neut: 12, electronegativity: 1.31, section: "Alkaline earth metals" },
  { symbol: "Al", shells: [2, 8, 3], neut: 14, electronegativity: 1.61, section: "Post-transition metals" },
  { symbol: "Si", shells: [2, 8, 4], neut: 14, electronegativity: 1.9, section: "Metalloids" },
  { symbol: "P", shells: [2, 8, 5], neut: 16, electronegativity: 2.19, section: "Nonmetals" },
  { symbol: "S", shells: [2, 8, 6], neut: 16, electronegativity: 2.58, section: "Nonmetals" },
  { symbol: "Cl", shells: [2, 8, 7], neut: 18, electronegativity: 3.16, section: "Halogens" },
  { symbol: "Ar", shells: [2, 8, 8], neut: 22, electronegativity: 0, section: "Noble gases" },
  { symbol: "K", shells: [2, 8, 8, 1], neut: 20, electronegativity: 0.82, section: "Alkali metals" },
  { symbol: "Ca", shells: [2, 8, 8, 2], neut: 20, electronegativity: 1.0, section: "Alkaline earth metals" },
  { symbol: "Sc", shells: [2, 8, 9, 2], neut: 24, electronegativity: 1.36, section: "Transition metals" },
  { symbol: "Ti", shells: [2, 8, 10, 2], neut: 26, electronegativity: 1.54, section: "Transition metals" },
  { symbol: "V", shells: [2, 8, 11, 2], neut: 28, electronegativity: 1.63, section: "Transition metals" },
  { symbol: "Cr", shells: [2, 8, 13, 1], neut: 28, electronegativity: 1.66, section: "Transition metals" },
  { symbol: "Mn", shells: [2, 8, 13, 2], neut: 30, electronegativity: 1.55, section: "Transition metals" },
  { symbol: "Fe", shells: [2, 8, 14, 2], neut: 30, electronegativity: 1.83, section: "Transition metals" },
  { symbol: "Co", shells: [2, 8, 15, 2], neut: 32, electronegativity: 1.88, section: "Transition metals" },
  { symbol: "Ni", shells: [2, 8, 16, 2], neut: 31, electronegativity: 1.91, section: "Transition metals" },
  { symbol: "Cu", shells: [2, 8, 18, 1], neut: 34, electronegativity: 1.9, section: "Transition metals" },
  { symbol: "Zn", shells: [2, 8, 18, 2], neut: 35, electronegativity: 1.65, section: "Transition metals" },
  { symbol: "Ga", shells: [2, 8, 18, 3], neut: 39, electronegativity: 1.81, section: "Post-transition metals" },
  { symbol: "Ge", shells: [2, 8, 18, 4], neut: 41, electronegativity: 2.01, section: "Metalloids" },
  { symbol: "As", shells: [2, 8, 18, 5], neut: 42, electronegativity: 2.18, section: "Metalloids" },
  { symbol: "Se", shells: [2, 8, 18, 6], neut: 45, electronegativity: 2.55, section: "Nonmetals" },
  { symbol: "Br", shells: [2, 8, 18, 7], neut: 45, electronegativity: 2.96, section: "Halogens" },
  { symbol: "Kr", shells: [2, 8, 18, 8], neut: 48, electronegativity: 3.0, section: "Noble gases" },
  { symbol: "Rb", shells: [2, 8, 18, 8, 1], neut: 48, electronegativity: 0.82, section: "Alkali metals" },
  { symbol: "Sr", shells: [2, 8, 18, 8, 2], neut: 50, electronegativity: 0.95, section: "Alkaline earth metals" },
  { symbol: "Y", shells: [2, 8, 18, 9, 2], neut: 50, electronegativity: 1.22, section: "Transition metals" },
  { symbol: "Zr", shells: [2, 8, 18, 10, 2], neut: 51, electronegativity: 1.33, section: "Transition metals" },
  { symbol: "Nb", shells: [2, 8, 18, 12, 1], neut: 52, electronegativity: 1.6, section: "Transition metals" },
  { symbol: "Mo", shells: [2, 8, 18, 13, 1], neut: 54, electronegativity: 2.16, section: "Transition metals" },
  { symbol: "Tc", shells: [2, 8, 18, 13, 2], neut: 55, electronegativity: 1.9, section: "Transition metals" },
  { symbol: "Ru", shells: [2, 8, 18, 15, 1], neut: 57, electronegativity: 2.2, section: "Transition metals" },
  { symbol: "Rh", shells: [2, 8, 18, 16, 1], neut: 58, electronegativity: 2.28, section: "Transition metals" },
  { symbol: "Pd", shells: [2, 8, 18, 18, 1], neut: 60, electronegativity: 2.2, section: "Transition metals" },
  { symbol: "Ag", shells: [2, 8, 18, 18, 1], neut: 61, electronegativity: 1.93, section: "Transition metals" },
  { symbol: "Cd", shells: [2, 8, 18, 18, 2], neut: 64, electronegativity: 1.69, section: "Transition metals" },
  { symbol: "In", shells: [2, 8, 18, 18, 3], neut: 66, electronegativity: 1.78, section: "Post-transition metals" },
  { symbol: "Sn", shells: [2, 8, 18, 18, 4], neut: 68, electronegativity: 1.96, section: "Post-transition metals" },
  { symbol: "Sb", shells: [2, 8, 18, 18, 5], neut: 71, electronegativity: 2.05, section: "Metalloids" },
  { symbol: "I", shells: [2, 8, 18, 18, 7], neut: 74, electronegativity: 2.66, section: "Halogens" },
  { symbol: "Te", shells: [2, 8, 18, 18, 6], neut: 76, electronegativity: 2.1, section: "Metalloids" },
  { symbol: "Xe", shells: [2, 8, 18, 18, 8], neut: 80, electronegativity: 2.6, section: "Noble gases" },
  { symbol: "Cs", shells: [2, 8, 18, 18, 8, 1], neut: 82, electronegativity: 0.79, section: "Alkali metals" },
  { symbol: "Ba", shells: [2, 8, 18, 18, 8, 2], neut: 81, electronegativity: 0.89, section: "Alkaline earth metals" },
  { symbol: "La", shells: [2, 8, 18, 18, 9, 2], neut: 82, electronegativity: 1.1, section: "Lanthanides" },
  { symbol: "Ce", shells: [2, 8, 18, 19, 9, 2], neut: 82, electronegativity: 1.12, section: "Lanthanides" },
  { symbol: "Pr", shells: [2, 8, 18, 21, 8, 2], neut: 84, electronegativity: 1.13, section: "Lanthanides" },
  { symbol: "Nd", shells: [2, 8, 18, 22, 8, 2], neut: 84, electronegativity: 1.14, section: "Lanthanides" },
  { symbol: "Pm", shells: [2, 8, 18, 23, 8, 2], neut: 84, electronegativity: 1.13, section: "Lanthanides" },
  { symbol: "Sm", shells: [2, 8, 18, 24, 8, 2], neut: 88, electronegativity: 1.17, section: "Lanthanides" },
  { symbol: "Eu", shells: [2, 8, 18, 25, 8, 2], neut: 89, electronegativity: 1.19, section: "Lanthanides" },
  { symbol: "Gd", shells: [2, 8, 18, 25, 9, 2], neut: 93, electronegativity: 1.2, section: "Lanthanides" },
  { symbol: "Tb", shells: [2, 8, 18, 27, 8, 2], neut: 94, electronegativity: 1.19, section: "Lanthanides" },
  { symbol: "Dy", shells: [2, 8, 18, 28, 8, 2], neut: 97, electronegativity: 1.22, section: "Lanthanides" },
  { symbol: "Ho", shells: [2, 8, 18, 29, 8, 2], neut: 98, electronegativity: 1.23, section: "Lanthanides" },
  { symbol: "Er", shells: [2, 8, 18, 30, 8, 2], neut: 99, electronegativity: 1.24, section: "Lanthanides" },
  { symbol: "Tm", shells: [2, 8, 18, 31, 8, 2], neut: 100, electronegativity: 1.25, section: "Lanthanides" },
  { symbol: "Yb", shells: [2, 8, 18, 32, 8, 2], neut: 103, electronegativity: 1.1, section: "Lanthanides" },
  { symbol: "Lu", shells: [2, 8, 18, 32, 9, 2], neut: 104, electronegativity: 1.27, section: "Lanthanides" },
  { symbol: "Hf", shells: [2, 8, 18, 32, 10, 2], neut: 106, electronegativity: 1.3, section: "Transition metals" },
  { symbol: "Ta", shells: [2, 8, 18, 32, 11, 2], neut: 108, electronegativity: 1.5, section: "Transition metals" },
  { symbol: "W", shells: [2, 8, 18, 32, 12, 2], neut: 110, electronegativity: 2.36, section: "Transition metals" },
  { symbol: "Re", shells: [2, 8, 18, 32, 13, 2], neut: 111, electronegativity: 1.9, section: "Transition metals" },
  { symbol: "Os", shells: [2, 8, 18, 32, 14, 2], neut: 114, electronegativity: 2.2, section: "Transition metals" },
  { symbol: "Ir", shells: [2, 8, 18, 32, 15, 2], neut: 115, electronegativity: 2.2, section: "Transition metals" },
  { symbol: "Pt", shells: [2, 8, 18, 32, 17, 1], neut: 117, electronegativity: 2.28, section: "Transition metals" },
  { symbol: "Au", shells: [2, 8, 18, 32, 18, 1], neut: 118, electronegativity: 2.54, section: "Transition metals" },
  { symbol: "Hg", shells: [2, 8, 18, 32, 18, 2], neut: 121, electronegativity: 2.0, section: "Transition metals" },
  { symbol: "Tl", shells: [2, 8, 18, 32, 18, 3], neut: 123, electronegativity: 1.62, section: "Post-transition metals" },
  { symbol: "Pb", shells: [2, 8, 18, 32, 18, 4], neut: 125, electronegativity: 2.33, section: "Post-transition metals" },
  { symbol: "Bi", shells: [2, 8, 18, 32, 18, 5], neut: 126, electronegativity: 2.02, section: "Post-transition metals" },
  { symbol: "Po", shells: [2, 8, 18, 32, 18, 6], neut: 128, electronegativity: 2.0, section: "Metalloids" },
  { symbol: "At", shells: [2, 8, 18, 32, 18, 7], neut: 125, electronegativity: 2.2, section: "Halogens" },
  { symbol: "Rn", shells: [2, 8, 18, 32, 18, 8], neut: 131, electronegativity: 2.2, section: "Noble gases" },
  { symbol: "Fr", shells: [2, 8, 18, 32, 18, 8, 1], neut: 136, electronegativity: 0.7, section: "Alkali metals" },
  { symbol: "Ra", shells: [2, 8, 18, 32, 18, 8, 2], neut: 138, electronegativity: 0.9, section: "Alkaline Earth Metals" },
  { symbol: "Ac", shells: [2, 8, 18, 32, 18, 9, 2], neut: 138, electronegativity: 1.1, section: "Actinides" },
  { symbol: "Th", shells: [2, 8, 18, 32, 18, 10, 2], neut: 142, electronegativity: 1.3, section: "Actinides" },
  { symbol: "Pa", shells: [2, 8, 18, 32, 18, 10, 2], neut: 140, electronegativity: 1.5, section: "Actinides" },
  { symbol: "U", shells: [2, 8, 18, 32, 18, 10, 2], neut: 146, electronegativity: 1.38, section: "Actinides" },
  { symbol: "Np", shells: [2, 8, 18, 32, 18, 11, 2], neut: 143, electronegativity: 1.36, section: "Actinides" },
  { symbol: "Pu", shells: [2, 8, 18, 32, 18, 12, 2], neut: 144, electronegativity: 1.28, section: "Actinides" },
  { symbol: "Am", shells: [2, 8, 18, 32, 18, 13, 2], neut: 150, electronegativity: 1.13, section: "Actinides" },
  { symbol: "Cm", shells: [2, 8, 18, 32, 18, 14, 2], neut: 151, electronegativity: 1.3, section: "Actinides" },
  { symbol: "Bk", shells: [2, 8, 18, 32, 18, 15, 2], neut: 142, electronegativity: 1.3, section: "Actinides" },
  { symbol: "Cf", shells: [2, 8, 18, 32, 18, 16, 2], neut: 145, electronegativity: 1.3, section: "Actinides" },
  { symbol: "Es", shells: [2, 8, 18, 32, 18, 17, 2], neut: 151, electronegativity: 1.3, section: "Actinides" },
  { symbol: "Fm", shells: [2, 8, 18, 32, 18, 18, 2], neut: 157, electronegativity: 1.3, section: "Actinides" },
  { symbol: "Md", shells: [2, 8, 18, 32, 18, 19, 2], neut: 158, electronegativity: 1.3, section: "Actinides" },
  { symbol: "No", shells: [2, 8, 18, 32, 18, 20, 2], neut: 159, electronegativity: 1.3, section: "Actinides" },
  { symbol: "Lr", shells: [2, 8, 18, 32, 18, 21, 2], neut: 162, electronegativity: 1.3, section: "Actinides" },
  { symbol: "Rf", shells: [2, 8, 18, 32, 18, 22, 2], neut: 164, electronegativity: 1.3, section: "Transition Metals" },
  { symbol: "Db", shells: [2, 8, 18, 32, 18, 23, 2], neut: 168, electronegativity: 1.3, section: "Transition Metals" },
  { symbol: "Sg", shells: [2, 8, 18, 32, 18, 24, 2], neut: 173, electronegativity: 1.3, section: "Transition Metals" },
  { symbol: "Bh", shells: [2, 8, 18, 32, 18, 25, 2], neut: 174, electronegativity: 1.3, section: "Transition Metals" },
  { symbol: "Hs", shells: [2, 8, 18, 32, 18, 26, 2], neut: 177, electronegativity: 1.3, section: "Transition Metals" },
  { symbol: "Mt", shells: [2, 8, 18, 32, 18, 27, 2], neut: 178, electronegativity: 1.3, section: "Unknown" },
  { symbol: "Ds", shells: [2, 8, 18, 32, 18, 28, 2], neut: 181, electronegativity: 1.3, section: "Unknown" },
  { symbol: "Rg", shells: [2, 8, 18, 32, 18, 29, 2], neut: 183, electronegativity: 1.3, section: "Unknown" },
  { symbol: "Cn", shells: [2, 8, 18, 32, 18, 30, 2], neut: 185, electronegativity: 1.3, section: "Unknown" },
  { symbol: "Nh", shells: [2, 8, 18, 32, 18, 31, 2], neut: 187, electronegativity: 1.3, section: "Unknown" },
  { symbol: "Fl", shells: [2, 8, 18, 32, 18, 32, 2], neut: 190, electronegativity: 1.3, section: "Unknown" },
  { symbol: "Mc", shells: [2, 8, 18, 32, 18, 33, 2], neut: 193, electronegativity: 1.3, section: "Unknown" },
  { symbol: "Lv", shells: [2, 8, 18, 32, 18, 34, 2], neut: 195, electronegativity: 1.3, section: "Unknown" },
  { symbol: "Ts", shells: [2, 8, 18, 32, 18, 35, 2], neut: 197, electronegativity: 2.2, section: "Unknown" },
  { symbol: "Og", shells: [2, 8, 18, 32, 18, 36, 2], neut: 200, electronegativity: 2.0, section: "Unknown" },
];
const metals = ["Alkali metals", "Alkaline earth metals", "Transition metals", "Post-transition metals", "Actinides", "Lanthanides" /* "mettaloids" */];

// More data from CHATGPT
const extendedorbitals = { P: 10, S: 12, Cl: 12, Xe: 12, As: 10, Se: 12, Br: 12, I: 12, Kr: 12, Sn: 10, Pb: 12, Fe: 12, Co: 12, Ni: 12, Cu: 12 };

let target = null;

let mouse = [];

let mousedown = false;

let atoms = [];

let particles = [];

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
  let flag1 = performance.now();
  counter++;
  ctx.clearRect(0, 0, canv.width, canv.height);
  for (let a of atoms) {
    ctx.font = "20px serif";

    ctx.beginPath();
    ctx.arc(a.X + 9 * a.elem.length, a.Y - 12, 40, 0, Math.PI * 2, true);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.fillStyle = "black";

    ctx.font = "30px serif";
    ctx.fillText(a.elem, a.X, a.Y);
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
      if (a.elec[0] === 0) {
        break;
      }
      if (a.mbonds.length > 0) {
        ctx.save();
        ctx.strokeStyle = "rgb(84 133 255 / 8%)";
        ctx.lineWidth = 25;
        drawcirc(a.X + 18, a.Y - 2, 15 * (l + 1) + 40);
        ctx.restore();
      }
      drawcirc(a.X + 18, a.Y - 2, 15 * (l + 1) + 40);
      for (let i = 0; i < 360; i += 360 / a.elec[l]) {
        let turn = toradian(i + (counter * 2) / (l + 3));
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

    let total = 0;
    for (let temp of a.cshared) {
      total += temp;
    }
    let av = a.elec[a.elec.length - 1];
    let abondgoals = a.elem != "H" && a.elem != "He" ? 8 - av : 2 - av;
    let goal2 = -20;
    if (extendedorbitals[a.elem] > 0) {
      goal2 = extendedorbitals[a.elem] - av - total;
    }
    if (abondgoals - total != 0 && goal2 != 0 && a.cobonds.length != 0) {
      ctx.fillStyle = "red";
      ctx.font = "15px serif";
      ctx.fillText("unstable bond", a.X - 8, a.Y + 28);
    }
    ctx.font = "20px serif";
    ctx.fillStyle = "black";
    if (a.charge > 0) ctx.fillText("+" + a.charge, a.X + 2, a.Y - 25);
    if (a.charge < 0) ctx.fillText(a.charge, a.X + 2, a.Y - 25);

    ctx.font = "70px serif";
  }
  for (let e of particles) {
    ctx.font = "25px serif";
    if (e.charge === -1) ctx.fillText("e-", e.X, e.Y);
    if (e.charge === 1) ctx.fillText("p", e.X, e.Y);
    if (e.charge === 0) ctx.fillText("n", e.X, e.Y);
  }
  let flag2 = performance.now();
  document.querySelector(".perf1").innerHTML = `render: ${(flag2 - flag1).toString().slice(0, 6)}`;
}

function numInArray(arrayinp, check) {
  let c = 0;
  for (let i of arrayinp) {
    if (i === check) {
      c++;
    }
  }
  return c;
}

function dist(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

function iterate() {
  let bound = canv.getBoundingClientRect();
  if (mousedown && target === null) {
    for (let a of atoms) {
      if (dist(a.X, a.Y, mouse.x, mouse.y) < 60) {
        target = a;
        // console.log(`${a.elem}: ${a.X} ${a.Y}`);
        // console.log(`mouse ${mouse.x} ${mouse.y}`);
      }
    }
  }

  if (mousedown && target != null) {
    target.X = mouse.x;
    target.Y = mouse.y;
  }

  calculateBonding();

  for (let o of atoms) {
    o.update();
  }
  for (let e of particles) {
    e.update();
  }
}

function clamp(n1, n2) {
  if (n1 < n2) {
    return n1;
  } else {
    return n2;
  }
}

function findTouching(ix, iy, exclude) {
  let list = [];
  for (let f of atoms) {
    // Check if the atoms are close, not the same atom, and have not already bonded
    if (dist(ix, iy, f.X, f.Y) < 180 && f != exclude) {
      list.push(f);
    }
  }
  return list;
}

function calculateBonding() {
  for (let a of atoms) {
    let touching = findTouching(a.X, a.Y, a);
    for (let t of touching) {
      let av = a.elec[a.elec.length - 1];
      let tv = t.elec[t.elec.length - 1];
      if (av > tv && a.charge === 0) {
        // skip if we arent gonna be positive ion
        continue;
      }

      if (Math.abs(a.elecneg - t.elecneg) > 1.7 || (metals.includes(a.section) && metals.includes(t.section) === false)) {
        if (a.charge === 0 && t.charge === 0) {
          if (av / (8 - tv) === 1 && a.bonds.includes(t) === false) {
            // 1:1 ratio, quick bond
            a.elec.pop();
            a.charge = av;
            t.elec[t.elec.length - 1] = 8;
            t.charge = -1 * (8 - tv);
            a.bonds.push(t);
            t.bonds.push(a);
          } else if (av / (8 - tv) > 1 && a.bonds.includes(t) === false) {
            let amount = 1;
            for (let p of touching) {
              if (p.elem === t.elem && p != t) {
                amount++;
              }
            }

            if (amount >= av / (8 - tv)) {
              a.elec.pop();
              a.charge = av;
              t.elec[t.elec.length - 1] = 8;
              t.charge = -1 * (8 - tv);
              a.bonds.push(t);
              t.bonds.push(a);
              let added = 1;
              for (let p of touching) {
                if (p.elem === t.elem && p != t && added <= av / (8 - tv) && a.bonds.includes(p) === false) {
                  p.elec[p.elec.length - 1] = 8;
                  p.charge = -1 * (8 - tv);
                  a.bonds.push(p);
                  p.bonds.push(a);
                }
              }
            }
          }
        } else if (a.charge / Math.abs(t.charge) === 1 && a.charge != 0 && t.charge != 0 && a.charge > 0 && a.bonds.includes(t) === false) {
          a.bonds.push(t);
          t.bonds.push(a);
        } else if (a.charge / Math.abs(t.charge) > 1 && a.charge != 0 && t.charge != 0 && a.charge > 0 && a.bonds.includes(t) === false) {
          let amount = 1;
          for (let p of touching) {
            if (p.elem === t.elem && p != t && p.charge != 0) {
              amount++;
            }
          }

          if (amount >= a.charge / Math.abs(t.charge)) {
            a.bonds.push(t);
            t.bonds.push(a);
            let added = 1;
            for (let p of touching) {
              if (p.elem === t.elem && p != t && added <= a.charge / Math.abs(t.charge) && p.charge != 0 && a.bonds.includes(t) === false) {
                a.bonds.push(p);
                p.bonds.push(a);
              }
            }
          }
        }
      } else if (
        Math.abs(a.elecneg - t.elecneg) < 1.7 &&
        metals.includes(a.section) === false &&
        metals.includes(t.section) === false &&
        a.charge === 0 &&
        t.charge === 0 &&
        a.cobonds.includes(t) === false &&
        t.cobonds.includes(a) === false &&
        a.mbonds.length === 0 &&
        t.mbonds.length === 0 &&
        a.bonds.length === 0 &&
        t.bonds.length === 0
      ) {
        let abondgoals = a.elem != "H" && a.elem != "He" ? 8 - av : 2 - av;
        let tbondgoals = t.elem != "H" && t.elem != "He" ? 8 - tv : 2 - av;
        let total = 0;
        for (let temp of a.cshared) {
          total += temp;
        }
        let total2 = 0;
        for (let temp of t.cshared) {
          total2 += temp;
        }
        let amissing = abondgoals - total;
        let tmissing = tbondgoals - total2;
        //console.log(extendedorbitals["S"]);
        if (extendedorbitals[a.elem] > 0 && t.elecneg > 3 && a.elem != t.elem) {
          amissing = extendedorbitals[a.elem] - av - total;
        } else if (extendedorbitals[t.elem] > 0 && a.elecneg > 3 && a.elem != t.elem) {
          tmissing = extendedorbitals[t.elem] - tv - total2;
        }
        if (amissing > 0 && tmissing > 0) {
          console.log(a.elem);
          console.log(amissing);
          console.log(tmissing);
          if (amissing === 1 && tmissing === 1) {
            a.cobonds.push(t);
            t.cobonds.push(a);
            a.cshared.push(1);
            t.cshared.push(1);
          } else if (amissing === 2 && tmissing === 2) {
            a.cobonds.push(t);
            t.cobonds.push(a);
            a.cshared.push(2);
            t.cshared.push(2);
          } else if (amissing === 3 && tmissing === 3) {
            a.cobonds.push(t);
            t.cobonds.push(a);
            a.cshared.push(3);
            t.cshared.push(3);
          } else if (amissing % 2 === 0 && tmissing % 2 === 0) {
            a.cobonds.push(t);
            t.cobonds.push(a);
            a.cshared.push(2);
            t.cshared.push(2);
          } else if (amissing != tmissing) {
            a.cobonds.push(t);
            t.cobonds.push(a);
            a.cshared.push(1);
            t.cshared.push(1);
          }
        }
      } else if (
        metals.includes(a.section) &&
        metals.includes(t.section) &&
        a.charge === 0 &&
        t.charge === 0 &&
        a.mbonds.includes(t) === false &&
        t.mbonds.includes(a) === false &&
        a.bonds.length === 0 &&
        t.bonds.length === 0 &&
        a.cobonds.length === 0 &&
        t.cobonds.length === 0
      ) {
        a.mbonds.push(t);
        t.mbonds.push(a);
      }
    }
  }
}
// 👷🔨🔧⚙️🛠️🚧✨ in the works... maybe
class particle {
  constructor(x, y, vx, vy, charge) {
    this.X = x;
    this.Y = y;
    this.vx = vx;
    this.vy = vy;
    this.charge = charge;
  }

  update() {
    let cc = 1750;
    let temp = atoms.concat(particles);
    for (let a of temp) {
      if (a === this) {
        continue;
      }

      let dx = a.X - this.X;
      let dy = a.Y - this.Y;
      let dis = dist(this.X, this.Y, a.X, a.Y);

      if (dis < 5) {
        continue;
      }

      let ux = dx / dis;
      let uy = dy / dis;

      let colum = cc * ((this.charge * a.charge) / (dis * 0.2) ** 2);
      colum *= -1;

      let cx = colum * ux;
      let cy = colum * uy;
      this.vx += cx * 0.1;
      this.vy += cy * 0.1;
    }
    this.vx = Math.min(this.vx, 20);
    this.vy = Math.min(this.vy, 20);

    this.X += this.vx * 0.1;
    this.Y += this.vy * 0.1;
    if (this.X > window.innerWidth * 2 || this.X < 1) {
      this.vx *= -1;
    }
    if (this.Y > window.innerHeight * 2 || this.Y < 100) {
      this.vy *= -1;
    }
    if (this.X > window.innerWidth * 2 + 10 || this.X < 1 - 10) {
      this.X = 0;
      this.vx = 0;
    }
    if (this.Y > window.innerHeight * 2 + 10 || this.Y < 100 - 10) {
      this.Y = 105;
      this.vy = 0;
    }
  }
}

function scaleHalfLife(hlf) {
  const mhf = 14050000000;
  return (Math.log2(hlf + 1) / Math.log2(mhf)) * 240 + 1;
}

function springForce(a, b, strength, length) {
  let dx = b.X - a.X;
  let dy = b.Y - a.Y;
  let dis = dist(a.X, a.Y, b.X, b.Y);

  let ux = dx / dis;
  let uy = dy / dis;
  let bstrength = strength;
  let blenngth = length;
  let damp = 0.4;
  let force = -bstrength * (dis - blenngth);
  force *= damp;
  force *= -1;
  let fx = force * ux;
  let fy = force * uy;
  return [fx, fy];
}

class atom {
  constructor(e, x, y, ele, custom, v1, v2, neut, charge) {
    this.pos = [];
    this.X = x;
    this.Y = y;
    this.elem = e;
    this.elec = ele;
    this.charge = 0;
    this.atomn = 0;
    this.elecneg = 0;
    for (let d of data) {
      if (d.symbol === e) {
        this.atomn = data.indexOf(d) + 1;
        this.neutrons = d.neut;
        this.elecneg = d.electronegativity;
        this.section = d.section;
        break;
      }
    }

    //console.log(this.atomn);
    this.valence = ele[ele.length - 1];
    this.vx = 0 + newran(0);
    this.vy = 0 + newran(0);
    this.bonds = [];
    this.mbonds = [];
    this.cobonds = [];
    this.cshared = [];

    if (custom) {
      this.neutrons = neut;
      this.vx = v1;
      this.vy = v2;
      this.charge = charge;
    }

    this.updateRadioTimer();
  }

  updateRadioTimer() {
    if (isotopes.hasOwnProperty(this.elem) === true) {
      if (isotopes[this.elem].constructor === Array) {
        for (let rad of isotopes[this.elem]) {
          if (rad.neutrons === this.neutrons) {
            this.nextLifeCheck = Date.now() + scaleHalfLife(rad.halfLife) * 1000;
            this.decaytype = rad.decay;
            console.log(scaleHalfLife(rad.halfLife));
          }
        }
      } else if (isotopes[this.elem].neutrons === this.neutrons) {
        this.nextLifeCheck = Date.now() + scaleHalfLife(isotopes[this.elem].halfLife) * 1000;
        this.decaytype = rad.decay;
        console.log(scaleHalfLife(isotopes[this.elem].halfLife));
      }
    }
  }

  update() {
    let myst = 0.1;
    for (let b of this.bonds) {
      if (dist(this.X, this.Y, b.X, b.Y) > 260) {
        b.vx *= 0.8;
        b.vy *= 0.8;
        this.bonds.splice(this.bonds.indexOf(b), 1);
        b.bonds.splice(b.bonds.indexOf(this), 1);
      }
    }
    for (let b of this.cobonds) {
      if (dist(this.X, this.Y, b.X, b.Y) > 260 || this.charge != 0) {
        b.vx *= 0.8;
        b.vy *= 0.8;
        this.cshared.splice(this.cobonds.indexOf(b), 1);
        this.cobonds.splice(this.cobonds.indexOf(b), 1);
        b.cshared.splice(b.cobonds.indexOf(this), 1);
        b.cobonds.splice(b.cobonds.indexOf(this), 1);
      }
      let dx = b.X - this.X;
      let dy = b.Y - this.Y;
      let dis = dist(this.X, this.Y, b.X, b.Y);

      let ux = dx / dis;
      let uy = dy / dis;
      let bstrength = 0.3;
      let blenngth = 130;
      let damp = 0.4;
      let force = -bstrength * (dis - blenngth);
      force *= damp;
      force *= -1;
      let fx = force * ux;
      let fy = force * uy;
      this.vx = this.vx + fx * myst;
      this.vy = this.vy + fy * myst;
      b.vx = b.vx + -fx * myst;
      b.vy = b.vy + -fy * myst;
    }
    for (let m of this.mbonds) {
      if (dist(this.X, this.Y, m.X, m.Y) > 200 || this.charge != 0) {
        this.mbonds.splice(this.mbonds.indexOf(m), 1);
        m.mbonds.splice(m.mbonds.indexOf(this), 1);
      }
      let forces = springForce(this, m, 0.2, 150);
      this.vx = this.vx + forces[0] * myst;
      this.vy = this.vy + forces[1] * myst;
      m.vx = m.vx + forces[0] * -myst;
      m.vy = m.vy + forces[1] * -myst;
    }
    //console.log(this);
    for (let a of atoms) {
      if (a === this || target === a || this === target || this.cobonds.includes(a) || this.mbonds.includes(a)) {
        continue;
      }
      let dx = a.X - this.X;
      let dy = a.Y - this.Y;
      let dis = dist(this.X, this.Y, a.X, a.Y);

      let ux = dx / dis;
      let uy = dy / dis;
      let cc = 1750;
      let well = 0.0001;
      let td = 400;
      let cx = 0;
      let cy = 0;

      let damp = 0.9999;
      if (dis < 5 || dis > 1000) {
        continue;
      }

      if (a.charge != 0 || this.charge != 0) {
        let colum = cc * ((this.charge * a.charge) / (dis * 0.2) ** 2);
        colum *= -1;

        cx = colum * ux;
        cy = colum * uy;
      }

      let lj = 24 * well * ((2 * td ** 12) / dis ** 13 - td ** 6 / dis ** 7);
      lj = Math.min(lj, 500);

      lj *= -1;

      let lx = lj * ux;
      let ly = lj * uy;

      let fx = cx + lx;
      let fy = cy + ly;

      this.vx = this.vx + fx * myst;
      this.vy = this.vy + fy * myst;

      a.vx = a.vx + -1 * fx * myst;
      a.vy = a.vy + -1 * fy * myst;
    }

    if (counter % 20) {
      if (this.hasOwnProperty("nextLifeCheck")) {
        if (Date.now() > this.nextLifeCheck && this.decaytype === "alpha") {
          delete this.nextLifeCheck;
          this.updateRadioTimer();
          let newelem = this.atomn - 2;
          this.elem = data[newelem - 1].symbol;
          this.elec = data[newelem - 1].shells;
          this.elecneg = data[newelem - 1].electronegativity;
          this.section = data[newelem - 1].section;
          this.neutrons -= 2;
          atoms.push(new atom("He", this.X + 120, this.Y, [0], true, 0, 0, 2, 2));
          console.log(atoms);
        }
      }
    }

    let damp = 0.999;
    if (document.querySelector(".chck").checked === true) {
      damp = 0.8;
    }
    this.vx *= damp;
    this.vy *= damp;

    this.X += this.vx * myst;
    this.Y += this.vy * myst;

    // if (this.vx > 0) this.vx /= 1.02;
    // if (this.vy > 0) this.vy /= 1.02;
    if (this.X > window.innerWidth * 2 || this.X < 1) {
      this.vx *= -1;
    }
    if (this.Y > window.innerHeight * 2 || this.Y < 100) {
      this.vy *= -1;
    }
    if (this.X > window.innerWidth * 2 + 10 || this.X < 1 - 10) {
      this.X = 0;
      this.vx = 0;
    }
    if (this.Y > window.innerHeight * 2 + 10 || this.Y < 100 - 10) {
      this.Y = 105;
      this.vy = 0;
    }
  }
}

/*
for (let oshan = 0; oshan < 2; oshan++) {
  atoms.push(new atom("Na", newran(window.innerWidth * 2), newran(1500), [2, 8, 1]));
  atoms.push(new atom("Cl", newran(window.innerWidth * 2), newran(1500), [2, 8, 8], true, -1));
}
*/
/*
for (let oshan = 0; oshan < 15; oshan++) {
  atoms.push(new atom("O", newran(window.innerWidth * 2), newran(1500), [2, 6]));
  atoms.push(new atom("Mg", newran(window.innerWidth * 2), newran(1500), [2, 8, 2]));
}
*/

for (let oshan = 0; oshan < 30; oshan++) {
  atoms.push(new atom("Na", newran(window.innerWidth * 2), newran(1500), [2, 8, 1]));
  atoms.push(new atom("Cl", newran(window.innerWidth * 2), newran(1500), [2, 8, 7]));
}

//atoms.push(new atom("Gr", newran(window.innerWidth * 2), newran(1500), [2, 8, 18, 32, 50, 72, 98], true));

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

function handle() {
  cval = document.querySelector(".inpt").value;
  if (cval === "e-") {
    particles.push(new particle(100, 1400, 10, -40, -1));
  }
  if (cval === "p") {
    particles.push(new particle(100, 1400, 10, -40, 1));
  }
  if (cval === "n") {
    particles.push(new particle(100, 1400, 10, -40, 0));
  }
  let check = cval;
  if (check.includes("-")) {
    check = check.slice(0, check.indexOf("-"));
  }
  for (let t of data) {
    if (t.symbol === check) {
      if (cval.includes("-")) {
        let newneut = parseInt(cval.slice(cval.indexOf("-") + 1)) - (data.indexOf(t) + 1);
        atoms.push(new atom(t.symbol, 100, 1400, t.shells.slice(), true, 10, -40, newneut, 0));
        return;
      }
      atoms.push(new atom(t.symbol, 100, 1400, t.shells.slice(), true, 10, -40, t.neut, 0));
      return;
    }
  }
}

function clearall() {
  atoms = [];
  particles = [];
}

document.querySelector(".btn").onclick = handle;
document.querySelector(".btn2").onclick = clearall;

render();

setInterval(render, 1);
setInterval(iterate, 1);
