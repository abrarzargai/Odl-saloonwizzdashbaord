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
import ClientManager from '../../Pages/ClientManager';
import Settings from '../../Pages/Settings';
import Calender from '../../Pages/Calender';
import '../../Pages/Pages.css'
import KnowledgedBaseFAQ from '../../SubComponents/KnowledgedBaseFAQ';
import KnowledgedBaseArticles from '../../SubComponents/KnowledgedBaseArticles';
import KnowledgedBaseTutorials from '../../SubComponents/KnowledgedBaseTutorials';
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
                <Route path="/Calender" element={<Calender />} />
                <Route path="/Settings" element={<Settings />} />
                <Route path="/ClientManager" element={<ClientManager />} />
                {/* KnowledgedBae */}
                <Route path="/KnowledgedBase/faqs" element={<KnowledgedBaseFAQ />} />
                <Route path="/KnowledgedBase/articles" element={<KnowledgedBaseArticles />} />
                <Route path="/KnowledgedBase/tutorials" element={<KnowledgedBaseTutorials />} />
                
            </Routes>
        </Content>

    );
}

export default MainContent;
