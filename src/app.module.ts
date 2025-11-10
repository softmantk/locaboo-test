import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TasksModule } from './modules/tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [ConfigModule.forRoot(), TasksModule, UsersModule],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {}
