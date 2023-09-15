import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchCocktailById } from "../Redux/features/cocktailSlice";
import Layout from "../Components/Layout";
import { useDispatch, useSelector } from "react-redux";

const ProductDetail = () => {
  const [modifiedCocktail, setModifiedCocktail] = useState([]);
  const { loading, cocktail } = useSelector((state) => ({ ...state.app }));
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchCocktailById({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    if (cocktail.length > 0) {
      const {
        strDrink: name,
        strDrinkThumb: img,
        strAlcoholic: info,
        strCategory: category,
        strGlass: glass,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
      } = cocktail[0];
      const Ingredients = [
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
      ];
      const newCocktail = [name, img, info, category, glass, Ingredients];
      setModifiedCocktail(newCocktail);
    } else {
      setModifiedCocktail(null);
    }
  }, [id, cocktail]);

  if (!modifiedCocktail) {
    return <h2>No Cocktail Details Found</h2>;
  } else {
    const [name, img, info, category, glass, Ingredients] = modifiedCocktail;
    return (
      <>
        {loading ? (
          <Layout>
            <h2>Loading</h2>
          </Layout>
        ) : (
          <Layout>
            <div className="container mt-4 mb-4">
              <Link to="/" className="btn btn-info">
                GO BACK
              </Link>
              <div className="row mt-4">
                <div className="col-md-5">
                  <img src={img} alt={name} height={300} width={400} />
                </div>
                <div className="col-md-5">
                  <h2>Name : {name}</h2>
                  <p className="mt-1">Category : {category}</p>
                  <p>Info : {info}</p>
                  <p>Glass : {glass}</p>
                  <p>Ingredients : {Ingredients + " ,"}</p>
                </div>
              </div>
            </div>
          </Layout>
        )}
      </>
    );
  }
};

export default ProductDetail;
