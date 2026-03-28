import React from 'react'
import Banner from './Banner'
import TopSellers from './TopSellers'
import Recommened from './Recommened'
import News from './News'
import RecommendedBooks from '../../components/RecommendedBooks'

const Home = () => {
  return (
    <>
        <Banner/>
        <TopSellers/>
        <Recommened/>
        <RecommendedBooks/>
        <News/>
    </>
  )
}

export default Home;