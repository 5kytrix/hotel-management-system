import React from 'react';
import { Container, Row, Col } from 'reactstrap';

function Amenities(){
    return (
    <section className="ftco-section">
      <Container>
      	<Row className="justify-content-center mb-5 pb-3">
          <Col className="md-7 heading-section text-center ftco-animate">
          	<span className="subheading">Welcome to Harbor Lights Hotel</span>
            <h2 className="mb-4">You'll Never Want To Leave</h2>
          </Col>
        </Row>  
        <Row className="d-flex">
          <Col className="md pr-md-1 d-flex align-self-stretch ftco-animate">
            <div className="media block-6 services py-4 d-block text-center">
              <div className="d-flex justify-content-center">
              	<div class="icon d-flex align-items-center justify-content-center">
              		<span class="flaticon-reception-bell"></span>
              	</div>
              </div>
              <div className="media-body">
                <h3 className="heading mb-3">Friendly Service</h3>
              </div>
            </div>      
          </Col>
          <Col class="md px-md-1 d-flex align-self-stretch ftco-animate">
            <div class="media block-6 services active py-4 d-block text-center">
              <div class="d-flex justify-content-center">
              	<div class="icon d-flex align-items-center justify-content-center">
              		<span class="flaticon-serving-dish"></span>
              	</div>
              </div>
              <div class="media-body">
                <h3 class="heading mb-3">Get Breakfast</h3>
              </div>
            </div>    
          </Col>
          <Col class="md px-md-1 d-flex align-sel Searchf-stretch ftco-animate">
            <div class="media block-6 services py-4 d-block text-center">
              <div class="d-flex justify-content-center">
              	<div class="icon d-flex align-items-center justify-content-center">
              		<span class="flaticon-car"></span>
              	</div>
              </div>
              <div class="media-body">
                <h3 class="heading mb-3">Transfer Services</h3>
              </div>
            </div>      
          </Col>
          <Col class="md px-md-1 d-flex align-self-stretch ftco-animate">
            <div class="media block-6 services py-4 d-block text-center">
              <div class="d-flex justify-content-center">
              	<div class="icon d-flex align-items-center justify-content-center">
              		<span class="flaticon-spa"></span>
              	</div>
              </div>
              <div class="media-body">
                <h3 class="heading mb-3">Suits &amp; SPA</h3>
              </div>
            </div>      
          </Col>
        </Row>
      </Container>
    </section>
    );
}

export default Amenities;