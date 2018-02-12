const easeOut = t => 1 - --t * t * t * t;

export const throttle = (fn, threshhold, scope) => {
    threshhold || (threshhold = 250);
    let last, deferTimer;
    return function() {
        const context = scope || this;
        const now = +new Date(),
            args = arguments;
        if (last && now < last + threshhold) {
            // hold on to it
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function() {
                last = now;
                fn.apply(context, args);
            }, threshhold);
        } else {
            last = now;
            fn.apply(context, args);
        }
    };
};

export const tween = (oldValues, newValues, { delay = 1000, onComplete, onUpdate, onError }) => {
    const speed = 20;
    const diffs = {};
    const values = { ...oldValues };
    const steps = Math.ceil(delay / speed);
    let step = 0;
    let error = '';

    // create diffs
    for (const key in oldValues) {
        if (!newValues[key]) {
            error = 'Both objects should have the same properties.';
            break;
        }
        diffs[key] = newValues[key] - oldValues[key];
    }

    if (error) {
        onError && onError(error);
        return;
    }

    const interval = setInterval(() => {
        const progress = easeOut(step / steps);
        for (const key in values) {
            values[key] = oldValues[key] + diffs[key] * progress;
        }
        step++;
        if (step >= steps) {
            clearInterval(interval);
            onComplete && onComplete(values);
        } else {
            onUpdate && onUpdate(values);
        }
    }, speed);
};

export default {
    throttle,
    tween
};
