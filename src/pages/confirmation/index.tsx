import { useAppDispatch } from "@/store/hooks";
import { cancelOrder } from "@/store/slices/cardSlice";
import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

const OrderConfirmation = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const orderId = router.query.orderId as string;
  const status = router.query.status as string;
  const dispatch = useAppDispatch();

  const handleCancelOrder = () => {
    dispatch(cancelOrder({ orderId, onSuccess }));
  };

  const onSuccess = () => {
    setOpen(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <Typography variant="h4">Order: {orderId}</Typography>
      <Typography variant="h6">Status: {status}</Typography>
      <Box sx={{ mt: 3 }}>
        <Button variant="contained" onClick={handleCancelOrder}>
          Cancel Order
        </Button>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Order has been Cancelled !
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OrderConfirmation;
