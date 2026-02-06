/* =====================================================
   Windward Marketing Dashboard - Charts Module
   ApexCharts configurations
   ===================================================== */

// Store chart instances for theme updates
const chartInstances = {};

// Common chart options
function getCommonOptions() {
    const colors = getThemeColors();
    const isDark = document.documentElement.dataset.theme === 'dark';
    return {
        chart: {
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            toolbar: { show: false },
            background: 'transparent',
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800
            }
        },
        grid: {
            borderColor: colors.gridLines,
            strokeDashArray: 4
        },
        tooltip: {
            theme: isDark ? 'dark' : 'light',
            style: {
                fontSize: '12px',
                fontFamily: "'Inter', sans-serif"
            }
        },
        dataLabels: {
            style: {
                colors: isDark ? ['#FFFFFF'] : ['#001028']
            }
        }
    };
}

// Executive Funnel Chart (smaller version)
function renderExecutiveFunnelChart() {
    const colors = getThemeColors();
    const data = dashboardData.funnel;

    const options = {
        ...getCommonOptions(),
        series: [{
            name: '2026 YTD',
            data: [data['2026'].leads, data['2026'].mqls, data['2026'].sqls, data['2026'].opportunities]
        }, {
            name: '2025 YTD',
            data: [data['2025'].leads, data['2025'].mqls, data['2025'].sqls, data['2025'].opportunities]
        }],
        chart: {
            type: 'bar',
            height: 280,
            toolbar: { show: false }
        },
        colors: [colors.primary, colors.gray],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '60%',
                borderRadius: 6,
                dataLabels: {
                    position: 'top'
                }
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function(val) {
                return val;
            },
            offsetY: -20,
            style: {
                fontSize: '11px',
                colors: [document.documentElement.dataset.theme === 'dark' ? '#FFFFFF' : '#001028']
            }
        },
        xaxis: {
            categories: ['Leads', 'MQLs', 'SQLs', 'Opps'],
            labels: { style: { colors: colors.text } }
        },
        yaxis: {
            labels: { style: { colors: colors.text } }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            labels: { colors: colors.text }
        }
    };

    if (chartInstances.executiveFunnel) {
        chartInstances.executiveFunnel.destroy();
    }

    chartInstances.executiveFunnel = new ApexCharts(
        document.querySelector('#executiveFunnelChart'),
        options
    );
    chartInstances.executiveFunnel.render();
}

// Full Funnel Comparison Chart
function renderFunnelComparisonChart() {
    const colors = getThemeColors();
    const data = dashboardData.funnel;

    const options = {
        ...getCommonOptions(),
        series: [{
            name: '2026 YTD',
            data: [data['2026'].leads, data['2026'].mqls, data['2026'].sqls, data['2026'].opportunities]
        }, {
            name: '2025 YTD',
            data: [data['2025'].leads, data['2025'].mqls, data['2025'].sqls, data['2025'].opportunities]
        }],
        chart: {
            type: 'bar',
            height: 380,
            toolbar: { show: false }
        },
        colors: [colors.primary, colors.gray],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                borderRadius: 8,
                dataLabels: {
                    position: 'top'
                }
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function(val) {
                return val;
            },
            offsetY: -25,
            style: {
                fontSize: '12px',
                colors: [document.documentElement.dataset.theme === 'dark' ? '#FFFFFF' : '#001028']
            }
        },
        xaxis: {
            categories: ['Leads', 'MQLs', 'SQLs', 'Opportunities'],
            labels: {
                style: {
                    colors: colors.text,
                    fontSize: '13px'
                }
            }
        },
        yaxis: {
            labels: {
                style: { colors: colors.text },
                formatter: function(val) {
                    return Math.round(val);
                }
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'center',
            labels: { colors: colors.text },
            markers: { radius: 12 }
        },
        tooltip: {
            y: {
                formatter: function(val, { seriesIndex, dataPointIndex }) {
                    const year = seriesIndex === 0 ? '2026' : '2025';
                    const stages = ['leads', 'mqls', 'sqls', 'opportunities'];
                    return `${val} ${stages[dataPointIndex]}`;
                }
            }
        }
    };

    if (chartInstances.funnelComparison) {
        chartInstances.funnelComparison.destroy();
    }

    chartInstances.funnelComparison = new ApexCharts(
        document.querySelector('#funnelComparisonChart'),
        options
    );
    chartInstances.funnelComparison.render();
}

// Business Line MQL Chart
function renderBusinessMqlChart() {
    const colors = getThemeColors();
    const bl = dashboardData.businessLines;

    const options = {
        ...getCommonOptions(),
        series: [{
            name: '2026',
            data: [bl.commercial.mqls2026, bl.govROW.mqls2026, bl.govUS.mqls2026]
        }, {
            name: '2025',
            data: [bl.commercial.mqls2025, bl.govROW.mqls2025, bl.govUS.mqls2025]
        }],
        chart: {
            type: 'bar',
            height: 280,
            toolbar: { show: false }
        },
        colors: [colors.primary, colors.gray],
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '60%',
                borderRadius: 6
            }
        },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '12px'
            }
        },
        xaxis: {
            categories: ['Commercial', 'GOV ROW', 'GOV US'],
            labels: { style: { colors: colors.text } }
        },
        yaxis: {
            labels: { style: { colors: colors.text } }
        },
        legend: {
            position: 'top',
            labels: { colors: colors.text }
        }
    };

    if (chartInstances.businessMql) {
        chartInstances.businessMql.destroy();
    }

    chartInstances.businessMql = new ApexCharts(
        document.querySelector('#businessMqlChart'),
        options
    );
    chartInstances.businessMql.render();
}

// Business Line ACV Chart
function renderBusinessAcvChart() {
    const colors = getThemeColors();
    const attr = dashboardData.attribution.byBusinessLine;

    const options = {
        ...getCommonOptions(),
        series: [{
            name: '2026 ($M)',
            data: [attr.government.value2026 / 1000000, attr.commercial.value2026 / 1000000]
        }, {
            name: '2025 ($M)',
            data: [attr.government.value2025 / 1000000, attr.commercial.value2025 / 1000000]
        }],
        chart: {
            type: 'bar',
            height: 280,
            toolbar: { show: false }
        },
        colors: [colors.primary, colors.gray],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                borderRadius: 6
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function(val) {
                return '$' + val.toFixed(2) + 'M';
            },
            style: {
                fontSize: '11px'
            }
        },
        xaxis: {
            categories: ['Government', 'Commercial'],
            labels: { style: { colors: colors.text } }
        },
        yaxis: {
            labels: {
                style: { colors: colors.text },
                formatter: function(val) {
                    return '$' + val.toFixed(1) + 'M';
                }
            }
        },
        legend: {
            position: 'top',
            labels: { colors: colors.text }
        }
    };

    if (chartInstances.businessAcv) {
        chartInstances.businessAcv.destroy();
    }

    chartInstances.businessAcv = new ApexCharts(
        document.querySelector('#businessAcvChart'),
        options
    );
    chartInstances.businessAcv.render();
}

// Channel Performance Chart
function renderChannelPerformanceChart() {
    const colors = getThemeColors();
    const channels = dashboardData.channelPerformance.commercial;

    const options = {
        ...getCommonOptions(),
        series: [{
            name: 'Leads',
            data: channels.map(c => c.leads)
        }, {
            name: 'MQLs',
            data: channels.map(c => c.mqls)
        }, {
            name: 'Opportunities',
            data: channels.map(c => c.opps)
        }],
        chart: {
            type: 'bar',
            height: 380,
            toolbar: { show: false },
            stacked: false
        },
        colors: [colors.gray, colors.primary, colors.success],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '70%',
                borderRadius: 4
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: channels.map(c => c.channel),
            labels: {
                style: { colors: colors.text },
                rotate: -45,
                rotateAlways: false
            }
        },
        yaxis: {
            labels: { style: { colors: colors.text } }
        },
        legend: {
            position: 'top',
            labels: { colors: colors.text }
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: function(val) {
                    return val;
                }
            }
        }
    };

    if (chartInstances.channelPerformance) {
        chartInstances.channelPerformance.destroy();
    }

    chartInstances.channelPerformance = new ApexCharts(
        document.querySelector('#channelPerformanceChart'),
        options
    );
    chartInstances.channelPerformance.render();
}

// Budget 2025 Donut Chart
function renderBudget2025Chart() {
    const colors = getThemeColors();
    const data = dashboardData.paidMedia.budgetMix2025;

    const options = {
        ...getCommonOptions(),
        series: [data.performance, data.other, data.remarketing, data.brand],
        chart: {
            type: 'donut',
            height: 280
        },
        labels: ['Performance', 'Other', 'Remarketing', 'Brand'],
        colors: [colors.danger, colors.gray, colors.success, colors.primary],
        plotOptions: {
            pie: {
                donut: {
                    size: '65%',
                    labels: {
                        show: true,
                        name: { show: true, color: colors.text },
                        value: {
                            show: true,
                            color: colors.text,
                            formatter: function(val) {
                                return val + '%';
                            }
                        },
                        total: {
                            show: true,
                            label: 'Total',
                            color: colors.text,
                            formatter: function() {
                                return '100%';
                            }
                        }
                    }
                }
            }
        },
        legend: {
            position: 'bottom',
            labels: { colors: colors.text }
        },
        dataLabels: {
            enabled: false
        }
    };

    if (chartInstances.budget2025) {
        chartInstances.budget2025.destroy();
    }

    chartInstances.budget2025 = new ApexCharts(
        document.querySelector('#budget2025Chart'),
        options
    );
    chartInstances.budget2025.render();
}

// Budget 2026 Donut Chart
function renderBudget2026Chart() {
    const colors = getThemeColors();
    const data = dashboardData.paidMedia.budgetMix2026;

    const options = {
        ...getCommonOptions(),
        series: [data.brand, data.performance, data.remarketing, data.other],
        chart: {
            type: 'donut',
            height: 280
        },
        labels: ['Brand', 'Performance', 'Remarketing', 'Other'],
        colors: [colors.primary, colors.danger, colors.success, colors.gray],
        plotOptions: {
            pie: {
                donut: {
                    size: '65%',
                    labels: {
                        show: true,
                        name: { show: true, color: colors.text },
                        value: {
                            show: true,
                            color: colors.text,
                            formatter: function(val) {
                                return val + '%';
                            }
                        },
                        total: {
                            show: true,
                            label: 'Total',
                            color: colors.text,
                            formatter: function() {
                                return '100%';
                            }
                        }
                    }
                }
            }
        },
        legend: {
            position: 'bottom',
            labels: { colors: colors.text }
        },
        dataLabels: {
            enabled: false
        }
    };

    if (chartInstances.budget2026) {
        chartInstances.budget2026.destroy();
    }

    chartInstances.budget2026 = new ApexCharts(
        document.querySelector('#budget2026Chart'),
        options
    );
    chartInstances.budget2026.render();
}

// Cost per MQL Chart
function renderCostPerMqlChart() {
    const colors = getThemeColors();
    const eff = dashboardData.paidMedia.campaignEfficiency;

    const options = {
        ...getCommonOptions(),
        series: [{
            name: 'Cost per MQL ($)',
            data: [eff.remarketing.costPerMql, eff.performance.costPerMql]
        }],
        chart: {
            type: 'bar',
            height: 280,
            toolbar: { show: false }
        },
        colors: [colors.success, colors.danger],
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '50%',
                borderRadius: 6,
                distributed: true
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function(val) {
                return '$' + val;
            },
            style: {
                fontSize: '14px',
                fontWeight: 700
            }
        },
        xaxis: {
            categories: ['Remarketing', 'Performance'],
            labels: {
                style: { colors: colors.text },
                formatter: function(val) {
                    return '$' + val;
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: colors.text,
                    fontSize: '13px'
                }
            }
        },
        legend: {
            show: false
        },
        tooltip: {
            y: {
                formatter: function(val) {
                    return '$' + val + ' per MQL';
                }
            }
        }
    };

    if (chartInstances.costPerMql) {
        chartInstances.costPerMql.destroy();
    }

    chartInstances.costPerMql = new ApexCharts(
        document.querySelector('#costPerMqlChart'),
        options
    );
    chartInstances.costPerMql.render();
}

// Pipeline by Stage Chart (Horizontal Bar)
function renderPipelineStageChart() {
    const colors = getThemeColors();
    const data = dashboardData.revenue.byStage;

    // Reverse order so highest probability is at top
    const reversedData = [...data].reverse();

    const options = {
        ...getCommonOptions(),
        series: [{
            name: 'Pipeline ACV',
            data: reversedData.map(d => d.acv)
        }],
        chart: {
            type: 'bar',
            height: 380,
            toolbar: { show: false }
        },
        colors: [colors.primary],
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '60%',
                borderRadius: 6,
                distributed: false
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function(val) {
                if (val >= 1000000) {
                    return '$' + (val / 1000000).toFixed(2) + 'M';
                } else if (val >= 1000) {
                    return '$' + (val / 1000).toFixed(0) + 'K';
                }
                return '$' + val;
            },
            style: {
                fontSize: '12px',
                fontWeight: 600
            }
        },
        xaxis: {
            categories: reversedData.map(d => d.stage + ' (' + d.probability + '%)'),
            labels: {
                style: { colors: colors.text },
                formatter: function(val) {
                    if (val >= 1000000) {
                        return '$' + (val / 1000000).toFixed(1) + 'M';
                    } else if (val >= 1000) {
                        return '$' + (val / 1000).toFixed(0) + 'K';
                    }
                    return '$' + val;
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: colors.text,
                    fontSize: '12px'
                }
            }
        },
        tooltip: {
            y: {
                formatter: function(val, { dataPointIndex }) {
                    const stage = reversedData[dataPointIndex];
                    return '$' + (val / 1000000).toFixed(2) + 'M (' + stage.opps + ' opps)';
                }
            }
        },
        grid: {
            borderColor: colors.gridLines,
            xaxis: { lines: { show: true } },
            yaxis: { lines: { show: false } }
        }
    };

    if (chartInstances.pipelineStage) {
        chartInstances.pipelineStage.destroy();
    }

    chartInstances.pipelineStage = new ApexCharts(
        document.querySelector('#pipelineStageChart'),
        options
    );
    chartInstances.pipelineStage.render();
}

// Opportunity Type Chart (Donut)
function renderOppTypeChart() {
    const colors = getThemeColors();
    const data = dashboardData.revenue.byOppType;

    const options = {
        ...getCommonOptions(),
        series: data.map(d => d.acv),
        chart: {
            type: 'donut',
            height: 300
        },
        labels: data.map(d => d.type),
        colors: [colors.primary, colors.success, colors.warning, colors.info],
        plotOptions: {
            pie: {
                donut: {
                    size: '65%',
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            color: colors.text,
                            fontSize: '14px'
                        },
                        value: {
                            show: true,
                            color: colors.text,
                            fontSize: '16px',
                            fontWeight: 600,
                            formatter: function(val) {
                                if (val >= 1000000) {
                                    return '$' + (val / 1000000).toFixed(1) + 'M';
                                } else if (val >= 1000) {
                                    return '$' + (val / 1000).toFixed(0) + 'K';
                                }
                                return '$' + val;
                            }
                        },
                        total: {
                            show: true,
                            label: 'Total',
                            color: colors.text,
                            formatter: function(w) {
                                const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                                return '$' + (total / 1000000).toFixed(1) + 'M';
                            }
                        }
                    }
                }
            }
        },
        legend: {
            position: 'bottom',
            labels: { colors: colors.text },
            formatter: function(seriesName, opts) {
                const idx = opts.seriesIndex;
                const oppCount = data[idx].opps;
                return seriesName + ' (' + oppCount + ')';
            }
        },
        dataLabels: {
            enabled: false
        },
        tooltip: {
            y: {
                formatter: function(val, { seriesIndex }) {
                    const item = data[seriesIndex];
                    return '$' + (val / 1000000).toFixed(2) + 'M (' + item.opps + ' opps)';
                }
            }
        }
    };

    if (chartInstances.oppType) {
        chartInstances.oppType.destroy();
    }

    chartInstances.oppType = new ApexCharts(
        document.querySelector('#oppTypeChart'),
        options
    );
    chartInstances.oppType.render();
}

// Initialize all charts
function initializeCharts() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderAllCharts);
    } else {
        renderAllCharts();
    }
}

function renderAllCharts() {
    // Revenue section charts
    if (document.querySelector('#pipelineStageChart')) {
        renderPipelineStageChart();
    }
    if (document.querySelector('#oppTypeChart')) {
        renderOppTypeChart();
    }

    // Executive section chart
    if (document.querySelector('#executiveFunnelChart')) {
        renderExecutiveFunnelChart();
    }

    // Funnel section chart
    if (document.querySelector('#funnelComparisonChart')) {
        renderFunnelComparisonChart();
    }

    // Business section charts
    if (document.querySelector('#businessMqlChart')) {
        renderBusinessMqlChart();
    }
    if (document.querySelector('#businessAcvChart')) {
        renderBusinessAcvChart();
    }

    // Channel section chart
    if (document.querySelector('#channelPerformanceChart')) {
        renderChannelPerformanceChart();
    }

    // Paid media section charts
    if (document.querySelector('#budget2025Chart')) {
        renderBudget2025Chart();
    }
    if (document.querySelector('#budget2026Chart')) {
        renderBudget2026Chart();
    }
    if (document.querySelector('#costPerMqlChart')) {
        renderCostPerMqlChart();
    }
}

// Update all charts for theme change
function updateChartsTheme() {
    renderAllCharts();
}

// Initialize charts when script loads
initializeCharts();

// Export for use in other modules
window.chartInstances = chartInstances;
window.updateChartsTheme = updateChartsTheme;
window.renderAllCharts = renderAllCharts;
