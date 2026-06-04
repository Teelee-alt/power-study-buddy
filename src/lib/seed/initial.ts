// Initial topics with a handful of sample cards each so the app is usable
// out of the box. Admin can add more via the card manager.
type Difficulty = "easy" | "medium" | "hard";
export interface SeedCard { q: string; a: string; d: Difficulty }
export interface SeedTopic { name: string; description: string; cards: SeedCard[] }

export const INITIAL_TOPICS: SeedTopic[] = [
  {
    name: "Power Semiconductor Diodes",
    description: "PN junction behaviour, fast/Schottky diodes, reverse recovery, and snubber design.",
    cards: [
      { d: "easy", q: "What is a power diode?", a: "A two-terminal semiconductor device that allows current to flow in one direction (forward biased) and blocks current in the reverse direction. Power diodes are rated for high currents and voltages and are used in rectifiers, freewheeling paths, and snubbers." },
      { d: "easy", q: "Name three common types of power diodes.", a: "1. General-purpose (line-frequency) rectifier diodes.\n2. Fast-recovery diodes (short reverse recovery time).\n3. Schottky diodes (low forward drop, very fast switching, typically below 200 V)." },
      { d: "medium", q: "Define reverse recovery time $t_{rr}$.", a: "$t_{rr}$ is the time required for a diode to switch from forward conduction to its reverse blocking state. It is the interval from when current crosses zero going negative to when the reverse current decays to a defined fraction (typically 25%) of its peak. Short $t_{rr}$ reduces switching loss." },
      { d: "medium", q: "Why are freewheeling diodes used across inductive loads?", a: "Inductors oppose changes in current. When a switch interrupts inductor current, the stored energy $\\tfrac{1}{2}LI^2$ would otherwise produce a destructive voltage spike $v = L \\, di/dt$. A freewheeling (flyback) diode provides a low-impedance path for that current to circulate and decay safely." },
      { d: "hard", q: "Design rule of thumb for an RC snubber across a diode.", a: "Choose $R$ so that $R \\approx \\sqrt{L_s / C}$, where $L_s$ is the stray inductance and $C$ the snubber capacitor. $C$ is sized so that $\\tfrac{1}{2}CV^2$ absorbs the trapped energy $\\tfrac{1}{2}L_s I_{rr}^2$. The snubber damps the ringing produced by reverse recovery." },
    ],
  },
  {
    name: "Power Transistors",
    description: "BJT, MOSFET and IGBT structures, switching behaviour and the safe operating area.",
    cards: [
      { d: "easy", q: "List three common power transistor types.", a: "Power BJT (bipolar junction transistor), power MOSFET (majority carrier, voltage controlled), and IGBT (insulated-gate bipolar transistor — combines MOSFET gate with BJT-like conduction)." },
      { d: "medium", q: "Why is the IGBT preferred at medium voltage and current ratings?", a: "The IGBT combines the low conduction drop of a BJT (bipolar conduction in the drift region) with the simple, high-impedance gate drive of a MOSFET. It blocks high voltages (up to several kV), handles large currents, and switches faster than a BJT, making it ideal for motor drives and inverters in the 600 V – 6.5 kV range." },
      { d: "medium", q: "Define the Safe Operating Area (SOA).", a: "The SOA is the region on the $V_{CE}$–$I_C$ (or $V_{DS}$–$I_D$) plane within which the device can be safely operated. It is bounded by the maximum current, maximum voltage, the maximum power dissipation hyperbola, and the secondary-breakdown line (for BJTs)." },
      { d: "hard", q: "Compare turn-off losses in a MOSFET vs an IGBT.", a: "MOSFETs are majority-carrier devices, so turn-off is fast (no stored minority charge). IGBTs have a current tail caused by recombination of minority carriers in the n-drift region after the channel pinches off, which increases turn-off energy $E_{off}$ — especially at high temperature. This tail limits the practical switching frequency of IGBTs." },
    ],
  },
  {
    name: "Thyristors (SCR)",
    description: "Structure, two-transistor model, triggering, turn-off and ratings of SCRs.",
    cards: [
      { d: "easy", q: "What is an SCR?", a: "A Silicon Controlled Rectifier — a four-layer (PNPN) three-terminal device (anode, cathode, gate). Once triggered by a gate pulse, it latches on and conducts until the anode current falls below the holding current." },
      { d: "medium", q: "Explain the two-transistor analogy of an SCR.", a: "An SCR is modelled as two interconnected transistors: a PNP and an NPN, with the collector of each driving the base of the other. A small gate current $I_G$ initiates regenerative feedback ($\\alpha_1 + \\alpha_2 \\to 1$), turning both transistors fully on and latching the device." },
      { d: "medium", q: "What is meant by natural (line) commutation?", a: "Turning off an SCR by relying on the AC supply: the anode current naturally falls to zero each half-cycle, allowing the device to recover its blocking state without an external commutation circuit. Used in phase-controlled rectifiers and AC voltage controllers." },
      { d: "hard", q: "Define holding current $I_H$ and latching current $I_L$.", a: "$I_L$ is the minimum anode current required immediately after triggering for the SCR to stay on once the gate signal is removed. $I_H$ is the minimum anode current required to keep the device on during steady-state conduction. Typically $I_L \\approx 2$ to $3 \\times I_H$." },
    ],
  },
  {
    name: "Phase-Controlled Rectifiers",
    description: "Single- and three-phase converters, output voltage with firing angle, and conduction modes.",
    cards: [
      { d: "easy", q: "What is the firing angle $\\alpha$?", a: "The delay angle, measured from the natural commutation point (the instant the SCR would conduct if it were a diode), at which the SCR is triggered. Varying $\\alpha$ varies the average output voltage of a phase-controlled rectifier." },
      { d: "medium", q: "Average output voltage of a 1-phase half-wave controlled rectifier (R load).", a: "$$V_{avg} = \\frac{V_m}{2\\pi}\\,(1 + \\cos\\alpha)$$ where $V_m$ is the peak supply voltage. At $\\alpha = 0$ this reduces to the diode case $V_m/\\pi$." },
      { d: "medium", q: "Average output voltage of a 1-phase full-wave fully-controlled bridge (R load).", a: "$$V_{avg} = \\frac{2 V_m}{\\pi}\\cos\\alpha$$ Output is positive for $0 \\le \\alpha < 90°$ (rectifier mode) and negative for $90° < \\alpha \\le 180°$ (inverter mode, with a suitable DC source on the load side)." },
      { d: "hard", q: "Continuous vs discontinuous conduction in a controlled rectifier.", a: "Continuous conduction: load current never falls to zero; the output voltage waveform follows the predicted $V_{avg}$ formula. Discontinuous conduction: load current reaches zero before the next SCR fires, the device turns off, and the output voltage equals the back-EMF (or zero) during the gap. Discontinuous mode raises $V_{avg}$ for the same $\\alpha$ and complicates analysis." },
    ],
  },
  {
    name: "AC Voltage Controllers",
    description: "Phase control of AC loads, integral cycle control, harmonics, and power factor.",
    cards: [
      { d: "easy", q: "Two basic types of AC voltage controllers.", a: "1. Phase-angle control (firing the thyristors at angle $\\alpha$ each half-cycle).\n2. Integral-cycle (on-off) control — switching the load on for $n$ cycles and off for $m$ cycles." },
      { d: "medium", q: "RMS output of a 1-phase AC voltage controller with R load.", a: "$$V_{rms} = V_s \\sqrt{\\tfrac{1}{\\pi}\\left[(\\pi-\\alpha) + \\tfrac{1}{2}\\sin 2\\alpha\\right]}$$ where $V_s$ is the source RMS voltage and $\\alpha$ the firing angle." },
      { d: "hard", q: "Why does phase-angle control degrade input power factor?", a: "Phase-angle control delays the current pulse relative to the voltage, producing a fundamental component lagging the supply (displacement factor < 1) and rich low-order harmonics (distortion factor < 1). Overall PF = displacement × distortion, both of which fall as $\\alpha$ increases." },
    ],
  },
  {
    name: "DC-DC Converters (Choppers)",
    description: "Buck, boost, buck-boost and Cuk topologies, duty cycle, and conduction modes.",
    cards: [
      { d: "easy", q: "Define duty cycle $D$.", a: "$D = t_{on}/T$, the fraction of the switching period $T$ that the switch is on. $0 \\le D \\le 1$." },
      { d: "medium", q: "Output voltage of an ideal buck converter (CCM).", a: "$$V_o = D\\,V_{in}$$ Step-down only. Input current is pulsating; output current is smooth (LC filter)." },
      { d: "medium", q: "Output voltage of an ideal boost converter (CCM).", a: "$$V_o = \\frac{V_{in}}{1 - D}$$ Step-up only. Input current is smooth; output current is pulsating." },
      { d: "hard", q: "Buck-boost converter output voltage and polarity.", a: "$$V_o = -\\frac{D}{1 - D}\\,V_{in}$$ The output polarity is inverted with respect to the input. Can step up or step down depending on whether $D > 0.5$ or $D < 0.5$." },
      { d: "medium", q: "CCM vs DCM in a chopper.", a: "Continuous Conduction Mode (CCM): inductor current never reaches zero. Discontinuous Conduction Mode (DCM): inductor current falls to zero for part of each cycle. DCM occurs at light load or with small $L$, and changes the voltage transfer ratio to depend on load." },
    ],
  },
  {
    name: "Inverters (DC-AC)",
    description: "Single- and three-phase voltage source inverters, PWM strategies, and harmonics.",
    cards: [
      { d: "easy", q: "What is a voltage source inverter (VSI)?", a: "A converter that takes a DC voltage source and produces a controllable AC output voltage with adjustable amplitude and frequency, typically using switches like IGBTs with antiparallel diodes." },
      { d: "medium", q: "Fundamental RMS output of a 1-phase full-bridge square-wave inverter.", a: "$$V_{1,rms} = \\frac{4 V_{dc}}{\\pi \\sqrt{2}} \\approx 0.9\\,V_{dc}$$ The output contains odd harmonics: 3rd, 5th, 7th, ... with amplitudes $1/n$ of the fundamental." },
      { d: "medium", q: "What is sinusoidal PWM (SPWM)?", a: "A modulation method in which a sinusoidal reference (modulating) signal is compared with a high-frequency triangular carrier. The switch turns on whenever the reference is greater than the carrier. The resulting pulse train has a fundamental that matches the reference, and dominant harmonics clustered around the carrier frequency." },
      { d: "hard", q: "Modulation index $m_a$ in SPWM and overmodulation.", a: "$m_a = \\hat{V}_{ref}/\\hat{V}_{carrier}$. For $0 \\le m_a \\le 1$ the fundamental output is linearly proportional to $m_a$ and equals $m_a V_{dc}/2$ (per phase, half-bridge). For $m_a > 1$ (overmodulation), the output is non-linear and approaches the square-wave limit of $4V_{dc}/\\pi$ per phase, with re-emergence of low-order harmonics." },
      { d: "medium", q: "Define Total Harmonic Distortion (THD).", a: "$$\\text{THD} = \\frac{\\sqrt{\\sum_{n=2}^{\\infty} V_n^2}}{V_1}$$ where $V_n$ is the RMS of the $n$-th harmonic and $V_1$ the fundamental." },
    ],
  },
  {
    name: "Switching Power Supplies",
    description: "Flyback, forward, push-pull, half-bridge and full-bridge isolated SMPS topologies.",
    cards: [
      { d: "easy", q: "Why are SMPS preferred over linear regulators?", a: "Much higher efficiency (typically 80–95% vs 30–60%), smaller size and weight at a given power level (due to high switching frequency), and the ability to step up, step down, or invert with isolation." },
      { d: "medium", q: "Flyback converter — basic operation.", a: "A buck-boost derived isolated topology. When the switch is on, energy is stored in the transformer's magnetising inductance. When the switch is off, this energy transfers to the secondary through the rectifier diode. Output voltage: $V_o = \\tfrac{N_s}{N_p}\\cdot\\tfrac{D}{1-D}\\,V_{in}$ (CCM, ideal)." },
      { d: "hard", q: "Forward converter vs flyback — key differences.", a: "Forward: transformer transfers energy directly during the on-time; needs an output inductor and a reset mechanism (e.g. reset winding) to demagnetise the core. Better for higher power (>100 W) and lower output ripple.\nFlyback: transformer acts as a coupled inductor storing energy; no output inductor required; simpler and cheaper at low power (<150 W) but has higher peak currents and ripple." },
    ],
  },
  {
    name: "Gate Drive Circuits",
    description: "Isolation, bootstrap, totem-pole drivers, optocouplers and gate-charge requirements.",
    cards: [
      { d: "easy", q: "Why is a dedicated gate driver needed for a power MOSFET/IGBT?", a: "The gate is a capacitive load and requires fast, high-current pulses (often several amperes) to charge/discharge it quickly enough to keep switching losses low. A logic-level signal cannot supply that current directly." },
      { d: "medium", q: "What is a bootstrap circuit in a half-bridge driver?", a: "A capacitor (the bootstrap capacitor) is charged from a low-side supply through a fast diode whenever the low-side switch is on. While the high-side switch turns on, this capacitor supplies the floating gate-driver power referenced to the switching node, eliminating the need for a separate isolated supply for the high-side gate." },
      { d: "hard", q: "Define gate charge $Q_g$ and its role in driver sizing.", a: "$Q_g$ is the total charge that must be moved into the gate to switch the device fully on at a given $V_{GS}$. Average gate drive current at switching frequency $f_s$ is $I_{G(avg)} = Q_g \\cdot f_s$. The driver and bootstrap capacitor must source/sink this without excessive voltage droop." },
    ],
  },
  {
    name: "Protection Circuits",
    description: "Snubbers, overcurrent, overvoltage, thermal protection, fuses and crowbar circuits.",
    cards: [
      { d: "easy", q: "Purpose of an RC snubber across a switch.", a: "To slow down the rate of voltage rise $dv/dt$ across the switch during turn-off, suppress ringing caused by stray inductance, and limit voltage spikes — protecting the device and reducing EMI." },
      { d: "medium", q: "What is a crowbar protection circuit?", a: "An overvoltage protection circuit that, when triggered, short-circuits the supply through a thyristor (the 'crowbar') to force a fast blowing of the upstream fuse. Used to protect sensitive loads from a regulator failing in a way that lets the input voltage through." },
      { d: "medium", q: "Why are semiconductor fuses (I²t fuses) used in power electronics?", a: "Semiconductor devices fail very quickly under fault current. Standard fuses are too slow. Semiconductor fuses have a low $I^2 t$ rating that must be less than the device's $I^2 t$ withstand, ensuring the fuse clears before the device is destroyed." },
    ],
  },
  {
    name: "Power Electronics Applications",
    description: "Motor drives, UPS, battery chargers, induction heating, HVDC and renewable interfaces.",
    cards: [
      { d: "easy", q: "Why use a variable frequency drive (VFD) for an induction motor?", a: "Motor speed $n_s = 120 f / P$ depends on supply frequency. Varying $f$ (and proportionally $V$ to maintain constant flux, the V/f rule) allows smooth speed control, energy saving on variable-torque loads, and soft starting." },
      { d: "medium", q: "Online vs offline UPS — key difference.", a: "Online (double-conversion) UPS continuously converts AC→DC→AC, so the load is always supplied from the inverter. Transition to battery is seamless (0 ms). Offline (standby) UPS supplies the load from the mains directly and only switches to the inverter on failure, introducing a brief transfer time (~4–10 ms)." },
      { d: "hard", q: "Why is HVDC preferred for very long transmission lines?", a: "HVDC has lower line losses (no skin effect, no reactive component), allows asynchronous interconnection of grids of different frequencies, has no charging current limit on cables (so submarine links can be very long), and breaks even with HVAC at distances around 600 km (overhead) or 50 km (cable)." },
    ],
  },
  {
    name: "Advanced Topics",
    description: "Soft switching, resonant converters, wide-bandgap devices (SiC, GaN) and power quality.",
    cards: [
      { d: "easy", q: "What is soft switching?", a: "Switching a device when either its voltage is zero (ZVS) or its current is zero (ZCS), eliminating the simultaneous voltage-current overlap and drastically reducing switching losses." },
      { d: "medium", q: "Advantages of SiC and GaN devices over silicon.", a: "Wider bandgap → higher breakdown field, allowing thinner drift regions with lower $R_{DS(on)}$ for a given voltage rating. Higher thermal conductivity (SiC), higher switching speed and lower switching losses. Result: smaller passives, higher efficiency, higher operating temperature." },
      { d: "hard", q: "Resonant LLC converter — why is it popular?", a: "It achieves ZVS over a wide load range, has very low EMI thanks to sinusoidal currents, and uses the transformer's leakage and magnetising inductances as part of the resonant tank, removing the need for an extra inductor. Output is regulated by varying the switching frequency around the resonant frequency." },
    ],
  },
];
