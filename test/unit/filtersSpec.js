'use strict';

/* jasmine specs for filters go here */

describe('filter', function() {

  beforeEach(module('boxFilters'));

  describe('formatNeighborId', function() {
    it('should return empty values for NaN',
        inject(function(formatNeighborIdFilter) {
      expect(formatNeighborIdFilter(NaN)).toBe('\u00A0');
      expect(formatNeighborIdFilter(1)).toBe(1);
    }));

    it('should return back the passed in value when not NAN',
        inject(function(formatNeighborIdFilter) {
      expect(formatNeighborIdFilter(1)).toBe(1);
      expect(formatNeighborIdFilter('5')).toBe('5');
    }));
  });

  describe('addColumnClass', function() {
    it('select the right classees for 1,2 or 3 columns',
        inject(function(addColumnClassFilter) {
      expect(addColumnClassFilter(1)).toBe('col-xs-12 col-sm-12 col-md-12');
      expect(addColumnClassFilter(2)).toBe('col-xs-6 col-sm-6 col-md-6');
      expect(addColumnClassFilter(3)).toBe('col-xs-4 col-sm-4 col-md-4');
    }));
  });

  describe('addBackgroundClass', function() {
    it('choose the right background color class',
        inject(function(addBackgroundClassFilter) {
      expect(addBackgroundClassFilter(1)).toBe('');
      expect(addBackgroundClassFilter(2)).toBe('bg-red');
      expect(addBackgroundClassFilter(3)).toBe('bg-green');
      expect(addBackgroundClassFilter(5)).toBe('bg-highlight');
    }));
  });
});

