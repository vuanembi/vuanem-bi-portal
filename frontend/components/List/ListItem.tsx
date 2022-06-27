import { chakra, HStack, Icon, Text, useRadio } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { FaChevronRight } from 'react-icons/fa';

import type { Entity } from '../../common/bigquery';

export type ListItemProps = {
    item: Entity;
    iconFn: (item: Entity) => IconType;
};

const ListItem = ({ item, iconFn, ...radioProps }: ListItemProps) => {
    const { state, getInputProps, getCheckboxProps, htmlProps, getLabelProps } =
        useRadio(radioProps);

    const bgColor = state.isChecked ? 'blue.500' : 'transparent';
    const textColor = state.isChecked ? 'white' : 'black';

    return (
        <chakra.label w="full" {...htmlProps} cursor="pointer">
            <input {...getInputProps({})} hidden />
            <HStack
                p={4}
                px={7}
                borderWidth={1}
                bgColor={bgColor}
                alignContent="stretch"
                {...getCheckboxProps()}
            >
                <Icon as={iconFn(item)} fill={textColor} />
                <Text pl={4} userSelect="none" flex="1" color={textColor}>
                    {item.id.slice(0, 25)}
                </Text>
                <Icon
                    as={FaChevronRight}
                    fill={textColor}
                    {...getLabelProps()}
                />
            </HStack>
        </chakra.label>
    );
};

export default ListItem;
