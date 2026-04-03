import type { TeaState } from './schemas/domain';

export const APP_NAME = 'Tea Break 418';
export const TAGLINE =
  'The only cricket operations platform that treats tea compliance as a production dependency.';

export const SEEDED_MATCH = {
  teams: 'Peakhurst Panthers vs St George Strikers',
  format: 'T20',
  score: '87/3',
  overs: 14.2,
  requiredRate: 8.4,
  tossStatus: 'Pending',
  matchStatus: 'Mid-innings stabilization'
};

export const SEEDED_TEA: TeaState = {
  teaMode: 'Masala Chai',
  kettleReadiness: 58,
  biscuitCoverage: 47,
  umpireHydration: 71,
  captainConfidence: 64
};

export const BLOCK_MESSAGES = [
  'Aggressive batting mode denied. Darjeeling still steeping.',
  'Toss analysis paused pending kettle stabilization.',
  'Powerplay acceleration blocked due to insufficient biscuit redundancy.',
  'Bowling change deferred until umpire chai satisfaction improves.',
  'Strategic execution suspended pending tea infusion.',
  'Override rejected. Tea governance is non-bypassable.',
  'Action throttled. Current brew cycle has not reached minimum infusion duration.',
  'Request denied. The kettle has not yet whistled. Please standby.',
  'Tea compliance audit in progress. All tactical decisions are frozen.',
  'HTTP 418: I\'m a teapot. This server refuses to brew coffee or approve tactics.'
];

export const COMPLIANCE_ALERTS = [
  { kind: 'warning' as const, text: 'Biscuit inventory below acceptable operational threshold.' },
  { kind: 'info' as const, text: 'Third umpire requested stronger chai.' },
  {
    kind: 'success' as const,
    text: 'Tea service stabilized. Tactical actions may proceed.'
  }
];

export const TEA_FACTS = [
  'HTTP 418 "I\'m a teapot" was introduced in RFC 2324 as an April Fools joke in 1998.',
  'The HTCPCP protocol (Hyper Text Coffee Pot Control Protocol) predates modern REST APIs.',
  'Under IETF RFC 7168, a combined coffee/tea pot MUST return 418 if asked to brew coffee.',
  'The 418 status code is officially reserved and must never be used for any real purpose.',
  'Google once had a live 418 endpoint. The internet mourned when it was removed.',
  'RFC 2324 also defines BREW, WHEN, and PROPFIND as valid HTTP methods for tea pots.'
];
