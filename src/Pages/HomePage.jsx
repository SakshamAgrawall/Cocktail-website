import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCocktails } from "../Redux/features/cocktailSlice";

const HomePage = () => {
  const [modifiedCocktails, setModifiedCocktails] = useState([]);
  const { loading, cocktails, error } = useSelector((state) => ({
    ...state.app,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCocktails());
  }, [dispatch]);
  useEffect(() => {
    if (cocktails) {
      const newCockatails = cocktails.map((item) => {
        const { idDrink, strDrink, strGlass, strAlcoholic, strDrinkThumb } =
          item;
        return {
          id: idDrink,
          name: strDrink,
          img: strDrinkThumb,
          info: strAlcoholic,
          glass: strGlass,
        };
      });
      setModifiedCocktails(newCockatails);
    } else {
      setModifiedCocktails([]);
    }
  }, [cocktails]);

  if (loading) {
    return (
      <Layout>
        <h1>Loading...</h1>
      </Layout>
    );
  }
  if (error) {
    return (
      <Layout>
        <h1>ERROR</h1>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container">
        <div className="row">
          {modifiedCocktails.map((item) => (
            <div className="col-md-3 mt-2 mb-2" key={item.id}>
              <div className="card" style={{ width: "13rem" }}>
                <img src={item.img} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h4 className="card-title">{item.name}</h4>
                  <h6 className="card-text">{item.glass}</h6>
                  <p className="card-text">{item.info}</p>
                  <Link to={`/products/${item.id}`} className="btn btn-primary">
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
