import clsx from "clsx";

function getClassName({className}) {
    return clsx(className);
}

const Button = ({
                    children,
                    className,
                    ...rest
                }) => {
    return (
        <button className={clsx(getClassName({className}))} {...rest}>
            {children}
        </button>
    );
};

export default Button;
