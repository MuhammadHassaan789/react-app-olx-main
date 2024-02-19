import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../../config/firebase'

function AllCatagories() {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await getAllProducts(selectedCategory);
                setProducts(fetchedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, [selectedCategory]);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const categoryImg = [
        {
            src: "./assists/mobile.png",
            title: 'mobile'
        },
        {
            src: "./assists/bike.png",
            title: 'bike'
        },
        {
            src: "./assists/elec.png",
            title: 'electronics'
        },
        {
            src: "./assists/cars.png",
            title: 'cars'
        },
        {
            src: "./assists/fash.png",
            title: 'fashion'
        },
        {
            src: "./assists/furn.png",
            title: 'furniture'
        },
        {
            src: "./assists/paint.png",
            title: 'paint'
        },
        {
            src: "./assists/rent.png",
            title: 'rent'
        },
        {
            src: "./assists/sports.png",
            title: 'sports'
        },
        {
            src: "./assists/sale.png",
            title: 'sale'
        }

    ]



    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">All Categories</h1>
            <div className="category-img">
                <div className="flex flex-wrap justify-center">
                    {categoryImg.map((item) => (
                        <div
                            className={`text-center mx-4 my-2 ${selectedCategory === item.title.toLowerCase() ? 'border-2 border-blue-500' : ''}`}
                            key={item.title}
                            onClick={() => handleCategoryClick(item.title.toLowerCase())}
                            style={{ cursor: 'pointer' }}
                        >
                            <img className="sm:w-[90px] w-[50px] mx-auto" src={require(`./assists/${item.title}.png`)} alt={item.title} />
                            <p className="capitalize mt-2">{item.title}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h2 className="text-xl font-bold mt-4">{selectedCategory ? `${selectedCategory} Products` : 'All Products'}</h2>
            </div>
        </div>
    );
}

export default AllCatagories
