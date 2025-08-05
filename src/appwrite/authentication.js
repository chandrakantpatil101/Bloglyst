import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.js";
import toast from "react-hot-toast";

class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwritePROJECTID);

    this.account = new Account(this.client);
  }

  //return user details after creating user
  async createAccount({ email, password, name }) {
    try {
      const userAcc = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAcc) {
        return await this.login({ email, password });
      } else {
        return userAcc;
      }
    } catch (error) {
      console.log("Error on creating user ", error);
    }
  }

  //will return session_id
  async login({ email, password }) {
    try {
      return this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      if (error.code === 429) {
        toast.error("Too many login attempts. Please wait a moment.");
      } else {
        toast.error(error.message || "Login failed.");
      }
    }
  }

  //will take sesion id from cookie in browser and match in backend
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (err) {
      return null;
      
    }
  }

  async logout() {
    try {
      return this.account.deleteSessions();
    } catch (error) {
      console.log("Error while logout ", error);
    }
  }
}

const authService = new AuthService();
export default authService;
