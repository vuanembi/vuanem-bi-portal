import { FC } from 'react';

import {
    Flex,
    InputGroup,
    InputLeftElement,
    Input,
    Icon,
    InputProps,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

const Search: FC<InputProps> = ({ value, onChange }) => (
    <Flex w="full" p={4} borderWidth={1}>
        <InputGroup>
            <InputLeftElement>
                <Icon as={FaSearch} />
            </InputLeftElement>
            <Input placeholder="Search" value={value} onChange={onChange} />
        </InputGroup>
    </Flex>
);

export default Search;
