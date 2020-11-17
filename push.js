var webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BA6rKERp9z9EyJWatl5qgJK89zFh25sMhKd3qqcul8H9WPqW8M0H-9NUIq0ETkU4ESftnVvsUQXr7BfR3rTzkQA",
    "privateKey": "K1P2fCDyOZ2RIRWuH1TUIeHFIabwaxkedZQj5TDELGM"
};
webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cj-1ZQ8hdl8:APA91bEjfyIgccqzO4_SonlRcPx2w1v6-MaCxwER9H8GH9kjguTJd8E9YHPyvAu5G3XSU6byq91L29GNboXkMV_2Ygv5lfE0GsWQXntPeF_j7-W54kyAV72DhUeBKVUZU7FQEOtd0Ksv",
    "keys": {
        "p256dh": "BH4NfUxKRBNuz/BTxsul0Hb/jsV5o6bCyjRnhfBORrynmZolrR0wsVwn3RHw5IzrzFLkSbagPrhaUFlthVaQpRI=",
        "auth": "K6YIy6ZK+OBgSc84IkvUqA=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
var options = {
    gcmAPIKey: '273257854491',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);