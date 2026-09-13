import blogDonation from '@/assets/images/blog-donation.jpg'
import blogChristmas from '@/assets/images/blog-christmas.jpg'
import blogMsi from '@/assets/images/blog-msi.jpg'
import slide1 from '@/assets/images/slide1.jpg'
import slide2 from '@/assets/images/slide2.jpg'

export const blogCategories = [
  { id: 'all', name: 'All Categories', nameKm: 'ប្រភេទទាំងអស់' },
  { id: 'solutions', name: 'Solutions', nameKm: 'ដំណោះស្រាយ' },
  { id: 'announcements', name: 'Announcements', nameKm: 'សេចក្តីប្រកាស' },
  { id: 'events', name: 'Events', nameKm: 'ព្រឹត្តិការណ៍' }
]

export const blogArticles = [
  {
    id: 1,
    title: 'PTC Group Donates 30 Computers to Techo Sen Special Forces Training School to Support Technology Education',
    category: 'Solutions',
    categoryId: 'solutions',
    excerpt: 'PTC Group Donates 30 Computers to Techo Sen Special Forces Training School to Support Technology Education',
    image: blogDonation,
    date: 'Dec 20, 2025',
    author: 'PTC Group',
    readTime: '3 min read',
    content: `PTC Group has officially handed over 30 modern desktop computer systems to the Techo Sen Special Forces Training School. This contribution aims to bolster the school's information technology and educational training programs, providing students and officers with hands-on computer access and modern digital skills essential for operational success.`
  },
  {
    id: 2,
    title: '🎄 រីករាយបុណ្យណូអែល!',
    category: 'Solutions',
    categoryId: 'solutions',
    excerpt: 'PTC Computer សូមជូនពរ លោក លោកស្រី ជួបតែសំណាងល្អ សុខភាពល្អ ជោគជ័យគ្រប់ភារកិច្ចការងារ មានសុខភាពល្អ រកទទួលទានមានបាន និង ប្រាថ្នាអ្វីបានសម្រេចដូចបំណង។',
    image: blogChristmas,
    date: 'Dec 25, 2025',
    author: 'PTC Computer',
    readTime: '2 min read',
    content: `🎄 រីករាយបុណ្យណូអែល និងសួស្តីឆ្នាំថ្មី ២០២៦! PTC Computer សូមជូនពរដល់អតិថិជន លោក លោកស្រី អ្នកនាងកញ្ញា ជួបតែសំណាងល្អ សុខភាពល្អបរិបូរណ៍ ជោគជ័យគ្រប់ភារកិច្ចការងារ រកទទួលទានមានបាន និងប្រាថ្នាអ្វីបានសម្រេចដូចបំណង។ យើងខ្ញុំសូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅចំពោះការគាំទ្រ និងទំនុកចិត្តរបស់លោកអ្នកមកលើសេវាកម្ម និងផលិតផលរបស់យើងខ្ញុំជារៀងរហូតមក។`
  },
  {
    id: 3,
    title: "We're proud to announce that PTC Computer Co., Ltd is now the official distributor of MSI products in Cambodia!",
    category: 'Solutions',
    categoryId: 'solutions',
    excerpt: "We're proud to announce that PTC Computer Co., Ltd is now the official distributor of MSI products in Cambodia! On October 17, 2025, we celebrated this milestone with a meaningful launch event at Hyatt Regency Phnom Penh, joined by our founders Oknha Ung Se and Lok Chumteav Oknha Tang...",
    image: blogMsi,
    date: 'Oct 17, 2025',
    author: 'PTC Computer & MSI',
    readTime: '4 min read',
    content: `We are thrilled to announce that PTC Computer Co., Ltd has been appointed as the official distributor of MSI (Micro-Star International) products in the Kingdom of Cambodia! To commemorate this landmark partnership, an exclusive "MSI NEXT GEN LAUNCH" event was held on October 17, 2025, at the Hyatt Regency Phnom Penh, attended by our founders Oknha Ung Se and Lok Chumteav Oknha Tang, along with esteemed industry partners, tech enthusiasts, and media guests. Through this official partnership, Cambodian consumers and enterprises will enjoy access to MSI's cutting-edge laptops, gaming desktops, components, and enterprise solutions backed by genuine factory warranties and dedicated after-sales support.`
  },
  {
    id: 4,
    title: 'Innovative Building & Digital Infrastructure Solutions for 2026',
    category: 'Solutions',
    categoryId: 'solutions',
    excerpt: 'Explore modern architectural building materials and smart facility solutions designed to accelerate commercial development across Southeast Asia.',
    image: slide1,
    date: 'Nov 12, 2025',
    author: 'HomeAll Insights',
    readTime: '5 min read',
    content: `As urban development and infrastructure expand rapidly, modern enterprises require integrated solutions that blend high-grade building materials with smart electrical and digital systems. HomeAll continues to partner with world-class manufacturers to provide direct access to certified supplies, ensuring durability, cost efficiency, and sustainable engineering standards.`
  },
  {
    id: 5,
    title: 'Strategic Logistics & Timely Nationwide Supply Delivery',
    category: 'Announcements',
    categoryId: 'announcements',
    excerpt: 'How HomeAll ensures rapid, safe, and dependable nationwide delivery for construction and wholesale business orders.',
    image: slide2,
    date: 'Nov 28, 2025',
    author: 'Supply Chain Dept',
    readTime: '3 min read',
    content: `Dependable delivery timelines are crucial for active construction sites and enterprise supply chains. Discover how our centralized distribution hub and real-time logistics tracking streamline wholesale deliveries across all 25 provinces in Cambodia.`
  }
]

