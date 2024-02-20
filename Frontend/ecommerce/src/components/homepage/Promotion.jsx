import { Box, styled, Slide } from "@mui/material";
import { useState, useEffect } from "react";

const Promotion = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    padding: "15px 0px 15px 0px",
  },
  display: "flex",
  justifyContent: "center",
  alignitems: "center",
  padding: "8px 0px 8px 0px",
  overflow: "hidden",
  backgroundColor: "lightblue",
}));

const MessagePromo = styled("div")(({ theme }) => ({
  fontSize: "16px",
  fontWeight: 400,
  color: "#000",
  fontFamily: "Verdana",
  [theme.breakpoints.up("md")]: {
    fontSize: "1.5rem",
  },
}));

const messages = [
  "Elevate your rig with top-tier components.",
  "Power up your performance today!",
  "Inside Valley Only!!",
];

const Promotions = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 4000);

    const intervalId = setInterval(() => {
      setMessageIndex((i) => (i + 1) % messages.length);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }, 4000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Promotion>
      <Slide direction={show ? "left" : "right"} in={show}>
        <Box display={"flex"} justifyContent="center" alightitems={"center"}>
          <MessagePromo>{messages[messageIndex]}</MessagePromo>
        </Box>
      </Slide>
    </Promotion>
  );
};
export default Promotions;
