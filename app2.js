
gsap.to(".box", {
  duration: 2,
  scale: 0,
  y: 40,
  ease: "power1.inOut",
  stagger: {
    grid: [5,20],
    from: "end",
    axis: "x",
    amount: 1.5
  },
  onStart: () => { 
    setTimeout(() => {
      const audio = document.getElementById("magic");
      if (audio) {
        audio.play().catch(err => {
          console.warn("Autoplay failed:", err);
        });
      }
    }, 500);
  },
  onComplete: () => {
    window.location.href="index3.html";
  }
}); 