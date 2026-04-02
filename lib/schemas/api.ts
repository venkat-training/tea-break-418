import { z } from 'zod';
import { matchStateSchema, teaStateSchema } from '@/lib/schemas/domain';

export const complianceRequestSchema = z.object({
  teaState: teaStateSchema,
  matchState: matchStateSchema
});

export const tacticalActionSchema = z.object({
  action: z.enum([
    'Recommend Batting Aggression',
    'Run Toss Analysis',
    'Approve Powerplay Acceleration',
    'Initiate Bowling Change',
    'Override Tea Protocol'
  ]),
  teaState: teaStateSchema,
  matchState: matchStateSchema
});
