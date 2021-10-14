import {useLogin} from "../../utils/hooks/useLogin";
import React from "react";

export const LoginCheck = () => {
  const [ session, loading ] = useLogin();

  return (
    <span/>
  )
};
