const isotopes = {
  U: [
    {
      decay: "alpha",
      neutrons: 146, // U-238
      halfLife: 4468000000,
    },
    {
      decay: "alpha",
      neutrons: 143, // U-235
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
    {
      decay: "alpha",
      neutrons: 142, // U-234
      halfLife: 246000,
    },
  ],
  Th: [
    {
      decay: "beta-",
      neutrons: 144, // Th-234
      halfLife: 0.0218,
    },
    {
      decay: "alpha",
      neutrons: 142, // Th-232
      halfLife: 14050000000,
    },
    {
      decay: "alpha",
      neutrons: 140, // Th-230
      halfLife: 75380,
    },
  ],
  Pa: {
    decay: "beta-",
    neutrons: 143, // Pa-234
    halfLife: 0.000273,
  },
  Ra: [
    {
      decay: "alpha",
      neutrons: 138, // Ra-226
      halfLife: 1600,
    },
    {
      decay: "alpha",
      neutrons: 138,
      halfLife: 1600,
    },
  ],
  Rn: {
    decay: "alpha",
    neutrons: 136, // Rn-222
    halfLife: 0.0104,
  },
  Po: [
    {
      decay: "alpha",
      neutrons: 134, // Po-218
      halfLife: 0.0031,
    },
    {
      decay: "alpha",
      neutrons: 134,
      halfLife: 1.63,
    },
    {
      decay: "alpha",
      neutrons: 126, // Po-210
      halfLife: 0.378,
    },
    {
      decay: "alpha",
      neutrons: 130, // Po-214
      halfLife: 0.000000000164,
    },
  ],
  Pb: [
    {
      decay: "beta-",
      neutrons: 132, // Pb-214
      halfLife: 0.000027,
    },
    {
      decay: "beta-",
      neutrons: 128, // Pb-210
      halfLife: 22.3,
    },
    {
      decay: "stable",
      neutrons: 124, // Pb-206
      halfLife: Infinity,
    },
  ],
  Bi: [
    {
      decay: "beta-",
      neutrons: 131, // Bi-214
      halfLife: 0.000076,
    },
    {
      decay: "beta-",
      neutrons: 127, // Bi-210
      halfLife: 0.005,
    },
    {
      decay: "alpha",
      neutrons: 121,
      halfLife: 5917,
    },
  ],
  C: { decay: "beta-", neutrons: 8, halfLife: 5730 },
  I: { decay: "beta-", neutrons: 78, halfLife: 0.0219 },
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
  Ac: { decay: "alpha", neutrons: 139, halfLife: 0.00027 },
  Ni: { decay: "beta-", neutrons: 30, halfLife: 0.0167 },
  Li: { decay: "beta+", neutrons: 3, halfLife: 1200000 },
  P: { decay: "beta-", neutrons: 15, halfLife: 0.039 },
  Sb: { decay: "beta-", neutrons: 66, halfLife: 0.0378 },
  Fe: { decay: "beta-", neutrons: 31, halfLife: 1.6 },
  Sm: { decay: "alpha", neutrons: 148, halfLife: 1060000000 },
};
