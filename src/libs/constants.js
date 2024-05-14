// This file stores web3 related constants such as addresses, token definitions, ETH currency references and ABI's

import { SupportedChainId, Token, NativeCurrency } from '@uniswap/sdk-core'

// Addresses

export const POOL_FACTORY_CONTRACT_ADDRESS =
  '0x1F98431c8aD98523631AE4a59f267346ea31F984'
export const QUOTER_CONTRACT_ADDRESS =
  '0x61fFE014bA17989E743c5F6cB21bF9697530B21e'
export const SWAP_ROUTER_ADDRESS = '0xE592427A0AEce92De3Edee1F18E0157C05861564'
export const WETH_CONTRACT_ADDRESS =
  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'

export const CHAIN = 99917

// Currencies and Tokens
export const IN2_TOKEN = new Token(
  CHAIN,
  '0x0000000000000000000000000000000000000000',
  18,
  'ETH',
  'ETH'
)

export const ETH_TOKEN = new NativeCurrency(CHAIN, 18, 'ETH', 'ETH')

export const IN_TOKEN = new Token(
  CHAIN,
  '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  18,
  'WETH',
  'Wrapped Ether'
)

export const OUT_TOKEN = new Token(
  CHAIN,
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  6,
  'USDC',
  'USD//C'
)

export const USDT_TOKEN = new Token(
  CHAIN,
  '0xdac17f958d2ee523a2206206994597c13d831ec7',
  6,
  'USDT',
  'USD//T'
)

// ABI's

export const ERC20_ABI = [
  // Read-Only Functions
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',

  // Authenticated Functions
  'function transfer(address to, uint amount) returns (bool)',
  'function approve(address _spender, uint256 _value) returns (bool)',

  // Events
  'event Transfer(address indexed from, address indexed to, uint amount)',
]

export const WETH_ABI = [
  // Wrap ETH
  'function deposit() payable',

  // Unwrap ETH
  'function withdraw(uint wad) public',
]

// Transactions

export const MAX_FEE_PER_GAS = 100000000000
export const MAX_PRIORITY_FEE_PER_GAS = 100000000000
export const TOKEN_AMOUNT_TO_APPROVE_FOR_TRANSFER = 2000
export const GAS = '0xf6c00' // '0x76c00'
export const GAS_PRICE = '0x5a817c8000' // '0x4a817c8000'

// Uniswap V2: USDC 0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc
// Uniswap V3: USDC 3 0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640
// Uniswap V3: USDC 2 0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8
// Uniswap V3: wstETH 3 0x109830a1aaad605bbf02a9dfa7b0b92ec2fb7daa
