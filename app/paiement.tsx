import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams } from 'expo-router';

const PaiementScreen = () => {
  const params = useLocalSearchParams();
  let url = '';
  let payload = '';
  let signature = '';

  if (params.paymentParams && typeof params.paymentParams === 'string') {
    try {
      const decodedParams = decodeURIComponent(params.paymentParams); // Décoder d'abord
      const parsedParams = JSON.parse(decodedParams);
      url = parsedParams.url || '';
      payload = parsedParams.payload || '';
      signature = parsedParams.signature || '';
    } catch (e) {
      console.error("Failed to parse paymentParams:", e);
    }
  }

  console.log('PaiementScreen params (parsed):', { url, payload, signature });

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
  const handleWebViewError = (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    console.error('WebView error:', nativeEvent);
    alert(`Erreur WebView : ${nativeEvent.description || 'Erreur inconnue'}`);
  };

  if (!url || !payload || !signature) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Chargement des informations de paiement...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        onError={handleWebViewError}
      />
    </View>
  );
};

export default PaiementScreen;
