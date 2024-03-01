import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            stars.push(<FontAwesomeIcon key={i} icon={faStar} style={{ color: 'E38F38' }} />);
        } else {
            stars.push(<FontAwesomeIcon key={i} icon={faStar} style={{ color: 'rgb(228, 228, 228)' }} />);
        }
    }

    return (
        <div style={{ display: 'flex' }}>
            {stars}
        </div>
    );
}

export default StarRating;

