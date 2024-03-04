import React, { useEffect, useState } from "react";
import { Carousel as CardCarousel } from 'antd';
import CardItem from '../../Components/Card/index.js'
import AllCatagories from "../../Components/AllCatagories";
import { getAllProducts } from '../../config/firebase'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

const Dashboard = () => {
    const [ads, setAds] = useState([])

    useEffect(() => {
        getAds()
        const hello = "HELOO"
    }, [])

    const getAds = async () => {
        const res = await getAllProducts()
        // console.log('res', res)
        setAds(res)
    }

    // const settings = {
    //     dots: false,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 4,
    //     slidesToScroll: 4,
    //     responsive: [
    //         {
    //             breakpoint: 1024,
    //             settings: {
    //                 slidesToShow: 2,
    //                 slidesToScroll: 2
    //             }
    //         },
    //         {
    //             breakpoint: 1440,
    //             settings: {
    //                 slidesToShow: 3,
    //                 slidesToScroll: 3
    //             }
    //         },
    //         {
    //             breakpoint: 464,
    //             settings: {
    //                 slidesToShow: 1,
    //                 slidesToScroll: 1
    //             }
    //         }
    //     ],
    // };

    // function chunkArray(array, size) {
    //     const chunkedArray = [];
    //     for (let i = 0; i < array.length; i += size) {
    //         chunkedArray.push(array.slice(i, i + size));
    //     }
    //     return chunkedArray;
    // }

    // const cardsPerSlider = 8;

    // const chunkedProducts = chunkArray(ads, cardsPerSlider);

    // console.log("Chunked Products:", chunkedProducts);

    // const sliders = chunkedProducts.map((chunk, index) => (
    //     <Slider className="my-6" key={index} {...settings}>
    //         {chunk.map((item, itemIndex) => {
    //             const { title, amount, image, id, images } = item;
    //             return <CardItem key={itemIndex} amount={amount} title={title} image={image} adId={id} images={images} />;
    //         })}
    //     </Slider>
    // ));

    return (
        <div>
            <div className="w-[85%] mx-auto mb-10 sm:block hidden">
                <CardCarousel autoplay dots={false}>
                    <img src="https://images.olx.com.pk/thumbnails/295176473-800x600.webp" alt="" />
                    <img src="https://images.olx.com.pk/thumbnails/295176473-800x600.webp" alt="" />
                </CardCarousel>
            </div>
            <AllCatagories />
            <div>
                <h1 className="text-2xl font-bold my-4">More in recent ads</h1>
                <div className="my-10 w-[80%] mx-auto flex gap-8 flex-wrap justify-center">
                    {/* {sliders} */}
                    {ads.map((item, itemIndex) => {
                        const { title, amount, image, id, images } = item;

                        return (
                            <CardItem key={itemIndex} amount={amount} title={title} image={image} adId={id} images={images} />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
