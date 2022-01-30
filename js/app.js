/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const navList_ul = document.getElementById("navbar__list");
const allSection = Array.from(document.getElementsByTagName("section"));
let links

/**
 * End Global Variables 
 * 
*/


/**
* @description  build new nav menu
* @constructor Self-invoking function
* @param allSection: section elements
*/
(function(){
    for (section of allSection){
        // get section name
        let section_name = section.getAttribute('data-nav');    
        let htmlTextToAdd = `<li class = "menu__link" data-link = "${section.id}">${section.getAttribute('data-nav')}</li>`;
        navList_ul.insertAdjacentHTML('beforeend', htmlTextToAdd);
    }
}(allSection));



/**
* @description  add Event listener to menu, and scroll into target
* @constructor
* @param allSection: section elements
* @param sectionId: Id of section
*/

links = document.querySelectorAll('.menu__link');
for (link of links){
    const sectionId = link.getAttribute('data-link');
    link.addEventListener('click', function(e){
        e.preventDefault();        
        linkToScrollIntoView(sectionId);
        addOrRemoveActiveClass(sectionId);
    })
}

/**
 * helper function for the scroll 
 */
function linkToScrollIntoView(sectionId){
    let e = document.getElementById(sectionId); 
    e.scrollIntoView({behavior: "smooth"});    
}
function addOrRemoveActiveClass(sectionId){    
    const menuElements = document.getElementsByClassName("menu__link");
    for (menu of menuElements){
        if (menu.getAttribute('data-link') == sectionId){
            menu.classList.add("activeMenu");         
            
        } else {
            if (menu.classList.contains("activeMenu")){
                menu.classList.remove("activeMenu");        

            }
        }
    }    
}




/**
* @description Add class 'active' to section when near top of viewport and the event listener for scrolling
* @constructor
* @param allSection: section elements
*/
window.addEventListener('scroll', function() {
     scrollActive();
    } )
// scorllActive function for adding into the window event listener
function scrollActive(){ 
    for (section of allSection){ 
        const sectionRect = section.getBoundingClientRect();
        if (sectionRect.top <= 150 && sectionRect.bottom >= 150) {
            section.classList.add("active");   
            addOrRemoveActiveClass(section.id);
        } else {          
            if (section.classList.contains("active")){
                section.classList.remove("active");
            }
        }    
    }
}

