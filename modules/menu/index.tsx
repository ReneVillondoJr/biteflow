import MenuCatalog from './components/catalog';
import MenuCTA from './components/cta';
import MenuHero from './components/hero';

export { default as MenuItemDetail } from './components/item-detail';

export default function MenuPage() {
  return (
    <div className='menu-page'>
      <MenuHero />
      <MenuCatalog />
      <MenuCTA />
    </div>
  );
}
