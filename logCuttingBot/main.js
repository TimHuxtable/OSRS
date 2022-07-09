//Import the robot.js library that will allow for clicks to take place.
let robot = require('robotjs');
const {getScreenSize} = require("robotjs");
//const {GlobalKeyboardListener} = require("node-global-key-listener");
//const {mouseClick} = require("robotjs");


//trying to make an eventListener that will listen for when I press end, it ends the script.
// Element.addEventListener('keydown',function (e) {
//     console.log(e);
//     if (e.code === 'keyEnd') {
//         throw new Error();
//     }
// });

//const v = new GlobalKeyboardListener();

//Log every key that's pressed.
// v.addListener(function (e, down) {
//     if (e.vKey == 35) {
//         x = false;
//     }
//     console.log(e);
// });


console.log(getScreenSize());

//this needs to start at one so the initial run doesn't give zero when using %
let loopCount = 1;
//main function that calls other functions when needed.
function main() {
    //console.log('Starting...');
    sleep(4000);
    //had to make this equal 1 because otherwise it would meet the module 28 immediately.

    //this while loop creates and infinite loop.
    while (true) {

        let centerX = 1280;
        let centerY = 720;
        let tree = findTreeByColor();
        //Number of empty spaces in the inventory.
        let inventorySpace = 28;
        //console.log(tree)
        //we do === undefined because that's the output that it told us it was, from the console statement above.
        if (tree === undefined) {
            console.log('Could not find tree BOZO');
            sleep(1000);
            robot.moveMouse(centerX, centerY);
            sleep(500)
            robot.mouseToggle('down','middle');
            sleep(500)
            robot.moveMouse(centerX - 150, centerY);
            robot.mouseToggle('up','middle');
            sleep(4000);
            //recursion
            main();
        }
        //If the remainder of loopCount divided by # of inventory slots is zero, drop inv.
        if (loopCount % (inventorySpace - 1)  === 0) {
            console.log('Full inventory');
            loopCount += 1;
            dropLogs();
        }
        //chop down the new-found tree
        robot.moveMouse(tree.x, tree.y);
        console.log("did it move here")
        robot.mouseClick();
        //HERE I WANT TO PUT WHERE WHEN IT REALIZES THAT WHEN LOGS GET ADDED TO INVENTORY, LOOK FOR NEW TREE.
        sleep(7000)

        loopCount += 1;
        console.log(loopCount);
    }
}

function dropLogs() {
    //This section is for dropping logs: you won't have to change these pixel locations.
    let loopCount = 0;
    let inventoryX = 2385;
    let inventoryY = 1155;
    // we loop trough each row.
    while (loopCount < 7){
        loopCount += 1;
        robot.keyToggle('shift','down');
        sleep(2000);
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
        inventoryY += 35;

        robot.keyToggle('shift','up');
    }
    //This starts everything over again, self-sustaining loop.
    main();
}

function findTreeByColor() {
    let x = 300;
    let y = 300;
    let width = 1700;
    let height = 700;

    let img = robot.screen.capture(x, y, width, height);
    //An array with colors of the tree's trunk.
    let treeColors = ["644c2c","5d472a","674f2e","594429"]

    for (let i = 0; i < 500; i++) {
        let randomX = getRandomInt(0, width - 1);
        let randomY = getRandomInt(0, height - 1);
        let sample_color = img.colorAt(randomX, randomY);

        if (treeColors.includes(sample_color)) {
            let screenX = randomX + x;
            let screenY = randomY + y;

            if (confirmTree(screenX, screenY)) {
                console.log("Found tree at:" + screenX + "," + screenY + " color " + sample_color);
                return {x: screenX, y: screenY};
            } else {
                console.log("uncomfirmed tree at:" + screenX + "," + screenY + " color " + sample_color);
            }
        }
    }
    return false;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function confirmTree (screenX, screenY) {
    //hover mouse over tree location
    robot.moveMouse(screenX, screenY);
    //give the game time to catch up
    sleep(300);

    //chech the color of the action text
    let checkX = 111;
    let checkY = 71;
    let pixel_color = robot.getPixelColor(checkX, checkY);

    return pixel_color === "00ffff";

}


//This function allows for the code to take breaks, otherwise OSRS gets confused.
function sleep(ms) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

main();
