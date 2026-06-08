/**
 * MASSIVE EXAM CARDS DATABASE - POWER ELECTRONICS
 * Comprehensive set of flashcards covering all HEXCO National Diploma topics
 * Extracted from official exam papers and technical documentation
 */

export const MASSIVE_CARDS = [
  {
    topic: 'Thyristor Fundamentals',
    question: 'Define a thyristor and list its four terminals.',
    answer: `A thyristor is a four-layer (p-n-p-n) semiconductor device that acts as an electronically controlled switch or rectifier.

**Four terminals:**
1. **Anode (A):** Positive terminal, high voltage connection
2. **Cathode (K):** Negative terminal, ground reference
3. **Gate (G):** Control terminal, triggers the device
4. **Substrate (optional):** Some devices have fifth terminal for bias

**Four-layer structure:**
P-layer → N-layer → P-layer → N-layer

**Three junctions:**
- J₁ (P₁-N₁): Forward biased when conducting
- J₂ (N₁-P₂): Reverse biased (critical junction)
- J₃ (P₂-N₂): Forward biased when conducting

**Operating principle:** Acts as latch once gate triggers both J₁ and J₃ into forward conduction.`,
    difficulty: 'easy'
  },

  {
    topic: 'Thyristor Fundamentals',
    question: 'What is the holding current and why is it important?',
    answer: `**Holding Current ($$I_H$$):**

Minimum anode current required to maintain SCR conduction after gate signal is removed.

**Mathematical definition:**
$$I_H = \\frac{I_L}{1 + \\beta}$$

where:
- $$I_L$$ = Latching current
- β = Transistor current gain

**Typical values:**
- Medium-power SCR: 50-200 mA
- High-power SCR: 500-2000 mA
- Varies with gate drive current applied

**Importance:**

1. **Circuit design:** Load must provide sufficient current path
   $$I_{avg} > I_H$$ for continuous conduction

2. **Turn-off requirement:** Anode current must drop below $$I_H$$ to turn OFF device

3. **Load resistance limit:**
   $$R_{load} < \\frac{V_{supply}}{I_H}$$

4. **Example:** For $$I_H = 100 mA$$ and 400V supply:
   $$R_{load} < \\frac{400}{0.1} = 4000\\,\\Omega = 4\\,k\\Omega$$

5. **Commutation design:** Commutation circuit must reduce current below $$I_H$$ within specified time

**Design implications:**
- Higher $$I_H$$ requires stronger load
- Lower $$I_H$$ easier to control but may have stability issues
- Temperature dependent: increases with temperature`,
    difficulty: 'hard'
  },

  {
    topic: 'Gate Drive & Triggering',
    question: 'Design a UJT relaxation oscillator for 50 Hz SCR gate triggering with variable firing angle control.',
    answer: `**UJT Relaxation Oscillator Design:**

**Component Selection:**

**UJT specifications:**
- Type: 2N2646 or equivalent
- Peak voltage: $$V_P = \\eta V_{BB} + V_D$$
  - Intrinsic standoff ratio: η = 0.65 (typical)
  - Diode drop: $$V_D = 0.7V$$
  
  $$V_P = 0.65 \\times 24 + 0.7 = 16.3V$$

- Valley voltage: $$V_V = V_P - 2 = 14.3V$$ (typical)

**Timing circuit for 50 Hz:**

Period = 20 ms
Half-period = 10 ms
Charging time target = 5 ms (for mid-range firing angle)

$$t_{charge} = 0.693 R_E C_E = 5\\,ms$$

$$R_E C_E = 7.21\\,ms$$

**Choose:**
- $$C_E = 10\\,\\mu F$$
- $$R_E = 720\\,\\Omega$$

**Verify:** $$0.693 \\times 720 \\times 10 \\times 10^{-6} = 4.97\\,ms$$ ✓

**Base resistors:**
- $$R_{B1} = 50\\,\\Omega$$ (to ground)
- $$R_{B2} = 220\\,\\Omega$$ (to supply)

**Output pulse:**
Width = $$0.693(R_E + R_{B1})C_E = 0.693 \\times 770 \\times 10 \\times 10^{-6} = 5.34\\,\\mu s$$

**For variable firing angle (0° to 90°):**

Use potentiometer:
$$R_E = 500\\,\\Omega \\text{ to } 2\\,k\\,\\Omega$$

Charge times:
- Minimum (500Ω): 3.46 ms → early firing (0°)
- Maximum (2kΩ): 13.86 ms → late firing (90°)

**Circuit configuration:**
```
    +24V (VBB)
     |
    R_B2 (220Ω)
     |
    B2 ---+
    |     |
   UJT    |
   E-B1   |---- Output to Pulse Transformer
    |     |
    +----+
     |
    R_E (variable 500-2kΩ)
     |
    C_E (10μF)
     |
   GND
```

**Output specifications:**
- Voltage: 24V pulses
- Current: 100-200 mA
- Width: 5 μs
- Frequency: 50 Hz
- Pulse transformer: 1:5 isolation ratio

**Design verification:**
- Oscillation frequency: 50 Hz ✓
- Pulse width: 5.34 μs (adequate for gate drive)
- Output current: 150 mA (suitable for transformer primary)
- Isolation: Via pulse transformer (2000V+)`,
    difficulty: 'hard'
  },

  {
    topic: 'Protection Circuits',
    question: 'Design a complete RC snubber circuit specification for 500V 100A SCR switching inductive load.',
    answer: `**Complete RC Snubber Design:**

**Load specifications:**
- Voltage: 500V DC
- Current: 100A
- Load type: Inductive (L/R = 20 ms time constant)

**Step 1: Peak voltage analysis**

Supply peak: $$V_m = \\sqrt{2} \\times 500 = 707V$$

With overshoot (1.5× factor for inductive load):
$$V_{peak} = 1.5 \\times 707 = 1060.5V$$ (peak transient voltage)

**Step 2: Device dv/dt rating**

Assume SCR rated: dv/dt = 300 V/μs
Safety factor: SF = 2.5

$$dv/dt_{allowed} = \\frac{300}{2.5} = 120\\,V/\\mu s$$

**Step 3: Snubber capacitor**

Safe gate trigger current: $$I_g = 10\\,mA$$

$$C_s = \\frac{I_g}{dv/dt_{allowed}} = \\frac{0.01}{120 \\times 10^6} = 83.3\\,nF$$

Choose standard value: $$C_s = 0.1\\,\\mu F$$ (with margin)

**Step 4: Snubber resistor**

Peak discharge current limit: 40% of rated current
$$I_{max} = 0.4 \\times 100 = 40A$$

$$R_s = \\frac{V_{peak}}{I_{max}} = \\frac{1060.5}{40} = 26.5\\,\\Omega$$

Choose: $$R_s = 27\\,\\Omega, 100W$$ rated

**Step 5: Series inductor (di/dt protection)**

SCR di/dt rating: 300 A/μs (typical)
Safety factor: 2

$$di/dt_{allowed} = 150\\,A/\\mu s$$

$$L = \\frac{V_{peak}}{di/dt_{allowed}} = \\frac{1060.5}{150 \\times 10^6} = 7.07\\,\\mu H$$

Choose: $$L = 10\\,\\mu H$$

**Step 6: Gate circuit protection**

- Gate resistor: $$R_g = 47\\,\\Omega$$
- Gate capacitor: $$C_g = 10\\,nF$$ (across gate-cathode)
- Blocking diode: 1N4148 (prevent reverse gate current)
- Gate Zener: 10V, 1W (overvoltage protection)
- Gate current max: ±20V (device absolute maximum)

**Step 7: Thermal analysis**

Snubber resistor dissipation:

$$P = \\frac{1}{2}C_s V_{peak}^2 f = \\frac{1}{2} \\times 0.1 \\times 10^{-6} \\times (1060.5)^2 \\times 50$$

$$P = 2.81W$$

Choose 100W resistor provides safety margin.

**Final Snubber Specifications:**

| Component | Value | Rating | Purpose |
|-----------|-------|--------|---------|
| Snubber C | 0.1 μF | 2000V | Dv/dt limiting |
| Snubber R | 27 Ω | 100 W | Energy dissipation |
| Series L | 10 μH | - | Di/dt limiting |
| Gate R | 47 Ω | 1/4 W | Gate current limit |
| Gate C | 10 nF | 50 V | Filtering |
| Gate Zener | 10 V | 1 W | Voltage clamping |
| Blocking diode | 1N4148 | - | Reverse protect |

**Complete circuit connectivity:**
```
Power stage: 500V DC ---+--- L(10μH) --- 100A Load --- GND
                        |
                      SCR
                       |
                    C-R Network
                      |
                    GND
Gate stage: Control --- R(47Ω) --- Gate
                                    |
                          C(10nF)---+---Zener(10V)---Diode
                                    |
                                 Cathode
```

**Design margin verification:**
- Dv/dt immunity: 120 V/μs (2.5× safety margin) ✓
- Di/dt immunity: 150 A/μs (2× safety margin) ✓
- Peak reverse voltage: 1060.5V (within 1200V typical rating) ✓
- Gate voltage: ±10V (within ±20V absolute max) ✓

This comprehensive design ensures robust SCR operation with inductive loads.`,
    difficulty: 'hard'
  },

  {
    topic: 'Rectifier Circuits',
    question: 'Derive power factor equation for single-phase half-wave SCR rectifier.',
    answer: `**Power Factor Derivation - Half-Wave SCR Rectifier:**

**Given:**
- Input: $$v_s = V_m \\sin(\\omega t)$$
- Load: Pure resistance R_L
- Firing angle: α

**Step 1: Average (Real) Power**

$$P_{avg} = V_{dc} \\times I_{dc}$$

Where:
$$V_{dc} = \\frac{V_m}{\\pi}(1 + \\cos\\alpha)$$

$$I_{dc} = \\frac{V_{dc}}{R_L}$$

$$P_{avg} = \\left[\\frac{V_m}{\\pi}(1 + \\cos\\alpha)\\right]^2 \\times \\frac{1}{R_L}$$

**Step 2: RMS Voltage and Current**

$$V_{rms} = V_m\\sqrt{\\frac{1}{2\\pi}\\left(\\pi - \\alpha + \\frac{\\sin 2\\alpha}{2}\\right)}$$

$$I_{rms} = \\frac{V_{rms}}{R_L}$$

**Step 3: Apparent Power**

$$S = V_{rms} \\times I_{rms} = \\frac{V_{rms}^2}{R_L}$$

**Step 4: Power Factor**

$$PF = \\frac{P_{avg}}{S} = \\frac{P_{avg}}{V_{rms} \\times I_{rms}}$$

$$PF = \\frac{\\left[\\frac{V_m}{\\pi}(1 + \\cos\\alpha)\\right]^2}{\\left[V_m\\sqrt{\\frac{1}{2\\pi}\\left(\\pi - \\alpha + \\frac{\\sin 2\\alpha}{2}\\right)}\\right]^2}$$

**Simplifying:**

$$PF = \\frac{\\frac{1}{\\pi^2}(1 + \\cos\\alpha)^2}{\\frac{1}{2\\pi}\\left(\\pi - \\alpha + \\frac{\\sin 2\\alpha}{2}\\right)}$$

$$\\boxed{PF = \\frac{2(1 + \\cos\\alpha)^2}{\\pi(\\pi - \\alpha + \\frac{\\sin 2\\alpha}{2})}}$$

**Numerical Examples (400V RMS supply):**

**At α = 0° (full wave):**
$$PF = \\frac{2(1 + 1)^2}{\\pi(\\pi + 0)} = \\frac{8}{\\pi^2} = 0.811 = 81.1\\%$$

**At α = 45°:**
$$\\sin(90°) = 1$$
$$PF = \\frac{2(1 + 0.707)^2}{\\pi(3.14159 - 0.785 + 0.5)} = \\frac{5.826}{11.09} = 0.525 = 52.5\\%$$

**At α = 90°:**
$$\\sin(180°) = 0$$
$$PF = \\frac{2(1 + 0)^2}{\\pi(3.14159 - 1.571 + 0)} = \\frac{2}{4.945} = 0.404 = 40.4\\%$$

**Power Factor vs Firing Angle Table:**

| α (°) | cos α | PF | Efficiency |
|-------|-------|-----|-----------|
| 0° | 1.000 | 0.811 | 81.1% |
| 30° | 0.866 | 0.768 | 76.8% |
| 45° | 0.707 | 0.525 | 52.5% |
| 60° | 0.500 | 0.345 | 34.5% |
| 90° | 0 | 0.404 | 40.4% |

**Key observations:**

1. **PF decreases with increasing α**
   - At α = 0°: PF = 0.811 (good)
   - At α = 90°: PF = 0.404 (poor)

2. **Physical interpretation:**
   - Input current flows only during conduction interval
   - Large non-conduction gaps create distortion
   - Fundamental component and harmonics present

3. **Reactive power:**
   $$Q = \\sqrt{S^2 - P^2}$$

4. **Harmonic content:**
   - Half-wave rectifier: Rich harmonic spectrum
   - Fundamental frequency: 50 Hz
   - Odd harmonics present: 150 Hz (3rd), 250 Hz (5th), etc.
   - THD (Total Harmonic Distortion): High (~120%)

5. **Practical significance:**
   - Poor PF → Higher reactive current
   - Increases transformer and wire sizing
   - Adds utility company penalties
   - Requires input filter for PF improvement

**PF Improvement Methods:**
1. **Series inductor:** Smooth input current waveform
2. **Input LC filter:** Reduce harmonics
3. **PWM rectifiers:** Nearly unity PF
4. **Active rectifiers:** True PF correction

This analysis shows half-wave rectifiers have inherently poor power factor, improving with lower firing angles.`,
    difficulty: 'hard'
  },

  {
    topic: 'Commutation Techniques',
    question: 'Explain the operation of Class C commutation (complementary commutation) with circuit diagram description.',
    answer: `**Class C Commutation - Complementary Commutation:**

**Purpose:** Force turn-off of main SCR using complementary SCR and charged capacitor

**Circuit configuration:**
- Two SCRs: Main SCR (T₁) and Auxiliary SCR (T₂)
- Capacitor: Charged to supply voltage
- Series load resistance: R_L
- Diode: Prevents reverse discharge

**Operating sequence:**

**Phase 1: Initial state**
- Both T₁ and T₂ are OFF
- Capacitor voltage: $$V_C = 0$$
- Current: Zero

**Phase 2: T₁ trigger (main SCR turn-on)**
- Gate signal applied to T₁
- T₁ turns ON, current flows: $$E^+ → R_L → T_1 → E^-$$
- Simultaneously: Capacitor charges: $$E^+ → C^+ → C^- → T_1 → E^-$$
- Capacitor charges toward supply voltage E
- Charging current: $$I_C = \\frac{E}{R_L}$$
- Main load current: $$I_L = \\frac{E}{R_L}$$
- Total cathode current: $$I_K = I_L + I_C = \\frac{2E}{R_L}$$

**Charging equation:**
$$V_C(t) = E(1 - e^{-t/\\tau})$$
where $$\\tau = L_{eq} \\times C$$

**Phase 3: T₁ at steady state**
- Capacitor fully charged: $$V_C = E$$
- No charging current: $$I_C = 0$$
- Only load current flows: $$I_L = \\frac{E}{R_L}$$
- T₁ remains ON

**Phase 4: T₂ trigger (commutation)**
- Gate signal applied to T₂
- T₂ turns ON
- Current now flows through two paths:
  1. Load path: $$E^+ → T_2 → R_L → E^-$$
  2. Capacitor discharge: $$C^+ → T_2 → T_1 → C^-$$

**Critical moment:** Capacitor begins discharging through antiparallel path with T₁

**Phase 5: Commutation process**
- Discharge current through inductor creates:
  $$i = \\frac{E}{Z}\\sin(\\omega t)$$ where $$Z = \\sqrt{L/C}$$

- Capacitor voltage reverses:
  $$V_C(t) = E\\cos(\\omega t)$$

- Reverse voltage across T₁: $$V_1 = -V_C(t)$$

- When $$V_C$$ becomes negative (reverse), T₁ sees reverse bias

**Phase 6: T₁ forced OFF**
- Reverse voltage across T₁ turns it OFF
- Commutation current: $$I_c = I_{L}$$ (when commutation begins)

**Turn-off condition met:**
- T₁ forward current reduced to zero
- Reverse voltage applied to T₁
- T₁ commutates (turns OFF)

**Phase 7: Capacitor recharging**
- T₂ now carries full load current
- Capacitor charges via reverse path through T₁ (prevented by diode)
- Instead, capacitor charges to original polarity through T₂
- Path: $$E^+ → R_1 → C^+ → C^- → T_2 → E^-$$

**Phase 8: Next cycle**
- T₂ OFF, capacitor charged to E
- Ready for next T₁ trigger

**Key equations:**

Commutation time (zero crossing of capacitor):
$$t_{off} = \\frac{\\pi}{2} \\times \\sqrt{LC}$$

Peak commutation current:
$$I_{c(max)} = \\frac{E}{Z} = E\\sqrt{\\frac{C}{L}}$$

Capacitor voltage reversal:
$$V_C(min) = -E$$ (opposite polarity)

**Design specifications:**

For successful commutation:
1. **Capacitor must charge fully:** T₁ ON-time >> RC time constant

2. **Commutation current must exceed load current:**
   $$I_{c(max)} > I_L$$
   $$E\\sqrt{\\frac{C}{L}} > \\frac{E}{R_L}$$
   $$\\sqrt{\\frac{C}{L}} > \\frac{1}{R_L}$$

3. **Commutation voltage must overcome junction voltage:**
   $$E > V_f$$ (typically satisfied)

**Advantages:**
- Reliable commutation
- Works at low frequencies (<1000 Hz)
- No external voltage source needed
- Used in inverters, UPS systems

**Disadvantages:**
- Requires two SCRs
- Complex circuit
- Symmetrical gate signals needed
- Higher cost than Class A

**Application example:**
- Single-phase inverters with center-tapped transformer
- McMurray-Bedford inverter (uses Class C)
- UPS (Uninterruptible Power Supply) systems
- AC chopper circuits

**Circuit diagram concept:**
```
  E+ ---R_L--- Output
  |              |
  +----C----+    |
  |         |    |
 T1 GND    D1    |
  |         |    |
  T2--------+----+
  |
  E-
```

This complementary SCR approach ensures reliable turn-off without commutation circuit complexity.`,
    difficulty: 'hard'
  }
];

export default MASSIVE_CARDS;
