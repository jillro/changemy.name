import styled from "styled-components";
import { useRef } from "react";
import { debounce } from "debounce";

const { useEffect } = require("react");

export const primaryColor = "#4054B2";
export const lightBackgound = "#EBF6FB";
export const textColor = "#333333";
export const lightTextColor = "#cccccc";
export const lightLinkColor = "#ffffff";
export const gutter = "15px";

export const neutralColor = "#6C747C";
export const okColor = "#2DA547";
export const warningColor = "#FFC006";
export const badColor = "#EF5C2F";
export const blockingColor = "#D01700";

/**
 * Accessibility
 */

export const SROnly = styled.span`
  border: 0 !important;
  clip: rect(1px, 1px, 1px, 1px) !important;
  -webkit-clip-path: inset(50%) !important;
  clip-path: inset(50%) !important;
  height: 1px !important;
  overflow: hidden !important;
  padding: 0 !important;
  position: absolute !important;
  width: 1px !important;
  white-space: nowrap !important;
`;

/**
 * Text
 */
export const Center = styled.div`
  text-align: center;
`;

export const Right = styled.div`
  text-align: right;
`;

export const PullRight = styled.div`
  float: right;
`;

/**
 * Grid
 */

export const Container = styled.main`
  width: ${(props) =>
    ({
      window: "1600px",
      wide: "1200px",
    }[props.size] || "800px")};
  max-width: 100%;
  margin: 0 auto;
  padding-left: ${gutter};
  padding-right: ${gutter};
  border-radius: 3px;
  flex-grow: ${(props) => (props.main ? 1 : 0)};
`;

export const Row = styled.div`
  margin-left: -${gutter};
  margin-right: -${gutter};
  display: flex;
  flex-wrap: wrap;
  align-items: ${({ align }) => align || "stretch"};
  justify-content: ${({ justify }) => justify || "start"};
  height: 100%;
`;

const _masonry = (element) => {
  let children = element.children; // actual elements we wanna place
  let translations = [{ X: 0, Y: 0 }]; // table of translations of each child

  let firstChild = children[0].getBoundingClientRect();
  let secondChild = children[1].getBoundingClientRect();
  let lineTop = firstChild.top;
  let childWidth = secondChild.left - firstChild.left;

  if (childWidth === 0) {
    translations = new Array(children.length).fill(
      { X: 0, Y: 0 },
      0,
      children.length + 1
    );
  }

  let currentChild,
    prevChild,
    wrapLength,
    colHeights = [],
    childHeights = [];
  for (let i = 1; childWidth > 0 && i < children.length; i++) {
    prevChild = currentChild || firstChild;
    currentChild = i > 1 ? children[i].getBoundingClientRect() : secondChild;
    childHeights[i - 1] = prevChild.height;

    if (!wrapLength) {
      colHeights[i - 1] = prevChild.top + prevChild.height;
      if (Math.abs(currentChild.top - prevChild.top) > 1) {
        wrapLength = i;
      } else {
        translations[i] = { X: 0, Y: 0 };
        continue;
      }
    }

    let column = i % wrapLength;
    if (column === 0) {
      lineTop += Math.max(
        ...childHeights.slice(i - column - wrapLength, i - column)
      );
    }
    let newColumn = colHeights.indexOf(Math.min(...colHeights));
    translations[i] = {
      X: (newColumn - column) * childWidth,
      Y: colHeights[newColumn] - lineTop,
    };
    colHeights[newColumn] += currentChild.height;
  }

  for (let i = 1; i < children.length; i++) {
    children[i].style.transition = "transform 0.1s";
    children[
      i
    ].style.transform = `translate(${translations[i]["X"]}px, ${translations[i]["Y"]}px)`;
  }
};

export const MasonryRow = (props) => {
  const divEl = useRef(null);

  useEffect(() => {
    if (document.readyState === "complete") {
      _masonry(divEl.current);
    }
    let eventListener = debounce(() => _masonry(divEl.current), 200);
    window.addEventListener("resize", eventListener);
    window.addEventListener("load", eventListener);
    return () => {
      window.removeEventListener("resize", eventListener);
      window.removeEventListener("load", eventListener);
    };
  });

  return <Row align="start" ref={divEl} {...props} />;
};

export const Column = styled.div`
  ${({ collapse, size }) =>
    collapse &&
    `
    @media(max-width: ${
      !size || typeof size === "number" ? collapse / (size || 0.5) : collapse
    }px) {
      min-width: 100%;
    }
    min-width: ${collapse}px;
    `};
  flex-basis: ${({ size }) =>
    ["fixed", "fill"].includes(size) ? "auto" : (size || 0.5) * 100 + "%"};
  flex-grow: ${({ size }) => (size === "fill" ? 1 : 0)};
  padding-left: ${gutter};
  padding-right: ${gutter};
`;

/**
 * Components
 */

export const Bar = styled.div`
  background-color: ${primaryColor};
  color: ${lightTextColor};
  padding: 10px;
  & a {
    color: ${lightLinkColor};
  }
`;

export const LightCardBoard = styled.section`
  background-color: ${lightBackgound};
`;

export const Card = styled.div`
  margin: 20px auto;
  background-color: #fff;
  color: ${textColor};
  border-radius: 10px;
  padding: 1px ${(props) => props.padding || gutter};
  box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.08);
  &:hover {
    box-shadow: 0 7px 10px 0 rgba(64, 84, 178, 0.13);
  }

  transition-property: box-shadow;
  transition-duration: 0.25s;
`;

export const BlueWarning = styled.div`
  margin-left: -${gutter};
  margin-right: -${gutter};
  border-radius: 3px;
  padding: ${gutter};
  background-color: #f0f0ff;
  margin-top: 10px;
`;

export const Separator = styled.hr`
  margin-top: 40px;
  margin-bottom: 40px;
  width: 50%;
  max-width: 100px;
  border: 1px solid ${lightTextColor};
`;
