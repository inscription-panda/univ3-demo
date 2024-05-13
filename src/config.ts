import { Token } from '@uniswap/sdk-core'
import { FeeAmount } from '@uniswap/v3-sdk'
import { OUT_TOKEN, IN_TOKEN, ETH_TOKEN } from './libs/constants'

// Sets if the example should run locally or on chain
export enum Environment {
  LOCAL,
  MAINNET,
  WALLET_EXTENSION,
}

// Inputs that configure this example to run
export interface ExampleConfig {
  env: Environment
  rpc: {
    local: string
    mainnet: string
  }
  wallet: {
    address: string
    privateKey: string
  }
  tokens: {
    in: Token
    out: Token
    poolFee: number
    eth: Token
  }
}

// Example Configuration

export const CurrentConfig: ExampleConfig = {
  env: Environment.WALLET_EXTENSION,
  rpc: {
    local:
      'https://rpc.phalcon.blocksec.com/rpc_30a834e782d14f2e9f30eae4bcd399b1',
    mainnet:
      'https://rpc.phalcon.blocksec.com/rpc_30a834e782d14f2e9f30eae4bcd399b1',
  },
  wallet: {
    address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    privateKey:
      '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
  },
  tokens: {
    in: IN_TOKEN,
    out: OUT_TOKEN,
    poolFee: FeeAmount.LOWEST, // MEDIUM,
    eth: ETH_TOKEN,
  },
}
