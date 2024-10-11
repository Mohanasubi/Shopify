import React, { ReactElement, useCallback, useEffect, useState } from "react";
import customFetch from "../axios/custom";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  setShowingProducts,
  setTotalProducts,
} from "../features/shop/shopSlice";

const ProductGridWrapper = ({
  searchQuery,
  sortCriteria,
  category,
  page,
  limit,
  children,
}) => {
  const [products, setProducts] = useState([]);
  const { totalProducts } = useAppSelector((state) => state.shop);
  const dispatch = useAppDispatch();

  // Memoize the function to prevent unnecessary re-renders
  // getSearchedProducts will be called only when searchQuery or sortCriteria changes
  const getSearchedProducts = useCallback(
    async (query, sort, page) => {
      if (!query || query.length === 0) {
        query = "";
      }
      const response = await customFetch("/products");
      const allProducts = await response.data;
      let searchedProducts = allProducts.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );

      if (category) {
        searchedProducts = searchedProducts.filter((product) => {
          return product.category === category;
        });
      }

      if (totalProducts !== searchedProducts.length) {
        dispatch(setTotalProducts(searchedProducts.length));
      }

      // Sort the products based on the sortCriteria
      if (sort === "price-asc") {
        searchedProducts = searchedProducts.sort(
          (a, b) => a.price - b.price
        );
      } else if (sort === "price-desc") {
        searchedProducts = searchedProducts.sort(
          (a, b) => b.price - a.price
        );
      } else if (sort === "popularity") {
        searchedProducts = searchedProducts.sort(
          (a, b) => b.popularity - a.popularity
        );
      }
      // Limit the number of products to be displayed
      if (limit) {
        setProducts(searchedProducts.slice(0, limit));
        // Set the number of products being displayed
        // This will be displayed in the ShowingPagination component
        dispatch(setShowingProducts(searchedProducts.slice(0, limit).length));
        // If page is provided, slice the products based on the page number
        // this will be used for pagination
      } else if (page) {
        setProducts(searchedProducts.slice(0, page * 9));
        // Set the number of products being displayed
        // This will be displayed in the ShowingPagination component
        dispatch(
          setShowingProducts(searchedProducts.slice(0, page * 9).length)
        );
        // If no limit or page is provided, display all the products
      } else {
        setProducts(searchedProducts);
        // Set the number of products being displayed
        dispatch(setShowingProducts(searchedProducts.length));
      }
    },
    []
  );

  useEffect(() => {
    getSearchedProducts(searchQuery || "", sortCriteria || "", page || 1);
  }, [searchQuery, sortCriteria, page]);

  // Clone the children and pass the products as props to the children
  // This will cause the children to re-render with the new products
  // Also it will cause many re-renders if the children are not memoized
  // So I memoized the ProductGrid component
  const childrenWithProps = React.Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a
    // typescript error too.
    if (React.isValidElement(child) && products.length > 0) {
      return React.cloneElement(child, { products: products });
    }
    return null;
  });

  return childrenWithProps;
};
export default ProductGridWrapper;
