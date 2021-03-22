import axios from 'axios';
import {getSession} from "next-auth/client";

const API = process.env.NEXT_PUBLIC_CLOCKWORK_API;

export const get = async (url, params={}) => {
  const session = await getSession();

  return axios.get(
    `${API}${url}`,
    {
      params: params,
      headers: {
        Authorization: "Bearer " + session.accessToken
      }
    }
    ).then(res => res.data);
};

export const put = async (url, data={}) => {
  const session = await getSession();

  return axios.put(
    `${API}${url}`,
    data,
    {
      headers: {
        Authorization: "Bearer " + session.accessToken
      }
    }
  )
};

export const post = async (url, data={}) => {
  const session = await getSession();

  return axios.post(
    `${API}${url}`,
    data,
    {
      headers: {
        Authorization: "Bearer " + session.accessToken
      }
    }
  )
};

export const remove = async (url) => {
  const session = await getSession();

  return axios.delete(
    `${API}${url}`,
    {
      headers: {
        Authorization: "Bearer " + session.accessToken
      }
    }
  )
};
