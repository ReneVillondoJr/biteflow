import type { Metadata } from 'next';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';

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

async function MenuItemContent({ params }: MenuItemPageProps) {
  const { slug } = await params;
  const item = getMenuItemBySlug(slug);

  if (!item) {
    notFound();
  }

  return <MenuItemDetail item={item} />;
}

export default function MenuItemPage({ params }: MenuItemPageProps) {
  return (
    <Suspense fallback={null}>
      <MenuItemContent params={params} />
    </Suspense>
  );
}
