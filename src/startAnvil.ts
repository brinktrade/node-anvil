import { ChildProcessWithoutNullStreams, spawn } from 'child_process'

export default async function (
  {
    forkUrl,
    forkBlockNumber,
    logging
  }: {
    forkUrl?: string,
    forkBlockNumber?: number,
    logging?: boolean
  }
) : Promise<ChildProcessWithoutNullStreams> {
  return new Promise((resolve, reject) => {
    const args: string[] = []

    if (forkUrl) {
      args.push(`--fork-url=${forkUrl}`)
    }

    if (forkBlockNumber) {
      args.push(`--fork-block-number=${forkBlockNumber}`)
    }

    const anvilProcess = spawn('anvil', args)

    anvilProcess.stdout.on('data', (data) => {
      const dataStr = data.toString()

      if (dataStr.includes('Listening on 127.0.0.1:8545')) {
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
