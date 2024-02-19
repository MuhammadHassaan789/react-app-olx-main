import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@mui/material';

const { Meta } = Card;

const CardItem = ({ title, image, amount, adId, images }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLoading(false);
    };

    fetchData();
  }, []);

  const getImageUrl = () => {
    if (images) {
      return images[0]; // Use the first image if it's an array
    }
    return image; // Use the single image if it's not an array
  };

  return (
    <>
      {loading ? (
        <Skeleton variant="rectangular" width={240} height={240} />
      ) : (
        <Card
          onClick={() => navigate(`detail/${adId}`)}
          hoverable
          style={{ width: 240, height: '280px', }}
          cover={<img style={{ objectFit: 'cover', height: '150px' }} alt="example" src={getImageUrl()} />}
        >
          <Meta title={`Rs ${amount}`} description={title} />
        </Card>
      )}
    </>
  );
};

export default CardItem;
