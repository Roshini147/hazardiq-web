import type React from 'react';
export default function MetricCard({label,value,detail}:{label:string,value:React.ReactNode,detail?:string}){return <div className="metric"><div className="metric-label">{label}</div><div className="metric-value">{value}</div>{detail&&<div className="metric-detail">{detail}</div>}</div>}
