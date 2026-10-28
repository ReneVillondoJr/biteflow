import { homeContentSchema } from '../schema';

export const homeContent = homeContentSchema.parse({
  heroImage:
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1400&q=90',

  storyImage:
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85',

  restaurantLinks: [
    { label: 'Home', href: '/' },
    { label: 'Menu', href: '/menu' },
    { label: 'Offers', href: '/offers' },
    { label: 'Our story', href: '/about' },
    { label: 'Locations', href: '/locations' },
    { label: 'Contact', href: '/contact' },
  ],

  exploreLinks: [
    { label: 'Full menu', href: '/menu' },
    { label: 'Special offers', href: '/offers' },
    { label: 'Order online', href: '/menu' },
    { label: 'Reservations', href: '/reservations' },
  ],

  menuCategories: [
    { label: 'All favorites', slug: 'all' },
    { label: 'Pasta', slug: 'pasta' },
    { label: 'Burgers', slug: 'burgers' },
    { label: 'Rice bowls', slug: 'rice-bowls' },
    { label: 'Desserts', slug: 'desserts' },
  ],

  featuredItems: [
    {
      slug: 'creamy-mushroom-pasta',
      name: 'Creamy Mushroom Pasta',
      category: 'Pasta',
      categorySlug: 'pasta',
      description:
        'Silky cream sauce, golden mushrooms, parmesan, and fresh herbs.',
      price: 289,
      image:
        'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85',
      badge: 'House favorite',
    },
    {
      slug: 'signature-smash-burger',
      name: 'Signature Smash Burger',
      category: 'Burgers',
      categorySlug: 'burgers',
      description:
        'A juicy seared patty, crisp lettuce, house sauce, and toasted brioche.',
      price: 259,
      image:
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85',
      badge: 'Bestseller',
    },
    {
      slug: 'fresh-garden-rice-bowl',
      name: 'Fresh Garden Bowl',
      category: 'Rice bowls',
      categorySlug: 'rice-bowls',
      description: 'Fresh greens, vibrant vegetables, and a savory dressing.',
      price: 229,
      image:
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=85',
    },
    {
      slug: 'classic-cheesecake',
      name: 'Classic Cheesecake',
      category: 'Desserts',
      categorySlug: 'desserts',
      description:
        'Creamy cheesecake with a buttery crumb and a delicate finish.',
      price: 149,
      image:
        'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=85',
      badge: 'Something sweet',
    },
  ],

  highlights: [
    {
      icon: 'leaf',
      title: 'Fresh-feeling favorites',
      description: 'A menu made for everyday cravings.',
    },
    {
      icon: 'chef-hat',
      title: 'Made with intention',
      description: 'Comfort food with a little extra care.',
    },
    {
      icon: 'package-check',
      title: 'Simple online ordering',
      description: 'Browse, choose, and order with ease.',
    },
  ],

  storyPoints: [
    {
      icon: 'heart',
      title: 'Food that feels familiar',
      description:
        'Comforting choices and satisfying flavors for the moments that matter.',
    },
    {
      icon: 'leaf',
      title: 'A thoughtful approach',
      description:
        'A menu designed around balance, flavor, and ingredients that belong together.',
    },
    {
      icon: 'utensils-crossed',
      title: 'Made for sharing',
      description:
        'Easy choices for a solo treat, quick lunch, or meal with your favorite people.',
    },
  ],

  orderingSteps: [
    {
      number: '01',
      icon: 'shopping-bag',
      title: 'Find your favorite',
      description:
        'Explore the menu, discover new dishes, and choose what sounds good today.',
    },
    {
      number: '02',
      icon: 'utensils-crossed',
      title: 'Make it yours',
      description:
        'Review your choices, customize available options, and complete checkout.',
    },
    {
      number: '03',
      icon: 'package-check',
      title: 'Enjoy the good stuff',
      description: 'Follow your order status and get ready to enjoy your meal.',
    },
  ],
});
