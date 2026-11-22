'use client';

import { useState } from 'react';
import { saveSettings as persistSettings, useSettingsData } from '../data/store';
import type { Settings } from '../schema';

export function useSettings() {
  const { data, hydrated, storageError } = useSettingsData();
  const [notice, setNotice] = useState<string | null>(null);

  function saveSettings(settings: Settings) {
    try {
      persistSettings(settings);
      setNotice('Settings saved successfully.');
      return true;
    } catch {
      setNotice('Settings could not be saved. Check the form and try again.');
      return false;
    }
  }

  return { data, hydrated, storageError, notice, setNotice, saveSettings };
}
