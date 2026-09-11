import pro1 from '@/assets/images/pro1.jpg'
import pro2 from '@/assets/images/pro2.jpg'
import pro3 from '@/assets/images/pro3.jpg'
import pro4 from '@/assets/images/pro4.jpg'
import pro5 from '@/assets/images/pro5.jpg'
import pro6 from '@/assets/images/pro6.jpg'

/**
 * "Feature Product" cards for the homepage.
 */
export const products = [
  {
    id: 'floor-tile',
    title: 'ជេក ការចេំ ខ្នាត 15x15',
    category: 'Floor Tile',
    price: '$12.50',
    unit: '/ box',
    image: pro1
  },
  {
    id: 'steel-product',
    title: 'បំពង់ដែក សម្រាប់សំណង់',
    category: 'Steel Product',
    price: '$28.00',
    unit: '/ piece',
    image: pro2
  },
  {
    id: 'plastic-resin',
    title: 'ជ័រផ្លាស្ទិក គុណភាពខ្ពស់',
    category: 'Plastic Resin',
    price: '$1,250',
    unit: '/ ton',
    image: pro3
  },
  {
    id: 'pvc-pipes',
    title: 'បំពង់ទឹក PVC',
    category: 'PVC Water Pipes',
    price: '$6.80',
    unit: '/ length',
    image: pro4
  }
]

/**
 * Filter Item Groups shown in the sidebar of All Products.
 */
export const itemGroups = [
  'Steel Product',
  'Copper Pipes',
  'Agricultural Products',
  'Kitchen Products',
  'Seasoning & Spice',
  'PVC Material',
  'Bathroom Appliances'
]

/**
 * Full product catalog for "All Products" view.
 * Matches the design mockup specification (Page 1) and includes items for all filter groups.
 */
export const allProducts = [
  {
    id: 'steel-15-15',
    title: 'ផលិតផលដែក ទំហំ 15×15',
    category: 'Steel Product',
    itemGroup: 'Steel Product',
    price: '0.75 $',
    inStock: true,
    stockText: 'Stock In',
    image: pro1
  },
  {
    id: 'tile-60-60',
    title: 'ក្បឿង 60×60 DD1021SH',
    category: 'Floor Tile',
    itemGroup: 'Floor Tile',
    price: '10.00 $',
    inStock: false,
    stockText: 'Out of stock',
    image: pro2
  },
  {
    id: 'pvc-25-50',
    title: 'បំពង់ PVC ទំហំ 25×50',
    category: 'Plastic Resin',
    itemGroup: 'PVC Material',
    price: '0.0749 $',
    inStock: false,
    stockText: 'Out of stock',
    image: pro3
  },
  {
    id: 'steel-scgty',
    title: 'ដែកកែកូត SCGTY150×114',
    category: 'Steel Product',
    itemGroup: 'Steel Product',
    price: '4.50 $',
    inStock: false,
    stockText: 'Out of stock',
    image: pro4
  },
  {
    id: 'bath-th-001',
    title: 'បន្ទប់ទឹក TH-001',
    category: 'Bathroom Appliance',
    itemGroup: 'Bathroom Appliances',
    price: '25.00 $',
    inStock: false,
    stockText: 'Out of stock',
    image: pro5
  },
  {
    id: 'kitchen-appliance',
    title: 'សម្ភារៈ ឧបករណ៍ផ្ទះបាយ',
    category: 'Kitchen Product',
    itemGroup: 'Kitchen Products',
    price: '8.00 $',
    inStock: false,
    stockText: 'Out of stock',
    image: pro6
  },
  {
    id: 'copper-pipe-01',
    title: 'បំពង់ស្ពាន់ Copper Pipe 1/2"',
    category: 'Copper Pipes',
    itemGroup: 'Copper Pipes',
    price: '14.20 $',
    inStock: true,
    stockText: 'Stock In',
    image: pro1
  },
  {
    id: 'agro-seed-01',
    title: 'គ្រាប់ពូជកសិកម្ម Agricultural Seeds',
    category: 'Agricultural Products',
    itemGroup: 'Agricultural Products',
    price: '3.50 $',
    inStock: true,
    stockText: 'Stock In',
    image: pro2
  },
  {
    id: 'spice-pepper-01',
    title: 'ម្រេចកំពត Kampot Pepper',
    category: 'Seasoning & Spice',
    itemGroup: 'Seasoning & Spice',
    price: '6.00 $',
    inStock: true,
    stockText: 'Stock In',
    image: pro3
  },
  {
    id: 'pvc-pipe-blue',
    title: 'បំពង់ជ័រ PVC Blue Pipe 20mm',
    category: 'PVC Material',
    itemGroup: 'PVC Material',
    price: '2.10 $',
    inStock: true,
    stockText: 'Stock In',
    image: pro4
  },
  {
    id: 'bath-sink-01',
    title: 'ក្បាលផ្កាឈូក Shower Head Set',
    category: 'Bathroom Appliance',
    itemGroup: 'Bathroom Appliances',
    price: '18.50 $',
    inStock: true,
    stockText: 'Stock In',
    image: pro5
  },
  {
    id: 'kitchen-cook-01',
    title: 'ឈុតឆ្នាំងដែក Cookware Pot Set',
    category: 'Kitchen Product',
    itemGroup: 'Kitchen Products',
    price: '32.00 $',
    inStock: false,
    stockText: 'Out of stock',
    image: pro6
  }
]
