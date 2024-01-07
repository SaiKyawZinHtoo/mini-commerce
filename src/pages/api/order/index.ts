// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { CardItem } from "@/types/card";
import { prisma } from "@/utils/db";
import { OrderStatus, Product } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const cardItems = req.body as CardItem[];
    const cardItemIds = cardItems.map((item) => item.id);
    const products = await prisma.product.findMany({
      where: { id: { in: cardItemIds } },
    });

    const getProductPriceWithQuantity = (item: CardItem) => {
      const product = products.find(
        (product) => product.id === item.id
      ) as Product;
      return product.price * item.quantity;
    };

    let totalPrice = 0;
    cardItems.forEach((item) => {
      const price = getProductPriceWithQuantity(item);
      totalPrice += price;
    });

    const createOrder = await prisma.order.create({
      data: { status: OrderStatus.ORDERED, totalPrice },
    });
    const orderId = createOrder.id;
    cardItems.forEach(async (item) => {
      const data = { orderId, productId: item.id, quantity: item.quantity };
      await prisma.orderLine.create({ data });
    });

    return res.status(200).json({ orderId, status: OrderStatus.ORDERED });
  }
  res.status(405).send("Method Not Allowed. ");
}
