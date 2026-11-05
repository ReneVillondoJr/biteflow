'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';

import { ArrowRight, Eye, EyeOff, LockKeyhole, ShieldCheck } from 'lucide-react';

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
    <main className='admin-login-page'>
      <div className='admin-login-brand'>
        <Link className='admin-brand' href='/'>
          <span className='admin-brand-mark'>BF</span>
          <span>
            <strong>BITEFLOW</strong>
            <small>ADMIN PORTAL</small>
          </span>
        </Link>
      </div>

      <section className='admin-login-grid'>
        <aside className='admin-login-story'>
          <span className='admin-login-kicker'><ShieldCheck aria-hidden='true' /> Protected administration</span>
          <h1>Operations,<br /><em>securely managed.</em></h1>
          <p>Sign in to manage orders, menu availability, inventory, staff, and restaurant operations.</p>
        </aside>

        <div className='admin-login-card'>
          <span className='admin-login-icon'><LockKeyhole aria-hidden='true' /></span>
          <span className='admin-login-label'>Administrator access</span>
          <h2>Sign in to BiteFlow</h2>
          <p>Enter your authorized account details.</p>

          <form className='admin-login-form' onSubmit={handleSubmit}>
            <label>
              Email address
              <input name='email' type='email' required autoComplete='username' placeholder='admin@biteflow.com' />
            </label>
            <label>
              Password
              <span className='admin-login-password'>
                <input
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete='current-password'
                  placeholder='Enter password'
                />
                <button type='button' aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((value) => !value)}>
                  {showPassword ? <EyeOff aria-hidden='true' /> : <Eye aria-hidden='true' />}
                </button>
              </span>
            </label>
            {error && <p className='admin-login-error' role='alert'>{error}</p>}
            <button className='admin-login-submit' type='submit' disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in securely'}
              <ArrowRight aria-hidden='true' />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
