'use strict';

(function() {
/* Filters */

var boxFilters = angular.module('boxFilters', []);

boxFilters.filter('formatNeighborId', function() {
  return function( id ) {
  	// unicode value for '\u00A0', &nbsp;
  	// for filtered edge values from the display
    return isNaN( id ) ? '\u00A0' : id;
  };
});

// Map column size to bootstrap class
boxFilters.filter('formatId', function() {
  return function( id ) {  	
  	return '[' + id + ']';
  };
});

// Map column size to bootstrap class
boxFilters.filter('addColumnClass', function() {
  return function( numColumns ) {
  	if ( numColumns === 1 ) {
  		return 'col-xs-12 col-sm-12 col-md-12';
  	}
  	else if ( numColumns === 2 ) {
  		return 'col-xs-6 col-sm-6 col-md-6';
  	}
  	return 'col-xs-4 col-sm-4 col-md-4';
  };
});

// Map column size to bootstrap class
boxFilters.filter('addBackgroundClass', function() {
  return function( colorId ) {
  	if ( colorId === 1 ) {
  		return '';
  	}
  	else if ( colorId === 2 ) {
  		return 'bg-red';
  	}
  	else if ( colorId === 3 ) {
  		return 'bg-green';
  	}
  	else if ( colorId === 0 ) {
  		return 'bg-blue';
  	}
    else if ( colorId === 5 ) {
      return 'bg-highlight';
    }
  };
});

})();

