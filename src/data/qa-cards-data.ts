// Comprehensive Q&A cards for Power Electronics based on HEXCO exam content
export const qaCardsData = [
  // Thyristor Basics
  {
    topic: 'Thyristor Fundamentals',
    question: 'What is the two-transistor model explanation for SCR latching?',
    answer: `The SCR contains two transistors connected in positive feedback loop:
- T₁ (PNP) and T₂ (NPN)
- Collector of T₁ drives base of T₂
- Collector of T₂ drives base of T₁

When gate current applied:
- Acts as base current for T₂
- Generates collector current ($$I_{C2}$$)
- This becomes base current ($$I_{B1}$$) for T₁
- Creates collector current ($$I_{C1}$$)
- Which becomes base current ($$I_{B2}$$) for T₂
- Regenerative feedback increases until both transistors saturate
- Current $$I_A = \\frac{I_g(1 + \\alpha_2)}{1 - (\\alpha_1 + \\alpha_2)}$$

Once $$(\\alpha_1 + \\alpha_2) \\rightarrow 1$$, anode current becomes very large and SCR latches ON.`,
    difficulty: 'hard',
    tags: ['thyristor', 'model'],
  },

  {
    topic: 'Gate Triggering',
    question: 'Compare DC, AC, and Pulse gate triggering methods. Which is preferred and why?',
    answer: `**DC Gate Triggering:**
- Direct DC voltage between gate and cathode
- Simple but no isolation between power and control
- Continuous DC signal required → high gate power loss
- Max ±20V on gate terminal

**AC Gate Triggering:**
- Two methods: Resistance (R) and RC triggering
- R-triggering: max 90° firing angle, simple
- RC-triggering: up to 160° firing angle, better control
- Transformer provides 2000V+ isolation
- Better noise immunity

**Pulse Gate Triggering:**
- High-frequency pulse train via transformer
- No continuous gate current → low losses (preferred method)
- Excellent for inductive circuits with back-EMF
- Pulse transformer coupling 1:5 typical
- Response time <2 μs
- Allows precise timing control

**Preferred: Pulse triggering** because:
1. Minimal gate power dissipation
2. Best isolation capability
3. Fastest response (for dynamic circuits)
4. Flexibility for complex control algorithms`,
    difficulty: 'hard',
    tags: ['gate-drive', 'triggering'],
  },

  {
    topic: 'Device Protection',
    question: 'What is dv/dt effect on SCR and how to prevent unintended firing?',
    answer: `**dv/dt Effect:**
SCR junction acts as capacitor. During turn-off, voltage rises rapidly:
$$i_c = C \\frac{dV}{dt}$$

This capacitive current can equal or exceed gate threshold current, causing unintended turn-on even without gate signal!

**Prevention - RC Snubber:**
1. **Capacitor:** $$C_s = \\frac{i_c}{(dv/dt)_{allowed}}$$
   - Limits current by absorbing voltage rise
   - Typical: 0.1-0.22 μF

2. **Resistor:** $$R_s = \\frac{V_{peak}}{I_{peak}}$$
   - Dissipates stored energy
   - Typical: 15-30 Ω, 50-100W rated

3. **Example:** For 400V supply with 200V/μs rating and SF=2:
   - Allowed dv/dt = 100 V/μs
   - Required C ≈ 0.1 μF
   - Required R ≈ 18Ω

**Result:** Snubber maintains dv/dt below safe level, preventing false triggering.`,
    difficulty: 'hard',
    tags: ['protection', 'snubber'],
  },

  {
    topic: 'Commutation',
    question: 'Why is commutation necessary for SCRs? What does it accomplish?',
    answer: `**Why Commutation is Needed:**
SCR can only be turned ON by gate signal. It cannot be turned OFF by gate!
To turn OFF, must force anode current to zero and apply reverse voltage.

**What Commutation Accomplishes:**

1. **Reduces forward current to zero:**
   - Must drop below holding current $$I_H$$
   - External circuit forces this reduction
   - Typical time: 5-100 μs

2. **Applies reverse voltage:**
   - Recombines excess charge carriers in junction
   - Restores forward-blocking capability
   - Prevents false turn-on from dv/dt

3. **Enables next cycle:**
   - Prepares device for next gate trigger
   - Completes turn-OFF sequence

**Commutation methods:**
- **Natural (AC circuits):** Supply voltage naturally zeros each half-cycle
- **Forced (DC circuits):** Commutation circuit creates reverse voltage
  - Class A: Load-based (simple, high frequency)
  - Class B: Capacitive (chopper circuits)
  - Class C: Complementary (inverters)
  - Classes D, E: Auxiliary commutation

**Practical impact:**
Without commutation, SCR stays ON indefinitely!
Commutation circuit is essential for all power electronic control applications.`,
    difficulty: 'medium',
    tags: ['commutation', 'turnoff'],
  },

  {
    topic: 'Rectifier Analysis',
    question: 'Derive average output voltage equation for half-wave rectifier as function of firing angle.',
    answer: `**Half-Wave Rectifier Average Voltage:**

For input $$v_s = V_m \\sin(\\omega t)$$ with firing angle α:

SCR conducts from α to π (180°)

Average voltage:
$$V_{dc} = \\frac{1}{\\pi} \\int_{\\alpha}^{\\pi} V_m\\sin(\\omega t) d(\\omega t)$$

$$V_{dc} = \\frac{V_m}{\\pi}[-\\cos(\\omega t)]_{\\alpha}^{\\pi}$$

$$V_{dc} = \\frac{V_m}{\\pi}[1 + \\cos(\\alpha)]$$

**For 400V RMS:**
$$V_m = 565.7V$$
$$V_{dc} = 180.1(1 + \\cos\\alpha)\\,V$$

**Examples:**
- α = 0°: V_dc = 360.2V (maximum)
- α = 45°: V_dc = 217V
- α = 90°: V_dc = 90V (minimum)
- α > 120°: V_dc approaches zero

**Key insight:** Firing angle controls output voltage from maximum (0°) to minimum (90°+), enabling power control.`,
    difficulty: 'hard',
    tags: ['rectifier', 'voltage-control'],
  },

  {
    topic: 'Thermal Management',
    question: 'How is junction temperature calculated for an SCR and what is thermal runaway?',
    answer: `**Junction Temperature Calculation:**

$$T_j = T_a + P \\times \\theta_{j-a}$$

Where:
- $$T_a$$ = Ambient temperature
- $$P$$ = Total power dissipation (conduction + switching + gate)
- $$\\theta_{j-a}$$ = Thermal resistance (junction to ambient)
  - Composed of: $$\\theta_{j-c}$$ (device) + $$\\theta_{c-a}$$ (heatsink)

**Example:**
- Conduction loss: $$P = V_f \\times I_{avg} = 1.5V \\times 20A = 30W$$
- Device resistance: $$\\theta_{j-c} = 0.75°C/W$$
- Heatsink resistance: $$\\theta_{c-a} = 0.5°C/W$$
- Total: $$\\theta_{j-a} = 1.25°C/W$$
- At $$T_a = 50°C$$:
  $$T_j = 50 + 30 \\times 1.25 = 87.5°C$$ (Safe if max = 150°C)

**Thermal Runaway:**

Forward voltage drops with temperature (~2mV/°C):
$$V_f(T) = V_f(ref) - \\alpha(T - T_{ref})$$

If temperature rises:
- $$V_f$$ decreases → current increases
- More current → more heat
- Heat causes more temperature rise
- Creates positive feedback loop!

**Runaway condition:**
$$\\frac{\\partial P}{\\partial T} > \\frac{1}{\\theta_{j-a}}$$

Device becomes unstable and destroys itself!

**Prevention:**
- Use adequate heatsink (lower $$\\theta_{c-a}$$)
- Temperature sensor with current limiting
- Forced air cooling
- Parallel devices with current sharing resistors`,
    difficulty: 'hard',
    tags: ['thermal', 'heat-management'],
  },

  {
    topic: 'Number Bases',
    question: 'Convert 200 decimal to binary, hexadecimal, and octal.',
    answer: `**Decimal 200 Conversion:**

**To Binary (Repeated ÷2):**
$$200 ÷ 2 = 100 R0$$
$$100 ÷ 2 = 50 R0$$
$$50 ÷ 2 = 25 R0$$
$$25 ÷ 2 = 12 R1$$
$$12 ÷ 2 = 6 R0$$
$$6 ÷ 2 = 3 R0$$
$$3 ÷ 2 = 1 R1$$
$$1 ÷ 2 = 0 R1$$

Reading bottom-to-top: $$200_{10} = 11001000_2$$

**To Hexadecimal (Repeated ÷16):**
$$200 ÷ 16 = 12 R8$$
$$12 ÷ 16 = 0 R12$$

Convert: 12=C, 8=8
$$200_{10} = C8_{16}$$

**To Octal (Repeated ÷8):**
$$200 ÷ 8 = 25 R0$$
$$25 ÷ 8 = 3 R1$$
$$3 ÷ 8 = 0 R3$$

Reading bottom-to-top: $$200_{10} = 310_8$$

**Verification:**
- Binary: $$128 + 64 + 8 = 200$$ ✓
- Hex: $$12 \\times 16 + 8 = 200$$ ✓
- Octal: $$3 \\times 64 + 1 \\times 8 = 200$$ ✓

**Direct conversions:**
Binary to Hex (group by 4): $$1100\\ 1000 = C8_{16}$$
Binary to Octal (group by 3): $$011\\ 001\\ 000 = 310_8$$`,
    difficulty: 'medium',
    tags: ['number-bases', 'conversion'],
  },

  {
    topic: 'Opto-Electronic Devices',
    question: 'How does an LED produce light and what wavelengths represent different colors?',
    answer: `**LED Light Emission:**

When forward-biased:
1. Electrons injected into p-layer
2. Holes injected into n-layer
3. Carriers recombine near junction
4. Energy released as photons (light)

**Energy-wavelength relationship:**
$$E = h\\nu = \\frac{hc}{\\lambda}$$

Where h = 6.63×10⁻³⁴ J·s (Planck constant)

**Color and wavelength:**
- Red LED: 620-700 nm (V_f ≈ 1.6-2.0V)
- Yellow: 590-620 nm (V_f ≈ 1.9-2.1V)
- Green: 500-570 nm (V_f ≈ 1.9-2.2V)
- Blue: 450-500 nm (V_f ≈ 3.0-3.5V)
- UV: <400 nm (V_f ≈ 3.5-4.5V)

**Shorter wavelength = Higher forward voltage**

**Typical operating point:**
- Current: 10-20 mA
- Voltage drop: 1.5-3.5V depending on color
- Maximum power: 100-500 mW typically
- Lifetime: 50,000-100,000 hours

**Current limiting:**
$$R = \\frac{V_{supply} - V_f}{I_{LED}}$$

Example: 5V supply, red LED (2V), 10mA target
$$R = \\frac{5 - 2}{0.01} = 300\\,\\Omega$$`,
    difficulty: 'medium',
    tags: ['opto', 'led'],
  },

  {
    topic: 'Device Ratings',
    question: 'What is forward surge current (I_FSM) rating and why is it critical?',
    answer: `**Forward Surge Current ($$I_{FSM}$$):**

Maximum peak anode current SCR can withstand for single half-cycle without damage.

**Typical values:** 10-20× average rated current
Example: 50A average SCR has $$I_{FSM} \\approx 500-1000A$$

**Why it matters:**

1. **Power-on inrush:**
   - At switch-on, capacitor banks discharge
   - Creates very high peak currents
   - Can exceed $$I_{FSM}$$ and destroy device!

2. **Short-circuit protection:**
   - Fault current can be $$I_m/R_{fault}$$
   - For 400V / 10mΩ fault = 40,000A (way above $$I_{FSM}$$!)
   - Must add series inductance to limit surge

3. **Design requirement:**
   Select device with: $$I_{FSM} > 3 \\times I_{peak(actual)}$$

**Limiting surge current:**

Series inductor:
$$L = \\frac{V_m}{(di/dt)_{allowed}} = \\frac{565.7}{150 \\times 10^6} = 3.77\\,\\mu H$$

With 5 μH inductor:
Peak inrush current limited to safe level

**Safe design margin:**
- Calculate expected peak current during power-on
- Select device with 3× that peak rating
- Add series inductance if needed
- Verify thermally during commissioning

This prevents device burnout from inrush currents.`,
    difficulty: 'hard',
    tags: ['ratings', 'surge-current'],
  }
];

export default qaCardsData;
