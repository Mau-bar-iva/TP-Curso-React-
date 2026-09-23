export const notify = (message, type = 'success', options = {}) => {
    if (typeof window === 'undefined') return;

    const payload = typeof message === 'object' && message !== null
        ? message
        : {
            message,
            type,
            ...options,
        };

    window.dispatchEvent(
        new CustomEvent('app-toast', {
            detail: payload,
        })
    );
};
