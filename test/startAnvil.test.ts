import startAnvil from '../src/startAnvil'
import { expect } from 'chai'

describe('startAnvil', function () {
  it('should start and kill anvil process', async function () {
    const anvil = await startAnvil({ forkUrl: process.env.RPC_URL })
    expect(anvil).not.to.be.undefined
    anvil.kill()
  })
})
