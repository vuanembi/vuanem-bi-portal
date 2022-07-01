import { useState, useEffect, Dispatch, SetStateAction } from 'react';

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
    Select,
} from '@chakra-ui/react';

import dayjs from 'dayjs';

import PopoverDatePicker from './DatePicker';

import { apiClient } from '../../../../page-lib/demand-planning';

type Vendor = {
    id: string;
    name: string;
};

type PlanFormProps = ModalProps & {
    callback: () => void;
};

const PlanForm = ({ isOpen, onClose, callback }: PlanFormProps) => {
    const [vendors, setVendors] = useState<Vendor[]>([]);

    const getVendors = () =>
        apiClient.get<Vendor[]>('/vendor').then(({ data }) => setVendors(data));

    useEffect(() => {
        getVendors();
    }, []);

    const [name, setName] = useState<string | undefined>(undefined);
    const [vendorId, setVendor] = useState<number | undefined>(undefined);
    const [startOfForecastWeek, setStartOfForecastWeek] = useState<
        string | undefined
    >(dayjs().format('YYYY-MM-DD'));

    const handleChange =
        (
            setter: Dispatch<SetStateAction<any>>,
            parser: (value: any) => any = (v) => v,
        ) =>
        (e: any) =>
            setter(parser(e.currentTarget.value));

    const handleSubmit = (e: any) => {
        e.preventDefault();
        apiClient
            .post('/plan', { name, vendorId, startOfForecastWeek })
            .then(() => {
                callback();
                onClose();
            });
    };

    const vendorOptions = vendors.map((vendor) => (
        <option key={vendor.id} value={vendor.id}>
            {vendor.name}
        </option>
    ));

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
                                    value={name}
                                    onChange={handleChange(setName)}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="vendor">Vendor</FormLabel>
                                <Select
                                    id="vendor"
                                    placeholder="Select Vendor"
                                    value={vendorId}
                                    onChange={handleChange(setVendor, parseInt)}
                                >
                                    {vendorOptions}
                                </Select>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="vendor">
                                    Start of Forecast Week
                                </FormLabel>
                                <PopoverDatePicker
                                    date={startOfForecastWeek}
                                    setDate={setStartOfForecastWeek}
                                />
                            </FormControl>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" type="submit">
                            Create
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default PlanForm;
