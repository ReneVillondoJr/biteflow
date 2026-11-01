import { offersDataSchema } from '../schema';

export const offersData = offersDataSchema.parse({
  hero: {
    eyebrow: 'Good food, better value',
    title: 'More reasons to',
    highlight: 'love every bite.',
    description:
      'Thoughtfully paired meals, limited-time savings, and small treats that make the everyday feel a little more special.',
    actionLabel: 'View current offers',
    featuredLabel: 'Featured this week',
    featuredNote: 'Lunch pair from ₱299',
    image:
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=90',
  },
  categories: [
    { label: 'All offers', slug: 'all' },
    { label: 'Lunch deals', slug: 'lunch' },
    { label: 'Meal bundles', slug: 'bundles' },
    { label: 'Sweet pairings', slug: 'sweet' },
  ],
  offers: [
    {
      slug: 'midday-pair',
      label: 'Lunch deal',
      title: 'The Midday Pair',
      description:
        'A fresh rice bowl and chilled drink, made for a satisfying lunch break.',
      categorySlug: 'lunch',
      price: 299,
      saving: 45,
      image:
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1100&q=85',
      href: '/menu/fresh-garden-rice-bowl',
      availability: 'Available daily, 11 AM–4 PM',
      theme: 'green',
    },
    {
      slug: 'dinner-for-two',
      label: 'Meal bundle',
      title: 'Dinner for Two',
      description:
        'Two comfort favorites, one perfect table, and plenty to share.',
      categorySlug: 'bundles',
      price: 499,
      saving: 79,
      image:
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1100&q=85',
      href: '/menu/signature-smash-burger',
      availability: 'Available after 5 PM',
      theme: 'amber',
    },
    {
      slug: 'coffee-cheesecake',
      label: 'Sweet pairing',
      title: 'Coffee & Cheesecake',
      description:
        'A comforting slice with a smooth cold brew for an easy afternoon.',
      categorySlug: 'sweet',
      price: 249,
      saving: 35,
      image:
        'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1100&q=85',
      href: '/menu/classic-cheesecake',
      availability: 'Available all day',
      theme: 'rose',
    },
  ],
});
