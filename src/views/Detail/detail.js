import React, { useEffect, useState } from 'react';
import ImageViewer from '../../Components/ImageViewer/ImageViewer';
import { useParams } from 'react-router-dom';
import { getSingleAd, auth, onAuthStateChanged } from '../../config/firebase';
import Slider from "react-slick";
import { Button } from 'antd';
import cartSlice from '../../store/cartSlice';
import { updateCart } from '../../store/cartSlice';
import './input.css';
import { useDispatch } from 'react-redux';

const Detail = () => {
  const dispatch = useDispatch()

  const [getAd, setAd] = useState(null);
  const [isImageViewerOpen, setImageViewerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [clickedImage, setClickedImage] = useState()

  const { adId } = useParams();

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    const handleAd = async () => {
      setAd(await getSingleAd(adId));
    };
    handleAd();
  }, [adId]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const openImageViewer = (clickedImage) => {
    setImageViewerOpen(true);
    setClickedImage(clickedImage);
  };

  const closeImageViewer = () => {
    setImageViewerOpen(false);
  };
  

  return (
    <div>
      <div className="mb-10 flex justify-center">
        <img src="https://tpc.googlesyndication.com/simgad/7591501326855415024" alt="" />
      </div>
      <div className="main-div flex justify-center flex-wrap">
        <div className="w-[60vh] h-[100vh]">
          {getAd && getAd.images && getAd.images.length > 0 && (
            <Slider {...settings}>
              {getAd.images.map((image, index) => (
                <div className="img" key={index}>
                  <img
                    className="w-[60vh] h-[50vh] rounded-lg"
                    src={image}
                    alt=""
                    onClick={() => openImageViewer(image)}
                  />
                </div>
              ))}
            </Slider>
          )}
          <div className="price-title my-4 rounded-lg ">
            <h1 className="mb-2 mt-0 text-5xl font-medium leading-tight ml-3">Rs.{getAd?.amount}</h1>
            <h3 className="mb-2 mt-0 text-3xl font-medium leading-tight ml-3">{getAd?.title}</h3>
          </div>
          <div className="details-ad my-4 rounded-lg">
            <h5 className="mb-2 text-xl font-medium leading-tight  mt-2 ml-3">Description</h5>
            <p className="ml-3">{getAd?.details}</p>
            <Button onClick={() => dispatch(updateCart(getAd))} className='my-4 ml-3'>Add to Cart</Button>
          </div>
        </div>
        <div className="contact ml-4 rounded-lg">
          <h4 className="mb-2 mt-0 text-2xl font-medium leading-tight ml-3">Contact Info</h4>
          <p className="ml-3">Email:</p>
          <p className='ml-3'>
            {user?.email}
          </p>
          <p className="ml-3 mt-3">Contact:</p>
          <p className='ml-3'>
            {getAd?.contact}
          </p>
        </div>
      </div>
      {isImageViewerOpen && clickedImage && (
        <div className="img">
          <ImageViewer imageUrl={clickedImage} onClose={closeImageViewer} />
        </div>
      )}
    </div>
  );
};

export default Detail;
