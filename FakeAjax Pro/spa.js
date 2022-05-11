const app = {
    pages: [],
    init: function(){
        app.pages = document.querySelectorAll('.page');
        document.querySelectorAll('.navLink').forEach((link)=>{
            link.addEventListener('click', app.nav);
        })
        history.replaceState({}, 'logIn', '#logIn');
        window.addEventListener('popstate', app.poppin);
    },
    nav: function(ev){
        ev.preventDefault();
        let currentPage = ev.target.getAttribute('data-target');
        if(currentPage==="logOut"){
            currentPage='logIn';
        }
        app.change(currentPage);
    },
    poppin: function(ev){
        let hash = location.hash.replace('#' ,'');
        document.querySelector('.active').classList.remove('active');
        document.getElementById(hash).classList.add('active');
        history.pushState({}, currentPage, `#${currentPage}`);
    },
    change:function(page){
        document.querySelector('.active').classList.remove('active');
        document.getElementById(page).classList.add('active');
        history.pushState({}, page, `#${page}`);
    }
}

document.addEventListener('DOMContentLoaded', app.init);
