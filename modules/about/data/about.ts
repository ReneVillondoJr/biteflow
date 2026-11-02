import { aboutDataSchema } from '../schema';

export const aboutData = aboutDataSchema.parse({
  hero: {
    eyebrow: 'The BiteFlow story',
    title: 'Good food has always',
    highlight: 'been about connection.',
    description:
      'BiteFlow began with a simple idea: the meals we remember are the ones shared with people we care about.',
    actionLabel: 'Meet our values',
    image:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=90',
  },
  origin: {
    eyebrow: 'Where we began',
    title: 'From one table to',
    highlight: 'a growing community.',
    description:
      'We set out to make everyday food feel more thoughtful and more accessible. Every dish balances familiar comfort with fresh ideas, while our ordering experience keeps things simple for busy days, shared meals, and special moments.',
    image:
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=90',
    imageAlt: 'A warm BiteFlow dining room with tables ready for guests',
    note: 'Made for moments around the table.',
  },
  values: [
    {
      icon: 'heart',
      title: 'Food with feeling',
      description:
        'We create dishes that comfort, satisfy, and make ordinary moments feel memorable.',
    },
    {
      icon: 'leaf',
      title: 'Thoughtful by choice',
      description:
        'We pair ingredients with purpose and keep our menu balanced, fresh, and full of flavor.',
    },
    {
      icon: 'utensils',
      title: 'Better when shared',
      description:
        'From quick lunches to long dinners, our food is made to bring people together.',
    },
  ],
});
