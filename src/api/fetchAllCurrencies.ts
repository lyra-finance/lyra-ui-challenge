import {
  PublicGetAllCurrenciesParamsSchema,
  PublicGetAllCurrenciesResponseSchema,
} from '../api/types/public.get_all_currencies'
import tryRequest, { RequestOptions } from './tryRequest'

export default async function fetchAllCurrencies(
  options?: RequestOptions
): Promise<PublicGetAllCurrenciesResponseSchema> {
  return tryRequest<PublicGetAllCurrenciesParamsSchema, PublicGetAllCurrenciesResponseSchema>(
    '/public/get_all_currencies',
    {},
    {
      ...options,
      method: 'GET', // NOTE: orderbook wants us to use GET for this route
    }
  )
}
