import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import SCHEDULEDAILYModalUI from '../../ui-components/schedule-daily-modal-ui';
import { SCHEDULEDAILYViewInterface } from '@/types/types-pages';
import { IconButton } from '@mui/material';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface SCHEDULEDAILYModalComponentInterface {
    singleSCHEDULEDAILYDetailsData: SCHEDULEDAILYViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleSCHEDULEDAILYDetailsData: React.Dispatch<React.SetStateAction<SCHEDULEDAILYViewInterface>>;
    setSingleSCHEDULEDAILYOpenModal: Dispatch<SetStateAction<boolean>>;
};

const SCHEDULEDAILYModalComponent = ((props:SCHEDULEDAILYModalComponentInterface) => {
    const { singleSCHEDULEDAILYDetailsData, setSingleSCHEDULEDAILYDetailsData, setSingleSCHEDULEDAILYOpenModal } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <div className='flex justify-between items-center bg-gray-100 px-2'>
                <Typography>Daily Schedule Data</Typography>
                <IconButton  
                    aria-label="close"
                    onClick={() => setSingleSCHEDULEDAILYOpenModal(false)}
                >
                    <XMarkIcon className="w-8 text-black"/>
                </IconButton>
            </div>
            {/* <ModalClose sx={{marginTop: '4px'}}/> */}
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <SCHEDULEDAILYModalUI setSingleSCHEDULEDAILYDetailsData={setSingleSCHEDULEDAILYDetailsData} singleSCHEDULEDAILYDetailsData={singleSCHEDULEDAILYDetailsData}/>
            </div>
        </Fragment>
    );
});

export default SCHEDULEDAILYModalComponent;