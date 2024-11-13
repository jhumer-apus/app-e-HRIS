import { Dispatch, SetStateAction, Fragment, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { RANKViewInterface } from '@/types/types-pages';
import RANKModalComponent from './inner-modals/rank-modal-component';


interface SingleRANKInterface {
    singleRANKOpenModal: boolean; 
    setSingleRANKOpenModal: Dispatch<SetStateAction<boolean>>;
    singleRANKDetailsData: RANKViewInterface;
    setSingleRANKDetailsData: Dispatch<SetStateAction<RANKViewInterface>>;
}

export default function ViewRANKSingleModal(props: SingleRANKInterface) {
  const {singleRANKOpenModal, setSingleRANKOpenModal, setSingleRANKDetailsData, singleRANKDetailsData} = props;
  const [scroll, setScroll] = useState<boolean>(true);
  return (
    <Fragment>
      <Transition in={singleRANKOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setSingleRANKOpenModal(false);
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
              ...RANKModalArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                overflow: 'auto',
                height: 'auto',
            }}
        >
          <RANKModalComponent 
            setSingleRANKDetailsData={setSingleRANKDetailsData} 
            singleRANKDetailsData={singleRANKDetailsData} 
            setSingleRANKOpenModal={setSingleRANKOpenModal}
            />
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}


// Styles
const RANKModalArea = {
  height: '108.5mm',
  width: '190mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};