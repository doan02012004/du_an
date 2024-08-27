/* eslint-disable @typescript-eslint/no-explicit-any */

import { theme } from 'antd'
import { createContext, ReactNode, useEffect, useLayoutEffect, useState } from 'react'
import instance from '../config/axios'
import { getAccountUser, getNewToken } from '../../services/auth'
import { Navigate, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Iuser } from '../interfaces/auth'
type AppContextProviderProps = {
  children: ReactNode
}
export const AppContext = createContext<any>(null)

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentUser,setCurrentUser] = useState({} as Iuser)
  const dispath = useDispatch()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [accessToken, setAccesToken] = useState(null)
  useLayoutEffect(() => {
    // Thêm một request interceptor
    const requestInterceptor = instance.interceptors.request.use( function (config) {
      // // lệnh thực thi trước khi gửi đi 1 request
      config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : config.headers.Authorization;
      return config;
    }, function (error) {
      // lệnh thực thi này bị lỗi
      return Promise.reject(error);
    });
    return () => {
      instance.interceptors.response.eject(requestInterceptor)
    }
  }, [accessToken])
  useLayoutEffect(() => {

    // Add a response interceptor
    const responseInterceptors = instance.interceptors.response.use(function (response) {
      return response;
    }, async function (error) {
      const originalRequest = error.config;

      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          // gọi api để refeshToken
          const data = await getNewToken()
          setAccesToken(data.accessToken)
          // Cập nhật accessToken mới vào localStorage hoặc state
          instance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
          // Cập nhật lại accessToken trong header của request cũ và thử lại request
          originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
          return instance(originalRequest);
        } catch (error) {
          console.error('Unable to refresh access token:', error);
          setAccesToken(null)
          // Nếu refresh token cũng hết hạn, logout và redirect đến trang login
          window.location.href = '/signin';
        }
      }

      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    });

    return () => {
      instance.interceptors.response.eject(responseInterceptors)
    }
  }, [accessToken])
  useEffect(() =>{
    if(accessToken){
      (async()=>{
        try {
          const user = await getAccountUser()
          setCurrentUser(user)
        } catch (error) {
          console.log(error)
        }
      })()
    }
  },[accessToken])
  console.log(currentUser)
  return (
    <AppContext.Provider value={{ collapsed, setCollapsed, colorBgContainer, borderRadiusLG, accessToken, setAccesToken }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider