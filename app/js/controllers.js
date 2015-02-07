'use strict';

(function() {
/* Controllers */

var boxControllers = angular.module('boxControllers', []),
    boxes = [ 1 ],
    // choosing flat view model, other approach is nested view model
    boxesViewModel = [],
    lastBoxIndex = boxes[ boxes.length-1 ],
    getRightBoxId = function( modulus, index ) {
        // are we on the very last box?
        if ( !boxes[ index + 1 ] ) {
            return NaN;
        }

        // modulus of 3, 5, 0 are boxes positioned on the right
        return ( modulus === 1 || modulus === 2 || modulus === 4 ) ? boxes[ index + 1] : NaN;
    },
    getLeftBoxId = function( modulus, index ) {
        // is this the very first box?
        if ( index === 0 ) {
            return NaN;
        }

        // modulus of 1, 4, 0 are boxes positioned on the left
        return ( modulus === 2 || modulus === 3 || modulus === 5 ) ? boxes[ index - 1] : NaN;
    },
    isNewRow = function( modulus ) {
        return ( modulus === 1 || modulus === 4 || modulus === 0 ) ? true : false;
    },
    getNumColumns = function( modulus ) {
        if ( modulus === 0 ) {
            return 1;
        } 
        else if ( modulus === 4 || modulus === 5 ) {
            return 2;
        }
        else {
            return 3;
        }
    },
    setViewModel = function( boxes ) {
        boxes.forEach( function( element, index ) { 
            var modulus = (index + 1) % 6,
            lastBox = (boxes.length === (index + 1));

            boxesViewModel[ index ] = {
                id: element,
                index: index,
                newLine: isNewRow( modulus ),
                rightBoxId: getRightBoxId( modulus, index ),
                leftBoxId: getLeftBoxId( modulus, index ),
                numColumns: getNumColumns( modulus ),
                background: (lastBox ? 5 : ((index + 1) % 4))
            };
        });
    };

setViewModel( boxes );

boxControllers.controller('BoxController', [ 
  function() {
  	this.boxes = boxes;
    this.boxesViewModel = boxesViewModel;
    this.addBox = function( index ) {
        boxes.splice(index, 0, ++lastBoxIndex);
        setViewModel( boxes );
    };
    this.removeBox = function( index ) {
        boxes.splice(index, 1);
        boxesViewModel.splice(index, 1);
        setViewModel( boxes );
    };
  }]);

  return boxControllers;

})();





