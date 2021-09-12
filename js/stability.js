var maxIndex = 0;
var mindex = 0;
var dindex = 0;
var index = 100;

for (const [key, value] of Object.entries(a)) {
    if (key == "curfew") continue;
    maxIndex += value[4];
}

function getIndex() {
    var tIndex = 0;
    for (const [key, value] of Object.entries(a)) {
        if (value[0] > 0) {
            if (day - value[0] < 7) {
                tIndex += value[4] * (day - value[0] + 1) / 7;
            } else {
                tIndex += value[4];
            }
        } else if (day + value[0] < 7) {
            tIndex += value[4] * (7 - (day + value[0] + 1)) / 7;
        }
    }
    mindex = tIndex / maxIndex * 100;
    dindex = -100 / (s.Ds[s.Ds.length - 1] / 50 + 1) + 100;

    s.Xs.push(mindex);
}