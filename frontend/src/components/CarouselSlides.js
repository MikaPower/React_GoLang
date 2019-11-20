import React, {useState, useEffect} from "react"
import {Col, Row, Button, Container, Input,Carousel , CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption
} from "reactstrap"

function CarouselSlides (props){

    let companies = props.companies.map(company => (
        <Row key={company.ID} className="pb-1">
            <Col xs={3}>
                <span>{company.name}</span>
            </Col>
            <Col xs={3}>
                <span>{company.address}</span>
            </Col>
            <Col xs={2}>
                <span>{company.postal_code}</span>
            </Col>
            <Col xs={2}>
                <span>{company.parish}</span>
            </Col>
            <Col xs={2}>
                <span>{company.count}</span>
            </Col>
        </Row>
    ));

    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === companies.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? companies.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };


    const slides = props.companies.map(company => {
        return (

            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={company.ID}
            >
                <img
                    src="https://www.daimler.com/bilder/innovation/case/connectivity/factory-56/factory-56-aussen-erw-w768xh384-cutout.jpg"
                    alt={company.name}/>
                <CarouselCaption captionText={company.name+" count:"+company.count} captionHeader={company.address}/>
            </CarouselItem>
        );
    });

    return (
        <Container className="mb-5" style={{backgroundColor:"black"}}>
        <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
        >
            <CarouselIndicators items={companies} activeIndex={activeIndex} onClickHandler={goToIndex}/>
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous}/>
            <CarouselControl direction="next" directionText="Next" onClickHandler={next}/>
        </Carousel>
        </Container>
    );
}





export default CarouselSlides