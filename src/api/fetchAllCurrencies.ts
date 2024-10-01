import {
  PublicGetAllCurrenciesParamsSchema,
  PublicGetAllCurrenciesResponseSchema,
} from '../api/types/public.get_all_currencies'
import tryRequest from './tryRequest'

export default async function fetchAllCurrencies(): Promise<PublicGetAllCurrenciesResponseSchema> {
  return tryRequest<PublicGetAllCurrenciesParamsSchema, PublicGetAllCurrenciesResponseSchema>(
    '/public/get_all_currencies',
    {}
  )
}
