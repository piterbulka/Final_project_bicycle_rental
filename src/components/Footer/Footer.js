import './Footer.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBicycle } from '@fortawesome/free-solid-svg-icons'
import Container from 'react-bootstrap/Container';

const Footer = () => {
    return (
      <footer className="fixed-bottom pb-3 bg-white">
        <Container>
            <div className='border-top'>
                <Row>
                    <Col className='d-flex align-items-baseline'>
                    <FontAwesomeIcon icon={faBicycle} size="2xl" className='me-2'/> 
                        <h1>UrbanCycleRent</h1>
                    </Col>
                    <Col className='d-flex align-items-center justify-content-end'>
                        <div>Все права защищены &copy; {new Date().getFullYear()}</div>
                    </Col>
                </Row>
            </div>
        </Container>
      </footer>
    );
};
  
 export default Footer;