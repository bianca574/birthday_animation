
function scrambleInitial(text, scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*") {
  let scrambled = "";
  for (let i = 0; i < text.length; i++) {
    scrambled += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
  }
  return scrambled;
}

function scrambleWord(el, finalText, duration = 1000, scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*") {
  
  return new Promise((resolve) => {

    const totalFrames = duration / 16;
    let frame = 0; 

    const scramble = () => {
      let output = "";
      const progress = frame / totalFrames;

      for (let i = 0; i < finalText.length; i++) {
        if (i < progress * finalText.length) {
          output += finalText[i];
        } else {
          output += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        }
      }

      el.textContent = output;
      frame++;

      if (frame <= totalFrames) {
        requestAnimationFrame(scramble);
      } else {
        el.textContent = finalText;
        resolve(); // Notify when done
      }
    };

    scramble();
  });
}

document.querySelector(".name").textContent = scrambleInitial("Alice!");

function startConfetti() {

  confetti({
    particleCount: 1000,
    spread: 360,
    origin: { x: 0.5, y: 0.1 },
    gravity: 0.3,
    ticks: 700,
    scalar: 1.2,
  });
}

let play = document.querySelector(".play");

let pause = document.querySelector(".pause");

let restart = document.querySelector(".restart");

play.addEventListener("click", () => {

    tl.play();
    if(birthdaySong.paused){
      birthdaySong.play();
    }
});

pause.addEventListener("click", () => {

    tl.pause();
    if(!birthdaySong.paused){
      birthdaySong.pause();
    }
});

restart.addEventListener("click", () => {

    window.location.href="index1.html"; 
});

function playSplashClone(volume = 1) {
  const original = document.getElementById("splash");
  if (original) {
    const clone = original.cloneNode(true);  // create a separate instance
    clone.volume = volume;
    clone.play().catch(err => {
      console.warn("Autoplay failed:", err);
    });
  }
}

function playBoomTwice(delay = 300, volume = 1) {
  const boom = document.getElementById("boom");
  if(!boom) return;

  const boom1 = boom.cloneNode(true);
  boom1.volume = volume;
  boom1.play().catch(err => {
    console.warn("Boom1 failed:", err);
  });

  setTimeout(() => {
    const boom2 = boom.cloneNode(true);
    boom2.volume = volume;
    boom2.play().catch(err => {
      console.warn("Boom2 failed:", err);
    });
  }, delay);
}

var tl = gsap.timeline();

tl.set(".btn", {
  opacity: 0,
  pointerEvents: "none",

}).set(".tier4", {
    y: -1500,

}).set(".tier3", {
    y: -1500,

}).set(".tier2", {
    y: -1500,
    
}).set(".tier1", {
    y: -1500,
    
}).set(".one, .nine", {
    y: -1500,

}).set(".container", {
    opacity: 0,

}).to(".tier4", {
    y: 0,
    duration: 0.8,
    ease: "power2.in",
    onStart: () => {
      setTimeout(() => {
        playSplashClone();
      }, 500);
    },

}, "+=0.5").to(".tier3", {
    y: 0,
    duration: 0.7,
    ease: "power1.in",
    onStart: () => {
      setTimeout(() => {
        playSplashClone();
      }, 400);
    },
    
}, "+=1").to(".tier2", {
    y: 0,
    duration: 0.5,
    ease: "power1.in",
    onStart: () => {
      setTimeout(() => {
        playSplashClone();
      }, 200);
    },
    
}, "+=0.4").to(".tier1", {
    y: 0,
    duration: 0.5,
    ease: "power1.in",
    onStart: () => {
      setTimeout(() => {
        playSplashClone();
      }, 100);
    },
    
}, "+=0.2").to(".one", {
    y: 0,
    duration: 0.5,
    ease: "power1.in",
    onStart: () => {
      setTimeout(() => {
        playSplashClone(0.3);
      }, 100);
    },

}, "+=0.1").to(".nine", {
    y: 0,
    duration: 0.5,
    ease: "power1.in",
   onStart: () => {
      setTimeout(() => {
        playSplashClone(0.3);
      }, 250);
    },

}, "+=0.3").to(".container", {
    opacity: 1,
    onStart: () => {
      setTimeout(() => {
        const audio = document.getElementById("fire");
        if (audio) {
          audio.play().catch(err => {
            console.warn("Autoplay failed:", err);
          });
        }
      }, 1);
    },

}, "+=0.3").from(".hap, .bir", {
    opacity: 0,
    y: -100, 
    duration: 0.7,
    ease: "bounce.out",
    stagger: 0.7,
    transformOrigin: "bottom center",
    onStart: () => {
      setTimeout(() => {
        playBoomTwice(500);
      }, 300);
    },
    

}, "+=2").from(".name", {
    opacity: 0,
    y: -100,
    duration: 0.7,
    ease: "bounce.out",
    transformOrigin: "bottom center",
    onStart: () => {
      setTimeout(() => {
        const audio1 = document.getElementById("boom");
        if(audio1) {
          audio1.play().catch(err => {
            console.warn("Autoplay failed:", err);
          }); 
        }
      }, 300);
      setTimeout(() => {
        const audio2 = document.getElementById("vinyl");
        if(audio2) {
          audio2.play().catch(err => {
            console.warn("Autoplay failed:", err);
          }); 
        }
      }, 700);
    },

}, "+=0.5").add(() => {
  (async () => {
    const nameSpan = document.querySelector(".name");
    await scrambleWord(nameSpan, "Alice!", 1500);
    await new Promise(r => setTimeout(r, 300));
    document.getElementById("confettiSound").play();
    startConfetti();

    await new Promise(r => setTimeout(r, 1500));
    document.getElementById("birthdayCrowd").play();

    await new Promise(r => setTimeout(r, 2000));
    document.getElementById("birthdaySong").play();
  })();

}, "+=0.3").to(".btn", {
  opacity: 1,
  stagger: 0.5,
  pointerEvents: "auto",
}, "+=3");