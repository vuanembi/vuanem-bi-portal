import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerProps,
} from '@chakra-ui/react';

import Menu from './Menu';

type SideBarProps = Pick<DrawerProps, 'isOpen' | 'onClose'>;

const SideBar = ({ isOpen, onClose }: SideBarProps) => (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Modules</DrawerHeader>
            <DrawerBody>
                <Menu onClose={onClose}/>
            </DrawerBody>
        </DrawerContent>
    </Drawer>
);

export default SideBar;
