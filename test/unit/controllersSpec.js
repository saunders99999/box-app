'use strict';

/* jasmine specs for controllers go here */
describe('box controllers', function() {

	beforeEach(module('boxControllers'));

	describe('BoxController', function(){
		var ctrl, myScope;

		beforeEach(inject(function($controller, $rootScope) {
			/* @TODO Get scope right, not initializing the ViewModel properly */
		    myScope = $rootScope.$new();
		    ctrl = $controller('BoxController', {
		        $scope: myScope
		    });
		    ctrl.boxes = [1,2,3,4,5,6];
		    ctrl.lastBoxIndex = 6;
		    ctrl.boxCount = 6;
		    ctrl.boxesViewModel = [];
		    ctrl.addBox( 1 );
		}));

		it('Confirm box initialization', function() {
			console.log(ctrl);
			console.log('vm', ctrl.boxesViewModel);
            expect(ctrl.boxes.length).toBe(6);  
            expect(ctrl.boxesViewModel.length).toBe(6); 
		});

		// @TODO Add more tests to confirm view model construction

	});
});

