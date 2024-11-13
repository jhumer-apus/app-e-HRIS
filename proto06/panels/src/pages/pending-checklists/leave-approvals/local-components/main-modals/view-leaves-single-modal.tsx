import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { LEAVEViewInterface, ViewPayrollPayPerEmployee } from '@/types/types-pages';
import LEAVEModalComponent from './inner-modals/leaves-modal-component';
import { HandleModalAction } from '@/store/actions/components';

interface ViewLEAVESingleModalInterface {
    singleLEAVEOpenModal: boolean; 
    setSingleLEAVEOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    singleLEAVEDetailsData: LEAVEViewInterface;
    setSingleLEAVEDetailsData: React.Dispatch<React.SetStateAction<LEAVEViewInterface>>;
}

export default function ViewLEAVESingleModal(props: ViewLEAVESingleModalInterface) {
  const {singleLEAVEOpenModal, setSingleLEAVEOpenModal, setSingleLEAVEDetailsData, singleLEAVEDetailsData} = props;
  const [scroll, setScroll] = React.useState<boolean>(true);

  return (
    <React.Fragment>
      <Transition in={singleLEAVEOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => setSingleLEAVEOpenModal(false)}
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
              ...leavesModalArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                overflow: 'auto',
            }}
        >
          <LEAVEModalComponent setSingleLEAVEOpenModal={setSingleLEAVEOpenModal} setSingleLEAVEDetailsData={setSingleLEAVEDetailsData} singleLEAVEDetailsData={singleLEAVEDetailsData} scroll={scroll} setScroll={setScroll}/>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </React.Fragment>
  );
}


// Styles
const leavesModalArea = {
  height: '195.5mm',
  width: '210mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};