import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Home from '../../Pages/Home';
import UtilityBills from '../../Pages/UtilityBills';
import SupplierInvoices from '../../Pages/SupplierInvoices';
import Password from '../../Pages/Password';
import General from '../../Pages/General';
import Utilities from '../../Pages/Utilities';
import MarketingServices from '../../Pages/MarketingServices';
import AccountingServices from '../../Pages/AccountingServices';
import Reports from '../../Pages/Reports';
import DigitalAssistance from '../../Pages/DigitalAssistance';
import KnowledgedBase from '../../Pages/KnowledgedBase';
import Settings from '../../Pages/Settings';
import '../../Pages/Pages.css'
const { Content } = Layout;


function MainContent() {
    return (
        <Content style={{ margin: '24px 16px 0' }}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/UtilityBills" element={<UtilityBills />} />
                <Route path="/SupplierInvoices" element={<SupplierInvoices />} />
                <Route path="/Password" element={<Password />} />
                <Route path="/General" element={<General />} />
                <Route path="/Utilities" element={<Utilities />} />
                <Route path="/MarketingServices" element={<MarketingServices />} />
                <Route path="/AccountingServices" element={<AccountingServices />} />
                <Route path="/Reports" element={<Reports />} />
                <Route path="/DigitalAssistance" element={<DigitalAssistance />} />
                <Route path="/KnowledgedBase" element={<KnowledgedBase />} />
                <Route path="/Settings" element={<Settings />} />
                
            </Routes>
        </Content>

    );
}

export default MainContent;
