export type Plan = {
    id: number;
    name: string;
    startOfForecastWeek: string;
    status: string;
    vendor: {
        name: string;
    };
    createdAt: string;
    updatedAt: string;
};

export type CreatePlanDto = {
    name: string
    startOfForecastWeek: string;
    classes: number[]
}
