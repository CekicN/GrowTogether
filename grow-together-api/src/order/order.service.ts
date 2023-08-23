import { BadRequestException, Injectable } from '@nestjs/common';
import { orderDto } from './DTOs/order.dto';
import { emailDto } from './DTOs/email.dto';
import { UserService } from 'src/user/user.service';
import { PlantService } from 'src/plant/plant.service';
import { Order } from './entities/order.entity';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { google } from 'googleapis';
import { Options } from 'nodemailer/lib/smtp-transport';
@Injectable()
export class OrderService {

    constructor(
        private userService:UserService, 
        private plantService:PlantService,
        private readonly configService: ConfigService,
        private readonly mailerService: MailerService
        ){}
    async addOrder(orderDto:orderDto)
    {
        const user = await this.userService.getUserByEmail(orderDto.email);
        if(user === null)
            throw new BadRequestException("user not found");

        const plant = await this.plantService.getPlantById(orderDto.plantId);
        if(plant === null)
            throw new BadRequestException("plant not found");
        let order = new Order();
        order.plant = plant;
        order.user = user;
        order.quantity = orderDto.quantity;

        const userEmail:string = await this.plantService.getUserEmail(orderDto.plantId);
        Order.save(order);
        // const content = `${orderDto.email} order a ${plant.name}, quantity: ${orderDto.quantity}`;
        // console.log(plant.user);
        // const email:emailDto = {
            // from:orderDto.email,
            // to:userEmail,
            // content
        // } 
        // this.sendMail(email);
    }

    private async setTransport() {
        console.log(this.configService.get('CLIENT_ID'))
        const OAuth2 = google.auth.OAuth2;
        const oauth2Client = new OAuth2(
          process.env.CLIENT_ID,
          process.env.CLIENT_SECRET,
          'https://developers.google.com/oauthplayground',
        ); 

        oauth2Client.setCredentials({
            refresh_token: process.env.REFRESH_TOKEN,
        });

        const accessToken: string = await new Promise((resolve, reject) => {
            oauth2Client.getAccessToken((err, token) => {
              if (err) {
                reject('Failed to create access token');
              }
              resolve(token);
            });
          });

          const config: Options = {
            service: 'gmail',
            auth: {
              type: 'OAuth2',
              user: this.configService.get('EMAIL'),
              clientId: this.configService.get('CLIENT_ID'),
              clientSecret: this.configService.get('CLIENT_SECRET'),
              accessToken,
            },
          };
          this.mailerService.addTransporter('gmail', config);
    }

    public async sendMail(emailDto:emailDto) {
        await this.setTransport();
        this.mailerService
          .sendMail({
            transporterName: 'gmail',
            to: emailDto.to,
            from: process.env.EMAIL,
            subject: 'Order',
            template: 'order',
            text:emailDto.content,
            context: {
              code: '38320',
            },
          })
          .then((success) => {
            console.log(success);
          })
          .catch((err) => {
            console.log(err);
          });
      }

}
