import CartContext from "../../store/cart-context";
import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const cartCtx = useContext(CartContext);
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const orderConfirmHandler = async (userData) => {
    setPlacingOrder(true);
    await fetch(
      "https://server-project-1ff7a-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderItems: cartCtx.items,
        }),
      }
    );
    setPlacingOrder(false);
    setOrdered(true);
    cartCtx.clearCart();
  };

  const totalAmount = `₹${cartCtx.totalAmount.toFixed(2)}`;
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const orderbtn = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onCloseCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const modalContent = (
    <React.Fragment>
      {hasItems && (
        <p>
          <b>Review your cart</b>
        </p>
      )}
      {!hasItems && (
        <h3 className={classes.emptycart}>Please add something to order</h3>
      )}
      {cartItems}
      <div className={classes.total}>
        {hasItems && <span>Total Amount</span>}
        {hasItems && <span>{totalAmount}</span>}
      </div>
      {isCheckout && hasItems && (
        <Checkout
          onConfirm={orderConfirmHandler}
          onCancel={props.onCloseCart}
        />
      )}
      {!isCheckout && orderbtn}
    </React.Fragment>
  );

  const isPlacingOrder = <p className={classes.placingorder}>Placing Order...</p>;

  const isOrdered = 
  <React.Fragment>
  <p className={classes.ordered}>Order placed Successfully!</p>
  <div className={classes.actions}>
      <button className={classes.button} onClick={props.onCloseCart}>
        Close
      </button>
    </div>
    </React.Fragment>

  return (
    <Modal onpress={props.onCloseCart}>
      {!placingOrder && !ordered && modalContent}
      {placingOrder && !ordered && isPlacingOrder}
      {!placingOrder && ordered && isOrdered}
    </Modal>
  );
};

export default Cart;
