import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import CUTOFFPERIODModalUI from '../../ui-components/cutoff-period-modal-ui';
import { CUTOFFPERIODViewInterface } from '@/types/types-pages';
import { IconButton } from '@mui/material';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface CUTOFFPERIODModalComponentInterface {
    singleCUTOFFPERIODDetailsData: CUTOFFPERIODViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleCUTOFFPERIODDetailsData: React.Dispatch<React.SetStateAction<CUTOFFPERIODViewInterface>>;
    setSingleCUTOFFPERIODOpenModal: Dispatch<SetStateAction<boolean>>;
};

const CUTOFFPERIODModalComponent = ((props:CUTOFFPERIODModalComponentInterface) => {
    const { singleCUTOFFPERIODDetailsData, setSingleCUTOFFPERIODDetailsData, setSingleCUTOFFPERIODOpenModal } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <div className='flex justify-between items-center bg-gray-100 px-2'>
                <Typography variant='soft'>Cutoff Period Data</Typography>
                <IconButton  
                    aria-label="close"
                    onClick={() => setSingleCUTOFFPERIODOpenModal(false)}
                >
                    <XMarkIcon className="w-8 text-black"/>
                </IconButton>
            </div>
            {/* <ModalClose sx={{marginTop: '4px'}}/> */}
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <CUTOFFPERIODModalUI setSingleCUTOFFPERIODDetailsData={setSingleCUTOFFPERIODDetailsData} singleCUTOFFPERIODDetailsData={singleCUTOFFPERIODDetailsData}/>
            </div>
        </Fragment>
    );
});

export default CUTOFFPERIODModalComponent;