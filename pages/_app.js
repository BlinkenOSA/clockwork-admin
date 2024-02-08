import {SessionProvider, signIn, useSession} from "next-auth/react"
import 'antd/dist/reset.css'
import '../styles/global.css';
import '../styles/variables.css';
import React, {useContext} from "react";
import {ConfigProvider} from "antd";
import Loading from "../components/Layout/Loading";
import {UserContext, UserProvider} from "../utils/context/UserContext";
import {useRouter} from "next/router";
import Index401 from "./index401";
import {allowedGroups} from "../utils/config/allowedGroups";
import _ from 'lodash';

const themeOptions = {
  token: {
    borderRadius: 2,
  },
}

function ClockworkApp({Component, pageProps}) {
  return (
    <ConfigProvider theme={themeOptions}>
      <SessionProvider session={pageProps.session}>
        {
          Component.withoutLogin ? (
            <Component {...pageProps} />
          ) : (
            <Auth>
              <UserProvider>
                <CheckAccess>
                  <Component {...pageProps} />
                </CheckAccess>
              </UserProvider>
            </Auth>
          )
        }
      </SessionProvider>
    </ConfigProvider>
  )
}

const CheckAccess = ({children}) => {
  const user = useContext(UserContext);
  const router = useRouter()

  const userHasAccess = (groups) => {
    let access = false;
    const mainPath = `/${router.pathname.split('/')[1]}`

    if (mainPath in allowedGroups) {
      if (allowedGroups[mainPath] === '__ALL__') {
        access = true;
      }

      if (groups.includes(allowedGroups[mainPath])) {
        access = true;
      }
    }

    return access
  }

  if (user) {
    /* If the user is Admin, show him everyting */
    if (user['is_admin']) {
      return children
    }

    return userHasAccess(user['groups']) ? children : <Index401/>
  }

  return "";
}

const Auth = ({children}) => {
  const {data, status} = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  })

  if (status === "loading") {
    return <Loading/>
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
