import {
  PublicGetInstrumentsParamsSchema,
  PublicGetInstrumentsResponseSchema,
} from '../api/types/public.get_instruments'
import tryRequest from './tryRequest'

export default async function fetchInstruments(
  params: PublicGetInstrumentsParamsSchema
): Promise<PublicGetInstrumentsResponseSchema> {
  return tryRequest<PublicGetInstrumentsParamsSchema, PublicGetInstrumentsResponseSchema>(
    '/public/get_instruments',
    params
  )
}
