import type { Metadata } from 'next';

import MenuItemDetail from '@/modules/menu/components/item-detail';
import { getMenuItemBySlug, menuItems } from '@/modules/menu/data/menu';

type MenuItemPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return menuItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: MenuItemPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getMenuItemBySlug(slug);

  if (!item) {
    return {
      title: 'Dish Not Found',
    };
  }

  return {
    title: item.name,
    description: item.description,
    openGraph: {
      title: `${item.name} | BiteFlow`,
      description: item.description,
      images: [item.image],
    },
  };
}

export default async function MenuItemPage({ params }: MenuItemPageProps) {
  const { slug } = await params;
  return <MenuItemDetail slug={slug} />;
}
