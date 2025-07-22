import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { WebView } from 'react-native-webview';

export default function PaiementScreen() {
  const { url, payload, signature } = useLocalSearchParams();

  if (!url || !payload || !signature) {
    return <Text>Données de paiement manquantes</Text>;
  }

  const htmlContent = `
    <html>
      <body onload="document.forms[0].submit()">
        <form method="POST" action="${url}">
          <input type="hidden" name="payload" value='${payload}' />
          <input type="hidden" name="signature" value="${signature}" />
        </form>
      </body>
    </html>
  `;

  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: htmlContent }}
      javaScriptEnabled={true}
      style={{ flex: 1 }}
    />
  );
}
