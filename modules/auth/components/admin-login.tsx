'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';

import { ArrowRight, Eye, EyeOff, LockKeyhole, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function AdminLogin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const response = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: form.get('email'),
        password: form.get('password'),
      }),
    });

    if (!response.ok) {
      const result = await response.json().catch(() => ({ error: 'Unable to sign in.' }));
      setError(result.error ?? 'Unable to sign in.');
      setLoading(false);
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const next = params.get('next');
    router.replace(next?.startsWith('/admin/') ? next : '/admin/dashboard');
    router.refresh();
  }

  return (
    <main className='min-h-screen bg-[#f4f3ec] bg-[radial-gradient(circle_at_15%_30%,rgba(214,161,93,.16),transparent_28rem)]'>
      <div className='mx-auto w-full max-w-[1180px] px-4 pt-6 md:px-6 md:pt-7'>
        <Link className='inline-flex items-center gap-3' href='/'>
          <span className='flex size-11 items-center justify-center rounded-[14px_14px_14px_5px] bg-primary text-lg font-black text-primary-foreground'>BF</span>
          <span>
            <strong>BITEFLOW</strong>
            <small>ADMIN PORTAL</small>
          </span>
        </Link>
      </div>
      <section className='mx-auto grid min-h-[calc(100vh-80px)] w-full max-w-[1180px] items-center gap-10 px-4 py-10 md:px-6 lg:grid-cols-[1fr_440px]'>
        <aside>
          <span className='inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-primary'><ShieldCheck className='size-4' aria-hidden='true' /> Protected administration</span>
          <h1 className='mt-5 max-w-xl font-heading text-5xl font-normal leading-[0.98] tracking-[-0.05em] md:text-7xl'>Operations,<br /><em className='text-primary'>securely managed.</em></h1>
          <p className='mt-6 max-w-md text-sm leading-7 text-muted-foreground'>Sign in to manage orders, menu availability, inventory, staff, and restaurant operations.</p>
        </aside>

        <Card className='rounded-[24px] border-border bg-card p-6 shadow-[0_24px_70px_rgba(32,46,37,.10)] md:p-8'>
          <span className='flex size-12 items-center justify-center rounded-[15px_15px_15px_5px] bg-primary text-primary-foreground'><LockKeyhole className='size-5' aria-hidden='true' /></span>
          <span className='mt-5 block text-[9px] font-black uppercase tracking-[0.16em] text-primary'>Administrator access</span>
          <h2 className='mt-1 font-heading text-3xl font-normal'>Sign in to BiteFlow</h2>
          <p className='mt-1 text-xs text-muted-foreground'>Enter your authorized account details.</p>

          <form className='mt-6 grid gap-4' onSubmit={handleSubmit}>
            <label className='grid gap-2 text-xs font-black'>
              Email address
              <Input name='email' type='email' required autoComplete='username' placeholder='admin@biteflow.com' />
            </label>
            <label className='grid gap-2 text-xs font-black'>
              Password
              <span className='relative'>
                <Input
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete='current-password'
                  placeholder='Enter password'
                />
                <Button className='absolute right-1 top-1/2 -translate-y-1/2' variant='ghost' size='icon-xs' type='button' aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((value) => !value)}>
                  {showPassword ? <EyeOff aria-hidden='true' /> : <Eye aria-hidden='true' />}
                </Button>
              </span>
            </label>
            {error && <p className='admin-login-error' role='alert'>{error}</p>}
            <Button className='mt-2 h-11 rounded-full' type='submit' disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in securely'}
              <ArrowRight aria-hidden='true' />
            </Button>
          </form>
        </Card>
      </section>
    </main>
  );
}
