import { Dispatch, SetStateAction, Fragment, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { ONBOARDINGSTATUSViewInterface } from '@/types/types-employee-and-applicants';
import ONBOARDINGSTATUSModalComponent from './inner-modals/onboarding-status-modal-component';


interface SingleONBOARDINGSTATUSInterface {
    singleONBOARDINGSTATUSOpenModal: boolean; 
    setSingleONBOARDINGSTATUSOpenModal: Dispatch<SetStateAction<boolean>>;
    singleONBOARDINGSTATUSDetailsData: ONBOARDINGSTATUSViewInterface;
    setSingleONBOARDINGSTATUSDetailsData: Dispatch<SetStateAction<ONBOARDINGSTATUSViewInterface>>;
}

export default function ViewONBOARDINGSTATUSSingleModal(props: SingleONBOARDINGSTATUSInterface) {
    const {singleONBOARDINGSTATUSOpenModal, setSingleONBOARDINGSTATUSOpenModal, setSingleONBOARDINGSTATUSDetailsData, singleONBOARDINGSTATUSDetailsData} = props;
  const [scroll, setScroll] = useState<boolean>(true);
  return (
    <Fragment>
      <Transition in={singleONBOARDINGSTATUSOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setSingleONBOARDINGSTATUSOpenModal(false);
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
              ...ONBOARDINGSTATUSModalArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                overflow: 'auto',
            }}
        >
          <ONBOARDINGSTATUSModalComponent 
            setSingleONBOARDINGSTATUSDetailsData={setSingleONBOARDINGSTATUSDetailsData} 
            singleONBOARDINGSTATUSDetailsData={singleONBOARDINGSTATUSDetailsData} 
            setSingleONBOARDINGSTATUSOpenModal={setSingleONBOARDINGSTATUSOpenModal}
          />
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}


// Styles
const ONBOARDINGSTATUSModalArea = {
  height: '195.5mm',
  width: '210mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};