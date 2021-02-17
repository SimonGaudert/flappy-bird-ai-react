module.exports = global.gameParameters = {
    game:{
        gravity: 1,
        flapVelocity: 15,
        scrollSpeed:2,
        pipeGap:200,
        renderBirds: true,
        renderOnlyOneBird: false, //Only works if renderBirds is set to true
        renderPipes: true,
    },
    learning:{
        population: 500,
        hiddenNodes: 3,
        mutationRate:0.1
    }
};