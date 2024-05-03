import React from "react";
import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";
import logoImage from '../LogoImage/logo.png'; // Import your logo image

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
  },
  subheading: {
    fontSize: 14,
    marginBottom: 5,
  },
  infoContainer: {
    marginBottom: 10,
  },
  infoText: {
    fontSize: 12,
    marginBottom: 2,
  },
  itemContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: 5,
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  itemName: {
    fontSize: 12,
    marginRight: 10,
  },
  logoImage: {
    width: 100, // Adjust the width of the logo as needed
    height: 100, // Adjust the height of the logo as needed
    marginBottom: 10, // Adjust the margin as needed
  },
});

// Create Document Component
const OrderPDFDocument = ({ order }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Image src={logoImage} style={styles.logoImage} /> {/* Include the logo */}
        <Text style={styles.heading}>Order #{order?._id}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.subheading}>Shipping Info:</Text>
          <Text style={styles.infoText}>Name: {order?.user?.name}</Text>
          <Text style={styles.infoText}>Phone: {order?.shippingInfo?.contact}</Text>
          <Text style={styles.infoText}>Address: {order?.shippingInfo?.address}, {order?.shippingInfo?.city}, {order?.shippingInfo?.province}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.subheading}>Payment Info:</Text>
          <Text style={styles.infoText}>
            Status: {order?.paymentInfo?.status === "succeeded" ? "PAID" : "NOT PAID"}
          </Text>
          <Text style={styles.infoText}>Amount: ₹{order?.totalPrice}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.subheading}>Order Status:</Text>
          <Text style={{ ...styles.infoText, color: order?.orderStatus === "Delivered" ? "green" : "red" }}>
            {order?.orderStatus}
          </Text>
        </View>
        <Text style={styles.subheading}>Order Items:</Text>
        {order?.orderItems?.map((item) => (
          <View key={item.product} style={styles.itemContainer}>
            <Image src={item.image} style={styles.itemImage} />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.infoText}>
              {item.quantity} X ₹{item.price} = ₹{item.quantity * item.price}
            </Text>
          </View>
        ))}
        {order?.orderItems?.length === 0 && (
          <Text style={styles.infoText}>No items in this order.</Text>
        )}
      </View>
    </Page>
  </Document>
);

export default OrderPDFDocument;
