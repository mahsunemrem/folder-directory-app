
export function log(message, level) {

    // WHEN RUNNING WEBPACK WITH `PRODUCTION` build,
    // IT WILL REMOVE THE FOLLOWING CODE.

    if (process.env.VUE_APP_ENV !== 'production') {

        if (level === 'error') {
            console.error(message);
        } else if (level === 'warn') {
            console.warn(message);
        } else {
            console.log(message);
        }
    }
}

export default log;