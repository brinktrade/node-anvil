# node-anvil

Node.js utility for Foundry's [anvil](https://book.getfoundry.sh/reference/cli/anvil) process

# Use

Install

```
npm install --save-dev @brinkninja/node-anvil
```

Import `startAnvil`

```
import { startAnvil } from '@brinkninja/node-anvil'
```

Use `startAnvil` to start and kill the anvil process. Provide any anvil command line args as camelCase.

```
  const anvil = await startAnvil({ forkUrl: '<MY_RPC_URL>', port: 8546 })

  anvil.kill()
```

## Build and Test

1) Install Docker Desktop for your system ([Mac](https://docs.docker.com/desktop/install/mac-install/), [Linux](https://docs.docker.com/desktop/install/linux-install/))
2) Create a .env file with RPC_URL set to a mainnet (chainId=1) RPC URL.
3) Run `npm run docker` to test
