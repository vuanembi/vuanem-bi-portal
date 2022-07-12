import 'react-tabulator/css/tabulator_bootstrap3.min.css';

import { ReactTabulator } from 'react-tabulator';

import usePlanStatus from '../../../hook/planStatus';

const Table = ({ plan, columns, data }) => {
    console.log(data);
    const { color } = usePlanStatus(plan.status);

    return (
        <ReactTabulator
            id="planItemTable"
            columns={columns}
            data={data}
            layout="fitData"
            options={{ height: '80%' }}
        />
    );
};

export default Table;
