import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import EMPSEMINARSModalUI from '../../ui-components/ui-emp-training-seminars-history-modal';
import { EMPSEMINARSViewInterface } from '@/types/types-employee-and-applicants';
import { IconButton } from '@mui/material';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface EMPSEMINARSModalComponentInterface {
    singleEMPSEMINARSDetailsData: EMPSEMINARSViewInterface,
    scroll: boolean,
    setSingleEMPSEMINARSOpenModal: Dispatch<SetStateAction<boolean>>, 
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleEMPSEMINARSDetailsData: React.Dispatch<React.SetStateAction<EMPSEMINARSViewInterface>>;
};

const EMPSEMINARSModalComponent = ((props:EMPSEMINARSModalComponentInterface) => {
    const { singleEMPSEMINARSDetailsData, setSingleEMPSEMINARSDetailsData, setSingleEMPSEMINARSOpenModal } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <div className='flex justify-between items-center bg-gray-100 px-2'>
                <Typography>Training and Seminar Data</Typography>
                <IconButton  
                    aria-label="close"
                    onClick={() => setSingleEMPSEMINARSOpenModal(false)}
                >
                    <XMarkIcon className="w-8 text-black"/>
                </IconButton>
            </div>
            {/* <ModalClose sx={{marginTop: '4px'}}/> */}
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <EMPSEMINARSModalUI 
                    setSingleEMPSEMINARSDetailsData={setSingleEMPSEMINARSDetailsData} 
                    singleEMPSEMINARSDetailsData={singleEMPSEMINARSDetailsData}
                    setSingleEMPSEMINARSOpenModal={setSingleEMPSEMINARSOpenModal}
                />
            </div>
        </Fragment>
    );
});

export default EMPSEMINARSModalComponent;