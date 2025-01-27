import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCartItems } from "../features/products/productsSlice";

const CartTotalSummary = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.products);

  const totalItems = cartItems.reduce((acc, cur) => acc + cur.cartQuantity, 0);

  const totalMrpPrice = cartItems.reduce(
    (acc, cur) => acc + cur.item.mrpPrice * cur.cartQuantity,
    0
  );

  const totalSellPrice = cartItems.reduce(
    (acc, cur) => acc + cur.item.sellPrice * cur.cartQuantity,
    0
  );

  const totalDiscountPrice = totalMrpPrice - totalSellPrice;
  const totalDeliveryCharges = totalSellPrice >= 3999 ? 0 : 499;

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  return (
    <div>
      <div>
        <h5>PRICE DETAILS</h5>
        <hr />
        <p>
          Price ({totalItems} item){" "}
          <span className="float-end">
            ₹{totalMrpPrice.toLocaleString("en-IN")}
          </span>
        </p>
        <p>
          Discount{" "}
          <span className="float-end">
            -₹{totalDiscountPrice.toLocaleString("en-IN")}
          </span>
        </p>
        <p>
          Delivery Charges{" "}
          <span className="float-end">
            {totalDeliveryCharges === 0 ? (
              <span className="text-success">Free</span>
            ) : (
              "₹499"
            )}
          </span>
        </p>
        <hr />
        <p>
          <strong>
            TOTAL AMOUNT{" "}
            <span className="float-end">
              ₹{(totalDeliveryCharges + totalSellPrice).toLocaleString("en-IN")}
            </span>
          </strong>
        </p>
        <hr />
        <p className="text-success fw-bold">
          You will save ₹{totalDiscountPrice.toLocaleString("en-IN")} on this
          order
        </p>
      </div>
    </div>
  );
};

export default CartTotalSummary;
