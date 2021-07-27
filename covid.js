function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}

const options = {
    maintainAspectRatio: false,
    plugins: {
        legend: false,
        tooltip: false,
    },
    animation: {
        duration: 0
    },
    elements: {
        point: {
            radius: 0
        },
        line: {
            tension: .5
        }
    },
    scales: {
        y: {
            type: 'linear',
            grace: '0%'
        },
        x: {
            ticks: {
                autoSkip: true,
                maxTicksLimit: 8,
                maxRotation: 0,
                minRotation: 0
            }
        }
    }
}

var testctx = document.getElementById("testChart").getContext('2d');
var testData = {
    datasets: [{
        data: [0],
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)'
    }],
    labels: ['0']
};
var testChart = new Chart(testctx, {
    type: 'line',
    data: testData,
    options: options
});

var hospctx = document.getElementById("hospChart").getContext('2d');
var hospData = {
    datasets: [{
        data: [0],
        backgroundColor: 'rgb(85, 145, 242)',
        borderColor: 'rgb(85, 145, 242)'
    }],
    labels: ['0']
};
var hospChart = new Chart(hospctx, {
    type: 'line',
    data: hospData,
    options: options
});

var deadctx = document.getElementById("deadChart").getContext('2d');
var deadData = {
    datasets: [{
        data: [0],
        backgroundColor: 'rgb(255, 203, 99)',
        borderColor: 'rgb(255, 203, 99)'
    }],
    labels: ['0']
};
var deadChart = new Chart(deadctx, {
    type: 'line',
    data: deadData,
    options: options
});