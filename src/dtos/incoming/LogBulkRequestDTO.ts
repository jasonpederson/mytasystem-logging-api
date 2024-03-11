import { z } from 'zod';

import { logRequestDTOSchema } from './LogRequestDTO';

const logBulkRequestDTOSchema = z.array(logRequestDTOSchema);

type LogBulkRequestDTO = z.infer<typeof logBulkRequestDTOSchema>;

export type { LogBulkRequestDTO };

export { logBulkRequestDTOSchema };
