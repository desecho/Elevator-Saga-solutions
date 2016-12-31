{
init: function(elevators, floors) {
    function goToFloor(elevator, floorNum) {
      function elevator_already_plans_to_go_to_floor(elevator, floorNum) {
        return elevator.destinationQueue.indexOf(floorNum) !== -1;
      }
      if (!elevator_already_plans_to_go_to_floor(elevator, floorNum)) {
        elevator.goToFloor(floorNum);
      }
    }

    function elevator_call(){
      var floorNum = this.floorNum();
      var min_queue = 999999;
      var elevator_to_go;
      elevators.forEach(function(elevator){
          if (elevator.destinationQueue.length < min_queue) {
            min_queue = elevator.destinationQueue.length;
            elevator_to_go = elevator;
          }
      });

      goToFloor(elevator_to_go, floorNum)
    }

    elevators.forEach(function(elevator){
        elevator.on("floor_button_pressed", function(floorNum) {
          goToFloor(elevator, floorNum)
        } );
    });

    floors.forEach(function(floor){
        floor.on("up_button_pressed", elevator_call);
        floor.on("down_button_pressed", elevator_call);
    });

},
    update: function(dt, elevators, floors) {
      for (i = 0; i<elevators.length; i++) {
        console.log(i, elevators[i].destinationQueue);
      }
      elevators.forEach(function(elevator){
        if(elevator.loadFactor() == 1) {
          return;
        }

        var newQueue = [];
        elevator.destinationQueue.forEach(function(floorNum){
          if(elevator.currentFloor() === floorNum) {
            newQueue.unshift(floorNum);
          } else {
            newQueue.push(floorNum);
          }
        });
        elevator.destinationQueue = newQueue;
        elevator.checkDestinationQueue();
      });
    }
}

