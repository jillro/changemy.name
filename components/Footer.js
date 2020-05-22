import React from "react";
import { Bar, Center } from "./styleUtils";
import Link from "next/link";

const Separator = () => <>&ensp;-&ensp;</>;

const Footer = () => (
  <Bar as="footer">
    <Center>
      Made by <a href="https://jillroyer.me">Jill</a> on her spare time, with
      help of <a href="https://wikitrans.co/">Wikitrans</a> team
      <Separator />
      <Link href="/about/[page]" as="/about/new-company">
        <a>How to contribute</a>
      </Link>
    </Center>
  </Bar>
);

export default Footer;
