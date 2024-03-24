if (navigator.msMaxTouchPoints) {

    document.getElementById("slider").classList.add("ms-touch");

    document.getElementById("slider").addEventListener('scroll', (e) => {
        document.getElementByClassName("image").style = `translate3d(-${(100 - this.scrollLeft() / 6)}px,0,0)`;
    });

} else {
    let slider = {
        slideWidth: document.getElementById("slider").style.width | document.getElementsByClassName('slide')[0].getBoundingClientRect().width,
        touchstartx: undefined,
        touchmovex: undefined,
        movex: undefined,
        index: 0,
        longTouch: undefined,
        main: document.getElementById("main"),
        heading: document.querySelector('.title'),
        para: document.querySelector('.para'),
        body: document.getElementsByTagName('body'),
        slides: document.querySelectorAll('.slide'),
        bgImg: document.querySelector('.bg-img'),
        content: [
            {
                title: 'You are magical 🦄',
                desc: `Are you a magician? Because whenever I look at you, everyone else disappears.`
            },
            {
                title: 'Chemistry Cutie 👩‍🔬',
                desc: "Are you made of copper and tellurium? Because you're Cu-Te."
            },
            {
                title: 'Beauty Behind Bars 👸🏻',
                desc: `If beauty were a crime, you'd be serving a life sentence.`
            },
            {
                title: 'Smile Captured 😊',
                desc: 'You must be a camera because every time I look at you, I smile.'
            },
            {
                title: 'Sweetness Overload 🍯',
                desc: "You're so sweet, you could put sugar out of business."
            },
            {
                title: 'Stellar Shine ✨',
                desc: "If you were a star, you'd outshine the whole galaxy."
            },
        ],

        el: {
            slider: document.getElementById("slider"),
            holder: document.querySelector(".holder"),
            imgSlide: document.querySelector(".slide-image")
        },


        init: function () {
            this.heading.innerHTML = this.content[0].title;
            this.para.innerHTML = this.content[0].desc;
            this.bindUIEvents();
            gsap.set(".bg-img", { backgroundImage: "url(./assets/m0.jpeg)" });
        },

        bindUIEvents: function () {

            this.el.holder.addEventListener("touchstart", function (event) {
                slider.start(event);
            });

            this.el.holder.addEventListener("touchmove", function (event) {
                slider.move(event);
            });

            this.el.holder.addEventListener("touchend", function (event) {
                slider.end(event);
            });

        },

        start: function (event) {

            this.longTouch = false;
            setTimeout(function () {
                window.slider.longTouch = true;
            }, 250);


            this.touchstartx = event.touches[0].pageX;

            // let animate = document.getElementByClassName("animate");
            // console.log('animate',animate);
            // document.getElementByClassName("animate").classList.remove("animate");
        },

        move: function (event) {
            this.touchmovex = event.touches[0].pageX;

            this.movex = this.index * this.slideWidth + (this.touchstartx - this.touchmovex);
            let panx = 100 - this.movex / 6;
            if (this.movex < 600) {
                this.el.holder.style.transform = `translate3d(-${this.movex}px,0,0)`;
            }
            if (panx < 100) {
                // this.el.imgSlide.style.transform = `translate3d(-${panx}px,0,0)`;
            }

        },
        end: function (event) {
            let absMove = Math.abs(this.index * this.slideWidth - this.movex);

            if (absMove > this.slideWidth / 2 || this.longTouch === false) {
                if (this.movex > this.index * this.slideWidth && this.index < this.slides.length - 1) {
                    this.index++;
                    slider.animateSlideLeft();
                } else if (this.movex < this.index * this.slideWidth && this.index > 0) {
                    this.index--;
                    // slider.animateSlideRight();
                }
            }

            this.el.holder.classList.add("animate");
            this.el.holder.style.transform = `translate3d(-${this.index * this.slideWidth}px,0,0)`;
            this.el.imgSlide.classList.add("animate");

            // change bg image
            let allImages = document.querySelectorAll('.slide-image');
            // let lastIndex = this.index <= 0 ? 0 : this.index - 1;
            brUrl = this.index != 0 ? allImages[this.index-1]?.currentSrc : './assets/m0.jpeg';


            // allImages[this.index].style.transform = `scale(${this.movex })`;

            this.heading.innerHTML = this.content[this.index]?.title;
            this.para.innerHTML = this.content[this.index]?.desc;
            this.bgImg.style.backgroundImage = `url(${brUrl})`


            // 

            // this.slides[lastIndex].style.transition = "transform 1s ease;"
            slider.animateTextBox();
            slider.animateBgImg();
            // reset slide scale when scroll end
            setTimeout(() => {
                
                gsap.set(`.slide${this.index}`, { scale: 1, x: 0 });
            }, 500);

        },

        animateTextBox: function () {
            gsap.fromTo(".text", {
                scale: 0,
                x: -100,
            }, {
                x: 0,
                scale: 1,
                duration: 0.5,
                delay: 0.5
            });
        },
        animateSlideLeft: function () {
            gsap.fromTo(`.slide${this.index}`, {
                scale: 1,
                x: 0,
            }, {
                x: -40,
                scale: 0.1,
                duration: 0.4
            })
        },
        animateBgImg: function () {
            // gsap.set(".bg-img", { backgroundPosition: "100px 100px" });

            // gsap.to('.bg-img', {
            //     duration: 1.5,
            //     scale: 1.2, // Scale factor (adjust as needed)
            //     ease: 'power2.out' // Easing function
            // });
            gsap.fromTo(`.bg-img`, {
                scale: 0.1,
                x: -20,
                y: -20,
            }, {
                x: 0,
                y:0,
                scale: 1,
                duration: 0.5,
                // delay:0.4
            })

        }

    }

    slider.init()
}

