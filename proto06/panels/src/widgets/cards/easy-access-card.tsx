import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import styles from './custom-styles/EasyAccessCard.module.scss'; // Custom-Styles is created when Tailwind fails to work. 当Tailwind无法工作时，就会创建自定义样式
import { EasyAccessCardProps } from "@/types/types-widgets";
import { UnderDevelopmentMsg } from "@/pages/dashboard/hris-portal/local-components/projects-card";
import { useNavigate } from "react-router-dom";
// import './custom-styles/StatisticsCard.css'
import axios from 'axios';
import axiosInstance from "@/helpers/axiosConfig";



const downloadFile = async (url: string, fileName: string) => {
  try {
    const response = await axiosInstance.get(url, { responseType: 'blob' });
    const blob = new Blob([response.data], { type: response.headers['content-type'] });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  } catch (error) {
    console.error('Error downloading file:', error);
  }
};


const handleDownload = (apiUrl: string, fileName: string) => {
  downloadFile(apiUrl, fileName);
};

export function EasyAccessCard({ color, icon, title, value, footer, custom, link, onClickDetails, onClickHandler, fileDownload, fileName }: EasyAccessCardProps) {
  const navigate = useNavigate();
  return (
    <Card className={(link !== 'development' ? styles.cardWrap : '')} style={{position: 'relative'}} >
      {
      link === 'development' ? 
      <UnderDevelopmentMsg fontSize={12}/> 
      :
      fileDownload ? 
      <a className="absolute w-full h-full" target={"_blank"} href={link} download={"asdasdasd"}>
      </a>
      :
      <div className="absolute w-full h-full" onClick={()=> {
          onClickHandler && onClickDetails && onClickHandler(onClickDetails)
          setTimeout(()=> {navigate(`${link}`)}, 400)
      }}></div>
      }
      <CardHeader
        variant="gradient"
        // color={color}
        className="absolute -mt-4 grid h-16 w-16 place-items-center"
        style={ custom !== undefined ? {background: `${custom}`} : {background: "linear-gradient(87deg, #5e72e4 0, #825ee4 100%)"}}
        data-name={'iconwrap'}
      >
        <span className={styles.cardIcon} >{icon}</span>
      </CardHeader>
      <CardBody className="p-4 text-right easyAccessCard">
        <div className="w-full flex justify-end">
          <Typography variant="small" className="font-normal w-72 text-blue-gray-600 easyAccessCardTitle">
            {title}
          </Typography>
        </div>
        <Typography variant="h4" color="blue-gray" className='easyAccessCardValue'>
          {value}
        </Typography>
      </CardBody>
      {footer && (
        <CardFooter className="border-t border-blue-gray-50 p-4">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}

EasyAccessCard.defaultProps = {
  color: "blue",
  footer: null,
};

EasyAccessCard.propTypes = {
  color: PropTypes.oneOf([
    "white",
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

EasyAccessCard.displayName = "/src/widgets/cards/statistics-card.tsx";

export default EasyAccessCard;
