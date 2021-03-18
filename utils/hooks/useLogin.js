import React, {useEffect} from 'react';
import { useSession } from 'next-auth/client'
import {useRouter} from "next/router";

export const useLogin = () => {
  const [ session, loading ] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session === null) {
      router.push('/auth/login')
    }
  }, [session]);

  return [ session, loading ]
};
