import { Feature } from '@global-volcanic-lightning/types';
import { highestStrikes, alertStrikes } from '../src/api/sortedStrikeData';
import lightningMock from './lightning-mock.json';

describe('Top 10 Highest Striked Volcanoes', () => {
    const strikes = highestStrikes(lightningMock.features as Feature[]);
    const locations = strikes.map((strike) => strike.name)
    it("Highest striked volcanoes should only contain 'Kabargin Oth Group', 'Mono Craters', 'Inyo Craters'", () => {
      expect(locations).toEqual([
        'Kuchinoerabu-jima',
        'Kikai',
        'Gaja-jima',
        'Kogaja-jima',
        'Almolonga',
        'Santa María',
        'Tolimán',
        'Atitlán',
        'Acatenango',
        'Fuego'
      ])
    })
});

describe('All High Alert Volcanoes', () => {
    const strikes = alertStrikes(lightningMock.features as Feature[]);
    const locations = strikes.map((strike) => strike.name)
    it("High alert volcanoes should only contain 'Kuchinoerabu-jima', 'Kikai', 'Gaja-jima', 'Kogaja-jima', 'Almolonga', 'Santa María', 'Tolimán', 'Atitlán', 'Acatenango', 'Fuego'", () => {
      expect(locations).toEqual([
        'Kabargin Oth Group',
        'Mono Craters',
        'Inyo Craters'
      ])
    })
})
