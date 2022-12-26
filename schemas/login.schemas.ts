import { z } from 'zod';
import { maxLoginLength, minLoginLength } from '../configs/login.config';

export const loginSchema = z.string().min(minLoginLength).max(maxLoginLength);
