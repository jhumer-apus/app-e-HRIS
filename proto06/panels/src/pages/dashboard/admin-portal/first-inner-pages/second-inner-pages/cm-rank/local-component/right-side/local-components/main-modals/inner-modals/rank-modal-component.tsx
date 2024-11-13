import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import Typography from '@mui/joy/Typography';
import RANKModalUI from '../../ui-components/rank-modal-ui';
import { RANKViewInterface } from '@/types/types-pages';
import { IconButton } from '@mui/material';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface RANKModalComponentInterface {
    singleRANKDetailsData: RANKViewInterface,
    setSingleRANKOpenModal: Dispatch<SetStateAction<boolean>>,
    setSingleRANKDetailsData: React.Dispatch<React.SetStateAction<RANKViewInterface>>;
};

const RANKModalComponent = ((props:RANKModalComponentInterface) => {
    const { 
        singleRANKDetailsData, 
        setSingleRANKOpenModal, 
        setSingleRANKDetailsData 
    } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);
    return (
        <Fragment>
            <div className='flex justify-between items-center bg-gray-100 px-2'>
                <Typography>Rank Data</Typography>
                <IconButton  
                    aria-label="close"
                    onClick={() => setSingleRANKOpenModal(false)}
                >
                    <XMarkIcon className="w-8 text-black"/>
                </IconButton>
            </div>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <RANKModalUI 
                    setSingleRANKDetailsData={setSingleRANKDetailsData} 
                    singleRANKDetailsData={singleRANKDetailsData}
                    setSingleRANKOpenModal={setSingleRANKOpenModal}
                />
            </div>
        </Fragment>
    );
});

export default RANKModalComponent;