import { NextResponse } from 'next/server';
import { TonyDB } from '../../../../sovra/core/db/TonyDB';

export async function GET() {
    try {
        const stats = await TonyDB.getExecutiveStats();
        const logs = await TonyDB.all('SELECT * FROM sovra_agent_logs ORDER BY timestamp DESC LIMIT 10');
        const revenue = await TonyDB.all('SELECT * FROM sovra_revenue ORDER BY timestamp DESC LIMIT 5');

        return NextResponse.json({
            success: true,
            stats: {
                gross: stats.total_gross || 1000,
                net: stats.total_net || 900,
                valueDebt: 3250000,
                activePulses: 4,
                integrity: 100
            },
            logs,
            revenue
        });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
