const containers = document.querySelectorAll(".input-container");
const form = document.querySelector("form");

const tl = gsap.timeline({ defaults: { duration: 1 } });

const start =
  "M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512";

const end =
  "M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512";

containers.forEach((container) => {
  const input = container.querySelector(".input");
  const line = container.querySelector(".elastic-line");
  const placeholder = container.querySelector(".placeholder");

  // To make the line do bounce effect along with placeholder jump
  input.addEventListener("focus", () => {
    if (!input.value) {
      tl.fromTo(
        line,
        { attr: { d: start } },
        { attr: { d: end }, duration: 0.6, ease: "Power2.easeOut" }
      );
      tl.to(line, { attr: { d: start }, ease: "elastic.out(3,0.5)" }, "<50%");
      tl.to(
        placeholder,
        {
          y: -20,
          scale: 0.7,
          duration: 0.5,
          ease: "Power2.easeOut",
        },
        "<15%"
      );
    }
  });

  // To undo placeholder jump
  document.addEventListener("click", () => {
    if (document.activeElement !== input) {
      if (!input.value) {
        gsap.to(placeholder, {
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "Power2.easeOut",
        });
      }
    }
  });

  // To colorize according to validation state
  input.addEventListener("input", (e) => {
    if (e.target.type === "text") {
      if (e.target.value.length > 2) {
        colorize("#6391e8", line, placeholder);
      } else {
        colorize("#fe8c99", line, placeholder);
      }
    }
    if (e.target.type === "email") {
      if (validateEmail(e.target.value)) {
        colorize("#6391e8", line, placeholder);
      } else {
        colorize("#fe8c99", line, placeholder);
      }
    }
    if (e.target.type === "tel") {
      if (validatePhone(e.target.value)) {
        colorize("#6391e8", line, placeholder);
      } else {
        colorize("#fe8c99", line, placeholder);
      }
    }
  });
});

// Validation function
function validateEmail(email) {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
}
function validatePhone(phone) {
  let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return re.test(phone);
}

// Validation colorizer
function colorize(color, line, placeholder) {
  gsap.set(line, { stroke: color });
  gsap.set(placeholder, { color });
}

// Checkbox animation
const promoContainer = document.querySelector(".promo-container");
const checkbox = document.querySelector(".checkbox");
const tickMarkPath = document.querySelector(".tick-mark path");
const pathLength = tickMarkPath.getTotalLength();

const tl2 = gsap.timeline({
  defaults: { duration: 0.5, ease: "Power2.easeOut" },
});

gsap.set(tickMarkPath, {
  strokeDashoffset: pathLength,
  strokeDasharray: pathLength,
});

checkbox.addEventListener("click", () => {
  if (checkbox.checked) {
    tl2.to(".checkbox-fill", { top: 0 });
    tl2.fromTo(
      tickMarkPath,
      { strokeDashoffset: pathLength },
      { strokeDashoffset: 0 }
    );
    tl2.to(".checkbox-label", { color: "#6391e8", duration: 0.3 }, "<");
  } else {
    tl2.to(".checkbox-fill", { top: "100%" });
    tl2.fromTo(
      tickMarkPath,
      { strokeDashoffset: 0 },
      { strokeDashoffset: pathLength }
    );
    tl2.to(".checkbox-label", { color: "#c5c5c5", duration: 0.3 }, "<");
  }
});

// Manually clicking the checkbox
promoContainer.addEventListener("click", () => {
  checkbox.click();
});

// Blinking Animation
gsap.set(".eye", { transformOrigin: "center" });

const tl3 = gsap.timeline({ repeat: -1 });

tl3.to(".eye", { scaleY: 0.3, duration: 0.3, ease: "Power2.easeOut" }, "+=3");
tl3.to(".eye", {
  scaleY: 1,
  duration: 0.3,
  ease: "Power2.easeOut",
});

gsap.set("#hand", { transformOrigin: "left" });

const tl4 = gsap.timeline({
  defaults: { duration: 0.75, ease: "Power2.easeOut" },
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  tl4.to(".left-side, .right-side", {
    y: 30,
    opacity: 0,
    PointerEvents: "none",
  });
  tl4.to("form", { scale: 0.8 }, "<");
  tl4.fromTo(".submitted", { opacity: 0, y: 30 }, { opacity: 1, y: -20 });

  // Hand movement
  gsap.fromTo(
    "#hand",
    { rotation: 0, y: 0 },
    { rotation: -10, y: 2, duration: 3, delay: 1, ease: "elastic(2,0.3)" }
  );
});
