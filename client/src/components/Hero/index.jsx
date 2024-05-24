import { useState } from 'react';
import hero from '../assets/hero.jpg';
import './index.css'
import Carousel from 'react-bootstrap/Carousel';
import heroImg from '../assets/hero.jpg'
import heroImg2 from '../assets/hero2.jpg'



function Hero() {
  return (
<div>


<Carousel>
      <Carousel.Item>
      <img
    className="d-block w-100"
    src={heroImg}
    alt="First slide"
  />
        <Carousel.Caption>
          <h3>Shop Where your Heart is</h3>
          <p>Final Class SALE</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img
    className="d-block w-100"
    src={heroImg2}
    alt="Second slide"
  />
       
      </Carousel.Item>

      
     
    </Carousel>




</div>



    
  )
}

export default Hero;