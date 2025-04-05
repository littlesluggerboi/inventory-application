const SlideShow = () => {
    const slideShow = document.querySelector(".slide_show_game");
    const prevButton = slideShow.querySelector(".prev");
    const nextButton = slideShow.querySelector(".next");
    const slides = slideShow.querySelector(".slides_container_game");
    let currentSlide = 0;
    slides.children[0].classList.add("selected_slide");
  
    const navigation = document.createElement("div");
    navigation.classList.add("slide_show_navigation");
    for (let i = 0; i < slides.children.length; i++) {
      const dot = document.createElement("button");
      dot.classList.add("dot");
      navigation.append(dot);
    }
    navigation.children[0].classList.add("dotted");
    slideShow.append(navigation);
  
    const setCurrentSlide = (slide_number) => {
      if (slide_number < 0) {
        slide_number = slides.children.length - 1;
      }
      if (slide_number >= slides.children.length) {
        slide_number = 0;
      }
      if(slide_number == currentSlide){
        return;
      }
  
      slides.children[currentSlide].classList.remove("selected_slide");
      navigation.children[currentSlide].classList.remove("dotted");
      currentSlide = slide_number;
      slides.children[currentSlide].classList.add("selected_slide");
      navigation.children[currentSlide].classList.add("dotted");
    };
  
    for (let i = 0; i < navigation.children.length; i++) {
      navigation.children[i].addEventListener("click", () => setCurrentSlide(i));
    }
  
    prevButton.addEventListener("click", () => setCurrentSlide(currentSlide - 1));
    nextButton.addEventListener("click", () => setCurrentSlide(currentSlide + 1));
  };
  
  SlideShow();
  