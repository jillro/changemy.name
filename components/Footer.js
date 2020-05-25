import React from "react";
import { Bar, Center } from "./styleUtils";
import Link from "next/link";

const Separator = () => <>&ensp;-&ensp;</>;

const Footer = () => (
  <Bar as="footer">
    <Center>
      <p>
        Made by <a href="https://jillroyer.me">Jill</a> on her spare time, with
        help of <a href="https://wikitrans.co/">Wiki&nbsp;Trans</a> team
      </p>
      <a href="https://github.com/jillro/changemy.name">GitHub project</a>
      <Separator />
      <Link href="/about/[page]" as="/about/contributors">
        <a>Contributors</a>
      </Link>
      <Separator />
      <Link href="/about/[page]" as="/about/how">
        <a>How does this work?</a>
      </Link>
      <Separator />
      <Link href="/about/[page]" as="/about/new-company">
        <a>How to contribute ❤</a>
      </Link>
    </Center>
  </Bar>
);

export default Footer;
