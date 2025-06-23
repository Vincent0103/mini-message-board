import { Router } from "express";
import messagesController from "../controllers/messagesController";

const messagesRouter = Router();
messagesRouter.get("/", messagesController.messagesListGet);
messagesRouter.get("/new", messagesController.createMessageGet);
messagesRouter.post("/new", messagesController.createMessagePost);
messagesRouter.get("/message/:authorname", messagesController.messageFromAuthorGet);

export default messagesRouter;
