# Study Notes Setup Guide

## Database Schema Setup

Run this SQL in Supabase to create the study_notes table:

```sql
-- Create study_notes table
CREATE TABLE IF NOT EXISTS study_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  source_url VARCHAR(500),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_study_notes_category ON study_notes(category);
CREATE INDEX IF NOT EXISTS idx_study_notes_order ON study_notes(order_index);
```

## Adding Study Notes Content

The study notes are organized in 5 categories based on the PDF files provided:

### 1. **Number Bases** 
**Source:** Number_Bases-Ws438.pdf  
**Topics:**
- Binary, Decimal, Hexadecimal number systems
- Number system conversions
- Positional notation
- Base conversion algorithms

**SQL Insert Example:**
```sql
INSERT INTO study_notes (title, category, content, order_index) VALUES
(
  'Number Systems Overview',
  'Number Bases',
  '<h3>Positional Number Systems</h3>
  <p>In base 10 we have 10 digits – 0, 1, 2, ..., 8, 9.</p>
  <p>The value of any individual digit is determined by its position in the number.</p>
  <h4>Example:</h4>
  <p>59376 = 5×10⁴ + 9×10³ + 3×10² + 7×10¹ + 6×10⁰</p>',
  1
);
```

### 2. **Power Electronics Digital Notes**
**Source:** power-electronics-digital-notes-kqKVP.pdf  
**Topics:**
- Power electronics introduction and applications
- Power semiconductor devices (diodes, transistors, MOSFETs, IGBTs, thyristors)
- Power converter types (rectifiers, choppers, inverters, AC controllers, cycloconverters)
- Thyristor characteristics and modes of operation
- SCR (Silicon Controlled Rectifier) details
- Two-transistor analogy of SCR

**SQL Insert Example:**
```sql
INSERT INTO study_notes (title, category, content, order_index) VALUES
(
  'Thyristor Characteristics',
  'Power Electronics Digital Notes',
  '<h3>V-I Characteristics of Thyristor</h3>
  <p>A thyristor has three basic modes of operation:</p>
  <ul>
    <li><strong>Reverse Blocking Mode:</strong> Cathode positive w.r.t. anode</li>
    <li><strong>Forward Blocking Mode:</strong> Anode positive w.r.t. cathode, gate open</li>
    <li><strong>Forward Conduction Mode:</strong> Thyristor conducting with low voltage drop</li>
  </ul>
  <p><strong>Two Transistor Analogy:</strong></p>
  <p>An SCR can be understood as two transistors (one PNP and one NPN) connected in a regenerative feedback circuit.</p>',
  1
);
```

### 3. **Opto-Electronic Devices**
**Source:** Opto~ELectronic_Devices-a0a7F.pdf  
**Topics:**
- Light fundamentals and photon energy
- Light Emitting Diodes (LEDs)
- Liquid Crystal Displays (LCDs)
- Photodiodes and phototransistors
- Photoconductive cells
- Optical devices and communications

**SQL Insert Example:**
```sql
INSERT INTO study_notes (title, category, content, order_index) VALUES
(
  'LED Operation and Applications',
  'Opto-Electronic Devices',
  '<h3>Light Emitting Diodes (LED)</h3>
  <p>An LED is a forward-biased P-N junction which emits visible light when energised.</p>
  
  <h4>Photon Energy Formula:</h4>
  <p>$$E = hf = \frac{hc}{\lambda}$$</p>
  <p>Where:</p>
  <ul>
    <li>$$h$$ = Plank''s constant = 6.625 × 10⁻³⁴ J·s</li>
    <li>$$f$$ = frequency in Hz</li>
    <li>$$c$$ = velocity of light = 3 × 10⁸ m/s</li>
    <li>$$\lambda$$ = wavelength in metres</li>
  </ul>
  
  <h4>Semiconductor Materials and Colors:</h4>
  <table>
    <tr>
      <th>Material</th>
      <th>Light Color</th>
      <th>Band Gap (eV)</th>
    </tr>
    <tr>
      <td>GaAs</td>
      <td>Infrared (invisible)</td>
      <td>1.43</td>
    </tr>
    <tr>
      <td>GaP</td>
      <td>Red or Green</td>
      <td>2.26</td>
    </tr>
    <tr>
      <td>GaAsP</td>
      <td>Red or Yellow</td>
      <td>1.9-2.2</td>
    </tr>
  </table>',
  1
);
```

### 4. **Power Electronics March 2025**
**Source:** Power-electronics-notes-March2025-hatVX.pdf  
**Topics:**
- Updated power electronics curriculum
- Latest device characteristics
- Modern converter topologies
- Recent application trends

**SQL Insert Example:**
```sql
INSERT INTO study_notes (title, category, content, order_index) VALUES
(
  'Modern Power Converters',
  'Power Electronics March 2025',
  '<h3>AC-DC Converters (Rectifiers)</h3>
  <p><strong>Phase Control Technique:</strong> Method of controlling output voltage of rectifiers</p>
  
  <h4>Single Phase Controlled Rectifier with RL Load:</h4>
  <p>Average Load Voltage: $$V_d = \frac{2V_m}{\pi}\cos(\alpha)$$</p>
  <p>Where $$\alpha$$ is the firing angle (0° to 180°)</p>
  
  <h4>Three Phase Rectifiers:</h4>
  <ul>
    <li>Three-pulse converter: Lower frequency ripple</li>
    <li>Six-pulse converter: Smoother DC output</li>
    <li>Used for high-power applications</li>
  </ul>',
  1
);
```

### 5. **Silicon Controlled Rectifier (SCR)**
**Source:** Integrated from power electronics notes  
**Topics:**
- SCR construction and operation
- Static characteristics
- Dynamic characteristics
- Firing and commutation circuits
- Snubber circuit design
- Protection circuits

**SQL Insert Example:**
```sql
INSERT INTO study_notes (title, category, content, order_index) VALUES
(
  'SCR Commutation Circuits',
  'Silicon Controlled Rectifier (SCR)',
  '<h3>Forced Commutation Circuits</h3>
  <p>Used to turn OFF the SCR before the natural zero crossing of current.</p>
  
  <h4>Types of Forced Commutation:</h4>
  <ol>
    <li><strong>Class A:</strong> Uses capacitor charge/discharge</li>
    <li><strong>Class B:</strong> Uses external pulse source</li>
    <li><strong>Class C:</strong> Uses LC oscillations</li>
    <li><strong>Class D:</strong> Uses resonant circuits</li>
    <li><strong>Class E:</strong> Complementary commutation</li>
    <li><strong>Class F:</strong> Load commutation</li>
  </ol>
  
  <h4>Snubber Circuit:</h4>
  <p>RC circuit placed across SCR to:</p>
  <ul>
    <li>Limit $$\frac{dV}{dt}$$ across SCR</li>
    <li>Prevent false triggering</li>
    <li>Protect against voltage spikes</li>
  </ul>
  <p>Typical RC values: R = 10-100Ω, C = 0.1-1μF</p>',
  1
);
```

## Content Formatting Standards

### LaTeX Equations
Always use double dollar signs for LaTeX:
```
$$V = IR$$
$$P = \frac{V^2}{R}$$
$$f = \frac{1}{2\pi\sqrt{LC}}$$
```

### Tables
Use HTML table format:
```html
<table>
  <tr>
    <th>Parameter</th>
    <th>Unit</th>
    <th>Typical Value</th>
  </tr>
  <tr>
    <td>Forward Voltage Drop</td>
    <td>V</td>
    <td>1-2</td>
  </tr>
</table>
```

### Lists
Use semantic HTML:
```html
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

<ol>
  <li>First item</li>
  <li>Second item</li>
</ol>
```

## Adding Content via Supabase Dashboard

1. Go to Supabase Dashboard → SQL Editor
2. Create new query with INSERT statements
3. Copy from examples above
4. Modify title, category, content, order_index
5. Execute query

## Adding Content via API

Alternatively, create an admin endpoint to add notes:

```typescript
// POST /admin/api/notes
export async function POST(req: Request) {
  const { title, category, content, order_index } = await req.json();
  
  const { data, error } = await supabase
    .from('study_notes')
    .insert({
      title,
      category,
      content,
      order_index: order_index || 0,
    });
  
  if (error) throw new Error(error.message);
  return Response.json(data);
}
```

## Testing Study Materials

1. Navigate to `/notes` route after login
2. Should show tabs for each category
3. Click tab to view category content
4. Verify LaTeX equations render correctly
5. Check table formatting
6. Verify responsive design on mobile

## Content Categories

Once populated, the /notes page will have these tabs:
- Number Bases
- Power Electronics Digital Notes
- Opto-Electronic Devices
- Power Electronics March 2025
- Silicon Controlled Rectifier (SCR)

## Next Steps

1. Run the SQL schema creation
2. Add study_notes content using the INSERT examples
3. Test the /notes route
4. Verify all LaTeX renders correctly
5. Check mobile responsiveness
6. Validate content accuracy against source PDFs
