import classNames from "classnames";
import React, { FC, ReactNode, useCallback, useEffect, useState } from "react";
import styles from "./Slider.module.scss";

interface ISlide {
  padded?: boolean;
  content?: ReactNode;
  backgroundImage?: string;
  horizontalPosition: "left" | "middle" | "right";
  verticalPosition: "bottom" | "center" | "top";
}

const slides: ISlide[] = [
  {
    padded: true,
    backgroundImage: "/1.jpg",
    horizontalPosition: "right",
    verticalPosition: "top",
    content: <h1>How to survive quarantine in Saint-Petersburg</h1>,
  },
  {
    backgroundImage: "/3.jpg",
    padded: true,
    horizontalPosition: "left",
    verticalPosition: "top",
    content: (
      <p>
        It affected all spheres of our lives, from business to romantic
        relationships: company workers got used to holding online conferences,
        and dating almost completely moved to tinder and other apps.
      </p>
    ),
  },
  {
    padded: true,
    backgroundImage: "/8.jpg",
    horizontalPosition: "left",
    verticalPosition: "bottom",
    content: (
      <>
        <h2>Denial</h2>
        <p>
          At first we all tried to deny the fact that we need to change our old
          habits of going to club every Sunday or meeting together for lunch
          after studying.
        </p>
      </>
    ),
  },
  {
    padded: true,
    backgroundImage: "/9.jpg",
    horizontalPosition: "left",
    verticalPosition: "bottom",
    content: (
      <>
        <h2>Anger</h2>
        <p>
          fter we found out that we can no longer continue the previous way of
          living, we started getting mad about it.
        </p>
      </>
    ),
  },
  {
    padded: true,
    backgroundImage: "/10.jpg",
    horizontalPosition: "left",
    verticalPosition: "top",
    content: (
      <>
        <h2>Bargaining</h2>
        <p>
          The hardest part of all of the quarantine was the period when we tried
          to figure out which precautions were necessary and obligatory, and
          which could be avoided.
        </p>
      </>
    ),
  },
  {
    padded: true,
    backgroundImage: "/11.jpg",
    horizontalPosition: "left",
    verticalPosition: "top",
    content: (
      <>
        <h2>Depression</h2>
        <p>
          Suddenly I understood, that I was completely alone, although literally
          all people on Earth felt the effect of the Pandemic.
        </p>
      </>
    ),
  },
  {
    padded: true,
    backgroundImage: "/6.jpg",
    horizontalPosition: "left",
    verticalPosition: "top",
    content: (
      <>
        <h2>Acceptance</h2>
        <p>
          After all this terror, the only thing that helped me was strict and
          responsible lifestyle.
        </p>
      </>
    ),
  },
];

const Slide: FC<ISlide> = ({
  backgroundImage,
  horizontalPosition,
  verticalPosition,
  content,
  padded,
}) => {
  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className={classNames(styles.slide, { [styles.padded]: padded })}
    >
      <div
        className={classNames(
          styles.content,
          styles[verticalPosition],
          styles[horizontalPosition]
        )}
      >
        {content}
      </div>
    </div>
  );
};

const Slider = () => {
  const [chosenSlide, setChosenSlide] = useState(0);
  const toPreviousSlide = useCallback(() => {
    if (chosenSlide) {
      setChosenSlide((state) => state - 1);
    }
  }, [chosenSlide, setChosenSlide]);

  const toNextSlide = useCallback(() => {
    if (chosenSlide < slides.length - 1) {
      setChosenSlide((state) => state + 1);
    }
  }, [chosenSlide, setChosenSlide]);

  const [toggled, setToggled] = useState(false);
  const onKeyPress = useCallback(
    (e: KeyboardEvent) => {
      switch (e.keyCode) {
        case 37:
          toPreviousSlide();
          break;
        case 39:
          toNextSlide();
          break;
        case 40:
          setToggled(true);
          break;
        case 38:
          setToggled(false);
          break;
        default:
          break;
      }
    },
    [toPreviousSlide, toNextSlide, setToggled]
  );

  useEffect(() => {
    window.addEventListener("keyup", onKeyPress);
    return () => {
      window.removeEventListener("keyup", onKeyPress);
    };
  }, [onKeyPress]);

  return (
    <div className={styles.article}>
      <div
        className={classNames(styles.article_wrapper, {
          [styles.toggled]: toggled,
        })}
      >
        <div className={styles.slider}>
          <div onClick={toPreviousSlide} className={styles.left_arrow} />
          <div
            style={{ gridTemplateColumns: `repeat(${slides.length}, 1fr)` }}
            className={styles.stripes}
          >
            {slides.map((_, idx) => {
              return (
                <div
                  key={idx}
                  className={classNames(styles.stripe, {
                    [styles.active]: idx <= chosenSlide,
                  })}
                />
              );
            })}
          </div>
          <div
            style={{ transform: `translateX(${-100 * chosenSlide}vw)` }}
            className={styles.slides_wrapper}
          >
            {slides.map((slide, idx) => {
              return <Slide key={idx} {...slide} />;
            })}
          </div>
          <div onClick={toNextSlide} className={styles.right_arrow} />
        </div>
        <div className={styles.article_content}>
          <div className={styles.article_text}>
            <h1>How to survive quarantine in Saint-Petersburg</h1>
            <p>
              Lately all of us have faced a global enemy- COVID-19. It affected
              all spheres of our lives, from business to romantic relationships:
              company workers got used to holding online conferences, and dating
              almost completely moved to tinder and other apps. Pandemic
              definitely changed the way we see things: we easily replaced
              restaurants with delivery services, finally bought a Netflix
              account, and even extraverts started being uncomfortable around
              big groups of people.
            </p>
            <p>
              Surviving the Pandemic in Saint-Petersburg was definitely an
              outstanding experience which taught me many lessons. During the
              quarantine I went through all of the stages of acceptance. This is
              how it went for me and my closest
            </p>
            <ol>
              <li>
                Denial. At first we all tried to deny the fact that we need to
                change our old habits of going to club every Sunday or meeting
                together for lunch after studying. I think, in our city all of
                the government programmes related to the virus went relatively
                slow, compared to Moscow or European cities, so that until the
                last moment we considered the precautions unnecessary. As
                restrictions came into effect only on March, 26, a lot more
                people were infected during the first period, compared to
                Moscow, where strict mode started on March,10.
              </li>
              <li>
                Anger. After we found out that we can no longer continue the
                previous way of living, we started getting mad about it. We
                argued with cafe workers, who kept knocking us out earlier that
                usual, we shouted at cashiers who refused to sell us groceries
                without our masks on. The masks! Luckily, I wasn’t the one
                struggling with breathing in masks, but I definitely used to
                hate them!
              </li>
              <li>
                Bargaining. The hardest part of all of the quarantine was the
                period when we tried to figure out which precautions were
                necessary and obligatory, and which could be avoided. Of course,
                this is the terrible way of thinking, but it was really
                difficult to go through something like that at the first time of
                your life. I was so happy to find out that we don’t have to wear
                masks on the streets! While struggling with boredom, we tried to
                look for other activities that would give us endorphins, because
                computer games and watching films weren’t a thing no more.
                Moreover, we started getting less fit, and the great thought
                that came to my mind was to go to gym! It could work out so
                well- exercising during quarantine would lead me to perfect
                shape when it is all over! Luckily, I found a sports centre that
                remained open during the lockdown. I tried it out, the time
                went, I started getting fitter and fitter, and.. nothing
                happened.
              </li>
              <li>
                Depression. Suddenly I understood, that I was completely alone,
                although literally all people on Earth felt the effect of the
                Pandemic. I realised that I have absolutely no idea about how
                long it is going to last and if it is even going to come to end
                someday or not. I didn’t even know if I was going to see my
                family, which I left in another city, one more time or not.
                There thoughts led me to the hard times, which were even harder
                to go through when no one was around. No one literally was
                around! The streets were empty, even the most touristic and
                popular ones. Before this, I never understood how a little
                lockdown could change so much: I never trusted people who were
                telling me about the mental problems they experienced because of
                this global misfortune. I started feeling it and understanding
                the complete horror of it, compared to carefree times in the
                beginning of the year. There were more and more stories about my
                friends’ relatives or mates, who suffered from the virus, and
                some of them even died. All of this opened my eyes and made me
                more responsible.
              </li>
              <li>
                Acceptance. After all this terror, the only thing that helped me
                was strict and responsible lifestyle. I began to follow all of
                the rules: I washed my hand often, maybe too often, I supported
                small business and I learned how to spend time with myself,
                which really helped me with self awareness.
              </li>
            </ol>
            <p>
              I realised that one off the most important things during crisis
              I’d schedule: don’t forget to eat, sleep well and plan your day.
              Without that life would look like a mess, containing of
              everlasting chilling on a sofa, eating snacks.
            </p>
            <p>
              Going through these steps was necessary while surviving the
              pandemic. Of course, it hasn’t happened yet, but now we know how
              to behave ourselves and are rather comfortable with out new
              lifestyle. I am happy that I managed to stay in my city while
              this, because I believe that restrictions here were cleverer than
              in other parts of Russia. They were quite harsh, but didn’t stop
              you from living your life and going out, and it helped!
            </p>
            <p>
              Compared to Moscow, restrictions in Saint-Petersburg were more
              effective.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
