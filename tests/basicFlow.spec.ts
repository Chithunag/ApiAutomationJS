import axios from "axios";
import {expect} from "chai";
import UserService from "../services/UserService";
const reqres = axios.create({
    baseURL : "https://reqres.in/api/",
    timeout : 10000,
})



describe("Basic Flow of Users", () => {
    let userObj : UserService;
    beforeEach(() =>{
        userObj = new UserService();
    });

    it("Get list of users", async () => {
        const listOfUsers = await userObj.getListOfUsersFromPage(2);
        listOfUsers.forEach((user) => console.log(user.first_name));
    });

    it("Create a new User and validate it", async() => {
        console.log("Creating a new user");
        await userObj.createUser("Rob", "CEO");
    });

    it("Update a User and validate it", async() => {    
        console.log("Updating a user");
        await userObj.updateUser(2, "Rob", "CTO");
    });

    it("Delete a User and validate it", async() => {
        console.log("Deleting a user");
        await userObj.deleteUser(2);
    });

});