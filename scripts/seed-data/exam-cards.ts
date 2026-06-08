export interface ExamCard {
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic?: string;
}

export const EXAM_MODE_CARDS: ExamCard[] = [
  // Thyristor Fundamentals
  {
    topic: 'Thyristor Fundamentals',
    question: 'Explain the two-transistor model of an SCR. Derive the equation for anode current.',
    answer: `The SCR can be modeled as two interconnected transistors (T₁: PNP, T₂: NPN) forming positive feedback loop.

**Two-Transistor Model Circuit:**
- Collector of T₁ → Base of T₂
- Collector of T₂ → Base of T₁
- Creates regenerative feedback structure

**Current relationships:**
For T₁: $$I_{C1} = \\alpha_1 I_{A}$$
For T₂: $$I_{C2} = \\alpha_2 I_g + \\alpha_2 I_{C1}$$

**Anode current equation:**
$$I_A = I_g + I_{C1} + I_{C2}$$

**Solving the coupled equations:**
$$I_A = \\frac{I_g(1 + \\alpha_2)}{1 - (\\alpha_1 + \\alpha_2)}$$

**Key insight:** When $$(\\alpha_1 + \\alpha_2) \\rightarrow 1$$, the denominator approaches zero and $$I_A$$ increases dramatically. This regenerative feedback causes SCR to latch on.`,
    difficulty: 'hard'
  },

  // SCR Characteristics
  {
    topic: 'SCR Characteristics',
    question: 'What are latching current and holding current? How do they differ?',
    answer: `**Latching Current ($$I_L$$):**
- Minimum anode current needed after gate triggering to maintain SCR conduction
- Once exceeded, SCR remains on even if gate signal is removed
- Typical value: 200-500 mA for medium power SCRs
- Gate current can be reduced to zero after latching

**Holding Current ($$I_H$$):**
- Minimum anode current needed to maintain conduction without gate signal
- Must be maintained continuously to keep SCR ON
- Typically lower than latching current: $$I_H \\approx 0.1-0.5 \\times I_L$$
- If anode current drops below $$I_H$$, SCR reverts to blocking state

**Relationship:**
$$I_L > I_H$$

**Practical implications:**
- Load must provide sufficient current path
- Load resistance determines minimum current
- $$I_H = \\frac{V_{min}}{R_L}$$ where $$V_{min}$$ is minimum forward voltage

**Example:** 
For SCR with $$I_H = 50mA$$ and load resistance 100Ω:
$$V_{min} = 50mA \\times 100\\Omega = 5V$$ minimum supply voltage needed`,
    difficulty: 'hard'
  },

  // Gate Triggering Methods
  {
    topic: 'Gate Drive & Triggering',
    question: 'Describe the three main gate triggering signal types for SCRs.',
    answer: `**1. DC Gate Triggering:**
- Direct DC voltage applied between gate and cathode
- Gate terminal positive with respect to cathode
- Simple but drawback: no isolation between power and control circuits
- Continuous DC signal required → high gate power loss
- Limited to maximum ±20V on gate

**2. AC Gate Triggering - Two methods:**

**a) Resistance Triggering (R-triggering):**
- Variable resistor controls gate current magnitude
- Gate current in phase with AC supply
- Gate pulse duration corresponds to partial AC half-cycle
- Maximum firing angle achievable: 90°
- Gate current: $$I_g = \\frac{V_{gate} - V_D}{R}$$

**b) RC Triggering:**
- Capacitor charges through variable resistor
- Firing angle delay controlled by RC time constant
- Allows firing angle > 90° (up to ~160°)
- Better control over conduction period
- Charge time: $$t_{charge} = 0.693RC$$

**3. Pulse Gate Triggering:**
- High-frequency pulse train applied to gate
- Usually via pulse transformer for isolation
- Advantages:
  - No continuous gate current (reduced losses)
  - Transformer provides 2000V+ isolation
  - Better for inductive circuits with back-EMF
  - Pulse transformer coupling = 1:5 typical ratio

**Comparison Table:**

| Method | Isolation | Power Loss | Firing Range | Cost |
|--------|-----------|------------|--------------|------|
| DC | None | High | 0° | Low |
| R-trigger | Transformer | Medium | 0-90° | Medium |
| RC-trigger | Transformer | Medium | 0-160° | Medium |
| Pulse | Transformer | Low | 0-180° | High |`,
    difficulty: 'hard'
  },

  // Commutation Methods
  {
    topic: 'Commutation Techniques',
    question: 'Explain Class A and Class B forced commutation with circuit operation.',
    answer: `**Class A Commutation (Self/Load Commutation):**

**Circuit Configuration:**
L and C connected with load R (series resonant circuit)

**Operation Sequence:**
1. SCR triggers → current flows through load
2. Capacitor charges to supply voltage E
3. When capacitor fully charged ($$V_C > E$$), reverse voltage appears across SCR
4. SCR forced to OFF state (commutated)
5. Capacitor discharges through load resistance
6. Circuit prepared for next cycle

**Commutation time:**
$$t_{off} = \\pi\\sqrt{LC}$$

**Advantages:**
- Simple circuit topology
- Reliable operation
- Good for frequencies > 1000 Hz
- No auxiliary SCR needed

**Limitations:**
- Load must be RLC type (underdamped)
- Voltage overshoot possible
- Requires large L and C values

---

**Class B Commutation (Capacitive Commutation):**

**Circuit Configuration:**
L and C connected ACROSS SCR (not with load)
L and C do not carry load current

**Operation Sequence:**
1. Initially: capacitor charged to +E
2. SCR triggers → current flows through load path: E+ → SCR → R → E-
3. Simultaneously: commutation current through L and C: C+ → L → T → C-
4. Capacitor discharges through inductor (creates resonant oscillation)
5. When capacitor reverses voltage (C charges backward), SCR is reverse biased
6. Commutation current $$I_c$$ opposes load current $$I_L$$
7. When $$I_c > I_L$$, SCR turns OFF

**Key equations:**
Capacitor voltage: $$V_C(t) = E\\cos(\\omega t)$$ where $$\\omega = \\frac{1}{\\sqrt{LC}}$$

Commutation current: $$I_c = \\frac{E}{Z_L}\\sin(\\omega t)$$ where $$Z_L = \\sqrt{L/C}$$

**Advantages:**
- Self-triggering capability
- Automatic ON/OFF cycling
- Used in chopper circuits
- Better control of conduction period

**Comparison - Class A vs Class B:**

| Feature | Class A | Class B |
|---------|---------|---------|
| L,C placement | Series with load | Across SCR |
| Load requirement | Must be RLC | Independent |
| Switching frequency | Fixed | Variable |
| Application | DC choppers | Choppers, inverters |
| Complexity | Simple | Moderate |`,
    difficulty: 'hard'
  },

  // Protection Circuits
  {
    topic: 'Protection Circuits',
    question: 'Design a complete snubber circuit for SCR dv/dt protection. Include calculations.',
    answer: `**Snubber Circuit Design (RC Network):**

**Purpose:** Limit dv/dt (voltage rise rate) to prevent unintended gate triggering

**Given Specifications:**
- Supply voltage: V_m = 565.7V (400V RMS)
- Device dv/dt rating: 200 V/μs
- Safety factor: SF = 2.5
- Maximum safe dv/dt: (dv/dt)_allowed = 200/2.5 = 80 V/μs

**Step 1: Calculate Snubber Capacitor**

The junction acts as capacitor. Gate threshold current ≈ 10mA

Using: $$i_c = C\\frac{dV}{dt}$$

$$C_s = \\frac{i_c}{(dv/dt)_{allowed}} = \\frac{0.01}{80 \\times 10^6} = 0.125\\,\\mu F$$

**Choose standard value: C_s = 0.22 μF (with margin)**

**Step 2: Calculate Snubber Resistor**

Peak discharge current limit: 30% of device current
For 150A rated device: $$I_{max} = 45A$$

$$R_s = \\frac{V_{peak}}{I_{max}} = \\frac{850}{45} = 18.9\\,\\Omega$$

**Choose: R_s = 18Ω, 50W rated**

**Step 3: Verify Peak Current**

$$I_{peak} = \\frac{850}{18} = 47.2A$$ ✓ (Within limit)

**Step 4: Series Inductor for di/dt**

Safe di/dt = 150 A/μs

$$L = \\frac{V_s - V_f}{(di/dt)_{allowed}} = \\frac{850}{150 \\times 10^6} = 5.67\\,\\mu H$$

**Choose: L = 5μH**

**Complete Snubber Network:**
```
        +----C_s----+
        |  (0.22μF) |
    SCR |           |----R_s (18Ω)----+
    Gate|                              |
        +-----+-------+-----Series L---+
                      |    (5μH)
                   Cathode
```

**Design verification:**
- Dv/dt immunity: 80 V/μs (2.5× safety margin)
- Di/dt immunity: 150 A/μs
- Thermal dissipation: <5W total`,
    difficulty: 'hard'
  },

  // Number Bases
  {
    topic: 'Number Bases',
    question: 'Convert decimal 255 to binary, octal, and hexadecimal. Show all steps.',
    answer: `**Decimal 255 Conversion to Other Bases:**

---

**Method 1: Decimal to Binary (Repeated Division by 2)**

$$\\begin{align}
255 \\div 2 &= 127\\text{ R}1 \\quad (LSB)\\\\
127 \\div 2 &= 63\\text{ R}1\\\\
63 \\div 2 &= 31\\text{ R}1\\\\
31 \\div 2 &= 15\\text{ R}1\\\\
15 \\div 2 &= 7\\text{ R}1\\\\
7 \\div 2 &= 3\\text{ R}1\\\\
3 \\div 2 &= 1\\text{ R}1\\\\
1 \\div 2 &= 0\\text{ R}1 \\quad (MSB)
\\end{align}$$

**Reading MSB to LSB:** $$255_{10} = 11111111_2$$

**Verification:** 
$$128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255$$ ✓

---

**Method 2: Decimal to Hexadecimal (Repeated Division by 16)**

$$\\begin{align}
255 \\div 16 &= 15\\text{ R}15\\\\
15 \\div 16 &= 0\\text{ R}15
\\end{align}$$

**Convert to hex digits:** 15 = F

**Result:** $$255_{10} = FF_{16}$$

**Verification:** $$15 \\times 16 + 15 = 240 + 15 = 255$$ ✓

---

**Method 3: Decimal to Octal (Repeated Division by 8)**

$$\\begin{align}
255 \\div 8 &= 31\\text{ R}7\\\\
31 \\div 8 &= 3\\text{ R}7\\\\
3 \\div 8 &= 0\\text{ R}3
\\end{align}$$

**Reading bottom to top:** $$255_{10} = 377_8$$

**Verification:** $$3 \\times 64 + 7 \\times 8 + 7 = 192 + 56 + 7 = 255$$ ✓

---

**Summary Table:**

| Base | Value | Format |
|------|-------|--------|
| Decimal | 255 | Base 10 |
| Binary | 11111111 | Base 2 (8-bit) |
| Octal | 377 | Base 8 |
| Hexadecimal | FF | Base 16 |

**Direct Conversion Methods:**

**Binary → Hex:** Group by 4 bits
$$1111\\,1111_2 = FF_{16}$$

**Binary → Octal:** Group by 3 bits
$$011\\,111\\,111_2 = 377_8$$`,
    difficulty: 'medium'
  },

  // Opto-Electronic Devices
  {
    topic: 'Opto-Electronic Devices',
    question: 'Explain LED operation, construction, and light-emitting mechanism.',
    answer: `**Light Emitting Diode (LED) Operation:**

**Basic Structure:**
- p-n junction semiconductor device
- Forward-biased junction emits light (photons)
- Typically made from III-V semiconductors (GaAs, GaP, InGaN)

**Light Emission Mechanism:**

When forward-biased:
1. Electrons injected from n-layer into p-layer (minority carriers)
2. Holes injected from p-layer into n-layer
3. Carriers recombine near junction
4. Recombination energy released as photons (light)

**Energy-wavelength relationship:**
$$E = h\\nu = \\frac{hc}{\\lambda}$$

Where:
- h = Planck's constant (6.63 × 10⁻³⁴ J·s)
- ν = frequency
- c = speed of light (3 × 10⁸ m/s)
- λ = wavelength

**Typical I-V Characteristics:**
- Forward voltage: 1.5V to 3V (depending on material)
- Threshold voltage (V_th): ~0.7V for red LED
- Maximum forward current: 10-20 mA typical
- Reverse leakage: <1 μA

**LED Color and Wavelength:**
- Red: 620-700 nm (V_f ≈ 1.6-2.0V)
- Yellow: 590-620 nm (V_f ≈ 1.9-2.1V)
- Green: 500-570 nm (V_f ≈ 1.9-2.2V)
- Blue: 450-500 nm (V_f ≈ 3.0-3.5V)
- UV: <400 nm (V_f ≈ 3.5-4.5V)

**Internal Quantum Efficiency:**
$$\\eta_{int} = \\frac{\\text{photons emitted}}{\\text{carriers injected}}$$

Typically: 70-90% for modern LEDs

**Current limiting circuit:**
$$R = \\frac{V_{supply} - V_f}{I_{LED}}$$

Example: 5V supply, 2V LED, 10mA target
$$R = \\frac{5 - 2}{0.01} = 300\\,\\Omega$$`,
    difficulty: 'medium'
  },

  // Photodiodes
  {
    topic: 'Opto-Electronic Devices',
    question: 'How does a photodiode work? Compare with phototransistor characteristics.',
    answer: `**Photodiode Operation:**

**Basic Principle:**
- Reverse-biased p-n junction
- Photons create electron-hole pairs in depletion region
- Minority carriers (photogenerated) cause reverse current

**Photocurrent generation:**
$$I_{ph} = q\\Phi\\eta$$

Where:
- q = electron charge (1.6 × 10⁻¹⁹ C)
- Φ = incident photon flux
- η = quantum efficiency (0.5-0.9)

**Responsivity (sensitivity):**
$$R = \\frac{I_{ph}}{P_{incident}} = \\frac{\\eta \\lambda q}{hc}$$

Typical: 0.3-0.6 A/W in visible range

**Characteristics:**
- Very fast response (ns range)
- Low noise
- High sensitivity
- Requires reverse bias voltage

---

**Phototransistor Comparison:**

**Phototransistor Structure:**
- BJT with light-sensitive base junction
- No external base connection
- Incident light controls base current

**Phototransistor operation:**
$$I_C = \\beta I_{ph}$$

Where β = current gain (100-1000)

**Key Differences:**

| Parameter | Photodiode | Phototransistor |
|-----------|-----------|-----------------|
| Gain | 1 | 100-1000 (β) |
| Speed | Very fast | Slower |
| Sensitivity | Lower | Higher |
| Noise | Lower | Higher |
| Dynamic range | Wider | Narrower |
| Bandwidth | GHz | MHz |
| Cost | Low | Medium |

**Application Selection:**
- **Photodiode:** High-speed, low-noise (fiber optics, cameras)
- **Phototransistor:** High sensitivity, simple circuits (light detection, proximity)

**Typical photodiode dark current:** <1 nA
**Typical phototransistor dark current:** <1 μA`,
    difficulty: 'hard'
  },

  // Rectifier Circuits
  {
    topic: 'Rectifier Circuits',
    question: 'For single-phase half-wave SCR rectifier, derive average output voltage equation as function of firing angle.',
    answer: `**Single-Phase Half-Wave SCR Rectifier:**

**Circuit Configuration:**
- AC supply: $$V_s = V_m\\sin(\\omega t)$$
- SCR fires at angle α (firing delay)
- Load: R_L

**Output Voltage Derivation:**

The SCR conducts only when $$\\omega t$$ is between α and π (forward biased).

Average (DC) output voltage:
$$V_{dc} = \\frac{1}{\\pi} \\int_{\\alpha}^{\\pi} V_m\\sin(\\omega t)\\,d(\\omega t)$$

**Evaluating integral:**
$$V_{dc} = \\frac{V_m}{\\pi}[-\\cos(\\omega t)]_{\\alpha}^{\\pi}$$

$$V_{dc} = \\frac{V_m}{\\pi}[-\\cos\\pi + \\cos\\alpha]$$

$$V_{dc} = \\frac{V_m}{\\pi}[1 + \\cos\\alpha]$$

**Final equation:**
$$\\boxed{V_{dc} = \\frac{V_m}{\\pi}(1 + \\cos\\alpha)}$$

---

**For 400V RMS supply:**
$$V_m = \\sqrt{2} \\times 400 = 565.7V$$

$$V_{dc} = \\frac{565.7}{\\pi}(1 + \\cos\\alpha) = 180.1(1 + \\cos\\alpha)\\,V$$

**Voltage vs Firing Angle Table:**

| α (°) | α (rad) | cos α | V_dc (V) |
|-------|---------|-------|----------|
| 0° | 0 | 1.000 | 360.2 |
| 30° | 0.524 | 0.866 | 311.5 |
| 45° | 0.785 | 0.707 | 276.7 |
| 60° | 1.047 | 0.500 | 220.2 |
| 90° | 1.571 | 0 | 90.1 |
| 120° | 2.094 | -0.500 | 0 |

**Key observations:**
1. V_dc decreases with increasing firing angle
2. Minimum V_dc occurs at α = 90°
3. For α > 90°, output becomes zero (rectifier blocks)
4. Output is unidirectional (always ≥ 0)

**Ripple voltage:**
$$V_{ripple(peak)} = V_m - V_{dc}$$

At α = 0°:
$$V_{ripple} = 565.7 - 360.2 = 205.5V$$`,
    difficulty: 'hard'
  }
];

export default EXAM_MODE_CARDS;
