import { useState, useEffect, Dispatch } from 'react';

import { VStack, Skeleton, useRadioGroup } from '@chakra-ui/react';

import ListItem, { ListItemProps } from './ListItem';
import Search from './Search';

type ListProps = {
    items: ListItemProps['item'][];
    iconFn: ListItemProps['iconFn'];
    loaded: boolean;
    handleSelect: Dispatch<string>;
};

const List = ({ items, iconFn, loaded, handleSelect }: ListProps) => {
    const [itemList, setItemList] = useState(items);
    const [searchTerm, setSearchTerm] = useState('');

    const { getRadioProps, getRootProps } = useRadioGroup({
        onChange: handleSelect,
    });

    useEffect(() => {
        setSearchTerm('');
    }, [items]);

    useEffect(() => {
        setItemList(
            items.filter(({ id }) =>
                id.toLowerCase().match(searchTerm.toLowerCase())
            )
        );
    }, [items, searchTerm]);

    return (
        <VStack maxH="full" flex="0 0 33%" alignItems="stretch">
            <Search
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <VStack overflowY="auto">
                <Skeleton w="full" isLoaded={loaded} height="800px">
                    <VStack overflowY="auto" {...getRootProps()}>
                        {itemList.map((item) => (
                            <ListItem
                                key={item.id}
                                item={item}
                                iconFn={iconFn}
                                {...getRadioProps({ value: item.id })}
                            />
                        ))}
                    </VStack>
                </Skeleton>
            </VStack>
        </VStack>
    );
};

export default List;
