const fs = require('fs');

const text = `MarketMind — Competitive Landscape Brief

Executive Summary

SecureFlow
Founded: 2018 | Funding: $88M | Employees: 250
Key Product: GuardPost
Description: Zero-trust network security platform with AI-driven threat detection.

CloudScale
Founded: 2019 | Funding: $45M | Employees: 120
Key Product: AutoScaler Pro
Description: Automated cloud infrastructure optimization for high-growth enterprises.

LogiStack
Founded: 2020 | Funding: $22M | Employees: 75
Key Product: StackSync
Description: End-to-end supply chain visibility and logistics automation software.

DataNexus
Founded: 2021 | Funding: $12M | Employees: 35
Key Product: NexusBI
Description: Real-time business intelligence layer for decentralized data teams.

FinVantage
Founded: 2022 | Funding: $5M | Employees: 18
Key Product: VantagePay
Description: Simplified cross-border payment processing for global freelancers.

Funding Ranking

1. SecureFlow - $88M
2. CloudScale - $45M
3. LogiStack - $22M
4. DataNexus - $12M
5. FinVantage - $5M

Strategic Insights

1. Security Commands Premium Investment
The highest-funded and most mature company in the group is SecureFlow ($88M, founded 2018). This underscores that enterprise security solutions, particularly zero-trust and AI-driven threat detection, attract the most significant venture capital.

2. Mid-Market Focus on Operational Efficiency
The mid-tier companies, CloudScale ($45M) and LogiStack ($22M), both focus on backend operational efficiencies—cloud infrastructure and supply chain logistics. These are stable, high-value problem areas for enterprises.

3. Newer Entrants Target Specialized Niches
The most recently founded startups, DataNexus (2021) and FinVantage (2022), have lower relative funding but operate in highly targeted niches (decentralized BI and cross-border freelancer payments). This suggests a market shift toward specialized, audience-specific tooling rather than broad infrastructure plays.
`;

function findIndices(searchText) {
    const startIndex = text.indexOf(searchText) + 1; // 1-based
    if (startIndex === 0) return null;
    const endIndex = startIndex + searchText.length;
    return { startIndex, endIndex, text: searchText };
}

const styles = [
    { ...findIndices('MarketMind — Competitive Landscape Brief\n'), style: 'heading1' },
    { ...findIndices('Executive Summary\n'), style: 'heading2' },
    { ...findIndices('SecureFlow\n'), style: 'heading3' },
    { ...findIndices('CloudScale\n'), style: 'heading3' },
    { ...findIndices('LogiStack\n'), style: 'heading3' },
    { ...findIndices('DataNexus\n'), style: 'heading3' },
    { ...findIndices('FinVantage\n'), style: 'heading3' },
    { ...findIndices('Funding Ranking\n'), style: 'heading2' },
    { ...findIndices('Strategic Insights\n'), style: 'heading2' },
    { ...findIndices('1. Security Commands Premium Investment\n'), style: 'heading3' },
    { ...findIndices('2. Mid-Market Focus on Operational Efficiency\n'), style: 'heading3' },
    { ...findIndices('3. Newer Entrants Target Specialized Niches\n'), style: 'heading3' },
];

let currentIndex = 0;
while (true) {
    const nextFounded = text.indexOf('Founded:', currentIndex);
    if (nextFounded === -1) break;
    styles.push({ startIndex: nextFounded + 1, endIndex: nextFounded + 1 + 8, style: 'bold', text: 'Founded:' });
    currentIndex = nextFounded + 1;
}

currentIndex = 0;
while (true) {
    const nextFunding = text.indexOf('Funding:', currentIndex);
    if (nextFunding === -1) break;
    // Don't bold 'Funding Ranking'
    if (text.substr(nextFunding, 15) === 'Funding Ranking') {
        currentIndex = nextFunding + 1;
        continue;
    }
    styles.push({ startIndex: nextFunding + 1, endIndex: nextFunding + 1 + 8, style: 'bold', text: 'Funding:' });
    currentIndex = nextFunding + 1;
}

currentIndex = 0;
while (true) {
    const nextEmployees = text.indexOf('Employees:', currentIndex);
    if (nextEmployees === -1) break;
    styles.push({ startIndex: nextEmployees + 1, endIndex: nextEmployees + 1 + 10, style: 'bold', text: 'Employees:' });
    currentIndex = nextEmployees + 1;
}

currentIndex = 0;
while (true) {
    const nextProduct = text.indexOf('Key Product:', currentIndex);
    if (nextProduct === -1) break;
    styles.push({ startIndex: nextProduct + 1, endIndex: nextProduct + 1 + 12, style: 'bold', text: 'Key Product:' });
    currentIndex = nextProduct + 1;
}

currentIndex = 0;
while (true) {
    const nextDesc = text.indexOf('Description:', currentIndex);
    if (nextDesc === -1) break;
    styles.push({ startIndex: nextDesc + 1, endIndex: nextDesc + 1 + 12, style: 'bold', text: 'Description:' });
    currentIndex = nextDesc + 1;
}

console.log(JSON.stringify(styles, null, 2));
