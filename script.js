// Slider Functionality
let slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index){
    slides.forEach((slide) => {
        slide.classList.remove('active');
    });
    slides[index].classList.add('active');
}

document.querySelector('.next').addEventListener('click', () => {
    currentSlide++;
    if(currentSlide >= slides.length) currentSlide = 0;
    showSlide(currentSlide);
});

document.querySelector('.prev').addEventListener('click', () => {
    currentSlide--;
    if(currentSlide < 0) currentSlide = slides.length - 1;
    showSlide(currentSlide);
});

// Auto-slide every 5 seconds
setInterval(() => {
    currentSlide++;
    if(currentSlide >= slides.length) currentSlide = 0;
    showSlide(currentSlide);
}, 5000);

// Gallery hover effect (optional dynamic interaction)
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('mouseover', () => {
        item.querySelector('.overlay').style.opacity = 1;
    });
    item.addEventListener('mouseout', () => {
        item.querySelector('.overlay').style.opacity = 0;
    });
});

 const langSelect = document.getElementById("language");
  const elements = document.querySelectorAll("[data-key]");

  function changeLanguage(lang) {
    elements.forEach(el => {
      const key = el.getAttribute("data-key");
      if (translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
    localStorage.setItem("lang", lang);
  }

  langSelect.addEventListener("change", (e) => {
    changeLanguage(e.target.value);
  });

  // Load Saved Language
  const savedLang = localStorage.getItem("lang") || "en";
  langSelect.value = savedLang;
  changeLanguage(savedLang);
  
  
  

