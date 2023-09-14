import { Controller, Delete, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserService } from 'src/user/user.service';

@Controller('admin')
export class AdminController {
    constructor(private userService:UserService){}

    @Roles('admin')
    @UseGuards(RolesGuard)
    @Delete('deleteUser/:id')
    async deleteUser(@Param('id', ParseIntPipe) id:number)
    {
        return this.userService.deleteUser(id);
    }
    
}
