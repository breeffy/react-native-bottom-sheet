import React, { useCallback, memo, useRef, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomSheet, SnapPoint } from '@breeffy/react-native-bottom-sheet';
import ContactList from '../components/contactList';
import Button from '../components/button';
import { useHeaderHeight } from '@react-navigation/stack';

interface ExampleScreenProps {
  title: string;
  type: 'FlatList' | 'SectionList' | 'ScrollView' | 'View';
  count?: number;
}

const createExampleScreen = ({ type, count = 50 }: ExampleScreenProps) =>
  memo(() => {
    // hooks
    const bottomSheetRef = useRef<BottomSheet>(null);
    const headerHeight = useHeaderHeight();

    // variables
    const snapPoints = useMemo<SnapPoint[]>(
      () => [
        { relativeTo: 'window', percentagesOf: 25 },
        { relativeTo: 'window', percentagesOf: 50 },
        { relativeTo: 'window', percentagesOf: 90 }
      ],
      []
    );

    // callbacks
    const handleSheetChange = useCallback(index => {
      console.log('handleSheetChange', index);
    }, []);
    const handleSnapPress = useCallback(index => {
      bottomSheetRef.current?.snapTo(index);
    }, []);
    const handleExpandPress = useCallback(() => {
      bottomSheetRef.current?.expand();
    }, []);
    const handleCollapsePress = useCallback(() => {
      bottomSheetRef.current?.collapse();
    }, []);
    const handleClosePress = useCallback(() => {
      bottomSheetRef.current?.close();
    }, []);
    const onBottomSheetAnimate = useCallback(
      (fromIndex: number, toIndex: number) => {
        console.log(
          `onBottomSheetAnimate: animate from index ${fromIndex} to index ${toIndex}`
        );
      },
      []
    );

    return (
      <View style={styles.container}>
        <Button
          label="Snap To 90%"
          style={styles.buttonContainer}
          onPress={() => handleSnapPress(2)}
        />
        <Button
          label="Snap To 50%"
          style={styles.buttonContainer}
          onPress={() => handleSnapPress(1)}
        />
        <Button
          label="Snap To 25%"
          style={styles.buttonContainer}
          onPress={() => handleSnapPress(0)}
        />
        <Button
          label="Expand"
          style={styles.buttonContainer}
          onPress={() => handleExpandPress()}
        />
        <Button
          label="Collapse"
          style={styles.buttonContainer}
          onPress={() => handleCollapsePress()}
        />
        <Button
          label="Close"
          style={styles.buttonContainer}
          onPress={() => handleClosePress()}
        />
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          initialSnapIndex={1}
          topInset={headerHeight}
          onlyDistinctSnaps={false}
          onAnimate={onBottomSheetAnimate}
          onChange={handleSheetChange}
        >
          <ContactList key={`${type}.list`} type={type} count={count} />
        </BottomSheet>
      </View>
    );
  });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24
  },
  title: {
    fontSize: 46,
    lineHeight: 46,
    fontWeight: '800'
  },
  headerContainer: {
    paddingVertical: 24,
    backgroundColor: 'white'
  },
  buttonContainer: {
    marginBottom: 6
  }
});

export const FlatListExampleScreen = createExampleScreen({
  title: 'FlatList Example',
  type: 'FlatList'
});

export const ScrollViewExampleScreen = createExampleScreen({
  title: 'Title',
  type: 'ScrollView'
});

export const SectionListExampleScreen = createExampleScreen({
  title: 'Title',
  type: 'SectionList'
});

export const ViewExampleScreen = createExampleScreen({
  title: 'Title',
  type: 'View',
  count: 8
});
