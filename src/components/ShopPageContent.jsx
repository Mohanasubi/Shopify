import {
  ProductGrid,
  ProductGridWrapper,
  ShopFilterAndSort,
  ShowingPagination,
} from "../components";

import { useState } from "react";

const ShopPageContent = ({ category, initialPage = 1 }) => {
  const [sortCriteria, setSortCriteria] = useState ("");
  const [currentPage, setCurrentPage] = useState(initialPage);

  return (
    <>
      <ShopFilterAndSort
        sortCriteria={sortCriteria}
        setSortCriteria={setSortCriteria}
      />
      <ProductGridWrapper
        sortCriteria={sortCriteria}
        category={category}
        page={currentPage}
      >
        <ProductGrid />
      </ProductGridWrapper>
      <ShowingPagination
        page={currentPage}
        category={category}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};
export default ShopPageContent;
