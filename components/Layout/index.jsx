import AppHeader from '../AppHeader'
import AppFooter from '../AppFooter'

export default function Layout({ children }) {
  return (
    <div>
      <AppHeader />
      <main style={{ minHeight: 'calc(100vh - 390px)' }}>{children}</main>
      {/* <AppFooter /> */}
    </div>
  )
}
