import { z } from 'zod';

export const taskValidationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
// waa optional= qofka haduu rabo wuuka tagi karaa
  description: z.string().optional(),
//  3-daan midkod wa inuu so doortaa haduu so sheego hadii kale optional
  status: z.enum(['pending', 'in progress', 'completed']).optional(),
  dueDate: z.string().optional()
});