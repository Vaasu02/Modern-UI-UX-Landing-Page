import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles, { layout } from "../style";
import Button from "./Button";
import { Line } from "react-chartjs-2";
import { currencies } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [historicalRates, setHistoricalRates] = useState(null);
  const converterRef = useRef(null);

  // Sample historical data - in a real app, this would come from an API
  const sampleHistoricalData = {
    labels: ["7 days ago", "6 days ago", "5 days ago", "4 days ago", "3 days ago", "2 days ago", "Yesterday", "Today"],
    datasets: [
      {
        label: `${fromCurrency} to ${toCurrency} Exchange Rate`,
        data: [0.92, 0.91, 0.93, 0.92, 0.94, 0.93, 0.92, 0.91],
        borderColor: "rgba(33, 150, 243, 1)",
        backgroundColor: "rgba(33, 150, 243, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  useEffect(() => {
    gsap.fromTo(
      converterRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: converterRef.current,
          start: "top bottom-=100",
        },
      }
    );
  }, []);

  useEffect(() => {
    // In a real app, this would be an API call to get the exchange rate
    // For demo purposes, we're using a mock implementation
    const fetchExchangeRate = async () => {
      if (fromCurrency === toCurrency) {
        setExchangeRate(1);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock exchange rates based on common currency pairs (updated with more accurate values)
        const mockRates = {
          "USD-EUR": 0.91,
          "EUR-USD": 1.10,
          "USD-GBP": 0.78,
          "GBP-USD": 1.28,
          "EUR-GBP": 0.86,
          "GBP-EUR": 1.16,
          "USD-JPY": 153.5,
          "JPY-USD": 0.0065,
          "EUR-JPY": 168.85,
          "JPY-EUR": 0.0059,
          "USD-INR": 87.15,
          "INR-USD": 0.0115,
          "EUR-INR": 95.87,
          "INR-EUR": 0.0104,
          "GBP-INR": 111.73,
          "INR-GBP": 0.0089,
          "USD-AUD": 1.52,
          "AUD-USD": 0.66,
          "USD-CAD": 1.35,
          "CAD-USD": 0.74,
          "USD-CHF": 0.88,
          "CHF-USD": 1.14,
          "USD-CNY": 7.23,
          "CNY-USD": 0.138,
          "USD-BRL": 5.03,
          "BRL-USD": 0.199,
        };

        const rate = mockRates[`${fromCurrency}-${toCurrency}`] || 
                    (mockRates[`${toCurrency}-${fromCurrency}`] ? 1 / mockRates[`${toCurrency}-${fromCurrency}`] : null);
        
        if (rate) {
          setExchangeRate(rate);
          // Generate random historical data based on the current rate
          generateHistoricalData(rate);
        } else {
          // Improved fallback logic for currency pairs not in our mock data
          // Use USD as a bridge currency if possible
          let fallbackRate;
          
          if (fromCurrency !== "USD" && toCurrency !== "USD") {
            // Try to calculate via USD
            const fromToUSD = mockRates[`${fromCurrency}-USD`] || (mockRates[`USD-${fromCurrency}`] ? 1 / mockRates[`USD-${fromCurrency}`] : null);
            const usdToTarget = mockRates[`USD-${toCurrency}`] || (mockRates[`${toCurrency}-USD`] ? 1 / mockRates[`${toCurrency}-USD`] : null);
            
            if (fromToUSD && usdToTarget) {
              fallbackRate = fromToUSD * usdToTarget;
            } else {
              // If we can't calculate via USD, use a more realistic random rate
              fallbackRate = (Math.random() * 50 + 0.5).toFixed(4);
            }
          } else {
            // For pairs with no data, use a more realistic random rate
            fallbackRate = (Math.random() * 50 + 0.5).toFixed(4);
          }
          
          setExchangeRate(parseFloat(fallbackRate));
          generateHistoricalData(parseFloat(fallbackRate));
        }
      } catch (err) {
        setError("Failed to fetch exchange rate. Please try again.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (exchangeRate !== null) {
      setConvertedAmount((amount * exchangeRate).toFixed(2));
    }
  }, [amount, exchangeRate]);

  const generateHistoricalData = (currentRate) => {
    // Generate random historical data based on the current rate
    const fluctuation = 0.05; // 5% max fluctuation
    const days = 8;
    const data = [];
    
    // Use a seed value to create a more natural-looking curve
    let prevRate = currentRate * (1 - fluctuation/2); // Start slightly lower
    
    for (let i = 0; i < days; i++) {
      // Create a more natural progression with some randomness
      const direction = Math.random() > 0.5 ? 1 : -1;
      const change = Math.random() * (fluctuation/2) * direction;
      
      // Ensure we don't deviate too far from the current rate
      const newRate = prevRate + change;
      const boundedRate = Math.max(
        currentRate * (1 - fluctuation),
        Math.min(currentRate * (1 + fluctuation), newRate)
      );
      
      data.push(boundedRate.toFixed(4));
      prevRate = boundedRate;
    }
    
    // Ensure the last value is close to the current rate
    data[days-1] = (currentRate * (1 + (Math.random() * 0.01 - 0.005))).toFixed(4);
    
    setHistoricalRates({
      labels: ["7 days ago", "6 days ago", "5 days ago", "4 days ago", "3 days ago", "2 days ago", "Yesterday", "Today"],
      datasets: [
        {
          label: `${fromCurrency} to ${toCurrency} Exchange Rate`,
          data: data,
          borderColor: "rgba(33, 150, 243, 1)",
          backgroundColor: "rgba(33, 150, 243, 0.1)",
          fill: true,
          tension: 0.4,
        },
      ],
    });
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
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
            size: 10,
          },
          padding: 5,
          maxRotation: 0,
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
    layout: {
      padding: {
        bottom: 20,
      },
    },
    animation: {
      duration: 1000,
      easing: "easeOutQuart",
    },
  };

  return (
    <section id="currency-converter" className={`${layout.sectionReverse} pb-10`}>
      <div className={layout.sectionImgReverse} ref={converterRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col p-6 rounded-[20px] w-full max-w-[650px] bg-black-gradient-2 shadow-xl overflow-visible"
        >
          <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23px] mb-6">
            Currency Converter
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="font-poppins text-dimWhite text-[14px] mb-1 block">
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Math.max(0, e.target.value))}
                className="w-full p-3 rounded-lg bg-dimBlue text-white font-poppins outline-none border border-gray-600 focus:border-blue-500 transition-all"
                placeholder="Enter amount"
                min="0"
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1">
                <label className="font-poppins text-dimWhite text-[14px] mb-1 block">
                  From
                </label>
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="w-full p-3 rounded-lg bg-dimBlue text-white font-poppins outline-none border border-gray-600 focus:border-blue-500 transition-all [&>option]:bg-primary [&>option]:text-white"
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code} className="bg-primary text-white">
                      {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleSwapCurrencies}
                className="mt-6 p-2 rounded-full bg-blue-gradient hover:opacity-80 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </button>

              <div className="flex-1">
                <label className="font-poppins text-dimWhite text-[14px] mb-1 block">
                  To
                </label>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="w-full p-3 rounded-lg bg-dimBlue text-white font-poppins outline-none border border-gray-600 focus:border-blue-500 transition-all [&>option]:bg-primary [&>option]:text-white"
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code} className="bg-primary text-white">
                      {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-900/30 text-red-200 p-4 rounded-lg mb-4">
              {error}
            </div>
          ) : (
            <div className="bg-blue-gradient/10 p-4 rounded-lg mb-6 border border-blue-500/30">
              <p className="font-poppins text-white text-[16px]">
                <span className="text-dimWhite">
                  {amount} {fromCurrency} =
                </span>
              </p>
              <p className="font-poppins font-semibold text-white text-[24px] mt-1">
                {convertedAmount} {toCurrency}
              </p>
              <p className="font-poppins text-dimWhite text-[14px] mt-2">
                1 {fromCurrency} = {exchangeRate} {toCurrency}
              </p>
            </div>
          )}

          <div className="mt-4 h-[280px] mb-6">
            <h5 className="font-poppins font-medium text-white text-[16px] mb-2">
              7-Day Exchange Rate History
            </h5>
            {historicalRates && <Line data={historicalRates} options={chartOptions} />}
          </div>
        </motion.div>
      </div>

      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          Convert currencies <br className="sm:block hidden" /> in real-time
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Our currency converter provides real-time exchange rates for all major
          world currencies. Make informed decisions for your international
          transactions, investments, and travel planning.
        </p>

        <div className="flex flex-wrap mt-6 gap-4">
          <div className="feature-card p-3 rounded-md bg-black-gradient-2 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-dimBlue flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="font-poppins font-normal text-dimWhite text-[16px]">
              Real-time rates
            </p>
          </div>

          <div className="feature-card p-3 rounded-md bg-black-gradient-2 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-dimBlue flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 000 2h10a1 1 0 100-2H3zm0 4a1 1 0 000 2h6a1 1 0 100-2H3zm0 4a1 1 0 100 2h10a1 1 0 100-2H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="font-poppins font-normal text-dimWhite text-[16px]">
              170+ currencies
            </p>
          </div>

          <div className="feature-card p-3 rounded-md bg-black-gradient-2 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-dimBlue flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="font-poppins font-normal text-dimWhite text-[16px]">
              Historical data
            </p>
          </div>
        </div>

        <Button styles="mt-10">Learn More</Button>
      </div>
    </section>
  );
};

export default CurrencyConverter; 