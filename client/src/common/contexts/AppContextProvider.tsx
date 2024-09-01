/* eslint-disable @typescript-eslint/no-explicit-any */
import { theme } from 'antd'
import { createContext, ReactNode, useEffect, useLayoutEffect, useState } from 'react'
import instance from '../config/axios'
import { getAccountUser, getNewToken } from '../../services/auth'
import { Iuser } from '../interfaces/auth'
import useLocalStorage from '../hooks/localstorage/useLocalStorage'
import { useSearchParams } from 'react-router-dom'
type AppContextProviderProps = {
  children: ReactNode
}
export const AppContext = createContext<any>(null)

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentUser, setCurrentUser] = useState(null as Iuser | null)
  const [isLoading, setIsLoading] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [accessToken, setAccesToken] = useLocalStorage('accessToken', null)
  useEffect(() => {
    // Thêm một request interceptor
    const requestInterceptor = instance.interceptors.request.use(function (config) {
      // // lệnh thực thi trước khi gửi đi 1 request
      //  console.log("accessToken Rq >> :",accessToken)
      config.headers.Authorization = !config._retry && accessToken ? `Bearer ${accessToken}` : config.headers.Authorization;
      return config;
    }, function (error) {

      // lệnh thực thi này bị lỗi
      return Promise.reject(error);
    });
    return () => {
      instance.interceptors.request.eject(requestInterceptor)
    }
  }, [accessToken])
  useEffect(() => {
    // Add a response interceptor
    const responseInterceptors = instance.interceptors.response.use(function (response) {
      return response;
    }, async function (error) {
      const originalRequest = error.config;
      if (error.response?.data?.EC === 1) {
        setAccesToken(null)
        if(window.location.href !== '/signin'){
          window.location.href = '/signin';
        }
      }
      else if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          // gọi api để refeshToken
          const data = await getNewToken()
          setAccesToken(data.accessToken)
          // // Cập nhật accessToken mới vào localStorage hoặc state
          instance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
          // Cập nhật lại accessToken trong header của request cũ và thử lại request
          originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
          return instance(originalRequest);
        } catch (error) {
          console.error('Unable to refresh access token:', error);
          setAccesToken(null)
          // Nếu refresh token cũng hết hạn, logout và redirect đến trang login
          // window.location.href = '/signin';
        }
      }

      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    });

    return () => {
      instance.interceptors.response.eject(responseInterceptors)
    }
  }, [])
  useEffect(() => {
    const fetchUser = async()=>{
      try {
        const user = await getAccountUser()
        setCurrentUser(user)
      } catch (error) {
        setCurrentUser(null)
        console.log(error)
      }
    }
    
  if(accessToken && !currentUser) {
    fetchUser()
    // console.log("Ok")
    // console.log("currentUser >> :",currentUser)
  }
  },[accessToken,currentUser])
  console.log("currentUser >> :",currentUser)
  return (
    <AppContext.Provider value={{ collapsed, setCollapsed, colorBgContainer, borderRadiusLG, accessToken, setAccesToken }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider