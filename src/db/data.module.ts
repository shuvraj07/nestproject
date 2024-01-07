/* eslint-disable prettier/prettier */
// your.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'database-3.ccewtlepn5vc.ap-south-1.rds.amazonaws.com',
            port: 3306,
            username: 'admin',
            password: 'Machine123456',
            database: 'naya',
            entities: [User], // Make sure to include your entities here
            synchronize: true,
    }),
  ],
})
export class YourModule {}
