import {useForm} from "react-hook-form";
import Button from "../elements/Button";
import {ReactComponent as ArrowRightSvg} from "../../assets/arrow-right.svg";
import {useDispatch} from "react-redux";
import {setInfo} from "../../stores/order-info/infoSlice";
import "../../assets/styles/booking-form.css";

export const BookingForm = ({onTabSwitch}) => {
    const {register, handleSubmit, formState: {errors}, watch} = useForm({shouldRenderErrors: true});
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        dispatch(setInfo(data));
        onTabSwitch('Confirmation');
    };

    const selectedDate = watch('date'); // Получаем значение выбранной даты

    // Проверка, является ли день сегодняшним
    const isToday = (date) => {
        const today = new Date().toISOString().split('T')[0];
        return date === today;
    };

    // Расчет минимального времени (текущее + 2 часа)
    const calculateMinTime = () => {
        const currentDateTime = new Date();
        currentDateTime.setHours(currentDateTime.getHours() + 2);
        return currentDateTime.toTimeString().substr(0, 5);
    };

    const getLastDayOfMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Месяцы в JavaScript начинаются с 0, поэтому добавляем 1
        return new Date(year, month, 0).getDate();
    };

    const currentDate = new Date();
    const lastDayOfMonth = getLastDayOfMonth(currentDate);

    return (
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
            <h3>Personal information for reservation</h3>
            <div className="flex">
                <div className="mr-4">
                    <label htmlFor="name">Name</label>
                    <input
                        {...register('name', {
                            required: {
                                value: true,
                                message: 'Field is required',
                            },
                            pattern: {
                                value: /^[A-Za-z]+$/i,
                                message: 'Please enter a valid name with only alphabetical characters',
                            },
                            minLength: {
                                value: 2,
                                message: 'Name should be at least 2 characters long',
                            },
                            maxLength: {
                                value: 20,
                                message: 'Name should not exceed 20 characters',
                            },
                        })}
                        id="name"
                        type="text"
                        placeholder="Your Name"
                        className="input-field"
                    />
                    <span className="err">{errors.name && errors.name.message}</span>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        {...register('email', {
                            required: {
                                value: true,
                                message: 'Field is required',
                            },
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Please enter a valid email address',
                            },
                            maxLength: {
                                value: 40,
                                message: 'Name should not exceed 20 characters',
                            },
                        })}
                        id="email"
                        type="text"
                        placeholder="Email Address"
                        className="input-field"
                    />
                    <span className="err">{errors.email && errors.email.message}</span>
                </div>
            </div>
            <div className="cont">
                <label htmlFor="date">Date</label>
                <input
                    {...register('date', {
                        required: {
                            value: true,
                            message: 'Field is required',
                        },
                    })}
                    id="date"
                    type="date"
                    placeholder="Date"
                    className="input-field"
                    min={currentDate.toISOString().split('T')[0]}
                    max={`${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${lastDayOfMonth.toString().padStart(2, '0')}`}/>
                <span className="err">{errors.date && errors.date.message}</span>
            </div>
            <div className="cont">
                <label htmlFor="time">Time</label>
                <input
                    {...register('time', {
                        required: {
                            value: true,
                            message: 'Field is required',
                        },
                    })}
                    id="time"
                    type="time"
                    placeholder="Time"
                    className="input-field"
                    min={isToday(selectedDate) ? calculateMinTime() : '08:00'}
                    max="24:00"
                />
                <span className="err">{errors.time && errors.time.message}</span>
            </div>
            <div className="cont">
                <Button className="button-56" type="submit">
                    <span className="mr-1">Next</span>
                    <ArrowRightSvg/>
                </Button>
            </div>
        </form>
    );
};

