import React from 'react'
import Carousel from './components/Carousel'
import ProductsCard from './components/ProductsCard'
import { Box } from '@chakra-ui/react'

const Home = () => {
  return (
    <div>
        <Carousel/>
        <Box display={"flex"} justifyContent={"center"} flexWrap={"wrap"}><ProductsCard/>
        <ProductsCard/><ProductsCard/><ProductsCard/></Box>
        
    </div>
  )
}

export default Home
