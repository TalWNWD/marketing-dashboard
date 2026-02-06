/* =====================================================
   Windward Marketing Dashboard - Data Module
   Data as of February 5, 2026
   Generated with Claude Code
   ===================================================== */

const dashboardData = {
    metadata: {
        lastUpdated: "2026-02-05",
        periodStart: "2026-01-01",
        periodEnd: "2026-02-05",
        generatedBy: "Claude Code",
        dataSource: "BigQuery WNWD Dataset"
    },

    targets: {
        mqlToSqlConversion: 25,      // Commercial target: >= 25%
        marketingROI: 5,              // Target: > 5x
        totalOppsACVPercent: 35,      // Target: 35%
        abmQuarterlyEngagement: 15    // Target: 15%
    },

    executiveScorecard: {
        mqlToSqlConversion: {
            value: 38,
            numerator: 35,
            denominator: 92,
            target: 25,
            status: "exceeding",
            period: "YTD 2026"
        },
        attributedPipeline: {
            value: 5360000,
            formatted: "$5.36M",
            previousYear: 3100000,
            yoyChange: 73,
            status: "strong"
        },
        mqlGrowth: {
            value: 109,
            current: 92,
            previous: 44,
            status: "exceeding"
        },
        opportunitiesCreated: {
            value: 14,
            previousYear: 15,
            yoyChange: -7,
            status: "watch"
        }
    },

    funnel: {
        "2026": {
            leads: 420,
            mqls: 114,
            sqls: 43,
            opportunities: 14,
            closedWon: 2
        },
        "2025": {
            leads: 231,
            mqls: 53,
            sqls: 18,
            opportunities: 15,
            closedWon: 1
        },
        yoyChanges: {
            leads: 82,
            mqls: 115,
            sqls: 139,
            opportunities: -7
        }
    },

    conversionRates: {
        commercial: {
            leadToMql: { rate: 33, numerator: 92, denominator: 281 },
            mqlToSql: { rate: 38, numerator: 35, denominator: 92, target: 25 },
            sqlToOpp: { rate: 34, numerator: 12, denominator: 35 }
        }
    },

    businessLines: {
        commercial: {
            name: "Commercial",
            mqls2026: 92,
            mqls2025: 44,
            yoyChange: 109,
            sqls: 35,
            opps: 12,
            pipelineACV: 309000,
            pipelineACVFormatted: "$309K",
            avgDealSize: 25750,
            status: "strong",
            insight: "Strong across all metrics. Conversion above target."
        },
        govROW: {
            name: "GOV ROW",
            mqls2026: 12,
            mqls2025: 6,
            yoyChange: 100,
            sqls: 7,
            opps: 2,
            pipelineACV: 192000,
            pipelineACVFormatted: "$192K",
            avgDealSize: 96000,
            status: "watch",
            insight: "Volume up, pipeline building. Long sales cycle expected."
        },
        govUS: {
            name: "GOV US",
            mqls2026: 10,
            mqls2025: 3,
            yoyChange: 233,
            sqls: 1,
            opps: 0,
            pipelineACV: 0,
            pipelineACVFormatted: "-",
            status: "action",
            insight: "Zero opps despite strong MQL growth. Review qualification."
        }
    },

    attribution: {
        total2026: 5360000,
        total2025: 3100000,
        yoyChange: 73,
        byBusinessLine: {
            government: {
                value2026: 4620000,
                formatted2026: "$4.62M",
                value2025: 2430000,
                yoyChange: 90,
                percentOfTotal: 86
            },
            commercial: {
                value2026: 739000,
                formatted2026: "$739K",
                value2025: 671000,
                yoyChange: 10,
                percentOfTotal: 14
            }
        }
    },

    paidMedia: {
        budgetMix2025: {
            performance: 60,
            other: 17,
            remarketing: 12,
            brand: 11
        },
        budgetMix2026: {
            brand: 50,
            performance: 32,
            remarketing: 10,
            other: 8
        },
        totalSpend2026: 32306,
        totalSpend2025: 48149,
        spendChange: -33,
        campaignEfficiency: {
            remarketing: {
                name: "Remarketing",
                leads: 10,
                mqls: 7,
                mqlRate: 70,
                costPerMql: 64,
                spend: 451,
                verdict: "scale",
                status: "success"
            },
            performance: {
                name: "Performance",
                leads: 98,
                mqls: 4,
                mqlRate: 4,
                costPerMql: 1260,
                spend: 5040,
                verdict: "fix",
                status: "danger"
            },
            brand: {
                name: "Brand",
                leads: 1,
                mqls: 1,
                mqlRate: null,
                costPerMql: null,
                spend: 16150,
                verdict: "monitor",
                status: "warning"
            }
        },
        insight: "Remarketing is 17x more efficient than Performance campaigns ($64 vs $1,260 per MQL) but receives only 10% of budget."
    },

    channelPerformance: {
        commercial: [
            { channel: "Outbound", leads: 90, mqls: 31, mqlRate: 34, sqls: 11, opps: 3, verdict: "winner", status: "success" },
            { channel: "Organic Search", leads: 71, mqls: 19, mqlRate: 27, sqls: 11, opps: 3, verdict: "winner", status: "success" },
            { channel: "Paid Social", leads: 78, mqls: 11, mqlRate: 14, sqls: 2, opps: 0, verdict: "fix", status: "danger" },
            { channel: "Social Media", leads: 60, mqls: 7, mqlRate: 12, sqls: 3, opps: 0, verdict: "watch", status: "warning" },
            { channel: "Direct", leads: 56, mqls: 5, mqlRate: 9, sqls: 3, opps: 3, verdict: "good", status: "success" },
            { channel: "Paid Search", leads: 13, mqls: 5, mqlRate: 38, sqls: 1, opps: 2, verdict: "scale", status: "success" }
        ]
    },

    actionItems: {
        immediate: [
            {
                priority: "P1",
                action: "Shift $5K from Performance to Remarketing",
                impact: "At $64/MQL, could generate ~75 additional MQLs",
                owner: "Paid Media"
            },
            {
                priority: "P1",
                action: "Pause APAC Pod & GOV US Gated campaigns",
                impact: "Stop $950/month waste on 0 MQL campaigns",
                owner: "Paid Media"
            },
            {
                priority: "P2",
                action: "Review Enterprise Pod targeting",
                impact: "28 leads, 1 MQL - wrong audience?",
                owner: "Paid Media"
            }
        ],
        thisMonth: [
            {
                priority: "P1",
                action: "GOV US qualification review",
                impact: "10 MQLs, 1 SQL, 0 Opps - investigate bottleneck",
                owner: "Sales/SDR"
            },
            {
                priority: "P2",
                action: "Brand campaign signal tracking",
                impact: "Verify brand viewers appear as Amplemarket signals",
                owner: "Marketing Ops"
            },
            {
                priority: "P2",
                action: "Build remarketing audience pipeline",
                impact: "Ensure brand engagers feed into RMKT pools",
                owner: "Paid Media"
            }
        ]
    },

    summary: {
        working: [
            "MQL Volume: +109% YoY",
            "Conversion Rate: 38% (target 25%)",
            "Attributed Pipeline: $5.36M (+73%)",
            "Outbound Channel: 34% MQL rate",
            "Remarketing: 70% MQL rate"
        ],
        needsAttention: [
            "GOV US Opps: 0 created YTD",
            "Performance Campaigns: 4% MQL rate",
            "Paid Social Quality: 14% MQL rate, 0 opps",
            "Opp Creation: -7% despite +115% MQLs",
            "RMKT Investment: Only 10% of budget"
        ]
    }
};

// Windward Brand Chart Colors
const chartColors = {
    light: {
        primary: '#C36513',       // Bearing Gold
        primaryLight: '#d4782e',
        success: '#2A9F81',       // Green Shell
        warning: '#F9A825',       // Yellow
        danger: '#F44336',        // High Risk Red
        info: '#518BF9',          // Low Risk Blue
        gray: '#6C859E',          // Secondary Text
        gridLines: '#E5EBF3',     // Stroke
        text: '#001028'           // Deep Sea
    },
    dark: {
        primary: '#C36513',       // Bearing Gold
        primaryLight: '#d4782e',
        success: '#2A9F81',       // Green Shell
        warning: '#F9A825',       // Yellow
        danger: '#F44336',        // High Risk Red
        info: '#518BF9',          // Low Risk Blue
        gray: '#6C859E',          // Secondary Text
        gridLines: '#6C659E',     // Dark Stroke
        text: '#FFFFFF'           // White
    }
};

// Get current theme colors
function getThemeColors() {
    const isDark = document.documentElement.dataset.theme === 'dark';
    return isDark ? chartColors.dark : chartColors.light;
}

// Format currency
function formatCurrency(value) {
    if (value >= 1000000) {
        return '$' + (value / 1000000).toFixed(2) + 'M';
    } else if (value >= 1000) {
        return '$' + (value / 1000).toFixed(0) + 'K';
    }
    return '$' + value;
}

// Format percentage
function formatPercent(value) {
    return value + '%';
}

// Export for use in other modules
window.dashboardData = dashboardData;
window.chartColors = chartColors;
window.getThemeColors = getThemeColors;
window.formatCurrency = formatCurrency;
window.formatPercent = formatPercent;
