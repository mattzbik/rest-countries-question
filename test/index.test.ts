import { fakeCountries } from '@/mocks/mock';
import {
  currencyCounter,
  meanDensity,
  medianDensity,
  standardDeviationDensity,
  unMemberCount,
} from '@/utils/utils';

describe('Utility Methods', () => {
  describe('meanDensity()', () => {
    it('returns the mean of fakeCountries populationDensity (131 + 46 + 45)/3 to be 74', () => {
      expect(meanDensity(fakeCountries)).toBe(74);
    });
  });

  describe('medianDensity()', () => {
    it('returns the median of fakeCountries populationDensity (45, 46, 131) to be 46', () => {
      expect(medianDensity(fakeCountries)).toBe(46);
    });
  });

  describe('standardDeviation()', () => {
    it('returns the standard deviation of fakeCountries populationDensity (Sqrt(((45-74)^2) + ((46-74)^2) + ((131-74)^2)) / 3) to be 40.307154038292836', () => {
      expect(standardDeviationDensity(fakeCountries)).toBe(40.307154038292836);
    });
  });

  describe('unMemberCount()', () => {
    it('returns count of UN members to be 3', () => {
      expect(unMemberCount(fakeCountries)).toBe(3);
    });
  });

  describe('currencyCounter()', () => {
    it('returns count of 2 members that use EUR currency', () => {
      expect(currencyCounter(fakeCountries, 'EUR')).toBe(2);
    });
  });
});
