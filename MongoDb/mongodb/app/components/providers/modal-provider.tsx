'use client';
import { FunctionComponent, ReactNode, createContext, useContext, useState } from 'react';
import {BaseModal} from '../modal/modal'


interface ModalContextType {
    isModalOpen: boolean;
    modalContent: ReactNode | null;
    modalTitle: string;
    openModal: (content: ReactNode, title: string) => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = (): ModalContextType => {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};

interface ModalProviderProps {
    children: ReactNode;
}

export const ModalProvider: FunctionComponent<ModalProviderProps> = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<ReactNode | null>(null);
    const [modalTitle, setModalTitle] = useState<string>('');

    const openModal = (content: ReactNode, title: string) => {
        setModalContent(content);
        setModalTitle(title);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent(null);
    };

    return (
        <ModalContext.Provider value={{ isModalOpen, modalContent, modalTitle, openModal, closeModal }}>
            <BaseModal />
            {children}
        </ModalContext.Provider>
    );
};