// Chemistry!

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

navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
  if (result.state === "granted" || result.state === "prompt") {
    /* write to the clipboard now */
  }
});

let cval = "";

let nextAtomID = 1;

let paused = false;
let halflifetime = 60;

let permissions = { Raddecay: true, Fission: true, Ion: true, Co: true, Met: true };

// Data from CHATGPT

let target = null;

let mouse = [];

let mousedown = false;

let atoms = {};

let particles = [];

let counter = 0;

let savefilechoice = document.querySelector(".savefile");

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

function saveAll() {
  console.log(atoms);
  navigator.clipboard.writeText(JSON.stringify(atoms)).then(
    () => {
      /* clipboard successfully set */
    },
    () => {
      /* clipboard write failed */
    },
  );
}

function localSave() {
  localStorage.setItem(savefilechoice.value, JSON.stringify(atoms));
}

function localLoad() {
  atoms = {};
  ta = JSON.parse(localStorage.getItem(savefilechoice.value));
  console.log(ta);
  classify(ta);
}

function loadAll() {
  atoms = {};
  ta = JSON.parse(document.querySelector(".load").value);
  classify(ta);
}

function classify(ta) {
  for (let i in ta) {
    if (ta[i] === null) {
      continue;
    }
    let qa = ta[i];
    atoms[ta[i].ID] = new atom(ta[i].elem, ta[i].X, ta[i].Y, ta[i].elec);
    atoms[qa.ID].ID = qa.ID;
    nextAtomID = qa.ID + 1;
    atoms[qa.ID].charge = qa.charge;
    atoms[qa.ID].atomn = qa.atomn;
    atoms[qa.ID].elecneg = qa.elecneg;
    atoms[qa.ID].neutrons = qa.neutrons;
    atoms[qa.ID].section = qa.section;
    atoms[qa.ID].vx = qa.vx;
    atoms[qa.ID].vy = qa.vy;
    atoms[qa.ID].bonds = qa.bonds;
    atoms[qa.ID].cobonds = qa.cobonds;
    atoms[qa.ID].cshared = qa.cshared;
    atoms[qa.ID].mbonds = qa.mbonds;
    console.log(atoms[ta[i].ID]);
  }
}

// "1":{"ID":1,"pos":[],"X":936.7025208272756,"Y":1159.459210901802,"elem":"O","elec":[2,6],"charge":0,"atomn":8,"elecneg":3.44,"neutrons":8,"section":"Nonmetals","valence":6,"vx":1.7507068497529557,"vy":-6.511651189291423,"bonds":[],"mbonds":[],"cobonds":[],"cshared":[]}

function render() {
  counter++;

  ctx.clearRect(0, 0, canv.width, canv.height);
  for (let a in atoms) {
    ctx.scale(0.98, 0.98);
    ctx.font = "20px serif";
    let newatom = atoms[a];

    ctx.beginPath();
    ctx.arc(newatom.X + 9 * newatom.elem.length, newatom.Y - 12, 40, 0, Math.PI * 2, true);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.fillStyle = "black";

    ctx.font = "30px serif";
    ctx.fillText(newatom.elem, newatom.X, newatom.Y);
    ctx.font = "18px serif";
    ctx.fillText(newatom.neutrons + newatom.atomn, newatom.X - 25, newatom.Y - 15);
    ctx.font = "20px serif";
    ctx.fillText(newatom.elec.join(","), newatom.X + 2, newatom.Y + 20);

    //ctx.globalCompositeOperation = "destination-over";

    let repeats = newatom.elec.length;
    if (newatom.mbonds.length > 0) {
      repeats -= 1;
    }
    for (let l = 0; l < repeats; l++) {
      if (newatom.elec[0] === 0) {
        break;
      }
      if (newatom.mbonds.length > 0) {
        ctx.save();
        ctx.strokeStyle = "rgb(84 133 255 / 8%)";
        ctx.lineWidth = 25;
        drawcirc(newatom.X + 18, newatom.Y - 2, 15 * (l + 1) + 40);
        ctx.restore();
      }
      drawcirc(newatom.X + 18, newatom.Y - 2, 15 * (l + 1) + 40);
      for (let i = 0; i < 360; i += 360 / newatom.elec[l]) {
        let turn = toradian(i + (counter * 2) / (l + 3));
        let pos = circleification(newatom.X + 15, newatom.Y - 1, 15 * (l + 1) + 40, turn);

        ctx.fillText("x", pos[0], pos[1]);
      }
    }
    //ctx.globalCompositeOperation = "source-over";
    ctx.font = "70px serif";
    if (newatom.bonds.length > 0) {
      for (let b of newatom.bonds) {
        ctx.beginPath();
        ctx.moveTo(newatom.X + 28, newatom.Y);
        ctx.lineTo(atoms[b].X + 28, atoms[b].Y);
        ctx.stroke();
      }
    }
    if (newatom.cobonds.length > 0) {
      for (let b of newatom.cobonds) {
        ctx.save();

        if (newatom.cshared[newatom.cobonds.indexOf(b.ID)] === 2) {
          ctx.lineWidth = 2;
          ctx.globalAlpha = 0.5;
        }
        if (newatom.cshared[newatom.cobonds.indexOf(b.ID)] === 3) {
          ctx.lineWidth = 4;
          ctx.globalAlpha = 0.2;
        }
        ctx.beginPath();
        ctx.moveTo(newatom.X + 28, newatom.Y);
        ctx.lineTo(atoms[b].X + 28, atoms[b].Y);
        ctx.stroke();
        ctx.restore();
      }
    }
    if (newatom.mbonds.length > 0) {
      ctx.globalAlpha = 0.4;
      for (let b of newatom.mbonds) {
        ctx.beginPath();
        ctx.moveTo(newatom.X + 28, newatom.Y);
        ctx.lineTo(atoms[b].X + 28, atoms[b].Y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }

    let total = 0;
    for (let temp of newatom.cshared) {
      total += temp;
    }
    let av = newatom.elec[newatom.elec.length - 1];
    let abondgoals = newatom.elem != "H" && newatom.elem != "He" ? 8 - av : 2 - av;
    let goal2 = -20;
    if (extendedorbitals[newatom.elem] > 0) {
      goal2 = extendedorbitals[newatom.elem] - av - total;
    }
    if (abondgoals - total != 0 && goal2 != 0 && newatom.cobonds.length != 0) {
      ctx.fillStyle = "red";
      ctx.font = "15px serif";
      ctx.fillText("unstable bond", newatom.X - 8, newatom.Y + 28);
    }
    ctx.font = "20px serif";
    ctx.fillStyle = "black";
    if (newatom.charge > 0) ctx.fillText("+" + newatom.charge, newatom.X + 2, newatom.Y - 25);
    if (newatom.charge < 0) ctx.fillText(newatom.charge, newatom.X + 2, newatom.Y - 25);

    ctx.font = "70px serif";
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
  for (let e of particles) {
    ctx.font = "25px serif";
    ctx.fillText(e.name, e.X, e.Y);
  }
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
  if (paused) {
    let slide = document.querySelector(".slide");
    let slidtext = document.querySelector(".slidetext");
    slidtext.innerHTML = `Max half-life time: ${slide.value}s`;
    halflifetime = parseInt(slide.value);

    permissions.Raddecay = document.querySelector(".drad").checked;
    permissions.Fission = document.querySelector(".dfis").checked;
    permissions.Ion = document.querySelector(".dion").checked;
    permissions.Co = document.querySelector(".dcov").checked;
    permissions.Met = document.querySelector(".dmet").checked;
    return;
  }
  let flag1 = performance.now();
  let bound = canv.getBoundingClientRect();
  if (mousedown && target === null) {
    for (let b in atoms) {
      let a = atoms[b];
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

  for (let m in atoms) {
    let o = atoms[m];
    o.update();
  }
  for (let e of particles) {
    e.update();
  }
  render();
  let flag2 = performance.now();
  document.querySelector(".perf1").innerHTML = `speed: ${(flag2 - flag1).toString().slice(0, 6)}`;
  if (flag2 - flag1 > 10) {
    document.querySelector(".perf1").innerHTML = `speed: ${(flag2 - flag1).toString().slice(0, 6)}⚠️`;
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
  for (let e in atoms) {
    let f = atoms[e];
    // Check if the atoms are close, not the same atom, and have not already bonded
    if (dist(ix, iy, f.X, f.Y) < 180 && f != exclude) {
      list.push(f);
    }
  }
  return list;
}

function calculateBonding() {
  for (let b in atoms) {
    let a = atoms[b];
    let touching = findTouching(a.X, a.Y, a);
    for (let t of touching) {
      let av = a.elec[a.elec.length - 1];
      let tv = t.elec[t.elec.length - 1];
      if (av > tv && a.charge === 0) {
        // skip if we arent gonna be positive ion
        continue;
      }

      if ((Math.abs(a.elecneg - t.elecneg) > 1.7 || (metals.includes(a.section) && metals.includes(t.section) === false)) && a.atomn < 36 && t.atomn < 36 && permissions.Ion) {
        if (a.charge === 0 && t.charge === 0) {
          if (av / (8 - tv) === 1 && a.bonds.includes(t.ID) === false) {
            // 1:1 ratio, quick bond
            a.elec.pop();
            a.charge = av;
            t.elec[t.elec.length - 1] = 8;
            t.charge = -1 * (8 - tv);
            a.bonds.push(t.ID);
            t.bonds.push(a.ID);
          } else if (av / (8 - tv) > 1 && a.bonds.includes(t.ID) === false) {
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
              a.bonds.push(t.ID);
              t.bonds.push(a.ID);
              let added = 1;
              for (let p of touching) {
                if (p.elem === t.elem && p != t && added <= av / (8 - tv) && a.bonds.includes(p.ID) === false) {
                  p.elec[p.elec.length - 1] = 8;
                  p.charge = -1 * (8 - tv);
                  a.bonds.push(p.ID);
                  p.bonds.push(a.ID);
                }
              }
            }
          }
        } else if (a.charge / Math.abs(t.charge) === 1 && a.charge != 0 && t.charge != 0 && a.charge > 0 && a.bonds.includes(t.ID) === false) {
          a.bonds.push(t.ID);
          t.bonds.push(a.ID);
        } else if (a.charge / Math.abs(t.charge) > 1 && a.charge != 0 && t.charge != 0 && a.charge > 0 && a.bonds.includes(t.ID) === false) {
          let amount = 1;
          for (let p of touching) {
            if (p.elem === t.elem && p != t && p.charge != 0) {
              amount++;
            }
          }

          if (amount >= a.charge / Math.abs(t.charge)) {
            a.bonds.push(t.ID);
            t.bonds.push(a.ID);
            let added = 1;
            for (let p of touching) {
              if (p.elem === t.elem && p != t && added <= a.charge / Math.abs(t.charge) && p.charge != 0 && a.bonds.includes(t.ID) === false) {
                a.bonds.push(p.ID);
                p.bonds.push(a.ID);
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
        a.cobonds.includes(t.ID) === false &&
        t.cobonds.includes(a.ID) === false &&
        a.mbonds.length === 0 &&
        t.mbonds.length === 0 &&
        a.bonds.length === 0 &&
        t.bonds.length === 0 &&
        a.section != "Noble gases" &&
        t.section != "Noble gases" &&
        permissions.Co
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
            a.cobonds.push(t.ID);
            t.cobonds.push(a.ID);
            a.cshared.push(1);
            t.cshared.push(1);
          } else if (amissing === 2 && tmissing === 2) {
            a.cobonds.push(t.ID);
            t.cobonds.push(a.ID);
            a.cshared.push(2);
            t.cshared.push(2);
          } else if (amissing === 3 && tmissing === 3) {
            a.cobonds.push(t.ID);
            t.cobonds.push(a.ID);
            a.cshared.push(3);
            t.cshared.push(3);
          } else if (amissing % 2 === 0 && tmissing % 2 === 0) {
            a.cobonds.push(t.ID);
            t.cobonds.push(a.ID);
            a.cshared.push(2);
            t.cshared.push(2);
          } else if (amissing != tmissing) {
            a.cobonds.push(t.ID);
            t.cobonds.push(a.ID);
            a.cshared.push(1);
            t.cshared.push(1);
          }
        }
      } else if (
        metals.includes(a.section) &&
        metals.includes(t.section) &&
        a.charge === 0 &&
        t.charge === 0 &&
        a.mbonds.includes(t.ID) === false &&
        t.mbonds.includes(a.ID) === false &&
        a.bonds.length === 0 &&
        t.bonds.length === 0 &&
        a.cobonds.length === 0 &&
        t.cobonds.length === 0 &&
        permissions.Met
      ) {
        a.mbonds.push(t.ID);
        t.mbonds.push(a.ID);
      }
    }
  }
}
// 👷🔨🔧⚙️🛠️🚧✨ in the works... maybe
class particle {
  constructor(x, y, vx, vy, charge, name) {
    this.X = x;
    this.Y = y;
    this.vx = vx;
    this.vy = vy;
    this.charge = charge;
    this.name = name;
  }

  update() {
    let cc = 1750;
    for (let b in atoms) {
      let a = atoms[b];

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
      //console.log("help mee");
      if (this.Y < 100) this.Y = 105;

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
  return (Math.log2(hlf + 1) / Math.log2(mhf)) * halflifetime + 1;
}

function findAtom(name) {
  for (let a of data) {
    if (a.symbol === name) {
      return a;
    }
  }
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
    this.ID = nextAtomID;
    nextAtomID++;
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
            if (rad.hasOwnProperty("neutronReaction")) {
              this.fissionable = true;
              this.fisreact = rad.neutronReaction;
            }
          }
        }
      } else if (isotopes[this.elem].neutrons === this.neutrons) {
        this.nextLifeCheck = Date.now() + scaleHalfLife(isotopes[this.elem].halfLife) * 1000;
        this.decaytype = isotopes[this.elem].decay;
        console.log(scaleHalfLife(isotopes[this.elem].halfLife));
        if (isotopes[this.elem].hasOwnProperty("neutronReaction")) {
          this.fissionable = true;
          this.fisreact = rad.neutronReaction;
        }
      }
    }
  }

  update() {
    let myst = 0.1;
    for (let b1 of this.bonds) {
      let b = atoms[b1];
      if (dist(this.X, this.Y, b.X, b.Y) > 260) {
        b.vx *= 0.8;
        b.vy *= 0.8;
        this.bonds.splice(this.bonds.indexOf(b1), 1);
        b.bonds.splice(b.bonds.indexOf(this.ID), 1);
      }
    }
    for (let b1 of this.cobonds) {
      let b = atoms[b1];
      if (dist(this.X, this.Y, b.X, b.Y) > 260 || this.charge != 0) {
        b.vx *= 0.8;
        b.vy *= 0.8;
        this.cshared.splice(this.cobonds.indexOf(b1), 1);
        this.cobonds.splice(this.cobonds.indexOf(b1), 1);
        b.cshared.splice(b.cobonds.indexOf(this.ID), 1);
        b.cobonds.splice(b.cobonds.indexOf(this.ID), 1);
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
    for (let m1 of this.mbonds) {
      let m = atoms[m1];
      if (dist(this.X, this.Y, m.X, m.Y) > 200 || this.charge != 0) {
        this.mbonds.splice(this.mbonds.indexOf(m1), 1);
        m.mbonds.splice(m.mbonds.indexOf(this.ID), 1);
      }
      let forces = springForce(this, m, 0.2, 150);
      this.vx = this.vx + forces[0] * myst;
      this.vy = this.vy + forces[1] * myst;
      m.vx = m.vx + forces[0] * -myst;
      m.vy = m.vy + forces[1] * -myst;
    }
    //console.log(this);
    for (let b in atoms) {
      let a = atoms[b];
      if (a === this || target === a || this === target || this.cobonds.includes(a.ID) || this.mbonds.includes(a.ID)) {
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

    for (let p of particles) {
      if (dist(this.X, this.Y, p.X, p.Y) < 190 && p.charge === 0 && this.fissionable === true && permissions.Fission) {
        let postemp = -170;
        for (let res of this.fisreact.result) {
          if (res.element === "neutrons") {
            for (let i = 0; i < res.amount; i++) {
              particles.push(new particle(this.X + 200, this.Y + 200, newran(100) - 50, newran(100) - 50, 0, "n"));
            }
          } else {
            let extrname = res.element.slice(0, res.element.indexOf("-"));
            let extrnumber = res.element.slice(res.element.indexOf("-") + 1);
            console.log(extrname);
            let neutnum = parseInt(extrnumber) - (data.indexOf(findAtom(extrname)) + 1);
            let datause = data[this.atomn - 1];
            for (let i = 0; i < res.amount; i++) {
              atoms[nextAtomID] = new atom(extrname, this.X + postemp, this.Y, datause.shells, true, postemp / 2, newran(100) - 50, neutnum, 0);
            }
            postemp = 170;
          }
        }
        //atoms.splice(atoms.indexOf(this), 1);
        for (let b of this.bonds) {
          for (let a of atoms[b].bonds) {
            if (a === this.ID) {
              atoms[b].bonds.splice(atoms[b].bonds.indexOf(this.ID), 1);
            }
          }
        }
        for (let b of this.cobonds) {
          for (let a of atoms[b].cobonds) {
            if (a === this.ID) {
              atoms[b].cobonds.splice(atoms[b].cobonds.indexOf(this.ID), 1);
              atoms[b].cshared.splice(atoms[b].cobonds.indexOf(this.ID), 1);
            }
          }
        }
        for (let b of this.mbonds) {
          for (let a of atoms[b].mbonds) {
            if (a === this.ID) {
              atoms[b].mbonds.splice(atoms[b].mbonds.indexOf(this.ID), 1);
            }
          }
        }
        delete atoms[this.ID];
        break;
      }
    }

    if (counter % 20 && permissions.Raddecay) {
      if (this.hasOwnProperty("nextLifeCheck")) {
        if (Date.now() > this.nextLifeCheck && newran(2) === 1) {
          if (this.decaytype === "alpha") {
            let newelem = this.atomn - 2;
            this.elem = data[newelem - 1].symbol;
            this.atomn -= 2;
            this.elec = data[newelem - 1].shells;
            this.elecneg = data[newelem - 1].electronegativity;
            this.section = data[newelem - 1].section;
            this.neutrons -= 2;
            atoms[nextAtomID] = new atom("He", this.X + 120, this.Y, [0], true, 0, 0, 2, 2);
          } else if (this.decaytype === "beta-") {
            let newelem = this.atomn + 1;
            this.neutrons -= 1;
            this.atomn += 1;
            this.elem = data[newelem - 1].symbol;
            this.elec = data[newelem - 1].shells;
            particles.push(new particle(this.X, this.Y, newran(100) - 50, newran(100) - 50, -1, "e-"));
            //this.charge = 1;
            this.elecneg = data[newelem - 1].electronegativity;
            this.section = data[newelem - 1].section;
          } else if (this.decaytype === "beta+") {
            let newelem = this.atomn - 1;
            this.neutrons += 1;
            this.atomn += 1;
            this.elem = data[newelem - 1].symbol;
            this.elec = data[newelem - 1].shells;
            particles.push(new particle(this.X, this.Y, newran(100) - 50, newran(100) - 50, 1, "e+"));
            //this.charge = -1;
            this.elecneg = data[newelem - 1].electronegativity;
            this.section = data[newelem - 1].section;
          }
          delete this.nextLifeCheck;
          this.updateRadioTimer();
        } else if (Date.now() > this.nextLifeCheck) {
          delete this.nextLifeCheck;
          this.updateRadioTimer();
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

// for (let oshan = 0; oshan < 30; oshan++) {
//   atoms[nextAtomID] = new atom("Na", newran(window.innerWidth * 2), newran(1500), [2, 8, 1]);
//   atoms[nextAtomID] = new atom("Cl", newran(window.innerWidth * 2), newran(1500), [2, 8, 7]);
// }

console.log(atoms);

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
    particles.push(new particle(100, 1400, 10, -40, -1, "e-"));
  }
  if (cval === "p") {
    particles.push(new particle(100, 1400, 10, -40, 1, "p"));
  }
  if (cval === "n") {
    particles.push(new particle(100, 1400, 10, -40, 0, "n"));
  }
  let check = cval;
  if (check.includes("-")) {
    check = check.slice(0, check.indexOf("-"));
  }
  for (let t of data) {
    if (t.symbol === check) {
      if (cval.includes("-")) {
        let newneut = parseInt(cval.slice(cval.indexOf("-") + 1)) - (data.indexOf(t) + 1);
        atoms[nextAtomID.toString()] = new atom(t.symbol, 100, 1400, t.shells.slice(), true, 10, -40, newneut, 0);

        return;
      }
      atoms[nextAtomID.toString()] = new atom(t.symbol, 100, 1400, t.shells.slice(), true, 10, -40, t.neut, 0);
      console.log(nextAtomID);
      return;
    }
  }
}

function clearall() {
  atoms = [];
  particles = [];
}

function settings() {
  let setbox = document.querySelector(".sett");
  let imgbox = document.querySelector(".setb");

  if (document.querySelector(".setb").classList.contains("imgclicked")) {
    imgbox.classList.remove("imgclicked");
    setbox.style.visibility = "hidden";
    paused = false;
    setbox.style.opacity = 0;
  } else {
    imgbox.classList.add("imgclicked");
    paused = true;
    setbox.style.visibility = "visible";
    setbox.style.opacity = 0.95;
  }
}
document.querySelector(".btn").onclick = handle;
document.querySelector(".btn2").onclick = clearall;
document.querySelector(".setb").onclick = settings;

render();

//setInterval(render, 1);
setInterval(iterate, 1);
