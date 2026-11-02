import MenuCatalog from './components/catalog';
import MenuCTA from './components/cta';
import MenuHero from './components/hero';
import { menuData } from './data/menu';

export default function MenuPage() {
  return (
    <div className='menu-page'>
      <MenuHero />
      <MenuCatalog data={menuData} />
      <MenuCTA />
    </div>
  );
}
