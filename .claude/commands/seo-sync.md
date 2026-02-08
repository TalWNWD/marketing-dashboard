# seo-sync

Synchronize SEO data from the SEO project into the Marketing Dashboard.

## Schedule

Run this skill on **Sunday** and **Wednesday** evenings to sync fresh SEO data before:
- Monday marketing weekly meeting (Sunday sync)
- End-of-week planning (Wednesday sync)

## Data Sources

### 1. Google Sheets SEO Dashboard
**Spreadsheet ID**: `1TS11ViGqk_n4zqUdlcLaw7QTSJNCU2YqigoK01wOUfo`

Tabs to read:
- **Weekly Metrics** - Organic clicks, impressions, conversions, avg position
- **Action Queue** - Pending SEO tasks with priorities

### 2. Local JSON Files
Location: `/Users/tal.cohen/Claude Main/data/`

Files to read:
- `proposals/keywords_proposal.json` - Quick win keywords, competitor gaps, opportunities
- `master/action_queue.json` - Full task queue with team assignments

## Workflow

1. **Fetch Weekly Metrics** from Google Sheets
   - Read "Weekly Metrics" tab for current organic performance
   - Extract: clicks, impressions, conversions, avg position

2. **Read Keywords Proposal**
   - Open `/Users/tal.cohen/Claude Main/data/proposals/keywords_proposal.json`
   - Extract: quick wins, competitor gaps, AI answer status

3. **Read Action Queue**
   - Open `/Users/tal.cohen/Claude Main/data/master/action_queue.json`
   - Extract: top 4 priority tasks, summary counts

4. **Update Dashboard Data**
   - Edit `/Users/tal.cohen/Marketing Analyst/js/data.js`
   - Update the `dashboardData.seo` object with fresh values:
     - `weeklyMetrics.organicClicks.value`
     - `weeklyMetrics.impressions.value`
     - `weeklyMetrics.conversions.value`
     - `weeklyMetrics.avgPosition`
     - `taskQueue.summary` counts
     - `taskQueue.topTasks` array
     - `quickWinKeywords` array
     - `competitorGaps` array
     - `aiAnswerStatus` object
   - Update `seo.metadata.lastUpdated` to current date

5. **Send Slack Notification**
   Send a summary to the marketing Slack channel using the webhook defined in the SEO project's CLAUDE.md file.
   Include: organic clicks, avg position, tasks pending count.

## Example Usage

```
/seo-sync
```

Or run manually on Sundays and Wednesdays before team meetings.

## Data Flow

```
SEO Project (/Users/tal.cohen/Claude Main/)
├── Google Sheets (Weekly Metrics)
├── proposals/keywords_proposal.json
└── master/action_queue.json
            │
            ▼ /seo-sync
            │
Marketing Dashboard (/Users/tal.cohen/Marketing Analyst/)
└── js/data.js → dashboardData.seo
```
