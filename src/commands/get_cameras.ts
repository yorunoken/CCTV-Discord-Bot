import { ChatInputCommandInteraction, EmbedBuilder, AttachmentBuilder } from "discord.js";
import { load } from "cheerio";
import { get_cameras, get_random_number, extract_to_json, write_image_to_disk } from "../utils";

export async function run({ interaction }: { interaction: ChatInputCommandInteraction }) {
  await interaction.deferReply();

  const cameras = await get_cameras();

  while (true) {
    const index = get_random_number(cameras.length);

    const cameraLink = cameras[index].loc[0];

    const regex = /\/(\d+)\/$/;
    const match = cameraLink.match(regex);

    var cameraName: string;
    if (match) {
      cameraName = match[1];
    } else {
      return await interaction.editReply("No camera name found.");
    }

    const cameraUrlHtml = await fetch(cameraLink).then((res) => res.text());
    var $ = load(cameraUrlHtml);

    const cameraPhotoUrl = $("#image0").attr("src");
    if (!cameraPhotoUrl) {
      return await interaction.editReply("No photo URL found.");
    }

    var writeToDisk = await write_image_to_disk(cameraPhotoUrl, cameraName);
    if (!writeToDisk.ok) continue;
    if (writeToDisk.reason === 101) continue;
    break;
  }

  if (!writeToDisk?.ok) {
    return await interaction.editReply(writeToDisk.text);
  }
  const imagePath = writeToDisk.outputPath;

  const cameraDetails = $(".camera-details").text();
  const cameraJson = extract_to_json(cameraDetails);

  const file = new AttachmentBuilder(imagePath);

  const embed = new EmbedBuilder().setDescription(`${cameraJson.City}, ${cameraJson.Country} :flag_${cameraJson["Country code"].toLowerCase()}:`).setImage(`attachment://${cameraName}.jpg`);

  interaction.editReply({ embeds: [embed], files: [file] });
}
export { data } from "../data/get_cameras_data";
