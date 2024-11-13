import { Dispatch, SetStateAction, Fragment, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { LEAVETYPEViewInterface } from '@/types/types-pages';
import LEAVETYPEModalComponent from './inner-modals/leave-type-modal-component';


interface SingleLEAVETYPEInterface {
    singleLEAVETYPEOpenModal: boolean; 
    setSingleLEAVETYPEOpenModal: Dispatch<SetStateAction<boolean>>;
    singleLEAVETYPEDetailsData: LEAVETYPEViewInterface;
    setSingleLEAVETYPEDetailsData: Dispatch<SetStateAction<LEAVETYPEViewInterface>>;
}

export default function ViewLEAVETYPESingleModal(props: SingleLEAVETYPEInterface) {
    const {singleLEAVETYPEOpenModal, setSingleLEAVETYPEOpenModal, setSingleLEAVETYPEDetailsData, singleLEAVETYPEDetailsData} = props;
  const [scroll, setScroll] = useState<boolean>(true);
  return (
    <Fragment>
      <Transition in={singleLEAVETYPEOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setSingleLEAVETYPEOpenModal(false);
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
              ...LEAVETYPEModalArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                overflow: 'auto',
            }}
        >
          <LEAVETYPEModalComponent setSingleLEAVETYPEOpenModal={setSingleLEAVETYPEOpenModal} setSingleLEAVETYPEDetailsData={setSingleLEAVETYPEDetailsData} singleLEAVETYPEDetailsData={singleLEAVETYPEDetailsData} scroll={scroll} setScroll={setScroll}/>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}


// Styles
const LEAVETYPEModalArea = {
  height: '90mm',
  width: '210mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};