import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCard } from "@/store/slices/cardSlice";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

const ProductDetailPage = () => {
  const router = useRouter();
  const productId = Number(router.query.id);
  const products = useAppSelector((state) => state.products.items);
  const product = products.find((product) => product.id === productId);
  const dispatch = useAppDispatch();
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ maxWidth: 900 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              maxWidth: 900,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box>
              <img src={product?.imagUrl || ""} width={500} />
            </Box>
            <Box sx={{ ml: 3 }}>
              <Typography variant="h4">{product?.title}</Typography>
              <Typography sx={{ my: 2 }}>{product?.description}</Typography>
              <Typography variant="h5"> $ {product?.price}</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            variant="contained"
            onClick={() => {
              dispatch(addToCard({...product,quantity: 1}))
              router.push("/")
            }}
          >
            Add to Card
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetailPage;
