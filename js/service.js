'use strict'




var gProjects = [{
        id: makeId(),
        name: 'Mine Sweeper',
        title: 'mine Sweeper Project',
        desc: 'A minesweeper is a small warship designed to remove or detonate naval mines. Using various mechanisms intended to counter the threat posed by naval mines, minesweepers keep waterways clear for safe shipping',
        url: 'https://lizamir.github.io/sprint1/',
        publishedAt: 'January 2021',
        imgUrl: 'img/portfolio/mine.JPG',
        labels: ["Matrixes", "keyboard events"],
        category: 'game',
        client: 'Coding Academy'
    },
    {
        id: makeId(),
        name: 'Books Shop',
        title: 'Books Shop Project',
        desc: 'build a page that shows a list of books: id, name, price, imgUrl. We will allow the user – a shop owner – to manage the books.',
        url: '../booksShop/index.html',
        publishedAt: 'January 2021',
        imgUrl: 'img/portfolio/book.jpg',
        labels: ["Matrixes", "keyboard events"],
        category: 'shop',
        client: 'Coding Academy'

    },

    {
        id: makeId(),
        name: 'Ball Board',
        title: 'Ball Board Game Project',
        desc: 'Every few seconds a new ball is added in a random empty cell , When gamer collects all balls – game over - let the user restart the game by clicking a Restart button',
        url: '../ball-board/index.html',
        publishedAt: 'January 2021',
        imgUrl: 'img/portfolio/ball.png',
        labels: ["Matrixes", "keyboard events"],
        category: 'game',
        client: 'Coding Academy'

    }


]

function getProjects() {

    return gProjects;
}


function getProjById(projId) {
    var proj = gProjects.find(function(proj) {
        return projId === proj.id
    })
    return proj
}