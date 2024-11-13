import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import UAModalUI from '../../ui-components/ua-modal-ui';
import { UAViewInterface } from '@/types/types-pages';
import { IconButton } from '@mui/material';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface UAModalComponentInterface {
    singleUADetailsData: UAViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleUADetailsData: React.Dispatch<React.SetStateAction<UAViewInterface>>;
    setSingleUAOpenModal: Dispatch<SetStateAction<boolean>>;
};

const UAModalComponent = ((props:UAModalComponentInterface) => {
    const { singleUADetailsData, setSingleUADetailsData, setSingleUAOpenModal } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <div className='flex justify-between items-center bg-gray-100 px-2'>
                <Typography>Unaccounted Attendance Data</Typography>
                <IconButton  
                    aria-label="close"
                    onClick={() => setSingleUAOpenModal(false)}
                >
                    <XMarkIcon className="w-8 text-black"/>
                </IconButton>
            </div>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <UAModalUI setSingleUADetailsData={setSingleUADetailsData} singleUADetailsData={singleUADetailsData}/>
            </div>
        </Fragment>
    );
});

export default UAModalComponent;


// Styles

  
const paySlipDetailsFont = {
    fontSize: '12px',
};