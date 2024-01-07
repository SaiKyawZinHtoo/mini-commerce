import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createOrder, updateQuantity } from "@/store/slices/cardSlice";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

const Card = () => {
  const cardItems = useAppSelector((state) => state.card.items);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const getCardTotalPrice = () => {
    let totalPrice = 0;
    cardItems.forEach((item) => (totalPrice += item.price * item.quantity));
    return totalPrice;
  };

  const increaseQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };
  const decreaseQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const onSuccess = (data: any) => {
    console.log("data from server: ", data);
    router.push(`/confirmation?orderId=${data.orderId}&status=${data.status}`)
  }

  const onError = (data: any) => {}

  const handleCreateOrder = async () => {
    dispatch(createOrder({payload: cardItems, onSuccess, onError}));
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {cardItems.length ? (
          <Box>
            {cardItems.map((item) => (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  key={item.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mt: 5,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img src={item.imagUrl || ""} width={150} height={150} />
                    <Box sx={{ ml: 3 }}>
                      <Typography variant="h5">{item.title}</Typography>
                      <Typography variant="h6">{item.price}</Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ ml: 5 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <RemoveCircleOutlineIcon
                      sx={{ fontSize: 50, cursor: "pointer" }}
                      onClick={() =>
                        decreaseQuantity(item.id, item.quantity - 1)
                      }
                    />
                    <Typography sx={{ mx: 2 }} variant="h4">
                      {item.quantity}
                    </Typography>
                    <AddCircleOutlineIcon
                      sx={{ fontSize: 50, cursor: "pointer" }}
                      onClick={() =>
                        increaseQuantity(item.id, item.quantity + 1)
                      }
                    />
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          <Typography variant="h1">Empty Card</Typography>
        )}
      </Box>
      {cardItems.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              mt: 4,
            }}
          >
            <Typography variant="h4">
              Total Price: {getCardTotalPrice()}
            </Typography>
            <Button
              variant="contained"
              sx={{ width: "fit-content", my: 4 }}
              onClick={handleCreateOrder}
            >
              Comfrimed Order
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Card;
