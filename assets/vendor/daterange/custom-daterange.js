// Daterange
var start = moment().subtract(29, 'days');
var end = moment();

function cb(start, end) {
    $('#reportrange span').html(start.format('YYYY年M月D日') + ' - ' + end.format('YYYY年M月D日'));
    GetDashboard(start, end)
}

$('#reportrange').daterangepicker({
    opens: 'left',
    startDate: start,
    endDate: end,
    ranges: {
        '最近一月统计': [moment().subtract(29, 'days'), moment()],
        '今天销售统计': [moment(), moment()],
        '最近七天统计': [moment().subtract(6, 'days'), moment()],
        '昨天销售统计': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        '上月销售统计': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    },
    locale: {
        applyLabel: '确定',
        cancelLabel: '取消',
        fromLabel: '起始时间',
        toLabel: '结束时间',
        customRangeLabel: '手动选择',
        daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
            '七月', '八月', '九月', '十月', '十一月', '十二月'
        ],
        firstDay: 1,
        format: 'YYYY-MM-DD', //控件中from和to 显示的日期格式
    }
}, cb);
