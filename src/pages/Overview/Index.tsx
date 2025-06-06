import dummyStockData from "../../../src/data";
import { FormControl, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import CustomSelect from "../../../src/components/Forms/select";
import LineChart from "../../../src/components/Charts/LineChart";
import BarChart from "../../../src/components/Charts/BarChart";
import PageHeader from "../../..//src/components/PageHeader";

const Index = () => {
  const [selectedSymbol, setSelectedSymbol] = useState<string>("NMB");
  const [columnType, setColumnType] = useState<"volume" | "gainLoss">("volume");
  const symbolList = Object.keys(dummyStockData).map((items) => {
    return { id: items, label: items };
  });

  const currentData = dummyStockData
    ? dummyStockData[selectedSymbol] || []
    : [];

  const stockPriceData = currentData.map((data) => ({
    x: new Date(data.date).getTime(),
    y: data.close,
  }));

  const stockVolumeData = currentData.map((data) => ({
    x: new Date(data.date).getTime(),
    y: data.volume,
  }));

  const stockGainLossData = currentData.map((data, index, arr) => {
    if (index === 0) return { x: new Date(data.date).getTime(), y: 0 };
    const prevClose = arr[index - 1].close;
    const currentClose = data.close;
    return { x: new Date(data.date).getTime(), y: currentClose - prevClose };
  });

  return (
    <div>
      <PageHeader title={"Stock Performance"} hideAdd />
      <FormControl style={{ marginBottom: "16px", minWidth: 120 }}>
        <CustomSelect
          value={selectedSymbol}
          title="Stock"
          data={symbolList}
          placeholder="Select Stock"
          onChange={(val: string) => setSelectedSymbol(val)}
        />
      </FormControl>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <LineChart
          historicalData={currentData}
          title={`Price Trend (${selectedSymbol})`}
          dataPoints={stockPriceData}
          yAxisTitle={"Price ($)"}
        />
        <div>
          <ToggleButtonGroup
            value={columnType}
            exclusive
            onChange={(_, newType) => setColumnType(newType || "volume")}
            style={{ margin: "16px 0" }}
          >
            <ToggleButton value="volume">Volume</ToggleButton>
            <ToggleButton value="gainLoss">Gain/Loss</ToggleButton>
          </ToggleButtonGroup>
          <BarChart
            historicalData={currentData}
            yAxisTitle={columnType === "volume" ? 'Volume' : 'Gain/Loss ($)'}
            columnType={columnType}
            dataPoints={columnType === 'volume' ? stockVolumeData : stockGainLossData}
            title={
              columnType === "volume"
                ? `Trading Volume (${selectedSymbol})`
                : `Daily Gain/Loss (${selectedSymbol})`
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
