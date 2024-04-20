import KhaltiCheckout from "khalti-checkout-web";
import axios from "axios";
import { useSelector } from "react-redux";
export const PayButton = ({ order, cartItems, totalPrice, user }) => {
  const { shippingInfo } = useSelector((state) => state.cart);
  let config = {
    // replace this key with yours
    publicKey: "test_public_key_79437ac97c2d4d03a4715a76f10c4948",
    productIdentity: "1234",
    productName: "Drogon",
    productUrl: "http://gameofthrones.com/buy/Dragons",
    eventHandler: {
      async onSuccess(payload) {
        // hit merchant api for initiating verfication

        order.orderItems = cartItems;
        console.log(order.orderItems);
        console.log(cartItems);
        const ord = {
          ...order,
          shippingInfo: shippingInfo,

          paymentInfo: { id: payload.idx, status: "succeeded" },
          type: "multipart/form-data",
        };
        console.log(ord);
        try {
          const config = { headers: { "Content-Type": "application/json" } };

          const { data } = await axios.post(`/api/v1/order/new`, ord, config);
          console.log(data);

          // cartItems.forEach((item, index) => {
          //   if (item.productId === ord.orderItems[0].productId) {
          //     item.stock -= order.orderItems[0].quantity;

          //     cartItems.splice(index, 1);
          //   }
          // });

          // localStorage.setItem("cartItems", JSON.stringify(cartItems));

          // Get the productId of the ordered item
          const orderedProductId = ord.orderItems[0].productId;

          // Filter out the cart items that match the ordered productId
          const updatedCartItems = cartItems.filter(
            (item) => item.productId !== orderedProductId
          );

          // Update the cart items in local storage
          localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

          // redirect to success page

          window.location.href = "/order/success";
        } catch (error) {
          console.log(error);
        }
      },
      // onError handler is optional
      onError(error) {
        // handle errors
        console.log(error);
      },
      onClose() {
        console.log("widget is closing");
      },
    },
    paymentPreference: ["KHALTI", "EBANKING", "MOBILE_BANKING"],
  };

  // const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

  let checkout = new KhaltiCheckout(config);
  // let btn = document.getElementById('payment-button');

  const wholeTotal = totalPrice;
  //khalti ley demo account ma 200 rupey vanda mathi ko transaction garna didaina so ailey paisa ma rakheko xam rupees ma haina

  const handleCheckout = () => {
    if (user.role === "admin") {
      // alert.error('You are not authorized to order items.');
      return;
    }
    checkout.show({ amount: wholeTotal });
  };

  return (
    <button id="payment-button" onClick={handleCheckout}>
      Pay
    </button>
  );
};
