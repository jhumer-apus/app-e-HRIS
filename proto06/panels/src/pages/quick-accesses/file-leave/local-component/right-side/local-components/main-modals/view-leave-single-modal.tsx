import { Dispatch, SetStateAction, Fragment, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { LEAVEViewInterface } from '@/types/types-pages';
import LEAVEModalComponent from './inner-modals/leave-modal-component';


interface SingleLEAVEInterface {
    singleLEAVEOpenModal: boolean; 
    setSingleLEAVEOpenModal: Dispatch<SetStateAction<boolean>>;
    singleLEAVEDetailsData: LEAVEViewInterface;
    setSingleLEAVEDetailsData: Dispatch<SetStateAction<LEAVEViewInterface>>;
}

export default function ViewLEAVESingleModal(props: SingleLEAVEInterface) {
    const {singleLEAVEOpenModal, setSingleLEAVEOpenModal, setSingleLEAVEDetailsData, singleLEAVEDetailsData} = props;
  const [scroll, setScroll] = useState<boolean>(true);
  return (
    <Fragment>
      <Transition in={singleLEAVEOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setSingleLEAVEOpenModal(false);
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
              ...LEAVEModalArea,
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
    </Fragment>
  );
}


// Styles
const LEAVEModalArea = {
  height: '160mm',
  width: '210mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};