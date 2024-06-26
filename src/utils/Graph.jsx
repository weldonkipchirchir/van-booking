import { useState, useEffect } from 'react';
import Chart, {
  ArgumentAxis,
  CommonSeriesSettings,
  Legend,
  Series,
  Tooltip,
  ValueAxis,
  ConstantLine,
  Label,
} from 'devextreme-react/chart';
import { averageIncome } from './api';
import './style.css';

function Graph() {
  const [incomeData, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await averageIncome();
        setData(apiData);
      } catch (error) {
        console.error('Error fetching income data:', error);
      }
    };

    fetchData();
  }, []);

  const data = incomeData.sort((a, b) => b.Month - a.count);
  const totalCount = data.reduce((prevValue, item) => prevValue + item.count, 0);
  let cumulativeCount = 0;
  const dataArray = data.map((item) => {
    cumulativeCount += item.count;
    return {
      complaint: item.complaint,
      count: item.count,
      cumulativePercentage: Math.round((cumulativeCount * 100) / totalCount),
    };
  });
  const customizeTooltip = (pointInfo) => ({
    html: `<div><div class="tooltip-header">${pointInfo.argumentText}</div><div class="tooltip-body"><div class="series-name"><span class='top-series-name'>${pointInfo.points[0].seriesName}</span>: </div><div class="value-text"><span class='top-series-value'>${pointInfo.points[0].valueText}</span></div><div class="series-name"><span class='bottom-series-name'>${pointInfo.points[1].seriesName}</span>: </div><div class="value-text"><span class='bottom-series-value'>${pointInfo.points[1].valueText}</span>% </div></div></div>`,
  });
  function customizePercentageText({ valueText }) {
    return `${valueText}%`;
  }
  return (
    <Chart
      title="Income"
      dataSource={dataArray}
      palette="Harmony Light"
      id="chart"
      className="chart-income"
    >
      <CommonSeriesSettings argumentField="complaint" />
      <Series
        name="Income frequency"
        valueField="count"
        axis="frequency"
        type="bar"
        color="#fac29a"
      />
      <Series
        name="Cumulative percentage"
        valueField="cumulativePercentage"
        axis="percentage"
        type="spline"
        color="#6b71c3"
      />

      <ArgumentAxis>
        <Label overlappingBehavior="stagger" />
      </ArgumentAxis>

      <ValueAxis name="frequency" position="left" tickInterval={300} />
      <ValueAxis
        name="percentage"
        position="right"
        tickInterval={20}
        showZero={true}
        valueMarginsEnabled={false}
      >
        <Label customizeText={customizePercentageText} />
        <ConstantLine value={80} width={2} color="#fc3535" dashStyle="dash">
          <Label visible={false} />
        </ConstantLine>
      </ValueAxis>

      <Tooltip enabled={true} shared={true} customizeTooltip={customizeTooltip} />

      <Legend verticalAlignment="top" horizontalAlignment="center" />
    </Chart>
  );
}

export default Graph;
