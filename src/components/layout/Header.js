import classes from "./Header.module.css";
// import react from "react";
import image from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";
function Header(props) {
  return (
    <>
      <header className={classes.header}>
        <h1>Zwiggy</h1>
        <HeaderCartButton onShowCart={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={image} alt="meals" />
      </div>
    </>
  );
}
export default Header;
