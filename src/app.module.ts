import { Module } from '@nestjs/common';
import { UsecasesModule } from './use-cases/usecases.module';
import { IfraModule } from './infra/infra.module';


@Module({
  imports: [IfraModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
