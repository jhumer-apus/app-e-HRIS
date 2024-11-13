import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import Typography from '@mui/joy/Typography';
import POSITIONModalUI from '../../ui-components/position-modal-ui';
import { POSITIONViewInterface } from '@/types/types-pages';
import { IconButton } from '@mui/material';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface POSITIONModalComponentInterface {
    singlePOSITIONDetailsData: POSITIONViewInterface,
    setSinglePOSITIONOpenModal: Dispatch<SetStateAction<boolean>>,
    setSinglePOSITIONDetailsData: React.Dispatch<React.SetStateAction<POSITIONViewInterface>>;
};

const POSITIONModalComponent = ((props:POSITIONModalComponentInterface) => {
    const { 
        singlePOSITIONDetailsData, 
        setSinglePOSITIONDetailsData,
        setSinglePOSITIONOpenModal
    } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);
    return (
        <Fragment>
            <div className='flex justify-between items-center bg-gray-100 px-2'>
                <Typography>Position Data</Typography>
                <IconButton  
                    aria-label="close"
                    onClick={() => setSinglePOSITIONOpenModal(false)}
                >
                    <XMarkIcon className="w-8 text-black"/>
                </IconButton>
            </div>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <POSITIONModalUI 
                    setSinglePOSITIONDetailsData={setSinglePOSITIONDetailsData} 
                    singlePOSITIONDetailsData={singlePOSITIONDetailsData}
                    setSinglePOSITIONOpenModal={setSinglePOSITIONOpenModal}
                />
            </div>
        </Fragment>
    );
});

export default POSITIONModalComponent;