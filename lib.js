import YAML from "yaml";
import fs from "fs";
import path from "path";

export function getData() {
  return {
    companies: YAML.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'companies.yml')).toString()),
    tags: YAML.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'tags.yml')).toString())
  }
}