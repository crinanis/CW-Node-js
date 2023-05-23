import Button from "./Button"
import {useUserAuth} from "../../context/UserAuthContext";

export const ChooseDish = ({onAddDish: onAddDish}) => {
    const {user} = useUserAuth();
    return (

        <div className="">
            {
                user.email !== "kusssyd@gmail.com" &&
                <Button onClick={onAddDish} className="button-56"><span>+</span></Button>
            }
        </div>
    )
}