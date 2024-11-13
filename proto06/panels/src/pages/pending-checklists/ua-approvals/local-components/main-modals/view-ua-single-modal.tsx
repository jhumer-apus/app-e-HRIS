import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { UAViewInterface, ViewPayrollPayPerEmployee } from '@/types/types-pages';
import UAModalComponent from './inner-modals/ua-modal-component';
import { HandleModalAction } from '@/store/actions/components';


interface ViewUASingleModalInterface {
    singleUAOpenModal: boolean; 
    setSingleUAOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    singleUADetailsData: UAViewInterface;
    setSingleUADetailsData: React.Dispatch<React.SetStateAction<UAViewInterface>>;
}

export default function ViewUASingleModal(props: ViewUASingleModalInterface) {
  const {singleUAOpenModal, setSingleUAOpenModal, setSingleUADetailsData, singleUADetailsData} = props;
  const [scroll, setScroll] = React.useState<boolean>(true);

  return (
    <React.Fragment>
      <Transition in={singleUAOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => { setSingleUAOpenModal(false) }}
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
              ...uaModalArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                overflow: 'auto',
            }}
        >
          <UAModalComponent setSingleUAOpenModal={setSingleUAOpenModal} setSingleUADetailsData={setSingleUADetailsData} singleUADetailsData={singleUADetailsData} scroll={scroll} setScroll={setScroll}/>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </React.Fragment>
  );
}


// Styles
const uaModalArea = {
  height: '195.5mm',
  width: '210mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};