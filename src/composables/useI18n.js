import { ref, computed } from 'vue'

// Global shared reactive locale state
const currentLocale = ref(localStorage.getItem('app_language') || 'en')

export const translations = {
  en: {
    nav: {
      home: 'Home',
      product: 'Product',
      about: 'About Us',
      new: 'New'
    },
    header: {
      searchPlaceholder: 'Search products',
      searchBtn: 'Search',
      signIn: 'Sign in',
      register: 'Register',
      cart: 'Cart',
      wishlist: 'Wishlist'
    },
    hero: {
      eyebrow: 'BUSINESS SOLUTIONS',
      heading: 'Everything your business needs',
      exploreProducts: 'Explore Products'
    },
    categories: {
      allCategories: 'All Categories',
      industrialParts: 'Industrial & Parts',
      construction: 'Construction',
      foodBeverage: 'Food & Beverage',
      logistics: 'Logistics',
      realEstate: 'Real Estate',
      services: 'Services',
      categoriesForYou: 'Categories for you',
      consumerElectronics: 'Consumer Electronics',
      browseFeatured: 'Browse featured selections',
      sportsEntertainment: 'Sports & Entertainment',
      commercialEquipment: 'Commercial Equipment & Machinery',
      constructionMachinery: 'Construction & Building Machinery',
      lightsLighting: 'Lights & Lighting',
      apparelAccessories: 'Apparel & Accessories',
      homeGarden: 'Home & Garden',
      sportswearApparel: 'Sportswear & Outdoor Apparel'
    },
    products: {
      breadcrumbHome: 'Home',
      breadcrumbVillage: 'Homeall Village',
      allProducts: 'All Products',
      filters: 'Filters',
      clearAll: 'Clear All',
      itemGroup: 'ITEM GROUP',
      searchPlaceholder: 'Search products',
      stockIn: 'Stock In',
      outOfStock: 'Out of stock',
      showing: 'Showing',
      of: 'of',
      productsText: 'products',
      previous: 'Previous',
      next: 'Next',
      noProducts: 'No products found matching your filter.',
      clearFilters: 'Clear filters',
      // Item groups & categories
      steelProduct: 'Steel Product',
      copperPipes: 'Copper Pipes',
      agriculturalProducts: 'Agricultural Products',
      kitchenProducts: 'Kitchen Products',
      kitchenProduct: 'Kitchen Product',
      seasoningSpice: 'Seasoning & Spice',
      pvcMaterial: 'PVC Material',
      bathroomAppliances: 'Bathroom Appliances',
      bathroomAppliance: 'Bathroom Appliance',
      floorTile: 'Floor Tile',
      plasticResin: 'Plastic Resin'
    },
    featured: {
      title: 'Feature Product',
      subtitle: 'Popular products from trusted suppliers',
      viewMore: 'View More Products',
      viewAll: 'View All Products in Store',
      addToCart: 'Add to Card'
    },
    about: {
      title: 'About Us',
      lead: 'We connect businesses with products, services and trusted partners across industries.',
      sub: 'Built for sourcing, selling, renting and growing your business.',
      readMore: 'Read About Us',
      company: 'HomeAll (Cambodia) Co., Ltd',
      p1: 'is dedicated to delivering excellence in construction materials, home products, and industrial solutions. We recognize that customer satisfaction and product reliability are the foundation for building trustworthy, long-lasting business relationships with our clients and partners.',
      p2: 'Our mission is designed to provide businesses and consumers with direct access to certified suppliers, transparent pricing, and comprehensive product catalogs. Regardless of whether you are a contractor, commercial developer, or individual homeowner, we attach great importance to quality assurance, timely delivery, and dependable customer support.',
      p3: 'We adhere strictly to international trade and product quality standards, ensuring that every order is handled with care and integrity. We look forward to partnering with you to bring your projects to life.'
    },
    servicesSection: {
      title: 'Explore Our Services',
      subtitle: 'Discover specialized solutions for every business need',
      retailsWholesale: 'Retails & Wholesale',
      foodBeverage: 'Food & Beverage',
      logistic: 'Logistic',
      realEstate: 'Buy-rent real estate',
      salonSkincare: 'Salon & Skin care',
      consignment: 'Consignment Products'
    },
    structuralMaterials: {
      breadcrumbHome: 'Home',
      breadcrumbCategories: 'Product Categories',
      breadcrumbCurrent: 'Structural Materials',
      pageTitle: 'Structural Materials',
      pageSubtitle: "The key to select the good structural materials, doesn't always require to pay expensively. The careful selection is, on the other hand, rather more crucial factor.",
      steelProducts: 'Steel Products',
      viewSteelProducts: 'View Steel Products',
      steelTube: 'Steel Tube',
      rebarsReinforcedSteelBars: 'Rebars Reinforced Steel Bars',
      lipChannel: 'Lip Channel',
      hBeamSteel: 'H Beam Steel',
      roundPipe: 'Round Pipe',
      angleSteel: 'Angle Steel',
      steelSheet: 'Steel Sheet',
      prefabricatedSteel: 'Prefabricated Steel',
      flatBarsSteel: 'Flat Bars Steel',
      channelSteel: 'Channel Steel',
      wiremesh: 'Wiremesh',
      expandedMetal: 'Expanded Metal',
      steelBendingWire: 'Steel Bending Wire',
      steelWeldingTools: 'Steel Welding Tools',
      steelGratingAndCaps: 'Steel Grating and Caps',
      multiPurposesSteel: 'Multi Purposes Steel',
      pipeSystemWork: 'Pipe System Work',
      steelChain: 'Steel Chain',
      hotRolledStructuralSteel: 'Hot Rolled Structural Steel',
      squareSteel: 'Square Steel',
      // Cement Section
      cement: 'Cement',
      viewCement: 'View Cement',
      roughcast: 'Roughcast',
      structuralMortar: 'Structural mortar',
      readyMixedMortar: 'Ready-mixed mortar',
      lightweightBrickPlaster: 'Lightweight brick plaster',
      lightweightBrickMasonryMortar: 'Lightweight Brick Masonry Mortar',
      skimCoat: 'Skim Coat',
      whiteCement: 'White Cement',
      floorScreedMortar50kg: 'Floor Screed Mortar 50 kg',
      plasteringMasonryTools: 'Plastering Masonry Tools'
    },
    constructionPage: {
      breadcrumbHome: 'Home',
      breadcrumbCategories: 'Product Categories',
      breadcrumbCurrent: 'Construction',
      pageTitle: 'Construction',
      pageSubtitle: 'High-standard construction materials, renovation solutions, and specialized architectural project installations.',
      worksTitle: 'Construction & Architectural Works',
      viewAllWorks: 'View Construction Works',
      materialsTitle: 'Key Construction Materials',
      viewAllMaterials: 'View Construction Materials',
      exteriorWallPainting: 'Exterior Wall Painting & Finishing',
      outdoorPatioCanopy: 'Outdoor Patio & Shade Sail',
      wallFloorTiling: 'Wall & Floor Tile Installation',
      gardenLawnSunshade: 'Garden Lawn Sunshade Canopy',
      villaExteriorAwning: 'Villa Exterior & Tensile Awning',
      camelPortlandCement: 'Camel Portland Cement 50kg',
      reinforcedSteelRebars: 'Reinforced Steel Rebars',
      structuralSteelTube: 'Structural Steel Tube',
      lipChannelPurlin: 'Lip Channel C-Purlin',
      hBeamStructuralSteel: 'H-Beam Structural Steel',
      squareBoxSteel: 'Square Box Steel'
    }
  },
  km: {
    nav: {
      home: 'ទំព័រដើម',
      product: 'ផលិតផល',
      about: 'អំពីយើង',
      new: 'ថ្មីៗ'
    },
    header: {
      searchPlaceholder: 'ស្វែងរកផលិតផល...',
      searchBtn: 'ស្វែងរក',
      signIn: 'ចូលគណនី',
      register: 'ចុះឈ្មោះ',
      cart: 'កន្ត្រក',
      wishlist: 'ទំនិញពេញចិត្ត'
    },
    hero: {
      eyebrow: 'ដំណោះស្រាយអាជីវកម្ម',
      heading: 'អ្វីៗគ្រប់យ៉ាងដែលអាជីវកម្មរបស់អ្នកត្រូវការ',
      exploreProducts: 'ស្វែងរកផលិតផល'
    },
    categories: {
      allCategories: 'ប្រភេទទាំងអស់',
      industrialParts: 'ឧស្សាហកម្ម និងគ្រឿងបន្លាស់',
      construction: 'សំណង់',
      foodBeverage: 'ម្ហូបអាហារ និងភេសជ្ជៈ',
      logistics: 'សេវាដឹកជញ្ជូន',
      realEstate: 'អចលនទ្រព្យ',
      services: 'សេវាកម្ម',
      categoriesForYou: 'ប្រភេទសម្រាប់អ្នក',
      consumerElectronics: 'គ្រឿងអេឡិចត្រូនិក',
      browseFeatured: 'មើលការជ្រើសរើសពិសេស',
      sportsEntertainment: 'កីឡា និងការកម្សាន្ត',
      commercialEquipment: 'ឧបករណ៍ពាណិជ្ជកម្ម និងគ្រឿងចក្រ',
      constructionMachinery: 'គ្រឿងចក្រសំណង់ និងអាគារ',
      lightsLighting: 'អំពូលភ្លើង និងការបំភ្លឺ',
      apparelAccessories: 'សម្លៀកបំពាក់ និងគ្រឿងតុបតែង',
      homeGarden: 'ផ្ទះ និងសួនច្បារ',
      sportswearApparel: 'សម្លៀកបំពាក់កីឡា'
    },
    products: {
      breadcrumbHome: 'ទំព័រដើម',
      breadcrumbVillage: 'ភូមិ Homeall',
      allProducts: 'ផលិតផលទាំងអស់',
      filters: 'តម្រងស្វែងរក',
      clearAll: 'សម្អាតទាំងអស់',
      itemGroup: 'ក្រុមទំនិញ',
      searchPlaceholder: 'ស្វែងរកផលិតផល...',
      stockIn: 'មានក្នុងស្តុក',
      outOfStock: 'អស់ពីស្តុក',
      showing: 'បង្ហាញ',
      of: 'នៃ',
      productsText: 'ផលិតផល',
      previous: 'ថយក្រោយ',
      next: 'បន្ទាប់',
      noProducts: 'រកមិនឃើញផលិតផលដែលត្រូវនឹងការស្វែងរករបស់អ្នកឡើយ។',
      clearFilters: 'សម្អាតតម្រង',
      // Item groups & categories
      steelProduct: 'ផលិតផលដែក',
      copperPipes: 'បំពង់ស្ពាន់',
      agriculturalProducts: 'ផលិតផលកសិកម្ម',
      kitchenProducts: 'ផលិតផលផ្ទះបាយ',
      kitchenProduct: 'ផលិតផលផ្ទះបាយ',
      seasoningSpice: 'គ្រឿងទេស និងរសជាតិ',
      pvcMaterial: 'សម្ភារៈ PVC',
      bathroomAppliances: 'បរិក្ខារបន្ទប់ទឹក',
      bathroomAppliance: 'បរិក្ខារបន្ទប់ទឹក',
      floorTile: 'ក្បឿងការ៉ូ',
      plasticResin: 'ជ័រផ្លាស្ទិក'
    },
    featured: {
      title: 'ផលិតផលពិសេស',
      subtitle: 'ផលិតផលពេញនិយមពីអ្នកផ្គត់ផ្គង់ដែលគួរឱ្យទុកចិត្ត',
      viewMore: 'មើលផលិតផលបន្ថែម',
      viewAll: 'មើលផលិតផលទាំងអស់ក្នុងហាង',
      addToCart: 'បញ្ចូលទៅកន្ត្រក'
    },
    about: {
      title: 'អំពីយើង',
      lead: 'យើងភ្ជាប់ទំនាក់ទំនងរវាងអាជីវកម្មជាមួយផលិតផល សេវាកម្ម និងដៃគូដែលគួរឱ្យទុកចិត្តនៅទូទាំងឧស្សាហកម្ម។',
      sub: 'បង្កើតឡើងសម្រាប់ការផ្គត់ផ្គង់ ការលក់ ការជួល និងការរីកលូតលាស់នៃអាជីវកម្មរបស់អ្នក។',
      readMore: 'អានបន្ថែមអំពីយើង',
      company: 'ក្រុមហ៊ុន HomeAll (Cambodia) Co., Ltd',
      p1: 'ប្តេជ្ញាផ្តល់នូវភាពល្អឥតខ្ចោះលើសម្ភារៈសំណង់ ផលិតផលគេហដ្ឋាន និងដំណោះស្រាយឧស្សាហកម្ម។ យើងទទួលស្គាល់ថាការពេញចិត្តរបស់អតិថិជន និងភាពជឿជាក់នៃផលិតផល គឺជាមូលដ្ឋានគ្រឹះក្នុងការកសាងទំនាក់ទំនងអាជីវកម្មយូរអង្វែង និងគួរឱ្យទុកចិត្តជាមួយអតិថិជន និងដៃគូរបស់យើង។',
      p2: 'បេសកកម្មរបស់យើងគឺផ្តល់ជូនអាជីវកម្ម និងអ្នកប្រើប្រាស់នូវការទទួលបានដោយផ្ទាល់ទៅកាន់អ្នកផ្គត់ផ្គង់ដែលមានការបញ្ជាក់ តម្លៃច្បាស់លាស់ និងកាតាឡុកផលិតផលទូលំទូលាយ។ មិនថាអ្នកជាអ្នកម៉ៅការ អ្នកអភិវឌ្ឍន៍ពាណិជ្ជកម្ម ឬម្ចាស់ផ្ទះនោះទេ យើងយកចិត្តទុកដាក់ខ្ពស់លើការធានាគុណភាព ការដឹកជញ្ជូនទាន់ពេលវេលា និងសេវាកម្មគាំទ្រអតិថិជនដ៏គួរឱ្យទុកចិត្ត។',
      p3: 'យើងប្រកាន់ខ្ជាប់យ៉ាងម៉ឺងម៉ាត់នូវស្តង់ដារពាណិជ្ជកម្មអន្តរជាតិ និងគុណភាពផលិតផល ដោយធានាថារាល់ការបញ្ជាទិញទាំងអស់ត្រូវបានដំណើរការដោយការយកចិត្តទុកដាក់ និងភាពស្មោះត្រង់។ យើងទន្ទឹងរង់ចាំធ្វើជាដៃគូជាមួយអ្នកដើម្បីសម្រេចគម្រោងរបស់អ្នកឱ្យក្លាយជាការពិត។'
    },
    servicesSection: {
      title: 'ស្វែងយល់ពីសេវាកម្មរបស់យើង',
      subtitle: 'ស្វែងរកដំណោះស្រាយជំនាញសម្រាប់គ្រប់តម្រូវការអាជីវកម្ម',
      retailsWholesale: 'លក់រាយ និងលក់ដុំ',
      foodBeverage: 'ម្ហូបអាហារ និងភេសជ្ជៈ',
      logistic: 'សេវាដឹកជញ្ជូន',
      realEstate: 'ទិញ-ជួល អចលនទ្រព្យ',
      salonSkincare: 'ហាងកែសម្ផស្ស និងថែរក្សាស្បែក',
      consignment: 'ទំនិញផ្ញើលក់'
    },
    structuralMaterials: {
      breadcrumbHome: 'ទំព័រដើម',
      breadcrumbCategories: 'ប្រភេទផលិតផល',
      breadcrumbCurrent: 'សម្ភារៈរចនាសម្ព័ន្ធ',
      pageTitle: 'សម្ភារៈរចនាសម្ព័ន្ធ (Structural Materials)',
      pageSubtitle: 'គន្លឹះក្នុងការជ្រើសរើសសម្ភារៈសំណង់រចនាសម្ព័ន្ធល្អ មិនចាំបាច់ទាល់តែចំណាយប្រាក់ថ្លៃនោះទេ។ ផ្ទុយទៅវិញ ការជ្រើសរើសដោយយកចិត្តទុកដាក់ និងត្រឹមត្រូវ គឺជាកត្តាសំខាន់បំផុត។',
      steelProducts: 'ផលិតផលដែក',
      viewSteelProducts: 'មើលផលិតផលដែក',
      steelTube: 'ដែកទីបជ្រុង (Steel Tube)',
      rebarsReinforcedSteelBars: 'ដែកសរសៃសំណង់ (Rebars)',
      lipChannel: 'ដែកស៊ី (Lip Channel)',
      hBeamSteel: 'ដែកអក្សរ H (H Beam)',
      roundPipe: 'ដែកទីបមូល (Round Pipe)',
      angleSteel: 'ដែកកែវ (Angle Steel)',
      steelSheet: 'សន្លឹកដែក (Steel Sheet)',
      prefabricatedSteel: 'ដែកសំណង់ផ្គុំស្រេច (Prefabricated)',
      flatBarsSteel: 'ដែកសំប៉ែត (Flat Bars)',
      channelSteel: 'ដែកអក្សរ U (Channel Steel)',
      wiremesh: 'សំណាញ់លួសដែក (Wiremesh)',
      expandedMetal: 'ដែកសំណាញ់ត្រីកោណ (Expanded Metal)',
      steelBendingWire: 'លួសចងដែក (Steel Bending Wire)',
      steelWeldingTools: 'ប្រដាប់ផ្សារដែក (Welding Tools)',
      steelGratingAndCaps: 'គម្របដែក និងបន្ទះរន្ធ (Grating & Caps)',
      multiPurposesSteel: 'ដែកពហុបំណង (Multi Purposes)',
      pipeSystemWork: 'ប្រព័ន្ធបំពង់ដែក (Pipe System)',
      steelChain: 'ច្រវាក់ដែក (Steel Chain)',
      hotRolledStructuralSteel: 'ដែកថែបកែច្នៃក្តៅ (Hot Rolled)',
      squareSteel: 'ដែកជ្រុងរឹង (Square Steel)',
      // Cement Section
      cement: 'ស៊ីម៉ងត៍ (Cement)',
      viewCement: 'មើលស៊ីម៉ងត៍ទាំងអស់',
      roughcast: 'ស៊ីម៉ងត៍បូកគ្រើម (Roughcast)',
      structuralMortar: 'ស៊ីម៉ងត៍បេតុងរចនាសម្ព័ន្ធ',
      readyMixedMortar: 'បាយអលាយស្រេច (Ready-mixed)',
      lightweightBrickPlaster: 'បាយអបូកឥដ្ឋស្រាល (Brick Plaster)',
      lightweightBrickMasonryMortar: 'បាយអរៀបឥដ្ឋស្រាល (Masonry Mortar)',
      skimCoat: 'ម្សៅបៀក (Skim Coat)',
      whiteCement: 'ស៊ីម៉ងត៍ស (White Cement)',
      floorScreedMortar50kg: 'បាយអចាក់កម្រាល 50 kg (Floor Screed)',
      plasteringMasonryTools: 'ឧបករណ៍បូក និងរៀបឥដ្ឋ (Masonry Tools)'
    },
    constructionPage: {
      breadcrumbHome: 'ទំព័រដើម',
      breadcrumbCategories: 'ប្រភេទផលិតផល',
      breadcrumbCurrent: 'សំណង់',
      pageTitle: 'សម្ភារៈ និងការងារសំណង់ (Construction)',
      pageSubtitle: 'សម្ភារៈសំណង់ស្តង់ដារខ្ពស់ ដំណោះស្រាយជួសជុលកែលម្អ និងការងារស្ថាបត្យកម្មសំណង់ខាងក្រៅនិងខាងក្នុងប្រកបដោយគុណភាព។',
      worksTitle: 'ការងារសំណង់ និងការតុបតែងស្ថាបត្យកម្ម',
      viewAllWorks: 'មើលការងារសំណង់ទាំងអស់',
      materialsTitle: 'សម្ភារៈសំណង់សំខាន់ៗ',
      viewAllMaterials: 'មើលសម្ភារៈសំណង់ទាំងអស់',
      exteriorWallPainting: 'ការងារលាបថ្នាំជញ្ជាំងខាងក្រៅ',
      outdoorPatioCanopy: 'ដំបូលតង់ម្លប់ទីធ្លាក្រៅ',
      wallFloorTiling: 'ការងារបិទការ៉ូជញ្ជាំង និងកម្រាល',
      gardenLawnSunshade: 'ដំបូលការពារកម្ដៅថ្ងៃសួនច្បារ',
      villaExteriorAwning: 'ការងារដំបូលតង់ផ្ទះវីឡា',
      camelPortlandCement: 'ស៊ីម៉ងត៍ Camel 50kg',
      reinforcedSteelRebars: 'ដែកសរសៃសំណង់ (Rebars)',
      structuralSteelTube: 'ដែកទីបជ្រុងរចនាសម្ព័ន្ធ',
      lipChannelPurlin: 'ដែកស៊ី (Lip Channel)',
      hBeamStructuralSteel: 'ដែកអក្សរ H (H-Beam)',
      squareBoxSteel: 'ដែកប្រអប់ជ្រុង'
    }
  }
}

export function useI18n() {
  function setLocale(locale) {
    currentLocale.value = locale
    localStorage.setItem('app_language', locale)
  }

  const t = (path, defaultText = '') => {
    if (!path) return defaultText
    const keys = path.split('.')
    let current = translations[currentLocale.value] || translations.en
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key]
      } else {
        // Fallback to English
        let fallback = translations.en
        for (const fKey of keys) {
          if (fallback && fallback[fKey] !== undefined) {
            fallback = fallback[fKey]
          } else {
            return defaultText || path
          }
        }
        return fallback
      }
    }
    return current ?? (defaultText || path)
  }

  const isKhmer = computed(() => currentLocale.value === 'km')

  return {
    currentLocale,
    setLocale,
    t,
    isKhmer
  }
}
