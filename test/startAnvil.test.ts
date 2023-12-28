import startAnvil from '../src/startAnvil'
import { expect } from 'chai'

describe('startAnvil', function () {
  beforeEach(function () {
    process.env.CHAIN_1_RPC_URL = process.env.RPC_URL
  })

  it('should start and kill anvil process', async function () {
    const anvil = await startAnvil({ chainId: 1 })
    anvil.kill()
  })

  it('should throw an error when chainId config is not set', async function () {
    await expect(startAnvil({ chainId: 123 })).to.be.rejectedWith(
      'chainId 123 not supported. Need to set CHAIN_123_RPC_URL in .env'
    )
  })
})
