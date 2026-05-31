const STORAGE_KEY = 'zone-seed-explainer-seen';

export function hasSeenSeedExplainer(): boolean {
  if (typeof localStorage === 'undefined') return false;
  return localStorage.getItem(STORAGE_KEY) === '1';
}

export function markSeedExplainerSeen(): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, '1');
}
