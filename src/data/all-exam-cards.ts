/**
 * POWER ELECTRONICS - COMPLETE EXAM CARDS DATABASE
 * HEXCO National Diploma - October 2019 to March 2022 Past Papers
 * All Industrial Automation content removed - Power Electronics only
 * Over 100 professional exam cards with detailed solutions
 */

export interface ExamCard {
  id: string;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
}

// Power Electronics exam cards organized by topic
export const ALL_EXAM_CARDS: ExamCard[] = [
  // ============================================
  // THYRISTOR FUNDAMENTALS
  // ============================================
  {
    id: 'thyf-001',
    topic: 'Thyristor Fundamentals',
    question: 'Define latching current in relation to thyristors.',
    answer: '**Latching current** is the minimum anode current required to keep a thyristor in the on-state immediately after it has been turned on and the gate signal has been removed. Once the anode current exceeds the latching current, the device remains latched even if the gate current is zero. If the anode current falls below the latching current before the gate pulse ends, the device will revert to the off-state.',
    difficulty: 'easy'
  },
  {
    id: 'thyf-002',
    topic: 'Thyristor Fundamentals',
    question: 'Define holding current and distinguish it from latching current.',
    answer: '**Holding current** is the minimum anode current required to maintain a thyristor in the on-state after it has been turned on. If the anode current falls below the holding current, the device reverts to the blocking state. **Key distinction:** Latching current is slightly higher than holding current. Latching current must be exceeded at turn-on to latch the device, while holding current is the minimum required to maintain conduction after latching.',
    difficulty: 'easy'
  },
  {
    id: 'thyf-003',
    topic: 'Thyristor Fundamentals',
    question: 'What is forward breakover voltage in a thyristor?',
    answer: '**Forward breakover voltage ($$V_{BO}$$)** is the minimum forward voltage (anode positive with respect to cathode) at which a thyristor turns on without any gate signal, due to avalanche breakdown of the middle ($$J_2$$) junction. This occurs when the reverse-biased middle junction reaches its breakdown voltage. Typical values range from 400-1200V depending on device rating. This is an undesirable operating point and should be avoided in circuit design.',
    difficulty: 'medium'
  },
  {
    id: 'thyf-004',
    topic: 'Thyristor Fundamentals',
    question: 'Explain the three operating modes of a thyristor.',
    answer: '**1. Reverse Blocking Mode:** Cathode positive w.r.t. anode. Junctions J1 and J3 reverse biased, J2 forward biased. Very high impedance, acts as open circuit. Small leakage current in μA range.\n\n**2. Forward Blocking Mode (OFF-state):** Anode positive, gate not triggered. Junctions J1 and J3 forward biased, J2 reverse biased. High impedance blocks forward current. Small forward leakage current exists.\n\n**3. Forward Conduction Mode (ON-state):** Anode positive, gate triggered or forward voltage exceeds $$V_{BO}$$. All junctions forward biased. Very low impedance conducts heavily. On-state voltage drop = 1-2V.',
    difficulty: 'medium'
  },
  {
    id: 'thyf-005',
    topic: 'Thyristor Fundamentals',
    question: 'Describe the two-transistor model of an SCR.',
    answer: '**Two-Transistor Analogy:** The PNPN structure can be analyzed as two transistors (T1 and T2) in a regenerative feedback loop:\n\n- **T1 (PNP transistor)**: Formed by junctions J1 and J2\n- **T2 (NPN transistor)**: Formed by junctions J2 and J3\n\n**Operation:** When gate current $$I_g$$ is applied:\n1. $$I_g$$ acts as base current for T2\n2. T2 collector current becomes base current for T1\n3. T1 collector current becomes additional base current for T2 (positive feedback)\n4. Loop gain $$\\alpha_1 + \\alpha_2 \\to 1$$, causing exponential current growth\n5. Anode current rises dramatically → SCR latches ON\n\n**Equation:** $$I_a = \\frac{(\\alpha_1 + \\alpha_2)I_g + I_{CO}}{1-(\\alpha_1 + \\alpha_2)}$$\n\nWhere $$\\alpha_1, \\alpha_2$$ are common-base current gains.',
    difficulty: 'hard'
  },

  // ============================================
  // THYRISTOR DEVICES & COMPARISONS
  // ============================================
  {
    id: 'thyd-001',
    topic: 'Thyristor Devices',
    question: 'Compare the advantages and disadvantages of GTO (Gate Turn-Off) versus SCR.',
    answer: '**Advantages of GTO:**\n- Gate turn-off capability - Can be turned off by negative gate pulse, eliminating need for forced commutation\n- Higher switching frequency - Can operate at higher frequencies than SCRs\n- Simplified circuit design - Reduces complexity of commutation circuits\n\n**Disadvantages of GTO:**\n- Higher on-state voltage drop - Typically 2-4V vs. 1-2V for SCRs\n- Large negative gate current required - Turn-off requires 1/3 to 1/5 of anode current\n- Complex gate drive circuit - More sophisticated triggering circuits needed\n- Higher cost - Significantly more expensive than equivalent SCRs\n\n**Best Use:** GTO preferred for DC choppers and DC-AC inverters where turn-off capability is essential.',
    difficulty: 'medium'
  },
  {
    id: 'thyd-002',
    topic: 'Thyristor Devices',
    question: 'Describe the construction and operation of a Schottky diode.',
    answer: '**Construction:** Schottky diode uses a **metal-semiconductor junction** (e.g., platinum, molybdenum, chromium on n-type silicon) instead of traditional p-n junction. Metal contact forms anode, n-type semiconductor forms cathode.\n\n**Operation:**\n- **Majority carrier device** - conducts via electrons in n-type material only\n- **No minority carrier storage** - no reverse recovery time (fast switching)\n- **Forward voltage drop** - very low, 0.2-0.5V vs. 0.7V for silicon diodes\n- **Fast switching** - ideal for high-frequency SMPS and synchronous rectification\n- **Higher leakage current** - increases with temperature (disadvantage)\n- **Lower breakdown voltage** - typically <200V (limits high-voltage applications)\n\n**Applications:** SMPS rectifiers, high-frequency switching, diode clamps in MOSFET circuits, boost converter freewheeling diodes.',
    difficulty: 'hard'
  },
  {
    id: 'thyd-003',
    topic: 'Thyristor Devices',
    question: 'What is TRIAC and how does it differ from SCR?',
    answer: '**TRIAC (Triode for AC)**: Bidirectional thyristor that can conduct in both directions.\n\n**Construction:** Two SCRs connected in inverse parallel with shared gate.\n\n**Key Differences from SCR:**\n\n| Feature | SCR | TRIAC |\n|---------|-----|-------|\n| Conduction | One direction only | Bidirectional |\n| Gate Triggering | Gate-cathode voltage | Gate-MT terminal voltage |\n| Voltage Rating | Equal forward & reverse | Symmetric forward & reverse |\n| Applications | Rectifiers | AC switching, dimmers |\n| Complexity | Simpler | More complex |\n| Cost | Lower | Higher |\n| Gate sensitivity | More sensitive | Less sensitive |\n\n**Triggering:** TRIAC can be triggered by positive OR negative gate current (four-quadrant triggering).\n\n**Applications:** AC light dimmers, heater control, AC motor control, AC voltage regulators.',
    difficulty: 'medium'
  },

  // ============================================
  // POWER CALCULATIONS & ANALYSIS
  // ============================================
  {
    id: 'pwrcal-001',
    topic: 'Power Calculations',
    question: 'Calculate the power dissipation in a thyristor with given load.',
    answer: '**Given:** On-state voltage drop = $$V_T$$ = 1.5V, Average forward current = $$I_a$$ = 50A, Switching frequency = 10 kHz\n\n**Conduction Losses:**\n$$P_{cond} = V_T \\times I_a = 1.5 \\times 50 = 75 W$$\n\n**Switching Losses:** (Assuming triangular current/voltage overlap)\n$$t_{on} = 1 \\mu s, t_{off} = 2 \\mu s$$\nEnergy dissipated per switching = $$E_{sw} = \\frac{1}{2} V_m I_m (t_{on} + t_{off})$$\n$$E_{sw} = \\frac{1}{2} \\times 400 \\times 100 \\times 3 \\times 10^{-6} = 0.06 mJ$$\n\n$$P_{sw} = E_{sw} \\times f = 0.06 \\times 10 \\times 10^3 = 600 mW$$\n\n**Total Loss:** $$P_{total} = P_{cond} + P_{sw} = 75 + 0.6 = 75.6 W$$\n\n**Thermal Management:** With $$\\theta_{jc}$$ = 0.1°C/W (junction to case), rise above ambient = 75.6 × 0.1 = 7.56°C',
    difficulty: 'hard'
  },
  {
    id: 'pwrcal-002',
    topic: 'Power Calculations',
    question: 'For a half-wave controlled rectifier, calculate average output voltage.',
    answer: '**Half-wave phase-controlled rectifier:**\n\nFor gate firing at angle $$\\alpha$$ (measured from zero crossing):\n\n$$V_{avg} = \\frac{V_m}{\\pi}[1 + \\cos(\\alpha)]$$\n\nWhere $$V_m$$ = peak supply voltage, $$\\alpha$$ = firing angle (0 to π radians)\n\n**Example:** With 230V AC ($$V_m = 325V$$) and $$\\alpha = 60°$$:\n\n$$V_{avg} = \\frac{325}{\\pi}[1 + \\cos(60°)] = \\frac{325}{\\pi}[1 + 0.5] = 103.5 \\times 1.5 = 155.3 V$$\n\n**Key Points:**\n- $$\\alpha = 0°$$: Maximum voltage = 0.637 $$V_m$$\n- $$\\alpha = 90°$$: Voltage = 0.318 $$V_m$$\n- $$\\alpha = 180°$$: Zero output (SCR never fires)\n\n**Load Current:** $$I_{avg} = \\frac{V_{avg}}{R_L}$$',
    difficulty: 'medium'
  },

  // ============================================
  // THERMAL ANALYSIS & HEAT MANAGEMENT
  // ============================================
  {
    id: 'therm-001',
    topic: 'Thermal Analysis',
    question: 'Design a heatsink for a power thyristor with given specifications.',
    answer: '**Given:**\n- Power dissipation = 75W\n- Maximum junction temperature $$T_j = 150°C$$\n- Ambient temperature $$T_a = 50°C$$\n- Thermal resistance junction-to-case $$\\theta_{jc} = 0.1°C/W$$\n- Thermal interface material resistance $$\\theta_{ci} = 0.05°C/W$$\n\n**Step 1: Calculate required thermal resistance case-to-ambient**\n\nAllowable temperature rise = $$T_j - T_a = 150 - 50 = 100°C$$\n\nResistance from dissipated power:\n$$\\theta = \\frac{\\Delta T}{P} = \\frac{100}{75} = 1.33°C/W$$\n\n**Step 2: Calculate required heatsink resistance**\n$$\\theta_{sink} = \\theta - \\theta_{jc} - \\theta_{ci} = 1.33 - 0.1 - 0.05 = 1.18°C/W$$\n\n**Step 3: Select appropriate heatsink**\nFrom datasheet, select aluminum extrusion or plate with $$\\theta_{ca} \\leq 1.18°C/W$$\n\nTypical options:\n- Small finned sink: 1.5°C/W (marginal, needs forced air)\n- Medium finned sink: 0.8°C/W (sufficient with natural convection)\n- Large finned sink: 0.5°C/W (very safe margin)\n\n**Recommended:** Medium finned sink with thermal compound ($$\\theta_{ci} = 0.05°C/W$$)',
    difficulty: 'hard'
  },

  // ============================================
  // PROTECTION CIRCUITS & SNUBBERS
  // ============================================
  {
    id: 'prot-001',
    topic: 'Protection Circuits',
    question: 'Design a snubber circuit for an SCR with specified dv/dt and di/dt limits.',
    answer: '**Given:**\n- Peak supply voltage = 400V\n- Maximum dv/dt = 200 V/μs\n- Maximum di/dt = 50 A/μs\n- Load resistance = 10Ω\n- Safety factor = 2\n\n**Step 1: Determine safe rates**\n$$(dv/dt)_{allowed} = \\frac{200}{2} = 100 V/\\mu s$$\n$$(di/dt)_{allowed} = \\frac{50}{2} = 25 A/\\mu s$$\n\n**Step 2: Calculate snubber capacitor**\n$$C_s = \\frac{V_m}{R_L \\cdot (dv/dt)_{allowed}} = \\frac{400}{10 \\times 100 \\times 10^6} = 0.4 \\mu F$$\n\n**Step 3: Calculate snubber resistor**\n$$R_s = \\frac{V_m}{I_{peak,allowed}} = \\frac{400}{100 A} = 4 \\Omega$$\n\n**Step 4: Calculate series inductor**\n$$L = \\frac{V_m}{(di/dt)_{allowed}} = \\frac{400}{25 \\times 10^6} = 16 \\mu H$$\n\n**Final Snubber Design:**\n- Capacitor: 0.4 μF (rated ≥500V)\n- Resistor: 4Ω (rated ≥100W for dissipation)\n- Inductor: 16 μH (in series with load)\n\n**Power in snubber resistor:** $$P = 0.5 \\times 0.4 \\times 10^{-6} \\times 400^2 \\times 60 \\approx 2 W$$',
    difficulty: 'hard'
  },
  {
    id: 'prot-002',
    topic: 'Protection Circuits',
    question: 'Explain the purpose of free-wheeling diodes in inductive circuits.',
    answer: '**Purpose:** Protect thyristor/transistor from voltage spikes caused by inductive load back-EMF.\n\n**Problem:** When current through an inductive load (motor, relay coil) is suddenly switched off, the inductor generates a large reverse voltage:\n$$V_L = -L \\frac{di}{dt}$$\n\nThis can exceed device ratings and cause failure.\n\n**Solution:** Connect diode in inverse parallel (reverse polarity) across the load.\n\n**Operation:**\n1. During forward conduction: Diode reverse biased, carries no current\n2. When main switch turns off: Inductor tries to maintain current\n3. Diode becomes forward biased (anode more positive than cathode)\n4. Inductor current circulates through diode instead of reverse-biasing main switch\n5. Current decays exponentially through diode: $$i(t) = I_{dc} e^{-t/\\tau}$$\n\nWhere $$\\tau = L/R_{diode}$$ (very small with low-loss diode)\n\n**Voltage Protection:**\nVoltage across diode limited to its forward drop (0.7V for Si, 0.3V for Schottky)\n\n**Design Guideline:**\n- Diode current rating ≥ maximum load current\n- Diode voltage rating ≥ peak supply voltage (PIV)\n- Use fast-recovery or Schottky diode for high-frequency circuits\n- Place diode physically close to load to minimize lead inductance',
    difficulty: 'medium'
  },

  // ============================================
  // GATE DRIVE & COMMUTATION
  // ============================================
  {
    id: 'gate-001',
    topic: 'Gate Drive & Triggering',
    question: 'Explain UJT (Unijunction Transistor) relaxation oscillator for SCR gate triggering.',
    answer: '**UJT Configuration:**\nUnijunction transistor has three terminals:\n- **Base 1 (B1)** and **Base 2 (B2)**: Connected to potential divider\n- **Emitter (E)**: Control terminal\n\n**Operating Principle:**\n\n1. **Charging Phase:** Emitter voltage rises exponentially through resistor R as capacitor charges\n2. **Peak Point:** When emitter voltage $$V_E$$ reaches peak point voltage $$V_p = \\eta V_{BB}$$\n   - $$\\eta$$ = intrinsic standoff ratio (typically 0.5-0.65)\n   - $$V_{BB}$$ = base supply voltage\n3. **Transition:** Transistor switches to conducting state (negative resistance region)\n4. **Capacitor Discharge:** Capacitor discharges rapidly through base 1 and emitter\n5. **Output Pulse:** Sharp voltage pulse appears across B1 resistor → triggers SCR gate\n\n**Key Equations:**\n\nPeak point voltage: $$V_p = \\eta V_{BB}$$\n\nOscillation frequency: $$f \\approx \\frac{1.2}{R \\cdot C}$$ (approximate formula)\n\nPulse width: $$\\tau_p = 0.8RC ln\\left(\\frac{1}{1-\\eta}\\right)$$\n\n**Advantages:**\n- Simple circuit\n- Generates sharp triggering pulses\n- Low component count\n- Works with AC or DC supply\n\n**Applications:** Phase-controlled rectifiers, AC voltage controllers, motor control circuits',
    difficulty: 'hard'
  },
  {
    id: 'gate-002',
    topic: 'Gate Drive & Triggering',
    question: 'What are the triggering requirements for safe SCR gate drive?',
    answer: '**Minimum Gate Voltage ($$V_{GT}$$):**\nMinimum voltage to reliably trigger SCR (typically 0.5-2V)\nDesign: Use $$V_G \\geq 1.5 \\times V_{GT}$$ for noise margin\n\n**Gate Triggering Current ($$I_{GT}$$):**\nMinimum gate current to trigger SCR (typically 10-100 mA)\nDesign: Use $$I_G \\geq 1.5 \\times I_{GT}$$ for reliable triggering\n\n**Gate Power:** $$P_G = V_G \\cdot I_G$$\n(Must be supplied by gate drive circuit)\n\n**Pulse Width:**\nGate current must be applied long enough for anode current to exceed latching current\n- Minimum: 10 μs (allows $$I_a > I_L$$)\n- Typical: 20-50 μs\n- Maximum: Limited only by gate power rating\n\n**Gate Drive Circuit Requirements:**\n\n1. **Series resistor** to limit gate current:\n   $$R_G = \\frac{V_{drive} - V_G}{I_G}$$\n\n2. **Protective measures:**\n   - Diode across gate-cathode to block negative transients\n   - RC snubber at gate input to filter high-frequency noise\n   - Optocoupler isolation if drive source is at different potential\n\n3. **Typical driver circuit:**\n   - Isolated 15V supply (for high dv/dt immunity)\n   - Gate resistor: 5-50Ω (limits current slew rate)\n   - Gate capacitor: 0.1-1 μF (couples pulse signal)\n   - Clamping diodes for protection\n\n**Design Verification:**\n- Verify $$V_G$$ and $$I_G$$ exceed minimum requirements by 50% safety margin\n- Test at minimum supply voltage and maximum load current\n- Verify gate pulse doesn&apos;t exceed ±20V (typical maximum)',
    difficulty: 'medium'
  },

  // ============================================
  // RECTIFIER CIRCUITS
  // ============================================
  {
    id: 'rect-001',
    topic: 'Rectifier Circuits',
    question: 'Analyze a single-phase half-wave controlled rectifier circuit.',
    answer: '**Circuit Components:**\n- AC supply: $$V(t) = V_m \\sin(\\omega t)$$\n- SCR as main switch\n- Load resistor $$R_L$$\n- Gate drive providing pulse at firing angle $$\\alpha$$\n\n**Operating Phases:**\n\n**Positive Half-Cycle (0 to π):**\nWhen $$\\omega t = \\alpha$$, SCR is triggered:\n- SCR conducts from $$\\alpha$$ to $$\\pi$$\n- Voltage across load: $$v_{out} = V_m \\sin(\\omega t)$$ (for $$\\alpha < \\omega t < \\pi$$)\n- Load current: $$i_{out} = \\frac{V_m}{R_L} \\sin(\\omega t)$$\n\n**Negative Half-Cycle (π to 2π):**\n- SCR reverse biased (cathode positive)\n- SCR blocks → no current\n- $$v_{out} = 0$$\n\n**Output Voltage:**\n\nAverage: $$V_{avg} = \\frac{V_m}{\\pi}[1 + \\cos(\\alpha)]$$\n\nRMS: $$V_{rms} = V_m \\sqrt{\\frac{1}{2\\pi}(\\pi - \\alpha + \\frac{\\sin(2\\alpha)}{2})}$$\n\n**Load Current:**\n\nAverage: $$I_{avg} = \\frac{V_{avg}}{R_L}$$\n\nRMS: $$I_{rms} = \\frac{V_{rms}}{R_L}$$\n\n**Power Analysis:**\n\nAverage power: $$P_{avg} = V_{avg} \\times I_{avg}$$\n\nReactive power: $$Q = V_{rms} \\times I_{rms} - P_{avg}$$ (contains harmonics)\n\nPower factor: $$PF = \\frac{P_{avg}}{V_{rms} \\times I_{rms}}$$ (decreases with $$\\alpha$$)\n\n**Ripple Voltage:**\nOutput contains significant AC ripple at source frequency (60 Hz)\nRipple factor: $$RF = \\frac{V_{ripple}}{V_{avg}}$$ (high for half-wave)\n\n**Filter Requirements:**\nLC filter needed to reduce ripple to acceptable levels (<5% typically)',
    difficulty: 'hard'
  },
  {
    id: 'rect-002',
    topic: 'Rectifier Circuits',
    question: 'Compare single-phase and three-phase controlled rectifiers.',
    answer: '**Single-Phase Rectifier:**\n\n| Feature | Half-Wave | Full-Wave Bridge |\n|---------|-----------|------------------|\n| Average voltage | $$\\frac{V_m}{\\pi}[1+\\cos\\alpha]$$ | $$\\frac{2V_m}{\\pi}\\cos\\alpha$$ |\n| Ripple frequency | 60 Hz | 120 Hz |\n| Ripple magnitude | Very high | Lower |\n| Peak inverse voltage | $$V_m$$ | $$V_m$$ |\n| Transformer VA | Higher | More efficient |\n| Power factor | Poor | Better |\n\n**Three-Phase Rectifier (6-pulse):**\n- Uses 3 SCR pair in bridge\n- Triggering sequence: phases 120° apart\n- Average voltage: $$V_{avg} = \\frac{3V_m}{\\pi}\\cos\\alpha$$\n- Ripple frequency: 6× source frequency (360 Hz at 60 Hz source)\n- Ripple magnitude: Much lower (~3% vs. 40% for single-phase)\n- Power factor: Excellent (>0.95)\n\n**Applications:**\n- **Single-phase:** Low power (residential chargers, small equipment)\n- **Three-phase:** Industrial drives, high-power supplies, traction systems\n\n**Advantages of 3-Phase:**\n- Higher average output voltage (≈3× half-wave value)\n- Much lower ripple → reduced filter size\n- Better power factor → reduced losses\n- Smoother torque in motor applications\n- More efficient transformer usage\n\n**Design Choice Factors:**\n1. Available supply (single-phase vs. three-phase)\n2. Power level (single-phase for <10kW typically)\n3. Ripple tolerance (depends on load requirements)\n4. Cost-benefit of filter vs. more SCRs',
    difficulty: 'hard'
  },

  // ============================================
  // DEVICE PROTECTION & RATINGS
  // ============================================
  {
    id: 'devprot-001',
    topic: 'Device Protection',
    question: 'Explain dv/dt capability and its limitation on thyristor operation.',
    answer: '**dv/dt Definition:**\nRate of change of anode-to-cathode voltage:\n$$\\frac{dv}{dt} = \\frac{\\Delta V}{\\Delta t}$$\n\n**Problem - Capacitive Coupling:**\nWhen forward voltage rises rapidly across SCR, the junction capacitance acts as a coupling element:\n$$i_c = C \\frac{dv}{dt}$$\n\nThis capacitive current can flow into gate region, causing parasitic gate triggering even without gate signal.\n\n**Typical dv/dt Limits:**\n- Standard SCRs: 200-500 V/μs\n- Fast SCRs: 1000+ V/μs\n- Thyristor conducts if triggered at wrong time (commutation failure)\n\n**Consequences of Exceeding dv/dt:**\n1. **Unintended turn-on** - SCR fires when it should not\n2. **Voltage regulation loss** - Rectifier cannot regulate properly\n3. **Increased losses** - Unwanted conduction increases I²R losses\n4. **Possible device damage** - If current limited, can cause junction heating\n\n**Design Mitigation:**\n\n**RC Snubber Network:**\n- Capacitor across thyristor limits dv/dt: $$\\frac{dv}{dt} \\approx \\frac{V}{RC}$$\n- Resistor dissipates capacitor discharge energy\n- Design: Choose C such that $$\\frac{dv}{dt} \\leq \\frac{V_{max}}{2 \\times R \\times C}$$\n\n**Example:**\nFor $$V_m = 400V$$, $$R_L = 10Ω$$, max $$dv/dt = 200 V/\\mu s$$:\n$$C_s = \\frac{400}{10 \\times 200 \\times 10^6} = 0.2 \\mu F$$\n\n**Safe Design:** Always apply snubber circuit when dv/dt concerns exist',
    difficulty: 'hard'
  },
  {
    id: 'devprot-002',
    topic: 'Device Protection',
    question: 'Explain di/dt capability and peak surge current ratings.',
    answer: '**di/dt Definition:**\nRate of change of anode current:\n$$\\frac{di}{dt} = \\frac{\\Delta I}{\\Delta t}$$\n\n**Problem - Current Concentration:**\nWhen SCR turns on (forward conduction begins), if current rises too rapidly:\n1. Not all of junction area conducts immediately\n2. Current concentrates in small region → **hot spot**\n3. High localized current density and power dissipation\n4. Local junction temperature rises rapidly\n5. Can exceed $$T_{j,max}$$ → device failure even though average current is safe\n\n**Typical di/dt Limits:**\n- Standard SCRs: 50-200 A/μs\n- Fast SCRs (smaller junction): 100+ A/μs\n- di/dt rating depends on gate current (higher gate current improves di/dt)\n\n**Peak Surge Current Rating ($$I_{FSM}$$):**\nMaximum allowable peak anode current (non-repetitive)\n- Typically 10-20× average forward current rating\n- Duration: one half-cycle only\n- Example: 100A average → 1000-2000A peak surge capability\n\n**Common Sources of High di/dt:**\n1. **Capacitive discharge** - Uncharged capacitor on load\n2. **Transformer inrush** - Initial magnetization current\n3. **Short circuit** - Low impedance transient path\n\n**Design Mitigation:**\n\n**Series Inductor:**\nLimits di/dt by: $$\\frac{di}{dt} = \\frac{V}{L}$$\n\nRequired inductance:\n$$L = \\frac{V_{peak}}{(di/dt)_{allowed}}$$\n\nExample ($$V = 400V$$, max $$di/dt = 50 A/\\mu s$$):\n$$L = \\frac{400}{50 \\times 10^6} = 8 \\mu H$$\n\n**Gate Current Boost:**\nApplying higher gate current improves di/dt capability (speeds up conduction spreading)\n\n**Circuit Inductance Minimization:**\nKeep lead lengths short, use wide conductors to minimize parasitic inductance',
    difficulty: 'hard'
  },

  // ============================================
  // DESIGN MARGINS & SAFETY FACTORS
  // ============================================
  {
    id: 'margin-001',
    topic: 'Design Margins',
    question: 'Calculate appropriate safety factors for voltage and current in thyristor circuit design.',
    answer: '**Voltage Safety Factors:**\n\n**1. Peak Inverse Voltage (PIV) Rating:**\nDevice rating should exceed maximum reverse voltage:\n$$V_{PIV(device)} \\geq SF_V \\times V_{max(reverse)}$$\n\nTypical safety factor: $$SF_V = 1.5 - 2.0$$\n\nExample:\nIf maximum reverse voltage = 400V, use device rated ≥600-800V PIV\n\n**2. Forward Blocking Voltage:**\nMust not exceed forward breakover voltage:\n$$V_{forward} < \\frac{V_{BO}}{SF_V}$$\n\nSafety factor: $$SF_V = 2.0 - 2.5$$\n\nExample:\nIf $$V_{BO} = 1000V$$, keep forward voltage <400-500V\n\n**Current Safety Factors:**\n\n**1. Average Current Derating:**\nDevice average current rating should exceed maximum expected:\n$$I_{avg(device)} \\geq SF_I \\times I_{avg(expected)}$$\n\nTypical safety factor: $$SF_I = 1.25 - 1.5$$\n\nExample:\nIf expected average current = 50A, use device rated ≥62-75A\n\n**2. Peak Surge Current:**\nMust not exceed $$I_{FSM}$$:\n$$I_{peak} < \\frac{I_{FSM}}{SF_I}$$\n\nSafety factor: $$SF_I = 1.5 - 2.0$$\n\n**3. RMS Current:**\nFor thermal derating calculations:\n$$T_j = T_a + P_{avg} \\times \\theta_{jc}$$\n\nDesign margin: Limit $$T_j$$ to 70-80% of $$T_{j,max}$$ for reliability\n\n**Combined Design Example:**\n\nGiven:\n- Peak supply voltage = 480V\n- Expected average current = 40A\n- Expected peak current = 300A\n\n**Selection Criteria:**\n- Voltage rating: 480 × 1.5 = 720V → use 1000V device\n- Average current: 40 × 1.5 = 60A → use 150A rated device (good margin)\n- Peak surge: 300 × 1.5 = 450A → verify $$I_{FSM} > 450A$$\n\n**Reliability Benefit:**\nProper derating increases device lifetime exponentially (Arrhenius relationship)',
    difficulty: 'hard'
  },

  // ============================================
  // DEVICE MODELS & CHARACTERISTICS
  // ============================================
  {
    id: 'model-001',
    topic: 'Device Models',
    question: 'Derive and explain the two-transistor equivalent model equations for SCR.',
    answer: '**Two-Transistor Model Derivation:**\n\nFor SCR as two transistors T1 (PNP) and T2 (NPN):\n\n**Base current relationships:**\n$$I_{B1} = I_{C2}$$\n$$I_{B2} = I_G + I_{C1}$$\n\n**Collector currents:**\n$$I_{C1} = \\alpha_1 I_{E1} = \\alpha_1(I_A + I_{C2})$$\n$$I_{C2} = \\alpha_2 I_{E2} = \\alpha_2(I_G + I_{C1} + I_{CBO})$$\n\n**Substituting $$I_{C2}$$ into $$I_{C1}$$:**\n$$I_{C1} = \\alpha_1[I_A + \\alpha_2(I_G + I_{C1} + I_{CBO})]$$\n$$I_{C1} = \\alpha_1 I_A + \\alpha_1 \\alpha_2(I_G + I_{CBO}) + \\alpha_1 \\alpha_2 I_{C1}$$\n$$I_{C1}(1 - \\alpha_1 \\alpha_2) = \\alpha_1[I_A + \\alpha_2(I_G + I_{CBO})]$$\n\n**Final equation for anode current:**\n$$\\boxed{I_A = \\frac{(\\alpha_1 + \\alpha_2)I_G + (\\alpha_1 + \\alpha_2)I_{CBO}}{1 - (\\alpha_1 + \\alpha_2)}}$$\n\nOr simplified:\n$$I_A = \\frac{(\\alpha_1 + \\alpha_2)I_G + I_{CO}}{1 - (\\alpha_1 + \\alpha_2)}$$\n\nWhere $$I_{CO} = (\\alpha_1 + \\alpha_2)I_{CBO}$$\n\n**Key Insight:**\nWhen $$\\alpha_1 + \\alpha_2 \\to 1$$, denominator → 0, causing exponential growth of $$I_A$$\n\nThis is the **latching condition** - small change in $$\\alpha$$ values causes large current increase\n\n**Practical Application:**\nThis equation explains:\n1. Why small gate current triggers large anode current (regenerative feedback)\n2. Why latching current must be exceeded to sustain conduction\n3. Why turn-off requires reducing $$I_A$$ below holding current\n4. Temperature effects on $$\\alpha_1, \\alpha_2$$ cause thermal runaway if not controlled',
    difficulty: 'hard'
  },

  // ============================================
  // CONVERTER TOPOLOGIES & COMMUTATION CLASSES
  // ============================================
  {
    id: 'comm-001',
    topic: 'Commutation Techniques',
    question: 'Explain Class-E resonant commutation for thyristors.',
    answer: '**Class-E Commutation (Complementary/Bridge Configuration):**\n\n**Circuit Topology:**\nFull bridge of 4 SCRs arranged in opposite pairs:\n- **SCR1 & SCR4:** Upper diagonal pair\n- **SCR2 & SCR3:** Lower diagonal pair\n\n**Operating Sequence:**\n\n1. **Interval 1:** SCR1 and SCR4 ON\n   - Current flows through load from phase A\n   - SCR2 and SCR3 OFF\n\n2. **Commutation:** When SCR2 is gated (positive gate signal):\n   - SCR2 turns ON → creates low impedance path\n   - Current commutates from SCR1 to SCR2\n   - SCR1 anode current drops → commutates OFF (reverse biased)\n   - SCR4 remains ON (reverse bias on its gate keeps it blocking)\n\n3. **Interval 2:** SCR2 and SCR3 ON\n   - Current flows through load from phase B (opposite polarity)\n   - SCR1 and SCR4 OFF\n\n**Advantages:**\n- **Natural commutation** - Old path blocks when new path turns on\n- **No external commutation circuit** needed\n- **Simple control** - Just gate pulses for ON commands\n- **Reliable** - Guaranteed commutation by complementary arrangement\n\n**Current Path Blocking Mechanism:**\nWhen SCR2 turns on with SCR1 already conducting:\n- Both act in series momentarily\n- SCR1 sees reverse voltage → blocks\n- Load current transfers to SCR2\n- Clean commutation without snubber energy loss\n\n**Applications:**\n- **AC voltage controllers** (lighting dimmers)\n- **AC-AC converters** (frequency changers)\n- **Inverters** (DC-to-AC conversion)\n- **Motor speed controllers** (AC induction motor)\n\n**Design Considerations:**\n- All 4 SCRs must have matched characteristics\n- Gate pulses must be synchronized with load voltage\n- Protection circuits on all SCRs (snubbers for static dv/dt)\n- Heat dissipation proportional to number of devices',
    difficulty: 'hard'
  },

  // ============================================
  // ADVANCED TOPICS - NUMBER BASES (BONUS)
  // ============================================
  {
    id: 'num-001',
    topic: 'Number Systems',
    question: 'Convert binary number 10110101 to decimal and hexadecimal.',
    answer: '**Binary to Decimal Conversion:**\n\n$$10110101_2 = 1×2^7 + 0×2^6 + 1×2^5 + 1×2^4 + 0×2^3 + 1×2^2 + 0×2^1 + 1×2^0$$\n\n$$= 128 + 0 + 32 + 16 + 0 + 4 + 0 + 1$$\n\n$$= 181_{10}$$\n\n**Binary to Hexadecimal Conversion:**\n\nGroup binary digits in groups of 4 from right:\n$$1011 \\ 0101_2$$\n\nConvert each group:\n- $1011_2 = B_{16}$ (11 in decimal)\n- $0101_2 = 5_{16}$ (5 in decimal)\n\n$$10110101_2 = B5_{16}$$\n\n**Verification:**\n$$B5_{16} = 11×16^1 + 5×16^0 = 176 + 5 = 181_{10}$$ ✓\n\n**Digital Electronics Applications:**\n- Binary: Direct digital logic (on/off, 1/0)\n- Hexadecimal: Compact representation of memory addresses and register values\n- Example: 8-bit register $$11011010_2 = DA_{16}$$',
    difficulty: 'easy'
  }
];

export default ALL_EXAM_CARDS;
