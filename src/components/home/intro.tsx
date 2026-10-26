import type { CSSProperties } from "react";

// Runs before the overlay is parsed: skip the intro after the first view this session.
const onceScript = `try{if(sessionStorage.getItem("intro")){document.documentElement.dataset.introSeen=""}else{sessionStorage.setItem("intro","1")}}catch(e){}`;

const cuts = [
  { r: "-8deg", d: "0.30s", top: "50%" },
  { r: "84deg", d: "0.40s", top: "18%", left: "40%" },
  { r: "94deg", d: "0.48s", top: "18%", left: "60%" },
];

// Deterministic scatter so server and client markup match.
const cubes = Array.from({ length: 30 }, (_, i) => ({
  bg: ["var(--color-sky-300)", "var(--color-sand-100)", "var(--color-sky-200)", "var(--color-sky-500)", "var(--color-sand-200)"][(i * 7) % 5],
  dx: `${((i * 13) % 17) - 8}vw`,
  dy: `${30 + ((i * 29) % 40)}vh`,
  rot: `${((i * 37) % 120) - 60}deg`,
}));

/** The dicing intro. CSS-only, decorative, never blocks input, hidden for reduced motion. */
export function Intro() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: onceScript }} />
      <div aria-hidden className="intro">
        <div className="relative grid place-items-center">
          <span className="intro-mono font-serif text-[clamp(8rem,22vw,14rem)] leading-none text-sand-100">IA</span>
          {cuts.map((c, i) => (
            <span
              key={i}
              className="intro-cut absolute h-0.5 w-[120%] bg-sky-300"
              style={{ "--r": c.r, "--d": c.d, top: c.top, left: c.left ?? "-10%" } as CSSProperties}
            />
          ))}
          <div className="absolute grid grid-cols-6 gap-2">
            {cubes.map((c, i) => (
              <span
                key={i}
                className="intro-cube size-7 rounded-[5px]"
                style={{ background: c.bg, "--dx": c.dx, "--dy": c.dy, "--rot": c.rot } as CSSProperties}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
