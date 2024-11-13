import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import OBTModalUI from '../../ui-components/obt-modal-ui';
import { OBTViewInterface } from '@/types/types-pages';
import { useDispatch } from 'react-redux';
import { IconButton } from '@mui/material';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { HandleModalAction } from '@/store/actions/components';


interface OBTModalComponentInterface {
    singleOBTDetailsData: OBTViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleOBTDetailsData: React.Dispatch<React.SetStateAction<OBTViewInterface>>;
};

const OBTModalComponent = ((props:OBTModalComponentInterface) => {
    const { singleOBTDetailsData, setSingleOBTDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useDispatch()
    return (
        <Fragment>
            <div id="close-wrapper" className="w-full flex justify-between items-center bg-gray-100 px-2">
                <Typography>Official Business Time/Trip Data</Typography>
                <IconButton  
                    aria-label="close"
                    onClick={() => 
                    dispatch(HandleModalAction({
                        name: "viewObtModal",
                        value: false
                        })) 
                    }
                >
                    <XMarkIcon className="w-8 text-black"/>
                </IconButton>
            </div>
            {/* <ModalClose sx={{marginTop: '4px'}}/> */}
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <OBTModalUI setSingleOBTDetailsData={setSingleOBTDetailsData} singleOBTDetailsData={singleOBTDetailsData}/>
            </div>
        </Fragment>
    );
});

export default OBTModalComponent;


// Styles

  
const paySlipDetailsFont = {
    fontSize: '12px',
};