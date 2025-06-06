import { StockData } from '@/src/services/Stocks/stocks.types';
import Highcharts from 'highcharts';
//@ts-ignore
import HighchartsReact from 'highcharts-react-official';

interface BarChartProps {
  historicalData: StockData[];
  columnType?: 'volume' | 'gainLoss';
  title?: string;
  dataPoints?: {x: number, y: number}[];
  yAxisTitle: string;
}

const BarChart: React.FC<BarChartProps> = ({
  historicalData,
  columnType = 'volume',
  title,
  dataPoints,
  yAxisTitle
}) => {
  if (!historicalData || historicalData.length === 0) {
    return <div>No data available.</div>;
  }

//   const dataPoints = historicalData.map((data) => ({
//     x: new Date(data.date).getTime(),
//     y: data.close,
//   }));

  const options: Highcharts.Options = {
    chart: { type: 'column' },
    title: { text: title },
    xAxis: { type: 'datetime', title: { text: 'Date' } },
    yAxis: {
      title: {
        text: yAxisTitle,
      },
    },
    series: [
      {
        type: 'column',
        name: columnType === 'volume' ? 'Volume' : 'Gain/Loss',
        data: dataPoints,
        color: '#2196f3',
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

export default BarChart;