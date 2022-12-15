import { readFile } from 'fs/promises'
async function readJSON(filename) {
    return JSON.parse(await readFile(new URL(`./${filename}.json`, import.meta.url)))
}
const config = await readJSON('config')
import { REST, Routes, Client, GatewayIntentBits } from 'discord.js'

const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
    {
        name: 'react',
        description: ''
    }
];

const rest = new REST({ version: '10' }).setToken(config.token);
try {
    console.log('Started refreshing application (/) commands.');
    await rest.put(Routes.applicationCommands(config.appid), { body: commands });
    console.log('Successfully reloaded application (/) commands.');
} catch (error) {
    console.error(error);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if(!interaction.isChatInputCommand()) return;

  /* Commands */
  if(interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }

});

client.login(config.token);