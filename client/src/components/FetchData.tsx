import {isFunction, isNil} from 'lodash';
import {cloneElement, useEffect, useState} from 'react';

const FetchData = ({fetchData: fetchDataProp, fetchParams, children}) => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [fetchDataError, setFetchDataError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchData({fetchData: fetchDataProp, fetchParams});
  }, [fetchParams]);

  const fetchData = async ({fetchData, fetchParams}) => {
    const abortController = new AbortController();
    const {signal} = abortController;
    fetchParams = {...fetchParams, signal};

    let fetchedData, fetchDataError;
    try {
      fetchedData = await fetchData(fetchParams);
    } catch (error) {
      if (error.name !== 'AbortError') {
        fetchDataError = error;
      }
    }
    handleFetchData(fetchedData, fetchDataError);
  }

  const handleFetchData = (fetchedData, fetchDataError) => {
    setLoading(false);
    setFetchDataError(isNil(fetchDataError) ? null : fetchDataError);
    setData(fetchedData);
  }

  const childrenProps = {...data, fetchDataError, isLoading};
  return isFunction(children) ? children(childrenProps) : cloneElement(children, childrenProps);
};

export default FetchData;
