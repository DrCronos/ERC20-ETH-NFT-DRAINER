const notificationContainer = document.getElementById('alert-container');
const NOTIFICATION_TYPES = {
    INFO: 'info',
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error',
};

function addNotification(type, text) {
    // create the DIV and add the required classes
    const newNotification = document.createElement('div');
    newNotification.classList.add('notification', `notification-${type}`);

    const innerNotification = `<strong>${type}:</strong> ${text}`;

    // insert the inner elements
    newNotification.innerHTML = innerNotification;

    // add the newNotification to the container
    document.getElementById('alert-container').appendChild(newNotification);

    return newNotification;
}

function removeNotification(notification, delay = 3000) {
    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => { // remove notification from the DOM after 0.5 seconds
            document.getElementById('alert-container').removeChild(notification);
        }, 500);
    }, delay);
}

// const info = addNotification(NOTIFICATION_TYPES.INFO, 'Info text added');
// setTimeout(() => {
//     removeNotification(info);
// }, 5000);