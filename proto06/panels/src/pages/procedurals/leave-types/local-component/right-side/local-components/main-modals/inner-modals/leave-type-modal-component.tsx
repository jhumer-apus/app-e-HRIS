import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import LEAVETYPEModalUI from '../../ui-components/leave-type-modal-ui';
import { LEAVETYPEViewInterface } from '@/types/types-pages';
import { IconButton } from '@mui/material';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface LEAVETYPEModalComponentInterface {
    singleLEAVETYPEDetailsData: LEAVETYPEViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleLEAVETYPEDetailsData: React.Dispatch<React.SetStateAction<LEAVETYPEViewInterface>>;
    setSingleLEAVETYPEOpenModal: Dispatch<SetStateAction<boolean>>;
};

const LEAVETYPEModalComponent = ((props:LEAVETYPEModalComponentInterface) => {
    const { singleLEAVETYPEDetailsData, setSingleLEAVETYPEDetailsData, setSingleLEAVETYPEOpenModal } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <div className='flex justify-between items-center bg-gray-100 px-2'>
                <Typography>Leave Type Data</Typography>
                <IconButton  
                    aria-label="close"
                    onClick={() => setSingleLEAVETYPEOpenModal(false)}
                >
                    <XMarkIcon className="w-8 text-black"/>
                </IconButton>
            </div>
            <div ref={componentRef} id="printable-area" className='mt-6'>
                <LEAVETYPEModalUI setSingleLEAVETYPEDetailsData={setSingleLEAVETYPEDetailsData} singleLEAVETYPEDetailsData={singleLEAVETYPEDetailsData}/>
            </div>
        </Fragment>
    );
});

export default LEAVETYPEModalComponent;