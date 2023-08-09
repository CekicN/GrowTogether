import { Body, Controller, HttpStatus, Post, UploadedFile, UseInterceptors, ValidationPipe, Request, Param, ParseIntPipe, BadRequestException, Get, Res, StreamableFile } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegistrationDto } from './DTOs/user-register.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { User } from './entities/user.entity';
import path, { join } from 'path';
import { createReadStream, existsSync, mkdirSync } from 'fs';
import { ApiBadRequestResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {

    constructor(private userService:UserService){}

    @Post('/register')
    async registerUser(
        @Body(new ValidationPipe({errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY})) userRegisterDto:UserRegistrationDto
        ){

        return await this.userService.registerUser(userRegisterDto);
    }

    @Post('uploadImage/:id')
    @UseInterceptors(FileInterceptor('file', { 
        storage: diskStorage({
            destination(req, file, callback) {
                const start = req.url.indexOf("uploadImage/");
                const userId = req.url.substring(start+12);

                const uploadPath = `./uploads/profileImages/${userId}`;
                if(!existsSync(uploadPath))
                    mkdirSync(uploadPath, {recursive:true});

                callback(null, uploadPath);
            },
            filename(req, file, callback) {
                const newFileName = `image_${Date.now()}.jpg`;
                callback(null, newFileName);
            },
        }),
        fileFilter(req, file, callback) {
            if(!file.originalname.match(/\.(jpg|jpeg|png)$/))
            {
                return callback(null, false);
            }
            callback(null, true);
        },
    }))
    uploadImage(@UploadedFile() file:Express.Multer.File, @Param('id', ParseIntPipe) id:number)
    {
        if(!file)
        {
            throw new BadRequestException("File is not an image");
        }
        else
        {
            const response = {
                filePath: `http://localhost:3000/user/profile_image/${id}|${file.filename}`
            };
            return response;
        }
    }

    @Get('profile_image/:filename')
    async getProfileImage(@Param('filename') filename:string)
    {
        filename.replace("|", "/");
        console.log(filename);
       const file = createReadStream('./uploads/profileImages/'+filename);
       return new StreamableFile(file)
    }
}
