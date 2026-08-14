import { useEffect } from "react";
import { useAuth } from "@clerk/react";
import http from '../libs/http'


export default function AxiosInterceptor() {
  const { getToken } = useAuth();

  useEffect(() => {
    const interceptor = http.interceptors.request.use(
      async (config) => {
        const token = await getToken();

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      }
    );

    return () => {
      http.interceptors.request.eject(interceptor);
    };
  }, [getToken]);

  return null;
}