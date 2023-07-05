// Openai
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    organization: "org-qZ0mHNj8I5VJUeRXOLN8Vuij" /*process.env.ORGANIZATION*/,
    apiKey: "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" /*process.env.API_KEY*/,
});

const openai = new OpenAIApi(configuration);

// Requiring file system handler and path for joining directories
const fs = require('fs');
const path = require('path');

// Bring DB
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const User = require('../../database/models/User.js');
const Message = require('../../database/models/Message.js');
// const { send } = require('process');

// Call each model
const Users = db.User;
const Messages = db.Message;

const gptMainController = {
    index: (req, res) => {
        res.send("Server for Santiago's Chatbot");
    },
    chat: async (req, res) => {

        const { message, currentModel, chatLog } = req.body;
        const clientIp = req.socket.remoteAddress;

        const response = await openai.createCompletion({
            "model": `${currentModel}`,
            "prompt": `You are a very kind customer assistant.
            Reply to all prompts based on this information:
            Santiago's latest projects: scroll down to the projects section. It's updated regularly.
            Santiago is a Full Stack Developer, passionate about coding. He starts every week eager to embark on new projects.
            Each job presents new challenges, new puzzles that might require research, creativity and studying new tools, and that's something he loves about this career, since every single day he challenges himself.
            Fast learner. Lover of science and sports.
            Many years of professional experience, most of it as a Project Manager, hundreds of succesful freelance projects and excellent communication skills.
            Ambitious, decisive and always looking for inspiration.
            He has two careers, one in Advertising industry and one in the Web Development industry.
            Previous jobs: 
            - Music Producer and supervisor for a Nickelodeon tv show called Kally's Mashup.
            - Music Producer and Project Manager for Twins Music, a music for advertising firm.
            - Developer for multiple NFT Projects (Smart Contract and React apps.).
            Programming Languages Santiago knows: Javascript, HTML, CSS, Sass, Node.js, SQL, React, Solidity, Python and more.
            Santiago can help you integrate ChatGPT and A.I. tools into your website.
            ${message}`,
            "max_tokens": 100,
            "temperature": 0.4
        });

        res.json({
            message: response.data.choices[0].text,
        });

        // message except the last response
        let allMsgs = message.split("\n");

        console.log("we got this far - - - -");
		
		// if user exists just create the msg, if it doesn't, create the user then the msg
        const userExists = await Users.findByPk(clientIp);
        if(userExists === null){
            Users.create({
                id: clientIp,
                name: 'User'
            })
            .then(()=>{
                Messages.bulkCreate([
                    {
                    user_id: clientIp,
                    message: allMsgs[allMsgs.length -1],
                    timestamp: Date.now()
                    },
                    {
                    user_id: 0,
                    message: response.data.choices[0].text,
                    timestamp: Date.now(),
                    msg_to: clientIp
                    },
                ]);
            })
        }else{
           Messages.bulkCreate([
            {
			user_id: clientIp,
			message: allMsgs[allMsgs.length -1],
			timestamp: Date.now()
            },
            {
			user_id: 0,
			message: response.data.choices[0].text,
			timestamp: Date.now(),
            msg_to: clientIp
            },
        ]); 
        }
        
        
        

        // Adding user msg
        // let userMsg = {
        //     "user": "Me",
        //      "message": allMsgs[allMsgs.length -1],
        //      "timestamp": Date.now(),
        // }
        // chatLog.push(userMsg);

        // // Adding last resp to messages
        // let gptMsg = {
        //     "user": "Gpt",
        //     "message": response.data.choices[0].text,
        //     "timestamp": Date.now()
        // }
        // allMsgs.push(gptMsg);
        // chatLog.push(gptMsg);

        // Only works on localhost
        // fs.writeFile(`./chats/chat-${clientIp}.json`, JSON.stringify(chatLog, null, " "), function (err) {
        //         if (err) throw err;
        //         console.log('Chat data has been saved to the file2.');
        //     });
    },
    models: async (req, res) => {
        const response = await openai.listEngines();
    
        res.json({
            models: response.data.data
        })
    },
    getChats: (req, res) => {
        Messages.findAll()
        .then(messages=>{
            return res.json({
                messages
            });
        })
        .catch((err) => {console.log(err)});
        
        // fs.readdir("./chats", (err, files) => {
        //   if (err) {
        //     res.status(500).send("Error reading directory");
        //     return;
        //   }
      
        //   res.json(files);
        // });
      },
    getSpecificChat: (req, res) => {
        Messages.findAll()
        .then(messages=>{
            return res.json({
                messages
            });
        })
        .catch((err) => {console.log(err)});
      },

      getUsers: (req,res) => {
        Users.findAll()
        .then(users=>{
            return res.json({
                users
            });
        })
        .catch((err) => {console.log(err)});
      }
    //   getChats2: async (req, res) => {
    //     // Get id of File
    //     let id = req.params.id;
    //     // Get file and send it as json
    //     let file = JSON.parse(fs.readFileSync(`./chats/${id}`, 'utf-8'));
    
    //     res.json({
    //         chats: file
    //     });
    // }
};

module.exports = gptMainController;