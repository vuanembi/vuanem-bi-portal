import {
    Icon,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react';
import { MdLogout } from 'react-icons/md';
import { HiChevronDown } from 'react-icons/hi';

import { useAuth } from '../feature/auth/provider/auth.context';
import { User as UserProps } from '../feature/user/service/user.api';

const User = ({ user }: { user: UserProps }) => {
    const { signOut } = useAuth();

    return (
        <Menu>
            <MenuButton
                as={Button}
                rightIcon={<Icon as={HiChevronDown} />}
                variant="ghost"
                bgColor="purple.400"
                color="white"
                borderWidth="1px"
                _hover={{}}
                _active={{}}
            >
                {user.email}
            </MenuButton>
            <MenuList>
                <MenuItem
                    borderRadius="0px"
                    icon={<Icon as={MdLogout} />}
                    onClick={signOut}
                >
                    Sign out
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default User;
