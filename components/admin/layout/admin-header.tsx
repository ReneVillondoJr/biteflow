import { ShieldCheck } from 'lucide-react';

export default function AdminHeader() {
  return (
    <header className='admin-header'>
      <div>
        <span>Administration</span>
        <strong>BiteFlow Operations</strong>
      </div>

      <div className='admin-security-badge'>
        <ShieldCheck aria-hidden='true' />
        Secure session
      </div>
    </header>
  );
}
