const robot = require("robotjs");

function dropLogs() {
    //This section is for dropping logs: you won't have to change these pixel locations.
    let loopCount = 0;
    let inventoryX = 2385;
    let inventoryY = 1155;
    // we loop trough each row.
    while (loopCount < 7){
        loopCount += 1;
        robot.keyToggle('shift','down');
        sleep(3000);
        //Move cursor to starting position
        robot.moveMouse(inventoryX,inventoryY);
        sleep(500);
        robot.mouseClick();
        //Make the cursor move along the row of inventory
        robot.moveMouse(inventoryX + 45, inventoryY)
        sleep(500);
        robot.mouseClick();
        sleep(500);
        robot.moveMouse(inventoryX + 90, inventoryY)
        sleep(500);
        robot.mouseClick();
        sleep(500);
        robot.moveMouse(inventoryX + 135, inventoryY)
        sleep(500);
        robot.mouseClick();
        sleep(1000);
        //Move cursor down one row, Now I want to redo the x inv stuff.
        inventoryY += 34;

        robot.keyToggle('shift','up');
    }
}
dropLogs();

function sleep(ms) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}