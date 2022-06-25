import { Feature } from '@global-volcanic-lightning/types';
import { getRegions, getRegionsVolcanoes } from '../src/api/getRegions';
import lightningMock from './lightning-mock.json';

describe('Volcanic Regions Formatter', () => {
    const regions = getRegions(lightningMock.features as Feature[]);
    const expected = ["Georgia", "Africa-W", "Sulawesi-Indonesia", "Ryukyu Is", "Kyushu-Japan", "Mariana Is-C Pacific", "Canada", "US-California", "US-Arizona", "México", "Guatemala", "El Salvador", "Honduras", "Nicaragua", "Costa Rica", "Colombia"]
    it('should format an array of the regions with no duplicate entries', () => {
      expect(regions).toEqual(expected)
    })
})

describe('Regional Volcanoes', () => {
    const filterVolcanoes = (region: string) => getRegionsVolcanoes(lightningMock.features as Feature[], region).map(({ properties }) => properties.name)
    const japaneseVolcanoes = filterVolcanoes("Kyushu-Japan");
    const africanVolcanoes = filterVolcanoes("Africa-W");
    const caliVolcanoes= filterVolcanoes("US-California");

    it("Japanese volcanoes should only contain 'Unzen', 'Aso', 'Kuju'", () => {
        expect(japaneseVolcanoes).toEqual(['Unzen', 'Aso', 'Kuju'])
    })
    it("African volcanoes should only contain 'Ngaoundere Plateau'", () => {
        expect(africanVolcanoes).toEqual(['Ngaoundere Plateau'])
    })
    it("Californian volcanoes should only contain 'Mono Craters', 'Inyo Craters', 'Mammoth Mountain'", () => {
        expect(caliVolcanoes).toEqual([ 'Mono Craters', 'Inyo Craters', 'Mammoth Mountain' ])
    })
});
