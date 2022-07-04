import { Injectable } from '@nestjs/common';
import { v1beta1 } from '@google-cloud/automl';

@Injectable()
export class AutoMLProvider {
    public client: v1beta1.PredictionServiceClient;
    public projectId: string;

    constructor() {
        this.client = new v1beta1.PredictionServiceClient();
    }

    async forecastPlanItems(values: number[]) {
        const projectId = await this.client.getProjectId();

        const prediction = await this.client
            .predict({
                name: this.client.modelPath(
                    projectId,
                    'us-central1',
                    'TBL7796330188815466496',
                ),
                payload: {
                    row: {
                        values: values.map((numberValue) => ({ numberValue })),
                    },
                },
            })
            .then(([response]) => <number>response.payload.pop().tables.value)
            .catch((err) => {
                console.log(err);
                return 0;
            });

        return prediction;
    }
}
