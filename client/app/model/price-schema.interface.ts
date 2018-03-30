import {ColorSchema} from './color-schema.interface';

export type PriceSchema = {
  id: string,
  name: string,
  stadiumName: string,
  colorSchema?: ColorSchema[]
}
