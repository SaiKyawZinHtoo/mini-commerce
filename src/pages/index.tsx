import Products from "@/components/products";
import SearchProduct from "@/components/searchProduct";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProducts } from "@/store/slices/productSlice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box, Typography } from "@mui/material";
import { Product } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.items);
  const cardItems = useAppSelector((state) => state.card.items);
  const [filderProducts, setFilderProducts] = useState<Product[]>([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    if (products.length) {
      setFilderProducts(products);
    }
  }, [products]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mr: 3,
          cursor: "pointer",
        }}
      >
        <SearchProduct
          products={products}
          setFilderProducts={setFilderProducts}
        />
        <Link href={"/card"} style={{textDecoration: "none", display: "flex"}}>
          <ShoppingCartIcon sx={{ fontSize: 50, ml: 15 }} />
          {cardItems.length > 0 && (
            <Typography variant="h4">{cardItems.length}</Typography>
          )}
        </Link>
      </Box>
      <Products products={filderProducts} />
    </Box>
  );
}
