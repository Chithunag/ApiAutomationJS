import {z} from 'zod';

export const support = z.object({
    url : z.string(),
    text : z.string()
});