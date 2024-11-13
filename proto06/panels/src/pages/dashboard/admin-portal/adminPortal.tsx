import React from "react";
import {
  Typography,
} from "@material-tailwind/react";
import {
    ClockIcon,
} from "@heroicons/react/24/outline";
import { EasyAccessCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsChartsData,
} from "@/data";
import { adminPortalData } from "@/data/pages-data/dashboard-data/admin-portal-data";

export interface DivAnimate {
  [key: string]: boolean
}

export function AdminPortal() {
  const [isVisible, setIsVisible] = React.useState<DivAnimate>({});

  const handleOnClick = (key: string) => {
    const thisKey = key;
    setIsVisible((prevState)=>{
      return{
        ...prevState,
        [thisKey]: true
      }
    });
  };

  return (
    <div className="mt-12">
      {/* adminPortalCardsContainer manual code para sa pag flex sa 320 pa up screen size. -osama */}
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3 adminPortalCardsContainer">
        {adminPortalData.map(({ icon, title, footer, value, ...rest }, index) => (
          <div style={{
            transition: 'transform 0.5s ease, opacity 0.5s ease',
            transform: !isVisible[`${value}${index}`] ? 'translateY(0)' : 'translateY(-100%)',
            opacity: !isVisible[`${value}${index}`] ? 1 : 0,
          }} data-type={index} className=" xs:w-[80%] sm:!w-[90%] xl:!w-full">
            <EasyAccessCard 
              value={value}
              onClickHandler={handleOnClick}
              onClickDetails={`${value}${index}`}
              key={title}
              {...rest}
              title={title} 
              icon={React.createElement(icon, {
                className: "w-6 h-6 text-white",
              })}
              footer={
                <Typography className="font-normal text-blue-gray-600">
                  <strong className={footer.color}>{footer.value}</strong>
                  &nbsp;{footer.label}
                </Typography>
              }
            />
          </div>
        ))}
      </div>
      {/* <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-inherit" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div> */}
    </div>
  );
}

export default AdminPortal;
