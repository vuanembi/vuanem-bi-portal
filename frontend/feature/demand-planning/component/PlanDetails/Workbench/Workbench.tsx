import {
    useState,
    useEffect,
    useContext,
    Dispatch,
    SetStateAction,
} from 'react';
import { chain } from 'lodash';
import { useQuery } from 'react-query';

import { TableContainer } from '@chakra-ui/react';

import Table from './Table';

import { PlanContext } from '../../../context';
import usePlanStatus from '../../../hook/planStatus';
import { getOneItems } from '../../../service/plan';
import { PlanItem, PlanItemGroup } from '../../../service/plan-item';

type WorkbenchProps = {
    setUpdates: Dispatch<SetStateAction<number>>;
};

const Workbench = ({ setUpdates }: WorkbenchProps) => {
    const { plan, updates } = useContext(PlanContext);
    const { color, columns } = usePlanStatus(plan.status);

    const { data: planItems } = useQuery<PlanItem[]>(
        `plan[${plan.id}].items`,
        getOneItems(plan.id),
    );

    const [planItemGroups, setPlanItemGroups] = useState<
        (PlanItemGroup)[]
    >([]);

    useEffect(() => {
        const group = chain(planItems)
            .groupBy(({ item: { sku }, region }) => `${sku}-${region}`)
            .toPairs()
            .map(([skuRegion, values]) => {
                const [sku, region] = skuRegion.split('-');
                return {
                    sku,
                    region,
                    subRows: values.map((value) => ({
                        ...value,
                        sku: undefined,
                        region: undefined,
                    })),
                };
            })
            .groupBy(({ sku }) => sku)
            .toPairs()
            .map(([sku, values]) => ({
                sku,
                subRows: values.map((value) => ({
                    ...value,
                    sku: undefined,
                })),
            }))
            .value();
        
        // @ts-expect-error
        setPlanItemGroups(group);
    }, [planItems]);

    if (!planItems) {
        return null;
    }

    return (
        <TableContainer
            h="80vh"
            p={0}
            overflowY="scroll"
            borderWidth="1px"
            borderColor={color}
            fontSize="sm"
        >
            <Table columns={columns} data={planItemGroups} />
        </TableContainer>
    );
};

export default Workbench;
