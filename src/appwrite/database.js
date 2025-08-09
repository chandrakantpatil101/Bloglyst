import conf from "../conf/conf.js";
import { Client, Databases, ID, Query, Storage } from "appwrite";

class DatabaseService {
    client = new Client();
    database;
    //bucket
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwritePROJECTID);
        this.database = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    //slug will be unique document id
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.database.createDocument(
                conf.appwriteDATABASEID,
                conf.appwriteCOLLECTIONID,
                slug,
                {
                    slug,
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );
        } catch (error) {
            console.log("Error on creating Post", error);
            return null;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.database.updateDocument(
                conf.appwriteDATABASEID,
                conf.appwriteCOLLECTIONID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
        } catch (error) {
            console.log("error on updating post", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.database.deleteDocument(
                conf.appwriteDATABASEID,
                conf.appwriteCOLLECTIONID,
                slug
            );
            return true;
        } catch (error) {
            console.log("error on deleting post", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.database.getDocument(
                conf.appwriteDATABASEID,
                conf.appwriteCOLLECTIONID,
                slug
            );
        } catch (error) {
            console.log("Error on feting document", error);
        }
    }

    async getAllPost(queries = [Query.equal("status", "active")]) {
        try {
            const response = await this.database.listDocuments(
                conf.appwriteDATABASEID,
                conf.appwriteCOLLECTIONID,
                queries
            );
            return response.documents;
        } catch (error) {
            console.log("Error on fetching Documents", error);
            return false;
        }
    }

    //upload service(Storage//Bucket related services)
    async uploadFile(file) {
        try {
            if (file) {
                return await this.storage.createFile(
                    conf.appwriteBUCKETID,
                    ID.unique(),
                    file
                );
            }
        } catch (error) {
            console.log("Error on uploding Image", error);
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(conf.appwriteBUCKETID, fileId);
            return true;
        } catch (error) {
            console.log("Error on deleting Image");
            return false;
        }
    }

    getFilePreview(fileId) {
        if (!fileId) {
            console.log("No file ID provided for preview.");
            return "";
        }

        try {
            return this.storage.getFileView(conf.appwriteBUCKETID, fileId);
        } catch (error) {
            console.log("Error generating preview URL:", error);
            return "";
        }
    }
}

const databaseService = new DatabaseService();
export default databaseService;


// DOCUMENT ID
// bhejte samay slug aur database late samay .$id
