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
