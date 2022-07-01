import { HStack } from '@chakra-ui/react';

import { Plan } from '../../../type';

import Info from './Info';

const Header = (plan: Plan) => (
    <HStack flex="1" justifyContent="space-between">
        <Info {...plan} />
    </HStack>
);

export default Header;
