import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: { origin: true, credentials: true },
    });
    app.use(cookieParser());
    app.setGlobalPrefix('api');

    const config = new DocumentBuilder()
        .setTitle('Vuanem BI Portal')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(5000);
}
bootstrap();
