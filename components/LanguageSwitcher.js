import { dataContext } from "../pages/_app";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { localizePath } from "../i18n";
import Link from "next/link";
import { gutter } from "./styleUtils";

const { useState } = require("react");

export const LanguageSwitcher = ({ light }) => {
  const { lang, langs } = useContext(dataContext);
  const router = useRouter();

  const [showList, setShowList] = useState(false);

  useEffect(() => {
    if (showList) {
      let hideList = () => {
        setShowList(false);
      };
      document.addEventListener("click", hideList);

      return () => {
        document.removeEventListener("click", hideList);
      };
    }
  });

  return (
    <div className="dropdown">
      <button onClick={() => setShowList(!showList)}>{langs[lang]}</button>
      <ul>
        {Object.entries(langs).map(([code, name]) => (
          <li key={code}>
            <Link href={router.pathname} as={localizePath(router.asPath, code)}>
              <a>{name}</a>
            </Link>
          </li>
        ))}
      </ul>
      <style jsx>{`
        .dropdown {
          position: relative;
          display: inline-block;
        }

        button {
          color: ${light ? "#fff" : "inherit"};
          border: 0;
          appearance: none;
          padding: 0.6em 1.8em 0.5em 0.8em;
          background-color: rgba(255, 255, 255, 0);
          background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
          background-repeat: no-repeat, repeat;
          background-position: right 0.7em top 50%, 0 0;
          background-size: 0.65em auto, 100%;
          margin: 0;
        }

        ul {
          border: 1px solid #bababa;
          display: ${showList ? "block" : "none"};
          border-radius: 3px;
          text-align: left;
          list-style: none;
          position: absolute;
          background-color: #fff;
          color: #333333;
          padding: ${gutter};
          margin: 0;
        }

        ul a {
          color: #333333;
        }

        li:hover {
          background-color: darken(0.1, #fff);
        }
      `}</style>
    </div>
  );
};
