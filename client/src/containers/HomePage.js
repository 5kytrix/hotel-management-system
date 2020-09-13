import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ImageCarousel from '../components/ImageCarousel';
import CheckAvailability from './CheckAvailability';
import Amenities from '../components/Amenities';

import { imagesWithCaptions } from '../utils/constants/background-images';

function HomePage() {
    return (
        <div className="hero">
            <Carousel className="home-slider owl-carousel" interval={3000} stopOnHover={false}
              swipeable infiniteLoop autoPlay showArrows={false} showStatus={false} showThumbs={false}>
                {imagesWithCaptions.map(item => {
                    return (
                        <ImageCarousel imageWithCaptions={item} />
                    );
                })}
            </Carousel>
            <CheckAvailability/>
            <Amenities />
        </div>
    );
}

export default HomePage;