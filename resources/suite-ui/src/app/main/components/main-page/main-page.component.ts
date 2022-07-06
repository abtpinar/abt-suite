import { LanguageService } from './../../../i18n/services/language.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthService } from '../../../auth/services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CLsService } from 'src/app/cls/services/cls.service';
import { formatDecimal } from 'src/app/common/components/formats';

// To use jquery function in component
declare var $: any;
declare var Chart: any;

/**
 * This is the Main page, where the user is taken initially when visiting the root of the application.
 */
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.sass']
})
export class MainPageComponent implements OnInit, OnDestroy {

  overview: any;

  subscriptions$: Subscription[] = [];

  formatDecimal = formatDecimal;

  constructor(
    private router: Router,
    private authService: AuthService,
    private permissionsService: NgxPermissionsService,
    private languageService: LanguageService,
    private clsService: CLsService
  ) { }

  ngOnInit() {
    const sub$ = this.clsService.getOverview()
      // .subscribe((response: any) => console.log(response.response.data));
      .subscribe((response: any) => this.overview = <any>(response.response.data));
      this.subscriptions$.push(sub$);

      /*$(document).ready(() => {
        'use strict';
        var ThemeCharts = function () { var a, e = $('[data-toggle="chart"]'), t = { base: "Cerebri Sans" }, o = { gray: { 300: "#E3EBF6", 600: "#95AAC9", 700: "#6E84A3", 800: "#152E4D", 900: "#283E59" }, primary: { 100: "#D2DDEC", 300: "#A6C5F7", 700: "#2C7BE5" }, black: "#12263F", white: "#FFFFFF", transparent: "transparent" }, r = "rgb(249, 251, 253)" == getComputedStyle(document.body).backgroundColor ? "light" : "dark"; function l(a, e) { for (var t in e) "object" != typeof e[t] ? a[t] = e[t] : l(a[t], e[t]) } function n(a) { var e = a.data("add"), t = $(a.data("target")).data("chart"); a.is(":checked") ? function a(e, t) { for (var o in t) Array.isArray(t[o]) ? t[o].forEach(function (a) { e[o].push(a) }) : a(e[o], t[o]) }(t, e) : function a(e, t) { for (var o in t) Array.isArray(t[o]) ? t[o].forEach(function (a) { e[o].pop() }) : a(e[o], t[o]) }(t, e), t.update() } function s(a) { var e = a.data("update"), t = $(a.data("target")).data("chart"); l(t, e), function (a, e) { if (void 0 !== a.data("prefix") || void 0 !== a.data("prefix")) { var l = a.data("prefix") ? a.data("prefix") : "", n = a.data("suffix") ? a.data("suffix") : ""; e.options.scales.yAxes[0].ticks.callback = function (a) { if (!(a % 10)) return l + a + n }, e.options.tooltips.callbacks.label = function (a, e) { var t = e.datasets[a.datasetIndex].label || "", o = a.yLabel, r = ""; return 1 < e.datasets.length && (r += '<span class="popover-body-label mr-auto">' + t + "</span>"), r += '<span class="popover-body-value">' + l + o + n + "</span>" } } }(a, t), t.update() } return window.Chart && l(Chart, (a = { defaults: { global: { responsive: !0, maintainAspectRatio: !1, defaultColor: "dark" == r ? o.gray[700] : o.gray[600], defaultFontColor: "dark" == r ? o.gray[700] : o.gray[600], defaultFontFamily: t.base, defaultFontSize: 13, layout: { padding: 0 }, legend: { display: !1, position: "bottom", labels: { usePointStyle: !0, padding: 16 } }, elements: { point: { radius: 0, backgroundColor: o.primary[700] }, line: { tension: .4, borderWidth: 3, borderColor: o.primary[700], backgroundColor: o.transparent, borderCapStyle: "rounded" }, rectangle: { backgroundColor: o.primary[700] }, arc: { backgroundColor: o.primary[700], borderColor: "dark" == r ? o.gray[800] : o.white, borderWidth: 4 } }, tooltips: { enabled: !1, mode: "index", intersect: !1, custom: function (r) { var a = $("#chart-tooltip"); if (a.length || (a = $('<div id="chart-tooltip" class="popover bs-popover-top" role="tooltip"></div>'), $("body").append(a)), 0 !== r.opacity) { if (r.body) { var e = r.title || [], l = r.body.map(function (a) { return a.lines }), n = ""; n += '<div class="arrow"></div>', e.forEach(function (a) { n += '<h3 class="popover-header text-center">' + a + "</h3>" }), l.forEach(function (a, e) { var t = '<span class="popover-body-indicator" style="background-color: ' + r.labelColors[e].backgroundColor + '"></span>', o = 1 < l.length ? "justify-content-left" : "justify-content-center"; n += '<div class="popover-body d-flex align-items-center ' + o + '">' + t + a + "</div>" }), a.html(n) } var t = $(this._chart.canvas), o = (t.outerWidth(), t.outerHeight(), t.offset().top), s = t.offset().left, i = a.outerWidth(), c = a.outerHeight(), d = o + r.caretY - c - 16, u = s + r.caretX - i / 2; a.css({ top: d + "px", left: u + "px", display: "block" }) } else a.css("display", "none") }, callbacks: { label: function (a, e) { var t = e.datasets[a.datasetIndex].label || "", o = a.yLabel, r = ""; return 1 < e.datasets.length && (r += '<span class="popover-body-label mr-auto">' + t + "</span>"), r += '<span class="popover-body-value">' + o + "</span>" } } } }, 
        doughnut: { cutoutPercentage: 83, tooltips: { callbacks: { title: function (a, e) { return e.labels2[a[0].index] }, label: function (a, e) { var t = ""; return t += '<span class="popover-body-value">' + e.datasets[0].data[a.index] + "</span>" } } }, legendCallback: function (a) { var o = a.data, r = ""; return o.labels.forEach(function (a, e) { var t = o.datasets[0].backgroundColor[e]; r += '<span class="chart-legend-item">', r += '<i class="chart-legend-indicator" style="background-color: ' + t + '"></i>', r += a, r += "</span>" }), r } } } }, Chart.scaleService.updateScaleDefaults("linear", { gridLines: { borderDash: [2], borderDashOffset: [2], color: "dark" == r ? o.gray[900] : o.gray[300], drawBorder: !1, drawTicks: !1, lineWidth: 0, zeroLineWidth: 0, zeroLineColor: "dark" == r ? o.gray[900] : o.gray[300], zeroLineBorderDash: [2], zeroLineBorderDashOffset: [2] }, ticks: { beginAtZero: !0, padding: 10, callback: function (a) { if (!(a % 10)) return a } } }), Chart.scaleService.updateScaleDefaults("category", { gridLines: { drawBorder: !1, drawOnChartArea: !1, drawTicks: !1 }, ticks: { padding: 20 }, maxBarThickness: 10 }), a)), e.on({ change: function () { var a = $(this); a.is("[data-add]") && n(a) }, click: function () { var a = $(this); a.is("[data-update]") && s(a) } }), { colors: o, fonts: t, colorScheme: r } }(), 
        Header = function () { var a, e, t = $("#headerChart"); t.length && (a = t, e = new Chart(a, { type: "line", options: { scales: { yAxes: [{ gridLines: { color: ThemeCharts.colors.gray[900], zeroLineColor: ThemeCharts.colors.gray[900] }, ticks: { callback: function (a) { if (!(a % 10)) return "$" + a + "k" } } }] }, tooltips: { callbacks: { label: function (a, e) { var t = e.datasets[a.datasetIndex].label || "", o = a.yLabel, r = ""; return 1 < e.datasets.length && (r += '<span class="popover-body-label mr-auto">' + t + "</span>"), r += '<span class="popover-body-value">$' + o + "k</span>" } } } }, data: { labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], datasets: [{ label: "Performance", data: [0, 10, 5, 15, 10, 20, 15, 25, 20, 30, 25, 40] }] } }), a.data("chart", e)) }(), 
        // Performance = function () { var a, e, t = $("#performanceChart"); t.length && (a = t, e = new Chart(a, { type: "line", options: { scales: { yAxes: [{ ticks: { callback: function (a) { if (!(a % 10)) return "$" + a + "k" } } }] }, tooltips: { callbacks: { label: function (a, e) { var t = e.datasets[a.datasetIndex].label || "", o = a.yLabel, r = ""; return 1 < e.datasets.length && (r += '<span class="popover-body-label mr-auto">' + t + "</span>"), r += '<span class="popover-body-value">$' + o + "k</span>" } } } }, data: { labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], datasets: [{ label: "Performance", data: [0, 10, 5, 15, 10, 20, 15, 25, 20, 30, 25, 40] }] } }), a.data("chart", e)) }(), 
        // PerformanceAlias = function () { var a, e, t = $("#performanceChartAlias"); t.length && (a = t, e = new Chart(a, { type: "line", options: { scales: { yAxes: [{ ticks: { callback: function (a) { if (!(a % 10)) return "$" + a + "k" } } }] }, tooltips: { callbacks: { label: function (a, e) { var t = e.datasets[a.datasetIndex].label || "", o = a.yLabel, r = ""; return 1 < e.datasets.length && (r += '<span class="popover-body-label mr-auto">' + t + "</span>"), r += '<span class="popover-body-value">$' + o + "k</span>" } } } }, data: { labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], datasets: [{ label: "Performance", data: [0, 10, 5, 15, 10, 20, 15, 25, 20, 30, 25, 40] }] } }), a.data("chart", e)) }(), 
        Orders = function () { var a, e, t = $("#ordersChart"), o = $('[name="ordersSelect"]'); t.length && (a = t, e = new Chart(a, { type: "bar", options: { scales: { yAxes: [{ ticks: { callback: function (a) { if (!(a % 10)) return "$" + a + "k" } } }] }, tooltips: { callbacks: { title: function (a, e) { return e.titles[a[0].index] }, label: function (a, e) { var t = e.datasets[a.datasetIndex].label || "", o = a.yLabel, r = ""; return 1 < e.datasets.length && (r += '<span class="popover-body-label mr-auto">' + t + "</span>"), r += '<span class="popover-body-value">$' + o + "k</span>" } } } }, data: { labels: ["40.ANIV", "CON.CAMP", "FRANC.B", "40.ANIV", "CON.CAMP", "FRANC.B", "CON.CAMP", "FRANC.B", "40.ANIV", "CON.CAMP", "FRANC.B", "CON.CAMP", "FRANC.B", "40.ANIV", "CON.CAMP", "FRANC.B"], titles: ["40.ANIV", "CON.CAMP", "FRANC.B", "40.ANIV", "CON.CAMP", "FRANC.B", "CON.CAMP", "FRANC.B", "40.ANIV", "CON.CAMP", "FRANC.B", "CON.CAMP", "FRANC.B", "40.ANIV", "CON.CAMP", "FRANC.B"], datasets: [{ label: "Plan", data: [25, 20, 30, 22, 17, 10, 18, 26, 28, 26, 20, 30, 22, 17, 10, 18] }] } }), a.data("chart", e)), o.on("change", function () { var a; "ordersSelectAll" == (a = $(this)).attr("id") && (a.is(":checked") ? o.prop("checked", !0) : o.prop("checked", !1)) }) }(), 
        // OrdersAlias = function () { var a, e, t = $("#ordersChartAlias"); t.length && (a = t, e = new Chart(a, { type: "bar", options: { scales: { yAxes: [{ ticks: { callback: function (a) { if (!(a % 10)) return "$" + a + "k" } } }] }, tooltips: { callbacks: { label: function (a, e) { var t = e.datasets[a.datasetIndex].label || "", o = a.yLabel, r = ""; return 1 < e.datasets.length && (r += '<span class="popover-body-label mr-auto">' + t + "</span>"), r += '<span class="popover-body-value">$' + o + "k</span>" } } } }, data: { labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], datasets: [{ label: "Sales", data: [25, 20, 30, 22, 17, 10, 18, 26, 28, 26, 20, 32] }] } }), a.data("chart", e)) }(), 
        Devices = function () { var a, e, t, o, r, l = $("#devicesChart"); l.length && (o = l, r = new Chart(o, { type: "doughnut", options: { tooltips: { callbacks: { title: function (a, e) { return e.labels[a[0].index] }, label: function (a, e) { var t = ""; return t += '<span class="popover-body-value">' + e.datasets[0].data[a.index] + "%</span>" } } } }, data: { labels: ["Desktop", "Tablet", "Mobile"], datasets: [{ data: [60, 25, 15], backgroundColor: [ThemeCharts.colors.primary[700], ThemeCharts.colors.primary[300], ThemeCharts.colors.primary[100]], hoverBorderColor: "dark" == ThemeCharts.colorScheme ? ThemeCharts.colors.gray[800] : ThemeCharts.colors.white }] } }), o.data("chart", r), e = (a = l).data("chart").generateLegend(), t = a.data("target"), $(t).html(e)) }() 
        // WeeklyHours = function () { var a, e, t = $("#weeklyHoursChart"); t.length && (a = t, e = new Chart(a, { type: "bar", options: { scales: { yAxes: [{ ticks: { callback: function (a) { if (!(a % 10)) return a + "hrs" } } }] }, tooltips: { callbacks: { label: function (a, e) { var t = e.datasets[a.datasetIndex].label || "", o = a.yLabel, r = ""; return 1 < e.datasets.length && (r += '<span class="popover-body-label mr-auto">' + t + "</span>"), r += '<span class="popover-body-value">' + o + "hrs</span>" } } } }, data: { labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], datasets: [{ data: [21, 12, 28, 15, 5, 12, 17, 2] }] } }), a.data("chart", e)) }();
      });*/
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub$ => sub$.unsubscribe());
  }

  isSuperAdmin() {
    const permissions = this.permissionsService.getPermissions();
    if ('ADMINISTRATOR' in permissions) {
      return true;
    }
    return false;
  }

  get amount() {
    if (this.overview)
      return this.formatDecimal(this.overview.amount, 2);
    return '0.00';
  }

  get payment() {
    if (this.overview)
      return this.formatDecimal(this.overview.payment, 2);
    return '0.00';
  }

  get percent() {
    if (this.overview) {
      const percent = this.overview.payment * 100 / this.overview.amount;
      return this.formatDecimal(percent, 2) + '%';
    }
    return '0.00%'
  }

  get farmers() {
    if (this.overview)
      return this.overview.farmers;
    return '0';
  }

  get units() {
    if (this.overview)
      return this.overview.units;
    return [];
  }

  getUnitStatus(unit) {
    let className = '';
    let statusName = '';
    if (!unit.result || unit.result == 0) {
      className = 'warning';
      statusName = 'Pendiente';
    }
    if (unit.result > 0) {
      className = 'info';
      statusName = 'En Proceso';
    }
    if (unit.result >= 100) {
      className = 'success';
      statusName = 'Terminado';
    }
    return `<span class="status mr-1 text-${className}">●</span> ${statusName}`;
  }

}
