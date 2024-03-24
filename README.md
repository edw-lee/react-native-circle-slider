# react-native-circle-slider

A react native circle slider

## Installation

```sh
npm install @edwinlee/react-native-circle-slider
```

## Usage

```js
import { CircleSlider } from '@edwinlee/react-native-circle-slider';

// ...
 const [sliderAngle, setSliderAngle] = React.useState(0);
 const [height, setHeight] = React.useState(0);

 const onUpdateHandler = (angle: number) => {
    setSliderAngle(angle);
 };

 const onLayoutHandler = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;

    const sliderRadius = SLIDER_SIZE / 2;
    const halfWidth = width / 2;
    const newHeight = Math.abs(
      Math.sin(degToRad(MAX_ANGLE + OFFSET_ANGLE)) * (halfWidth - sliderRadius)
    );
    setHeight(halfWidth + newHeight + sliderRadius);
 };


<CircleSlider
  offsetAngle={-45}
  maxAngle={270}
  onLayout={onLayoutHandler}
  size={80}
  sliderAngle={sliderAngle}
  onUpdate={onUpdateHandler}
/>;
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
