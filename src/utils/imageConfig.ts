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
  // 💡 To change, replace with your direct link (e.g. "https://i.postimg.cc/...")
  khatuShyamHero: "https://i.postimg.cc/RqrNbfpS/shyam-express-poster-9.webp", 

  // 2. Cast Members
  sumedhMudgalkar: localSumedhMudgalkar, 
  divyaDutta: localDivyaDutta,           
  prajaktaMali: localPrajaktaMali,       
  
  // 3. Protagonist Character Blueprints
  profShyam: localProfShyam,             

  // 4. Executive & Mentorship Portraits
  // 💡 To change, replace with your direct link (e.g. "https://i.postimg.cc/...")
  hemantMentoring: "https://i.postimg.cc/7hQ0mf0K/HEMANT-DAS-MONTAGE.png", 
  hemantNilimDas: localHemantNilimDas,   

  // 5. Studio Branding & Logos
  shyamExpressLogo: localShyamExpressLogo 
};
