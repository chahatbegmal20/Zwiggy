import classes from "./Modal.module.css";
import ReactDOM from "react-dom";
function Backdrop(props) {
  return <div className={classes.backdrop} onClick={props.onHideCart}/>;
}
function ModalOverlay(props) {
  return (
    <div className={classes.modal}>
      <div className={classes.content}> {props.children}</div>
    </div>
  );
}
function Modal(props) {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onHideCart={props.onHideCart}/>, document.getElementById("overlay"))}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById("overlay")
      )}
    </>
  );
}
export default Modal;
