import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    ModalProps,
} from '@chakra-ui/react';

type ConfirmModalProps = ModalProps & {
    title: string;
    color: string;
    onSubmit: () => void;
};

const ConfirmModal = ({
    isOpen,
    onClose,
    color,
    title,
    onSubmit,
}: ConfirmModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>Bạn chắc chưa?</ModalBody>
                <ModalFooter>
                    <Button bgColor={color} textColor="white" onClick={onSubmit}>
                        Yes
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ConfirmModal;
