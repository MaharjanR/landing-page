// Declaring all variables
const allSection = document.querySelectorAll("section");
const ul = document.querySelector("#navbar__list");

// Event listener on scroll
window.addEventListener("scroll", () => {
    const navbarList = document.querySelectorAll(".menu__link");
    // looping through all the nav elements to add active class
    navbarList.forEach((nav, i) => {
        // getting the href value to select the section
        const href = nav.getAttribute("href");
        const section = document.querySelector(href);
        // selecting the section offset property to check if the user is viewing that section later on
        const sectionOffset = Math.floor(section.getBoundingClientRect().top);

        // removing active class for all section and nav
        section.className = "";
        nav.className = "menu__link";

        // adding active class if user is currently viewing the particular section
        if (sectionOffset < 350 && sectionOffset >= -350) {
            section.classList.add("your-active-class");
            nav.classList.add("active__state");
        }
    });
});

//  event listener that goes to the target element with scroll movement
const scrollTo = (e) => {
    e.target.scrollIntoView({
        behavior: "smooth",
    });
};

// function runs immediately after the script is called
// creates the nav bars and append it in the HTML
(() => {
    const fragment = document.createDocumentFragment();

    // runs through each section and create a nav items
    allSection.forEach((el, i) => {
        const liElement = document.createElement("li");
        const aELement = document.createElement("a");

        aELement.innerText = `Section ${i + 1}`;

        aELement.setAttribute("href", `#section${i + 1}`);
        aELement.setAttribute("class", "menu__link");

        // adds event listener to all the nav by passing the event
        aELement.addEventListener("click", scrollTo);

        // adding active style in the first section and storing that nav in a variable for later use
        if (i === 0) {
            aELement.classList.add("active__state");
        }

        liElement.appendChild(aELement);
        fragment.appendChild(liElement);
    });

    ul.appendChild(fragment);
})();
