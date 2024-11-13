import { Dispatch, SetStateAction, Fragment, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { SCHEDULEDAILYViewInterface } from '@/types/types-pages';
import SCHEDULEDAILYModalComponent from './inner-modals/schedule-daily-modal-component';


interface SingleSCHEDULEDAILYInterface {
    singleSCHEDULEDAILYOpenModal: boolean; 
    setSingleSCHEDULEDAILYOpenModal: Dispatch<SetStateAction<boolean>>;
    singleSCHEDULEDAILYDetailsData: SCHEDULEDAILYViewInterface;
    setSingleSCHEDULEDAILYDetailsData: Dispatch<SetStateAction<SCHEDULEDAILYViewInterface>>;
}

export default function ViewSCHEDULEDAILYSingleModal(props: SingleSCHEDULEDAILYInterface) {
    const {singleSCHEDULEDAILYOpenModal, setSingleSCHEDULEDAILYOpenModal, setSingleSCHEDULEDAILYDetailsData, singleSCHEDULEDAILYDetailsData} = props;
  const [scroll, setScroll] = useState<boolean>(true);
  return (
    <Fragment>
      <Transition in={singleSCHEDULEDAILYOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setSingleSCHEDULEDAILYOpenModal(false);
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
              ...SCHEDULEDAILYModalArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                overflow: 'auto',
            }}
        >
          <SCHEDULEDAILYModalComponent setSingleSCHEDULEDAILYOpenModal={setSingleSCHEDULEDAILYOpenModal} setSingleSCHEDULEDAILYDetailsData={setSingleSCHEDULEDAILYDetailsData} singleSCHEDULEDAILYDetailsData={singleSCHEDULEDAILYDetailsData} scroll={scroll} setScroll={setScroll}/>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}


// Styles
const SCHEDULEDAILYModalArea = {
  // height: '110mm',
  maxWidth: '100mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};