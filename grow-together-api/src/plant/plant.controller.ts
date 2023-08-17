import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { PlantService } from './plant.service';
import { plantDto } from './DTOs/plant.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync, readFile, readdir, unlink } from 'fs';
import { of } from 'rxjs';

import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';

@Controller('plant')
export class PlantController {
    constructor(private plantService:PlantService){}

    @Patch('addPlant/:id')
    async addPlant(@Body() plantDto:plantDto, @Param('id', ParseIntPipe) id:number)
    {
        return this.plantService.addPlant(plantDto, id);
    }

    @Post('addEmpty')
    async addEmptyPlant()
    {
        return this.plantService.addEmptyPlant();
    }

    @Get('getAllPlants')
    async getAllPlants()
    {
        return this.plantService.getAllPlants();
    }


    @Post('uploadImage/:id')
    @UseInterceptors(FilesInterceptor('file',20, { 
        storage: diskStorage({
            destination(req, file, callback) {
                const start = req.url.indexOf("uploadImage/");
                const userId = req.url.substring(start+12);

                //Kreira folder
                const uploadPath = `./uploads/plantImages/${userId}`;
                if(!existsSync(uploadPath))
                    mkdirSync(uploadPath, {recursive:true});

                callback(null, uploadPath);
            },
            filename(req, file, callback) {  
                const name = file.originalname.split('.')[0];
                const newFileName = `${name}_${Date.now()}.jpg`;
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
    async uploadImage(@UploadedFiles() files:Array<Express.Multer.File>, @Param('id', ParseIntPipe) id:number): Promise<any>
    {
        const response = [];
        files.forEach( file => {
            const fileResponse = {
                originalName:file.originalname,
                filename:file.filename
            }
            response.push(fileResponse);
        })

        return response;
    }
    @Get('getImage/:id')
    async getProfileImage(@Param('id', ParseIntPipe) id:number, @Res() res)
    {
        const readDir = util.promisify(fs.readdir);
        const readFile = util.promisify(fs.readFile);
        const directory = `${process.cwd()}/uploads/plantImages/${id}`;
        const response = {data:[]}

        try{
            const fileNames = await readDir(directory);
            const files = fileNames.map( async (filename) => {
                const filepath = directory + "/" + filename;
                return readFile(filepath);
            })

            Promise.all(files)
            .then((fileContents) => {
              response.data = fileContents;
              res.json(response);
            })
            .catch((error) => {
              res.status(400).json(response);
            });
            
        } catch (error) {
          res.status(400).json(response);
        }
    }
}

