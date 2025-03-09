import { people01, people02, people03, facebook, instagram, linkedin, twitter, airbnb, binance, coinbase, dropbox, send, shield, star  } from "../assets";

export const navLinks = [
  {
    id: "home",
    title: "Home",
  },
  {
    id: "features",
    title: "Features",
  },
  {
    id: "product",
    title: "Product",
  },
  {
    id: "charts",
    title: "Charts",
  },
  {
    id: "currency-converter",
    title: "Currency",
  },
  {
    id: "clients",
    title: "Clients",
  },
];

export const features = [
  {
    id: "feature-1",
    icon: star,
    title: "Rewards",
    content:
      "The best credit cards offer some tantalizing combinations of promotions and prizes",
  },
  {
    id: "feature-2",
    icon: shield,
    title: "100% Secured",
    content:
      "We take proactive steps make sure your information and transactions are secure.",
  },
  {
    id: "feature-3",
    icon: send,
    title: "Balance Transfer",
    content:
      "A balance transfer credit card can save you a lot of money in interest charges.",
  },
];

export const feedback = [
  {
    id: "feedback-1",
    content:
      "Money is only a tool. It will take you wherever you wish, but it will not replace you as the driver.",
    name: "Herman Jensen",
    title: "Founder & Leader",
    img: people01,
  },
  {
    id: "feedback-2",
    content:
      "Money makes your life easier. If you're lucky to have it, you're lucky.",
    name: "Steve Mark",
    title: "Founder & Leader",
    img: people02,
  },
  {
    id: "feedback-3",
    content:
      "It is usually people in the money business, finance, and international trade that are really rich.",
    name: "Kenn Gallagher",
    title: "Founder & Leader",
    img: people03,
  },
];

export const stats = [
  {
    id: "stats-1",
    title: "User Active",
    value: "3800+"
    
  },
  {
    id: "stats-2",
    title: "Trusted by Company",
    value: "230+"
  },
  {
    id: "stats-3",
    title: "Transaction",
    value: "$230M+"
  }
];

export const footerLinks = [
  {
    title: "Useful Links",
    links: [
      {
        name: "Content",
        link: "https://www.hoobank.com/content/",
      },
      {
        name: "How it Works",
        link: "https://www.hoobank.com/how-it-works/",
      },
      {
        name: "Create",
        link: "https://www.hoobank.com/create/",
      },
      {
        name: "Explore",
        link: "https://www.hoobank.com/explore/",
      },
      {
        name: "Terms & Services",
        link: "https://www.hoobank.com/terms-and-services/",
      },
    ],
  },
  {
    title: "Community",
    links: [
      {
        name: "Help Center",
        link: "https://www.hoobank.com/help-center/",
      },
      {
        name: "Partners",
        link: "https://www.hoobank.com/partners/",
      },
      {
        name: "Suggestions",
        link: "https://www.hoobank.com/suggestions/",
      },
      {
        name: "Blog",
        link: "https://www.hoobank.com/blog/",
      },
      {
        name: "Newsletters",
        link: "https://www.hoobank.com/newsletters/",
      },
    ],
  },
  {
    title: "Partner",
    links: [
      {
        name: "Our Partner",
        link: "https://www.hoobank.com/our-partner/",
      },
      {
        name: "Become a Partner",
        link: "https://www.hoobank.com/become-a-partner/",
      },
    ],
  },
];

export const socialMedia = [
  {
    id: "social-media-1",
    icon: instagram,
    link: "https://www.instagram.com/",
  },
  {
    id: "social-media-2",
    icon: facebook,
    link: "https://www.facebook.com/",
  },
  {
    id: "social-media-3",
    icon: twitter,
    link: "https://www.twitter.com/",
  },
  {
    id: "social-media-4",
    icon: linkedin,
    link: "https://www.linkedin.com/",
  },
];

export const clients = [
  {
    id: "client-1",
    logo: airbnb,
    link: "https://www.airbnb.com"
  },
  {
    id: "client-2",
    logo: binance,
    link: "https://www.binance.com"
  },
  {
    id: "client-3",
    logo: coinbase,
    link: "https://www.coinbase.com"
  },
  {
    id: "client-4",
    logo: dropbox,
    link: "https://www.dropbox.com"
  },
];

export const currencies = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "INR", name: "Indian Rupee" },
  { code: "BRL", name: "Brazilian Real" },
];

export const chartData = {
  daily: {
    line: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "This Week",
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: "rgba(33, 150, 243, 1)",
          backgroundColor: "rgba(33, 150, 243, 0.1)",
          fill: true,
          tension: 0.4,
        },
        {
          label: "Last Week",
          data: [28, 48, 40, 19, 86, 27, 90],
          borderColor: "rgba(156, 39, 176, 1)",
          backgroundColor: "rgba(156, 39, 176, 0.1)",
          fill: true,
          tension: 0.4,
        },
      ],
    },
    bar: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Revenue",
          data: [12, 19, 3, 5, 2, 3, 9],
          backgroundColor: "rgba(33, 150, 243, 0.8)",
        },
        {
          label: "Expenses",
          data: [8, 12, 6, 7, 4, 2, 5],
          backgroundColor: "rgba(156, 39, 176, 0.8)",
        },
      ],
    },
    pie: {
      labels: ["Stocks", "Bonds", "Cash", "Real Estate", "Commodities"],
      datasets: [
        {
          data: [35, 25, 15, 15, 10],
          backgroundColor: [
            "rgba(33, 150, 243, 0.8)",
            "rgba(156, 39, 176, 0.8)",
            "rgba(76, 175, 80, 0.8)",
            "rgba(255, 152, 0, 0.8)",
            "rgba(244, 67, 54, 0.8)",
          ],
          borderColor: "rgba(255, 255, 255, 0.5)",
          borderWidth: 1,
        },
      ],
    },
    radar: {
      labels: ["Speed", "Reliability", "Comfort", "Safety", "Efficiency", "Cost"],
      datasets: [
        {
          label: "Product A",
          data: [65, 59, 90, 81, 56, 55],
          backgroundColor: "rgba(33, 150, 243, 0.2)",
          borderColor: "rgba(33, 150, 243, 1)",
          pointBackgroundColor: "rgba(33, 150, 243, 1)",
        },
        {
          label: "Product B",
          data: [28, 48, 40, 19, 96, 27],
          backgroundColor: "rgba(156, 39, 176, 0.2)",
          borderColor: "rgba(156, 39, 176, 1)",
          pointBackgroundColor: "rgba(156, 39, 176, 1)",
        },
      ],
    },
  },
  weekly: {
    line: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        {
          label: "This Month",
          data: [250, 320, 280, 360],
          borderColor: "rgba(33, 150, 243, 1)",
          backgroundColor: "rgba(33, 150, 243, 0.1)",
          fill: true,
          tension: 0.4,
        },
        {
          label: "Last Month",
          data: [200, 290, 220, 310],
          borderColor: "rgba(156, 39, 176, 1)",
          backgroundColor: "rgba(156, 39, 176, 0.1)",
          fill: true,
          tension: 0.4,
        },
      ],
    },
    bar: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        {
          label: "Revenue",
          data: [42, 58, 37, 65],
          backgroundColor: "rgba(33, 150, 243, 0.8)",
        },
        {
          label: "Expenses",
          data: [30, 42, 25, 40],
          backgroundColor: "rgba(156, 39, 176, 0.8)",
        },
      ],
    },
    pie: {
      labels: ["Stocks", "Bonds", "Cash", "Real Estate", "Commodities"],
      datasets: [
        {
          data: [40, 20, 15, 15, 10],
          backgroundColor: [
            "rgba(33, 150, 243, 0.8)",
            "rgba(156, 39, 176, 0.8)",
            "rgba(76, 175, 80, 0.8)",
            "rgba(255, 152, 0, 0.8)",
            "rgba(244, 67, 54, 0.8)",
          ],
          borderColor: "rgba(255, 255, 255, 0.5)",
          borderWidth: 1,
        },
      ],
    },
    radar: {
      labels: ["Speed", "Reliability", "Comfort", "Safety", "Efficiency", "Cost"],
      datasets: [
        {
          label: "Product A",
          data: [70, 65, 85, 75, 60, 50],
          backgroundColor: "rgba(33, 150, 243, 0.2)",
          borderColor: "rgba(33, 150, 243, 1)",
          pointBackgroundColor: "rgba(33, 150, 243, 1)",
        },
        {
          label: "Product B",
          data: [35, 55, 45, 25, 90, 30],
          backgroundColor: "rgba(156, 39, 176, 0.2)",
          borderColor: "rgba(156, 39, 176, 1)",
          pointBackgroundColor: "rgba(156, 39, 176, 1)",
        },
      ],
    },
  },
  monthly: {
    line: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "This Year",
          data: [1200, 1300, 1400, 1350, 1500, 1700, 1600, 1800, 1750, 1900, 2000, 2100],
          borderColor: "rgba(33, 150, 243, 1)",
          backgroundColor: "rgba(33, 150, 243, 0.1)",
          fill: true,
          tension: 0.4,
        },
        {
          label: "Last Year",
          data: [1000, 1100, 1200, 1150, 1300, 1500, 1400, 1600, 1550, 1700, 1800, 1900],
          borderColor: "rgba(156, 39, 176, 1)",
          backgroundColor: "rgba(156, 39, 176, 0.1)",
          fill: true,
          tension: 0.4,
        },
      ],
    },
    bar: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Revenue",
          data: [150, 170, 180, 160, 200, 220, 210, 230, 240, 250, 260, 280],
          backgroundColor: "rgba(33, 150, 243, 0.8)",
        },
        {
          label: "Expenses",
          data: [100, 120, 130, 110, 140, 150, 140, 160, 170, 180, 190, 200],
          backgroundColor: "rgba(156, 39, 176, 0.8)",
        },
      ],
    },
    pie: {
      labels: ["Stocks", "Bonds", "Cash", "Real Estate", "Commodities"],
      datasets: [
        {
          data: [45, 20, 10, 15, 10],
          backgroundColor: [
            "rgba(33, 150, 243, 0.8)",
            "rgba(156, 39, 176, 0.8)",
            "rgba(76, 175, 80, 0.8)",
            "rgba(255, 152, 0, 0.8)",
            "rgba(244, 67, 54, 0.8)",
          ],
          borderColor: "rgba(255, 255, 255, 0.5)",
          borderWidth: 1,
        },
      ],
    },
    radar: {
      labels: ["Speed", "Reliability", "Comfort", "Safety", "Efficiency", "Cost"],
      datasets: [
        {
          label: "Product A",
          data: [75, 70, 85, 80, 65, 60],
          backgroundColor: "rgba(33, 150, 243, 0.2)",
          borderColor: "rgba(33, 150, 243, 1)",
          pointBackgroundColor: "rgba(33, 150, 243, 1)",
        },
        {
          label: "Product B",
          data: [40, 60, 50, 30, 95, 35],
          backgroundColor: "rgba(156, 39, 176, 0.2)",
          borderColor: "rgba(156, 39, 176, 1)",
          pointBackgroundColor: "rgba(156, 39, 176, 1)",
        },
      ],
    },
  },
  yearly: {
    line: {
      labels: ["2018", "2019", "2020", "2021", "2022", "2023"],
      datasets: [
        {
          label: "Revenue",
          data: [15000, 17000, 16500, 19000, 22000, 25000],
          borderColor: "rgba(33, 150, 243, 1)",
          backgroundColor: "rgba(33, 150, 243, 0.1)",
          fill: true,
          tension: 0.4,
        },
        {
          label: "Profit",
          data: [5000, 5500, 5200, 6500, 7800, 9000],
          borderColor: "rgba(156, 39, 176, 1)",
          backgroundColor: "rgba(156, 39, 176, 0.1)",
          fill: true,
          tension: 0.4,
        },
      ],
    },
    bar: {
      labels: ["2018", "2019", "2020", "2021", "2022", "2023"],
      datasets: [
        {
          label: "Revenue",
          data: [1500, 1700, 1650, 1900, 2200, 2500],
          backgroundColor: "rgba(33, 150, 243, 0.8)",
        },
        {
          label: "Expenses",
          data: [1000, 1200, 1150, 1300, 1400, 1600],
          backgroundColor: "rgba(156, 39, 176, 0.8)",
        },
      ],
    },
    pie: {
      labels: ["Stocks", "Bonds", "Cash", "Real Estate", "Commodities"],
      datasets: [
        {
          data: [50, 15, 10, 15, 10],
          backgroundColor: [
            "rgba(33, 150, 243, 0.8)",
            "rgba(156, 39, 176, 0.8)",
            "rgba(76, 175, 80, 0.8)",
            "rgba(255, 152, 0, 0.8)",
            "rgba(244, 67, 54, 0.8)",
          ],
          borderColor: "rgba(255, 255, 255, 0.5)",
          borderWidth: 1,
        },
      ],
    },
    radar: {
      labels: ["Speed", "Reliability", "Comfort", "Safety", "Efficiency", "Cost"],
      datasets: [
        {
          label: "Product A",
          data: [80, 75, 90, 85, 70, 65],
          backgroundColor: "rgba(33, 150, 243, 0.2)",
          borderColor: "rgba(33, 150, 243, 1)",
          pointBackgroundColor: "rgba(33, 150, 243, 1)",
        },
        {
          label: "Product B",
          data: [45, 65, 55, 35, 95, 40],
          backgroundColor: "rgba(156, 39, 176, 0.2)",
          borderColor: "rgba(156, 39, 176, 1)",
          pointBackgroundColor: "rgba(156, 39, 176, 1)",
        },
      ],
    },
  },
};