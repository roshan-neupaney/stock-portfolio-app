import { StockData } from '@/src/services/Stocks/stocks.types';
import Highcharts from 'highcharts';
//@ts-ignore
import HighchartsReact from 'highcharts-react-official';

interface LineChartProps {
  historicalData: StockData[];
  columnType?: 'volume' | 'gainLoss';
  title?: string;
  dataPoints?: {x: number, y: number}[];
  yAxisTitle: string;
}

const LineChart: React.FC<LineChartProps> = ({
  historicalData,
  columnType = 'volume',
  title,
  dataPoints,
  yAxisTitle,
}) => {
  if (!historicalData || historicalData.length === 0) {
    return <div>No data available.</div>;
  }

//   const dataPoints = historicalData.map((data) => ({
//     x: new Date(data.date).getTime(),
//     y: data.close,
//   }));


  const options: Highcharts.Options = {
    chart: { type: 'line' },
    title: { text: title },
    xAxis: { type: 'datetime', title: { text: 'Date' } },
    yAxis: {
      title: {
        text: yAxisTitle,
        // text: chartType === 'line' ? 'Price ($)' : columnType === 'volume' ? 'Volume' : 'Gain/Loss ($)',
      },
    },
    series: [
      {
        type: 'line',
        name: 'Close Price',
        data: dataPoints,
        color: '#4caf50',
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

export default LineChart;