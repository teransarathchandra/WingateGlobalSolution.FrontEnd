const floatAnimation = {
  initial: { y: -20 },
  animate: {
    y: 10,
    transition: { duration: 2, repeatType: "reverse" },
    // transition: { repeat: Infinity, duration: 2, repeatType: "reverse" },
  },
};

export default floatAnimation;
