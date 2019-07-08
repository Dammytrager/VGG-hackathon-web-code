function getRandom(initial, final) {
    let x = (Math.random() * (final - initial)) + initial;
    return x.toFixed(2);
}

let totalEnergy = 0;
let energy1 = 0;
let energy2 = 0;
let energy3 = 0;
let cost1 = 0;
let cost2 = 0;
let cost3 = 0;
let totalCost = 0;

$('document').ready(function () {
    // Switch 1 state
    if ($('.switch_1').prop('checked') === true) {
        $('.light_1').addClass('orange');
    }
    else if($('.switch_1').prop('checked') === false) {
        $('.light_1').removeClass('orange');
    }

    // Switch 2 state
    if ($('.switch_2').prop('checked') === true) {
        $('.light_2').addClass('orange');
    }
    else if($('.switch_2').prop('checked') === false) {
        $('.light_2').removeClass('orange');
    }

    // Switch 3 state
    if ($('.switch_3').prop('checked') === true) {
        $('.light_3').addClass('orange');
    }
    else if($('.switch_3').prop('checked') === false) {
        $('.light_3').removeClass('orange');
    }

    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    function setTimer() {
        seconds = parseInt(seconds) + 1;
        if (seconds === 60) {
            seconds = 0;
            minutes = parseInt(minutes) + 1;
        }
        if (minutes === 60) {
            minutes = 0;
            hours = parseInt(hours) + 1;
        }
        if (seconds<10)
        {
            seconds='0'+seconds;
        }
        const dminutes = minutes < 10 ? '0' + minutes : minutes;
        const dhours = hours < 10 ? '0' + hours : hours;


        time = dhours + ':' + dminutes + ':' + seconds;
        $('#timer').html(time);
    }

    setInterval(setTimer, 1000);

    setInterval(() => {
        let vval1 = getRandom(218, 220);
        let vval2 = getRandom(218, 220);
        let vval3 = getRandom(218, 220);
        let ival1 = getRandom(2, 3);
        let ival2 = getRandom(2, 3);
        let ival3 = getRandom(3, 4);
        let eval1 = (ival1 * vval1 ).toFixed(1);
        let eval2 = (ival2 * vval2).toFixed(1);
        let eval3 = (ival3 * vval3).toFixed(1);
        $('#cost1').html(cost1);
        $('#cost2').html(cost2);
        $('#cost3').html(cost3);
        totalCost = parseFloat(cost1) + parseFloat(cost2) + parseFloat(cost3);
        totalCost = totalCost.toFixed(2);
        $('#table-footer-cost').html(totalCost);
        let totalCurrent;

        switch ($('#options').val()) {
            case 'power':
                // Switch 1
                if ($('.switch_1').prop('checked') === true) {
                    $('#switch1').html(`${eval1} W`);
                }
                else    {
                    $('#switch1').html(`000 W`);
                    eval1 = 0;
                    ival1 = 0;
                    vval1 = 0;
                }
                // Switch 2
                if ($('.switch_2').prop('checked') === true) {
                    $('#switch2').html(`${eval2} W`);
                }
                else    {
                    $('#switch2').html(`000 W`);
                    eval2 = 0;
                    ival2 = 0;
                    vval2 = 0;
                }
                // Switch 3
                if ($('.switch_3').prop('checked') === true) {
                    $('#switch3').html(`${eval3} W`);
                }
                else    {
                    $('#switch3').html(`000 W`);
                    eval3 = 0;
                    ival3 = 0;
                    vval3 = 0;
                }
                $('#table-head-option, #table-footer-option').html('Power');
                $('#switch-1-rating, #switch-2-rating, #switch-3-rating').html('800 W');
                $('#table-footer-value').html(`${totalEnergy} kWh`);
                break;
            case 'voltage':
                $('#table-head-option, #table-footer-option').html('Voltage');
                $('#switch-1-rating, #switch-2-rating, #switch-3-rating').html('-');
                $('#table-footer-value').html(`-`);
                // Switch 1
                if ($('.switch_1').prop('checked') === true) {
                    $('#switch1').html(`${vval1} V`);
                }
                else    {
                    $('#switch1').html(`000 V`);
                    eval1 = 0;
                    ival1 = 0;
                    vval1 = 0;
                }
                // Switch 2
                if ($('.switch_2').prop('checked') === true) {
                    $('#switch2').html(`${vval2} V`);
                }
                else    {
                    $('#switch2').html(`000 V`);
                    eval2 = 0;
                    ival2 = 0;
                    vval2 = 0;
                }
                // Switch 3
                if ($('.switch_3').prop('checked') === true) {
                    $('#switch3').html(`${vval3} V`);
                }
                else    {
                    $('#switch3').html(`000 V`);
                    eval3 = 0;
                    ival3 = 0;
                    vval3 = 0;
                }
                break;
            case 'current':
                // Switch 1
                if ($('.switch_1').prop('checked') === true) {
                    $('#switch1').html(`${ival1} A`);
                }
                else    {
                    $('#switch1').html(`000 A`);
                    eval1 = 0;
                    ival1 = 0;
                    vval1 = 0;
                }
                // Switch 2
                if ($('.switch_2').prop('checked') === true) {
                    $('#switch2').html(`${ival2} A`);
                }
                else    {
                    $('#switch2').html(`000 A`);
                    eval2 = 0;
                    ival2 = 0;
                    vval2 = 0;
                }
                // Switch 3
                if ($('.switch_3').prop('checked') === true) {
                    $('#switch3').html(`${ival3} A`);
                }
                else    {
                    $('#switch3').html(`000 A`);
                    eval3 = 0;
                    ival3 = 0;
                    vval3 = 0;
                }
                totalCurrent = (parseFloat(ival1) + parseFloat(ival2) + parseFloat(ival3)).toFixed(2);
                $('#table-head-option, #table-footer-option').html('Current');
                $('#switch-1-rating').html('3 A');
                $('#switch-2-rating').html('3 A');
                $('#switch-3-rating').html('3 A');
                $('#table-footer-value').html(`${totalCurrent} A`);
                break;
        }

        if (parseFloat(ival3) > 3) {
            $('.i-val-3').removeClass('i-val-success').addClass('i-val-danger');
        }
        else if(parseFloat(ival3) < 3) {
            $('.i-val-3').removeClass('i-val-danger').addClass('i-val-success');
        }

        totalEnergy = parseFloat(totalEnergy) + parseFloat(((parseFloat(eval1) + parseFloat(eval2) + parseFloat(eval3)) / 1000).toFixed(2));
        totalEnergy = totalEnergy.toFixed(2);
        energy1 = (parseFloat(energy1) + parseFloat(eval1)).toFixed(2);
        energy2 = (parseFloat(energy2) + parseFloat(eval2)).toFixed(2);
        energy3 = (parseFloat(energy3) + parseFloat(eval3)).toFixed(2);
        cost1 = parseFloat(energy1 / 1000).toFixed(2);
        cost2 = parseFloat(energy2 / 1000).toFixed(2);
        cost3 = parseFloat(energy3 / 1000).toFixed(2);

    }, 2000);
});
