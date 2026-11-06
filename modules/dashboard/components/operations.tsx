import { Bike, ChefHat, ShoppingBag } from 'lucide-react';

export default function Operations() {
  return (
    <section className='dashboard-operations' aria-label='Operations summary'>
      <div><span className='dashboard-operation-icon dashboard-operation-icon--chef'><ChefHat aria-hidden='true' /></span><div><strong>12</strong><small>Orders in kitchen</small></div></div>
      <div><span className='dashboard-operation-icon dashboard-operation-icon--bike'><Bike aria-hidden='true' /></span><div><strong>8</strong><small>Out for delivery</small></div></div>
      <div><span className='dashboard-operation-icon dashboard-operation-icon--bag'><ShoppingBag aria-hidden='true' /></span><div><strong>24</strong><small>Orders this hour</small></div></div>
    </section>
  );
}
