/**
 * Shyam Express Pitch Deck - Central Image Asset Configuration
 * 
 * 💡 HOW TO MANUALLY ADD YOUR OWN IMAGES (.png / .jpg / etc.):
 * If you deploy to Vercel and some local images do not show up, or you want to use your own assets:
 * 1. Upload your image to an online image host (like Imgur, Postimages, or your own server/Vercel public/ folder).
 * 2. Get the direct image link (it must end with .png, .jpg, or .jpeg, e.g. "https://i.imgur.com/your-image.png").
 * 3. Replace the imported file variables below with your direct URL string (e.g. khatuShyamHero: "https://i.imgur.com/...").
 * 4. Save this file, and your images will immediately display perfectly on Vercel!
 */

// @ts-ignore
import localKhatuShyamHero from "../assets/images/khatu_shyam_hero_1783612474905.jpg";
// @ts-ignore
import localSumedhMudgalkar from "../assets/images/sumedh_mudgalkar_1783617889941.jpg";
// @ts-ignore
import localDivyaDutta from "../assets/images/divya_dutta_actress_1783617903496.jpg";
// @ts-ignore
import localProfShyam from "../assets/images/prof_shyam_turnaround_1783617863544.jpg";
// @ts-ignore
import localHemantMentoring from "../assets/images/hemant_mentoring_1783617934923.jpg";
// @ts-ignore
import localHemantNilimDas from "../assets/images/hemant_nilim_das_1783617875633.jpg";
// @ts-ignore
import localPrajaktaMali from "../assets/images/prajakta_mali_actress_1783617922399.jpg";
// @ts-ignore
import localShyamExpressLogo from "../assets/images/shyam_express_logo_1783665032905.jpg";

export const IMAGES = {
  // 1. Title Slide Hero / Poster Background
  khatuShyamHero: localKhatuShyamHero, // Replace with "https://i.postimg.cc/RqrNbfpS/shyam-express-poster-9.webp" if needed

  // 2. Cast Members
  sumedhMudgalkar: localSumedhMudgalkar, // Replace with "https://your-url.png" if needed
  divyaDutta: localDivyaDutta,           // Replace with "https://your-url.png" if needed
  prajaktaMali: localPrajaktaMali,       // Replace with "https://your-url.png" if needed
  
  // 3. Protagonist Character Blueprints
  profShyam: localProfShyam,             // Replace with "https://your-url.png" if needed

  // 4. Executive & Mentorship Portraits
  hemantMentoring: localHemantMentoring, // Replace with "https://your-url.png" if needed
  hemantNilimDas: localHemantNilimDas,   // Replace with "https://your-url.png" if needed

  // 5. Studio Branding & Logos
  shyamExpressLogo: localShyamExpressLogo // Replace with "https://your-url.png" if needed
};
