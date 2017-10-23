
export const fadeIn = (el, options = {}) => {
    anime(Object.assign({
        targets: el,
        opacity: 1,
        easing: 'easeInOutQuad'
    }, options));
};

export const fadeOut = (el, options = {}) => {
    anime(Object.assign({
        targets: el,
        opacity: 0,
        easing: 'easeInOutQuad'
    }, options));
};

export const slideRightIn = (el, options = {}) => {
    anime({
        targets: el,
        easing: 'easeInOutQuad',
        translateX: [
            { value: 20, delay: 0 },
            { value: 0, duration: options.duration }
        ],
        opacity: [
            { value: 0, delay: 0  },
            { value: 1, duration: options.duration }
        ],
        duration: options.duration,
        complete: options.complete
    });
};

export const slideLeftIn = (el, options = {}) => {
    anime({
        targets: el,
        easing: 'easeInOutQuad',
        translateX: [
            { value: -20 },
            { value: 0, duration: options.duration }
        ],
        opacity: [
            { value: 0 },
            { value: 1, duration: options.duration }
        ],
        duration: options.duration,
        complete: options.complete
    });
};

export const slideUpIn = (el, options = {}) => {
    anime({
        targets: el,
        easing: 'easeInOutQuad',
        translateY: [
            { value: 20, delay: 0 },
            { value: 0, duration: options.duration }
        ],
        opacity: [
            { value: 0, delay: 0  },
            { value: 1, duration: options.duration }
        ],
        duration: options.duration,
        complete: options.complete
    });
};

export const slideDownOut = (el, options = {}) => {
    anime({
        targets: el,
        easing: 'easeInOutQuad',
        translateY: [
            { value: 0 },
            { value: 20, duration: options.duration }
        ],
        opacity: [
            { value: 1 },
            { value: 0, duration: options.duration }
        ],
        duration: options.duration,
        complete: options.complete
    });
};
