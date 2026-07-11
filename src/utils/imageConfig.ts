/**
 * Shyam Express Pitch Deck - Central Image Asset Configuration
 * 
 * 💡 HOW TO CONVERT YOUR OWN IMAGES (.png / .jpg / .webp) TO URLS AND WHERE TO PUSH THEM:
 * 1. Go to a free image hosting site like https://postimages.org/ or https://imgur.com/
 * 2. Upload your local image file.
 * 3. Once uploaded, copy the "Direct Link" (It MUST end with .png, .jpg, .jpeg, or .webp).
 *    - Example: https://i.postimg.cc/RqrNbfpS/shyam-express-poster-9.webp
 * 4. Paste that link directly inside the quotes below for the correct slide (e.g. khatuShyamHero: "https://i.postimg.cc/...").
 * 5. If any link is empty ("") or contains "your-direct-link", it will automatically fall back
 *    to the high-quality preloaded local image so your app never looks broken!
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

// Smart helper to use custom URL if valid, otherwise fall back to pre-packaged asset
const getUrl = (customUrl: string, fallbackAsset: string): string => {
  if (!customUrl || customUrl.trim() === "" || customUrl.includes("your-direct-link")) {
    return fallbackAsset;
  }
  return customUrl.trim();
};

// 🌟 EDIT THE LINKS INSIDE THE QUOTES BELOW 🌟
export const IMAGES = {
  // 1. Title Slide Hero / Poster Background
  khatuShyamHero: getUrl(
    "https://i.postimg.cc/RqrNbfpS/shyam-express-poster-9.webp", 
    localKhatuShyamHero
  ),

  // 2. Cast Members
  sumedhMudgalkar: getUrl(
    "https://i.postimg.cc/your-direct-link/sumedh_mudgalkar.jpg", 
    localSumedhMudgalkar
  ), 
  divyaDutta: getUrl(
    "https://i.postimg.cc/your-direct-link/divya_dutta.jpg", 
    localDivyaDutta
  ),           
  prajaktaMali: getUrl(
    "https://i.postimg.cc/your-direct-link/prajakta_mali.jpg", 
    localPrajaktaMali
  ),       
  
  // 3. Protagonist Character Blueprints
  profShyam: getUrl(
    "https://i.postimg.cc/your-direct-link/prof_shyam.jpg", 
    localProfShyam
  ),             

  // 4. Executive & Mentorship Portraits
  hemantMentoring: getUrl(
    "https://i.postimg.cc/7hQ0mf0K/HEMANT-DAS-MONTAGE.png", 
    localHemantMentoring
  ), 
  hemantNilimDas: getUrl(
    "https://i.postimg.cc/your-direct-link/hemant_nilim_das.jpg", 
    localHemantNilimDas
  ),   

  // 5. Studio Branding & Logos
  shyamExpressLogo: getUrl(
    "https://i.postimg.cc/your-direct-link/shyam_express_logo.jpg", 
    localShyamExpressLogo
  )
};
