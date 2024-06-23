const { OpenAI } = require('openai');
const Chat = require('../models/Chat');
const openai = new OpenAI({apiKey:process.env.OPENAI_API_KEY});

console.log(process.env.OPENAI_API_KEY)

exports.getChatHistory = async (req, res) => {
  try {
    const chat = await Chat.findOne({ user: req.user.id }).populate('user', ['name']);
    if (!chat) {
      return res.status(404).json({ msg: 'No chat history found' });
    }
    res.json(chat);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.addMessage = async (req, res) => {
  const { message } = req.body;

  try {
    let chat = await Chat.findOne({ user: req.user.id });

    if (!chat) {
      chat = new Chat({ user: req.user.id, messages: [] });
    }

    const chatHistory = chat.messages.map(msg => ({ role: msg.sender, content: msg.message }));
    console.log(chatHistory);

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-1106',
      messages: [...chatHistory, { role: 'user', content: message }],
    });
    console.log("API response:",response.choices[0].message.content.substring(0,27),"....");

    const botMessage = response.choices[0].message.content.trim();

    chat.messages.push({sender:"user", message });
    chat.messages.push({ sender: "system",message: botMessage });

    await chat.save();

    res.json(chat);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete a chat
exports.deleteChat = async (req, res) => {
  userId= req.userId
  try {
    await Chat.deleteMany({ user: req.user.id }); // Delete all chats
    res.json({ message: 'All chats deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete a specific chat by ID
exports.deleteChatById = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    //console.log(chatId);
    const result = await Chat.findByIdAndDelete(chatId);
    console.log(result);
    if (!result) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    res.json({ message: 'Chat deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


