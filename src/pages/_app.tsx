import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'

import {
  store,
  persistor
} from 'redux-store/store'

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </PersistGate>
  </Provider>
}
