import styled from "styled-components";

export const primaryColor = '#4054B2';
export const lightBackgound = '#EBF6FB';
export const textColor = '#333333';
export const lightTextColor = '#cccccc';
export const lightLinkColor = '#ffffff';
export const gutter = '15px';

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
  min-height: 100%;
  max-width: ${props => ({
    'window': '1600px',
    'wide': '1200px'
  }[props.size] || '800px')};
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
  align-items: stretch;
`

export const Column = styled.div`
  min-width: ${props=> props.size === 'fixed' ? 'none' : '400px'};
  flex-basis: ${props => props.size === 'fixed' ? 'auto' : (props.size ? (props.size * 50) + "%" : '50%')};
  flex-grow: ${props => props.size === 'fixed' ? 0 : (props.size || 1)};;
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