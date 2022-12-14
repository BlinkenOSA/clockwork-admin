import {SessionProvider, useSession} from "next-auth/react"
import 'antd/dist/reset.css'
import '../styles/global.css';
import '../styles/variables.css';
import React from "react";
import {ConfigProvider} from "antd";
import Loading from "../components/Layout/Loading";
import {UserProvider} from "../utils/context/UserContext";

const themeOptions = {
    token: {
        borderRadius: '2px',
    },
}

function ClockworkApp({ Component, pageProps }) {
  return (
      <ConfigProvider theme={themeOptions}>
        <SessionProvider session={pageProps.session}>
          <UserProvider>
            {
                Component.withoutLogin ? (
                    <Component {...pageProps} />
                    ) : (
                    <Auth>
                        <Component {...pageProps} />
                    </Auth>
                )
            }
          </UserProvider>
        </SessionProvider>
      </ConfigProvider>
  )
}

const Auth = ({ children }) => {
    const { status } = useSession({ required: true })

    if (status === "loading") {
        return <Loading />
    }

    return children
}

export default ClockworkApp
