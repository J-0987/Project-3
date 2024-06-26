import { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import heroImg from '../assets/hero.jpg';
import heroImg2 from '../assets/hero2.jpg';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import sunglasses from '../assets/sunglasses.jpg';
import perfume from '../assets/perfume.jpg';
import beauty from '../assets/beauty.jpg'
import img1 from '../assets/fashion.jpg'
import img2 from '../assets/fashion2.jpg'
import './index.css'

function Hero() {
  return (

    <div >

      <div>

        <Carousel fade controls={false} indicators={false}>
          <Carousel.Item>
            <img
              className="d-block w-full md:h-auto"
              src={heroImg2}
              alt="First slide"
            />
            <Carousel.Caption className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <h3 className="text-3xl font-bold text-white mb-2">Shop Where Your Heart is</h3>
              <p className="text-white text-lg ">Final Class SALE</p>
              <div className="md:block hidden">
                <Link to='/products'>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4">
                    SHOP NOW
                  </button>
                </Link>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-full md:h-auto"
              src={heroImg}
              alt="Second slide"
            />
            <Carousel.Caption className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <h3 className="text-3xl font-bold text-white mb-2">Shop Where Your Heart is</h3>
              <p className="text-white text-lg ">Final Class SALE</p>
              <div className="md:block hidden">
                <Link to='/products'>
                  <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded mt-4">
                    SHOP NOW
                  </button>
                </Link>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <div className="text-center mt-4 md:hidden">
          <Link to='/products'>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              SHOP NOW
            </button>
          </Link>

        </div>

        <h2 className="text-2xl font-bold text-center my-8">All the essentials for work, playtime & more.</h2>
        <Container className='category flex'>
          <Row className='justify-around'>

            <Col className="flex flex-col items-center" xs={6} md={4} >
              <Image src={perfume} roundedCircle />

            </Col>
            <Col className="flex flex-col items-center" xs={6} md={4}>
              <Image src={beauty} roundedCircle />

            </Col>
            <Col className="flex flex-col items-center" xs={6} md={4}>
              <Image src={sunglasses} roundedCircle />

            </Col>

          </Row>
        </Container>


        <h2 className="text-2xl font-bold text-center my-8">Give your closet a seasonal refresh..</h2>


        <Link to='/products'>
          <button className=" bg-cyan-500 hover:bg-cyan-600 text-white w-full font-bold my-1  py-2 px-4 rounded">
            SHOP NOW
          </button>
        </Link>
        <Container className='flex justify-evenly mb-3'>
          <Image src={img1} className="w-1/2" />

          <Image src={img2} className="w-1/2" />

        </Container>




      </div>
    </div>
  );
}

export default Hero;
