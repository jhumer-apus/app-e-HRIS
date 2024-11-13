import { Dispatch, SetStateAction, Fragment, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { SCHEDULESHIFTViewInterface } from '@/types/types-pages';
import SCHEDULESHIFTModalComponent from './inner-modals/schedule-shift-modal-component';


interface SingleSCHEDULESHIFTInterface {
    singleSCHEDULESHIFTOpenModal: boolean; 
    setSingleSCHEDULESHIFTOpenModal: Dispatch<SetStateAction<boolean>>;
    singleSCHEDULESHIFTDetailsData: SCHEDULESHIFTViewInterface;
    setSingleSCHEDULESHIFTDetailsData: Dispatch<SetStateAction<SCHEDULESHIFTViewInterface>>;
}

export default function ViewSCHEDULESHIFTSingleModal(props: SingleSCHEDULESHIFTInterface) {
    const {singleSCHEDULESHIFTOpenModal, setSingleSCHEDULESHIFTOpenModal, setSingleSCHEDULESHIFTDetailsData, singleSCHEDULESHIFTDetailsData} = props;
  const [scroll, setScroll] = useState<boolean>(true);
  return (
    <Fragment>
      <Transition in={singleSCHEDULESHIFTOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setSingleSCHEDULESHIFTOpenModal(false);
        }}
        slotProps={{
            backdrop: {
              sx: {
                opacity: 0,
                backdropFilter: 'none',
                transition: `opacity 400ms, backdrop-filter 400ms`,
                ...{
                  entering: { opacity: 1, backdropFilter: 'blur(8px)' },
                  entered: { opacity: 1, backdropFilter: 'blur(8px)' },
                }[state],
              },
            },
          }}
          sx={{
            visibility: state === 'exited' ? 'hidden' : 'visible',
          }}
      >
        <ModalDialog 
            aria-labelledby="dialog-vertical-scroll-title" 
            layout={'center'}
            sx={{
              ...SCHEDULESHIFTModalArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                overflow: 'auto',
            }}
        >
          <SCHEDULESHIFTModalComponent setSingleSCHEDULESHIFTOpenModal={setSingleSCHEDULESHIFTOpenModal} setSingleSCHEDULESHIFTDetailsData={setSingleSCHEDULESHIFTDetailsData} singleSCHEDULESHIFTDetailsData={singleSCHEDULESHIFTDetailsData} scroll={scroll} setScroll={setScroll}/>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}


// Styles
const SCHEDULESHIFTModalArea = {
  // height: '110mm',
  maxWidth: '700px',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};