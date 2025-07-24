import React from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import AssetCard from '@/components/AssetCard';
import { Asset } from '@/constants/assets';

interface AssetCarouselProps {
  assets: Asset[];
  onAssetPress: (assetId: string) => void;
  showBackgroundImages?: boolean;
}

const { width: screenWidth } = Dimensions.get('window');
const CARD_WIDTH = screenWidth - 32; // 16px padding on each side
const CARD_SPACING = 16;

export default function AssetCarousel({ assets, onAssetPress, showBackgroundImages = false }: AssetCarouselProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      decelerationRate="fast"
      snapToInterval={CARD_WIDTH + CARD_SPACING}
      snapToAlignment="start"
      contentInset={{
        left: 16,
        right: 16,
      }}
      contentContainerStyle={styles.scrollContainer}
      style={styles.carousel}
    >
      {assets.map((asset, index) => (
        <View key={asset.id} style={[styles.cardContainer, { marginRight: index === assets.length - 1 ? 16 : CARD_SPACING }]}>
          <AssetCard 
            asset={asset} 
            onPress={() => onAssetPress(asset.id)}
            showBackgroundImage={showBackgroundImages}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  carousel: {
    marginBottom: 24,
  },
  scrollContainer: {
    paddingLeft: 16,
  },
  cardContainer: {
    width: CARD_WIDTH,
  },
});