import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./cart.css";

export const Cart = (props) => {
  const [carts, setCarts] = useState([]);
  const [payload, setPayload] = useState({});
  const [hasError, setError] = useState(false);

  async function fetchCart() {
    try {
      const res = await fetch("http://localhost:4000/cart");
      const data = await res.json();
      setCarts(data.items || []); // Ensure data.items is not null or undefined
      setPayload(data);
    } catch (error) {
      setError(true);
    }
  }

  async function increaseQty(id) {
    try {
      const res = await fetch("http://localhost:4000/cart", {
        method: "POST",
        body: JSON.stringify({
          productId: id,
          quantity: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      fetchCart();
      alert("Item Incremented");
    } catch (err) {
      console.log(err);
    }
  }

  async function emptyCart() {
    try {
      await fetch("http://localhost:4000/cart/empty-cart", {
        method: "DELETE",
      });
      fetchCart();
      props.history.push("/");
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <main>
      <section>
        <div className="banner-innerpage">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6 align-self-center text-center">
                <h1 className="title">Cart Listing</h1>
                <h6 className="subtitle op-8">Shopping Web Site</h6>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="spacer">
          <div className="container">
            <div className="row mt-5">
              <div className="col-lg-9">
                <div className="row shop-listing">
                  <table className="table shop-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th className="text-right">Total Price</th>
                        
                      </tr>
                    </thead>
                    {carts.map((cart, index) => (
                      <tbody key={index}>
                        {cart.map((item) => (
                          <tr key={item.productId.id}>
                            <td>{item.productId.name}</td>
                            <td>{item.productId.price}</td>
                            <td>
                              <button
                                onClick={() =>
                                  increaseQty(item.productId.id)
                                }
                                className="btn btn-primary btn-sm"
                              >
                                +
                              </button>
                              {item.quantity}
                              <button className="btn btn-primary btn-sm">
                                -
                              </button>
                            </td>
                            <td className="text-right">
                              <h5 className="font-medium m-b-30">
                                {item.total}
                              </h5>
                            </td>
                            
                          </tr>
                        ))}
                      </tbody>
                    ))}
                    <tfoot>
                      <tr>
                        <td colSpan="3" align="right">
                          Subtotal: {payload.subTotal}
                        </td>
                        <td colSpan="3" align="right">
                              <h5 className="font-medium m-b-30">
                              Discount: {payload.subTotal > 140
                                  ? (payload.subTotal* 0.85).toFixed(2)
                                  : payload.subTotal}
                              </h5>
                            </td>
                        <td colSpan="2" align="right">
                          <button
                            className="btn btn-danger"
                            onClick={emptyCart}
                          >
                            Empty cart
                          </button>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
