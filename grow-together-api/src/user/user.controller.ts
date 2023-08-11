import { Body, Controller, HttpStatus, Post, UploadedFile, UseInterceptors, ValidationPipe, Request, Param, ParseIntPipe, BadRequestException, Get, Res, StreamableFile } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegistrationDto } from './DTOs/user-register.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync, readdir, unlink } from 'fs';
import { of } from 'rxjs';

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

                //Kreira folder
                const uploadPath = `./uploads/profileImages/${userId}`;
                if(!existsSync(uploadPath))
                    mkdirSync(uploadPath, {recursive:true});
                else
                    deleteFiles(uploadPath);

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
    async uploadImage(@UploadedFile() file:Express.Multer.File, @Param('id', ParseIntPipe) id:number)
    {
        if(!file)
        {
            throw new BadRequestException("File is not an image");
        }
        else
        {
            let user = await this.userService.getUserById(id);
            user.profileImagePath = file.filename;
            this.userService.updateUser(id, user);
        }
    }

    @Get('profile-image/:id')
    async getProfileImage(@Param('id', ParseIntPipe) id:number, @Res() res)
    {
        const user = await this.userService.getUserById(id);
        const imagePath = `${process.cwd()}/uploads/profileImages/${id}/${user.profileImagePath}`;

        return of(res.sendFile(imagePath));

    }

    @Get('profile-data/:id')
    async getProfileData(@Param('id', ParseIntPipe) id:number)
    {
        const user = await this.userService.getProfileData(id);

        if(!user)
            throw new BadRequestException("User not found");
        return user;
    }
}

function deleteFiles(path:string)
{
    readdir(path, (err, files) => {
        if(err) throw new BadRequestException("could not read directory");

        files.forEach(file => {
            const file_path = path + "/" + file;
            unlink(file_path, (err) => {
                if(err) throw new BadRequestException("Could not delete file");
                console.log("Deleted" + file_path);
            });
        })
    })
}
