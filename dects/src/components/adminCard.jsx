import React from "react";
import { TrendingUp } from 'lucide-react';
import '../assets/adminPanal.css';

const AdminCard =({ icon: Icon, title , value,trend,color }) =>{
    return(
        <div className="stat-card" style={{ borderLeftColor: color}}>
            <div className="stat-content">
                <div className="stat-left">
                    <p className="stat-title">{title}</p>
                    <p className="stat-value">{value}</p>

                    {trend && (
                        <p className="stat-trend">
                            <TrendingUp className="trend-icon" />
                            {trend}
                        </p>
                    )}
                </div>
                <div className="stat-icon-wrapper" style={{ backgroundColor: color + '20'}}>
                    <Icon className="stat-icon" style={{ color: color}}></Icon>
                </div>
            </div>
        </div>
    )
}

export default AdminCard;