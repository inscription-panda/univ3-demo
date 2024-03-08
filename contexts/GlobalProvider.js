import React, {
  useMemo,
  createContext,
  useContext,
  useRef,
  useState,
} from 'react'

const GlobalContext = createContext(null)

function GlobalProvider({ children }) {
  // const [{ data: ConvexVaultsAPY, refetch: refetch3 }] = useQueries({
  //   queries: [
  //     {
  //       queryKey: ['ConvexVaultsAPY'],
  //       queryFn: getConvexVaultsAPY,
  //       initialData: [],
  //     },
  //   ],
  // })

  // useDebounceEffect(
  //   () => {
  //     refetch3()
  //   },
  //   [blockNumber],
  //   { wait: 30000 }
  // )

  const value = useMemo(() => ({}), [])

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  )
}

const useGlobal = () => useContext(GlobalContext)

export { GlobalContext, useGlobal }

export default GlobalProvider
