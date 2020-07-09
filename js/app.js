const allSection = document.querySelectorAll("section");
const ul = document.querySelector("#navbar__list");
let offsetArr = [];

let prevNavClass;
let prevSectionClass;

window.addEventListener("scroll", () => {
    offsetArr.forEach((el, i) => {
        if (window.scrollY > el[0] && window.scrollY < el[1]) {
            addActiveClass(`#section${i + 1}`);
        }
    });
});

const addActiveClass = (id) => {
    const nav = document.querySelector(`a[href="${id}"`);
    const selectedSection = document.querySelector(`${id}`);

    selectedSection.classList.add("your-active-class");
    if (prevSectionClass !== selectedSection) {
        prevSectionClass.classList.remove("your-active-class");
    }
    prevSectionClass = selectedSection;

    nav.classList.add("active__state");
    if (prevNavClass !== nav) {
        prevNavClass.classList.remove("active__state");
    }
    prevNavClass = nav;
};

const getId = (e) => {
    const id = e.target.getAttribute("href");
    addActiveClass(id);
};

(() => {
    const fragment = document.createDocumentFragment();

    allSection.forEach((el, i) => {
        const liElement = document.createElement("li");
        const aELement = document.createElement("a");

        aELement.innerText = `section${i + 1}`;

        aELement.setAttribute("href", `#section${i + 1}`);
        aELement.setAttribute("class", "menu__link");

        aELement.addEventListener("click", getId);

        if (typeof prevNavClass === "undefined" && i === 0) {
            aELement.classList.add("active__state");
            prevNavClass = aELement;
            prevSectionClass = document.querySelector("#section1");
        }
        offsetArr.push([el.offsetTop, el.offsetHeight + el.offsetTop]);

        liElement.appendChild(aELement);
        fragment.appendChild(liElement);
    });

    ul.appendChild(fragment);
})();
