'use strict'




var gProjects = [{
    id: makeId(),
    name: 'Mine Sweeper',
    title: 'mine Sweeper Project',
    desc: 'A minesweeper is a small warship designed to remove or detonate naval mines. Using various mechanisms intended to counter the threat posed by naval mines, minesweepers keep waterways clear for safe shipping',
    url: 'https://lizamir.github.io/sprint1/',
    publishedAt: 'January 2021',
    imgUrl: 'img/mine-sweeper.png',
    labels: ["Matrixes", "keyboard events"],
    category: 'game',
    client: 'Coding Academy'
}]

function getProjects() {

    return gProjects;
}


function getProjById(projId) {
    var proj = gProjects.find(function(proj) {
        return projId === proj.id
    })
    return proj
}