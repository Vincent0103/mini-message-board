import { getMessages, insertMessage, getMessagesByAuthor } from "../db/queries";

const messagesController = (() => {
  const createMessageGet = (req, res) => {
    res.render("form");
  }

  const createMessagePost = async (req, res) => {
    const { authorname, bio } = req.body;
    const message = {
      authorName: authorname,
      creationDate: new Date(),
      bio
    };
    await insertMessage(message);
    res.redirect('/');
  }

  const messageFromAuthorGet = async (req, res) => {
    const { authorname } = req.params;
    const message = await getMessagesByAuthor(authorname);

    if (!message) {
      res.send(404).send("Message not found");
      return;
    }

    res.render('message', { ...message });
  }

  const messagesListGet = async (req, res) => {
    const messages = await getMessages();
    res.render('index', {
      title: 'Mini Messageboard', messages: messages
    });
  }

  return { messagesListGet, createMessageGet, createMessagePost, messageFromAuthorGet }
})();

export default messagesController;
