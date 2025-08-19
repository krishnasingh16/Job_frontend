import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CatogoryCarousel from './CatogoryCarousel'
import LatestJobs from './LatestJobs'
import FOoter from './FOoter'
import useGetAlljobs from '@/hooks/useGetAlljobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'



const Home = () => {
  useGetAlljobs();
  const{user} = useSelector(store =>store.auth)
  const navigate = useNavigate()
  useEffect(()=>{
    if(user?.role== 'Recruiter'){
      navigate("/admin/companies");
    }
  },[])
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <CatogoryCarousel/>
      <LatestJobs/>
      <FOoter/>
    </div>
  )
}

export default Home
