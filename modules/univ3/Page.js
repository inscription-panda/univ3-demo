import React, { useEffect } from 'react'
import { Button } from 'antd'
import { ethers } from 'ethers'
import { useContract } from 'hooks/useContracts'
import { useMutiCallV2 } from '@/hooks/useMutiCalls'
import { computePoolAddress } from '@uniswap/v3-sdk'
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json'
import useWeb3 from '@/hooks/useWeb3'
import {
  POOL_FACTORY_CONTRACT_ADDRESS,
  ETH_TOKEN,
  USDT_TOKEN,
} from './constants'

export default function Univ3() {
  const { _currentAccount, web3, currentAccount, wallet } = useWeb3()
  const { getContract } = useContract()
  const multiCallsV2 = useMutiCallV2()

  const init = async () => {
    const currentPoolAddress = computePoolAddress({
      factoryAddress: POOL_FACTORY_CONTRACT_ADDRESS,
      tokenA: ETH_TOKEN,
      tokenB: USDT_TOKEN,
      fee: 3000,
    })

    // const ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    // const signer = await ethersProvider.getSigner(currentAccount)

    const poolContract = getContract(currentPoolAddress, IUniswapV3PoolABI.abi)

    const a = await poolContract.methods.token0().call({
      from: currentAccount,
    })
    debugger

    const [token0, token1, fee, tickSpacing, liquidity, slot0] =
      await Promise.all([
        poolContract.methods.token0().call({
          from: currentAccount,
        }),
        poolContract.methods.token1(),
        poolContract.methods.fee(),
        poolContract.methods.tickSpacing(),
        poolContract.methods.liquidity(),
        poolContract.methods.slot0(),
      ])
    console.log(
      'token0, token1, fee, tickSpacing, liquidity, slot0--',
      token0,
      token1,
      fee,
      tickSpacing,
      liquidity,
      slot0
    )
    debugger
  }

  return (
    <div>
      Univ3 <Button onClick={init}>Init</Button>
    </div>
  )
}
