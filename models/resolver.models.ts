import { NextApiResponse } from 'next';

export type Parent = Record<string, unknown>;
export type RequestHandler<T, B> = (body: B, res: NextApiResponse) => T;
