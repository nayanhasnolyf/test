import Image from "next/image";
import Link from "next/link";

const heroImages = [
  {
    src: "/images/hero/athernex.jpeg",
    width: 1500,
    height: 844,
    className: "hero-photo--wide",
    sizes: "(max-width: 720px) 116vw, (max-width: 1488px) 82vw, 1220px",
  },
  {
    src: "/images/hero/hackathon.jpeg",
    width: 1280,
    height: 720,
    className: "hero-photo--portrait",
    sizes: "(max-width: 1417px) 36vw, 510px",
  },
  {
    src: "/images/hero/under25.jpeg",
    width: 1600,
    height: 1200,
    className: "hero-photo--landscape",
    sizes: "(max-width: 720px) 108vw, (max-width: 1469px) 64vw, 940px",
  },
  {
    src: "/images/hero/ncc.jpeg",
    width: 1280,
    height: 720,
    className: "hero-photo--tall",
    sizes: "(max-width: 1413px) 46vw, 650px",
  },
] as const;

function ImageGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="hero-reel-group" aria-hidden={duplicate || undefined}>
      {heroImages.map((image, index) => (
        <div className={`hero-photo ${image.className}`} key={image.src}>
          <Image
            alt=""
            className="hero-photo-image"
            height={image.height}
            preload={!duplicate && index === 0}
            sizes={image.sizes}
            src={image.src}
            width={image.width}
          />
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-reel" aria-hidden="true">
        <div className="hero-reel-track">
          <ImageGroup />
          <ImageGroup duplicate />
        </div>
      </div>

      <div className="page-container hero-content">
        <p className="hero-eyebrow">Hello</p>
        <h1 className="hero-headline" id="hero-heading">
          <span>I build software that</span>
          {" "}
          <span>lives somewhere between</span>
          {" "}
          <span>systems, products and AI.</span>
        </h1>
        <p className="hero-introduction">
          I&apos;m Nayan, a software engineer based in Bangalore.
          <br />
          {" "}
          I enjoy building backend systems, AI applications
          <br />
          {" "}
          and products that solve real problems.
        </p>
      </div>

      <Link className="hero-scroll-cue" href="#work">
        <span>scroll to explore</span>
        <span className="hero-scroll-arrow" aria-hidden="true">
          &#8595;
        </span>
      </Link>
    </section>
  );
}
