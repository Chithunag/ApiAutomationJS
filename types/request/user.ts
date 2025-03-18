import {z} from 'zod';
export const user = z.object({
    name : z.string(),
    job : z.string().optional()
});