import styled from "styled-components";
import {useRef} from "react";
import {debounce} from "debounce";

const {useEffect} = require("react");

export const primaryColor = '#4054B2';
export const lightBackgound = '#EBF6FB';
export const textColor = '#333333';
export const lightTextColor = '#cccccc';
export const lightLinkColor = '#ffffff';
export const gutter = '15px';

export const neutralColor = '#6C747C';
export const okColor = '#2DA547';
export const warningColor = '#FFC006';
export const badColor = '#EF5C2F';
export const blockingColor = '#D01700';

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
`

/**
 * Text
 */
export const Center = styled.div`
  text-align: center;
`

export const Right = styled.div`
  text-align: right;
`


/**
 * Grid
 */

export const Container = styled.main`
  width: ${props => ({
    'window': '1600px',
    'wide': '1200px'
  }[props.size] || '800px')};
  max-width: 100%;
  margin: 0 auto;
  padding: ${gutter};
  border-radius: 3px;
  flex-grow: ${props => props.main ? 1 : 0};
`

export const Row = styled.div`
  margin-left: -${gutter};
  margin-right: -${gutter};
  display: flex;
  flex-wrap: wrap;
  align-items: ${({_noStretch}) => _noStretch ? "start" : "stretch"};
  height: 100%;
`

const _masonry = (element) => {
  let children = element.children; // actual elements we wanna place
  let translations = [0]; // table of translations of each child
  let heights = []; // list of heights for each children
  let wrapLength; // detected number of columns on the grid

  for (let i = 1; i < children.length; i++) {
    let prevChild = children[i-1].getBoundingClientRect();
    let currentChild = children[i].getBoundingClientRect();
    heights[i -1] = prevChild.height + translations[i - 1];

    if (!wrapLength && currentChild.top !== prevChild.top) {
      wrapLength = i;
    } else if (!wrapLength) {
      translations[i] = 0;
      continue;
    }

    let column = i % wrapLength;
    let prevlineHeights = heights.slice(i - column - wrapLength, i - column);
    translations[i] = prevlineHeights[column] - Math.max(...prevlineHeights);
  }

  for (let i = 1; i < children.length; i++) {
    children[i].style.transition = 'transform 0.1s';
    children[i].style.transform = `translateY(${translations[i]}px)`;
  }
}

export const MasonryRow = (props) => {
  const divEl = useRef(null);

  useEffect(() => {
    _masonry(divEl.current);
    let eventListener = debounce(() => _masonry(divEl.current), 200);
    window.addEventListener('resize', eventListener);
    window.addEventListener('load', eventListener);
    return () => {
      window.removeEventListener('resize', eventListener);
      window.removeEventListener('load', eventListener);
    }
  });

  return <Row _noStretch ref={divEl} {...props} />
}

export const Column = styled.div`
  ${({collapse, size}) => collapse && `
    @media(max-width: ${!size || typeof size === 'number' ? collapse / (size || 0.5) : collapse}px) {
      min-width: 100%;
    }
    min-width: ${collapse}px;
    `
  };
  flex-basis: ${({size}) => ['fixed', 'fill'].includes(size) ? 'auto' : (size || 0.5) * 100 + "%"};
  flex-grow: ${({size}) => size === 'fill' ? 1 : 0};
  padding-left: ${gutter};
  padding-right: ${gutter};
`

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
`

export const LightCardBoard = styled.section`
  background-color: ${lightBackgound};
`

export const Card = styled.div`
  margin: 20px auto;
  background-color: #fff;
  color: ${textColor};
  border-radius: 10px;
  padding: 1px ${props => (props.padding || gutter)};
  box-shadow: 0 2px 1px 0 rgba(0,0,0,.08);
  &:hover {
    box-shadow: 0 7px 10px 0 rgba(64,84,178,.13);
  }
  
  transition-property: box-shadow;
  transition-duration: .25s;
`

export const Separator = styled.hr`
  margin-top: 40px;
  margin-bottom: 40px;
  width: 50%;
  max-width: 100px;
  border: 1px solid ${lightTextColor};
`;
