'use client';
import Modal from '@mui/material/Modal';

import * as Styles from './style';
import { useModal } from '../providers/modal-provider';

export const BaseModal = () => {
    const modal = useModal();
    if (!modal) {
        return null;
    }
    return (
        modal && (
            <Modal
                aria-describedby='modal-modal-description'
                aria-labelledby='modal-modal-title'
                open={modal.isModalOpen}
                onClose={modal.closeModal}
            >
                <Styles.ModalContainer>
                    <Styles.ModalHeader>
                        {modal.modalTitle}
                        <Styles.CloseButton onClick={() => modal.closeModal()} />
                    </Styles.ModalHeader>
                    {modal.modalContent}
                </Styles.ModalContainer>
            </Modal>
        )
    );
};

export default BaseModal;