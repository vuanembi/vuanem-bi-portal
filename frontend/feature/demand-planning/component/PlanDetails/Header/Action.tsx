import { useRouter } from 'next/router';

import { useState, useContext } from 'react';

import { VStack, Button, useDisclosure } from '@chakra-ui/react';

import ConfirmModal from './ConfirmModal';

import usePlanStatus from '../../../hook/planStatus';
import { PlanContext } from '../../../context';

const Action = () => {
    const { plan } = useContext(PlanContext);

    const { id, status } = plan;
    const { color, action } = usePlanStatus(status);

    const { isOpen, onClose, onToggle } = useDisclosure();

    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const onAction = () => {
        onClose();
        setLoading(true);
        action?.handler(id).then(() => {
            setLoading(false);
            router.reload();
        });
    };

    return (
        <VStack flex="1" alignItems="stretch">
            {action ? (
                <Button
                    color="white"
                    bgColor={color}
                    onClick={() => onToggle()}
                    isLoading={loading}
                >
                    {action.label}
                </Button>
            ) : (
                <Button isDisabled bgColor={color} />
            )}
            <Button color="white" bgColor="red.400">
                Delete
            </Button>
            <ConfirmModal
                isOpen={isOpen}
                onClose={onClose}
                title={action?.label || 'Confirm'}
                onSubmit={onAction}
            >
                {}
            </ConfirmModal>
        </VStack>
    );
};

export default Action;
