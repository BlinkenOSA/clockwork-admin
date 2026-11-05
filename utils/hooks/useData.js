import React, {useState} from 'react';
import {get} from "../api";
import {useDeepCompareEffect, useUpdateEffect} from "react-use";

export const useData = (api, params={}) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useUpdateEffect(() => {
    setLoading(true);
    fetchData()
  }, [api]);

  useDeepCompareEffect(() => {
    setLoading(true);
    fetchData()
  }, [params]);

  const refresh = () => {
    fetchData();
  };

  const fetchData = () => {
    api ?
    get(api, params).then(response => {
      setLoading(false);
      setData(response.data)
    }).catch(error => {
      setData(undefined);
      setLoading(false);
    }) : setLoading(false);
  };

  return {data: data, loading: loading, refresh: refresh};
};
