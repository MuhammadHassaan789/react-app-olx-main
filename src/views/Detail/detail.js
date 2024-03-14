import React, { useEffect, useState } from 'react';
import ImageViewer from '../../Components/ImageViewer/ImageViewer';
import { useParams } from 'react-router-dom';
import { getSingleAd, auth, onAuthStateChanged } from '../../config/firebase';
import Slider from "react-slick";
// import { Button } from 'antd';
import { Button } from '@mui/material';
import { updateCart } from '../../store/cartSlice';
import './input.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Call, CallEnd, MailOutline } from '@mui/icons-material';

const Detail = () => {
  const dispatch = useDispatch()

  const [getAd, setAd] = useState(null);
  const [isImageViewerOpen, setImageViewerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [clickedImage, setClickedImage] = useState()

  const { adId } = useParams();
  const navigate = useNavigate();

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
    <div className='mb-52'>
      <div className="main-div flex justify-center flex-wrap gap-7 my-10 w-full">
        {/* Image section */}
        <div className="md:w-[60vh] w-full">
          {getAd && getAd.images && getAd.images.length > 0 && (
            <Slider {...settings}>
              {getAd.images.map((image, index) => (
                <div className="img" key={index}>
                  <img
                    className="w-full h-[50vh] rounded-lg"
                    src={image}
                    alt=""
                    onClick={() => openImageViewer(image)}
                  />
                </div>
              ))}
            </Slider>
          )}
        </div>

        {/* Detail section */}
        <div className='md:flex-grow-0 flex-grow p-2'>

          <div className="">
            <h3 className="text-4xl font-bold">{getAd?.title}</h3>
            <h1 className="text-3xl text-indigo-600 font-semibold mt-3">
              <span className='text-xl'>RS. </span>
              {getAd?.amount}</h1>
            <p className="">{getAd?.details}</p>
          </div>
          <div className="my-4 contact-con">
            <h4 className="text-2xl mb-3 font-semibold">Contact Info</h4>
            <p className="font-semibold text-xl ">Email</p>
            <div className='flex gap-2 items-center'>
              <MailOutline />
              <p className='text-xl'>
                {user?.email}
              </p>
            </div>
            <p className="font-semibold mt-2 text-xl">Contact</p>
            <div className='flex gap-2 items-center'>
              <Call />
              <p className='text-xl'>
                {getAd?.contact}
              </p>
            </div>
          </div>

          <Button
            variant="contained"
            size='large'
            className='m-0'
            onClick={user ? () => dispatch(updateCart({ ...getAd, adId })) : () => navigate('/login')}
            className='my-4 ml-3'
          >
            Add to Cart
          </Button>
        </div>
      </div>
      {
        isImageViewerOpen && clickedImage && (
          <div className="img">
            <ImageViewer imageUrl={clickedImage} onClose={closeImageViewer} />
          </div>
        )
      }
    </div >
  );
};

export default Detail;
