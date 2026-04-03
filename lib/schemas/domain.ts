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
  kettleReadiness: z.number().int().min(0).max(100),
  biscuitCoverage: z.number().int().min(0).max(100),
  umpireHydration: z.number().int().min(0).max(100),
  captainConfidence: z.number().int().min(0).max(100)
});

export const matchStateSchema = z.object({
  overs: z.number().min(0).max(20),
  score: z.string().min(1).max(20),
  requiredRate: z.number().min(0),
  tossStatus: z.string().min(1).max(50),
  matchStatus: z.string().min(1).max(100)
});

export type TeaMode = z.infer<typeof teaModeSchema>;
export type TeaState = z.infer<typeof teaStateSchema>;
export type MatchState = z.infer<typeof matchStateSchema>;
