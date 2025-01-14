import { Dispatch, SetStateAction, Fragment, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { BONUSLISTViewInterface } from '@/types/types-payroll-eoy';
import BONUSLISTModalComponent from './inner-modals/bonus-list-modal-component';


interface SingleBONUSLISTInterface {
    singleBONUSLISTOpenModal: boolean; 
    setSingleBONUSLISTOpenModal: Dispatch<SetStateAction<boolean>>;
    singleBONUSLISTDetailsData: BONUSLISTViewInterface;
    setSingleBONUSLISTDetailsData: Dispatch<SetStateAction<BONUSLISTViewInterface>>;
}

export default function ViewBONUSLISTSingleModal(props: SingleBONUSLISTInterface) {
    const {singleBONUSLISTOpenModal, setSingleBONUSLISTOpenModal, setSingleBONUSLISTDetailsData, singleBONUSLISTDetailsData} = props;
  const [scroll, setScroll] = useState<boolean>(true);
  return (
    <Fragment>
      <Transition in={singleBONUSLISTOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setSingleBONUSLISTOpenModal(false);
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
              ...BONUSLISTModalArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                overflow: 'auto',
            }}
        >
          <BONUSLISTModalComponent 
            setSingleBONUSLISTDetailsData={setSingleBONUSLISTDetailsData} 
            singleBONUSLISTDetailsData={singleBONUSLISTDetailsData} 
            setSingleBONUSLISTOpenModal={setSingleBONUSLISTOpenModal}
          />
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}


// Styles
const BONUSLISTModalArea = {
  height: '110mm',
  width: '210mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};