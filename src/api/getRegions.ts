import { Feature } from '@global-volcanic-lightning/types';

export const getRegions = (features: Feature[]) =>
    Array.from(new Set(features.map(({ properties }) => properties.area)))

export const getRegionsVolcanoes = (features: Feature[], region: string) =>
    features.filter(({ properties }) => properties.area === region)
