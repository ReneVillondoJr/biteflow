'use client';

import SettingsManager from './components/settings-manager';
import { useSettings } from './hooks/use-settings';

export default function SettingsModule() {
  const settings = useSettings();
  return <SettingsManager settings={settings} />;
}
