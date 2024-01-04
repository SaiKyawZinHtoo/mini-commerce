import { Box, TextField } from "@mui/material";
import { Product } from "@prisma/client";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface Props {
  products: Product[];
  setFilderProducts: Dispatch<SetStateAction<Product[]>>;
}

const SearchProduct = ({ products, setFilderProducts }: Props) => {
  const handlSearch = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const searchText = evt.target.value.toLowerCase();
    const searchResult = products.filter((product) =>
      product.title.toLowerCase().includes(searchText)
    );
    setFilderProducts(searchResult);
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "center" }}>
      <TextField
        sx={{ width: 800, margin: "0 auto", mb: 2 }}
        placeholder="Search Products.."
        onChange={handlSearch}
      />
    </Box>
  );
};

export default SearchProduct;
