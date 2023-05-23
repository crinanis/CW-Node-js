import { ChooseDish } from "../elements/ChooseDish";
import "../../assets/styles/menuPreviewCard.css";
import {useUserAuth} from "../../context/UserAuthContext";

export const MenuPreviewCard = ({ dish, onAddDish }) => {
    const {user} = useUserAuth();

    const addDish = () => {
        onAddDish(dish)
    }

    return (
        <div className="dish-container" key={dish.id}>
            <img src={dish.dishImage} alt={dish.dishName} />
            <h2 className="dish-name">{dish.dishName}</h2>
            <p className="dish-description">{dish.dishDescription}</p>
            {
                user && <ChooseDish onAddDish={addDish} />
            }
        </div>

    )
}