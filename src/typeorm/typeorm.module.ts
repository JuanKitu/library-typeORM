import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TYPE_ORM_MODULE_OPTIONS } from './constants/typeorm.constanst';
import { TypeOrmModule } from '@nestjs/typeorm';
@Global()
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: async (options) => options,
      inject: [TYPE_ORM_MODULE_OPTIONS],
    }),
  ],
  providers: [
    {
      provide: TYPE_ORM_MODULE_OPTIONS,
      useFactory: (configService: ConfigService) =>
        configService.get('config.database.typeorm'),
      inject: [ConfigService],
    },
  ],
  exports: [TypeOrmModule, TYPE_ORM_MODULE_OPTIONS],
})
export class TypeormClientModule {
  static forFeature(features): DynamicModule {
    return TypeOrmModule.forFeature(features);
  }
}
