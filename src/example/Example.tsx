import './Example.css'
import React, { useCallback, useEffect, useState } from 'react'

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

    setTokenInBalance(
      await getCurrencyBalance(provider, address, CurrentConfig.tokens.in)
    )
    setTokenEthBalance(
      await getCurrencyBalance(provider, address, CurrentConfig.tokens.eth)
    )
    setTokenOutBalance(
      await getCurrencyBalance(provider, address, CurrentConfig.tokens.out)
    )
  }, [])

  // Event Handlers

  const onConnectWallet = useCallback(async () => {
    if (await connectBrowserExtensionWallet()) {
      refreshBalances()
    }
  }, [refreshBalances])

  const onCreateTrade = useCallback(async () => {
    refreshBalances()
    setTrade(await createTrade(tradeAmount))
  }, [refreshBalances, tradeAmount])

  const onTrade = useCallback(async (trade: TokenTrade | undefined) => {
    if (trade) {
      setTxState(await executeTrade(trade))
    }
  }, [])

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

      <h3>
        Trading {tradeAmount} {CurrentConfig.tokens.in.symbol} for{' '}
        {CurrentConfig.tokens.out.symbol}
      </h3>
      <h3>{trade && `Constructed Trade: ${displayTrade(trade)}`}</h3>
      <input
        type="number"
        onChange={(e) => setTradeAmount(Number(e.target.value))}
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
      <h3>{`${CurrentConfig.tokens.in.symbol} Balance: ${tokenInBalance}`}</h3>
      <h3>{`${CurrentConfig.tokens.eth.symbol} Balance: ${tokenEthBalance}`}</h3>
      <h3>{`${CurrentConfig.tokens.out.symbol} Balance: ${tokenOutBalance}`}</h3>

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
