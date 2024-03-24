# @edw-lee/react-native-circle-slider

A react native circle slider

## Installation

```sh
npm install @edw-lee/react-native-circle-slider
```
## Preview

<img src="screenshots/preview.png" width='250'/>

## Usage

```js
import { CircleSlider } from '@edw-lee/react-native-circle-slider';

const OFFSET_ANGLE = -45;
const MAX_ANGLE = 270;
const SLIDER_SIZE = 80;

// ...
 const [sliderAngle, setSliderAngle] = React.useState(0);
 const [height, setHeight] = React.useState(0);

 const onUpdateHandler = (angle: number) => {
    setSliderAngle(angle);
 };

 const onLayoutHandler = (e: LayoutChangeEvent) => {
   // ...
 };

<CircleSlider
  sliderAngle={sliderAngle}
  offsetAngle={OFFSET_ANGLE}
  maxAngle={MAX_ANGLE}
  size={SLIDER_SIZE}
  onLayout={onLayoutHandler}
  onUpdate={onUpdateHandler}
  style={/*...*/}
/>
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
