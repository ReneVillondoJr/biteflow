import MenuCatalog from './components/catalog';
import MenuCTA from './components/cta';
import MenuHero from './components/hero';

export default function MenuPage() {
  return (
    <div className='menu-page'>
      <MenuHero />
      <MenuCatalog />
      <MenuCTA />
    </div>
  );
}
