import type { Preview } from "@storybook/nextjs-vite";
import "../src/app/globals.css";
import {
  notoSansSC,
  notoSerifSC,
  cormorantGaramond,
  inter,
} from "../src/lib/fonts";
import React from "react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
    backgrounds: {
      default: "dark",
      values: [
        {
          name: "dark",
          value: "var(--color-bg-primary)",
        },
        {
          name: "light",
          value: "var(--color-bg-primary)",
        },
      ],
    },
  },
  decorators: [
    (Story) => {
      const fontVariables = [
        notoSansSC.variable,
        notoSerifSC.variable,
        cormorantGaramond.variable,
        inter.variable,
      ].join(" ");

      return (
        <div className={`dark dark-theme ${fontVariables}`}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
