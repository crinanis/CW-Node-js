import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchDishes, selectAllDishes} from "../../stores/menu/dishesSlice";
import {DishDetailedCard} from "../../components/Menu/DishDetailedCard";
import {Tabs} from "../../components/Menu/Tabs";
import {addToCart} from "../../stores/cart/cartSlice";
import {useUserAuth} from "../../context/UserAuthContext";

export const Menu = () => {
    const { user } = useUserAuth();

    const dispatch = useDispatch();
    const dishes = useSelector(selectAllDishes);
    const [activeTab, setActiveTab] = useState('');
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    useEffect(() => {
        dispatch(fetchDishes())
    }, [])

    const onAddDish = (dish) => {
        dispatch(addToCart(dish))
    }

    const onTabSwitch = (newActiveTab) => {
        setActiveTab(newActiveTab);
        let categories = dishes.dishes.map((dish) => dish.name);
        console.log(dishes)

        let index = categories.findIndex(category => newActiveTab === category);
        console.log("categories" + categories);

        if (index > -1) {
            setActiveTabIndex(index);
        } else {
            setActiveTabIndex(0);
        }
    }

    return (
        <div className="bg-white">
            {
                dishes.status !== 'fulfilled' ?
                    <div>loading...</div> :
                    <div>
                        {
                            dishes.dishes &&
                            <Tabs
                                list={dishes.dishes.map((dish) => dish.name)}
                                activeTab={activeTab}
                                onTabSwitch={onTabSwitch}
                            />
                        }
                        <div  className="menu">
                            {
                                dishes.dishes && dishes.dishes[activeTabIndex].dishes.map((dish, index) => {
                                    return (
                                        <DishDetailedCard key={index} dish={dish} onAddDish={onAddDish}/>
                                    )
                                })
                            }
                        </div>
                        <div className="WhiteStrip"></div>
                    </div>
            }
        </div>
    )
}