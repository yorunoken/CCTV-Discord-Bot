# Unsecured CCTV Cameras Discord Bot

A Discord bot written in TypeScript that uses the bun runtime. Scrapes random unsecured CCTV cameras.

You can see the bot in action [by inviting it to your server](https://discord.com/api/oauth2/authorize?client_id=1158737858660675655&permissions=2048&scope=bot).

<img src="https://cdn.discordapp.com/attachments/1158385900972163174/1158412960184680478/986197.jpg?ex=651c27a3" alt="Jakarta, Indonesia" width="400"/> <img src="https://cdn.discordapp.com/attachments/1158385900972163174/1158416609157849238/876545.jpg" alt="Tokyo, Japan" width="400">
## 🚀 Usage

1. Clone this repository to your local machine.
2. Run `bun install` to install the necessary dependencies.
3. Create a Discord bot and obtain the necessary token. You can find a guide [here](https://discord.com/build/app-developers).
4. Rename the `.local.env.example` file to `.local.env` and add your API credentials in the following format:

```env
TOKEN=DISCORD_TOKEN_HERE
```

5. Launch the bot by running `bun start`.

## 🖥️ Commands 

```env
/cameras (replies with a random screenshot of a camera)
```

## 🙌 Credits

This project was developed by YoruNoKen under the [MIT](https://choosealicense.com/licenses/mit/) license, with camera feeds sourced from [Insecam.org](http://www.insecam.org/static/sitemap.xml).

The idea is from John Q. Herman who developed the Twitter version of this bot.