import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import Typography from '@mui/joy/Typography';
import LEAVECREDITModalUI from '../../ui-components/leave-credit-modal-ui';
import { LEAVECREDITViewInterface } from '@/types/types-pages';
import { IconButton } from '@mui/material';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface LEAVECREDITModalComponentInterface {
    singleLEAVECREDITDetailsData: LEAVECREDITViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleLEAVECREDITDetailsData: React.Dispatch<React.SetStateAction<LEAVECREDITViewInterface>>;
    setSingleLEAVECREDITOpenModal: Dispatch<SetStateAction<boolean>>;
};

const LEAVECREDITModalComponent = ((props:LEAVECREDITModalComponentInterface) => {
    const { singleLEAVECREDITDetailsData, setSingleLEAVECREDITDetailsData, setSingleLEAVECREDITOpenModal } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <div className='flex justify-between items-center bg-gray-100 px-2'>
                <Typography>Leave Credit Data</Typography>
                <IconButton  
                    aria-label="close"
                    onClick={() => setSingleLEAVECREDITOpenModal(false)}
                >
                    <XMarkIcon className="w-8 text-black"/>
                </IconButton>
            </div>  
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <LEAVECREDITModalUI setSingleLEAVECREDITDetailsData={setSingleLEAVECREDITDetailsData} singleLEAVECREDITDetailsData={singleLEAVECREDITDetailsData}/>
            </div>
        </Fragment>
    );
});

export default LEAVECREDITModalComponent;