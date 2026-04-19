import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast';
import { getToken, useAuth, useUser } from "@clerk/react";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [searchedCities, setSearchedCities] = useState([]);
  const [showAgencyReg, setShowAgencyReg] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useUser();
  const {getToken} = useAuth();

  const getUser = async ()=> {
    try {
      const {data} = await axios.get('/api/user', {headers: {Authorization: `Bearer ${await getToken()}`}})
      if(data.success) {
        setIsOwner(data.role === "agencyOwner")
        setSearchedCities(data.recentSearchedCities)
      } else {
        // Retry fetching user details after 6 sec
        setTimeout(() => {
          getUser()
        }, 6000);
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const getCars = async ()=> {
    try {
      const {data} = await axios.get("/api/cars")
      if(data.success) {
        setCars(data.cars)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(user) {
      getUser()
    }
  }, [user])

  useEffect(()=>{
    getCars()
  }, [cars])

  const value = {
    axios,
    user,
    getToken,
    navigate,
    cars,
    setCars,
    currency,
    searchedCities,
    setSearchedCities,
    showAgencyReg,
    setShowAgencyReg,
    isOwner,
    setIsOwner,
    searchQuery,
    setSearchQuery
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
