const reconnectTimeout = 30000;
const host = "ws://broker.mqttdashboard.com:8000/mqtt";
const port = 8000;
let mqtt = new Paho.MQTT.Client(host, 'clientId-5T9d1kSD1e');


function setState(command, relay) {
    switch (command) {
        case "0":
            relay.prop('checked', false);
            break;
        case "1":
            relay.prop('checked', true);
            break;
        default:
            break;
    }
}

function onConnect() {
    console.log("connected");
    mqtt.subscribe('relay_1');
    mqtt.subscribe('relay_2');
    mqtt.subscribe('relay_3');
}

function MQTTconnect(relay_1, relay_2, relay_3) {
    console.log(`connecting to ${host}`);

    mqtt.onMessageArrived = (message) => {
        console.log(message.payloadString);
        console.log(message.destinationName);
        if (message.destinationName === 'relay_1') {
            setState(message.payloadString, relay_1);
        }
        if (message.destinationName === 'relay_2') {
            setState(message.payloadString, relay_2);
        }
        if (message.destinationName === 'relay_3') {
            setState(message.payloadString, relay_3);
        }
    };
    const options = {
        onSuccess: onConnect,
        timeout: reconnectTimeout
    };
    mqtt.connect(options);
}

function publish (relay, relay_no) {
    let message;
    if (relay.prop('checked')) {
        message = new Paho.MQTT.Message("1");
    }
    else {
        message = new Paho.MQTT.Message("0");
    }
    message.destinationName = relay_no;
    message.retained = true;
    mqtt.send(message);
}

$(document).ready(function () {
    const switch_1 = $('.switch_1');
    const switch_2 = $('.switch_2');
    const switch_3 = $('.switch_3');
    MQTTconnect(switch_1, switch_2, switch_3);
    switch_1.click(function () {
        publish(switch_1, 'relay_1');
    });
    switch_2.click(function () {
        publish(switch_2, 'relay_2');
    });
    switch_3.click(function () {
        publish(switch_3, 'relay_3');
    });
});
