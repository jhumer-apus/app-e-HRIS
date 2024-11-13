import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import OBTModalUI from '../../ui-components/obt-modal-ui';
import { OBTViewInterface } from '@/types/types-pages';
import { IconButton } from '@mui/material';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface OBTModalComponentInterface {
    singleOBTDetailsData: OBTViewInterface,
    scroll: boolean,
    setSingleOBTOpenModal: Dispatch<SetStateAction<boolean>>;
};

const OBTModalComponent = ((props:OBTModalComponentInterface) => {
    const { singleOBTDetailsData, setSingleOBTDetailsData, setSingleOBTOpenModal } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <div className='flex justify-between items-center bg-gray-100 px-2'>
                <Typography>Official Business Time/Trip Data</Typography>
                <IconButton  
                    aria-label="close"
                    onClick={() => setSingleOBTOpenModal(false)}
                >
                    <XMarkIcon className="w-8 text-black"/>
                </IconButton>

            </div>
            {/* <ModalClose sx={{marginTop: '4px'}}/> */}
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <OBTModalUI setSingleOBTDetailsData={setSingleOBTDetailsData} singleOBTDetailsData={singleOBTDetailsData}/>
            </div>
        </Fragment>
    );
});

export default OBTModalComponent;
