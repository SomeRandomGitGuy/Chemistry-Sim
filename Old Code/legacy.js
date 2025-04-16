// Legacy code 🕸️🕷️
// This contains old code that has since been cleaned and refined
//
//
//
/*
for (let o of atoms) {
  let possibleionics = [];
  let ov = o.elec[o.elec.length - 1];
  for (let p of atoms) {
    if (p != o) {
      if (dist(o.X, o.Y, p.X, p.Y) < 190 && o.bonds.includes(p) === false && p.bonds.includes(p) === false) {
        let pv = p.elec[p.elec.length - 1];
        if (ov + pv === 8 || (o.charge * -1 === p.charge && o.charge != 0 && p.charge != 0)) {
          if (o.charge * -1 === p.charge && o.charge != 0 && p.charge != 0 && (o.bonds.length === 0 || p.bonds.length > 0)) {
            o.bonds.push(p);
            p.bonds.push(o);
          }
          if (ov > pv && ov + pv === 8 && o.elec.length > 1) {
            o.elec[o.elec.length - 1] = 8;
            o.charge -= pv;
            p.charge += pv;
            p.elec.pop();
          } else if (ov + pv === 8 && p.elec.length > 1) {
            o.elec.pop();
            p.elec[p.elec.length - 1] = 8;
            p.charge -= ov;
            o.charge += ov;
          } else {
          }
        } else if (o.bonds.length === 0 && p.bonds.length === 0 && ov < pv && ov != pv && o.charge === 0 && p.charge === 0) {
          if ((8 - pv) * ov === ov) {
            // check if this atom could be bonded with multiple of the touching atom
            possibleionics.push(p);
          }
        }
      }
    }
  }
  let amounts = {};
  for (let t of possibleionics) {
    if (amounts.hasOwnProperty(t.elem)) {
      amounts[t.elem] += 1;
    } else {
      amounts[t.elem] = 1;
    }
  }
  console.log(o.elem);
  console.log(amounts);
  let choosed = null;
  for (let posbl of possibleionics) {
    if (choosed != null && posbl.elem === choosed.elem) {
      o.bonds.push(posbl);
      posbl.bonds.push(o);
      posbl.elec[posbl.elec.length - 1] = 8;
      posbl.charge = -1;
    }
    if (amounts[posbl.elem] >= (8 - posbl.elec[posbl.elec.length - 1]) * ov && o.charge === 0 && posbl.charge === 0) {
      let needed = (8 - posbl.elec[posbl.elec.length - 1]) * ov;
      choosed = posbl;
      o.elec.pop();
      o.charge = ov;

      o.bonds.push(posbl);
      posbl.bonds.push(o);
      posbl.elec[posbl.elec.length - 1] = 8;
      posbl.charge = -1;
    }
  }
  */
