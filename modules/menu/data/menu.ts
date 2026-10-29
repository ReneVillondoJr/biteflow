import { menuDataSchema } from '../schema';

export const menuData = menuDataSchema.parse({
  categories: [
    {
      label: 'All favorites',
      slug: 'all',
      description: 'Explore everything we have prepared for you.',
    },
    {
      label: 'Rice bowls',
      slug: 'rice-bowls',
      description: 'Satisfying rice meals for every kind of craving.',
    },
    {
      label: 'Pasta',
      slug: 'pasta',
      description: 'Comforting classics with rich, satisfying flavors.',
    },
    {
      label: 'Burgers',
      slug: 'burgers',
      description: 'Juicy burgers with deliciously balanced toppings.',
    },
    {
      label: 'Sides',
      slug: 'sides',
      description: 'Little extras that make a meal even better.',
    },
    {
      label: 'Desserts',
      slug: 'desserts',
      description: 'Something sweet to finish on a high note.',
    },
    {
      label: 'Drinks',
      slug: 'drinks',
      description: 'Refreshing sips to complement your meal.',
    },
  ],

  items: [
    {
      slug: 'signature-chicken-rice-bowl',
      name: 'Signature Chicken Bowl',
      category: 'Rice bowls',
      categorySlug: 'rice-bowls',
      description:
        'Tender glazed chicken, fragrant rice, fresh greens, and our signature savory sauce.',
      price: 219,
      image:
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=85',
      badge: 'Bestseller',
      prepTime: 15,
      tags: ['Chicken', 'Rice', 'House favorite'],
      isPopular: true,
      isAvailable: true,
    },
    {
      slug: 'crispy-chicken-rice-meal',
      name: 'Crispy Chicken Meal',
      category: 'Rice bowls',
      categorySlug: 'rice-bowls',
      description:
        'Golden, crispy chicken served with steamed rice and a delicious dipping sauce.',
      price: 199,
      image:
        'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=85',
      badge: 'Guest favorite',
      prepTime: 18,
      tags: ['Chicken', 'Crispy', 'Rice'],
      isPopular: true,
      isAvailable: true,
    },
    {
      slug: 'fresh-garden-rice-bowl',
      name: 'Fresh Garden Bowl',
      category: 'Rice bowls',
      categorySlug: 'rice-bowls',
      description:
        'Colorful vegetables, fresh greens, rice, and a light savory dressing.',
      price: 189,
      image:
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85',
      prepTime: 12,
      tags: ['Vegetables', 'Fresh', 'Rice'],
      isPopular: false,
      isAvailable: true,
    },
    {
      slug: 'creamy-mushroom-pasta',
      name: 'Creamy Mushroom Pasta',
      category: 'Pasta',
      categorySlug: 'pasta',
      description:
        'Silky cream sauce, golden mushrooms, parmesan, and fragrant herbs.',
      price: 289,
      image:
        'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85',
      badge: 'House favorite',
      prepTime: 18,
      tags: ['Pasta', 'Creamy', 'Vegetarian option'],
      isPopular: true,
      isAvailable: true,
    },
    {
      slug: 'classic-tomato-pasta',
      name: 'Classic Tomato Pasta',
      category: 'Pasta',
      categorySlug: 'pasta',
      description:
        'A comforting tomato sauce with garlic, herbs, and grated parmesan.',
      price: 229,
      image:
        'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=85',
      prepTime: 15,
      tags: ['Pasta', 'Tomato', 'Classic'],
      isPopular: false,
      isAvailable: true,
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
      prepTime: 16,
      tags: ['Beef', 'Burger', 'House sauce'],
      isPopular: true,
      isAvailable: true,
    },
    {
      slug: 'crispy-chicken-burger',
      name: 'Crispy Chicken Burger',
      category: 'Burgers',
      categorySlug: 'burgers',
      description:
        'Crunchy chicken, fresh lettuce, creamy sauce, and a soft toasted bun.',
      price: 229,
      image:
        'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=900&q=85',
      prepTime: 15,
      tags: ['Chicken', 'Burger', 'Crispy'],
      isPopular: false,
      isAvailable: true,
    },
    {
      slug: 'golden-french-fries',
      name: 'Golden French Fries',
      category: 'Sides',
      categorySlug: 'sides',
      description:
        'Crispy golden fries, lightly seasoned and ready for your favorite dip.',
      price: 99,
      image:
        'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85',
      prepTime: 8,
      tags: ['Potatoes', 'Side', 'Crispy'],
      isPopular: true,
      isAvailable: true,
    },
    {
      slug: 'loaded-cheese-fries',
      name: 'Loaded Cheese Fries',
      category: 'Sides',
      categorySlug: 'sides',
      description:
        'Hot crispy fries finished with creamy cheese sauce and seasoning.',
      price: 149,
      image:
        'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?auto=format&fit=crop&w=900&q=85',
      prepTime: 10,
      tags: ['Cheese', 'Side', 'Sharing'],
      isPopular: false,
      isAvailable: true,
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
      prepTime: 3,
      tags: ['Dessert', 'Cheesecake', 'Sweet'],
      isPopular: true,
      isAvailable: true,
    },
    {
      slug: 'chocolate-brownie',
      name: 'Chocolate Brownie',
      category: 'Desserts',
      categorySlug: 'desserts',
      description:
        'A rich chocolate brownie with a soft center and deep cocoa flavor.',
      price: 99,
      image:
        'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85',
      prepTime: 3,
      tags: ['Chocolate', 'Dessert', 'Sweet'],
      isPopular: false,
      isAvailable: true,
    },
    {
      slug: 'iced-citrus-tea',
      name: 'Iced Citrus Tea',
      category: 'Drinks',
      categorySlug: 'drinks',
      description: 'A refreshing chilled tea with bright citrus notes.',
      price: 89,
      image:
        'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=85',
      prepTime: 3,
      tags: ['Tea', 'Cold drink', 'Citrus'],
      isPopular: false,
      isAvailable: true,
    },
  ],
});

export const menuCategories = menuData.categories;
export const menuItems = menuData.items;

export function getMenuItemBySlug(slug: string) {
  return menuItems.find((item) => item.slug === slug);
}
