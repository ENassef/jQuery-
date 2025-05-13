/**
 * Import Libraries
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText, ScrollTrigger);

// Waiting for the DOM to be ready
jQuery(function () {
  console.log("All libraries loaded!");

  $('.singer').on('click', function () {
    const singerContent = $(this).find('.singer-content');

    if (singerContent.hasClass('active')) {
      singerContent.slideUp(500).removeClass('active');
    } else {
      $('.singer-content.active').slideUp(500).removeClass('active');
      singerContent.slideDown(500).addClass('active');
    }
  });
        
  /**
   * Countdown Timer
   */
  const countDownDate = new Date(2025, 4, 15, 22, 0, 0).getTime();

  const countdownInterval = setInterval(function () {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    if (distance < 0) {
      clearInterval(countdownInterval);
      $("#countdown").text("EXPIRED");
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    $('#days').text(days);
    $('#hours').text(hours);
    $('#minutes').text(minutes);
    $('#seconds').text(seconds);
  }, 1000);

  /**
   * GSAP Animations
   */
  const split_h = new SplitText("#header-h", { type: "chars" });
  const split_p = new SplitText("#header-p", { type: "chars" });

  const header_h = gsap.timeline();
  const header_p = gsap.timeline();

  function getDurationPerChar(splitChars, duration) {
    return duration / splitChars.length;
  }

  header_h
    .from(split_h.chars, {
      x: 1000,
      opacity: 0,
      duration: 2,
      ease: "power4",
      stagger: 0.1,
    })
    .to(split_h.chars, {
      x: 20,
      opacity: 1,
      duration: 1,
      ease: "power4",
      stagger: getDurationPerChar(split_h.chars, 1),
      repeat: -1,
      yoyo: true,
    });


  header_p
    .from(split_p.chars, {
      x: 1000,
      opacity: 0,
      duration: 2,
      ease: "power4",
      stagger: 0.1,
    })
    .to(split_p.chars, {
      x: 20,
      opacity: 1,
      duration: 1,
      ease: "power4",
      stagger: getDurationPerChar(split_p.chars, 1),
      repeat: -1,
      yoyo: true,
    });

    let message = $("#message");
    const maxLength = 100;
    let currentLength = message.val.length;
    $("#charCount").text(maxLength - currentLength);
    
    $("#message").on("input", function () {

      currentLength = $(this).val().length;

      if (currentLength > maxLength) {
        
        $(this).val($(this).val().slice(0, maxLength));
        currentLength = maxLength;

      }

      $("#charCount").text(maxLength - currentLength);

      console.log(currentLength);
    }
    );
    

    $('#open').on('click', ()=>{
      $('#nav').removeClass('-translate-x-full');
    })

    $('#close').on('click', ()=>{
      $('#nav').addClass('-translate-x-full');
    })


});
