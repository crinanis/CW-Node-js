import aboutImage from "../../assets/images/best-restaurants.jpg";

export const Footer = () => {
    return (
        <div>
            <div className="container1">
                <img className="about" src={aboutImage} alt="Описание изображения"/>
                <div className="overlay"></div>
                <div className="text">
                    <h2>About us</h2>
                    <p>Welcome to our Asian restaurant, where we take you on a culinary journey through the diverse and
                        rich flavors of Asia. Our restaurant is a celebration of the region's vibrant culture and
                        cuisine, offering a menu that reflects the unique culinary traditions of China, Japan, Korea,
                        Thailand, Vietnam, and more.</p>
                </div>
            </div>
        </div>
    )
}