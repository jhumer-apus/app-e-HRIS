import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import Typography from '@mui/joy/Typography';
import DEPARTMENTModalUI from '../../ui-components/department-modal-ui';
import { DEPARTMENTViewInterface } from '@/types/types-pages';
import { IconButton } from '@mui/material';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface DEPARTMENTModalComponentInterface {
    singleDEPARTMENTDetailsData: DEPARTMENTViewInterface,
    setSingleDEPARTMENTOpenModal: Dispatch<SetStateAction<boolean>>,
    setSingleDEPARTMENTDetailsData: React.Dispatch<React.SetStateAction<DEPARTMENTViewInterface>>;
};

const DEPARTMENTModalComponent = ((props:DEPARTMENTModalComponentInterface) => {
    const { singleDEPARTMENTDetailsData, setSingleDEPARTMENTOpenModal, setSingleDEPARTMENTDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <div className='flex justify-between items-center bg-gray-100 px-2'>
                <Typography variant='soft'>Department Data</Typography>
                <IconButton  
                    aria-label="close"
                    onClick={() => setSingleDEPARTMENTOpenModal(false)}
                >
                    <XMarkIcon className="w-8 text-black"/>
                </IconButton>
            </div>

            <div ref={componentRef} id="printable-area" className='mt-4'>
                <DEPARTMENTModalUI 
                    setSingleDEPARTMENTDetailsData={setSingleDEPARTMENTDetailsData} 
                    singleDEPARTMENTDetailsData={singleDEPARTMENTDetailsData}
                    setSingleDEPARTMENTOpenModal={setSingleDEPARTMENTOpenModal}
                />
            </div>
        </Fragment>
    );
});

export default DEPARTMENTModalComponent;