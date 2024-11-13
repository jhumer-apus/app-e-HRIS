import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import OVERTIMEModalUI from '../../ui-components/ot-modal-ui';
import { OVERTIMEViewInterface } from '@/types/types-pages';
import { IconButton } from '@mui/material';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface OVERTIMEModalComponentInterface {
    singleOVERTIMEDetailsData: OVERTIMEViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleOVERTIMEDetailsData: React.Dispatch<React.SetStateAction<OVERTIMEViewInterface>>;
    setSingleOVERTIMEOpenModal: Dispatch<SetStateAction<boolean>>;
};

const OVERTIMEModalComponent = ((props:OVERTIMEModalComponentInterface) => {
    const { singleOVERTIMEDetailsData, setSingleOVERTIMEDetailsData, setSingleOVERTIMEOpenModal } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <div className='flex justify-between items-center bg-gray-100 px-2'>
                <Typography>Overtime Data</Typography>
                <IconButton  
                    aria-label="close"
                    onClick={() => setSingleOVERTIMEOpenModal(false)}
                >
                    <XMarkIcon className="w-8 text-black"/>
                </IconButton>
            </div>
            {/* <ModalClose sx={{marginTop: '4px'}}/> */}
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <OVERTIMEModalUI setSingleOVERTIMEDetailsData={setSingleOVERTIMEDetailsData} singleOVERTIMEDetailsData={singleOVERTIMEDetailsData}/>
            </div>
        </Fragment>
    );
});

    




export default OVERTIMEModalComponent;