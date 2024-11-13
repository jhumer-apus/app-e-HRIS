import { Dispatch, SetStateAction, useState, Fragment} from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { UAViewInterface } from '@/types/types-pages';
import UAModalComponent from './inner-modals/ua-modal-component';


interface SingleUAInterface {
    singleUAOpenModal: boolean; 
    setSingleUAOpenModal: Dispatch<SetStateAction<boolean>>;
    singleUADetailsData: UAViewInterface;
    setSingleUADetailsData: Dispatch<SetStateAction<UAViewInterface>>;
}

export default function ViewUASingleModal(props: SingleUAInterface) {
  const {singleUAOpenModal, setSingleUAOpenModal, setSingleUADetailsData, singleUADetailsData} = props;
  const [scroll, setScroll] = useState<boolean>(true);
  return (
    <Fragment>
      <Transition in={singleUAOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setSingleUAOpenModal(false);
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
              ...UAModalArea,
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
    </Fragment>
  );
}


// Styles
const UAModalArea = {
  height: '160mm',
  width: '210mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};