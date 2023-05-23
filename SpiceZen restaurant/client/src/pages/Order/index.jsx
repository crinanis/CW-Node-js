import React, { useState } from 'react';
import { ReactComponent as ArrowRightSvg } from "../../assets/arrow-right.svg";
import { useSelector } from "react-redux";
import { Tabs } from '../../components/Menu/Tabs';
import Button from '../../components/elements/Button';
import { cartDishes } from "../../stores/cart/cartSlice";
import { getInfo } from "../../stores/order-info/infoSlice";
import { DishesSummary } from "../../components/Ordering/DishesSummary";
import { BookingForm } from "../../components/Ordering/BookingForm";
import { Confirmation } from "../../components/Ordering/Confirmation";

export const Order = () => {
    const cart = useSelector(cartDishes);
    const info = useSelector(getInfo);
    const tabs = ['Ordering', 'Booking', 'Confirmation'];
    const [currentTab, setCurrentTab] = useState('Ordering');

    const handleTabSwitch = (tab) => {
        if (
            (tab === 'Booking' && (!cart || cart.length === 0)) ||
            (tab === 'Confirmation' && (!info || Object.keys(info).length !== 4)) ||
            (tab === 'Booking' && currentTab === 'Ordering' && cart.some(dish => dish.amount === 0)) ||
            (tab === 'Confirmation' && currentTab === 'Ordering' && cart.some(dish => dish.amount === 0))
        ) {
            return;
        }
        setCurrentTab(tab);
    };

    return (
        <div className="bg-white h-screen text-black mx-auto mt-2 border border-gray-200 p-4 md:w-2/3 rounded-lg shadow-md sm:p-6 lg:p-8">
            <Tabs list={tabs} onTabSwitch={handleTabSwitch} activeTab={currentTab} />
            <div className="tabs">
                {currentTab === 'Ordering' && (
                    <>
                        {cart && cart.length === 0 ? (
                            <div className="bg-white h-full text-black flex justify-center p-4">
                                <h1>Your Cart is empty</h1>
                            </div>
                        ) : (
                            <>
                                <DishesSummary />
                                <div className="flex justify-end p-2">
                                    <Button className="button-56" onClick={() => handleTabSwitch('Booking')}>
                                        <span className="mr-1">Next</span>
                                        <ArrowRightSvg />
                                    </Button>
                                </div>
                            </>
                        )}
                    </>
                )}
                {currentTab === 'Booking' && (
                    <BookingForm onTabSwitch={handleTabSwitch} />
                )}
                {currentTab === 'Confirmation' && (
                    <Confirmation onTabSwitch={handleTabSwitch} />
                )}
            </div>
        </div>
    )
}
