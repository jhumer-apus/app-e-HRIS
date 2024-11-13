import { Dispatch, SetStateAction, Fragment, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { CUTOFFPERIODViewInterface } from '@/types/types-pages';
import CUTOFFPERIODModalComponent from './inner-modals/cutoff-period-modal-component';


interface SingleCUTOFFPERIODInterface {
    singleCUTOFFPERIODOpenModal: boolean; 
    setSingleCUTOFFPERIODOpenModal: Dispatch<SetStateAction<boolean>>;
    singleCUTOFFPERIODDetailsData: CUTOFFPERIODViewInterface;
    setSingleCUTOFFPERIODDetailsData: Dispatch<SetStateAction<CUTOFFPERIODViewInterface>>;
}

export default function ViewCUTOFFPERIODSingleModal(props: SingleCUTOFFPERIODInterface) {
    const {singleCUTOFFPERIODOpenModal, setSingleCUTOFFPERIODOpenModal, setSingleCUTOFFPERIODDetailsData, singleCUTOFFPERIODDetailsData} = props;
  const [scroll, setScroll] = useState<boolean>(true);
  return (
    <Fragment>
      <Transition in={singleCUTOFFPERIODOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setSingleCUTOFFPERIODOpenModal(false);
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
              ...CUTOFFPERIODModalArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                overflow: 'auto',
            }}
        >
          <CUTOFFPERIODModalComponent setSingleCUTOFFPERIODOpenModal={setSingleCUTOFFPERIODOpenModal} setSingleCUTOFFPERIODDetailsData={setSingleCUTOFFPERIODDetailsData} singleCUTOFFPERIODDetailsData={singleCUTOFFPERIODDetailsData} scroll={scroll} setScroll={setScroll}/>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}


// Styles
const CUTOFFPERIODModalArea = {
  height: '128.5mm',
  width: '210mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};