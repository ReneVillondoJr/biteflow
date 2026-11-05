'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, type FormEvent } from 'react';

import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  LogOut,
  Package,
  UserRound,
} from 'lucide-react';

type AuthMode = 'login' | 'register';

type CustomerProfile = {
  name: string;
  email: string;
};

const profileKey = 'biteflow_customer_profile';

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
          const stored = window.localStorage.getItem(profileKey);
          existingProfile = stored ? (JSON.parse(stored) as CustomerProfile) : null;
        } catch {
          existingProfile = null;
        }
      }

      window.localStorage.setItem(
        profileKey,
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
    <section className='auth-section'>
      <div className='container auth-grid'>
        <aside className='auth-story'>
          <span className='section-label'>
            <span className='section-label__dot' />
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
          <div className='auth-benefits'>
            <div><CheckCircle2 aria-hidden='true' /> Faster checkout</div>
            <div><CheckCircle2 aria-hidden='true' /> Order tracking</div>
            <div><CheckCircle2 aria-hidden='true' /> Member-only offers</div>
          </div>
        </aside>

        <div className='auth-card'>
          <div className='auth-card-heading'>
            <span className='auth-icon'><UserRound aria-hidden='true' /></span>
            <div>
              <span>{isRegister ? 'Create account' : 'Welcome back'}</span>
              <h2>{isRegister ? 'Join BiteFlow' : 'Sign in to your account'}</h2>
            </div>
          </div>

          <form className='auth-form' onSubmit={handleSubmit}>
            {isRegister && (
              <label>
                Full name
                <input name='name' type='text' required placeholder='Juan Dela Cruz' autoComplete='name' />
              </label>
            )}

            <label>
              Email address
              <input name='email' type='email' required placeholder='juan@email.com' autoComplete='email' />
            </label>

            <label>
              Password
              <span className='auth-password'>
                <input
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  placeholder='At least 6 characters'
                  autoComplete={isRegister ? 'new-password' : 'current-password'}
                />
                <button
                  type='button'
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((value) => !value)}
                >
                  {showPassword ? <EyeOff aria-hidden='true' /> : <Eye aria-hidden='true' />}
                </button>
              </span>
            </label>

            <button className='button button--primary auth-submit' type='submit'>
              {isRegister ? 'Create account' : 'Sign in'}
              <ArrowRight aria-hidden='true' />
            </button>
          </form>

          <p className='auth-switch'>
            {isRegister ? 'Already have an account?' : 'New to BiteFlow?'}
            <Link href={isRegister ? '/auth/login' : '/auth/register'}>
              {isRegister ? 'Sign in' : 'Create an account'}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export function AccountPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(profileKey);
      setProfile(stored ? (JSON.parse(stored) as CustomerProfile) : null);
    } catch {
      setProfile(null);
    }
    setChecked(true);
  }, []);

  function signOut() {
    window.localStorage.removeItem(profileKey);
    router.push('/auth/login');
  }

  if (!checked) return null;

  if (!profile) {
    return (
      <section className='account-empty section'>
        <div className='container'>
          <div className='account-empty-card'>
            <span className='account-empty-icon'><UserRound aria-hidden='true' /></span>
            <span className='account-empty-label'>Customer account</span>
            <h1>Sign in to view your account</h1>
            <p>Track orders and keep your BiteFlow details close at hand.</p>
            <div className='account-empty-actions'>
              <Link className='button button--primary' href='/auth/login'>Sign in</Link>
              <Link className='button button--outline' href='/auth/register'>Create account</Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='section account-section'>
      <div className='container'>
        <div className='account-heading'>
          <div>
            <span className='section-label'>
              <span className='section-label__dot' />
              My account
            </span>
            <h1>Welcome, {profile.name}</h1>
          </div>
          <button className='button button--outline' type='button' onClick={signOut}>
            <LogOut aria-hidden='true' />
            Sign out
          </button>
        </div>

        <div className='account-grid'>
          <article className='account-card account-profile-card'>
            <span className='account-card-icon'><UserRound aria-hidden='true' /></span>
            <div>
              <span>Personal details</span>
              <h2>{profile.name}</h2>
              <p>{profile.email}</p>
            </div>
          </article>

          <article className='account-card'>
            <span className='account-card-icon'><Package aria-hidden='true' /></span>
            <div>
              <span>Recent orders</span>
              <h2>No orders yet</h2>
              <p>Your orders and delivery updates will appear here.</p>
            </div>
            <Link className='text-link' href='/menu#menu-catalog'>Browse the menu <ArrowRight aria-hidden='true' /></Link>
          </article>
        </div>
      </div>
    </section>
  );
}
