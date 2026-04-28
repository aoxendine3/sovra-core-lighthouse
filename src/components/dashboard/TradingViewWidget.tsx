'use client';

import React, { useEffect, useRef } from 'react';

/**
 * TRADINGVIEW WIDGET (v16.0)
 * Mission: High-Fidelity Real-Time Market Tickers
 */
export default function TradingViewWidget({ symbol = "BINANCE:BTCUSDT" }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "autosize": true,
      "symbol": symbol,
      "interval": "D",
      "timezone": "Etc/UTC",
      "theme": "dark",
      "style": "1",
      "locale": "en",
      "enable_publishing": false,
      "allow_symbol_change": true,
      "backgroundColor": "rgba(2, 2, 5, 1)",
      "gridColor": "rgba(43, 43, 43, 0.05)",
      "hide_side_toolbar": false,
      "container_id": "tradingview_chart"
    });
    
    if (container.current) {
      container.current.appendChild(script);
    }
    
    return () => {
      if (container.current) {
        container.current.innerHTML = "";
      }
    };
  }, [symbol]);

  return (
    <div className="tradingview-widget-container h-[500px] w-full rounded-3xl overflow-hidden border border-white/5" ref={container}>
      <div className="tradingview-widget-container__widget h-full w-full"></div>
    </div>
  );
}
