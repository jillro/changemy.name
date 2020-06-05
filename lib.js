import YAML from "yaml";
import remark from "remark";
import html from "remark-html";
import React from "react";

import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function getStrings(lang) {
  const filepath = path.join(
    process.cwd(),
    "data",
    "translations",
    `${lang}.yml`
  );
  return YAML.parse(fs.readFileSync(filepath).toString());
}

export async function getLangs() {
  return Object.fromEntries(
    await Promise.all(
      fs
        .readdirSync(path.join(process.cwd(), "data", "translations"))
        .map((filename) => filename.replace(/\.yml/, ""))
        .map(async (lang) => [lang, (await getStrings(lang)).language])
    )
  );
}

export async function getMarkdownFile(filepath) {
  const fileContent = fs.readFileSync(filepath);
  const matterResult = matter(fileContent);
  const content = (
    await remark().use(html).process(matterResult.content)
  ).toString();

  return { content, ...matterResult.data };
}

export async function getTags() {
  return YAML.parse(
    fs.readFileSync(path.join(process.cwd(), "data", "tags.yml")).toString()
  );
}

export async function getTag(slug) {
  let allTags = (await getTags())
    .map((tagSet) => tagSet.tags)
    .reduce((tags, setTags) => ({ ...tags, ...setTags }), {});

  return allTags[slug];
}

export async function getCompanies() {
  let companies = fs
    .readdirSync(path.join(process.cwd(), "data", "companies"))
    .map((fileName) => fileName.replace(/\.md$/, ""))
    .sort()
    .reduce((companies, filename) => {
      return companies.length > 0 &&
        filename.startsWith(companies[companies.length - 1])
        ? companies
        : [...companies, filename];
    }, []); // filter out translations

  return await Promise.all(
    companies.map(async (slug) => ({
      slug,
      name: (await getCompany(slug)).name,
    }))
  );
}

export async function getCompany(slug, lang) {
  let company = await getMarkdownFile(
    path.join(process.cwd(), "data", "companies", `${slug}.md`)
  );

  if (company.updated) {
    company.updated = company.updated.toString();
  }

  if (company.content.trim() === "") {
    delete company.content;
  }

  if (lang && lang !== company.defaultLang) {
    try {
      company.content = (
        await getMarkdownFile(
          path.join(process.cwd(), "data", "companies", `${slug}_${lang}.md`)
        )
      ).content;
    } catch (e) {
      if (e.code !== "ENOENT") {
        throw e;
      }

      company.noTranslation = true;
    }
  }

  return { slug, ...company };
}

export async function getAboutPages() {
  return await Promise.all(
    fs
      .readdirSync(path.join(process.cwd(), "about"))
      .map((fileName) => fileName.replace(/\.md$/, ""))
  );
}

export async function getAboutPage(slug, lang) {
  if (lang) {
    try {
      return await getMarkdownFile(
        path.join(process.cwd(), "about", `${slug}_${lang}.md`)
      );
    } catch (e) {
      if (e.code !== "ENOENT") {
        throw e;
      }
    }
  }

  return {
    noTranslation: lang && lang !== "en",
    ...(await getMarkdownFile(path.join(process.cwd(), "about", `${slug}.md`))),
  };
}

export async function getCommonProps(context) {
  return {
    companiesList: await getCompanies(),
    tags: await getTags(),
    strings: await getStrings(context.params.lang),
    lang: context.params.lang,
    langs: await getLangs(),
  };
}
