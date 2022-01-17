import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isSixDigit = (value) => value.trim().length === 6;
const isTenDigit = (value) => value.trim().length === 10;

const Checkout = (props) => {
    const [formValiditity, setFormValidity] = useState({
        name: true,
        address: true,
        postal: true,
        city: true,
        number: true,
    });

  const nameInputRef = useRef();
  const addressInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();
  const numberInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredNumber = numberInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredAddressIsValid = !isEmpty(enteredAddress);
    const enteredPostalIsValid = isSixDigit(enteredPostal);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredNumberIsValid = isTenDigit(enteredNumber);


    setFormValidity({
        name: enteredNumberIsValid,
        address: enteredAddressIsValid,
        postal: enteredPostalIsValid,
        city: enteredCityIsValid,
        number: enteredNumberIsValid
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredAddressIsValid &&
      enteredPostalIsValid &&
      enteredCityIsValid &&
      enteredNumberIsValid;


      if (!formIsValid){
          return;
      }

      props.onConfirm({
        name: enteredName,
        address: enteredAddress,
        postal: enteredPostal,
        city: enteredCity,
        number: enteredNumber,
      })

  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formValiditity.name && <p className={classes.error}>Please enter a valid name.</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="address">Address</label>
        <input type="text" id="address" ref={addressInputRef} />
        {!formValiditity.address && <p className={classes.error}>Please enter a valid address.</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formValiditity.postal && <p className={classes.error}>Please enter a valid postal code.</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formValiditity.city && <p className={classes.error}>Please enter a valid city.</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="number">Mobile Number</label>
        <input type="text" id="number" ref={numberInputRef} />
        {!formValiditity.number && <p className={classes.error}>Please enter a valid number.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
