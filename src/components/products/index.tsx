import { Box } from "@mui/material";
import { Product } from "@prisma/client";
import Link from "next/link";
import ProductCard from "../productCard";

interface Props {
  products: Product[];
}

const Products = ({ products }: Props) => {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {products.map((product) => (
        <Link key={product.id} href={`products/${product.id}`} style={{textDecoration: "none"}}>
          <Box sx={{ mr: 5, mb: 3 }}>
            <ProductCard
              title={product.title}
              description={product.description}
              imgUrl={product.imagUrl}
            />
          </Box>
        </Link>
      ))}
    </Box>
  );
};

export default Products;
