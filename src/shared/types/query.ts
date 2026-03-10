import { UseQueryOptions } from '@tanstack/react-query';

export type CustomQueryOptions<T> = Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>;
