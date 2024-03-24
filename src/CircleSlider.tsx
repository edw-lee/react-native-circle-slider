import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  LayoutChangeEvent,
  View,
  ViewProps,
  PanResponder,
} from 'react-native';
import { Circle, G, Path, Svg } from 'react-native-svg';
import { clampTo360Rad, degToRad, radToDeg, toPositiveRad } from './util';

export type CircleSliderProps = {
  sliderAngle?: number;
  offsetAngle?: number;
  maxAngle?: number;
  segments?: number;
  size?: number;
  color?: string;
  bgColor?: string;
  onUpdate?: (sliderAngle: number) => void;
  onLayout?: (e: LayoutChangeEvent) => void;
};

const MAX_DELTA_ANGLE = degToRad(60);

export default function CircleSlider({
  sliderAngle = 0,
  offsetAngle = 315,
  maxAngle = 270,
  segments = 6,
  size = 50,
  color = '#ff9933',
  bgColor = '#333',
  onUpdate,
  onLayout,
  ...props
}: CircleSliderProps & ViewProps) {
  sliderAngle = toPositiveRad(degToRad(sliderAngle));
  offsetAngle = toPositiveRad(degToRad(offsetAngle));
  maxAngle = toPositiveRad(degToRad(maxAngle));

  const circleSvgRef = useRef<Svg>(null);

  const [containerWidth, setContainerWidth] = useState(0);
  const [circleCenter, setCircleCenter] = useState({ x: 0, y: 0 });

  const sliderButtonStrokeWidth = size / 20;
  const sliderButtonRadius = size / 2 - sliderButtonStrokeWidth / 2;

  const radius = useMemo(
    () => (containerWidth - size) / 2,
    [containerWidth]
  );

  const center = useMemo(() => containerWidth / 2, [containerWidth]);

  const onLayoutHandler = (e: LayoutChangeEvent) => {
    const { width } = e.nativeEvent.layout;
    setContainerWidth(Math.min(width, Dimensions.get('screen').width));

    circleSvgRef.current?.measure((x, y, w, h, px, py) => {
      setCircleCenter({
        x: containerWidth / 2 + px,
        y: containerWidth / 2 + py,
      });
    });

    if (onLayout) {
      onLayout(e);
    }
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: (evt, { moveX, moveY }) => {
      let newAngle =
        Math.atan2(moveY - circleCenter.y, moveX - circleCenter.x) + Math.PI;

      newAngle = toPositiveRad(newAngle - offsetAngle);

      if (Math.abs(newAngle - sliderAngle) > MAX_DELTA_ANGLE) {
        return;
      }

      newAngle = Math.min(newAngle, maxAngle);

      if (onUpdate) {
        onUpdate(radToDeg(newAngle));
      }
    },
  });

  const ArcSegments = useCallback(
    ({
      targetAngle,
      strokeColor,
    }: {
      targetAngle: number;
      strokeColor: string;
    }) => {
      const segmentAngle = targetAngle / segments;

      return Array.from(Array(segments).keys()).map((index) => {
        const _startAngle = segmentAngle * index + offsetAngle;
        const _endAngle = segmentAngle * (index + 1) + offsetAngle;
        const startX = center - Math.cos(_startAngle) * radius;
        const startY = center - Math.sin(_startAngle) * radius;
        const endX = center - Math.cos(_endAngle) * radius;
        const endY = center - Math.sin(_endAngle) * radius;

        return (
          <Path
            key={index}
            d={`M ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY}`}
            fill={'none'}
            strokeWidth={size}
            stroke={strokeColor}
            strokeLinecap="round"
          />
        );
      });
    },
    [radius, offsetAngle, size, maxAngle]
  );

  return (
    <View {...props} onLayout={onLayoutHandler}>
      <Svg ref={circleSvgRef} width={containerWidth} height={containerWidth}>
        <ArcSegments targetAngle={maxAngle} strokeColor={bgColor} />

        <ArcSegments targetAngle={sliderAngle} strokeColor={color} />

        <Circle
          cx={center - Math.cos(sliderAngle + offsetAngle) * radius}
          cy={center - Math.sin(sliderAngle + offsetAngle) * radius}
          r={sliderButtonRadius}
          stroke={color}
          strokeWidth={sliderButtonStrokeWidth}
          fill={bgColor}
          {...panResponder.panHandlers}
        />
      </Svg>
    </View>
  );
}
