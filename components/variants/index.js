const variantProps = {
  initial: "hidden",
  animate: "visible",
};

const landRVariant = (direction, delay) => {
  return {
    hidden: {
      x: direction,
    },
    visible: {
      x: 0,
      transition: {
        type: "tween",
        duration: 2,
        delay: delay,
      },
    },
  };
};

const aboutBlockContainer = {
  hidden: {
    backgroundColor: "#fff",
  },

  visible: {
    backgroundColor: "rgb(245, 243, 241)",
    transition: {
      type: "tween",
      duration: 2,
      delay: 2,
    },
  },
};

const pageVariant = (duration = 2, delay = 0) => {
  return {
    hidden: {
      opacity: 0,
    },

    visible: {
      opacity: 1,
      transition: {
        type: "tween",
        duration: duration,
        delay: delay,
      },
    },
  };
};

const cardHover = {
  hover: {
    scale: 1.01,
    transition: {
      type: "tween",
      yoyo: Infinity,
    },
  },
};

const dropVariant = {
  hidden: {
    height: "0px",
  },

  visible: {
    height: "100%",
    transition: {
      type: "tween",
      duration: 1,
    },
  },
};

const slideFromTop = {
  hidden: {
    y: "-100vh",
  },

  visible: {
    y: 0,
    transition: {
      type: "tween",
      duration: 1,
    },
  },
};

const projectCardVariant = (duration = 2, delay = 0) => {
  return {
    hidden: {
      scale: 0,
    },

    visible: {
      scale: 1,
      transition: {
        type: "spring",
        duration: duration,
        delay: delay,
      },
    },
  };
};
// custom Hook to export the variants as needed
export const useVariants = () => {
  return {
    slideFromTop,
    variantProps,
    dropVariant,
    cardHover,
    landRVariant,
    aboutBlockContainer,
    pageVariant,
    projectCardVariant,
  };
};
