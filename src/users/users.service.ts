import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UpdatePatchUserDto } from "./dto/updatePatchUserDto";
import { createPasswordHashed } from "src/utils/password";

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto){
        const { name, user_name, password, sector, type, level, specialty, ext} = createUserDto;
        const passwordHashed = await createPasswordHashed(password)
        return this.prisma.users.create({
            data: {
                name,
                user_name,
                password,//:passwordHashed,
                sector,
                type,
                level,
                specialty,
                ext,
            }
        });
    }

    async list() {
        return this.prisma.users.findMany({ include: { call: true, service: true } });
    }

    async show(id: number) {
        return this.prisma.users.findUnique({
            where: {
              registration: id,
            },
            include: {
                call: true,
                service: true,
            }
        });
    }

    async update(id:number, data:UpdateUserDto){
      if(!(await this.show(id))){
          throw new NotFoundException(`usuário não encontrado id:${id}`)
      }
      return this.prisma.users.update({
          data,
          where:{
              registration:id,
          }
      })
  }

    async updatePartial(id:number, data:UpdatePatchUserDto){
        console.log('update partial')
        const { password } = data;
        const passwordHashed = await createPasswordHashed(password)
      if(!(await this.show(id))){
          throw new NotFoundException(`usuário não encontrado id:${id}`)
      }
      if(password){
        const update = this.prisma.users.update({
            data:{
                password:passwordHashed
            },
            where:{
                registration:id,
            }
        })
        console.log(1,update)
        return update
      }
      const update = this.prisma.users.update({
          data,
          where:{
              registration:id,
          }
      })
      console.log(2, update)
      return update
  }
  

    async delete(id: number){
        const existingUser = await this.show(id);
        if (!existingUser) {
            throw new NotFoundException(`Usuário não encontrado com id: ${id}`);
        }
        
        return this.prisma.users.delete({
            where: {
              registration:id,
            },
        });
    }
}
