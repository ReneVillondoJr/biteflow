'use client';

import { useState, type FormEvent } from 'react';
import { ChefHat, Clock3, ImagePlus, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { menuItemSchema } from '@/modules/menu/schema';
import type { MenuItem } from '@/modules/menu/types/menu';

type MenuItemFormProps = {
  item: MenuItem | null;
  onSave: (item: Omit<MenuItem, 'slug' | 'categorySlug'>, slug?: string) => boolean;
  onCancel: () => void;
};

export default function MenuItemForm({ item, onSave, onCancel }: MenuItemFormProps) {
  const [formError, setFormError] = useState<string | null>(null);
  const fieldClassName = 'h-11 rounded-xl border-[#e7e4da] bg-[#fbfaf6] px-3.5 text-sm shadow-none transition-colors placeholder:text-[#a7a69d] focus-visible:border-[#254b3a] focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#254b3a]/10';
  const labelClassName = 'grid gap-2 text-[11px] font-bold uppercase tracking-[0.09em] text-[#536156]';

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = menuItemSchema.omit({ slug: true, categorySlug: true }).safeParse({
      name: String(formData.get('name') ?? ''),
      category: String(formData.get('category') ?? ''),
      description: String(formData.get('description') ?? ''),
      price: Number(formData.get('price')),
      image: String(formData.get('image') ?? ''),
      badge: String(formData.get('badge') ?? '').trim() || undefined,
      prepTime: Number(formData.get('prepTime')),
      tags: String(formData.get('tags') ?? '').split(',').map((tag) => tag.trim()).filter(Boolean),
      isPopular: formData.has('isPopular'),
      isAvailable: formData.has('isAvailable'),
    });

    if (!result.success) {
      setFormError(result.error.issues[0]?.message ?? 'Check the dish details.');
      return;
    }

    if (onSave(result.data, item?.slug)) onCancel();
  }

  return (
    <form className='grid min-h-0' onSubmit={submitForm}>
      <div className='grid gap-5 overflow-y-auto px-6 py-6 sm:px-8'>
        <section className='grid gap-4 rounded-2xl border border-[#ece9df] bg-[#fbfaf6] p-4 sm:grid-cols-[1fr_auto] sm:items-center'>
          <div>
            <div className='mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#8a7554]'><span className='size-1.5 rounded-full bg-[#d6a15d]' />Dish essentials</div>
            <label className={labelClassName} htmlFor='dish-name'>Dish name<Input id='dish-name' name='name' defaultValue={item?.name ?? ''} maxLength={80} required className={fieldClassName} /></label>
          </div>
          {item ? <div className='hidden size-20 rounded-xl border border-white bg-cover bg-center shadow-[0_8px_24px_rgba(32,46,37,0.12)] sm:block' role='img' aria-label={`${item.name} preview`} style={{ backgroundImage: `url("${item.image}")` }} /> : <span className='hidden size-20 place-items-center rounded-xl border border-dashed border-[#d8d4c8] bg-white text-[#9b8a6e] sm:grid'><ImagePlus className='size-6' aria-hidden='true' /></span>}
        </section>

        <div className='grid gap-4 sm:grid-cols-[1fr_150px]'>
          <label className={labelClassName} htmlFor='dish-category'>Category<Input id='dish-category' name='category' defaultValue={item?.category ?? ''} placeholder='e.g. Rice bowls' maxLength={40} required className={fieldClassName} /><span className='text-[11px] font-normal normal-case tracking-normal text-[#85877e]'>New categories are created automatically.</span></label>
          <label className={labelClassName} htmlFor='dish-price'>Price <span className='normal-case tracking-normal'>(PHP)</span><Input id='dish-price' name='price' type='number' min='0' step='1' defaultValue={item?.price ?? ''} required className={fieldClassName} /></label>
        </div>

        <label className={labelClassName} htmlFor='dish-image'>Image URL<Input id='dish-image' name='image' type='url' defaultValue={item?.image ?? ''} placeholder='https://example.com/dish.jpg' required className={fieldClassName} /></label>
        <label className={labelClassName} htmlFor='dish-description'>Description<textarea id='dish-description' name='description' rows={3} maxLength={300} defaultValue={item?.description ?? ''} required className='min-h-24 resize-y rounded-xl border border-[#e7e4da] bg-[#fbfaf6] px-3.5 py-3 text-sm font-normal normal-case tracking-normal text-[#202e25] shadow-none outline-none transition-colors placeholder:text-[#a7a69d] focus-visible:border-[#254b3a] focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#254b3a]/10' /></label>

        <section className='grid gap-4 rounded-2xl border border-[#ece9df] p-4'>
          <div className='flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#8a7554]'><Clock3 className='size-3.5' aria-hidden='true' />Preparation & discovery</div>
          <div className='grid gap-4 sm:grid-cols-2'>
            <label className={labelClassName} htmlFor='dish-prep-time'>Preparation time <span className='normal-case tracking-normal'>(minutes)</span><Input id='dish-prep-time' name='prepTime' type='number' min='1' step='1' defaultValue={item?.prepTime ?? 15} required className={fieldClassName} /></label>
            <label className={labelClassName} htmlFor='dish-tags'>Tags <span className='normal-case tracking-normal'>(comma separated)</span><Input id='dish-tags' name='tags' defaultValue={item?.tags.join(', ') ?? ''} placeholder='Chicken, Spicy' className={fieldClassName} /></label>
          </div>
          <label className={labelClassName} htmlFor='dish-badge'>Menu highlight <span className='normal-case tracking-normal'>(optional)</span><Input id='dish-badge' name='badge' defaultValue={item?.badge ?? ''} maxLength={30} placeholder='Bestseller' className={fieldClassName} /></label>
        </section>

        <div className='grid gap-3 sm:grid-cols-2'>
          <label className='flex cursor-pointer items-start gap-3 rounded-2xl border border-[#e7e4da] bg-white p-4 transition-colors hover:border-[#c8d2c4]'><input type='checkbox' name='isAvailable' defaultChecked={item?.isAvailable ?? true} className='mt-0.5 size-4 accent-[#254b3a]' /><span><strong className='block text-sm text-[#25382d]'>Available to order</strong><span className='mt-1 block text-xs text-[#85877e]'>Show this dish in the customer menu.</span></span></label>
          <label className='flex cursor-pointer items-start gap-3 rounded-2xl border border-[#e7e4da] bg-white p-4 transition-colors hover:border-[#e1c99f]'><input type='checkbox' name='isPopular' defaultChecked={item?.isPopular ?? false} className='mt-0.5 size-4 accent-[#b18342]' /><span><strong className='flex items-center gap-1.5 text-sm text-[#25382d]'><Sparkles className='size-3.5 text-[#b18342]' aria-hidden='true' />Featured dish</strong><span className='mt-1 block text-xs text-[#85877e]'>Highlight this item as a popular choice.</span></span></label>
        </div>
        {formError ? <p className='rounded-xl border border-[#ecc9c2] bg-[#fff5f2] px-4 py-3 text-sm text-destructive' role='alert'>{formError}</p> : null}
      </div>

      <DialogFooter className='mx-0 mb-0 border-[#ece9df] bg-[#fbfaf6] px-6 py-4 sm:px-8'>
        <Button type='button' variant='outline' className='h-10 rounded-xl border-[#dedbd0] bg-white px-5' onClick={onCancel}>Cancel</Button>
        <Button type='submit' className='h-10 rounded-xl bg-[#254b3a] px-5 font-semibold shadow-[0_5px_14px_rgba(37,75,58,0.18)] hover:bg-[#193c2c]'><ChefHat className='size-4' aria-hidden='true' />{item ? 'Save dish changes' : 'Add to menu'}</Button>
      </DialogFooter>
    </form>
  );
}
