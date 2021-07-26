const labels = [
    '0'
];
const data = {
    labels: labels,
    datasets: [{
        label: 'My First dataset',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0],
    }]
};

const config = {
    type: 'line',
    data,
    options: {
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
                    maxTicksLimit: 10,
                    maxRotation: 0,
                    minRotation: 0
                }
            }
        }
    }
};

var myChart = new Chart(
    document.getElementById('chart'),
    config
);

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