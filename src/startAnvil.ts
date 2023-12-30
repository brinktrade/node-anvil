import { ChildProcessWithoutNullStreams, spawn } from 'child_process'

export default async function (
  {
    accounts,
    autoImpersonate,
    blockTime,
    balance,
    derivationPath,
    hardfork,
    init,
    mnemonic,
    noMining,
    order,
    port,
    stepsTracing,
    ipc,
    timestamp,
    disableDefaultCreate2Deployer,
    forkUrl,
    forkBlockNumber,
    forkRetryBackoff,
    retries,
    timeout,
    computeUnitsPerSecond,
    noRateLimit,
    noStorageCaching,
    baseFee,
    chainId,
    codeSizeLimit,
    gasLimit,
    gasPrice,
    allowOrigin,
    noCors,
    host,
    configOut,
    pruneHistory,
    logging
  }: {
    accounts?: number | string
    autoImpersonate?: boolean
    blockTime?: number| string
    balance?: number | string
    derivationPath?: string
    hardfork?: string
    init?: string
    mnemonic?: string
    noMining?: boolean
    order?: string
    port?: number | string
    stepsTracing?: boolean
    ipc?: string
    timestamp?: number | string
    disableDefaultCreate2Deployer?: boolean
    forkUrl?: string
    forkBlockNumber?: number | string
    forkRetryBackoff?: number | string
    retries?: number | string
    timeout?: number | string
    computeUnitsPerSecond?: number | string
    noRateLimit?: boolean
    noStorageCaching?: boolean
    baseFee?: number | string
    chainId?: number | string
    codeSizeLimit?: number | string
    gasLimit?: number | string
    gasPrice?: number | string
    allowOrigin?: string
    noCors?: boolean
    host?: string
    configOut?: string
    pruneHistory?: boolean
    logging?: boolean
  }
) : Promise<ChildProcessWithoutNullStreams> {
  return new Promise((resolve, reject) => {
    const args: string[] = []

    if (accounts) {
      args.push(`--accounts=${accounts}`)
    }
    if (autoImpersonate) {
      args.push(`--auto-impersonate`)
    }
    if (blockTime) {
      args.push(`--block-time=${blockTime}`)
    }
    if (balance) {
      args.push(`--balance=${balance}`)
    }
    if (derivationPath) {
      args.push(`--derivation-path=${derivationPath}`)
    }
    if (hardfork) {
      args.push(`--hardfork=${hardfork}`)
    }
    if (init) {
      args.push(`--init=${init}`)
    }
    if (mnemonic) {
      args.push(`--mnemonic=${mnemonic}`)
    }
    if (noMining) {
      args.push(`--no-mining`)
    }
    if (order) {
      args.push(`--order=${order}`)
    }
    if (port) {
      args.push(`--port=${port}`)
    }
    if (stepsTracing) {
      args.push(`--steps-tracing`)
    }
    if (ipc) {
      args.push(`--ipc=${ipc}`)
    }
    if (timestamp) {
      args.push(`--timestamp=${timestamp}`)
    }
    if (disableDefaultCreate2Deployer) {
      args.push(`--disable-default-create2-deployer`)
    }
    if (forkUrl) {
      args.push(`--fork-url=${forkUrl}`)
    }
    if (forkBlockNumber) {
      args.push(`--fork-block-number=${forkBlockNumber}`)
    }
    if (forkRetryBackoff) {
      args.push(`--fork-retry-backoff=${forkRetryBackoff}`)
    }
    if (retries) {
      args.push(`--retries=${retries}`)
    }
    if (timeout) {
      args.push(`--timeout=${timeout}`)
    }
    if (computeUnitsPerSecond) {
      args.push(`--compute-units-per-second=${computeUnitsPerSecond}`)
    }
    if (noRateLimit) {
      args.push(`--no-rate-limit`)
    }
    if (noStorageCaching) {
      args.push(`--no-storage-caching`)
    }
    if (baseFee) {
      args.push(`--base-fee=${baseFee}`)
    }
    if (chainId) {
      args.push(`--chain-id=${chainId}`)
    }
    if (codeSizeLimit) {
      args.push(`--code-size-limit=${codeSizeLimit}`)
    }
    if (gasLimit) {
      args.push(`--gas-limit=${gasLimit}`)
    }
    if (gasPrice) {
      args.push(`--gas-price=${gasPrice}`)
    }
    if (allowOrigin) {
      args.push(`--allow-origin=${allowOrigin}`)
    }
    if (noCors) {
      args.push(`--no-cors`)
    }
    if (host) {
      args.push(`--host=${host}`)
    }
    if (configOut) {
      args.push(`--config-out=${configOut}`)
    }
    if (pruneHistory) {
      args.push(`--prune-history`)
    }

    port = port || 8545

    const anvilProcess = spawn('anvil', args)

    anvilProcess.stdout.on('data', (data) => {
      const dataStr = data.toString()

      if (dataStr.includes(`Listening on 127.0.0.1:${port}`)) {
        resolve(anvilProcess)
      }

      log(dataStr)
    })

    anvilProcess.stderr.on('data', (data) => {
      reject(data.toString())
    })
  })

  function log(data: string) {
    if (logging) {
      console.log(data)
    }
  }
}
