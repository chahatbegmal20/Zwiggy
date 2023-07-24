import styles from "./Header.module.css";
import mealImage from '../../assets/meals.jpeg'

export default function Image(props) {
    return (
        <div className={styles["main-image"]}>
            <img src={mealImage} alt="cfood" />
        </div>
    );
};
