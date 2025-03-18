import axios, { AxiosInstance } from "axios";
import { userPage } from "../types/response/userPage";
import { user as userResponse } from "../types/response/user";
import { user as userRequest } from "../types/request/user";
import {z} from 'zod';
import { Interceptor } from "../framework/Interceptor";
import { expect } from "chai";
type UserPage = z.infer<typeof userPage>;
type User = z.infer<typeof userResponse>;
type UserRequest = z.infer<typeof userRequest>;
class UserService {
    
    private userClient : AxiosInstance;
    
    constructor() {
        this.userClient = axios.create({
            baseURL : "https://reqres.in/api/",
            headers : { "Content-Type": "application/json"},
            timeout: 60000
        });   
        Interceptor.attach(this.userClient);     
    }

    async getListOfUsersFromPage(pageNumber : number) : Promise<User[]> {
        const usersPageResponse = await this.userClient.get(`users?page=${pageNumber}`);
        const userResponse : UserPage = userPage.parse(usersPageResponse.data);
        return userResponse.data;
    }

    async createUser(name: string, job? : string) : Promise<User> {
       const userBody : UserRequest = userRequest.parse({name, job});
       const user = await this.userClient.post("/users", userBody);
       expect(user.status).to.equal(201);
       return user.data;
    }

    async updateUser(userId : number, name: string, job? : string) : Promise<User> {
        const userBody : UserRequest = userRequest.parse({name, job});
        const user = await this.userClient.put(`/users/${userId}`, userBody);
        expect(user.status).to.equal(200);
        return user.data;
    }

    async deleteUser(userId : number) : Promise<void> {
        const user = await this.userClient.delete(`/users/${userId}`);
        expect(user.status).to.equal(204);
    }
    
}
export default UserService;