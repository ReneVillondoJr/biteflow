import SiteFooter from '@/modules/home/components/site-footer';
import SiteHeader from '@/modules/home/components/site-header';

import MenuCatalog from './components/catalog';
import MenuCTA from './components/cta';
import MenuHero from './components/hero';
import { menuData } from './data/menu';

export default function MenuPage() {
  return (
    <>
      <SiteHeader />

      <main className='menu-page'>
        <MenuHero />
        <MenuCatalog data={menuData} />
        <MenuCTA />
      </main>

      <SiteFooter />
    </>
  );
}
