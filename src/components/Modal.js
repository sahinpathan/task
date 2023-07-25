import { Close as CloseIcon } from '@mui/icons-material';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';

const Modal = ({
  children,
  title,
  onCancel,
  fullWidth = true,
  sx,
}) => {
  return (

    <Dialog open onClose={onCancel} fullWidth={fullWidth} maxWidth="md" className='add-formBuilder-form'>
      <div className='modal-header'>
        {title && (
          <DialogTitle>
            {title}
            {onCancel ? (
              <IconButton
                aria-label="close"
                onClick={onCancel}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                }}
              >
                <CloseIcon />
              </IconButton>
            ) : null}
          </DialogTitle>
        )}
      </div>
      <DialogContent className='add-formBuilder-form-details' sx={sx}>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
