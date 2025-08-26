import React, { useEffect, useRef, useState } from "react";
import { CChartLine } from "@coreui/react-chartjs";
import { getStyle } from "@coreui/utils";
import { Chart } from "chart.js";

const MainChart: React.FC = () => {
  // Khai báo ref type Chart<'line'>
  const chartRef = useRef<Chart<"line"> | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (chartRef.current) {
        setTimeout(() => {
          const chart = chartRef.current;
          if (chart?.options?.scales) {
            const x = chart.options.scales.x;
            const y = chart.options.scales.y;
            if (x && x.grid && x.ticks) {
              x.grid.color = getStyle("--cui-border-color-translucent");
              x.ticks.color = getStyle("--cui-body-color");
            }
            if (y && y.grid && y.ticks) {
              y.grid.color = getStyle("--cui-border-color-translucent");
              y.ticks.color = getStyle("--cui-body-color");
            }
            chart.update();
          }
        });
      }
    };

    document.documentElement.addEventListener("ColorSchemeChange", handler);
    return () =>
      document.documentElement.removeEventListener(
        "ColorSchemeChange",
        handler
      );
  }, []);

  const random = () => Math.round(Math.random() * 200);

  // const fetchData = async (): Promise<number[]> => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch("https://fakestoreapi.com/products");
  //     const data: any[] = await response.json();
  //     return data.map(() => random());
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     return [];
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const changeDataset = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch("https://fakestoreapi.com/products");
  //     const data: any[] = await response.json();

  //     if (data.length > 0 && chartRef.current) {
  //       const datasets = chartRef.current.data.datasets;
  //       datasets.forEach((dataset) => {
  //         dataset.data = dataset.data.map(() => random());
  //       });
  //       chartRef.current.update();
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      {/* <button
        onClick={changeDataset}
        style={{ marginBottom: "16px" }}
        disabled={loading}
      >
        {loading ? "Loading..." : "Change Dataset"}
      </button> */}
      {loading && <div>Loading data, please wait...</div>}
      <CChartLine
        ref={chartRef}
        style={{ height: "300px", marginTop: "40px" }}
        data={{
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
          ],
          datasets: [
            {
              label: "My First dataset",
              backgroundColor: `rgba(${getStyle("--cui-info-rgb")}, .1)`,
              borderColor: getStyle("--cui-info"),
              pointHoverBackgroundColor: getStyle("--cui-info"),
              borderWidth: 2,
              data: Array.from({ length: 7 }, () => random()),
              fill: true,
            },
            {
              label: "My Second dataset",
              backgroundColor: "transparent",
              borderColor: getStyle("--cui-success"),
              pointHoverBackgroundColor: getStyle("--cui-success"),
              borderWidth: 2,
              data: Array.from({ length: 7 }, () => random()),
            },
            {
              label: "My Third dataset",
              backgroundColor: "transparent",
              borderColor: getStyle("--cui-danger"),
              pointHoverBackgroundColor: getStyle("--cui-danger"),
              borderWidth: 1,
              borderDash: [8, 5],
              data: [65, 65, 65, 65, 65, 65, 65],
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: {
                color: getStyle("--cui-border-color-translucent"),
                drawOnChartArea: false,
              },
              ticks: {
                color: getStyle("--cui-body-color"),
              },
            },
            y: {
              beginAtZero: true,
              border: {
                color: getStyle("--cui-border-color-translucent"),
              },
              grid: {
                color: getStyle("--cui-border-color-translucent"),
              },
              max: 250,
              ticks: {
                color: getStyle("--cui-body-color"),
                maxTicksLimit: 5,
                stepSize: Math.ceil(250 / 5),
              },
            },
          },
          elements: {
            line: {
              tension: 0.4,
            },
            point: {
              radius: 0,
              hitRadius: 10,
              hoverRadius: 4,
              hoverBorderWidth: 3,
            },
          },
        }}
      />
    </>
  );
};

export default MainChart;
