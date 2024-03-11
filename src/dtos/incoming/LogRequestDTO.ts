import { logLevelSchema, environmentSchema } from '@itsmepetey/mytasystem-logger';
import { z } from 'zod';
// Handy tool for converting TypeScript types to Zod schemas: https://transform.tools/typescript-to-zod

const metadataSchema = z.record(z.union([z.string(), z.number()])).and(
	z.object({
		trackingId: z.string()
	})
);

const logRequestDTOSchema = z.object({
	metadata: metadataSchema,
	appName: z.string(),
	version: z.string(),
	runtimeVersion: z.string().optional(),
	environment: environmentSchema,
	level: logLevelSchema,
	context: z.string(),
	content: z.any(),
	timestamp: z.string().datetime()
});

type LogRequestDTO = z.infer<typeof logRequestDTOSchema>;

export type { LogRequestDTO };

export { logRequestDTOSchema };
