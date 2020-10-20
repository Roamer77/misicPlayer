import {Path, Svg} from "react-native-svg";
import React from "react";

const ToolBarBackground = ({width, height, fill}) => (
    <Svg width={width} height={height} viewBox="0 39 375 100" preserveAspectRatio='none' fillOpacity={1}>
        <Path fillRule="evenodd"
              clipRule="evenodd"
              fill={fill}
              fillOpacity={1}
              d="M0 40H127.822C136.75 40 144.566 45.937 147.913 54.2138C152.474 65.4916 159.913 80.2259 169.246 85.6172C175.148 89.0269 194.005 95.6325 210.277 83.0325C216.849 77.9427 224.148 63.5252 228.947 52.7719C232.341 45.1683 239.773 40 248.099 40H375V120H0V40Z"/>
    </Svg>

);
export default ToolBarBackground;
