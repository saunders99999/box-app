'use strict';

/* jasmine specs for filters go here */

describe('filter', function() {

  beforeEach(module('boxFilters'));

  describe('formatNeighborId', function() {

    it('should convert boolean values to unicode checkmark or cross',
        inject(function(formatNeighborId) {
      expect(formatNeighborIdFilter(NaN)).toBe('\u00A0');
      expect(formatNeighborIdFilter(1)).toBe('1');
    }));
  });
});
