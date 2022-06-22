import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import styles from "./index.module.scss";

const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Recovery",
      align: "start",
      color: "#171717",
      font: { size: 12 },
    },
    legend: {
      align: "end",
      labels: {
        boxWidth: 8,
        boxHeight: 8,
        usePointStyle: true,
      },
    },
  },
};

const RecoveryStatusChart = ({ chartData }) => {
  const data = useMemo(() => {
    const [months, values, secondaryValues] = [[], [], []];

    for (const data in chartData) {
      const month = `${data.charAt(0).toUpperCase()}${data.slice(1)}`;
      const value = chartData[data] || 0;
      const secondaryValue = chartData[data];

      months.push(month);
      values.push(value);
      secondaryValues.push(secondaryValue);
    }

    const isAllNull = secondaryValues.every(value => value === null);

    return {
      labels: months,
      datasets: [
        {
          label: "LAST 12 MONTHS",
          data: isAllNull ? secondaryValues : values,
          fill: false,
          backgroundColor: "#0072EF",
          borderColor: "#0072EF",
        },
      ],
    };
  }, [chartData]);

  return (
    <div className={styles.chart}>
      <Line data={data} options={options} />
    </div>
  );
};

export default RecoveryStatusChart;
