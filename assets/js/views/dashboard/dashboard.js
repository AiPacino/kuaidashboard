function GetDashboard(start, end) {
    Ajax({
        url: ApiHost + '/api/v1/dashboard',
        type: "POST",
        data: {
            'start': start,
            'end': end,
        },
        success: function (res) {
            ViewDashboard(res)
        },
        error: function (res) {
            console.log(res.error)
        }
    });
}

function GetPageAnalysis(start, end, link) {
    let id = GetPageIdFromUrl(/pages\/([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})/i, link);
    if (id) {
        Ajax({
            url: ApiHost + '/api/v1/analytics/pages/' + id,
            type: "POST",
            data: {
                'start': start,
                'end': end,
            },
            success: function (res) {
                console.log("统计信息")
                console.log(res)
                ViewDashboard(res)
            },
            error: function (res) {
                console.log(res.error)
            }
    });}
}

function ViewCheckOut(res) {
    ReplaceValue('.blog-title', /{title}/ig, res.response.title)
    ReplaceValue('.price', /{price}/ig, res.response.price)
}

function ViewDashboard(res) {
    res.response.visitors = (res.response.visitors == null) ? "0" : res.response.visitors;
    res.response.orders = (res.response.orders == null) ? "0" : res.response.orders;
    res.response.deals = (res.response.deals == null) ? "0" : res.response.deals;
    res.response.income = (res.response.income == null) ? "0" : res.response.income;

    SetValue('visitors_total', "value", res.response.visitors);
    SetValue('orders_total', "value", res.response.orders);
    SetValue('deals_total', "value", res.response.deals);
    SetValue('income_total', "value", res.response.income);

    if (res.response.daily_income.key != null) {
        let xaxis = {};
        let series = [];
        xaxis = {
            type: 'datetime',
            categories: res.response.daily_income.key,
            labels: {
                formatter: function (val) {
                    return moment(val).format("M月DD日");
                }
            }
        };

        series = {
            name: "人民币:",
            data: res.response.daily_income.value,
            labels: {
                formatter: function (val) {
                    return val;
                }
            }
        };

        ApexCharts.exec('income', "updateOptions", {
            xaxis: xaxis
        });

        ApexCharts.exec('income', "updateSeries", [
            series
        ]);
    }

    if (res.response.daily_deals.key != null) {
        let xaxis = {};
        let series = [];
        xaxis = {
            type: 'datetime',
            categories: res.response.daily_deals.key,
            labels: {
                formatter: function (val) {
                    return moment(val).format("M月DD日");
                }
            }
        };

        series = {
            name: "人民币:",
            data: res.response.daily_deals.value,
            labels: {
                formatter: function (val) {
                    return val;
                }
            }
        };

        ApexCharts.exec('deals', "updateOptions", {
            xaxis: xaxis
        });

        ApexCharts.exec('deals', "updateSeries", [
            series
        ]);
    }

    if (res.response.daily_visitor.key != null) {
        let xaxis = {};
        let series = [];
        xaxis = {
            type: 'datetime',
            categories: res.response.daily_visitor.key,
            labels: {
                formatter: function (val) {
                    return moment(val).format("M月DD日");
                }
            }
        };

        series = {
            name: "访客人数:",
            data: res.response.daily_visitor.value,
            labels: {
                formatter: function (val) {
                    return val;
                }
            }
        };

        ApexCharts.exec('visitors', "updateOptions", {
            xaxis: xaxis
        });

        ApexCharts.exec('visitors', "updateSeries", [
            series
        ]);
    }
}
