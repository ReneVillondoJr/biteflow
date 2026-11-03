import { locationsDataSchema } from '../schema';

export const locationsData = locationsDataSchema.parse({
  locations: [
    {
      id: 1,
      name: 'BiteFlow Makati',
      area: 'Makati City',
      address: '123 Ayala Avenue, Makati City',
      hours: 'Open today · 10:00 AM–11:00 PM',
      distance: '1.2 km',
      image:
        'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1000&q=85',
      services: ['pickup', 'delivery'],
    },
    {
      id: 2,
      name: 'BiteFlow Bonifacio',
      area: 'Bonifacio Global City',
      address: '28th Street, Bonifacio Global City',
      hours: 'Open today · 10:00 AM–10:30 PM',
      distance: '3.8 km',
      image:
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=85',
      services: ['pickup', 'delivery'],
    },
    {
      id: 3,
      name: 'BiteFlow Ortigas',
      area: 'Ortigas Center',
      address: '1605 San Miguel Avenue, Pasig City',
      hours: 'Open today · 9:00 AM–11:00 PM',
      distance: '6.4 km',
      image:
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=85',
      services: ['pickup', 'delivery'],
    },
  ],
});
