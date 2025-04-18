import React from 'react'
import Hero from '../herosection/Hero'
import Latestcollections from '../latest_collections/Latestcollections'
import Bestseller from '../Bestseller/Bestseller'
import Newsletter from '../forms/Newsletter'
const Home = () => {
  return (
    <div>
      <Hero/>
      <Latestcollections/>
      <Bestseller/>
      <Newsletter/>
    </div>
  )
}

export default Home