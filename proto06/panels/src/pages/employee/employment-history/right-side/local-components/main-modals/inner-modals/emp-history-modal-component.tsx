import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import EMPHISTORYModalUI from '../../ui-components/emp-history-modal-ui';
import { EMPHISTORYViewInterface } from '@/types/types-employee-and-applicants';
import { IconButton } from '@mui/material';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface EMPHISTORYModalComponentInterface {
    singleEMPHISTORYDetailsData: EMPHISTORYViewInterface,
    scroll: boolean,
    setSingleEMPHISTORYOpenModal: Dispatch<SetStateAction<boolean>>, 
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleEMPHISTORYDetailsData: React.Dispatch<React.SetStateAction<EMPHISTORYViewInterface>>;
};

const EMPHISTORYModalComponent = ((props:EMPHISTORYModalComponentInterface) => {
    const { singleEMPHISTORYDetailsData, setSingleEMPHISTORYDetailsData, setSingleEMPHISTORYOpenModal } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <div className='flex justify-between items-center bg-gray-100 px-2'>
                <Typography>Employment History Data</Typography>
                <IconButton  
                    aria-label="close"
                    onClick={() => setSingleEMPHISTORYOpenModal(false)}
                >
                    <XMarkIcon className="w-8 text-black"/>
                </IconButton>
            </div>
            {/* <ModalClose sx={{marginTop: '4px'}}/> */}
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <EMPHISTORYModalUI 
                    setSingleEMPHISTORYDetailsData={setSingleEMPHISTORYDetailsData} 
                    singleEMPHISTORYDetailsData={singleEMPHISTORYDetailsData}
                    setSingleEMPHISTORYOpenModal={setSingleEMPHISTORYOpenModal}
                />
            </div>
        </Fragment>
    );
});

export default EMPHISTORYModalComponent;