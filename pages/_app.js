import {SessionProvider, signIn, useSession} from "next-auth/react"
import 'antd/dist/reset.css'
import '../styles/global.css';
import '../styles/variables.css';
import React from "react";
import {ConfigProvider} from "antd";
import Loading from "../components/Layout/Loading";
import {UserProvider} from "../utils/context/UserContext";

const themeOptions = {
    token: {
        borderRadius: 2,
    },
}

function ClockworkApp({ Component, pageProps }) {
  return (
      <ConfigProvider theme={themeOptions}>
        <SessionProvider session={pageProps.session}>
            {
                Component.withoutLogin ? (
                    <Component {...pageProps} />
                    ) : (
                    <Auth>
                        <UserProvider>
                          <Component {...pageProps} />
                        </UserProvider>
                    </Auth>
                )
            }
        </SessionProvider>
      </ConfigProvider>
  )
}

const Auth = ({ children }) => {
    const { data, status } = useSession({
      required: true,
      onUnauthenticated() {
        signIn();
      },
    })

    if (status === "loading") {
        return <Loading />
    }

    if (data) {
      if (data?.error === "RefreshAccessTokenError") {
        signIn();
      } else {
        return children;
      }
    }
}

export default ClockworkApp
