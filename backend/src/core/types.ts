type Brand<T, B> = T & { readonly __brand: B };
export type UserId = Brand<string, 'UserId'>;
