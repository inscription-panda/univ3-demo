import './Example.css'
import React, { useCallback, useEffect, useState, useMemo } from 'react'

import { CurrentConfig, Environment } from '../config'
import {
  connectBrowserExtensionWallet,
  getProvider,
  getWalletAddress,
  TransactionState,
} from '../libs/providers'
import { createTrade, executeTrade, TokenTrade } from '../libs/trading'
import { displayTrade } from '../libs/utils'
import { getCurrencyBalance, wrapETH, unwrapETH } from '../libs/wallet'
import { Token } from '@uniswap/sdk-core'
import { CHAIN } from '../libs/constants'

const useOnBlockUpdated = (callback: (blockNumber: number) => void) => {
  useEffect(() => {
    const subscription = getProvider()?.on('block', callback)
    return () => {
      subscription?.removeAllListeners()
    }
  })
}

const Example = () => {
  const [trade, setTrade] = useState<TokenTrade>()
  const [txState, setTxState] = useState<TransactionState>(TransactionState.New)

  const [tokenInBalance, setTokenInBalance] = useState<string>()
  const [tokenEthBalance, setTokenEthBalance] = useState<string>()
  const [tokenOutBalance, setTokenOutBalance] = useState<string>()
  const [blockNumber, setBlockNumber] = useState<number>(0)

  const [wrapAmount, setWrapAmount] = useState<number>(0)
  const [unwrapAmount, setUnwrapAmount] = useState<number>(0)
  const [tradeAmount, setTradeAmount] = useState<number>(0)
  const [fee, setFee] = useState<number>(3000)

  const [inAddress, setInAddress] = useState<string>(
    CurrentConfig.tokens.in.address
  )
  const [outAddress, setOutAddress] = useState<string>(
    CurrentConfig.tokens.out.address
  )

  const process = (address: string) => {
    let decimals = 18
    if (
      [
        '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        '0xdac17f958d2ee523a2206206994597c13d831ec7',
      ].includes(address.toLowerCase())
    ) {
      decimals = 6
    }
    if (
      ['0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'].includes(
        address.toLowerCase()
      )
    ) {
      decimals = 8
    }
    return decimals
  }

  const inToken = useMemo(() => {
    try {
      return new Token(
        CHAIN,
        inAddress,
        process(inAddress),
        inAddress,
        inAddress
      )
    } catch (error) {
      return CurrentConfig.tokens.in
    }
  }, [inAddress])

  const outToken = useMemo(() => {
    try {
      return new Token(
        CHAIN,
        outAddress,
        process(outAddress),
        outAddress,
        outAddress
      )
    } catch (error) {
      return CurrentConfig.tokens.out
    }
  }, [outAddress])

  // Listen for new blocks and update the wallet
  useOnBlockUpdated(async (blockNumber: number) => {
    refreshBalances()
    setBlockNumber(blockNumber)
  })

  // Update wallet state given a block number
  const refreshBalances = useCallback(async () => {
    const provider = getProvider()
    const address = getWalletAddress()
    if (!address || !provider) {
      return
    }

    setTokenInBalance(await getCurrencyBalance(provider, address, inToken))
    setTokenEthBalance(
      await getCurrencyBalance(provider, address, CurrentConfig.tokens.eth)
    )
    setTokenOutBalance(await getCurrencyBalance(provider, address, outToken))
  }, [inToken, outToken])

  useEffect(() => {
    setTrade(undefined)
    refreshBalances()
  }, [inToken, outToken, tradeAmount, fee, refreshBalances])

  // Event Handlers

  const onConnectWallet = useCallback(async () => {
    if (await connectBrowserExtensionWallet()) {
      refreshBalances()
    }
  }, [refreshBalances])

  const onCreateTrade = useCallback(async () => {
    refreshBalances()
    setTrade(await createTrade(tradeAmount, inToken, outToken, fee))
  }, [refreshBalances, tradeAmount, inToken, outToken, fee])

  const onTrade = useCallback(
    async (trade: TokenTrade | undefined) => {
      if (trade) {
        setTxState(await executeTrade(trade, inToken))
      }
    },
    [inToken]
  )

  return (
    <div className="App">
      <h3>{`Wallet Address: ${getWalletAddress()}`}</h3>
      {CurrentConfig.env === Environment.WALLET_EXTENSION &&
        !getWalletAddress() && (
          <button onClick={onConnectWallet}>Connect Wallet</button>
        )}

      {CurrentConfig.rpc.mainnet === '' && (
        <h2 className="error">Please set your mainnet RPC URL in config.ts</h2>
      )}

      {CurrentConfig.env === Environment.WALLET_EXTENSION &&
        getProvider() === null && (
          <h2 className="error">
            Please install a wallet to use this example configuration
          </h2>
        )}

      <h3>{trade && `Constructed Trade: ${displayTrade(trade)}`}</h3>

      <div className="item">
        <p>amount:</p>
        <input
          type="number"
          onChange={(e) => setTradeAmount(Number(e.target.value))}
        />
      </div>

      <div className="item">
        <p>fee:</p>
        <input
          type="number"
          value={fee}
          onChange={(e) => setFee(Number(e.target.value))}
        />
      </div>

      <h3>in token address: {inToken.symbol}</h3>
      <p>{`Balance: ${tokenInBalance}`}</p>
      <input value={inAddress} onChange={(e) => setInAddress(e.target.value)} />

      <h3>out token address: {outToken.symbol}</h3>
      <p>{`Balance: ${tokenOutBalance}`}</p>
      <input
        value={outAddress}
        onChange={(e) => setOutAddress(e.target.value)}
      />

      <button onClick={onCreateTrade}>
        <p>Create Trade</p>
      </button>
      <button
        onClick={() => onTrade(trade)}
        disabled={
          trade === undefined ||
          txState === TransactionState.Sending ||
          getProvider() === null ||
          CurrentConfig.rpc.mainnet === ''
        }
      >
        <p>Trade</p>
      </button>

      <h3>{`Block Number: ${blockNumber + 1}`}</h3>
      <h3>{`Transaction State: ${txState}`}</h3>
      <h3>{`${CurrentConfig.tokens.eth.symbol} Balance: ${tokenEthBalance}`}</h3>

      <input
        type="number"
        onChange={(e) => setWrapAmount(Number(e.target.value))}
      />
      <button
        onClick={() => wrapETH(wrapAmount)}
        disabled={
          !wrapAmount ||
          getProvider() === null ||
          CurrentConfig.rpc.mainnet === ''
        }
      >
        <p>Wrap ETH</p>
      </button>

      <input
        type="number"
        onChange={(e) => setUnwrapAmount(Number(e.target.value))}
      />
      <button
        onClick={() => unwrapETH(unwrapAmount)}
        disabled={
          !unwrapAmount ||
          getProvider() === null ||
          CurrentConfig.rpc.mainnet === ''
        }
      >
        <p>unwrap ETH</p>
      </button>
    </div>
  )
}

export default Example
