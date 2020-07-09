// Declaring all variables
const allSection = document.querySelectorAll("section");
const ul = document.querySelector("#navbar__list");
let offsetArr = [];

let prevNavClass;
let prevSectionClass;

window.addEventListener("scroll", () => {
    // runs through each offset to check the current user is viewing the current section
    offsetArr.forEach((el, i) => {
        if (window.scrollY > el[0] && window.scrollY < el[1]) {
            addActiveClass(`#section${i + 1}`);
        }
    });
});

// Adds active class to the section currently viewed
// takes the id variable and adds active class accordingly
const addActiveClass = (id) => {
    const nav = document.querySelector(`a[href="${id}"`);
    const selectedSection = document.querySelector(`${id}`);

    // add active class in the sectiion
    selectedSection.classList.add("your-active-class");
    // checks if the active class is same as currently viewd class and if same ignores it else removes class
    if (prevSectionClass !== selectedSection) {
        prevSectionClass.classList.remove("your-active-class");
    }
    // assigns the current section to the prevsection in order to remove active class for above code
    prevSectionClass = selectedSection;

    // acts same way as above but for nav, could have created a helper function but since its small code didnt create helper function
    nav.classList.add("active__state");
    if (prevNavClass !== nav) {
        prevNavClass.classList.remove("active__state");
    }
    prevNavClass = nav;
};

// Helper function to get the href attribute
const getId = (e) => {
    const id = e.target.getAttribute("href");
    // calls the function by passing the href value
    addActiveClass(id);
};

// function runs immediately after the script is called
// creates the nav bars and append it in the HTML
(() => {
    const fragment = document.createDocumentFragment();

    // runs through each section and create a nav items
    allSection.forEach((el, i) => {
        const liElement = document.createElement("li");
        const aELement = document.createElement("a");

        aELement.innerText = `section${i + 1}`;

        aELement.setAttribute("href", `#section${i + 1}`);
        aELement.setAttribute("class", "menu__link");

        // adds event listener to all the nav by passing the event
        aELement.addEventListener("click", getId);

        // adding active style in the first section and storing that nav in a variable for later use
        if (typeof prevNavClass === "undefined" && i === 0) {
            aELement.classList.add("active__state");
            prevNavClass = aELement;
            prevSectionClass = document.querySelector("#section1");
        }
        // storing the top and bottom view to have the style added later on
        offsetArr.push([el.offsetTop, el.offsetHeight + el.offsetTop]);

        liElement.appendChild(aELement);
        fragment.appendChild(liElement);
    });

    ul.appendChild(fragment);
})();
