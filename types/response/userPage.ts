import { support } from "./support";
import { user } from "./user";
import {z} from 'zod';

export const userPage = z.object({
    page : z.number(),
    per_page : z.number(),
    total : z.number(),
    total_pages : z.number(),
    data : z.array(user),
    support: support
});