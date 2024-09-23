import React from 'react';
import { Page, Text, View, Document } from '@react-pdf/renderer';

const RiskReportPDF = ({ data }) => {
  // Ensure data is an array
  const reportData = Array.isArray(data) ? data : [];

  return (
    <Document>
      <Page>
        <View>
          <Text>Risk Report</Text>
          {reportData.length === 0 ? (
            <Text>No data available</Text>
          ) : (
            reportData.map((item, index) => (
              <View key={index}>
                <Text>{item.name}: {item.recommended}</Text>
              </View>
            ))
          )}
        </View>
      </Page>
    </Document>
  );
};

export default RiskReportPDF;
