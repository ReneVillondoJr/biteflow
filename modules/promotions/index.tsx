'use client';

import PromotionsManager from './components/promotions-manager';
import { usePromotions } from './hooks/use-promotions';

export default function PromotionsModule() {
  const promotions = usePromotions();
  return <PromotionsManager promotions={promotions} />;
}
