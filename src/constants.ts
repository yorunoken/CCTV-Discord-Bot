import { MyClient } from ".";

export const websiteUrl = "http://www.insecam.org/static/sitemap.xml";
export const serverJoinMessage = (client: MyClient) =>
  `Hello, I'm ${client.user?.username}! I'm a Discord bot developed by @yorunoken that scrapes for unsecured CCTV cameras, and shows you a random one.\nHere are some of my commands:\n\`\`\`/cameras\`\`\`\nThat's my only command for now as my owner is still developing me. If you come across any issues or bugs, contact my owner at @yorunoken on Discord or @ken_yoru on Twiter.`;
