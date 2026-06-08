# Power Electronics Exam Revision Platform

## Complete Course Overview

This platform provides comprehensive exam preparation for **HEXCO National Diploma - Power Electronics** with 40+ professional flashcards covering all topics from past papers (October 2019 - March 2022).

## Course Content

### 1. Thyristor Fundamentals
- Four-layer semiconductor device structure (p-n-p-n)
- Two-transistor model and latching mechanism
- Forward blocking, forward conduction, reverse blocking states
- Latching current and holding current characteristics
- V-I characteristics and operating regions

### 2. Thyristor Devices
- **SCR (Silicon Controlled Rectifier):** High-power capability, requires external commutation
- **GTO (Gate Turn-Off):** Direct OFF control, higher gate losses, suitable for inverters
- **Thyristor device comparison:** Ratings, applications, advantages/disadvantages
- **Schottky diodes:** Fast recovery, low forward voltage drop

### 3. Gate Drive & Triggering
- **DC gate triggering:** Simple but no isolation
- **AC gate triggering:** R-method (0-90°), RC-method (0-160°)
- **Pulse gate triggering:** Via pulse transformer, best isolation and efficiency
- **UJT oscillator circuits:** For synchronized gate drive at 50/60 Hz
- Gate current requirements and ratings

### 4. Commutation Techniques
Five classes of forced commutation:
- **Class A:** Self/load commutation (simple, high frequency >1000Hz)
- **Class B:** Capacitive commutation (chopper circuits)
- **Class C:** Complementary commutation (inverters, <1000Hz)
- **Class D:** Auxiliary SCR commutation (Jones chopper)
- **Class E:** External pulse commutation (precise control)

**Natural commutation** for AC circuits (zero-crossing turn-off)

### 5. Protection Circuits
- **Dv/dt protection:** RC snubber network (capacitor + resistor)
- **Di/dt protection:** Series inductor limiting
- **Gate protection:** Zener diode clamping, blocking diode
- **Thermal management:** Heatsinks, forced cooling, temperature sensors
- **Surge current limiting:** Inductance-based current limiting

### 6. Power Electronics Applications
- **Single-phase half-wave rectifier:** Output voltage $$V_{dc} = \frac{V_m}{\pi}(1 + \cos\alpha)$$
- **Controlled rectifiers:** Variable DC voltage control
- **DC choppers:** Power regulation, frequency control
- **Inverters:** DC to AC conversion
- **Cycloconverters:** Variable frequency AC

### 7. Thermal Analysis
- Junction temperature calculation: $$T_j = T_a + P \times \theta_{j-a}$$
- Thermal resistance components (device + heatsink)
- Power dissipation (conduction + switching + gate losses)
- Thermal runaway risk and prevention
- Temperature-dependent forward voltage drop

### 8. Device Ratings & Specifications
- Forward surge current ($$I_{FSM}$$): Peak current capability
- Average forward current ($$I_{avg}$$): Continuous rating
- Voltage ratings: Peak repetitive, Peak non-repetitive
- dv/dt and di/dt immunity ratings
- Thermal resistance ($$\theta_{j-c}$$, $$\theta_{c-a}$$)

### 9. Opto-Electronic Devices
- **LEDs:** Light emission, wavelength-color relationship, forward voltage
- **Photodiodes:** High-speed, low-noise light detection
- **Phototransistors:** High sensitivity, slower response
- **Optoisolators:** Galvanic isolation for gate drives (2000V+)

### 10. Number Bases
- Binary, Octal, Hexadecimal conversions
- Repeated division method
- Direct conversion between bases
- Applications in digital electronics and microcontrollers

## Flashcard Organization

All 40+ cards are organized by:
- **Topic:** 10 major power electronics topics
- **Difficulty:** Easy, Medium, Hard
- **Format:** Question-Answer (exam-style)
- **Content:** Professional LaTeX formulas, step-by-step derivations, calculations with examples

## Using the Platform

### Study Mode
- Access individual topic flashcards
- View questions first (active recall)
- Reveal detailed answers with full derivations
- Progress through difficulty levels

### Exam Mode
- Practice with complete question sets
- Timed mode simulates real exam conditions
- Mix of all difficulty levels
- Review mode for learning

### Offline Access
- Download flashcard sets
- Study without internet connection
- Sync progress when online

## Key Features

✓ **Professional Content:** Based on official HEXCO past papers
✓ **Full LaTeX Formatting:** All formulas in standard mathematical notation
✓ **Step-by-Step Solutions:** Detailed derivations and worked examples
✓ **Real Calculations:** Numerical examples with actual values
✓ **Comprehensive Coverage:** All topics from Oct 2019 - Mar 2022 papers
✓ **Multiple Difficulty Levels:** Progressive learning from basics to advanced

## Technical Stack

- **Frontend:** React with TypeScript
- **Database:** Supabase (PostgreSQL)
- **Storage:** Study notes with full PDF content extraction
- **Math Rendering:** LaTeX via KaTeX/MathJax
- **Responsive:** Mobile, tablet, and desktop optimized

## File Structure

```
src/
├── data/
│   ├── power-electronics-cards.ts      # Main flashcard set (22 cards)
│   ├── exam-cards.ts                   # Exam mode cards (10 cards)
│   ├── extended-exam-cards.ts          # Extended set (5 cards)
│   ├── massive-cards.ts                # Comprehensive set (6 cards)
│   └── qa-cards-data.ts                # Q&A format cards (9 cards)
├── routes/
│   ├── index.tsx                       # Home page
│   ├── dashboard.tsx                   # Topic selection
│   ├── revise.$setId.tsx              # Flashcard viewer
│   └── exam-mode.tsx                   # Exam mode
└── components/
    ├── FlashcardViewer.tsx            # Card display
    ├── ProgressTracker.tsx            # Learning progress
    └── StudyNotesPanel.tsx            # Study material display
```

## Content Statistics

- **Total Flashcards:** 40+
- **Topics Covered:** 10 major areas
- **Difficulty Levels:** Easy (25%), Medium (50%), Hard (25%)
- **LaTeX Formulas:** 100+ mathematical equations
- **Calculations:** 50+ worked examples
- **Study Notes:** Full PDF content extraction

## Exam Preparation Tips

1. **Start with Easy cards** to build foundation concepts
2. **Progress to Medium** for deeper understanding
3. **Master Hard cards** for exam-level questions
4. **Use offline mode** for last-minute review
5. **Practice timed mode** to simulate exam conditions
6. **Review formulas** until they become automatic

## Support & Resources

- **Study Materials:** Access integrated study notes from PDFs
- **Definitions:** All key terms defined in context
- **Examples:** Real numerical problems with solutions
- **Calculations:** Complete mathematical derivations

---

**Version:** 2.0 (Power Electronics Edition)
**Last Updated:** June 8, 2026
**Status:** Production Ready - All Industrial Automation content removed, Power Electronics only
