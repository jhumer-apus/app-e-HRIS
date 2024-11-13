import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { OBTViewInterface, ViewPayrollPayPerEmployee } from '@/types/types-pages';
import OBTModalComponent from './inner-modals/obt-modal-component';
import { RootState } from '@/store/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { HandleModalAction } from '@/store/actions/components';
import { IconButton } from '@mui/material';
import { XMarkIcon } from '@heroicons/react/24/solid';


interface SinglePayslipInterface {
    singleOBTOpenModal: boolean; 
    setSingleOBTOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    singleOBTDetailsData: OBTViewInterface;
    setSingleOBTDetailsData: React.Dispatch<React.SetStateAction<OBTViewInterface>>;
}

export default function ViewOBTSingleModal(props: SinglePayslipInterface) {
  const {singleOBTOpenModal, setSingleOBTOpenModal, setSingleOBTDetailsData, singleOBTDetailsData} = props;
  const [scroll, setScroll] = React.useState<boolean>(true);
  const viewObtModal = useSelector((state:RootState) => state.component.viewObtModal)
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <Transition in={viewObtModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          // setSingleOBTOpenModal(false);
          dispatch(HandleModalAction({
            name: "viewObtModal",
            value: false
          }))
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
              ...paySlipArea,
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
          <OBTModalComponent setSingleOBTDetailsData={setSingleOBTDetailsData} singleOBTDetailsData={singleOBTDetailsData} scroll={scroll} setScroll={setScroll}/>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </React.Fragment>
  );
}


// Styles
const paySlipArea = {
  height: '208.5mm',
  width: '210mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};