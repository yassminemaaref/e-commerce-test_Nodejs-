import React, { useState, useEffect } from "react";
import Select from 'react-select'
import { Link } from "react-router-dom";
import img1 from '../images/chanel.jpg'

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [SelectedCategory,setSelectedCategory] = useState(undefined);
  const [hasError, setError] = useState(false);

  async function fetchData() {
    try {
      const res = await fetch("http://localhost:4000/product");
      const data = await res.json();
      setProducts(data.data);
    } catch (error) {
      setError(true);
    }
  }

  async function addToCart(id, quantity) {
    try {
      const response = await fetch("http://localhost:4000/cart", {
        method: "POST",
        body: JSON.stringify({
          productId: id,
          quantity: quantity,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await response.json();
      alert("Item Added To Cart");
      console.log(data);
    } catch (err) {
      alert("Something Went Wrong");
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
const categories = Array.from(
  new Set(products.map((res) => res.category))
)

const categoryOptions = categories.map((category) =>({
  value : category ,
  label : category
}))

const filterProducts = SelectedCategory ? products.filter((product) => product.category === SelectedCategory.value):products ;


  return (
    <main>
      <section>
        <div className="banner-innerpage">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6 align-self-center text-center">
                <h1 className="title">Shop listing</h1>
                <h6 className="subtitle op-8">

                </h6>
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
              <div className = 'mb-5 w-50'>
              <Select
              options = {categoryOptions}
              
              placeholder = "select a category"
              onChange = {(selectOption) => setSelectedCategory(selectOption)}
              value = {SelectedCategory}
              />
              </div>
                <div className="row shop-listing">
                  {filterProducts.map((product) => (
                    <div key={product._id} className="col-lg-4">
                      <div className="card shop-hover border-0">
                      <img src={img1} alt="wrapkit" className="img-fluid" />
                        <div className="card-img-overlay align-items-center">
                          <button
                            onClick={() => addToCart(product._id, 1)}
                            className="btn btn-md btn-info"
                          >
                            Add to cart
                          </button>
                        </div>
                      </div>
                      <div className="card border-0">
                        <h6>
                          <Link to={`/product/${product._id}`} className="link">
                            {product.name}
                          </Link>{" "}
                        </h6>
                        <h6 className="subtitle">{product.category}</h6>
                        <h5 className="font-medium m-b-30">
                        {product.price} DT

                        </h5>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};