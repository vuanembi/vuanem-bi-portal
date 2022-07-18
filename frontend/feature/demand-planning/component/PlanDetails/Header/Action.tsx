import { useRouter } from 'next/router';
import { VStack, Button, useDisclosure } from '@chakra-ui/react';
import { useMutation } from 'react-query';

import ConfirmModal from './ConfirmModal';

import { usePlan } from '../../../service/plan.context';

const Action = () => {
    const { plan, config } = usePlan();
    const { isOpen, onClose, onToggle } = useDisclosure();
    const router = useRouter();

    const { isLoading, mutate } = useMutation(config.action.handler, {
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
            {config.action.label ? (
                <Button
                    color="white"
                    bgColor={config.color}
                    onClick={() => onToggle()}
                    isLoading={isLoading}
                >
                    {config.action.label}
                </Button>
            ) : (
                <Button isDisabled bgColor={config.color} />
            )}
            <Button color="white" bgColor="red.400">
                Delete
            </Button>
            <ConfirmModal
                isOpen={isOpen}
                onClose={onClose}
                color={config.color}
                title={config.action.label || 'Confirm'}
                onSubmit={() => mutate(plan.id)}
            >
                {}
            </ConfirmModal>
        </VStack>
    );
};

export default Action;
