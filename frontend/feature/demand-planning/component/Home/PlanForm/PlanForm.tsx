import { FormEventHandler, useState } from 'react';
import dayjs from 'dayjs';
import {
    VStack,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    ModalProps,
    FormControl,
    FormLabel,
    Input,
    useToast,
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { useQuery, useMutation } from 'react-query';

import { Class, get } from '../../../../netsuite/class';
import { CreatePlanDto, create } from '../../../service/plan';

import PopoverDatePicker from './DatePicker';

type PlanFormProps = ModalProps & {
    callback: () => void;
};

const PlanForm = ({ isOpen, onClose, callback }: PlanFormProps) => {
    const toast = useToast();
    const { data: classes = [] } = useQuery<Class[]>('classes', get);
    const { isLoading, mutate } = useMutation(create, {
        onSuccess: () => {
            onClose();
            toast({
                title: 'Plan Created',
                status: 'success',
            });
            callback();
        },
        onError: (err) => {
            console.log(err);
            toast({
                title: 'Error',
                status: 'error',
            });
        },
    });

    const [formState, setFormState] = useState<CreatePlanDto>({
        name: '',
        startOfForecastWeek: dayjs().format('YYYY-MM-DD'),
        classes: [],
    });

    const classOptions = classes.map((class_) => ({
        label: class_.name,
        value: class_.id,
    }));

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        mutate(formState);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={handleSubmit}>
                    <ModalHeader>New Plan</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack>
                            <FormControl isRequired>
                                <FormLabel htmlFor="name">Name</FormLabel>
                                <Input
                                    id="name"
                                    value={formState.name}
                                    onChange={(e) =>
                                        setFormState({
                                            ...formState,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="vendor">
                                    Start of Forecast Week
                                </FormLabel>
                                <PopoverDatePicker
                                    date={formState.startOfForecastWeek}
                                    setDate={(value) =>
                                        value &&
                                        setFormState({
                                            ...formState,
                                            startOfForecastWeek: value,
                                        })
                                    }
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="classes">Classes</FormLabel>
                                <Select
                                    isMulti
                                    id="classes"
                                    options={classOptions}
                                    onChange={(values) =>
                                        setFormState({
                                            ...formState,
                                            classes: values.map(
                                                ({ value }) => value,
                                            ),
                                        })
                                    }
                                />
                            </FormControl>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            type="submit"
                            isLoading={isLoading}
                        >
                            Create
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default PlanForm;
