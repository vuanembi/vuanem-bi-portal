import {
    useState,
    useEffect,
    useContext,
    Dispatch,
    SetStateAction,
    ChangeEventHandler,
} from 'react';

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

import { ApiContext } from '../context';

type Vendor = {
    id: string;
    name: string;
};

const PlanForm = ({ isOpen, onClose }: ModalProps) => {
    const [vendors, setVendors] = useState<Vendor[]>([]);

    const apiClient = useContext(ApiContext);

    useEffect(() => {
        apiClient.get<Vendor[]>('/vendor').then(({ data }) => setVendors(data));
    });

    const vendorOptions = vendors.map((vendor) => (
        <option key={vendor.id} value={vendor.id}>
            {vendor.name}
        </option>
    ));

    const [name, setName] = useState<string | undefined>(undefined);
    const [vendor, setVendor] = useState<number | undefined>(undefined);

    const handleChange =
        (
            setter: Dispatch<SetStateAction<any>>,
            parser: (value: string) => any = (v) => v,
        ): ChangeEventHandler<HTMLInputElement | HTMLSelectElement> =>
        (e) =>
            setter(parser(e.currentTarget.value));

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log({ name, vendor });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <form>
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
                                <FormLabel htmlFor="vendor">Country</FormLabel>
                                <Select
                                    id="vendor"
                                    placeholder="Select Vendor"
                                    value={vendor}
                                    onChange={handleChange(setVendor, parseInt)}
                                >
                                    {vendorOptions}
                                </Select>
                            </FormControl>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            type="submit"
                            onClick={handleSubmit}
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
