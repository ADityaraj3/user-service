import { Injectable } from '@nestjs/common';
import { SignUpDTO } from './dto/signup-dto';
import { Response } from 'express';
import {
    sendBadRequest,
    sendErrorFromMicroservice,
    sendSuccess,
} from 'src/shared/utils/response.utils';
import { user_type, UserModel } from 'src/models/public/users.model';
import * as encryption from 'src/shared/utils/encryption.util';
import { LoginDTO } from './dto/login-dto';
import { RoleModel } from 'src/models/system-config/role.mode';

@Injectable()
export class AuthService {
    constructor() { }

    async signUp(body: SignUpDTO) {
        try {
            const userAlreadyExists = await UserModel.findOne({
                where: {
                    email: body.email,
                },
            });

            if (userAlreadyExists) {
                return sendBadRequest('User already exists');
            }

            const role = await RoleModel.findOne({
                where: {
                    role_slug: 'end_user',
                },
            })

            const user = await UserModel.create({
                ...body,
                role_id: role.role_id,
                user_type: user_type.SYSTEM_USER,
                password: encryption.hashPasswordUsingBcrypt(body.password),
            });

            const criteriaForJWT: {
                id: number;
                date: Date;
            } = {
                id: user.user_id,
                date: new Date(),
            };

            const token = await encryption.generateAuthToken(criteriaForJWT);

            return sendSuccess('User created successfully', {
                user_id: user.user_id,
                token: token,
            });
        } catch (error) {
            return sendErrorFromMicroservice(error.response.message, error);
        }
    }

    async login(body: LoginDTO) {
        try {

            const user = await UserModel.findOne({
                where: {
                    email: body.email,
                },
            });

            if (!user) {
                return sendBadRequest('User does not exist');
            }

            if (
                !encryption.comparePasswordUsingBcrypt(body.password, user.password)
            ) {
                return sendBadRequest('Incorrect password');
            }

            const criteriaForJWT: {
                id: number;
                date: Date;
            } = {
                id: user.user_id,
                date: new Date(),
            };

            const token = await encryption.generateAuthToken(criteriaForJWT);

            return sendSuccess('User logged in successfully', {
                user_id: user.user_id,
                token: token,
            });
        } catch (error) {
            return sendErrorFromMicroservice(error.response.message, error);
        }
    }
}
