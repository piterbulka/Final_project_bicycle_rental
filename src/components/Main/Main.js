import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; 
import './Main.css'
import { Link } from 'react-router-dom';


const Main = () => {
    
    return (
      <div className='mb-mt'>
        <Container>
          <Row className='text-center pt-5'>
            <Col className=''>
              <div className="row pb-5">
                <img className="col-4" src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/34a8e436390093.571a3629371d8.jpg" alt="" />
                <img className="col-4" src="https://static.vecteezy.com/system/resources/previews/004/487/462/original/young-man-walking-with-a-bike-in-the-city-park-and-enjoying-sunny-weather-flat-design-illustration-vector.jpg" alt="" />
                <img className="col-4" src="https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/ee04b836390093.571a362937e06.jpg" alt="" />
              </div>
              <h1 className='pb-4'>Открой город на велосипеде</h1>
              <h4 className='pb-2'>Добро пожаловать в наш сервис проката велосипедов.</h4>
              <h4 className="fw-bold pb-5">Если ваш велосипед был украден, пожалуйста, сообщите нам об этом ниже.</h4>
              <div className="div">
                <Link to="/registration" className="btn btn-success fs-4">Сообщить о краже</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
};

export default Main;
