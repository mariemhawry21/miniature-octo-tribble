import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function BasicPie() {
  return (
    <PieChart
      colors={["#FFD1DC", "#FFDEAD", "#E0BBE4", "#C6E2FF"]}
      series={[
        {
          data: [
            { id: 0, value: 10, label: "عائليه" },
            { id: 1, value: 15, label: "ضيافه" },
            { id: 2, value: 20, label: "تذكره الجمعه " },
            { id: 3, value: 20, label: "كبير" },
          ],
        },
      ]}
      height={240}
    />
  );
}
