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

const Search: FC<InputProps> = ({ borderColor, value, onChange }) => (
    <Flex p={4} borderWidth={1} borderColor={borderColor}>
        <InputGroup>
            <InputLeftElement>
                <Icon as={FaSearch} />
            </InputLeftElement>
            <Input
                placeholder="Search"
                value={value}
                onChange={onChange}
                borderColor={borderColor}
            />
        </InputGroup>
    </Flex>
);

export default Search;
