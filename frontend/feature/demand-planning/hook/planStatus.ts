export type PlanStatusStyle = {
    label: string;
    color: string;
};

export const planStatuses: { [status: string]: PlanStatusStyle } = {
    draft: {
        label: 'Draft',
        color: 'teal.300',
    },
    forecasted: {
        label: 'Forecasted',
        color: 'blue.300',
    },
    reviewed: {
        label: 'Reviewed',
        color: 'purple.300',
    },
};

const usePlanStatus = (status: string): PlanStatusStyle =>
    planStatuses[status];


export default usePlanStatus;
