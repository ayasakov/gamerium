import axios from 'axios';
import {ApicalypseConfig} from 'apicalypse';

interface AuthToken {
  access_token: string;
  expires_in: number;
  token_type: string;
}

const IGDB_URL = 'https://id.twitch.tv/oauth2/token';

export const getRequestOptions = (clientId: string, token: string): ApicalypseConfig => ({
  method: 'post',
  baseURL: 'https://api.igdb.com/v4',
  headers: {
    'Client-ID': clientId,
    Authorization: `Bearer ${token}`
  },
  responseType: 'json',
});

export const authorizeIGDB = async (): Promise<AuthToken> => {
  const queryParams = new URLSearchParams();
  queryParams.set('client_id', process.env.CLIENT_ID as string);
  queryParams.set('client_secret', process.env.CLIENT_SECRET as string);
  queryParams.set('grant_type', 'client_credentials');

  const res = await axios(IGDB_URL, {params: queryParams, method: 'POST'});
  return res.data;
};
