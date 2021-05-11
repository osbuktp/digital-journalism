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
    horizontalPosition: "middle",
    verticalPosition: "center",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, nulla!",
  },
  {
    horizontalPosition: "left",
    verticalPosition: "bottom",
    content: <h1>Hello world</h1>,
  },
  {
    padded: true,
    backgroundImage: "/3.jpg",
    horizontalPosition: "right",
    verticalPosition: "top",
    content: <h1>Hello world</h1>,
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
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          repellat maxime. Animi totam officia delectus dicta ut sunt, qui
          temporibus veniam? Omnis totam ipsum magni facilis itaque cum nemo
          voluptate odit eaque illum, ipsam accusamus dicta, doloremque
          necessitatibus sunt quam expedita adipisci nisi repellat voluptatum.
          Iure dolores illum sint officia!
        </div>
      </div>
    </div>
  );
};

export default Slider;
