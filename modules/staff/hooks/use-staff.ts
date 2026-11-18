'use client';

import { useMemo, useState } from 'react';
import { saveStaffData, useStaffData } from '../data/store';
import type { StaffMember } from '../schema';

export type StaffDraft = Pick<StaffMember, 'name' | 'email' | 'phone' | 'role' | 'shift' | 'location' | 'status' | 'permissions' | 'notes'>;
const makeId = () => `staff-${Date.now().toString(36)}`;
const localDate = () => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

export function useStaff() {
  const { data, hydrated, storageError } = useStaffData();
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [notice, setNotice] = useState<string | null>(null);

  function persist(staff: StaffMember[], message: string) {
    try { saveStaffData({ staff }); }
    catch { setNotice('Staff changes could not be saved. Check the profile details and try again.'); return false; }
    setNotice(message);
    return true;
  }

  function saveMember(draft: StaffDraft, id?: string) {
    const existing = data.staff.find((member) => member.id === id);
    const email = draft.email.trim().toLowerCase();
    if (data.staff.some((member) => member.id !== id && member.email.toLowerCase() === email)) {
      setNotice('That email address is already attached to another staff profile.');
      return false;
    }
    const member: StaffMember = {
      ...draft, name: draft.name.trim(), email, phone: draft.phone.trim(), location: draft.location.trim(), notes: draft.notes.trim(),
      id: existing?.id ?? makeId(), hiredAt: existing?.hiredAt ?? localDate(),
    };
    return persist(existing ? data.staff.map((current) => current.id === id ? member : current) : [member, ...data.staff], existing ? 'Staff profile updated.' : 'Staff member added.');
  }

  function setMemberStatus(member: StaffMember, status: StaffMember['status']) {
    persist(data.staff.map((current) => current.id === member.id ? { ...current, status } : current), `Staff member marked ${status === 'on-leave' ? 'on leave' : status}.`);
  }

  function removeMember(member: StaffMember) {
    if (!window.confirm(`Remove ${member.name} from staff records? This cannot be undone.`)) return;
    persist(data.staff.filter((current) => current.id !== member.id), 'Staff profile removed.');
  }

  const filteredStaff = useMemo(() => {
    const term = query.trim().toLowerCase();
    return data.staff.filter((member) => {
      const matchesQuery = !term || `${member.name} ${member.email} ${member.phone} ${member.location}`.toLowerCase().includes(term);
      return matchesQuery && (roleFilter === 'all' || member.role === roleFilter) && (statusFilter === 'all' || member.status === statusFilter) && (locationFilter === 'all' || member.location === locationFilter);
    });
  }, [data.staff, query, roleFilter, statusFilter, locationFilter]);

  return { staff: data.staff, filteredStaff, hydrated, storageError, notice, setNotice, query, setQuery, roleFilter, setRoleFilter, statusFilter, setStatusFilter, locationFilter, setLocationFilter, saveMember, setMemberStatus, removeMember };
}
