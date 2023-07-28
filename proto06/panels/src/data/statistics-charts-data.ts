import { chartsConfig, chartsConfigInterface, chartsConfigXAxis, chartsConfigYAxis } from "@/configs";

export interface websiteViewsChartInterface {
  type: string,
  height: number,
  series: [
    {
      name: string,
      data: number[],
    },
  ],
  options: chartsConfigInterface & {
    colors: string,
    plotOptions: {
      bar: {
        columnWidth: string,
        borderRadius: number,
      },
    },
    xaxis: chartsConfigXAxis & {
      categories: string[],
    }
  }
}

const websiteViewsChart = {
  type: "bar",
  height: 220,
  series: [
    {
      name: "Views",
      data: [50, 20, 10, 22, 50, 10, 40],
    },
  ],
  options: {
    ...chartsConfig,
    colors: "#fff",
    plotOptions: {
      bar: {
        columnWidth: "16%",
        borderRadius: 5,
      },
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["M", "T", "W", "T", "F", "S", "S"],
    },
  },
};

const dailySalesChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Sales",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#fff"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  },
};

const completedTasksChart = {
  ...dailySalesChart,
  series: [
    {
      name: "Tasks",
      data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
    },
  ],
};

export const statisticsChartsData = [
  {
    color: "blue",
    title: "Daily HRIS View",
    description: "HRIS Activity Performance",
    footer: "backend synched 2 days ago",
    chart: websiteViewsChart,
    link: 'development',
    customTop: 30,
    customLeft: 40,
  },
  {
    color: "pink",
    title: "Monthly Payroll",
    description: "15% increase in this Month's Payroll",
    footer: "updated 4 min ago",
    chart: dailySalesChart,
    link: 'development',
    customTop: 30,
    customLeft: 40,
  },
  {
    color: "green",
    title: "Monthly Hires",
    description: "Last Campaign Performance",
    footer: "just updated",
    chart: completedTasksChart,
    link: 'development',
    customTop: 30,
    customLeft: 40,
  },
];

export default statisticsChartsData;
