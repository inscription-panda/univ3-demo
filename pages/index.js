import React from 'react'
import Head from 'next/head'
import { Button } from 'antd'
// import DemoPage from '@/modules/demo/DemoPage'

export default function Demo() {
  const nftAddress = '0x133CAEecA096cA54889db71956c7f75862Ead7A0' // NFT Contract
  const RefreshNFT = async () => {
    const firstDigit = Math.floor(Math.random() * 7) + 1
    const lastDigit = Math.floor(Math.random() * 100000)
  }
  return (
    <React.Fragment>
      <Head>
        <title>f(x) Protocol</title>
      </Head>
      <Button onClick={RefreshNFT}>Refresh NFT</Button>
    </React.Fragment>
  )
}
