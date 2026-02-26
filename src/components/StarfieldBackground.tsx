import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

// Real northern hemisphere stars: [RA (hours 0-24), Dec (degrees -30 to 90), magnitude (0=brightest)]
const STARS: [number, number, number][] = [
  // Ursa Minor (Little Dipper)
  [2.53, 89.26, 1.97],   // Polaris
  [14.84, 74.16, 2.08],  // Kochab
  [15.73, 77.79, 3.00],  // Pherkad
  [16.29, 75.76, 4.23],  // Yildun
  [15.07, 71.83, 4.32],  // Urodelus
  [17.10, 86.59, 4.36],  // Epsilon UMi
  [16.77, 82.04, 4.95],  // Zeta UMi

  // Ursa Major (Big Dipper)
  [11.06, 61.75, 1.79],  // Dubhe
  [11.03, 56.38, 2.37],  // Merak
  [11.90, 53.69, 2.44],  // Phecda
  [12.26, 57.03, 3.31],  // Megrez
  [12.90, 55.96, 1.77],  // Alioth
  [13.40, 54.93, 2.27],  // Mizar
  [13.79, 49.31, 1.86],  // Alkaid

  // Cassiopeia
  [0.68, 56.54, 2.24],   // Schedar
  [0.15, 59.15, 2.28],   // Caph
  [0.95, 60.72, 2.47],   // Gamma Cas
  [1.43, 60.24, 2.68],   // Ruchbah
  [1.91, 63.67, 3.37],   // Segin

  // Cygnus (Northern Cross)
  [20.69, 45.28, 1.25],  // Deneb
  [19.51, 27.96, 2.23],  // Sadr
  [19.75, 45.13, 2.87],  // Delta Cyg
  [20.37, 40.26, 2.48],  // Gienah
  [19.50, 32.69, 3.08],  // Albireo area

  // Lyra
  [18.62, 38.78, 0.03],  // Vega
  [18.98, 32.69, 3.25],  // Sheliak
  [18.83, 33.36, 3.52],  // Sulafat

  // Aquila
  [19.85, 8.87, 0.76],   // Altair
  [19.77, 10.61, 2.72],  // Tarazed
  [19.10, 13.86, 3.36],  // Alshain

  // Boötes
  [14.26, 19.18, -0.05], // Arcturus
  [14.53, 38.31, 2.68],  // Izar
  [15.03, 40.39, 3.49],  // Muphrid

  // Corona Borealis
  [15.58, 26.71, 2.22],  // Alphecca

  // Draco
  [14.07, 64.38, 3.65],  // Thuban area
  [17.15, 65.71, 2.74],  // Eltanin
  [17.51, 61.51, 2.79],  // Rastaban
  [19.21, 67.66, 3.17],  // Grumium

  // Perseus
  [3.41, 49.86, 1.79],   // Mirfak
  [3.14, 40.96, 2.12],   // Algol
  [3.08, 53.51, 2.85],   // Delta Per

  // Auriga
  [5.28, 45.99, 0.08],   // Capella
  [5.99, 44.95, 2.62],   // Menkalinan
  [5.03, 43.82, 2.69],   // Theta Aur

  // Gemini
  [7.58, 31.89, 1.16],   // Pollux
  [7.75, 28.03, 1.58],   // Castor
  [6.63, 16.40, 3.06],   // Alhena

  // Orion (partially visible)
  [5.92, 7.41, 0.18],    // Betelgeuse
  [5.24, -8.20, 0.13],   // Rigel
  [5.42, -1.20, 1.69],   // Mintaka
  [5.60, -1.94, 2.23],   // Alnilam
  [5.68, -1.94, 1.77],   // Alnitak

  // Taurus
  [4.60, 16.51, 0.86],   // Aldebaran
  [3.79, 24.11, 2.87],   // Alcyone (Pleiades)

  // Andromeda
  [0.14, 29.09, 2.07],   // Alpheratz
  [1.16, 35.62, 2.06],   // Mirach
  [2.06, 42.33, 2.10],   // Almach

  // Pegasus
  [23.06, 28.08, 2.49],  // Markab
  [23.08, 15.21, 2.39],  // Scheat
  [0.22, 15.18, 2.83],   // Algenib

  // Leo
  [10.14, 11.97, 1.36],  // Regulus
  [11.82, 14.57, 2.14],  // Denebola

  // Scattered bright stars
  [6.75, -16.72, -1.46], // Sirius (low on horizon)
  [7.65, 5.22, 0.34],    // Procyon
  [16.49, -26.43, 0.91], // Antares (very low)

  // ── Additional edge/dim stars to fill sides ──
  [13.42, 10.96, 2.56],  // Vindemiatrix (Virgo)
  [12.69, -1.45, 2.74],  // Porrima (Virgo)
  [13.18, -23.17, 3.37], // Gamma Hydra
  [9.31, -8.66, 3.11],   // Alphard (Hydra)
  [8.16, -24.86, 3.61],  // Delta Vel area
  [22.10, -0.32, 2.90],  // Sadalsud (Aquarius)
  [21.53, 9.88, 2.91],   // Enif (Pegasus)
  [22.71, 30.22, 3.40],  // Iota Peg
  [20.43, -14.78, 3.05], // Dabih (Capricornus)
  [18.35, -29.83, 1.85], // Kaus Australis (Sagittarius)
  [17.56, 12.56, 2.08],  // Rasalhague (Ophiuchus)
  [16.00, -22.62, 2.29], // Dschubba (Scorpius)
  [8.74, 18.15, 3.52],   // Rho Leo
  [6.38, -17.96, 3.02],  // Mirzam (CMa)
  [21.74, 62.59, 3.35],  // Alpha Cep
  [22.49, 58.20, 3.21],  // Beta Cep
  [3.58, 31.88, 3.60],   // Delta And
  [23.63, 46.02, 3.53],  // Schedir area
  [1.62, 48.63, 3.57],   // Eta Cas
  [4.95, 33.17, 3.72],   // Epsilon Per
];

// Project RA/Dec to screen coords using stereographic projection
function projectStar(
  ra: number,
  dec: number,
  width: number,
  height: number,
  rotation: number,
  scrollOffset: number
): [number, number] {
  const raRad = (ra / 24) * Math.PI * 2 + rotation;
  const decRad = (dec * Math.PI) / 180;
  const centerDec = (60 * Math.PI) / 180; // Lowered from 80° to spread stars wider

  const sinDec = Math.sin(decRad);
  const cosDec = Math.cos(decRad);
  const sinCenter = Math.sin(centerDec);
  const cosCenter = Math.cos(centerDec);

  const denom = 1 + sinCenter * sinDec + cosCenter * cosDec * Math.cos(raRad);
  if (denom < 0.1) return [-100, -100];

  const scale = Math.min(width, height) * 0.7; // Increased from 0.45 for wider spread
  const x = (scale * cosDec * Math.sin(raRad)) / denom;
  const y = (scale * (cosCenter * sinDec - sinCenter * cosDec * Math.cos(raRad))) / denom;

  return [
    width / 2 + x,
    height / 2 - y + scrollOffset,
  ];
}

function magnitudeToSize(mag: number): number {
  return Math.max(0.5, 3 - mag * 0.5);
}

export const StarfieldBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const animRef = useRef<number>(0);
  const startTime = useRef(Date.now());
  const currentScrollOffset = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let running = true;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      if (!running) return;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const elapsed = (Date.now() - startTime.current) / 1000;
      const rotation = elapsed * 0.0005; // Slower rotation (was 0.001)

      // Lerped scroll offset for smooth parallax
      const targetOffset = window.scrollY * 0.03;
      currentScrollOffset.current += (targetOffset - currentScrollOffset.current) * 0.05;
      const scrollOffset = currentScrollOffset.current;

      const isDark = document.documentElement.classList.contains("dark");
      const baseOpacity = isDark ? 0.7 : 0.2;

      for (let i = 0; i < STARS.length; i++) {
        const [ra, dec, mag] = STARS[i];
        const [x, y] = projectStar(ra, dec, w, h, rotation, scrollOffset);

        if (x < -10 || x > w + 10 || y < -10 || y > h + 10) continue;

        const size = magnitudeToSize(mag);
        // Softer twinkle: lower frequency (0.8), gentler range (0.75-1.0)
        const twinkle = 0.75 + 0.25 * Math.sin(elapsed * (0.8 + (i % 7) * 0.15) + i * 2.1);
        const alpha = baseOpacity * twinkle;

        const warmth = 220 + (i % 3) * 15;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${warmth}, ${warmth}, ${Math.min(255, warmth + 10)}, ${alpha})`;
        ctx.fill();

        // Softer glow for bright stars
        if (mag < 1) {
          ctx.beginPath();
          ctx.arc(x, y, size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${warmth}, ${warmth}, 255, ${alpha * 0.07})`;
          ctx.fill();
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      running = false;
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};
