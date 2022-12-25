export type Parent = Record<string, unknown>;
export type RequestHandler<T, B> = (body: B) => T;
