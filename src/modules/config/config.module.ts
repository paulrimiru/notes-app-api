import { Module } from '@nestjs/common';
import { ConfigService } from '@/modules/config/config.service';

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(`.env`),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
