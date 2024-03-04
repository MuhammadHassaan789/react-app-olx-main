import { List } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { IoMdTrash } from 'react-icons/io'
import { IoBagCheckOutline } from 'react-icons/io5'
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import { removeCart } from '../../store/cartSlice';

const Lists = () => {
    const cart = useSelector(state => state.cart)
    console.log('cart', cart)
    const dispatch = useDispatch();

    const handleRemoveItem = (e, itemId) => {
        e.preventDefault();
        dispatch(removeCart(itemId));
    };

    return (
        <div className='lists-con'>
            <>
                {cart.length > 0 ?
                    <>
                        <div className='quan-con'>
                            <div style={{ textAlign: 'center' }}>
                                <p style={{ margin: 5, fontSize: 16, fontWeight: 500 }}>Shipping, taxes calculated at checkout.</p>
                                <NavLink to={'/'}>
                                    <div className={''}>
                                        <NavLink to={"/"}>
                                            <Button variant='contained' size='small' className='add-button'>
                                                <span style={{ marginRight: 5, fontSize: 17 }}>
                                                    CHECKOUT
                                                </span>
                                                <IoBagCheckOutline />
                                            </Button>
                                        </NavLink>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                        <List
                            itemLayout="horizontal"
                            dataSource={cart}
                            renderItem={(item, index) => {
                                return (
                                    <List.Item
                                        key={item?.adId}
                                    >
                                        <NavLink to={`/detail/${item?.adId}`} style={{ width: '100%', textDecoration : 'none' }}>
                                            <List.Item.Meta
                                                avatar={<img className='drawer-cart-img' src={item?.images[0]} alt='cart' />}

                                                title={
                                                    <span style={{ fontSize: 16 }}>
                                                        {item?.title}
                                                    </span>
                                                }

                                                description={
                                                    <div>
                                                        <div style={{
                                                            display: 'flex',
                                                            flexWrap: 'wrap',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center'
                                                        }}>
                                                            <div style={{ fontWeight: '600', color: '#126373', fontSize: 15 }}>
                                                                Small
                                                            </div>

                                                            <div style={{ fontWeight: '600', color: '#126373', fontSize: 18, margin: "-5px 0" }}>
                                                                <span style={{ fontSize: 16 }}>RS</span> {item?.amount}
                                                            </div>
                                                        </div>

                                                        <div className='item-list-qty'>
                                                        <p className='m-0'>QTY : {item.qty}</p>
                                                            <div
                                                                className='drawer-trash-con'
                                                                style={{ cursor: 'pointer' }}
                                                            >
                                                                {/* <Button>
                                                                    Quantity:{state}
                                                                </Button> */}
                                                                <IoMdTrash
                                                                    onClick={(e) => handleRemoveItem(e, item.adId)}
                                                                    color='red' size={20} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            />
                                        </NavLink>
                                    </List.Item>
                                )
                            }}
                        /> </> : <List>
                        <div className='empty-cart' style={{ marginTop: 20 }}>
                            <p>Your cart is currently empty.</p>
                        </div>
                    </List >}
            </>
        </div >
    )
};

export default Lists;