const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");

let prefix = config.prefix;
let logChannel = config.channel;  

client.on('ready', () => {
    // This will trigger when the bot comes online.
    console.log(`${client.user.tag} Is Active!`);
    console.log(`----------------`);
    client.user.setPresence({game: {name: `on ${client.guilds.size} servers | ?help`, type: 0}});
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    
});

client.on("guildMemberAdd", (u) => {
    let channel = u.guild.channels.find("name", logChannel)
    
    if (!channel) {
    // Create a new text channel
    guild.createChannel(logChannel, 'text')
  .then(channel => 
        channel.send(`Created new channel, ${channel}`);
        channel.send(`:tada: Welcome ${u.user.username} (${u.user}) to **${guild.name}**!`);
        return;
       )
  .catch(console.error);
}

    channel.send(`:tada: Welcome ${u.user.username} (${u.user}) to **${guild.name}**!`);
});

client.on("guildMemberRemove", (u) => {
    let channel = u.guild.channels.find("name", logChannel)

    if (!channel) return console.log(`Channel ${logChannel} cannot be found.`);

    channel.send(`:wave: ${u.user.username} (${u.user}) just left **${guild.name}**. How sad.`);
});

client.on('message', message => {
    
    if(message.author.bot) return;
    if(!message.content.startsWith(config.prefix)) return;

    let command = message.content.split(" ")[0];
    command = command.slice(config.prefix.length);

    let args = message.content.split(" ").slice(1);


    
    
    if (command === "remove") {
        
        let modRole = message.guild.roles.find("name", "Bot Commander");
        
        if (message.member.roles.has(modRole.id)) {

            let num1 = parseInt(args[0]);
            message.channel.bulkDelete(num1 + 1);
            if (args[0] === "1") {

                message.channel.send("Deleted " + num1 + " message.")

            } else if (num1 > 1) {

                message.channel.send("Deleted " + num1 + " messages.");

            }
            
        } else {

            message.reply("You do not have the permission to use this command.");

        }

    }
  
    if (command === "ayy") {
   
        message.channel.send("Ayy! What's up?");
        message.delete(0);
    }
    
    if (command === "poop") {
        
        message.author.sendMessage("NO, you're a poop!");
      
    }
  
    if (command === "help") {
        
        message.channel.send("You can view the list of commands at https://definitelynotjosh.github.io/JoshBot");
        
    }
    
    if (command === "lol") {
        
        message.reply("lel");
        
    }
    
    if (command === "myavatar") {
       
        message.reply(message.author.avatarURL);
    
    }
          
    if (command === "ping") {
        
        message.channel.send('Pong...').then(msg => {
            
            msg.edit(`**Pong**! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms.`);
        
        });
        
    }
                                             
    if (command === "website") {
        
        message.channel.send("You can view my website here: https://definitelynotjosh.github.io/JoshBot");
        
    }
    
    if (command === "depressme") {
        
        message.author.sendMessage("You are a lonely person. You have crippling depression. You have no friends. Nobody likes you.");
 
    }
                     
    if (command === "invite") {
  
        message.channel.send("You can add JoshBot to your server here: https://discordapp.com/oauth2/authorize?client_id=371553407569362955&scope=bot&permissions=8");
 
    }
    
    if (command === "angry") {
        
        message.reply("**NUBOT ANGRYYY!**");
        
    }
  
    let mess = message.content.split(" ").slice(1);
    
    if (command === "say") {
        
        message.delete(0)
        message.channel.send(mess.join(" "));
    
    }
});
// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
