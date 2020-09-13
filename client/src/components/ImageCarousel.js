import React from 'react';
import { Container, Row, Col } from 'reactstrap';


function ImageCarousel(props) {
    return (
        <div className="slider-item" style={{backgroundImage: `url(images/${props.imageWithCaptions.name})`}}>
	      	<div className="overlay"></div>
	        <Container>
                <Row noGutters className="slider-text align-items-center justify-content-end">
                <Col className="md-6 ftco-animate">
                    <div className="text">
                        <h2>{props.imageWithCaptions.heading1}</h2>
                        <h1 className="mb-3">{props.imageWithCaptions.heading2}</h1>
                    </div>
                </Col>
                </Row>
            </Container>
	    </div>
    );
}

export default ImageCarousel;