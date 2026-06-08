/**
 * EXTENDED EXAM CARDS DATABASE - POWER ELECTRONICS
 * Comprehensive examination questions from HEXCO National Diploma
 * Based on past papers Oct 2019 - Mar 2022
 */

export interface ExamCardData {
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
}

export const EXTENDED_EXAM_CARDS: ExamCardData[] = [
  // Thyristor Device Characteristics
  {
    topic: 'Thyristor Devices',
    question: 'Compare and contrast GTO (Gate Turn-Off) and SCR (Silicon Controlled Rectifier). List advantages of each.',
    answer: `**GTO (Gate Turn-Off Thyristor):**

**Characteristics:**
- Can be turned OFF by applying negative gate pulse
- Requires both positive and negative gate signals
- Higher gate power requirements
- Faster switching (1-2 μs turn-off time)
- Lower power handling vs SCR
- Typical ratings: 1000-4500V, 100-600A

**Advantages:**
- Direct gate control of turn-off
- No commutation circuit required
- Suitable for inverter applications
- Better efficiency in PWM circuits
- Simpler control logic

**Disadvantages:**
- Higher gate current requirement
- Lower surge current rating
- Higher conduction losses
- More expensive than SCR

---

**SCR (Silicon Controlled Rectifier):**

**Characteristics:**
- Can only be turned ON by gate pulse
- Turned OFF by commutation circuit
- Lower gate power requirement
- Slower switching (10-100 μs typical)
- Higher power handling capability
- Typical ratings: 100-6000V, 10-3500A

**Advantages:**
- Simple gate drive requirements
- High power capability
- Low cost
- High current ratings
- Rugged and reliable

**Disadvantages:**
- Requires external commutation
- Cannot be turned off directly
- Commutation circuits increase complexity
- Higher conduction losses in some applications

---

**Application Selection Matrix:**

| Application | GTO | SCR |
|-------------|-----|-----|
| AC/DC conversion | No | Yes |
| Chopper circuits | Yes | Yes |
| Inverters | Yes | Yes |
| Rectifiers | No | Yes |
| High frequency (>100 Hz) | Yes | No |
| High power (>500A) | No | Yes |
| Simple control | No | Yes |

**When to use GTO:**
- PWM applications requiring high frequency
- Direct load control without commutation
- Complex control algorithms
- Variable frequency drives (VFDs)

**When to use SCR:**
- High power DC applications
- Simple on/off control
- Cost-sensitive applications
- Industrial rectifiers and choppers`,
    difficulty: 'hard'
  },

  // Power Calculation
  {
    topic: 'Power Calculations',
    question: 'Calculate device gain (β) for SCR from gate current and anode current measurements. What is significance?',
    answer: `**Device Gain (Beta) Calculation:**

**Definition:**
$$\\beta = \\frac{I_A - I_g}{I_g}$$

Or equivalently:
$$\\beta = \\frac{\\alpha}{1 - \\alpha}$$

Where:
- $$I_A$$ = Anode current
- $$I_g$$ = Gate current
- $$\\alpha$$ = Common base current gain

**Practical Measurement:**

**Given measurements:**
- Gate current: $$I_g = 50\\,mA$$
- Anode current: $$I_A = 2000\\,mA$$

**Calculate gain:**
$$\\beta = \\frac{2000 - 50}{50} = \\frac{1950}{50} = 39$$

**Significance of Device Gain:**

1. **Gate Current Amplification:**
   - Small gate current controls much larger anode current
   - Allows high-current switching from low-power control circuits
   - Reduces gate drive power requirements

2. **Latching Characteristics:**
   $$I_L = I_g(1 + \\beta)$$
   
   With β = 39 and I_g = 50mA:
   $$I_L = 50(1 + 39) = 2000\\,mA = 2A$$
   
   This is latching current - once exceeded, SCR stays on without gate signal

3. **Temperature Dependence:**
   - β increases with temperature (~0.5%/°C)
   - Higher temperature → lower gate current needed
   - Risk of thermal runaway

4. **Voltage Drop Effects:**
   - Forward voltage drop: $$V_f \\approx 1-2V$$ (nearly constant)
   - Independent of gain
   - Causes conduction losses: $$P = V_f \\times I_A$$

5. **Design Implications:**

   **Minimum gate current required:**
   $$I_{g(min)} = \\frac{I_L}{1 + \\beta}$$
   
   With latching current 2A and β = 39:
   $$I_{g(min)} = \\frac{2}{40} = 50\\,mA$$
   
   **Gate drive must exceed this minimum by safety factor (typically 2):**
   $$I_{g(actual)} = 2 \\times 50 = 100\\,mA$$

6. **Power Efficiency:**
   - Gate power dissipation: $$P_g = V_g \\times I_g$$
   - With V_g = 5V, I_g = 100mA: P_g = 0.5W
   - Load power: $$P_L = V_f \\times I_A = 1.5 \\times 20 = 30W$$
   - Gate power fraction: 0.5/30 = 1.7% (efficient)

**Design Summary Table:**

| Parameter | Value | Calculation |
|-----------|-------|-------------|
| β (gain) | 39 | (2000-50)/50 |
| Latching current | 2A | 50×(1+39) mA |
| Min gate current | 50 mA | 2A/(1+39) |
| Recommended gate | 100 mA | 50×SF(2) |
| Gate power | 0.5 W | 5V×100mA |
| Load power | 30 W | 1.5V×20A |

**Critical insight:** The high β value means the SCR acts as a current amplifier, enabling small gate signals to control large anode currents. This is fundamental to why SCRs are preferred for high-power switching applications.`,
    difficulty: 'hard'
  },

  // Rectifier Analysis
  {
    topic: 'Rectifier Circuits',
    question: 'Derive RMS voltage equation for single-phase half-wave rectifier with firing angle α.',
    answer: `**Single-Phase Half-Wave Rectifier - RMS Voltage:**

**Circuit Configuration:**
- Input: $$v_s = V_m \\sin(\\omega t)$$ where $$V_m = \\sqrt{2} V_{rms}$$
- SCR fires at angle α and blocks at angle π
- Conduction interval: α to π

**RMS Voltage Derivation:**

$$V_{rms}^2 = \\frac{1}{\\pi}\\int_{\\alpha}^{\\pi} (V_m\\sin\\omega t)^2 d(\\omega t)$$

$$V_{rms}^2 = \\frac{V_m^2}{\\pi}\\int_{\\alpha}^{\\pi} \\sin^2\\omega t \\, d(\\omega t)$$

**Using identity:** $$\\sin^2 x = \\frac{1 - \\cos 2x}{2}$$

$$V_{rms}^2 = \\frac{V_m^2}{2\\pi}\\int_{\\alpha}^{\\pi} (1 - \\cos 2\\omega t) d(\\omega t)$$

$$V_{rms}^2 = \\frac{V_m^2}{2\\pi}\\left[\\omega t - \\frac{\\sin 2\\omega t}{2}\\right]_{\\alpha}^{\\pi}$$

$$V_{rms}^2 = \\frac{V_m^2}{2\\pi}\\left[(\\pi - 0) - (\\alpha - \\frac{\\sin 2\\alpha}{2})\\right]$$

$$V_{rms}^2 = \\frac{V_m^2}{2\\pi}\\left[\\pi - \\alpha + \\frac{\\sin 2\\alpha}{2}\\right]$$

**Final RMS voltage equation:**

$$\\boxed{V_{rms} = V_m\\sqrt{\\frac{1}{2\\pi}\\left(\\pi - \\alpha + \\frac{\\sin 2\\alpha}{2}\\right)}}$$

---

**Numerical Example for 400V Supply:**

$$V_m = \\sqrt{2} \\times 400 = 565.7V$$

**At α = 0°:**
$$V_{rms} = 565.7\\sqrt{\\frac{1}{2\\pi}(\\pi + 0)} = 565.7\\sqrt{0.5} = 400V$$

**At α = 45° = 0.785 rad:**
$$\\sin(2 \\times 0.785) = \\sin(1.57) = 1.0$$

$$V_{rms} = 565.7\\sqrt{\\frac{1}{2\\pi}(3.14159 - 0.785 + 0.5)} = 565.7\\sqrt{\\frac{2.856}{6.283}} = 565.7 \\times 0.674 = 381.3V$$

**At α = 90° = 1.571 rad:**
$$\\sin(3.142) = 0$$

$$V_{rms} = 565.7\\sqrt{\\frac{1}{2\\pi}(3.14159 - 1.571 + 0)} = 565.7\\sqrt{\\frac{1.571}{6.283}} = 565.7 \\times 0.5 = 282.8V$$

---

**RMS Voltage Table:**

| α (°) | $$V_{rms}$$ (V) | Ripple Factor |
|-------|-----------------|----------------|
| 0° | 400 | 1.11 |
| 30° | 387 | 1.14 |
| 45° | 381 | 1.15 |
| 60° | 369 | 1.17 |
| 90° | 283 | 1.23 |

**Ripple Factor:**
$$RF = \\sqrt{\\frac{V_{rms}^2}{V_{dc}^2} - 1}$$

High ripple at large firing angles indicates need for LC filtering.

**Key Design Point:**
Relationship between RMS and DC voltages:
$$\\frac{V_{rms}}{V_{dc}} > 1$$ always

This difference represents power loss and heat dissipation in the load resistance.`,
    difficulty: 'hard'
  },

  // Opto-Electronic Applications
  {
    topic: 'Opto-Electronic Devices',
    question: 'Design an optoisolator circuit for isolated SCR gate drive. Include requirements and component specifications.',
    answer: `**Optoisolator-Based Isolated Gate Drive Circuit:**

**Purpose:**
Provide galvanic isolation between low-voltage control logic (5V) and high-voltage power stage (400V) using light as the isolation medium.

**System Block Diagram:**
```
Control Logic (5V) → Optoisolator Input Stage → Light Coupling → 
Optoisolator Output → Gate Drive Circuit → SCR Gate Terminal
```

---

**Step 1: Control Side (Primary) Specifications**

**Input signal characteristics:**
- Logic output: 0-5V
- Gate drive pulse duration: 5-10 μs
- Repetition rate: 50-60 Hz (single pulse per cycle)
- Rise time: <1 μs

**Optoisolator LED requirements:**
- Forward voltage: $$V_f = 1.5-2.0V$$
- Forward current: $$I_f = 5-50\\,mA$$ (typical: 20mA)
- Light wavelength: 850-940 nm (infrared)

**Driving transistor (NPN):**
- Collector-emitter voltage: V_ce = 5V
- Collector current: $$I_c = 50-100\\,mA$$
- Switching frequency: 50-60 Hz

**Base resistor calculation:**
$$R_B = \\frac{V_{in} - V_{be}}{I_b}$$

For V_in = 5V, V_be = 0.7V, I_b = 2mA (assume β = 50):
$$R_B = \\frac{5 - 0.7}{0.002} = 2.15\\,k\\Omega$$

Choose standard value: $$R_B = 2.2\\,k\\Omega$$

---

**Step 2: Optoisolator Specifications**

**Selection criteria:**
- Isolation voltage rating: ≥ 2000V DC minimum
- CTR (Current Transfer Ratio): 10-300% depending on model
- Propagation delay: <5 μs (for fast response)
- Output photodiode or phototransistor

**Common ICs:**
- 4N25 (phototransistor output, ≥300% CTR)
- TLP291 (phototransistor output, 30-100% CTR)
- MOC3023 (zero-crossing triac driver - for AC)
- TLP521 (diode output)

**For isolated gate drive, choose:** 4N25 or TLP291

**Operating point:**
- Input LED current: 20 mA
- Output photodiode photocurrent: $$I_{ph} = 20\\,mA \\times CTR = 20 \\times 0.8 = 16\\,mA$$

---

**Step 3: Secondary Side (Isolated) Specifications**

**Isolation barrier:**
- Minimum dielectric strength: 2000V DC
- Creepage distance: ≥5 mm
- Clearance: ≥3 mm
- Surge immunity: ±8 kV (per IEC 61000-4-5)

**Isolated power supply for gate drive:**
- Input: 400V DC power bus
- Output: 24V DC, isolated from ground
- Use: Flyback transformer with opto-coupler feedback
- Capacity: 500 mA minimum

**Power supply transformer specifications:**
- Primary: 400V DC input
- Secondary: 24V isolated output
- Isolation rating: 2000V minimum
- Regulation: ±5%

---

**Step 4: Gate Drive Output Stage**

**After optoisolator photodiode:**

**Pull-up resistor:**
$$R_{pullup} = \\frac{V_{cc} - V_{out(low)}}{I_{photo}} = \\frac{24 - 0.5}{0.016} = 1.46\\,k\\Omega$$

Choose: $$R_{pullup} = 1.5\\,k\\Omega$$

**Gate pulse characteristics:**
- Output voltage: 0-24V
- Output current capability: ±200 mA
- Rise/fall time: <1 μs

**Gate resistor (at SCR):**
$$R_{gate} = \\frac{V_{out}}{I_{gate}} = \\frac{24}{0.1} = 240\\,\\Omega$$

Choose: $$R_{gate} = 220\\,\\Omega$$

---

**Step 5: Protection Circuitry**

**On secondary side:**

1. **Gate-cathode protection:**
   - Zener diode: 10V, 1W rating
   - Protects against overvoltage

2. **Blocking diode:**
   - Fast recovery type (1N4148)
   - Prevents reverse gate current

3. **Gate-cathode capacitor:**
   - 10 nF ceramic
   - Reduces dv/dt coupling into gate

4. **Noise filtering:**
   - Ferrite bead on supply lines
   - 100 nF bypass capacitor near gate drive

---

**Step 6: Complete Circuit Analysis**

**Signal path verification:**

| Stage | Input | Output | Function |
|-------|-------|--------|----------|
| Control | 5V logic | 20mA LED | Drive optoisolator |
| Optoisolator | 20mA | 16mA photocurrent | Galvanic isolation |
| Pull-up | 24V isolated | 0-24V gate voltage | Level shifting |
| Gate resistor | 24V | 0-100mA | Gate current limiting |
| SCR gate | 100mA pulse | Latching current | Device triggering |

---

**Step 7: Timing Analysis**

**Timing sequence:**
1. Logic pulse high (0 → 5V): Transistor ON
2. Optoisolator LED on: Propagation delay ~5 μs
3. Photodiode on: Creates gate voltage
4. Gate current flows: SCR latches
5. Logic pulse low: Optoisolator OFF
6. SCR remains ON (until commutation)

**Total turn-on delay:**
$$t_{delay} = t_{prop} + R_g C_g + t_{SCR}$$

Typical: 10-15 μs

---

**Design Specifications Summary:**

| Component | Value | Rating |
|-----------|-------|--------|
| **Primary** | | |
| Control voltage | 5V | TTL logic |
| Base resistor | 2.2kΩ | 1/4W |
| Driving transistor | 2N3904 | 50V, 200mA |
| Optoisolator | 4N25 | 2000V isolation |
| **Secondary** | | |
| Isolated supply | 24V | 500mA |
| Gate resistor | 220Ω | 1/2W |
| Gate capacitor | 10nF | 50V ceramic |
| Blocking diode | 1N4148 | Ultrafast |
| Gate Zener | 10V | 1W |
| Pull-up resistor | 1.5kΩ | 1/4W |

**Advantages of this design:**
- Full galvanic isolation (2000V+)
- Simple implementation
- Proven reliability
- Easy troubleshooting
- Cost-effective

This isolated gate drive ensures safe, reliable SCR triggering in high-voltage power electronics applications.`,
    difficulty: 'hard'
  },

  // Device Ratings
  {
    topic: 'Device Ratings',
    question: 'Explain forward surge current rating ($$I_{FSM}$$) and its significance in SCR selection.',
    answer: `**Forward Surge Current Rating ($$I_{FSM}$$):**

**Definition:**
Maximum peak anode current that SCR can withstand for a single half-cycle without permanent damage, measured at normal forward voltage rating.

**Typical Values:**
- Standard SCR: $$I_{FSM} = (10-20) \\times I_{avg}$$
- Example: 50A average rated SCR has $$I_{FSM} \\approx 500-1000A$$

**Why Surge Current Occurs:**

**During initial turn-on:**
1. SCR gate current applied
2. Anode voltage still near peak (565V for 400V supply)
3. Initially low on-state resistance
4. Circuit inductance limits current rise initially

**Peak current equation:**
$$I_{peak} = \\frac{V_m}{Z}$$

where Z = initial circuit impedance

**Example calculation:**
- Supply: 400V RMS, $$V_m = 565.7V$$
- Load resistance: 10Ω
- Circuit inductance: 5 μH (typically present in wiring/bus)
- Initial impedance: $$Z = 10 + j\\omega L = 10 + j(2\\pi f)(5\\times 10^{-6})$$

At 50 Hz:
$$Z = 10 + j(1.57\\times 10^{-3}) \\approx 10\\,\\Omega$$ (resistance dominates)

$$I_{peak} = \\frac{565.7}{10} = 56.6A$$

But if turn-on is very fast (< 1μs):
Inductance effect dominates: $$Z \\approx j\\omega L = j0.785\\,m\\Omega$$
$$I_{peak} = \\frac{565.7}{0.00078} \\approx 726\\,kA$$ (unrealistic but shows inductance importance)

**Realistic with gate drive limiting:**
$$I_{peak} = (2-5) \\times I_{avg}$$ due to gate current limiting

---

**Measurement Conditions:**

**$$I_{FSM}$$ rating specifies:**
- Single half-sine surge (10 ms duration at 50Hz = 0.5 cycle)
- Gate current applied continuously
- Case temperature at 25°C or specified temperature
- Device junction must not exceed $$T_j = 150°C$$ during surge

**Non-repetitive vs Repetitive:**
- **Non-repetitive $$I_{FSM}$$:** Maximum single surge (datasheet rated)
- **Repetitive surge:** Lower rating (typically $$I_{FSM}/2$$)

**Thermal energy during surge:**
$$E = \\int_0^t I^2 R \\, dt$$

For half-sine pulse:
$$I(t) = I_{peak} \\sin(\\omega t)$$

$$E = R \\int_0^{T/2} I_{peak}^2 \\sin^2(\\omega t) \\, dt = \\frac{R I_{peak}^2 T}{4}$$

$$E = \\frac{1.5 \\times (100)^2 \\times 0.01}{4} = 3.75J$$

**Thermal rise:**
$$\\Delta T = \\frac{E}{C_th}$$

where $$C_{th}$$ = thermal capacitance (100-500 J/°C for medium power device)

$$\\Delta T = \\frac{3.75}{200} = 18.75°C$$

---

**Significance in SCR Selection:**

**1. Short-Circuit Protection:**
Typical use: Protecting against short-circuit at SCR terminals
- Short-circuit peak current: $$I_{sc} = \\frac{V_m}{R_{parasitic}}$$
- For 10 mΩ parasitic resistance: $$I_{sc} = 56.5\\,kA$$
- This far exceeds $$I_{FSM}$$ rating!
- **Solution:** Add series reactance (inductor) to limit surge

**2. Design Margin:**
Must select device with sufficient $$I_{FSM}$$ rating:
$$I_{FSM(selected)} > (2-3) \\times I_{peak(actual)}$$

**3. Inrush Current Limitation:**
At power-on, capacitive loads create surge:
- Transformer inrush: Can be (5-10)$$I_{rms}$$
- Capacitor bank discharge: Extremely high peak

**Required series inductance:**
$$L = \\frac{V_m}{(di/dt)_{max}}$$

For $$V_m = 565.7V$$ and $$di/dt = 100A/\\mu s$$:
$$L = \\frac{565.7}{100\\times 10^6} = 5.657\\,\\mu H$$

---

**Application Example:**

**Power supply with 100A continuous load:**

**Selection process:**

1. Rated continuous current: $$I_A = 100A$$

2. Select device with $$I_{avg(rated)} \\geq 100A$$
   Example: 150A rated SCR

3. Check $$I_{FSM}$$ rating:
   - $$I_{FSM} = 1500A$$ typical (10× rule)

4. Calculate actual peak current:
   - Load resistance: $$R = \\frac{V_{dc}}{I_A} = \\frac{360V}{100A} = 3.6\\,\\Omega$$
   - Parasitic resistance: 0.02Ω
   - Total impedance: 3.62Ω
   - Peak current: $$I_{peak} = \\frac{565.7}{3.62} = 156A$$

5. Verify:
   - $$I_{peak}(156A) < I_{FSM}(1500A)$$ ✓ Safe
   - Margin: 1500/156 = 9.6 (Excellent)

6. Check repetitive stress:
   - If surge occurs every cycle: 50/sec
   - Heat accumulated: $$P = (I_{peak}^2 - I_{avg}^2) \\times R \\times f$$
   - May need derating if repetitive surges occur

---

**Design Guidelines:**

| Design Phase | Action |
|--------------|--------|
| Specification | Document expected peak current (inrush + load) |
| Selection | Choose $$I_{FSM} > 3 \\times I_{peak}$$ |
| Protection | Add series inductor if $$I_{peak} > I_{rated}$$ |
| Verification | Confirm thermal margin in worst case |
| Testing | Verify during commissioning with actual load |

**Critical insight:** Forward surge current rating protects SCR during inrush and transient conditions. Proper inductor sizing is essential to prevent exceeding ratings during power-on.`,
    difficulty: 'hard'
  }
];

export default EXTENDED_EXAM_CARDS;
