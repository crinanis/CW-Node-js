import {ChooseDish} from "../elements/ChooseDish";
import {useUserAuth} from "../../context/UserAuthContext";

export const DishDetailedCard = ({dish, onAddDish: onAddDish}) => {
    const {user} = useUserAuth();

    const addDish = () => {
        onAddDish(dish)
    }

    return (
        <div className="menu-item">
            <div>
                <h2>{dish.dishName}</h2>
                <p>
                    {dish.dishDescription}
                </p>
            </div>
            <div>
                <img src={dish.dishImage} alt={dish.dishName}/>
            </div>
            <div className="dishPrice">{dish.dishPrice}</div>
            {
                user && <ChooseDish onAddDish={addDish}/>
            }
        </div>
    )
}
