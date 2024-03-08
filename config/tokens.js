const FXNIcon = '/tokens/FXN.svg'
const stETHIcon = '/tokens/steth.svg'
const crvIcon = '/tokens/0xd533a949740bb3306d119cc777fa900ba034cd52.png'
const cvxIcon = '/tokens/0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b.png'

export const contracts = {
  eth: '0x0000000000000000000000000000000000000000',
  multiCall: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',

  // fxUSD
  FxUSD: '0x085780639CC2cACd35E474e71f4d000e2405d8f6',
}

export const tokens = {}

const TOKENS_INFO = {
  eth: ['ethereum', tokens.eth, 18, 'eth'],
  usdc: ['usd-coin', tokens.usdc, 6, 'usdc'],
  usdt: ['usdt', tokens.usdt, 6, 'usdt'],
  dai: ['dai', tokens.dai, 18, 'dai'],
  weth: ['weth', tokens.weth, 18, 'weth'],
  wbtc: ['bitcoin', tokens.wbtc, 8, 'wbtc'],
  seth: ['seth', tokens.seth, 18, 'seth'],
  stETH: ['staked-ether', tokens.stETH, 18, 'stETH', stETHIcon],
  renBTC: ['renbtc', tokens.renBTC, 8, 'renBTC'],
  clev: ['clev', tokens.clev, 18, 'aldClev'],
  clevCVX: ['clev', tokens.clevCVX, 18, 'aldClevCVX'],
  veclev: ['', contracts.aladdinVeCLEV, 18, 'aldVeclev'],
  vefee: ['', contracts.aladdinVeFee, 18, 'aldVefee'],
  cvx: ['convex-finance', tokens.cvx, 18, 'cvx', cvxIcon],
  frax: ['frax', tokens.frax, 18, 'frax'],
  busd: ['binance-usd', tokens.busd, 18, 'busd'],
  tusd: ['true-usd', tokens.tusd, 18, 'TUSD'],
  lusd: ['usd-coin', tokens.lusd, 18, 'lusd'],
  fETH: ['fETH', tokens.fETH, 18, 'fETH'],
  xETH: ['xETH', tokens.xETH, 18, 'xETH'],
  veFXN: ['veFXN', tokens.veFXN, 18, 'veFXN'],
  fxn: ['FXN', tokens.FXN, 18, 'FXN', FXNIcon],
  crv: ['CRV', tokens.crv, 18, 'CRV', crvIcon],
  wstETH: ['wstETH', tokens.wstETH, 18, 'wstETH', 'wstETH'],
  sfrxETH: ['sfrxETH', tokens.sfrxETH, 18, 'sfrxETH', 'sfrxETH'],
  frxETH: ['frxETH', tokens.frxETH, 18, 'frxETH', 'frxETH'],
  xstETH: ['xstETH', tokens.xstETH, 18, 'xstETH', 'xstETH'],
  xfrxETH: ['xfrxETH', tokens.xfrxETH, 18, 'xfrxETH', 'xfrxETH'],
  crvUSD: ['crvusd', tokens.crvUSD, 18],
}

export default {
  tokens,
  contracts,
  TOKENS_INFO,
}
