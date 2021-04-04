import React, {useEffect, useState} from 'react';
import useSWR from "swr";
import {swrGET} from "../api";

export const useUser = () => {
  const [ user, setUser ] = useState(null);

  const { data, error } = useSWR('/auth/users/me/', swrGET, { revalidateOnFocus: true });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
    if (error) {
      setUser(null);
    }
  }, [data, error]);

  return user;
};
