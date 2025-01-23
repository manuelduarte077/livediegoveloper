import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import {City} from '../interface/City';
import {Theme} from '../theme/theme';

interface CityDetailModalProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  selectedCity: City | null;
  theme: Theme;
  onSheetChanges: (index: number) => void;
}

export const CityDetailModal: React.FC<CityDetailModalProps> = ({
  bottomSheetModalRef,
  selectedCity,
  theme,
  onSheetChanges,
}) => {
  return (
    <BottomSheetModal
      snapPoints={['50%']}
      ref={bottomSheetModalRef}
      backgroundStyle={{
        backgroundColor: theme.colors.background,
      }}
      onChange={onSheetChanges}>
      <BottomSheetView>
        {selectedCity && (
          <View style={styles.bottomSheetContent}>
            <Image
              source={{uri: selectedCity.imagen}}
              resizeMode="cover"
              style={styles.modalImage}
            />
            <Text style={[styles.modalTitle, {color: theme.colors.text}]}>
              {selectedCity.titulo}
            </Text>
            <Text style={[styles.modalDescription, {color: theme.colors.text}]}>
              {selectedCity.descripcion}
            </Text>
          </View>
        )}
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  bottomSheetContent: {
    padding: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalDescription: {
    fontSize: 16,
    lineHeight: 24,
  },
});
