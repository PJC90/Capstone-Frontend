import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            // stars.push(<FontAwesomeIcon key={i} icon={faStar} style={{ color: 'E38F38' }} />);
            stars.push('★');
        } else {
            // stars.push(<FontAwesomeIcon key={i} icon={faStar} style={{ color: 'rgb(228, 228, 228)' }} />);
            stars.push('☆');
        }
    }

    return (
        <div style={{ display: 'flex', color:"#E38F38" }} className="fs-4">
            {stars}
        </div>
    );
}

export default StarRating;

