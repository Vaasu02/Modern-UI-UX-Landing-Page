import React from "react";
import styles from "./style";
import { Billing, Business, CardDeal, Clients, CTA, Footer, Navbar, Stats, Testimonials, Hero, Charts, CurrencyConverter } from "./components";
import GradientBackground from "./components/GradientBackground";
import ScrollProgress from "./components/ScrollProgress";

const App = () => {
  return (
    <div className="bg-primary w-full overflow-hidden text-lime-100">
      <ScrollProgress />
      <GradientBackground />
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar/>
        </div>
      </div>

      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero/>
        </div>

      </div>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Stats/>
          <Business/>
          <Billing/>
          <CurrencyConverter/>
          <CardDeal/>
          <Charts/>
          <Testimonials/>
          <Clients/>
          <CTA/>
          <Footer/>
        </div>

      </div>


    </div>
  );
};

export default App;
