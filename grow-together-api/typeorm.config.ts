import { User } from "src/user/entities/user.entity";
import { ConnectionOptions } from "typeorm";

export const typeOrmConfig:ConnectionOptions = {
    type:'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'mypassword',
    database: "GrowTogetherDB",
    entities:[__dirname + '/**/entities/*.entity{.ts,.js}'],
    synchronize:true
}