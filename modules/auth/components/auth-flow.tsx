'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';

import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  LogOut,
  Package,
  UserRound,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import { authContent, authProfileStorageKey } from '../data/auth';
import { useAuthProfile } from '../hooks/use-auth-profile';
import type { AuthMode, CustomerProfile } from '../types/auth';

export function AuthPage({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const isRegister = mode === 'register';
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') ?? '').trim();
    const name = String(form.get('name') ?? '').trim();

    if (typeof window !== 'undefined') {
      let existingProfile: CustomerProfile | null = null;

      if (!isRegister) {
        try {
          const stored = window.localStorage.getItem(authProfileStorageKey);
          existingProfile = stored ? (JSON.parse(stored) as CustomerProfile) : null;
        } catch {
          existingProfile = null;
        }
      }

      window.localStorage.setItem(
        authProfileStorageKey,
        JSON.stringify({
          name: isRegister
            ? name || email.split('@')[0]
            : existingProfile?.email === email
              ? existingProfile.name
              : email.split('@')[0],
          email,
        }),
      );
    }

    router.push('/account');
  }

  return (
    <section className='grid min-h-[70vh] place-items-center py-12 md:py-20'>
      <div className='mx-auto grid w-full max-w-[1100px] gap-8 px-4 md:px-6 lg:grid-cols-[1fr_440px]'>
        <aside className='self-center'>
          <span className='inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-primary'>
            <span className='size-2 rounded-full bg-accent' />
            BiteFlow member
          </span>
          <h1>
            Good food tastes
            <br />
            <em>even better together.</em>
          </h1>
          <p>
            Save your details for faster checkout, keep track of orders, and
            discover offers made for you.
          </p>
          <div className='mt-6 grid gap-3 text-sm text-muted-foreground'>
            {authContent.benefits.map((benefit) => (
              <div className='flex items-center gap-2' key={benefit}><CheckCircle2 className='size-4 text-primary' aria-hidden='true' /> {benefit}</div>
            ))}
          </div>
        </aside>

        <Card className='rounded-2xl border-border p-6 shadow-sm md:p-8'>
          <div className='mb-6 flex items-center gap-3'>
            <span className='flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary'><UserRound className='size-5' aria-hidden='true' /></span>
            <div>
              <span>{isRegister ? 'Create account' : 'Welcome back'}</span>
              <h2>{isRegister ? 'Join BiteFlow' : 'Sign in to your account'}</h2>
            </div>
          </div>

          <form className='grid gap-4' onSubmit={handleSubmit}>
            {isRegister && (
              <label>
                Full name
                <Input name='name' type='text' required placeholder='Juan Dela Cruz' autoComplete='name' />
              </label>
            )}

            <label className='grid gap-2 text-xs font-bold'>
              Email address
              <Input name='email' type='email' required placeholder='juan@email.com' autoComplete='email' />
            </label>

            <label>
              Password
              <span className='relative'>
                <Input
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  placeholder='At least 6 characters'
                  autoComplete={isRegister ? 'new-password' : 'current-password'}
                />
                <Button
                  variant='ghost'
                  size='icon-xs'
                  className='absolute right-1 top-1'
                  type='button'
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((value) => !value)}
                >
                  {showPassword ? <EyeOff aria-hidden='true' /> : <Eye aria-hidden='true' />}
                </Button>
              </span>
            </label>

            <Button className='mt-2 w-full' type='submit'>
              {isRegister ? 'Create account' : 'Sign in'}
              <ArrowRight aria-hidden='true' />
            </Button>
          </form>

          <p className='auth-switch'>
            {isRegister ? 'Already have an account?' : 'New to BiteFlow?'}
            <Link href={isRegister ? '/auth/login' : '/auth/register'}>
              {isRegister ? 'Sign in' : 'Create an account'}
            </Link>
          </p>
        </Card>
      </div>
    </section>
  );
}

export function AccountPage() {
  const router = useRouter();
  const { profile, checked, signOut: clearProfile } = useAuthProfile();

  function signOut() {
    clearProfile();
    router.push('/auth/login');
  }

  if (!checked) return null;

  if (!profile) {
    return (
      <section className='grid min-h-[60vh] place-items-center px-4 py-16'>
        <div className='mx-auto w-full max-w-[1200px]'>
          <Card className='mx-auto grid max-w-md justify-items-center rounded-2xl border-border p-8 text-center shadow-sm'>
            <span className='flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary'><UserRound aria-hidden='true' /></span>
            <span className='mt-4 text-[10px] font-black uppercase tracking-wider text-primary'>Customer account</span>
            <h1>Sign in to view your account</h1>
            <p>Track orders and keep your BiteFlow details close at hand.</p>
            <div className='mt-6 flex gap-3'>
              <Button render={<Link href='/auth/login' />}>Sign in</Button>
              <Button variant='outline' render={<Link href='/auth/register' />}>Create account</Button>
            </div>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className='py-16 md:py-20'>
      <div className='mx-auto w-full max-w-[1200px] px-4 md:px-6'>
        <div className='mb-8 flex items-end justify-between gap-4'>
          <div>
            <span className='inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-primary'>
              <span className='size-2 rounded-full bg-accent' />
              My account
            </span>
            <h1>Welcome, {profile.name}</h1>
          </div>
          <Button variant='outline' type='button' onClick={signOut}>
            <LogOut aria-hidden='true' />
            Sign out
          </Button>
        </div>

        <div className='grid gap-4 md:grid-cols-2'>
          <Card className='grid grid-cols-[48px_1fr] gap-4 rounded-2xl border-border p-5'>
            <span className='flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary'><UserRound aria-hidden='true' /></span>
            <div>
              <span>Personal details</span>
              <h2>{profile.name}</h2>
              <p>{profile.email}</p>
            </div>
          </Card>

          <Card className='grid grid-cols-[48px_1fr] gap-4 rounded-2xl border-border p-5'>
            <span className='flex size-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700'><Package aria-hidden='true' /></span>
            <div>
              <span>Recent orders</span>
              <h2>No orders yet</h2>
              <p>Your orders and delivery updates will appear here.</p>
            </div>
            <Link className='col-start-2 inline-flex items-center gap-2 text-xs font-black text-primary' href='/menu#menu-catalog'>Browse the menu <ArrowRight className='size-4' aria-hidden='true' /></Link>
          </Card>
        </div>
      </div>
    </section>
  );
}
