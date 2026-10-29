import type { MenuItem } from '../types/menu';

import MenuCard from './card';

type MenuGridProps = {
  items: MenuItem[];
};

export default function MenuGrid({ items }: MenuGridProps) {
  return (
    <div className='menu-grid'>
      {items.map((item) => (
        <MenuCard item={item} key={item.slug} />
      ))}
    </div>
  );
}
