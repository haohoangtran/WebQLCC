!function (e) {
    "use strict"
    var t = function () {
        this.$body = e("body")
    }
    t.prototype.createLineChart = function (e, t, a, n) {
        var o = {
            fontName: "Open Sans",
            height: 340,
            curveType: "function",
            fontSize: 14,
            chartArea: {left: "5%", width: "90%", height: 300},
            pointSize: 4,
            tooltip: {textStyle: {fontName: "Open Sans", fontSize: 14}},
            vAxis: {
                title: a,
                titleTextStyle: {fontSize: 14, italic: !1},
                gridlines: {color: "#f5f5f5", count: 10},
                minValue: 0
            },
            legend: {position: "top", alignment: "center", textStyle: {fontSize: 14}},
            lineWidth: 3,
            colors: n
        }, i = google.visualization.arrayToDataTable(t), r = new google.visualization.LineChart(e)
        return r.draw(i, o), r
    }, t.prototype.createAreaChart = function (e, t, a, n) {
        var o = {
            fontName: "Open Sans",
            height: 340,
            curveType: "function",
            fontSize: 14,
            chartArea: {left: "5%", width: "90%", height: 300},
            pointSize: 4,
            tooltip: {textStyle: {fontName: "Open Sans", fontSize: 14}},
            vAxis: {
                title: a,
                titleTextStyle: {fontSize: 14, italic: !1},
                gridarea: {color: "#f5f5f5", count: 10},
                gridlines: {color: "#f5f5f5"},
                minValue: 0
            },
            legend: {position: "top", alignment: "end", textStyle: {fontSize: 14}},
            lineWidth: 2,
            colors: n
        }, i = google.visualization.arrayToDataTable(t), r = new google.visualization.AreaChart(e)
        return r.draw(i, o), r
    }, t.prototype.createColumnChart = function (e, t, a, n) {
        var o = {
            fontName: "Open Sans",
            height: 400,
            fontSize: 13,
            chartArea: {left: "5%", width: "90%", height: 350},
            tooltip: {textStyle: {fontName: "Open Sans", fontSize: 14}},
            vAxis: {
                title: a,
                titleTextStyle: {fontSize: 14, italic: !1},
                gridlines: {color: "#f5f5f5", count: 10},
                minValue: 0
            },
            legend: {position: "top", alignment: "center", textStyle: {fontSize: 13}},
            colors: n
        }, i = google.visualization.arrayToDataTable(t), r = new google.visualization.ColumnChart(e)
        return r.draw(i, o), r
    }, t.prototype.createBarChart = function (e, t, a) {
        var n = {
            fontName: "Open Sans",
            height: 400,
            fontSize: 14,
            chartArea: {left: "5%", width: "90%", height: 350},
            tooltip: {textStyle: {fontName: "Open Sans", fontSize: 14}},
            vAxis: {gridlines: {color: "#f5f5f5", count: 10}, minValue: 0},
            legend: {position: "top", alignment: "center", textStyle: {fontSize: 13}},
            colors: a
        }, o = google.visualization.arrayToDataTable(t), i = new google.visualization.BarChart(e)
        return i.draw(o, n), i
    }, t.prototype.createColumnStackChart = function (e, t, a, n) {
        var o = {
            fontName: "Open Sans",
            height: 400,
            fontSize: 13,
            chartArea: {left: "5%", width: "90%", height: 350},
            isStacked: !0,
            tooltip: {textStyle: {fontName: "Open Sans", fontSize: 14}},
            vAxis: {
                title: a,
                titleTextStyle: {fontSize: 14, italic: !1},
                gridlines: {color: "#f5f5f5", count: 10},
                minValue: 0
            },
            legend: {position: "top", alignment: "center", textStyle: {fontSize: 13}},
            colors: n
        }, i = google.visualization.arrayToDataTable(t), r = new google.visualization.ColumnChart(e)
        return r.draw(i, o), r
    }, t.prototype.createBarStackChart = function (e, t, a) {
        var n = {
            fontName: "Open Sans",
            height: 400,
            fontSize: 13,
            chartArea: {left: "5%", width: "90%", height: 350},
            isStacked: !0,
            tooltip: {textStyle: {fontName: "Open Sans", fontSize: 14}},
            hAxis: {gridlines: {color: "#f5f5f5", count: 10}, minValue: 0},
            legend: {position: "top", alignment: "center", textStyle: {fontSize: 13}},
            colors: a
        }, o = google.visualization.arrayToDataTable(t), i = new google.visualization.BarChart(e)
        return i.draw(o, n), i
    }, t.prototype.createPieChart = function (e, t, a, n, o) {
        var i = {
            fontName: "Open Sans",
            fontSize: 13,
            height: 300,
            width: 500,
            chartArea: {left: 50, width: "90%", height: "90%"},
            colors: a
        }
        n && (i.is3D = !0), o && (i.is3D = !0, i.pieSliceText = "label", i.slices = {2: {offset: .15}, 5: {offset: .1}})
        var r = google.visualization.arrayToDataTable(t), l = new google.visualization.PieChart(e)
        return l.draw(r, i), l
    }, t.prototype.createDonutChart = function (e, t, a) {
        var n = {
            fontName: "Open Sans",
            fontSize: 13,
            height: 300,
            pieHole: .55,
            width: 500,
            chartArea: {left: 50, width: "90%", height: "90%"},
            colors: a
        }, o = google.visualization.arrayToDataTable(t), i = new google.visualization.PieChart(e)
        return i.draw(o, n), i
    }, t.prototype.init = function () {
        var t = this,
            a = [["Year", "Sales", "Expenses"], ["2010", 850, 120], ["2011", 745, 200], ["2012", 852, 180], ["2013", 1e3, 400], ["2014", 1170, 460], ["2015", 660, 1120], ["2016", 1030, 540]]
        t.createLineChart(e("#line-chart")[0], a, "Sales and Expenses", ["#297ef6", "#e52b4c"]), t.createAreaChart(e("#area-chart")[0], a, "Sales and Expenses", ["#297ef6", "#e52b4c"])
        var n = [["Year", "Desktop", "Tablets", "Mobiles"], ["2010", 850, 120, 200], ["2011", 745, 200, 562], ["2012", 852, 180, 521], ["2013", 1e3, 400, 652], ["2014", 1170, 460, 200], ["2015", 660, 1120, 562], ["2016", 1030, 540, 852]]
        t.createColumnChart(e("#column-chart")[0], n, "Sales and Expenses", ["#297ef6", "#e52b4c", "#32c861"])
        var o = [["Year", "Sales", "Expenses"], ["2004", 1e3, 400], ["2005", 1170, 460], ["2006", 660, 1120], ["2007", 1030, 540]]
        t.createBarChart(e("#bar-chart")[0], o, ["#297ef6", "#32c861"])
        var i = [["Genre", "Fantasy & Sci Fi", "Romance", "Mystery/Crime", "General", {role: "annotation"}], ["2000", 20, 30, 35, 40, ""], ["2005", 14, 20, 25, 30, ""], ["2010", 10, 24, 20, 32, ""], ["2015", 15, 25, 30, 35, ""], ["2020", 16, 22, 23, 30, ""], ["2025", 12, 26, 20, 40, ""], ["2030", 28, 19, 29, 30, ""]]
        t.createColumnStackChart(e("#column-stacked-chart")[0], i, "Sales and Expenses", ["#32c861", "#297ef6", "#e52b4c", "#ffa91c"])
        var r = [["Genre", "Fantasy & Sci Fi", "Romance", "Mystery/Crime", "General", {role: "annotation"}], ["2000", 20, 30, 35, 40, ""], ["2005", 14, 20, 25, 30, ""], ["2010", 10, 24, 20, 32, ""], ["2015", 15, 25, 30, 35, ""], ["2020", 16, 22, 23, 30, ""], ["2025", 12, 26, 20, 40, ""], ["2030", 28, 19, 29, 30, ""]]
        t.createBarStackChart(e("#bar-stacked-chart")[0], r, ["#5553ce", "#297ef6", "#e52b4c", "#ffa91c"])
        var l = [["Task", "Hours per Day"], ["Work", 11], ["Eat", 2], ["Commute", 2], ["Watch TV", 2], ["Sleep", 7]]
        t.createPieChart(e("#pie-chart")[0], l, ["#5553ce", "#297ef6", "#e52b4c", "#ffa91c", "#32c861"], !1, !1), t.createDonutChart(e("#donut-chart")[0], l, ["#5553ce", "#297ef6", "#e52b4c", "#ffa91c", "#32c861"]), t.createPieChart(e("#pie-3d-chart")[0], l, ["#5553ce", "#297ef6", "#e52b4c", "#ffa91c", "#32c861"], !0, !1)
        var c = [["Language", "Speakers (in millions)"], ["Assamese", 13], ["Bengali", 83], ["Gujarati", 46], ["Hindi", 90], ["Kannada", 38], ["Malayalam", 33]]
        t.createPieChart(e("#3d-exploded-chart")[0], c, ["#5553ce", "#297ef6", "#e52b4c", "#ffa91c", "#32c861", "#353d4a"], !0, !0), e(window).on("resize", function () {
            t.createLineChart(e("#line-chart")[0], a, "Sales and Expenses", ["#4bd396", "#f5707a"]), t.createAreaChart(e("#area-chart")[0], a, "Sales and Expenses", ["#4bd396", "#f5707a"]), t.createColumnChart(e("#column-chart")[0], n, "Sales and Expenses", ["#4bd396", "#f5707a", "#3ac9d6"]), t.createBarChart(e("#bar-chart")[0], o, ["#4bd396", "#f5707a"]), t.createColumnStackChart(e("#column-stacked-chart")[0], i, "Sales and Expenses", ["#188ae2", "#4bd396", "#f9c851", "#f5707a", "#6b5fb5", "#3ac9d6"]), t.createBarStackChart(e("#bar-stacked-chart")[0], r, ["#188ae2", "#4bd396", "#f9c851", "#f5707a", "#6b5fb5", "#3ac9d6"]), t.createPieChart(e("#pie-chart")[0], l, ["#188ae2", "#4bd396", "#f9c851", "#f5707a", "#6b5fb5"], !1, !1), t.createDonutChart(e("#donut-chart")[0], l, ["#188ae2", "#4bd396", "#f9c851", "#f5707a", "#6b5fb5"]), t.createPieChart(e("#pie-3d-chart")[0], l, ["#188ae2", "#4bd396", "#f9c851", "#f5707a", "#6b5fb5"], !0, !1), t.createPieChart(e("#3d-exploded-chart")[0], c, ["#188ae2", "#4bd396", "#f9c851", "#f5707a", "#6b5fb5"], !0, !0)
        })
    }, e.GoogleChart = new t, e.GoogleChart.Constructor = t
}(window.jQuery), function (e) {
    "use strict"
    google.load("visualization", "1", {packages: ["corechart"]}), google.setOnLoadCallback(function () {
        e.GoogleChart.init()
    })
}(window.jQuery)

