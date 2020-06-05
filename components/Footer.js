import React, { useContext } from "react";
import { Bar, Center } from "./styleUtils";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { dataContext } from "../pages/_app";

const Separator = () => <>&ensp;-&ensp;</>;

const Footer = () => {
  const { lang } = useContext(dataContext);
  const { t } = useTranslation();

  return (
    <Bar as="footer">
      <Center>
        <p
          dangerouslySetInnerHTML={{
            __html: t("made_by", {
              jill_link: '<a href="https://jillroyer.me">Jill</a>',
              wikitrans_link:
                '<a href="https://wikitrans.co/">Wiki&nbsp;Trans</a>',
            }),
          }}
        />
        <a href="https://github.com/jillro/changemy.name">
          {t("about_github")}
        </a>
        <Separator />
        <Link href="/[lang]/about/[page]" as={`/${lang}/about/contributors`}>
          <a>{t("about_contributors")}</a>
        </Link>
        <Separator />
        <Link href="/[lang]/about/[page]" as={`/${lang}/about/how`}>
          <a>{t("about_how_does_this_work")}</a>
        </Link>
        <Separator />
        <Link href="/[lang]/about/[page]" as={`/${lang}/about/new-company`}>
          <a>{t("about_how_to_contribute")}</a>
        </Link>
      </Center>
    </Bar>
  );
};

export default Footer;
