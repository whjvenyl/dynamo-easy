import { Model } from '../../src/decorator/model.decorator'
import { PartitionKey } from '../../src/decorator/partition-key.decorator'
import { Property } from '../../src/decorator/property.decorator'
import { SortKey } from '../../src/decorator/sort-key.decorator'

@Model()
export class ModelWithDate {
  @PartitionKey() id: string

  @SortKey() creationDate: Date
}