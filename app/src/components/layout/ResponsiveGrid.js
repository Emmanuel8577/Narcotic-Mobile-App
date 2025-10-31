// src/components/layout/ResponsiveGrid.js
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useResponsive } from '../../hooks/useResponsive';

const ResponsiveGrid = ({ 
  children, 
  columns = 1,
  spacing = 'md',
  style,
  itemStyle,
  ...props 
}) => {
  const { isTablet, isLandscape, responsiveSpacing } = useResponsive();

  // Adjust columns based on screen size
  const getColumnCount = () => {
    if (isTablet) {
      return Math.min(columns * 2, 4); // Double columns on tablet
    }
    if (isLandscape && columns > 1) {
      return Math.min(columns + 1, 3); // Add one column in landscape
    }
    return columns;
  };

  const columnCount = getColumnCount();
  const gap = responsiveSpacing[spacing] || responsiveSpacing.md;

  const gridStyle = [
    styles.grid,
    {
      marginHorizontal: -gap / 2,
    },
    style,
  ];

  const cellStyle = [
    styles.cell,
    {
      width: `${100 / columnCount}%`,
      paddingHorizontal: gap / 2,
      marginBottom: gap,
    },
    itemStyle,
  ];

  return (
    <View style={gridStyle} {...props}>
      {React.Children.map(children, (child, index) => (
        child ? (
          <View style={cellStyle} key={index}>
            {child}
          </View>
        ) : null
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    // Cell styles are applied dynamically
  },
});

export default ResponsiveGrid;