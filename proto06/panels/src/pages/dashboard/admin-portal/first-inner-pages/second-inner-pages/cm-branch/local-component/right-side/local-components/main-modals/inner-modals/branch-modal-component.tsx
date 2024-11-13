import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import Typography from '@mui/joy/Typography';
import BRANCHModalUI from '../../ui-components/branch-modal-ui';
import { BRANCHViewInterface } from '@/types/types-pages';
import { IconButton } from '@mui/material';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface BRANCHModalComponentInterface {
    singleBRANCHDetailsData: BRANCHViewInterface,
    setSingleBRANCHOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    setSingleBRANCHDetailsData: React.Dispatch<React.SetStateAction<BRANCHViewInterface>>;
};

const BRANCHModalComponent = ((props:BRANCHModalComponentInterface) => {
    const { singleBRANCHDetailsData, setSingleBRANCHDetailsData, setSingleBRANCHOpenModal } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <div className='flex justify-between items-center bg-gray-100 px-2'>
                <Typography>Branch Data</Typography>
                <IconButton  
                    aria-label="close"
                    onClick={() => setSingleBRANCHOpenModal(false)}
                >
                    <XMarkIcon className="w-8 text-black"/>
                </IconButton>
            </div>
            {/* <ModalClose sx={{marginTop: '4px'}}/> */}
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <BRANCHModalUI 
                    setSingleBRANCHDetailsData={setSingleBRANCHDetailsData} 
                    singleBRANCHDetailsData={singleBRANCHDetailsData}
                    setSingleBRANCHOpenModal={setSingleBRANCHOpenModal}
                />
            </div>
        </Fragment>
    );
});

export default BRANCHModalComponent;