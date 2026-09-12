/**
 * Data for the "All Categories" Mega Menu
 * Modeled after the Alibaba-style mega menu with sidebar categories
 * and circular product subcategories using real product images.
 */
import pro1 from '@/assets/images/pro1.jpg'
import pro2 from '@/assets/images/pro2.jpg'
import pro3 from '@/assets/images/pro3.jpg'
import pro4 from '@/assets/images/pro4.jpg'
import pro5 from '@/assets/images/pro5.jpg'
import pro6 from '@/assets/images/pro6.jpg'
import pro7 from '@/assets/images/pro7.png'
import pro8 from '@/assets/images/pro8.png'
import pro9 from '@/assets/images/pro9.png'
import pro10 from '@/assets/images/pro10.png'
import pro11 from '@/assets/images/pro11.png'
import pro12 from '@/assets/images/pro12.png'

export const megaMenuCategories = [
  {
    id: 'categories-for-you',
    name: 'Categories for you',
    icon: 'star',
    items: [
      { name: 'Floor Tiles', image: pro1, icon: 'car', hasBadge: true },
      { name: 'Steel Products', image: pro2, icon: 'meter' },
      { name: 'Plastic Resin', image: pro3, icon: 'camera' },
      { name: 'PVC Water Pipes', image: pro4, icon: 'analyzer' },
      { name: 'Bathroom Appliance', image: pro5, icon: 'multimeter' },
      { name: 'Kitchen Cookware', image: pro6, icon: 'sensor' },
      { name: 'Copper Pipes', image: pro7, icon: 'sensor' },
      { name: 'Agricultural Seeds', image: pro8, icon: 'tester' },
      { name: 'Kampot Pepper', image: pro9, icon: 'analyzer' },
      { name: 'Hardware Tools', image: pro10, icon: 'machine' },
      { name: 'Industrial Equipment', image: pro11, icon: 'equipment', hasBadge: true },
      { name: 'Construction Materials', image: pro12, icon: 'camera' },
      { name: 'Testing Equipment', image: pro4, icon: 'tester' },
      { name: 'Safety Equipment', image: pro5, icon: 'gauge' }
    ],
    secondarySection: {
      title: 'Consumer Electronics',
      linkText: 'Browse featured selections',
      linkHref: '/categories/consumer-electronics'
    }
  },
  {
    id: 'consumer-electronics',
    name: 'Consumer Electronics',
    icon: 'headphones',
    items: [
      { name: 'Smart Watches', image: pro10, icon: 'watch', hasBadge: true },
      { name: 'Wireless Earbuds', image: pro11, icon: 'headphones' },
      { name: 'Action Cameras', image: pro12, icon: 'camera' },
      { name: 'Power Banks', image: pro7, icon: 'battery' },
      { name: 'Camera Drones', image: pro8, icon: 'drone', hasBadge: true },
      { name: 'VR Headsets', image: pro9, icon: 'vr' },
      { name: 'Bluetooth Speakers', image: pro6, icon: 'speaker' },
      { name: 'Fast Chargers', image: pro5, icon: 'charger' },
      { name: 'Projectors', image: pro4, icon: 'projector' },
      { name: 'Smart Plugs', image: pro3, icon: 'plug' },
      { name: 'Microphones', image: pro2, icon: 'mic' },
      { name: 'Gimbals & Stabilizers', image: pro1, icon: 'gimbal' },
      { name: 'Dash Cams', image: pro10, icon: 'camera' },
      { name: 'Gaming Keyboards', image: pro11, icon: 'keyboard' }
    ],
    secondarySection: {
      title: 'Smart Home & Audio',
      linkText: 'Explore audio gear',
      linkHref: '/categories/audio'
    }
  },
  {
    id: 'sports-entertainment',
    name: 'Sports & Entertainment',
    icon: 'badminton',
    items: [
      { name: 'Mountain Bikes', image: pro7, icon: 'bike', hasBadge: true },
      { name: 'Camping Tents', image: pro8, icon: 'tent' },
      { name: 'Fitness Trackers', image: pro9, icon: 'watch' },
      { name: 'Yoga Mats', image: pro10, icon: 'mat' },
      { name: 'Fishing Rods', image: pro11, icon: 'fish' },
      { name: 'Skateboards', image: pro12, icon: 'board' },
      { name: 'Adjustable Dumbbells', image: pro1, icon: 'dumbbell' },
      { name: 'Paddle Boards', image: pro2, icon: 'surf' },
      { name: 'Treadmills', image: pro3, icon: 'treadmill' },
      { name: 'Sleeping Bags', image: pro4, icon: 'tent' },
      { name: 'Tennis Rackets', image: pro5, icon: 'racket' },
      { name: 'Hiking Backpacks', image: pro6, icon: 'bag', hasBadge: true },
      { name: 'Boxing Gloves', image: pro7, icon: 'glove' },
      { name: 'Water Bottles', image: pro8, icon: 'bottle' }
    ]
  },
  {
    id: 'commercial-equipment',
    name: 'Commercial Equipment & Machinery',
    icon: 'printer',
    items: [
      { name: 'Laser Engravers', image: pro10, icon: 'laser', hasBadge: true },
      { name: 'CNC Routers', image: pro11, icon: 'machine' },
      { name: 'Packaging Machines', image: pro12, icon: 'box' },
      { name: 'Industrial Printers', image: pro4, icon: 'printer' },
      { name: 'Vacuum Sealers', image: pro5, icon: 'seal' },
      { name: 'Conveyor Belts', image: pro6, icon: 'belt' },
      { name: 'Welding Machines', image: pro2, icon: 'welder' }
    ]
  },
  {
    id: 'construction-machinery',
    name: 'Construction & Building Machinery',
    icon: 'excavator',
    items: [
      { name: 'Mini Excavators', image: pro12, icon: 'excavator', hasBadge: true },
      { name: 'Concrete Mixers', image: pro11, icon: 'mixer' },
      { name: 'Forklifts', image: pro10, icon: 'forklift' },
      { name: 'Scaffolding Kits', image: pro2, icon: 'scaffold' },
      { name: 'Plate Compactors', image: pro4, icon: 'compactor' },
      { name: 'Power Trowels', image: pro1, icon: 'trowel' },
      { name: 'Diamond Blades', image: pro3, icon: 'blade' }
    ]
  },
  {
    id: 'lights-lighting',
    name: 'Lights & Lighting',
    icon: 'bulb',
    items: [
      { name: 'Solar Street Lights', image: pro7, icon: 'solar', hasBadge: true },
      { name: 'LED Flood Lights', image: pro8, icon: 'bulb' },
      { name: 'Smart Strip Lights', image: pro9, icon: 'led' },
      { name: 'Stage Lighting', image: pro10, icon: 'stage' },
      { name: 'Industrial High Bays', image: pro5, icon: 'highbay' },
      { name: 'Track Lighting', image: pro6, icon: 'track' },
      { name: 'Garden Pathway Lights', image: pro1, icon: 'garden' }
    ]
  },
  {
    id: 'apparel-accessories',
    name: 'Apparel & Accessories',
    icon: 'dress',
    items: [
      { name: "Women's Dresses", image: pro9, icon: 'dress', hasBadge: true },
      { name: 'Leather Bags', image: pro8, icon: 'bag' },
      { name: 'Sunglasses', image: pro7, icon: 'glasses' },
      { name: 'Belts & Buckles', image: pro6, icon: 'belt' },
      { name: 'Silk Scarves', image: pro5, icon: 'scarf' },
      { name: 'Casual Hats', image: pro4, icon: 'hat' },
      { name: 'Fashion Jewelry', image: pro3, icon: 'ring' }
    ]
  },
  {
    id: 'home-garden',
    name: 'Home & Garden',
    icon: 'home',
    items: [
      { name: 'Robot Vacuums', image: pro6, icon: 'vacuum', hasBadge: true },
      { name: 'Air Purifiers', image: pro5, icon: 'purifier' },
      { name: 'Gardening Tool Sets', image: pro4, icon: 'garden' },
      { name: 'Outdoor Furniture', image: pro3, icon: 'sofa' },
      { name: 'Kitchen Cookware', image: pro2, icon: 'pan' },
      { name: 'Electric Blenders', image: pro1, icon: 'blender' },
      { name: 'Storage Organizers', image: pro12, icon: 'box' }
    ]
  },
  {
    id: 'sportswear-apparel',
    name: 'Sportswear & Outdoor Apparel',
    icon: 'shirt',
    items: [
      { name: 'Compression Tops', image: pro8, icon: 'shirt', hasBadge: true },
      { name: 'Running Shorts', image: pro9, icon: 'shorts' },
      { name: 'Waterproof Jackets', image: pro10, icon: 'jacket' },
      { name: 'Hiking Pants', image: pro11, icon: 'pants' },
      { name: 'Thermal Base Layers', image: pro12, icon: 'thermal' },
      { name: 'Sports Socks', image: pro7, icon: 'socks' },
      { name: 'Reflective Vests', image: pro6, icon: 'vest' }
    ]
  }
]
