'use strict'

function onInit() {
    renderProjects();
}


function renderProjects() {
    var projects = getProjects();

    var strHtmls = projects.map(function(proj) {
        return `
        <div class="col-md-4 col-sm-6 portfolio-item"> 
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1">
        <div onclick="renderModal('${proj.id}')" class="portfolio-hover">
         <div class="portfolio-hover-content">
          <i class="fa fa-plus fa-3x"></i> 
          </div>
           </div>
            <img class="img-fluid" src="img/mine-sweeper.png" >
           </a> 
           <div class="portfolio-caption">
            <h4>${proj.name}</h4> 
           <p class="text-muted">${proj.category}</p>
            </div>
             </div>
        `
    })
    var strHtml = strHtmls.join('')
    var $elProjContainer = $('.proj')
    $elProjContainer.html(strHtml)

}

function renderModal(projId) {
    var proj = getProjById(projId);
    console.log('proj', proj);
    var strHtml = `

    <div class="col-lg-8 mx-auto">
        <div class="modal-body">
            <h2>${proj.name}</h2>
            <p class="item-intro text-muted"${proj.title}</p>
            <img class="img-fluid d-block mx-auto" src=${proj.imgUrl} alt="">
            <p>${proj.desc}</p>
            <ul class="list-inline">
                <li>Date: ${proj.publishedAt}</li>
                <li>Client: ${proj.client}</li>
                <li>Category:${proj.category}</li>
                    </ul>
            <button class="btn btn-primary" data-dismiss="modal" type="button">
            <i class="fa fa-times"></i>
            Close Project</button>
         </div>
    </div>
    `

    var $elProjContainer = $('.proj-modal')
    $elProjContainer.html(strHtml)

}