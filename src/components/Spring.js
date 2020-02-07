import React from 'react';
import { useSpring, animated } from 'react-spring';

function Spring() {
  const props = useSpring({
    // to: async (next, cancel) => {
    //   await next({opacity: 1, color: 'purple', transition: "all 10ms liner" })
    //   await next({opacity: 0, color: 'purple', transition: "all .5s liner" })
    // },
    to: [
      { opacity: 1 },
      { opacity: 0 }],
    from: { opacity: 0 },
    config: {
      duration: 1200
    },
    onRest: () => {
      console.log('onrest');
    }
  })


  return (
    <animated.div style={props}>I will fade in and out</animated.div>
  )
}

export default Spring;
