import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const Form = styled.form`
  & fieldset {
    margin-bottom: 32px;
    legend {
      font-size: 1.5rem;
      padding: 0 16px;
    }
    border-radius: 8px;
  }
  & label {
    display: block;
    font-weight: 700;
    margin-top: 32px;
    margin-bottom: 8px;
  }
  & textarea,
  & input:not([type="submit"]) {
    margin-bottom: 8px;
    margin-left: 40px;
    border: 0;
    background-color: #ebf6fb;
    padding: 16px;
    display: block;
    border-radius: 8px;
    transition: border 0.5s;
    &:focus {
      border: 0;
      box-shadow: lightgray 0 0 3px;
    }
  }

  & textarea {
    height: 30vw;
    max-height: 160px;
    width: calc(100% - 40px);
  }

  & input[type="submit"] {
    border-radius: 8px;
    background-color: #4054b2;
    color: #fff;
    display: block;
    font-size: 20px;
    font-weight: 700;
    margin: 60px 40px 60px;
    border: 0;
    padding: 16px 40px;
    &:hover {
      background-color: #5064c2;
      box-shadow: lightgray 0 0 3px;
    }
  }
`;

export default function ContributionForm({ lang }) {
  const { t } = useTranslation();
  return (
    <Form
      method="POST"
      action={`https://n8n.jillro.dev/webhook/changemyname-${lang}`}
    >
      <p>
        <strong>{t("contribute_form.service_details")}</strong>
      </p>
      <ul>
        <li>{t("contribute_form.service_name")}</li>
        <li>{t("contribute_form.country")}</li>
        <li>{t("contribute_form.website")}</li>
        <li>{t("contribute_form.explanation")}</li>
      </ul>
      <textarea
        name="service"
        placeholder={t("contribute_form.answer_placeholder")}
      />
      <p>
        <strong>{t("contribute_form.process")}</strong>
      </p>
      <ul>
        <li>{t("contribute_form.when")}</li>
        <li>{t("contribute_form.form")}</li>
        <li>{t("contribute_form.support_when")} </li>
        <li>{t("contribute_form.support_new_account")} </li>
      </ul>
      <textarea
        name="process"
        placeholder={t("contribute_form.answer_placeholder")}
      />
      <p>
        <strong>{t("contribute_form.legal")}</strong>
      </p>
      <ul>
        <li>{t("contribute_form.identity")}</li>
        <li>{t("contribute_form.reason")}</li>
        <li>{t("contribute_form.official")}</li>
      </ul>
      <textarea
        name="legal"
        placeholder={t("contribute_form.answer_placeholder")}
      />
      <p>
        <strong>{t("contribute_form.privacy")}</strong>
      </p>
      <ul>
        <li>{t("contribute_form.user_id")}</li>
        <li>{t("contribute_form.comments")}</li>
      </ul>
      <textarea
        name="privacy"
        placeholder={t("contribute_form.answer_placeholder")}
      />
      <p>
        <strong>{t("contribute_form.contribution")}</strong>
      </p>
      <ul>
        <li>
          {t("contribute_form.credited")}
          <ul>
            <li>{t("contribute_form.credit_name")}</li>
            <li>{t("contribute_form.credit_url")}</li>
          </ul>
        </li>
      </ul>
      <textarea
        name="contribution"
        placeholder={t("contribute_form.answer_placeholder")}
      />
      <p>
        <strong>{t("contribute_form.email")}</strong>
      </p>
      <input
        type="email"
        name="email"
        placeholder="email@email.com"
        required="true"
      />

      <input type="submit" value={t("contribute_form.submit")} />
    </Form>
  );
}
