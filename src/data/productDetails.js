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
 * Complete technical description lines matching reference specification format
 */
export const asusFullDescriptionLines = [
  '-CPU / Processor: Intel® Core™ 5 Processor 320 (6MB Cache, 1.5 GHz up to 4.6 GHz, 6 cores, 6 Threads)',
  '- Neural Processor: Intel® NPU up to 16TOPS',
  '-Operating System: Window 11Home Single Language (64Bit)',
  '-RAM / Memory: 8GB DDR5 SO-DIMM',
  '-Storage: 512GB M.2 NVMe™ PCIe® 4.0 SSD',
  '-Graphic: Intel® Graphics',
  '-Display: 14.0-inch FHD (1920 x 1080) IPS-level Panel 16:9 aspect ratio LED Backlit, 60Hz, Non-touch screen-Brightness 250nits, Color gamut 45% NTSC, display 84% Screen-to-body ratio',
  '-Optical Drive: None,',
  '-Webcam: 720p HD camera With privacy shutter',
  '-Wireless: Wi-Fi 6(802.11ax) (Dual band) 1*1 + Bluetooth® 5.3 Wireless Card (*Bluetooth® version may change with OS version different.)',
  '-Network: None',
  '-Audio: SonicMaster Built-in speaker Built-in array microphone',
  '-Ports: 1x USB 2.0 Type-A (data speed up to 480Mbps)',
  '       1x USB 3.2 Gen 1 Type-C (data speed up to 5Gbps)',
  '       2x USB 3.2 Gen 1 Type-A (data speed up to 5Gbps)',
  '       1x HDMI 1.4',
  '       1x 3.5mm Combo Audio Jack',
  '       1x DC-in',
  '-Keyboard: Backlit Chiclet Keyboard Precision touchpad',
  '-Fingerprint: Yes',
  '-Battery: 42WHrs, 3S1P, 3-cell Li-ion',
  '-Weight: 1.40 kg (3.09 lbs)',
  '-Color: Quiet Blue',
  '-Warranty: 2Years Warranty + 1st Year Local Perfect Warranty'
]

/**
 * Standard customer reviews
 */
export const standardReviews = [
  {
    author: 'Sokha R.',
    date: '2026-03-10',
    rating: 5,
    comment: 'Very high quality product, fast dispatch, and excellent customer service. Perfect for my project!'
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
    rating: 4,
    comment: 'Solid build and reliable performance. Recommended for construction and plumbing works.'
  }
]

/**
 * Detailed specifications for products.
 */
export const productDetailsMap = {
  'asus-vivobook-14': {
    id: 'asus-vivobook-14',
    title: 'ASUS Vivobook 14 (Intel Core 5 Processor 320 / 8GB / 512GB)',
    brand: 'ASUS',
    price: 839,
    unit: '/Pc',
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
      'CPU: Intel® Core™ 5 Processor 320',
      'OS: Window 11 Home',
      'RAM: 8GB DDR5 SO-DIMM',
      'Storage: 512GB M.2 4.0 SSD',
      'Graphic: Intel® Graphics',
      'Display: 14" FHD (1920 x 1080)IPS',
      'Battery: 3-cell Integrated',
      'Backlit Chiclet Keyboard',
      'Weight: 1.40kg',
      '2years+ 1st Perfect Warranty'
    ],
    monthlyPayment: 51,
    installmentTitle: 'លក្ខខណ្ឌនៃការបង់',
    installmentText: 'ទូទាត់ប្រចាំខែត្រឹមតែ $51',
    installmentPartner: 'AEON Specialized Bank',
    installmentLogo: null,
    inStock: true,
    isPreOrder: true,
    sku: 'ASUS-VIVO-14-320',
    descriptionLines: asusFullDescriptionLines,
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
      'Standard: ISO 1452 / BS 3505',
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
    descriptionLines: asusFullDescriptionLines,
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
      'Material: EPDM / NBR Industrial Rubber',
      'Flange Standard: ANSI B16.5 / JIS 10K',
      'Pressure Rating: Up to 25 Bar',
      'Temperature: -20°C to +120°C',
      'Application: Flange sealing, anti-vibration'
    ],
    monthlyPayment: 10,
    installmentTitle: 'លក្ខខណ្ឌនៃការបង់',
    installmentText: 'ទូទាត់ប្រចាំខែត្រឹមតែ $10',
    installmentPartner: 'AEON Specialized Bank',
    installmentLogo: null,
    inStock: true,
    isPreOrder: false,
    sku: 'GSK-HD-08',
    descriptionLines: asusFullDescriptionLines,
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
      'Body: Epoxy Coated Cast Iron / Ductile Iron',
      'Disc: CF8M Stainless Steel',
      'Seat: EPDM Food Grade Liner',
      'Actuation: Manual Handwheel Worm Gearbox',
      'Working Pressure: PN16 / 200 PSI'
    ],
    monthlyPayment: 12,
    installmentTitle: 'លក្ខខណ្ឌនៃការបង់',
    installmentText: 'ទូទាត់ប្រចាំខែត្រឹមតែ $12',
    installmentPartner: 'AEON Specialized Bank',
    installmentLogo: null,
    inStock: true,
    isPreOrder: false,
    sku: 'VLV-BF-09',
    descriptionLines: asusFullDescriptionLines,
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
      'Body: UPVC Injection Molded',
      'Operation: 10-Position Ergonomic Lock Lever',
      'Seat: EPDM / FPM O-Rings',
      'Corrosion Resistance: High Acid & Alkali proof',
      'Standard: DIN / ANSI / JIS'
    ],
    monthlyPayment: 11,
    installmentTitle: 'លក្ខខណ្ឌនៃការបង់',
    installmentText: 'ទូទាត់ប្រចាំខែត្រឹមតែ $11',
    installmentPartner: 'AEON Specialized Bank',
    installmentLogo: null,
    inStock: true,
    isPreOrder: false,
    sku: 'VLV-LV-10',
    descriptionLines: asusFullDescriptionLines,
    reviews: standardReviews
  },
  'printer-epson-l3210': {
    id: 'printer-epson-l3210',
    title: 'Printer Epson EcoTank L3210 A4 Color (3-in-1)',
    brand: 'Epson',
    price: 125,
    unit: '/Pc',
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
      'Functions: Print, Scan, Copy (3-in-1)',
      'Ink System: EcoTank Refillable Bottle (003)',
      'Print Speed: Up to 33 ppm black, 15 ppm color',
      'Resolution: 5760 x 1440 dpi',
      'Compact Integrated Tank Design',
      'Warranty: 1 Year or 30,000 pages'
    ],
    monthlyPayment: 12,
    installmentTitle: 'លក្ខខណ្ឌនៃការបង់',
    installmentText: 'ទូទាត់ប្រចាំខែត្រឹមតែ $12',
    installmentPartner: 'AEON Specialized Bank',
    installmentLogo: null,
    inStock: true,
    isPreOrder: false,
    sku: 'PRE-L3210',
    descriptionLines: asusFullDescriptionLines,
    reviews: standardReviews
  },
  'acer-aspire-lite-al15-32p': {
    id: 'acer-aspire-lite-al15-32p',
    title: 'Acer Aspire Lite AL15-32P-C5CE-N4500-8GB-512GB-15.6"-No ODD',
    brand: 'Acer',
    price: 369,
    unit: '/Pc',
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
      'CPU: Intel® Celeron® N4500 Processor',
      'OS: Windows 11 Home',
      'RAM: 8GB DDR4 RAM',
      'Storage: 512GB PCIe NVMe SSD',
      'Display: 15.6" Full HD (1920 x 1080)',
      'Graphic: Intel® UHD Graphics'
    ],
    monthlyPayment: 28,
    installmentTitle: 'លក្ខខណ្ឌនៃការបង់',
    installmentText: 'ទូទាត់ប្រចាំខែត្រឹមតែ $28',
    installmentPartner: 'AEON Specialized Bank',
    installmentLogo: null,
    inStock: true,
    isPreOrder: false,
    sku: 'LAL-0027',
    descriptionLines: asusFullDescriptionLines,
    reviews: standardReviews
  },
  'acer-aspire-lite-al15-54p': {
    id: 'acer-aspire-lite-al15-54p',
    title: 'Acer Aspire Lite AL15-54P-58BE-Core Ultra 5-115U-16GB-512G-15.6',
    brand: 'Acer',
    price: 649,
    unit: '/Pc',
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
      'CPU: Intel® Core™ Ultra 5-115U Processor',
      'OS: Windows 11 Home',
      'RAM: 16GB DDR5 RAM',
      'Storage: 512GB PCIe NVMe SSD',
      'Display: 15.6" Full HD (1920 x 1080)'
    ],
    monthlyPayment: 46,
    installmentTitle: 'លក្ខខណ្ឌនៃការបង់',
    installmentText: 'ទូទាត់ប្រចាំខែត្រឹមតែ $46',
    installmentPartner: 'AEON Specialized Bank',
    installmentLogo: null,
    inStock: true,
    isPreOrder: false,
    sku: 'LAL-0028',
    descriptionLines: asusFullDescriptionLines,
    reviews: standardReviews
  },
  'printer-epson-l3250': {
    id: 'printer-epson-l3250',
    title: 'Printer Epson EcoTank L3250 A4 Color (3-in-1) (Wi-Fi, Print, Scan, Copy)',
    brand: 'Epson',
    price: 140,
    unit: '/Pc',
    mainImage: pro5,
    gallery: [
      pro5,
      pro1,
      pro2,
      pro3,
      pro4,
      pro6,
      pro7,
      pro8,
      pro9,
      pro10,
      pro11,
      pro12
    ],
    quickSpecs: [
      'Functions: Wi-Fi, Print, Scan, Copy (3-in-1)',
      'Ink System: EcoTank Refillable Bottle (003)',
      'Connectivity: Wi-Fi & Wi-Fi Direct + USB',
      'Print Speed: Up to 33 ppm black, 15 ppm color',
      'Resolution: 5760 x 1440 dpi'
    ],
    monthlyPayment: 13,
    installmentTitle: 'លក្ខខណ្ឌនៃការបង់',
    installmentText: 'ទូទាត់ប្រចាំខែត្រឹមតែ $13',
    installmentPartner: 'AEON Specialized Bank',
    installmentLogo: null,
    inStock: true,
    isPreOrder: false,
    sku: 'PRE-L3250',
    descriptionLines: asusFullDescriptionLines,
    reviews: standardReviews
  },
  'floor-tile': {
    id: 'floor-tile',
    title: 'ជេក ការចេំ ខ្នាត 15x15 (Floor Tile Premium Grade)',
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
      'Category: Floor Tile & Surface Material',
      'Standard: ISO 9001 Factory Inspected',
      'Durability: High-strength wear & weather proof',
      'Finish: Premium protective non-slip glaze',
      'Dimensions: 15cm x 15cm Architectural Grade',
      'Warranty: 100% Genuine Quality Guaranteed'
    ],
    monthlyPayment: 10,
    installmentTitle: 'លក្ខខណ្ឌនៃការបង់',
    installmentText: 'ទូទាត់ប្រចាំខែត្រឹមតែ $10',
    installmentPartner: 'AEON Specialized Bank',
    installmentLogo: null,
    inStock: true,
    isPreOrder: false,
    sku: 'FT-1515-SCG',
    descriptionLines: asusFullDescriptionLines,
    reviews: standardReviews
  },
  'steel-product': {
    id: 'steel-product',
    title: 'បំពង់ដែក សម្រាប់សំណង់ (High-Grade Construction Steel Pipe)',
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
      'Finish: Anti-rust protective prime coating',
      'Thickness: 2.5mm heavy-gauge structural wall',
      'Length: Standard 6.0 meter construction lengths',
      'Usage: Column, trusses, lintels and support framing',
      'Warranty: Mill test certificate included'
    ],
    monthlyPayment: 15,
    installmentTitle: 'លក្ខខណ្ឌនៃការបង់',
    installmentText: 'ទូទាត់ប្រចាំខែត្រឹមតែ $15',
    installmentPartner: 'AEON Specialized Bank',
    installmentLogo: null,
    inStock: true,
    isPreOrder: false,
    sku: 'ST-PIPE-28',
    descriptionLines: asusFullDescriptionLines,
    reviews: standardReviews
  }
}

/**
 * Retrieve product details by ID with dynamic fallback.
 * Guarantees that any product clicked across the catalog returns a complete detail object.
 */
export function getProductDetails(id) {
  if (!id) return productDetailsMap['asus-vivobook-14']

  const key = String(id).toLowerCase().trim()
  if (productDetailsMap[key]) {
    return productDetailsMap[key]
  }

  // Look in customPcProducts
  const customPc = customPcProducts.find((p) => String(p.id).toLowerCase() === key)
  if (customPc) {
    return createDetailFromCatalog(customPc)
  }

  // Look in allProducts
  const foundInAll = allProducts.find((p) => String(p.id).toLowerCase() === key)
  if (foundInAll) {
    return createDetailFromCatalog(foundInAll)
  }

  // Look in homeProducts
  const foundInHome = homeProducts.find((p) => String(p.id).toLowerCase() === key)
  if (foundInHome) {
    return createDetailFromCatalog(foundInHome)
  }

  // Default fallback: ASUS Vivobook
  return productDetailsMap['asus-vivobook-14']
}

/**
 * Helper to generate a complete Product Detail view object from a catalog product.
 */
function createDetailFromCatalog(product) {
  const priceNum = typeof product.price === 'number'
    ? product.price
    : parseFloat(String(product.price).replace(/[^0-9.]/g, '')) || 50

  const monthlyEst = Math.max(10, Math.round(priceNum / 18))

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
    descriptionLines: asusFullDescriptionLines,
    reviews: standardReviews
  }
}
