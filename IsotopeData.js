const isotopes = {
  U: [
    {
      decay: "alpha",
      neutrons: 146,
      halfLife: 4468000000,
    },
    {
      decay: "alpha",
      neutrons: 143,
      halfLife: 100000000,
      neutronReaction: {
        type: "fissile",
        result: [
          { element: "Ba-141", amount: 1 },
          { element: "Kr-92", amount: 1 },
          { element: "neutrons", amount: 2 },
        ],
      },
    },
  ],
  Th: {
    decay: "alpha",
    neutrons: 142,
    halfLife: 14050000000,
  },
  C: { decay: "beta-", neutrons: 8, halfLife: 5730 },
  I: { decay: "beta-", neutrons: 78, halfLife: 0.0219 },
  Ra: [
    { decay: "alpha", neutrons: 138, halfLife: 1600 },
    { decay: "alpha", neutrons: 138, halfLife: 1600 },
  ],
  Pu: [
    {
      decay: "alpha",
      neutrons: 146,
      halfLife: 87.74,
    },
    {
      decay: "alpha",
      neutrons: 144,
      halfLife: 18110,
    },
    {
      decay: "alpha",
      neutrons: 145,
      halfLife: 1400,
      neutronReaction: {
        type: "fissile",
        result: [
          { element: "Ba-141", amount: 1 },
          { element: "Kr-92", amount: 1 },
          { element: "neutrons", amount: 2 },
        ],
      },
    },
    {
      decay: "beta-",
      neutrons: 147,
      halfLife: 14.3,
      neutronReaction: {
        type: "fissile",
        result: [
          { element: "Zr-100", amount: 1 },
          { element: "Te-134", amount: 1 },
          { element: "neutrons", amount: 3 },
        ],
      },
    },
  ],
  Co: { decay: "beta-", neutrons: 35, halfLife: 0.211 },
  K: { decay: "beta-", neutrons: 40, halfLife: 1248000000 },
  Ba: { decay: "beta-", neutrons: 53, halfLife: 13.8 },
  Sr: { decay: "beta-", neutrons: 38, halfLife: 28.8 },
  Y: { decay: "beta-", neutrons: 46, halfLife: 0.0073 },
  Cs: { decay: "beta-", neutrons: 78, halfLife: 30.17 },
  Rn: { decay: "alpha", neutrons: 137, halfLife: 0.0104 },
  Po: { decay: "alpha", neutrons: 134, halfLife: 1.63 },
  Ac: { decay: "alpha", neutrons: 139, halfLife: 0.00027 },
  Ni: { decay: "beta-", neutrons: 30, halfLife: 0.0167 },
  Li: { decay: "beta+", neutrons: 3, halfLife: 1200000 },
  P: { decay: "beta-", neutrons: 15, halfLife: 0.039 },
  Sb: { decay: "beta-", neutrons: 66, halfLife: 0.0378 },
  Fe: { decay: "beta-", neutrons: 31, halfLife: 1.6 },
  Bi: { decay: "alpha", neutrons: 121, halfLife: 5917 },
  Sm: { decay: "alpha", neutrons: 148, halfLife: 1060000000 },
};
