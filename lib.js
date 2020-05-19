import YAML from "yaml";
import remark from 'remark'
import html from 'remark-html'
import React from 'react'

import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function getTags() {
  return YAML.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'tags.yml')).toString());
}

export async function getTag(slug) {
  let allTags = (await getTags()).map(tagSet => tagSet.tags).reduce((tags, setTags) => ({...tags, ...setTags}), {});

  return allTags[slug];
}

export async function getCompanies() {
  return await Promise.all(
    fs.readdirSync(path.join(process.cwd(), 'data', 'companies'))
    .map(fileName => fileName.replace(/\.md$/, ''))
    .map(async slug => ({slug, name: (await getCompany(slug)).name}))
  );
}

export async function getCompany(slug) {
  const fileContent = fs.readFileSync(path.join(process.cwd(), 'data', 'companies', `${slug}.md`));
  const matterResult = matter(fileContent);
  const howTo = (await remark().use(html).process(matterResult.content)).toString();

  if (matterResult.data.updated) {
    matterResult.data.updated = matterResult.data.updated.toString();
  }

  return {slug, howTo, ...matterResult.data}
}
