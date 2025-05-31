import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function FestivalSectionAnimation(ref) {
  if (!ref?.current) return;

  const el = ref.current;

  const animation = gsap.fromTo(
    el,
    { y: 100, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play reverse play reverse',
      },
    }
  );

  return () => {
    // Cleanup de l'animation et ScrollTrigger
    animation.scrollTrigger?.kill();
    animation.kill();
  };
}
