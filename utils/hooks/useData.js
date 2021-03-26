import React, {useEffect, useState} from 'react';
import {get} from "../api";
import {useDidMountEffect} from "./useDidMountEffect";

export const useData = (api, params) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData()
  }, []);

  useDidMountEffect(() => {
    setLoading(true);
    fetchData()
  }, [params]);

  useDidMountEffect(() => {
    setLoading(true);
    fetchData()
  }, [api]);

  const refresh = () => {
    fetchData();
  };

  const fetchData = () => {
    api &&
    get(api, params).then(response => {
      setLoading(false);
      setData(response.data)
    });
  };

  return {data: data, loading: loading, refresh: refresh};
};
