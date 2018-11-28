import { hasGenericType, PropertyMetadata } from '../../decorator/metadata'
import { NumberAttribute } from '../type/attribute.type'
import { MapperForType } from './base.mapper'

function enumToDb(value: string | number, propertyMetadata?: PropertyMetadata<any, NumberAttribute>): NumberAttribute {
  if (Number.isInteger(<any>value)) {
    if (hasGenericType(propertyMetadata) && (<any>propertyMetadata.typeInfo.genericType)[value] === undefined) {
      throw new Error(`${value} is not a valid value for enum ${propertyMetadata.typeInfo.genericType}`)
    }
    return { N: value.toString() }
  } else {
    throw new Error('only integer is a supported value for an enum')
  }
}

function enumFromDb(
  attributeValue: NumberAttribute,
  propertyMetadata?: PropertyMetadata<any, NumberAttribute>,
): string | number {
  if (!isNaN(parseInt(attributeValue.N, 10))) {
    const enumValue = <any>parseInt(attributeValue.N, 10)
    if (propertyMetadata && propertyMetadata.typeInfo && propertyMetadata.typeInfo.genericType) {
      if ((<any>propertyMetadata.typeInfo.genericType)[enumValue] === undefined) {
        throw new Error(`${enumValue} is not a valid value for enum ${propertyMetadata.typeInfo.genericType}`)
      }
    }

    return enumValue
  } else {
    throw new Error('make sure the value is a N(umber), which is the only supported for EnumMapper right now')
  }
}

/**
 * Enums are mapped to numbers by default
 */
export const EnumMapper: MapperForType<string | number, NumberAttribute> = {
  fromDb: enumFromDb,
  toDb: enumToDb,
}
