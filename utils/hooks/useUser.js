import React, {useEffect, useState} from 'react';
import useSWR from "swr";
import {get} from "../api";

export const useUser = () => {
  const [ user, setUser ] = useState(null);

  const { data, error } = useSWR('/auth/users/me/', get, { revalidateOnFocus: false });

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
