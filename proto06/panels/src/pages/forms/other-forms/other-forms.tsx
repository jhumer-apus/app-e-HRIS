import { useEffect, useState, createElement } from "react";
import {
  Typography,
} from "@material-tailwind/react";
// import { Typography } from "@mui/material";
import { EasyAccessCard } from "@/widgets/cards";
import AnimationIcon from '@mui/icons-material/Animation';
import AssistantIcon from '@mui/icons-material/Assistant';
import BedroomParentOutlinedIcon from '@mui/icons-material/BedroomParentOutlined';
import Brightness4OutlinedIcon from '@mui/icons-material/Brightness4Outlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import ConnectWithoutContactOutlinedIcon from '@mui/icons-material/ConnectWithoutContactOutlined';
import CollectionsBookmarkOutlinedIcon from '@mui/icons-material/CollectionsBookmarkOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import BeenhereOutlinedIcon from '@mui/icons-material/BeenhereOutlined';

import EditLocationAltOutlinedIcon from '@mui/icons-material/EditLocationAltOutlined';
import DryCleaningOutlinedIcon from '@mui/icons-material/DryCleaningOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import { APILink, RootState } from '@/store/configureStore';
import { useSelector } from "react-redux";
import { INTERNAL_USER_ROLE } from "@/types/types-store";


const IconColor = 'linear-gradient(56deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,90,255,1) 100%)';



export interface DivAnimate {
  [key: string]: boolean
}

export function OtherForms() {
  const userState = useSelector((state: RootState)=> state.auth)
  const [isVisible, setIsVisible] = useState<DivAnimate>({});
  const [pageLoaded, setPageLoaded] = useState(false);

  const otherFormsData = [
    {
        // color: "red",
        type: 2,
        icon: AssistantIcon,
        title: "Request Premium Pay Form (Trucking)",
        value: "PPF",
        footer: {
        color: "text-green-500",
        value: "<",
        label: "F-HRD-01.17B/REV.00/EFF.DATE: 04-01-17",
        },
        custom: IconColor,
        link: `${APILink.replace('/api/v1/', '')}/media/file/F-HRD-01.17B_Request_for_Premium_Pay_Trucking_Service_rev.00.pdf`,
        fileDownload: true,
        fileName: 'F-HRD-01.17B_Request_for_Premium_Pay_Trucking_Service_rev.00.pdf',
        customTop: 15,
        customLeft: 38,
    },
    {
        // color: "red",
        type: 2,
        icon: Brightness4OutlinedIcon,
        title: "Request Overtime Form (NPF)",
        value: "NPF",
        footer: {
        color: "text-green-500",
        value: "<",
        label: "F-HRD-01.17/REV.04/EFF.DATE: 09-05-22",
        },
        custom: IconColor,
        link: `${APILink.replace('/api/v1/', '')}/media/file/F-HRD-01.17_Request_for_Overtime_rev.04.pdf`,
        fileDownload: true,
        fileName: 'F-HRD-01.17_Request_for_Overtime_rev.04.pdf',
        customTop: 15,
        customLeft: 38,
    },
    {
      // color: "red",
      type: 2,
      icon: BeenhereOutlinedIcon,
      title: "Authority to Deduct Health Insurance",
      value: "ATD",
      footer: {
      color: "text-green-500",
      value: "<",
      label: "F-HRD-03.11/REV.00/EFF.DATE: 08-03-22",
      },
      custom: IconColor,
      link: `${APILink.replace('/api/v1/', '')}/media/file/F-HRD-03.11_AUTHORITY_TO_DEDUCT_-_HEALTH_INSURANCE_rev.00.pdf`,
      fileDownload: true,
      fileName: 'F-HRD-03.11_AUTHORITY_TO_DEDUCT_-_HEALTH_INSURANCE_(rev.00)',
      customTop: 15,
      customLeft: 38,
    },
    ...(userState?.user?.role !== INTERNAL_USER_ROLE.Employee ) ? [
        
    ] : []
  ]

  const handleOnClick = (key: string) => {
    const thisKey = key;
    setIsVisible((prevState)=>{
      return{
        ...prevState,
        [thisKey]: true
      }
    });
  };

  useEffect(()=> {
    setTimeout(()=>{
        setPageLoaded(true)
    }, 100)
  }, [])

  return (
    <div className="mt-12" style={{height: '90vh'}}>
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {otherFormsData.map(({ icon, title, footer, value, ...rest }, index) => (
          <div style={{
            transition: 'transform 0.5s ease, opacity 0.5s ease',
            transform: !isVisible[`${value}${index}`] && pageLoaded ? 'translateY(0)' : 'translateY(-100%)',
            opacity: !isVisible[`${value}${index}`] && pageLoaded ? 1 : 0,
          }} data-type={index}>
            <EasyAccessCard
              value={value}
              onClickHandler={handleOnClick}
              onClickDetails={`${value}${index}`}
              key={title}
              {...rest}
              title={title}
              icon={createElement(icon, {
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
    </div>
  );
}

export default OtherForms;