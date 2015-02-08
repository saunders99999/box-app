'use strict';

(function() {
/* Controllers */

var boxControllers = angular.module('boxControllers', []),
    boxes = [ 1 ],
    lastBoxIndex = 1,
    
    // choosing flat view model, other approach is nested view model.  Expect that would be 
    // messy to maintain
    boxesViewModel = [],

    // stats/metrics
    deleteCount = 0,
    lastDeleted = '',

    // gray color array, perhaps could find better CSS way to maintain classes, but currently
    // conflicting with Bootstrap
    gray = [ '#D0D0D0', '#C8C8C8', '#C0C0C0', '#B8B8B8', '#B0B0B0', '#A8A8A8', '#A0A0A0', 
             '#989898', '#909090', '#888888', '#808080', '#787878', '#707070', '#686868' ],
    GRAYMIN = 1,
    GRAYMAX = 17,
    grayIndex = 1,

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

        return boxesViewModel;
    },
    retrieveAppState = function() {
        if(typeof(Storage) !== 'undefined') {
            var x = localStorage.getItem( 'box.boxes' );
            boxes = (x) ? x.split( ',' ) : boxes;

            lastBoxIndex = localStorage.getItem( 'box.lastBoxIndex' ) || lastBoxIndex;
            deleteCount = localStorage.getItem( 'box.deleteCount' ) || deleteCount;
            lastDeleted = localStorage.getItem( 'box.lastDeleted' ) || lastDeleted;
        }
    },
    persistAppState = function( lastBoxIndex, deleteCount, lastDeleted ) {
        if(typeof(Storage) !== 'undefined') {
            localStorage.setItem( 'box.boxes', boxes);
            localStorage.setItem( 'box.lastBoxIndex', lastBoxIndex);
            localStorage.setItem( 'box.deleteCount', deleteCount);
            localStorage.setItem( 'box.lastDeleted', lastDeleted);
        }
    },
    moreGray = function( ) {
        // http://stackoverflow.com/questions/17230242/angular-element-vs-document-getelementbyid-or-jquery-selector-with-spin-busy-c
        var elem = angular.element( document.querySelector( '#container2' ) );

        grayIndex = (grayIndex < GRAYMAX) ? (grayIndex + 1) : grayIndex;
        elem.css( 'background-color', gray[grayIndex] );
    },
    lessGray = function( ) {
        var elem = angular.element( document.querySelector( '#container2' ) );

        grayIndex = (grayIndex > GRAYMIN) ? (grayIndex - 1) : grayIndex;
        elem.css( 'background-color', gray[grayIndex] );
    };

// initialize
retrieveAppState();
setViewModel( boxes );

boxControllers.controller('BoxController', [ 
  function() {
    // box model
  	this.boxes = boxes;
    this.boxCount = boxes.length;
    this.boxesViewModel = setViewModel( boxes );

    // status
    this.deleteCount = deleteCount;
    this.lastDeleted = lastDeleted;
    
    // behavior
    this.addBox = function( index ) {
        moreGray();
        this.boxCount++;
        boxes.splice(index, 0, ++lastBoxIndex);
        setViewModel( boxes );
        persistAppState( lastBoxIndex, this.deleteCount, this.lastDeleted );
    };
    this.removeBox = function( index ) {
        lessGray();
        this.lastDeleted = 'Last Deleted [index: ' + index + ']:[value' + boxes[index] + ']';
        this.boxCount--;
        this.deleteCount++;
        boxes.splice(index, 1);
        boxesViewModel.splice(index, 1);
        setViewModel( boxes );
        persistAppState( lastBoxIndex, this.deleteCount, this.lastDeleted );
    };
  }]);

  return boxControllers;

})();





