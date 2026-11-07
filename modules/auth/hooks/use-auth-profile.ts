'use client';

import { useEffect, useState } from 'react';

import { authProfileStorageKey } from '../data/auth';
import type { CustomerProfile } from '../types/auth';

export function useAuthProfile() {
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      try {
        const stored = window.localStorage.getItem(authProfileStorageKey);
        setProfile(stored ? (JSON.parse(stored) as CustomerProfile) : null);
      } catch {
        setProfile(null);
      }
      setChecked(true);
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  function saveProfile(nextProfile: CustomerProfile) {
    window.localStorage.setItem(authProfileStorageKey, JSON.stringify(nextProfile));
    setProfile(nextProfile);
  }

  function signOut() {
    window.localStorage.removeItem(authProfileStorageKey);
    setProfile(null);
  }

  return { profile, checked, saveProfile, signOut };
}
