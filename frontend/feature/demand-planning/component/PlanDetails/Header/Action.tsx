import { useRouter } from 'next/router';
import { useContext } from 'react';
import { VStack, Button, useDisclosure } from '@chakra-ui/react';
import { useMutation } from 'react-query';

import ConfirmModal from './ConfirmModal';

import usePlanStatus from '../../../hook/planStatus';
import { PlanContext } from '../../../context';

const Action = () => {
    const { plan } = useContext(PlanContext);
    const { id, status } = plan;
    const { color, action } = usePlanStatus(status);
    const { isOpen, onClose, onToggle } = useDisclosure();
    const router = useRouter();

    const { isLoading, mutate } = useMutation(action.handler, {
        onSuccess: () => {
            onClose();
            router.reload();
        },
        onError: (err) => {
            console.log(err);
        },
    });

    return (
        <VStack flex="1" alignItems="stretch">
            {action.label ? (
                <Button
                    color="white"
                    bgColor={color}
                    onClick={() => onToggle()}
                    isLoading={isLoading}
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
                title={action.label || 'Confirm'}
                onSubmit={() => mutate(id)}
            >
                {}
            </ConfirmModal>
        </VStack>
    );
};

export default Action;
