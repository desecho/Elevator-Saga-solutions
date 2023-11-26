{
    init: function(elevators, floors) {
        elevators.forEach(function(elevator){
            elevator.on("floor_button_pressed", function(floorNum) {

                setTimeout(function(){
                    elevator.goToFloor(floorNum);
                }, 2000);


            } );
        });

        floors.forEach(function(floor){
            floor.on("up_button_pressed", function() {

                elevators.forEach(function(elevator){
                    setTimeout(function(){
                        elevator.goToFloor(floor.floorNum());
                    }, 2000);

                });


            } );
        });

    },
        update: function(dt, elevators, floors) {
            // We normally don't need to do anything here
        }
}
