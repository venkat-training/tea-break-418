import { z } from 'zod';

export const teaModeSchema = z.enum([
  'English Breakfast',
  'Masala Chai',
  'Earl Grey',
  'Green Tea',
  'Herbal Infusion'
]);

export const teaStateSchema = z.object({
  teaMode: teaModeSchema,
  kettleReadiness: z.number().min(0).max(100),
  biscuitCoverage: z.number().min(0).max(100),
  umpireHydration: z.number().min(0).max(100),
  captainConfidence: z.number().min(0).max(100)
});

export const matchStateSchema = z.object({
  overs: z.number().min(0).max(20),
  score: z.string(),
  requiredRate: z.number().min(0),
  tossStatus: z.string(),
  matchStatus: z.string()
});

export type TeaState = z.infer<typeof teaStateSchema>;
export type MatchState = z.infer<typeof matchStateSchema>;
