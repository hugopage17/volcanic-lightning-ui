import { GeoJSON } from '@global-volcanic-lightning/types';
import { formatCSVData } from '../src/api/formatCSV';
import lightningMock from './lightning-mock.json';

const lightningData = JSON.parse(JSON.stringify(lightningMock)) as GeoJSON;

describe('CSV Formatter', () => {
  global.URL.createObjectURL = jest.fn();
  const csvData = formatCSVData(lightningData.features);
  console.log(csvData)
  it('should format the lightning data GeoJSON into a csv format', () => {
    expect(csvData.split('\n')[0]).toEqual('Name,Region,Volcano Type,20km Strikes,100km Strikes,Severity,Coordiantes')
    expect(csvData.split('\n')[1].split(',')[0]).toEqual('Kabargin Oth Group')
  })
})
