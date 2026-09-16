import pro1 from '@/assets/images/products/pro1.jpg'
import pro2 from '@/assets/images/products/pro2.jpg'
import pro3 from '@/assets/images/products/pro3.jpg'
import pro4 from '@/assets/images/products/pro4.jpg'
import pro5 from '@/assets/images/products/pro5.jpg'
import pro6 from '@/assets/images/products/pro6.jpg'
import pro7 from '@/assets/images/products/pro7.png'
import pro8 from '@/assets/images/products/pro8.png'
import pro9 from '@/assets/images/products/pro9.png'
import pro10 from '@/assets/images/products/pro10.png'
import pro11 from '@/assets/images/products/pro11.png'
import pro12 from '@/assets/images/products/pro12.png'

import { allProducts, products as homeProducts } from '@/data/products'
import { customPcProducts } from '@/data/customPcProducts'

export const productImages = {
  pro1, pro2, pro3, pro4, pro5, pro6,
  pro7, pro8, pro9, pro10, pro11, pro12
}

export const allAssetProductImages = [
  pro1, pro2, pro3, pro4, pro5, pro6,
  pro7, pro8, pro9, pro10, pro11, pro12
]

/**
 * Top Selling Products sidebar widget with store products and pro images
 */
export const topSellingProducts = [
  {
    id: 'pvc-elbow-90',
    title: 'PVC 90° Elbow Pipe Fitting (កែងទុយោទឹក PVC 90°)',
    code: 'PVC-E90-07',
    price: 3.5,
    rating: 5,
    image: pro7
  },
  {
    id: 'flange-rubber-gasket',
    title: 'Heavy-Duty Flange Rubber Gasket (រ៉ង់កៅស៊ូធន់សម្ពាធខ្ពស់)',
    code: 'GSK-HD-08',
    price: 5.2,
    rating: 5,
    image: pro8
  },
  {
    id: 'industrial-butterfly-valve',
    title: 'Industrial Gear Butterfly Valve (វ៉ានមេអំបៅឧស្សាហកម្ម)',
    code: 'VLV-BF-09',
    price: 45,
    rating: 5,
    image: pro9
  },
  {
    id: 'pvc-lever-butterfly-valve',
    title: 'PVC Lever Handle Butterfly Valve (វ៉ានមេអំបៅដៃកាច់)',
    code: 'VLV-LV-10',
    price: 38,
    rating: 5,
    image: pro10
  }
]

/**
 * Standard customer reviews for hardware and building supplies
 */
export const standardReviews = [
  {
    author: 'Sokha R.',
    date: '2026-03-10',
    rating: 5,
    comment: 'Very high quality product, fast dispatch, and excellent customer service. Perfect for my construction project!'
  },
  {
    author: 'Dara K.',
    date: '2026-03-02',
    rating: 5,
    comment: 'Consistent quality and great durability. Arrived quickly and safely packaged.'
  },
  {
    author: 'Chan V.',
    date: '2026-02-18',
    rating: 5,
    comment: 'Solid build and reliable performance. Recommended for building and plumbing works.'
  }
]

/**
 * Generate authentic technical description lines that match the specific product and image
 */
export function generateDescriptionLines(product) {
  const title = (product.title || '').toLowerCase()
  const cat = (product.category || '').toLowerCase()
  const id = (product.id || '').toLowerCase()

  // 1. PVC Elbows, Pipes & Plumbing fittings
  if (title.includes('កែង') || id.includes('elbow') || title.includes('elbow') || cat.includes('pvc') || title.includes('ទុយោ') || title.includes('បំពង់ទឹក') || id.includes('pvc')) {
    return [
      '-Standard / Certification: ISO 1452 / BS 3505 / TIS 17-2532 Standard Certified',
      '-Material / Composition: 100% Virgin High-Grade Unplasticized PVC (uPVC)',
      '-Pressure Rating: PN16 (16 Bar) / Class 13.5 High Pressure Resistance',
      '-Nominal Sizes: 1/2" to 4" (20mm - 110mm) Heavy-Duty Wall',
      '-Operating Temperature: 0°C to 60°C continuous flow rating',
      '-Flow Efficiency: Mirror-smooth hydraulic bore (Hazen-Williams C=150)',
      '-Chemical Resistance: High resistance to acids, alkalis, salts, and subterranean corrosion',
      '-Jointing Method: Solvent cement socket welding / elastomeric seal ring',
      '-Application / Usage: Potable water distribution, municipal plumbing, agricultural irrigation',
      '-Safety / Environment: Non-toxic, lead-free, NSF/ANSI 61 compliant for drinking water',
      '-Color: Sky Blue (Potable) / Pearl White / Industrial Grey',
      '-Warranty: 10 Years Genuine Quality & Anti-Burst Guarantee'
    ]
  }

  // 2. Valves (Butterfly, Ball, Double Union, etc.)
  if (title.includes('វ៉ាល់') || title.includes('valve') || title.includes('វ៉ាន') || id.includes('valve')) {
    return [
      '-Valve Classification: Industrial Heavy-Duty Fluid Control Valve',
      '-Body Construction: Precision Molded UPVC / Epoxy-Coated Ductile Iron GGG40',
      '-Disc / Ball Element: SS316 Stainless Steel / High-Purity Virgin UPVC',
      '-Sealing Technology: EPDM / PTFE (Teflon) Resilient Double Seat Seals',
      '-Working Pressure: PN16 (16 Bar / 232 PSI) Factory Hydro-Tested to 1.5x',
      '-Flange Compatibility: Fits DIN PN10/16, ANSI Class 150, JIS 10K Flanges',
      '-Operation Mechanism: Ergonomic Quarter-Turn Lever / Precision Worm Gear Handwheel',
      '-Flow Characteristic: Full-bore bi-directional tight shut-off (Zero Leakage Class A)',
      '-Temperature Range: -10°C to +80°C media operating tolerance',
      '-Maintenance Feature: True-union detachable end sockets for inline maintenance without cutting',
      '-Warranty: 3 Years Industrial Free-Replacement Guarantee'
    ]
  }

  // 3. Steel Products & Flange Gaskets
  if (title.includes('ដែក') || title.includes('steel') || cat.includes('steel') || title.includes('កង') || id.includes('steel') || id.includes('gasket')) {
    return [
      '-Manufacturing Standard: ASTM A53 / JIS G3444 Structural Grade Carbon Steel',
      '-Steel Grade / Tensile: Q235B / Q345B High-Yield Tensile Structural Steel',
      '-Yield Strength: >= 235 MPa | Tensile Strength: 370 - 500 MPa',
      '-Wall Thickness: 2.5mm - 3.2mm precision tolerance calibrated',
      '-Surface Treatment: Hot-Dip Galvanized (Zinc coating >= 275g/m²) / Anti-Rust Oil Prime',
      '-Standard Length: 6.0 Meters (Custom cutting available upon request)',
      '-End Finish: Plain square cut / Beveled ends for structural welding',
      '-Application: Structural building frames, columns, trusses, bridge lintels, scaffolding',
      '-Quality Certification: Mill Test Certificate (MTC EN 10204 3.1) Included',
      '-Warranty: 15 Years Anti-Corrosion & Structural Integrity Guarantee'
    ]
  }

  // 4. Floor Tiles & Ceramic / Porcelain
  if (title.includes('ការចេំ') || title.includes('tile') || cat.includes('tile') || title.includes('ជេក') || id.includes('tile')) {
    return [
      '-Material / Composition: Architectural Grade Glazed Porcelain & Ceramic Tile',
      '-Nominal Dimensions: 15cm x 15cm (150mm x 150mm) Rectified Edge',
      '-Thickness: 9.0mm Heavy-Duty Wear Resistant Body',
      '-Surface Finish: Nano-Glazed Anti-Slip Matte Texture (R10 Slip Rating)',
      '-Water Absorption: <= 0.5% (Impervious to moisture, mold, and mildew)',
      '-Breaking Strength: >= 1300 N | Modulus of Rupture: >= 35 N/mm²',
      '-Abrasion Resistance: PEI Class IV (Suitable for high foot-traffic residential & commercial)',
      '-Stain & Chemical Resistance: Class 5 (Maximum resistance to acids, alkalis, and oils)',
      '-Packaging Specification: 44 pieces / carton box (approx. 1.0 m² coverage)',
      '-Manufacturing Standard: ISO 13006 / EN 14411 Annex G Standard Certified',
      '-Warranty: 5 Years Genuine Color Fastness & Surface Guarantee'
    ]
  }

  // 5. Cement, Mortar & Bricks
  if (title.includes('ស៊ីម៉ងត៍') || title.includes('cement') || cat.includes('cement') || title.includes('ឥដ្ឋ') || title.includes('brick')) {
    return [
      '-Product Standard: ASTM C150 Type I / EN 197-1 CEM I 42.5N Ordinary Portland Cement',
      '-Compressive Strength: 3 Days >= 20 MPa | 28 Days >= 48 MPa',
      '-Setting Time: Initial >= 45 minutes | Final <= 360 minutes',
      '-Soundness (Le Chatelier): <= 10mm expansion stability',
      '-Packaging: 50kg Multi-wall moisture-resistant kraft paper sack',
      '-Application: Reinforced concrete foundations, high-rise structural casting, mortar & plastering',
      '-Durability: High sulfate resistance and low alkali reactivity',
      '-Storage Life: 3 Months in dry, elevated pallet storage',
      '-Warranty: 100% Factory Batch Certificate Verified'
    ]
  }

  // 6. Plastic Resin & Granules
  if (title.includes('ជ័រ') || title.includes('plastic') || title.includes('resin') || id.includes('plastic') || id.includes('resin')) {
    return [
      '-Polymer Grade: Virgin High-Density Polyethylene (HDPE) / Polypropylene (PP)',
      '-Melt Flow Index (MFI): 0.35 - 2.0 g/10min (190°C/2.16kg ASTM D1238)',
      '-Density: 0.952 - 0.958 g/cm³ precision extrusion grade',
      '-Tensile Yield Strength: >= 24 MPa | Elongation at Break: >= 600%',
      '-Pellet Form: Translucent cylindrical beads, uniform granulation',
      '-Processing Compatibility: Extrusion pipe lines, blow molding, injection molding',
      '-Compliance & Safety: RoHS / REACH certified non-toxic food-grade contact',
      '-Packaging: 25kg multi-ply woven bags with inner barrier liner',
      '-Warranty: 100% Virgin Material Purity Guaranteed'
    ]
  }

  // 7. Bathroom & Sanitaryware
  if (title.includes('បន្ទប់ទឹក') || title.includes('bathroom') || title.includes('ក្បាលផ្កាឈូក') || id.includes('bathroom')) {
    return [
      '-Assembly Includes: Overhead rain shower, handheld spray wand, thermostatic diverter, 1.5m hose',
      '-Core Material: Solid HPb59-1 Lead-Free Brass Valve Core with SUS304 Arm',
      '-Finish Treatment: 5-Layer Electroplated Mirror Chrome / Matte Black PVD',
      '-Water Working Pressure: 0.15 MPa - 0.55 MPa (Air-injection booster technology)',
      '-Cartridge: Sedal Ceramic Disc Cartridge (Tested to 500,000 drip-free cycles)',
      '-Spray Jets: Easy-clean anti-clog silicone nozzles (rub clean instantly)',
      '-Connection Standard: Universal G 1/2" British Standard Pipe fitting',
      '-Warranty: 5 Years Leak-Free Manufacturer Warranty'
    ]
  }

  // 8. Kitchen & Cookware
  if (title.includes('ផ្ទះបាយ') || title.includes('kitchen') || title.includes('cookware') || id.includes('kitchen')) {
    return [
      '-Construction: Triple-Ply Food-Grade SUS304 (18/10) Stainless Steel',
      '-Base Technology: Encapsulated pure aluminum core for rapid, uniform heat distribution',
      '-Cooktop Compatibility: Gas, Induction, Ceramic, Electric, and Halogen ranges',
      '-Handle Ergonomics: Riveted stay-cool hollow cast stainless steel handles',
      '-Heat Tolerance: Oven-safe up to 260°C (500°F) | Dishwasher safe',
      '-Food Safety: 100% BPA-Free, PFOA-Free, non-reactive interior',
      '-Warranty: 5 Years HomeAll Culinary Quality Guarantee'
    ]
  }

  // Default fallback matching building supplies
  return [
    `-Product Classification: ${product.category || 'High-Grade Construction & Hardware Material'}`,
    `-Manufacturing Quality: ISO 9001:2015 International Quality Management Certified`,
    `-Material Grade: Industrial Heavy-Duty Specification`,
    `-Durability Rating: Weather-resistant, UV-stabilized, and anti-aging formulated`,
    `-Environmental Safety: Eco-friendly, non-toxic, and RoHS compliant material`,
    `-Application Range: Residential construction, commercial building, industrial infrastructure`,
    `-Testing & Inspection: 100% Factory mechanical & stress calibrated`,
    `-Packaging: Heavy-duty export carton / safety pallet wrapping`,
    `-Warranty: 2 Years Official HomeAll Comprehensive Warranty`
  ]
}

/**
 * Concrete detailed specifications for known catalog items
 */
export const productDetailsMap = {
  'floor-tile': {
    id: 'floor-tile',
    title: 'ជេក ការចេំ ខ្នាត 15x15 (Floor Tile Architectural Grade)',
    brand: 'SCG Standard',
    price: 12.5,
    unit: '/ box',
    mainImage: pro1,
    gallery: [
      pro1,
      pro2,
      pro3,
      pro4,
      pro5,
      pro6,
      pro7,
      pro8,
      pro9,
      pro10,
      pro11,
      pro12
    ],
    quickSpecs: [
      'Material: Architectural Grade Porcelain & Ceramic',
      'Size: 15cm x 15cm (150x150mm) Rectified',
      'Thickness: 9.0mm Heavy-Duty Wear Resistant',
      'Finish: Non-Slip Matte (R10 Slip Rating)',
      'Water Absorption: <= 0.5% (Impervious)',
      'Coverage: 44 pieces / box (approx. 1.0 m²)',
      'Standard: ISO 13006 Certified',
      'Warranty: 5 Years Quality Guarantee'
    ],
    monthlyPayment: 10,
    installmentTitle: 'លក្ខខណ្ឌនៃការបង់',
    installmentText: 'ទូទាត់ប្រចាំខែត្រឹមតែ $10',
    installmentPartner: 'AEON Specialized Bank',
    installmentLogo: null,
    inStock: true,
    isPreOrder: false,
    sku: 'FT-1515-SCG',
    descriptionLines: [
      '-Material / Composition: Architectural Grade Glazed Porcelain & Ceramic Tile',
      '-Nominal Dimensions: 15cm x 15cm (150mm x 150mm) Rectified Edge',
      '-Thickness: 9.0mm Heavy-Duty Wear Resistant Body',
      '-Surface Finish: Nano-Glazed Anti-Slip Matte Texture (R10 Slip Rating)',
      '-Water Absorption: <= 0.5% (Impervious to moisture, mold, and mildew)',
      '-Breaking Strength: >= 1300 N | Modulus of Rupture: >= 35 N/mm²',
      '-Abrasion Resistance: PEI Class IV (Suitable for high foot-traffic residential & commercial)',
      '-Stain & Chemical Resistance: Class 5 (Maximum resistance to acids, alkalis, and oils)',
      '-Packaging Specification: 44 pieces / carton box (approx. 1.0 m² coverage)',
      '-Manufacturing Standard: ISO 13006 / EN 14411 Annex G Standard Certified',
      '-Warranty: 5 Years Genuine Color Fastness & Surface Guarantee'
    ],
    reviews: standardReviews
  },
  'steel-product': {
    id: 'steel-product',
    title: 'បំពង់ដែក សម្រាប់សំណង់ (High-Grade Structural Steel Pipe)',
    brand: 'HomeAll Certified',
    price: 28,
    unit: '/ piece',
    mainImage: pro2,
    gallery: [
      pro2,
      pro1,
      pro3,
      pro4,
      pro5,
      pro6,
      pro7,
      pro8,
      pro9,
      pro10,
      pro11,
      pro12
    ],
    quickSpecs: [
      'Standard: ASTM A53 / JIS G3444 Structural Steel',
      'Grade: Q235B / Q345B High-Yield Carbon Steel',
      'Outer Diameter: 48.3mm - 114.3mm calibrated',
      'Wall Thickness: 2.5mm - 3.2mm structural wall',
      'Length: Standard 6.0 Meters mill length',
      'Finish: Hot-Dip Galvanized Anti-Rust coating',
      'Tensile Strength: 370 - 500 MPa',
      'Warranty: 15 Years Anti-Corrosion Guarantee'
    ],
    monthlyPayment: 15,
    installmentTitle: 'លក្ខខណ្ឌនៃការបង់',
    installmentText: 'ទូទាត់ប្រចាំខែត្រឹមតែ $15',
    installmentPartner: 'AEON Specialized Bank',
    installmentLogo: null,
    inStock: true,
    isPreOrder: false,
    sku: 'ST-PIPE-28',
    descriptionLines: [
      '-Manufacturing Standard: ASTM A53 / JIS G3444 Structural Grade Carbon Steel',
      '-Steel Grade / Tensile: Q235B / Q345B High-Yield Tensile Structural Steel',
      '-Yield Strength: >= 235 MPa | Tensile Strength: 370 - 500 MPa',
      '-Wall Thickness: 2.5mm - 3.2mm precision tolerance calibrated',
      '-Surface Treatment: Hot-Dip Galvanized (Zinc coating >= 275g/m²) / Anti-Rust Oil Prime',
      '-Standard Length: 6.0 Meters (Custom cutting available upon request)',
      '-End Finish: Plain square cut / Beveled ends for structural welding',
      '-Application: Structural building frames, columns, trusses, bridge lintels, scaffolding',
      '-Quality Certification: Mill Test Certificate (MTC EN 10204 3.1) Included',
      '-Warranty: 15 Years Anti-Corrosion & Structural Integrity Guarantee'
    ],
    reviews: standardReviews
  },
  'plastic-resin': {
    id: 'plastic-resin',
    title: 'ជ័រផ្លាស្ទិក គុណភាពខ្ពស់ (Virgin Polymer Pellets)',
    brand: 'HomeAll Industrial',
    price: 1250,
    unit: '/ ton',
    mainImage: pro3,
    gallery: [
      pro3,
      pro1,
      pro2,
      pro4,
      pro5,
      pro6,
      pro7,
      pro8,
      pro9,
      pro10,
      pro11,
      pro12
    ],
    quickSpecs: [
      'Material: Virgin HDPE / Polypropylene (PP)',
      'Melt Flow Index: 0.35 - 2.0 g/10min',
      'Density: 0.952 - 0.958 g/cm³ precision grade',
      'Tensile Strength: >= 24 MPa',
      'Form: Translucent Cylindrical Granules',
      'Safety: RoHS / REACH Non-Toxic Certified',
      'Application: Pipe extrusion & tank blow molding',
      'Packaging: 25kg bags / 1 Ton Pallet'
    ],
    monthlyPayment: 75,
    installmentTitle: 'លក្ខខណ្ឌនៃការបង់',
    installmentText: 'ទូទាត់ប្រចាំខែត្រឹមតែ $75',
    installmentPartner: 'AEON Specialized Bank',
    installmentLogo: null,
    inStock: true,
    isPreOrder: false,
    sku: 'PL-RESIN-1250',
    descriptionLines: [
      '-Polymer Grade: Virgin High-Density Polyethylene (HDPE) / Polypropylene (PP)',
      '-Melt Flow Index (MFI): 0.35 - 2.0 g/10min (190°C/2.16kg ASTM D1238)',
      '-Density: 0.952 - 0.958 g/cm³ precision extrusion grade',
      '-Tensile Yield Strength: >= 24 MPa | Elongation at Break: >= 600%',
      '-Pellet Form: Translucent cylindrical beads, uniform granulation',
      '-Processing Compatibility: Extrusion pipe lines, blow molding, injection molding',
      '-Compliance & Safety: RoHS / REACH certified non-toxic food-grade contact',
      '-Packaging: 25kg multi-ply woven bags with inner barrier liner',
      '-Warranty: 100% Virgin Material Purity Guaranteed'
    ],
    reviews: standardReviews
  },
  'pvc-pipes': {
    id: 'pvc-pipes',
    title: 'បំពង់ទឹក PVC (Class 13.5 High Pressure Water Pipe)',
    brand: 'HomeAll Standard',
    price: 6.8,
    unit: '/ length',
    mainImage: pro4,
    gallery: [
      pro4,
      pro1,
      pro2,
      pro3,
      pro5,
      pro6,
      pro7,
      pro8,
      pro9,
      pro10,
      pro11,
      pro12
    ],
    quickSpecs: [
      'Material: 100% Virgin uPVC Compound',
      'Pressure Class: Class 13.5 (PN16 rated)',
      'Standard: TIS 17-2532 / ISO 1452 Certified',
      'Length: 4.0m / 6.0m with Bell Socket End',
      'Temperature: 0°C to 60°C continuous flow',
      'Features: Lead-free, anti-scaling inner bore',
      'Joint: Solvent Cement Socket Weld',
      'Warranty: 10 Years Leak-Free Guarantee'
    ],
    monthlyPayment: 10,
    installmentTitle: 'លក្ខខណ្ឌនៃការបង់',
    installmentText: 'ទូទាត់ប្រចាំខែត្រឹមតែ $10',
    installmentPartner: 'AEON Specialized Bank',
    installmentLogo: null,
    inStock: true,
    isPreOrder: false,
    sku: 'PVC-PIPE-04',
    descriptionLines: [
      '-Standard / Certification: ISO 1452 / BS 3505 / TIS 17-2532 Standard Certified',
      '-Material / Composition: 100% Virgin High-Grade Unplasticized PVC (uPVC)',
      '-Pressure Rating: PN16 (16 Bar) / Class 13.5 High Pressure Resistance',
      '-Nominal Sizes: 1/2" to 4" (20mm - 110mm) Heavy-Duty Wall',
      '-Operating Temperature: 0°C to 60°C continuous flow rating',
      '-Flow Efficiency: Mirror-smooth hydraulic bore (Hazen-Williams C=150)',
      '-Chemical Resistance: High resistance to acids, alkalis, salts, and subterranean corrosion',
      '-Jointing Method: Solvent cement socket welding / elastomeric seal ring',
      '-Application / Usage: Potable water distribution, municipal plumbing, agricultural irrigation',
      '-Safety / Environment: Non-toxic, lead-free, NSF/ANSI 61 compliant for drinking water',
      '-Color: Sky Blue (Potable) / Pearl White / Industrial Grey',
      '-Warranty: 10 Years Genuine Quality & Anti-Burst Guarantee'
    ],
    reviews: standardReviews
  },
  'pvc-elbow-90': {
    id: 'pvc-elbow-90',
    title: 'PVC 90° Elbow Pipe Fitting (កែងទុយោទឹក PVC 90°)',
    brand: 'HomeAll Standard',
    price: 3.5,
    unit: '/Pc',
    mainImage: pro7,
    gallery: [
      pro7,
      pro8,
      pro9,
      pro10,
      pro11,
      pro12,
      pro1,
      pro2,
      pro3,
      pro4,
      pro5,
      pro6
    ],
    quickSpecs: [
      'Material: High-Grade PVC Polymer',
      'Type: 90-Degree Female Solvent Socket',
      'Pressure Rating: PN16 (16 Bar)',
      'Standard: ISO 1452 / BS 3505 / TIS 1131',
      'Temperature Range: 0°C to 60°C',
      'Usage: Potable water, irrigation, industrial'
    ],
    monthlyPayment: 10,
    installmentTitle: 'លក្ខខណ្ឌនៃការបង់',
    installmentText: 'ទូទាត់ប្រចាំខែត្រឹមតែ $10',
    installmentPartner: 'AEON Specialized Bank',
    installmentLogo: null,
    inStock: true,
    isPreOrder: false,
    sku: 'PVC-E90-07',
    descriptionLines: [
      '-Standard / Certification: ISO 1452 / BS 3505 / TIS 17-2532 Standard Certified',
      '-Material / Composition: 100% Virgin High-Grade Unplasticized PVC (uPVC)',
      '-Pressure Rating: PN16 (16 Bar) / Class 13.5 High Pressure Resistance',
      '-Nominal Sizes: 1/2" to 4" (20mm - 110mm) Heavy-Duty Wall',
      '-Operating Temperature: 0°C to 60°C continuous flow rating',
      '-Flow Efficiency: Mirror-smooth hydraulic bore (Hazen-Williams C=150)',
      '-Chemical Resistance: High resistance to acids, alkalis, salts, and subterranean corrosion',
      '-Jointing Method: Solvent cement socket welding / elastomeric seal ring',
      '-Application / Usage: Potable water distribution, municipal plumbing, agricultural irrigation',
      '-Safety / Environment: Non-toxic, lead-free, NSF/ANSI 61 compliant for drinking water',
      '-Color: Sky Blue (Potable) / Pearl White / Industrial Grey',
      '-Warranty: 10 Years Genuine Quality & Anti-Burst Guarantee'
    ],
    reviews: standardReviews
  },
  'flange-rubber-gasket': {
    id: 'flange-rubber-gasket',
    title: 'Heavy-Duty Flange Rubber Gasket (រ៉ង់កៅស៊ូធន់សម្ពាធខ្ពស់)',
    brand: 'HomeAll Standard',
    price: 5.2,
    unit: '/Pc',
    mainImage: pro8,
    gallery: [
      pro8,
      pro7,
      pro9,
      pro10,
      pro11,
      pro12,
      pro1,
      pro2,
      pro3,
      pro4,
      pro5,
      pro6
    ],
    quickSpecs: [
      'Material: EPDM / NBR Industrial Synthetic Rubber',
      'Flange Standard: ANSI B16.5 / JIS 10K / DIN PN16',
      'Pressure Rating: Up to 25 Bar hydro-tested',
      'Temperature Range: -30°C to +130°C continuous',
      'Hardness: Shore A 70 ± 5 Elastic Resilience',
      'Application: Flange sealing, pump anti-vibration'
    ],
    monthlyPayment: 10,
    installmentTitle: 'លក្ខខណ្ឌនៃការបង់',
    installmentText: 'ទូទាត់ប្រចាំខែត្រឹមតែ $10',
    installmentPartner: 'AEON Specialized Bank',
    installmentLogo: null,
    inStock: true,
    isPreOrder: false,
    sku: 'GSK-HD-08',
    descriptionLines: [
      '-Material / Composition: High-Density EPDM / NBR Synthetic Rubber',
      '-Type: Full Face / Ring Flange Gasket',
      '-Standard: ANSI B16.5 / JIS B2220 10K/16K / DIN EN 1514-1',
      '-Pressure Class: 150 LB / PN16 / PN25',
      '-Temperature Range: -30°C to +130°C',
      '-Hardness: Shore A 70 ± 5',
      '-Features: Excellent elasticity, oil resistant, ozone and UV proof, anti-vibration',
      '-Application: Pipe flange sealing, pump connections, water treatment plants',
      '-Warranty: 3 Years Elastic Sealing Guarantee'
    ],
    reviews: standardReviews
  },
  'industrial-butterfly-valve': {
    id: 'industrial-butterfly-valve',
    title: 'Industrial Gear Butterfly Valve (វ៉ានមេអំបៅឧស្សាហកម្ម)',
    brand: 'HomeAll Heavy Duty',
    price: 45,
    unit: '/Pc',
    mainImage: pro9,
    gallery: [
      pro9,
      pro10,
      pro11,
      pro12,
      pro7,
      pro8,
      pro1,
      pro2,
      pro3,
      pro4,
      pro5,
      pro6
    ],
    quickSpecs: [
      'Body: Epoxy Coated Ductile Iron GGG40',
      'Disc: CF8M Stainless Steel (SS316)',
      'Seat: EPDM Resilient Rubber Liner',
      'Actuation: Manual Handwheel Worm Gearbox',
      'Working Pressure: PN16 / 200 PSI',
      'Flange: Wafer fits ANSI 150, JIS 10K, DIN'
    ],
    monthlyPayment: 12,
    installmentTitle: 'លក្ខខណ្ឌនៃការបង់',
    installmentText: 'ទូទាត់ប្រចាំខែត្រឹមតែ $12',
    installmentPartner: 'AEON Specialized Bank',
    installmentLogo: null,
    inStock: true,
    isPreOrder: false,
    sku: 'VLV-BF-09',
    descriptionLines: [
      '-Valve Classification: Industrial Heavy-Duty Fluid Control Valve',
      '-Body Construction: Precision Molded UPVC / Epoxy-Coated Ductile Iron GGG40',
      '-Disc / Ball Element: SS316 Stainless Steel / High-Purity Virgin UPVC',
      '-Sealing Technology: EPDM / PTFE (Teflon) Resilient Double Seat Seals',
      '-Working Pressure: PN16 (16 Bar / 232 PSI) Factory Hydro-Tested to 1.5x',
      '-Flange Compatibility: Fits DIN PN10/16, ANSI Class 150, JIS 10K Flanges',
      '-Operation Mechanism: Ergonomic Quarter-Turn Lever / Precision Worm Gear Handwheel',
      '-Flow Characteristic: Full-bore bi-directional tight shut-off (Zero Leakage Class A)',
      '-Temperature Range: -10°C to +80°C media operating tolerance',
      '-Maintenance Feature: True-union detachable end sockets for inline maintenance without cutting',
      '-Warranty: 3 Years Industrial Free-Replacement Guarantee'
    ],
    reviews: standardReviews
  },
  'pvc-lever-butterfly-valve': {
    id: 'pvc-lever-butterfly-valve',
    title: 'PVC Lever Handle Butterfly Valve (វ៉ានមេអំបៅដៃកាច់)',
    brand: 'HomeAll Standard',
    price: 38,
    unit: '/Pc',
    mainImage: pro10,
    gallery: [
      pro10,
      pro9,
      pro11,
      pro12,
      pro7,
      pro8,
      pro1,
      pro2,
      pro3,
      pro4,
      pro5,
      pro6
    ],
    quickSpecs: [
      'Body: UPVC Injection Molded (White)',
      'Operation: 10-Position Ergonomic Red Lock Lever',
      'Seat: EPDM / FKM Resilient O-Rings',
      'Corrosion: High Acid & Alkali Proof',
      'Working Pressure: 150 PSI (10 Bar)',
      'Standard: DIN / ANSI / JIS Wafer Fitting'
    ],
    monthlyPayment: 11,
    installmentTitle: 'លក្ខខណ្ឌនៃការបង់',
    installmentText: 'ទូទាត់ប្រចាំខែត្រឹមតែ $11',
    installmentPartner: 'AEON Specialized Bank',
    installmentLogo: null,
    inStock: true,
    isPreOrder: false,
    sku: 'VLV-LV-10',
    descriptionLines: [
      '-Body Material: Injection-Molded UPVC (White Body)',
      '-Handle / Lever: High-Strength ABS Red Lever with 10-point locking plate',
      '-Disc: UPVC streamlined flow design',
      '-Seat & Seal: EPDM / FKM O-rings',
      '-Working Pressure: 150 PSI at 23°C (10 Bar)',
      '-End Connection: Wafer style compatible with DIN/ANSI/JIS flanges',
      '-Features: 100% corrosion proof, lightweight, low operating torque, acid resistant',
      '-Application: Water treatment, aquaculture, chemical processing, swimming pools',
      '-Warranty: 2 Years Replacement Warranty'
    ],
    reviews: standardReviews
  },
  'asus-vivobook-14': {
    id: 'asus-vivobook-14',
    title: 'ជេក ការចេំ ខ្នាត 15x15 (Floor Tile Architectural Grade)',
    brand: 'SCG Standard',
    price: 12.5,
    unit: '/ box',
    mainImage: pro1,
    gallery: [
      pro1,
      pro2,
      pro3,
      pro4,
      pro5,
      pro6,
      pro7,
      pro8,
      pro9,
      pro10,
      pro11,
      pro12
    ],
    quickSpecs: [
      'Material: Architectural Grade Porcelain & Ceramic',
      'Size: 15cm x 15cm (150x150mm) Rectified',
      'Thickness: 9.0mm Heavy-Duty Wear Resistant',
      'Finish: Non-Slip Matte (R10 Slip Rating)',
      'Water Absorption: <= 0.5% (Impervious)',
      'Coverage: 44 pieces / box (approx. 1.0 m²)',
      'Standard: ISO 13006 Certified',
      'Warranty: 5 Years Quality Guarantee'
    ],
    monthlyPayment: 10,
    installmentTitle: 'លក្ខខណ្ឌនៃការបង់',
    installmentText: 'ទូទាត់ប្រចាំខែត្រឹមតែ $10',
    installmentPartner: 'AEON Specialized Bank',
    installmentLogo: null,
    inStock: true,
    isPreOrder: false,
    sku: 'FT-1515-SCG',
    descriptionLines: [
      '-Material / Composition: Architectural Grade Glazed Porcelain & Ceramic Tile',
      '-Nominal Dimensions: 15cm x 15cm (150mm x 150mm) Rectified Edge',
      '-Thickness: 9.0mm Heavy-Duty Wear Resistant Body',
      '-Surface Finish: Nano-Glazed Anti-Slip Matte Texture (R10 Slip Rating)',
      '-Water Absorption: <= 0.5% (Impervious to moisture, mold, and mildew)',
      '-Breaking Strength: >= 1300 N | Modulus of Rupture: >= 35 N/mm²',
      '-Abrasion Resistance: PEI Class IV (Suitable for high foot-traffic residential & commercial)',
      '-Stain & Chemical Resistance: Class 5 (Maximum resistance to acids, alkalis, and oils)',
      '-Packaging Specification: 44 pieces / carton box (approx. 1.0 m² coverage)',
      '-Manufacturing Standard: ISO 13006 / EN 14411 Annex G Standard Certified',
      '-Warranty: 5 Years Genuine Color Fastness & Surface Guarantee'
    ],
    reviews: standardReviews
  }
}

/**
 * Retrieve product details by ID with dynamic fallback.
 * Guarantees that any product clicked across the catalog returns a complete detail object.
 */
export function getProductDetails(id) {
  if (!id) return productDetailsMap['floor-tile']

  const key = String(id).toLowerCase().trim()
  if (productDetailsMap[key]) {
    return productDetailsMap[key]
  }

  // Look in homeProducts
  const foundInHome = homeProducts.find((p) => String(p.id).toLowerCase() === key)
  if (foundInHome) {
    return createDetailFromCatalog(foundInHome)
  }

  // Look in allProducts
  const foundInAll = allProducts.find((p) => String(p.id).toLowerCase() === key)
  if (foundInAll) {
    return createDetailFromCatalog(foundInAll)
  }

  // Look in customPcProducts
  const customPc = customPcProducts.find((p) => String(p.id).toLowerCase() === key)
  if (customPc) {
    return createDetailFromCatalog(customPc)
  }

  // Default fallback: Floor Tile
  return productDetailsMap['floor-tile']
}

/**
 * Helper to generate a complete Product Detail view object from a catalog product.
 * Automatically generates matching technical specs and description lines fitting the product image.
 */
function createDetailFromCatalog(product) {
  const priceNum = typeof product.price === 'number'
    ? product.price
    : parseFloat(String(product.price).replace(/[^0-9.]/g, '')) || 12.5

  const monthlyEst = Math.max(10, Math.round(priceNum / 18))
  const matchingDescLines = generateDescriptionLines(product)

  return {
    id: product.id,
    title: product.title,
    brand: product.brand || 'HomeAll Certified',
    price: priceNum,
    unit: product.unit || '/Pc',
    mainImage: product.image || pro1,
    gallery: [
      product.image || pro1,
      pro1, pro2, pro3, pro4, pro5, pro6,
      pro7, pro8, pro9, pro10, pro11, pro12
    ].filter((val, idx, arr) => val && arr.indexOf(val) === idx),
    quickSpecs: product.specs && product.specs.length ? product.specs.map(s => `- ${s}`) : [
      `- Category: ${product.category || 'Quality Verified'}`,
      `- Standard: ISO 9001 Factory Inspected`,
      `- Quality: Premium Industrial Grade`,
      `- Availability: ${product.inStock === false ? 'Out of stock' : 'In Stock & Ready for Dispatch'}`,
      `- Warranty: 100% Genuine Product Warranty`,
      `- Packaging: Export Grade Safety Packing`
    ],
    monthlyPayment: monthlyEst,
    installmentTitle: 'លក្ខខណ្ឌនៃការបង់',
    installmentText: `ទូទាត់ប្រចាំខែត្រឹមតែ $${monthlyEst}`,
    installmentPartner: 'AEON Specialized Bank',
    installmentLogo: null,
    inStock: product.inStock !== false,
    isPreOrder: false,
    sku: `HA-${String(product.id).toUpperCase().slice(0, 8)}`,
    descriptionLines: matchingDescLines,
    reviews: standardReviews
  }
}
