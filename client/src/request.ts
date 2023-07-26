import axios, {Method} from 'axios';

interface RequestParams {
  method: Method;
  body?: any;
}

const request = (url: string, {method, body}: RequestParams): Promise<any> | any => {
  return axios(url, {method, body});
};

export default request;
