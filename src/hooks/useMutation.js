import React, { useEffect, useState } from "react";

const useMutation = (promise, config) => {
  const { onSuccess, onFail } = config || {};
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const execute = async (...payload) => {
    try {
      const res = await promise(...payload);
      console?.log(res, onSuccess);
      if (res?.data) {
        setLoading(true);
        setData(res?.data?.data || []);
        onSuccess && onSuccess(res?.data?.data);
      }
    } catch (error) {
      console.log("error", error);
      setError(!error);
      onFail && onFail(error);
    } finally {
      setLoading(false);
    }
  };
  return { data, loading, error, execute };
};

export default useMutation;
