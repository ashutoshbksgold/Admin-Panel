import toast from 'react-hot-toast';
import { axiosInstance } from 'src/utils';
import { IAPIResponse, IDeleteAPI, IGetAPI, IPatchAPI, IPostAPI } from '../interfaces';
import axios, { AxiosResponse } from 'axios';
import { ELocalStorageKeys } from '../enums';

const EmptyBadRequest = {
  error: 'Bad Request',
  message: 'Oops something went wrong',
  statusCode: 400,
};

// common get api
export async function getApi({
  url,
  showToast = false,
  message,
  params,
}: IGetAPI): Promise<IAPIResponse> {
  const request = await axiosInstance.get(url, { params: params });
  const response = await handleAPIReturn(request, showToast, message);
  return response;
}

// common post api
export async function postApi({
  url,
  values,
  showToast = false,
  message,
}: IPostAPI): Promise<IAPIResponse> {
  const request = await axiosInstance.post(url, values);

  const response = await handleAPIReturn(request, showToast, message);
  return response;
}

// common delete api
export async function deleteApi({
  url,
  values,
  showToast = false,
  message,
}: IDeleteAPI): Promise<IAPIResponse> {
  const request = await axiosInstance.delete(url, values);

  const response = await handleAPIReturn(request, showToast, message);
  return response;
}

// common patch api
export async function patchApi({
  url,
  values,
  showToast = false,
  message,
}: IPatchAPI): Promise<IAPIResponse> {
  const request = await axiosInstance.patch(url, values);

  const response = await handleAPIReturn(request, showToast, message);
  return response;
}

// Handle API data to component
const handleAPIReturn = async (
  request: AxiosResponse,
  showToast: boolean,
  message: string | undefined
): Promise<IAPIResponse> => {
  try {
    const result = await request;
    const { data } = result;
    if (showToast) {
      if (data?.error || data?.status >= 400)
        toast.error(message || data?.message ? data?.message : EmptyBadRequest.message);
      else toast.success(message ? message : data?.message ? data?.message : 'Success');
    }
    return data;
  } catch (error) {
    const { data } = error.response;

    if (showToast) {
      toast.error(message || data?.message ? data?.message : EmptyBadRequest.message);
    }
    return data || EmptyBadRequest;
  }
};
