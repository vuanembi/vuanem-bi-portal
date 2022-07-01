export type PlanStatusStyle = {
    label: string;
    color: string;
    action?: {
        label: string;
        handler: () => void;
    };
};

export const planStatuses: { [status: string]: PlanStatusStyle } = {
    draft: {
        label: 'Draft',
        color: 'teal.300',
        action: {
            label: 'Forecast',
            handler: () => {},
        },
    },
    forecasted: {
        label: 'Forecasted',
        color: 'blue.300',
        action: {
            label: 'Review',
            handler: () => {},
        },
    },
    reviewed: {
        label: 'Reviewed',
        color: 'purple.300',
    },
};

const usePlanStatus = (status: string): PlanStatusStyle => planStatuses[status];

export default usePlanStatus;
