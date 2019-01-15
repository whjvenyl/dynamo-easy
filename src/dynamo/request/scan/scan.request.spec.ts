import * as DynamoDB from 'aws-sdk/clients/dynamodb'
import { ComplexModel } from '../../../../test/models'
import { DynamoPromisified } from '../../dynamo-promisified'
import { ReadManyRequest } from '../read-many.request'
import { ScanRequest } from './scan.request'

describe('scan request', () => {
  let request: MyScanRequest
  let scanSpy: jasmine.Spy

  class MyScanRequest extends ScanRequest<ComplexModel> {
    constructor(dynamoRx: DynamoPromisified) {
      super(dynamoRx, ComplexModel)
    }

    get theLogger() {
      return this.logger
    }
  }

  beforeEach(() => {
    scanSpy = jasmine.createSpy().and.returnValue(Promise.resolve({ Count: 1 }))
    request = new MyScanRequest(<any>{ scan: scanSpy })
  })

  it('extends ReadManyRequest', () => {
    expect(request instanceof ReadManyRequest).toBeTruthy()
  })

  it('default params', () => {
    const params: DynamoDB.ScanInput = request.params
    expect(params.TableName).toBe('complex_model')
    expect(params.Limit).toBe(ReadManyRequest.DEFAULT_LIMIT)
    expect(Object.keys(params).length).toBe(2)
  })

  it('constructor creates logger', () => {
    expect(request.theLogger).toBeDefined()
  })

  it('doRequest uses dynamoRx.scan', async () => {
    await request.exec()
    expect(scanSpy).toHaveBeenCalled()
  })
})
