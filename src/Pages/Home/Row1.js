import { Stack, useTheme } from "@mui/material";
import React from "react";

import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { data1, data2, data3 } from "./data";
import Card from "./Card";

const Row1 = () => {
  const theme = useTheme();
  return (
    <Stack
      direction={"row"}
      flexWrap={"wrap"}
      gap={1}
      justifyContent={{ xs: "center", sm: "space-between", margin: "0 -8px" }}
    >
      <Card
        icon={<EmailIcon
          sx={{ fontSize: "23px", color: theme.palette.secondary.main }} />}
        title={"12,361"}
        subTitle={"Visitors"}
        increase={"+14%"}
        data={data1} scheme={"nivo"}
      />

      <Card
        icon={
          <PointOfSaleIcon
            sx={{ fontSize: "23px", color: theme.palette.secondary.main }}
          />
        }
        title={"431,225"}
        subTitle={"Reservation"}
        increase={"+21%"}
        data={data2}
        scheme={"category10"}
      />

      <Card
        icon={
          <PersonAddIcon
            sx={{ fontSize: "23px", color: theme.palette.secondary.main }}
          />
        }
        title={"32,441"}
        subTitle={"TourGides"}
        increase={"+5%"}
        data={data3}
        scheme={"accent"}
      />

    </Stack>
  );
};

export default Row1;
