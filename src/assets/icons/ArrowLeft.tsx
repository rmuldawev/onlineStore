import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const GoBack = (props: SvgProps) => (
  <Svg width={8} height={14} fill="none" {...props}>
    <Path
      stroke="#14145A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 13 1 7l6-6"
    />
  </Svg>
);
export default GoBack;
