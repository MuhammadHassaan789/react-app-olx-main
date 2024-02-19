import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import Button from '@mui/material/Button';
import { Select } from 'antd';

import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { Icon } from 'leaflet';

import './input.css';
import 'leaflet/dist/leaflet.css'
import {
    storage,
    ref,
    uploadBytes,
    getDownloadURL,
    addDoc,
    collection,
    db,
} from '../../config/firebase';

const { TextArea } = Input;


const onChange = (value) => {
    console.log(`selected ${value}`);
};
const onSearch = (value) => {
    console.log('search:', value);
};

const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());


function Postad() {
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [price, setPrice] = useState('');
    const [images, setImages] = useState();
    const [contact, setContact] = useState('');
    const [category, setCategory] = useState('');
    const [markerCoords, setMarkerCoords] = useState(null);

    useEffect(() => {
        const getGeolocation = async () => {
            try {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        console.log("position", position);
                        const { latitude, longitude } = position.coords;
                        setMarkerCoords([latitude, longitude]);
                    },
                    (error) => {
                        console.error('Error getting geolocation:', error.message);
                    }
                );
            } catch (error) {
                console.error('Error getting geolocation:', error.message);
            }
        };

        getGeolocation();
    }, []);


    const handlePost = async (e) => {
        e.preventDefault();
        console.log('running');
        try {
            const uid = localStorage.getItem('uid');

            const adDetails = {
                title,
                details,
                amount: price,
                uid,
                contact,
                category,
                coords: { latitude: markerCoords[0], longitude: markerCoords[1] },
            };

            console.log('handlePost: adDetails', adDetails);

            await addDoc(collection(db, "ads"), { ...adDetails, images });
            alert('Posted successfully!');
            setImages('');
            setTitle('');
            setPrice('');
            setDetails('');
            setCategory('')
            setContact('')
        } catch (error) {
            console.log(error);
        }
    };


    const handleChange = async (imageNames) => {
        try {
            const imageFiles = imageNames.target.files;
            console.log('Selected Files:', imageFiles);
            const imageUrls = [];

            for (const image of imageFiles) {
                const storageRef = ref(storage, `ads/${image.name}`);
                await uploadBytes(storageRef, image);
                const url = await getDownloadURL(storageRef);
                imageUrls.push(url);
            }
            console.log('Image URLs:', imageUrls);
            setImages(imageUrls);
            console.log(images)
        } catch (e) {
            alert(e.message);
        }
    };


    const handleMarkerMove = (e) => {
        if (e.latlng) {
            setMarkerCoords([e.latlng.lat, e.latlng.lng]);
        }
    };

    const customIcon = new Icon({
        iconUrl: "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png",
        iconSize: [38, 38]
    })

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Post your ad</h1>
            <div className="main-div">
                <div className="details w-full custom-border-150 p-6 text-lg">
                    <label className='w-full'>Title
                        <Input required onChange={(e) => setTitle(e.target.value)} size="large" placeholder="Ad title" className="h-9 mb-4 text-lg w-full" />
                    </label>
                    <div className="price w-full custom-border-70 ">
                        <label className='w-full'>Detail
                            <TextArea required onChange={(e) => setDetails(e.target.value)} className="text-lg" rows={5} placeholder="Enter Details" maxLength={80} />
                        </label>
                    </div>
                </div>
                <div className="price custom-border-70 p-6">
                    <label className='w-full'>Price
                        <Input required onChange={(e) => setPrice(e.target.value)} size="large" placeholder="Enter amount" className="h-9 mb-4 text-lg" />
                    </label>
                </div>
                <div className="price custom-border-70 p-6">
                    <label className='w-full'>Category <br />
                        <Select
                            required
                            showSearch
                            placeholder="Select a category"
                            optionFilterProp="children"
                            style={{ width: '100%' }}
                            onChange={(value) => setCategory(value)}
                            onSearch={onSearch}
                            filterOption={filterOption}
                            options={[
                                {
                                    value: 'fashion',
                                    label: 'Fashion',
                                },
                                {
                                    value: 'electronics',
                                    label: 'Electronics',
                                },
                                {
                                    value: 'bike',
                                    label: 'Bike',
                                },
                                {
                                    value: 'paint',
                                    label: 'Paint',
                                },
                                {
                                    value: 'sale',
                                    label: 'Sale',
                                },
                                {
                                    value: 'rent',
                                    label: 'Rent',
                                },
                                {
                                    value: 'sports',
                                    label: 'Sports',
                                },
                                {
                                    value: 'mobile',
                                    label: 'Mobile',
                                },
                                {
                                    value: 'furniture',
                                    label: 'Furniture',
                                },
                                {
                                    value: 'cars',
                                    label: 'Cars',
                                },
                            ]}
                        />
                    </label>
                </div>
                <div className="price custom-border-70 p-6">
                    <label className='w-full'>Contact
                        <Input required onChange={(e) => setContact(e.target.value)} size="large" placeholder="Enter Contact" className="h-9 mb-4 text-lg" />
                    </label>
                </div>
                <div className="pics custom-border-30 p-6">
                    <label className='w-full'>Picture
                        <Input required type="file" multiple onChange={handleChange} />
                    </label>
                </div>
                {markerCoords && (
                    <div className="post-ad custom-border-30 p-6">
                        <label className='w-full'>Your Location
                            <MapContainer center={markerCoords} zoom={13} scrollWheelZoom={false}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={markerCoords} icon={customIcon} draggable={true} eventHandlers={{ dragend: handleMarkerMove }}>
                                </Marker>
                            </MapContainer>
                        </label>
                    </div>
                )}
                <div className="post-ad custom-border-30 p-6">
                    <Button variant="contained" onClick={(e) => handlePost(e)}>Post your Ad</Button>
                </div>
            </div>
        </div>
    );
}

export default Postad;