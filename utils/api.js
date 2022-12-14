import axios from 'axios';
import {getSession, signOut} from "next-auth/react";

const API = process.env.NEXT_PUBLIC_CLOCKWORK_API;

export const swrGET = async (url, params={}) => {
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

export const get = async (url, params={}) => {
  const session = await getSession();

  /*
  if (session?.error === "RefreshAccessTokenError") {
    signOut({callbackUrl: '/auth/login'});
  }
  */

  return axios.get(
    `${API}${url}`,
    {
      params: params,
      headers: {
        Authorization: "Bearer " + session.accessToken
      }
    }
  )
};

export const put = async (url, data={}) => {
  const session = await getSession();

  /*
  if (session?.error === "RefreshAccessTokenError") {
    signOut({callbackUrl: '/auth/login'});
  }
  */

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

export const patch = async (url, data={}) => {
  const session = await getSession();

  /*
  if (session?.error === "RefreshAccessTokenError") {
    signOut({callbackUrl: '/auth/login'});
  }
  */

  return axios.patch(
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

  /*
  if (session?.error === "RefreshAccessTokenError") {
    signOut({callbackUrl: '/auth/login'});
  }
  */

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

  /*
  if (session?.error === "RefreshAccessTokenError") {
    signOut({callbackUrl: '/auth/login'});
  }
  */

  return axios.delete(
    `${API}${url}`,
    {
      headers: {
        Authorization: "Bearer " + session.accessToken
      }
    }
  )
};
