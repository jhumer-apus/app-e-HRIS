import { useState, Fragment } from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import CreateOBTModal from './ui-components/create-obt-modal-ui';


export default function CreateOBTComponent() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Fragment>
      <Button
          variant="solid"
          color="primary"
          onClick={() => {
            setOpen(true);
          }}
        >
          + CREATE OFFICIAL BUSINESS TRIP/TIME
      </Button>
      <Transition in={open} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
            setOpen(false);
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
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
            }}
        >
          <CreateOBTModal setOpen={setOpen}/>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}