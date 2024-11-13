import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import SCHEDULESHIFTModalUI from '../../ui-components/schedule-shift-modal-ui';
import { SCHEDULESHIFTViewInterface } from '@/types/types-pages';
import { IconButton } from '@mui/material';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface SCHEDULESHIFTModalComponentInterface {
    singleSCHEDULESHIFTDetailsData: SCHEDULESHIFTViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleSCHEDULESHIFTDetailsData: React.Dispatch<React.SetStateAction<SCHEDULESHIFTViewInterface>>;
    setSingleSCHEDULESHIFTOpenModal: Dispatch<SetStateAction<boolean>>;
};

const SCHEDULESHIFTModalComponent = ((props:SCHEDULESHIFTModalComponentInterface) => {
    const { singleSCHEDULESHIFTDetailsData, setSingleSCHEDULESHIFTDetailsData, setSingleSCHEDULESHIFTOpenModal } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <div className='flex justify-between items-center bg-gray-100 px-2'>
                <Typography>Schedule Shift Data</Typography>
                <IconButton  
                    aria-label="close"
                    onClick={() => setSingleSCHEDULESHIFTOpenModal(false)}
                >
                    <XMarkIcon className="w-8 text-black"/>
                </IconButton>
            </div>
            {/* <ModalClose sx={{marginTop: '4px'}}/> */}
            <div ref={componentRef} id="printable-area" className='mt-5 ml-5'>
                <SCHEDULESHIFTModalUI setSingleSCHEDULESHIFTDetailsData={setSingleSCHEDULESHIFTDetailsData} singleSCHEDULESHIFTDetailsData={singleSCHEDULESHIFTDetailsData}/>
            </div>
        </Fragment>
    );
});

export default SCHEDULESHIFTModalComponent;