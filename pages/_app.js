import React from "react";

import 'antd/dist/antd.min.css'
import '../styles/variables.css'
import '../styles/styles.css'

import { Provider } from 'next-auth/client'

function ClockworkApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default ClockworkApp
