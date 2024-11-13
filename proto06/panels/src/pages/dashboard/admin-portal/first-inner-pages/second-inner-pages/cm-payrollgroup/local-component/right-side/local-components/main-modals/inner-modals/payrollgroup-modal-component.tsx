import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import Typography from '@mui/joy/Typography';
import PAYROLLGROUPModalUI from '../../ui-components/payrollgroup-modal-ui';
import { PAYROLLGROUPViewInterface } from '@/types/types-pages';
import { IconButton } from '@mui/material';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface PAYROLLGROUPModalComponentInterface {
    singlePAYROLLGROUPDetailsData: PAYROLLGROUPViewInterface,
    setSinglePAYROLLGROUPOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    setSinglePAYROLLGROUPDetailsData: React.Dispatch<React.SetStateAction<PAYROLLGROUPViewInterface>>;
};

const PAYROLLGROUPModalComponent = ((props:PAYROLLGROUPModalComponentInterface) => {
    const { 
        singlePAYROLLGROUPDetailsData, 
        setSinglePAYROLLGROUPDetailsData, 
        setSinglePAYROLLGROUPOpenModal
    } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <div className='flex justify-between items-center bg-gray-100 px-2'>
                <Typography>Payroll Group Data</Typography>
                <IconButton  
                    aria-label="close"
                    onClick={() => setSinglePAYROLLGROUPOpenModal(false)}
                >
                    <XMarkIcon className="w-8 text-black"/>
                </IconButton>
            </div>
            {/* <ModalClose sx={{marginTop: '4px'}}/> */}
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <PAYROLLGROUPModalUI 
                    setSinglePAYROLLGROUPDetailsData={setSinglePAYROLLGROUPDetailsData} 
                    singlePAYROLLGROUPDetailsData={singlePAYROLLGROUPDetailsData}
                    setSinglePAYROLLGROUPOpenModal={setSinglePAYROLLGROUPOpenModal}
                />
            </div>
        </Fragment>
    );
});

export default PAYROLLGROUPModalComponent;