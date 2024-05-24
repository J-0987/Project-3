import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import About from '../../pages/About';


const footer = () => {
    return (

        <footer className="footer">
            <Container>
                <Row>
                    <Col className='text-center py-3'>
                        Copyright &copy; THE SHOP
                    </Col>

                    <Col>
                    <Link to='/about'>
                    <p> About The Shop</p>
                    </Link>
                   
                    </Col>
             

                </Row>

            
            </Container>
        </footer>


    );
};

export default footer;
