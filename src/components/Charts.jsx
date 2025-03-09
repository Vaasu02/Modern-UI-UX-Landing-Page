import React, { useState, useEffect, useRef } from "react";
import { Line, Bar, Pie, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles, { layout } from "../style";
import { chartData } from "../constants";
import Button from "./Button";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ChartCard = ({ title, children, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`flex flex-col p-6 rounded-[20px] ${className} bg-black-gradient-2 shadow-xl`}
  >
    <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23px] mb-4">
      {title}
    </h4>
    <div className="w-full h-[300px] flex items-center justify-center">
      {children}
    </div>
  </motion.div>
);

const TimeSelector = ({ periods, activePeriod, onChange }) => (
  <div className="flex flex-wrap gap-2 mb-4">
    {periods.map((period) => (
      <button
        key={period.value}
        onClick={() => onChange(period.value)}
        className={`py-1 px-3 rounded-full text-sm font-poppins transition-all ${
          activePeriod === period.value
            ? "bg-blue-gradient text-primary font-medium"
            : "bg-dimBlue text-white"
        }`}
      >
        {period.label}
      </button>
    ))}
  </div>
);

const Charts = () => {
  const [activeChart, setActiveChart] = useState("line");
  const [activePeriod, setActivePeriod] = useState("monthly");
  const chartRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      chartRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: chartRef.current,
          start: "top bottom-=100",
        },
      }
    );
  }, []);

  const periods = [
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Yearly", value: "yearly" },
  ];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white",
          font: {
            family: "Poppins",
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleFont: {
          family: "Poppins",
          size: 14,
        },
        bodyFont: {
          family: "Poppins",
          size: 13,
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
          font: {
            family: "Poppins",
          },
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
          font: {
            family: "Poppins",
          },
        },
      },
    },
    animation: {
      duration: 2000,
      easing: "easeOutQuart",
    },
  };

  const renderChart = () => {
    const data = chartData[activePeriod];

    switch (activeChart) {
      case "line":
        return <Line data={data.line} options={chartOptions} />;
      case "bar":
        return <Bar data={data.bar} options={chartOptions} />;
      case "pie":
        return (
          <Pie
            data={data.pie}
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                legend: {
                  ...chartOptions.plugins.legend,
                  position: "right",
                },
              },
            }}
          />
        );
      case "radar":
        return <Radar data={data.radar} options={chartOptions} />;
      default:
        return <Line data={data.line} options={chartOptions} />;
    }
  };

  return (
    <section id="charts" className={layout.section}>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          Visualize your data <br className="sm:block hidden" /> with interactive
          charts
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Explore financial trends, analyze market performance, and make
          data-driven decisions with our powerful interactive charts. Customize
          views and timeframes to gain valuable insights.
        </p>

        <Button styles="mt-10">Get Started</Button>
      </div>

      <div
        ref={chartRef}
        className={`${layout.sectionImg} flex-col gap-6 max-w-[650px]`}
      >
        <TimeSelector
          periods={periods}
          activePeriod={activePeriod}
          onChange={setActivePeriod}
        />

        <div className="flex flex-wrap gap-4 mb-6">
          {["line", "bar", "pie", "radar"].map((chart) => (
            <button
              key={chart}
              onClick={() => setActiveChart(chart)}
              className={`py-2 px-4 rounded-lg text-sm font-poppins capitalize transition-all ${
                activeChart === chart
                  ? "bg-blue-gradient text-primary font-medium"
                  : "bg-dimBlue text-white"
              }`}
            >
              {chart} Chart
            </button>
          ))}
        </div>

        <ChartCard title="Financial Performance" className="w-full">
          {renderChart()}
        </ChartCard>
      </div>
    </section>
  );
};

export default Charts; 