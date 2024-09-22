

// GIVE UNIQUE IDS TO EACH FILTER
$(".svg-filter").each(function (index) {
  $(this).parent().attr("style", "filter: url(#svg-filter-" + index + ");");
  $(this).find("filter").attr("id", "svg-filter-" + index);
});

// LOOPING HEADING
$(".heading-wrap").each(function (index) {
  let svg = $(this).find(".svg-filter");

  let tl = gsap.timeline({
	repeat: -1,
    yoyo: true,
    defaults: {
      duration: 1,
      ease: "power1.out"
    }
  });
  tl.fromTo(svg.find("[stdDeviation]"),
    { attr: { stdDeviation: 2 } },
    { attr: { stdDeviation: 7 } });
});

// ANIMATE IMAGES ON HOVER
$(".image-wrap").each(function (index) {
  let svg = $(this).find(".svg-filter");

  let tl = gsap.timeline({ paused: true });
  tl.fromTo(svg.find("[scale]"),
    { attr: { scale: 0 } },
    { attr: { scale: 100 } });
    
  $(this).on("mouseenter", function () {
    tl.play();
  });
  $(this).on("mouseleave", function () {
    tl.reverse();
  });
    
});