import xml2js from "xml2js";
import util from "util";
import path from "path";
import fs from "fs";
import { cameras_xml } from "./types/cameras_xml";
import { camera_details } from "./types/camera_details";

const parseXml = util.promisify(xml2js.parseString);
export async function get_cameras() {
  const xmlData = await fetch("http://www.insecam.org/static/sitemap.xml").then((res) => res.text());
  const jsonXml = (await parseXml(xmlData)) as cameras_xml;
  return jsonXml.urlset.url;
}

export function get_random_number(length: number) {
  const lengthTimes = Math.random() * length;
  const index = Math.floor(lengthTimes);
  return index;
}

export function extract_to_json(text: string) {
  const lines = text
    .trim()
    .split("\n")
    .filter((line) => line.trim() !== "");

  const obj = {} as camera_details;

  let currentKey: string | null;
  lines.forEach((line) => {
    if (line.endsWith(":")) {
      currentKey = line.replace(/:$/, "").trim();
    } else if (currentKey) {
      obj[currentKey] = line.trim();
      currentKey = null;
    }
  });

  return obj;
}

export async function write_image_to_disk(imageUrl: string, name: string): Promise<any> {
  const outputPath = path.join(__dirname, `/images/${name}.jpg`);

  try {
    const response = await fetch(imageUrl);
    console.log(imageUrl);
    console.log(name);

    if (!response.ok) {
      console.error(response.statusText);
      const json = {
        ok: false,
        text: "Failed to download image",
        err: response.statusText,
      };
      return json;
    }

    const contentLength = response.headers.get("Content-Length");
    if (contentLength && parseInt(contentLength) > 0) {
      const imageBlob = await response.blob();

      const fileStream = fs.createWriteStream(outputPath);
      const buffer = await imageBlob.arrayBuffer();
      fileStream.write(Buffer.from(buffer));
      fileStream.end();

      const json = {
        ok: true,
        text: "Image downloaded successfully!",
        outputPath,
      };

      return json;
    } else {
      console.error("Empty response.");

      const json = {
        ok: false,
        reason: 101,
        text: "Empty response.Empty response.",
      };

      return json;
    }
  } catch (error) {
    console.error(error);
    const json = {
      ok: false,
      text: "Failed to download image",
      err: error,
    };
    return json;
  }
}
