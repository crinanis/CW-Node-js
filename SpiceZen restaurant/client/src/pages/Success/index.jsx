import { Alert } from "../../components/elements/Alert";
export const Success = () => {
    return (
        <div className="max-w-lg mx-auto p-4">
            <Alert variant="success">
                Your booking was successful!
            </Alert>
        </div>
    )
}
