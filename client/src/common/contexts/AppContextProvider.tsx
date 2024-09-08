/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { theme } from 'antd'
import { createContext, ReactNode, useEffect, useState } from 'react'
import instance from '../config/axios'
import { getAccountUser, getNewToken } from '../../services/auth'
import { Iuser } from '../interfaces/auth'
import useLocalStorage from '../hooks/localstorage/useLocalStorage'

type AppContextProviderProps = {
  children: ReactNode
}

const fetchUser = async(setCurrentUser?:any,setIsLogin?:any,setIsLoading?:any)=>{
  setIsLoading(true)
  try {
    const user = await getAccountUser()
    setCurrentUser(user)
    if(user){
      setIsLogin(true)
      
    }
    setIsLoading(false)
  } catch (error) {
    setCurrentUser(null)
    setIsLogin(false)
    setIsLoading(false)
    console.log(error)
  }
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
  const [isLogin,setIsLogin] = useLocalStorage('login',null)
  useEffect(() => {
    // Thêm một request interceptor
    const requestInterceptor = instance.interceptors.request.use(function (config:any) {
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
        setIsLogin(false)
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
          // next.js
          // nest.js
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
  if(accessToken === undefined || accessToken === undefined && isLogin == false || isLogin === null ||isLogin === undefined ||isLogin === true && !currentUser) {
    fetchUser(setCurrentUser,setIsLogin,setIsLoading)
    // console.log("Ok")
    // console.log("currentUser >> :",currentUser)
  }
  },[isLogin,accessToken,currentUser])
  return (
    <AppContext.Provider value={{ collapsed, setCollapsed, colorBgContainer, borderRadiusLG, accessToken, setAccesToken,setIsLogin,isLogin,isLoading,currentUser }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider