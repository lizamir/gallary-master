'use strict'

function onInit() {
    renderBooks();
}

function renderBooks() {
    var books = getBooks()
    var strHtml = books.map(function(book) {
        return `
        <tr><td> ${book.id}</td> <td>${book.bookName} </td> <td>${book.price} </td> 
        <td> <button class = "read btn" onclick = "onReadBook('${book.id}')">Read </button> </td>
        <td> <button class = "update btn" onclick = "onUpdateBook('${book.id}')"> Update </button> </td>
        <td> <button class = "delete btn" onclick = "onDeleteBook('${book.id}')"> Delete </button> </td></tr>
        `;
    })
    document.querySelector('.table-books').innerHTML = strHtml.join('')
}

function onDeleteBook(bookId) {
    deleteBook(bookId)
    renderBooks()
}

function onUpdateBook(bookId) {
    var newPrice = +prompt('Price?');
    updateBook(bookId, newPrice);
    renderBooks();

}

function onAddBook(ev) {
    ev.preventDefault();
    var elName = document.querySelector('input[name=name]');
    var elPrice = document.querySelector('input[name=price]');
    addBook(elName.value, elPrice.value);
    elName.value = '';
    elPrice.value = '';
    renderBooks();

}

function onReadBook(bookId) {
    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal')
    elModal.hidden = false;
    var book = getBookById(bookId);
    var modContent = renderModal(book);
    elModal.innerHTML = modContent;


}

function renderModal(book) {
    var strHTML = `<h3> Book Info</h3>
      <p>${makeLorem()}</p>
      <h4>rate:<h4>
      <input type="number" class="rate" value="${book.rate}" min="0" max="10">
      <button class="rate btn" onclick="onUpdateRate('${book.id}')">Sub </button><br>
      <button class=" close close btn" onclick="onCloseModal()">Close</button>`;
    return strHTML;
}

function onCloseModal() {
    document.querySelector('.modal').hidden = true
}

function onUpdateRate(bookId) {
    var rate = document.querySelector('.rate').value;
    updateRate(bookId, rate);
    renderBooks();
}

function increaseRate() {}

function onNextPage() {
    nextPage()
    renderBooks()
}

function onPreviousPage() {
    previousPage()
    renderBooks()
}