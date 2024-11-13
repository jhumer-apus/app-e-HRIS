import { Dispatch, SetStateAction, Fragment, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { LEAVECREDITViewInterface } from '@/types/types-pages';
import LEAVECREDITModalComponent from './inner-modals/leave-credit-modal-component';


interface SingleLEAVECREDITInterface {
    singleLEAVECREDITOpenModal: boolean; 
    setSingleLEAVECREDITOpenModal: Dispatch<SetStateAction<boolean>>;
    singleLEAVECREDITDetailsData: LEAVECREDITViewInterface;
    setSingleLEAVECREDITDetailsData: Dispatch<SetStateAction<LEAVECREDITViewInterface>>;
}

export default function ViewLEAVECREDITSingleModal(props: SingleLEAVECREDITInterface) {
    const {singleLEAVECREDITOpenModal, setSingleLEAVECREDITOpenModal, setSingleLEAVECREDITDetailsData, singleLEAVECREDITDetailsData} = props;
  const [scroll, setScroll] = useState<boolean>(true);
  return (
    <Fragment>
      <Transition in={singleLEAVECREDITOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setSingleLEAVECREDITOpenModal(false);
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
              ...LEAVECREDITModalArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                overflow: 'auto',
            }}
        >
          <LEAVECREDITModalComponent setSingleLEAVECREDITOpenModal={setSingleLEAVECREDITOpenModal} setSingleLEAVECREDITDetailsData={setSingleLEAVECREDITDetailsData} singleLEAVECREDITDetailsData={singleLEAVECREDITDetailsData} scroll={scroll} setScroll={setScroll}/>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}


// Styles
const LEAVECREDITModalArea = {
  height: '128.5mm',
  width: '210mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};