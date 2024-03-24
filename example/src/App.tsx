import * as React from 'react';

import {
  Button,
  Dimensions,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CircleSlider } from '@edw-lee/react-native-circle-slider';
import { degToRad, radToDeg } from '../../src/util';

const OFFSET_ANGLE = -45;
const MAX_ANGLE = 270;
const SLIDER_SIZE = 80;

export default function App() {
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

  return (
    <View style={styles.container}>
      <CircleSlider
        offsetAngle={OFFSET_ANGLE}
        maxAngle={MAX_ANGLE}
        onLayout={onLayoutHandler}
        size={SLIDER_SIZE}
        style={{
          width: '80%',
          overflow: 'hidden',
          height,
        }}
        sliderAngle={sliderAngle}
        onUpdate={onUpdateHandler}
      />

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <TouchableOpacity
          onPress={() => setSliderAngle(Math.max(sliderAngle - 1, 0))}
        >
          <Text style={{ fontSize: 40 }}>-</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 40 }}>{Math.round(sliderAngle)}</Text>

        <TouchableOpacity
          onPress={() => setSliderAngle(Math.min(sliderAngle + 1, 270))}
        >
          <Text style={{ fontSize: 40 }}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
