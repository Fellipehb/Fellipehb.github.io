import React, { useRef, useEffect } from 'react';

const TypingText = () => {
  const el = useRef(null);
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "Programador Back End",
        "Database Analytic or DBA",
        "Develop "
      ],
      typeSpeed: 80,
      backSpeed: 50,
      loop: true,
    });

    return () => {
      // cleanup
      typed.destroy();
    };
  }, []);

  return <div className="typing" ref={el}></div>;
};

const Nav = ({ navList, totalNavList, allSection, totalSection, showSection, updateNav, removeBackSection, addBackSection }) => {
  const navHandler = (e, i) => {
    removeBackSection();
    for (let j = 0; j < totalNavList; j++) {
      if (navList[j].querySelector("a").classList.contains("active")) {
        addBackSection(j);
      }
      navList[j].querySelector("a").classList.remove("active");
    }
    e.currentTarget.classList.add("active");
    showSection(e.currentTarget);
    if (window.innerWidth < 1200) {
      asideSectionTogglerBtn();
    }
  };

  return (
    <nav>
      <ul className="nav">
        {navList.map((li, i) => (
          <li key={i}>
            <a href={`#${li.dataset.sectionIndex}`} onClick={(e) => navHandler(e, i)}>{li.innerHTML}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const Aside = ({ asideSectionTogglerBtn, navTogglerBtn, aside, totalSection }) => {
  const handleToggle = () => {
    asideSectionTogglerBtn();
    navTogglerBtn.classList.toggle("open");
    for (let i = 0; i < totalSection; i++) {
      allSection[i].classList.toggle("open");
    }
  };

  return (
    <div className="aside">
      <button className="nav-toggler" onClick={handleToggle}></button>
    </div>
  );
};

const Section = ({ sectionIndex, addBackSection, removeBackSection, updateNav, showSection }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    section.addEventListener('click', () => {
      const sectionIndex = section.getAttribute("data-section-index");
      showSection(section);
      updateNav(section);
      removeBackSection();
      addBackSection(sectionIndex);
    });
  }, []);

  return (
    <div className="section" id={`section${sectionIndex}`} ref={sectionRef} data-section-index={sectionIndex}></div>
  );
};

const App = () => {
  const nav = useRef(null);
  const navList = useRef([]);
  const allSection = useRef([]);

  useEffect(() => {
    navList.current = [...nav.current.querySelectorAll("li")];
    allSection.current = [...document.querySelectorAll(".section")];
  }, []);

  const totalNavList = navList.current.length;
  const totalSection = allSection.current.length;

  const [activeSection, setActiveSection] = React.useState(null);

  const addBackSection = (num) => {
    allSection.current[num].classList.add("back-section");
  };

  const removeBackSection = () => {
    for (let i = 0; i < totalSection; i++) {
      allSection.current[i].classList.remove("back-section");
    }
  };

  const updateNav = (element) => {
    for (let i = 0; i < totalNavList; i++) {
      navList.current[i].querySelector("a").classList.