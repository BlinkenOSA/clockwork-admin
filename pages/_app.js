import { Provider } from 'next-auth/client'
import 'antd/dist/antd.min.css'
import '../styles/styles.css';
import React from "react";
import {LoginCheck} from "../components/Login/LoginCheck";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <LoginCheck/>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
