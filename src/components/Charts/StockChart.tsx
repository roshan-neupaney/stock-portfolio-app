import { StockData } from '@/src/services/Stocks/stocks.types';
import Highcharts from 'highcharts';
//@ts-ignore
import HighchartsReact from 'highcharts-react-official';

interface StockChartProps {
  historicalData: StockData[];
  chartType: 'line' | 'column';
  columnType?: 'volume' | 'gainLoss';
  title?: string;
}

const StockChart: React.FC<StockChartProps> = ({
  historicalData,
  chartType,
  columnType = 'volume',
  title,
}) => {
  if (!historicalData || historicalData.length === 0) {
    return <div>No data available.</div>;
  }

  const dataPoints = historicalData.map((data) => ({
    x: new Date(data.date).getTime(),
    y: chartType === 'line' ? data.close : columnType === 'volume' ? data.volume : 0,
  }));

  const gainLossData = historicalData.map((data, index, arr) => {
    if (index === 0) return { x: new Date(data.date).getTime(), y: 0 };
    const prevClose = arr[index - 1].close;
    const currentClose = data.close;
    return { x: new Date(data.date).getTime(), y: currentClose - prevClose };
  });

  const options: Highcharts.Options = {
    chart: { type: chartType },
    title: { text: title || (chartType === 'line' ? 'Stock Price Trend' : columnType === 'volume' ? 'Trading Volume' : 'Daily Gain/Loss') },
    xAxis: { type: 'datetime', title: { text: 'Date' } },
    yAxis: {
      title: {
        text: chartType === 'line' ? 'Price ($)' : columnType === 'volume' ? 'Volume' : 'Gain/Loss ($)',
      },
    },
    series: [
      {
        type: chartType,
        name: chartType === 'line' ? 'Close Price' : columnType === 'volume' ? 'Volume' : 'Gain/Loss',
        data: chartType === 'column' && columnType === 'gainLoss' ? gainLossData : dataPoints,
        color: chartType === 'line' ? '#4caf50' : '#2196f3',
      },
    ],
    tooltip: {
      formatter: function () {
        const date = Highcharts.dateFormat('%Y-%m-%d', this.x);
        return `Date: ${date}<br>${this.series.name}: ${this?.y?.toFixed(2)}${columnType === 'volume' ? '' : '$'}`;
      },
    },
    responsive: { rules: [{ condition: { maxWidth: 500 }, chartOptions: { legend: { enabled: false } } }] },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default StockChart;