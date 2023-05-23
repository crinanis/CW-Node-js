import clsx from "clsx";

function getClassName({ className }) {
    return clsx("flex rounded-lg p-4 text-sm", className);
}

const variants = {
    success: "bg-green-50 text-green70",
    danger: "bg-red-50 text-red-70"
};

export const Alert = ({ children, className, variant = "success" }) => {
    return (
        <div className={clsx(variants[variant], getClassName({ className }))}>
            <div>{children}</div>
        </div>
    );
};
