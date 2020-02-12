// import anylinejs
const { init, errorCodes } = window.anylinejs;

// if copied into node_modules
// import { init, errorCodes } from 'anyline-js';

// anylinejs configuration
const config = {
    minConfidence: 30,
    charWhitelist: "ABCDEFGHJIKLMNOPQRSTUVWXYZ0123456789"
}

// create a view configuration
const viewConfig = {
    outerColor: '000000',
    outerAlpha: 0.5,
    cutouts: [
        {
        cutoutConfig: {
            // style: 'rect',
            maxWidthPercent: '80%',
            alignment: 'top_half',
            ratioFromSize: {
                width: 300,
                height: 250,
            },
            width: 720,
            strokeWidth: 2,
            cornerRadius: 4,
            strokeColor: 'FFFFFFFF',
            feedbackStrokeColor: '0099FF',
        },
        scanFeedback: {
            style: 'contour_point',
            strokeColor: '0099FF',
            fillColor: '300099FF',
            strokeWidth: 2,
            cornerRadius: 4,
            animation: 'none',
        },
    },
    ],
};

function escapeHtml(string) {
    return String(string).replace(/[&<>"'`=\/]/g, function(s) {
      return entityMap[s];
    });
  }
  
function replaceVerticalBar(string) {
    return String(string).replace(/[|]/g, function(s) {
      return '\n';
    });
 }

const anylicense = 'eyJzY29wZSI6WyJBTEwiXSwicGxhdGZvcm0iOlsiaU9TIiwiQW5kcm9pZCIsIldpbmRvd3MiLCJKUyIsIldlYiJdLCJ2YWxpZCI6IjIwMjAtMDMtMTMiLCJtYWpvclZlcnNpb24iOjMsIm1heERheXNOb3RSZXBvcnRlZCI6NSwic2hvd1dhdGVybWFyayI6dHJ1ZSwicGluZ1JlcG9ydGluZyI6dHJ1ZSwiZGVidWdSZXBvcnRpbmciOiJvcHQtb3V0IiwidG9sZXJhbmNlRGF5cyI6NSwic2hvd1BvcFVwQWZ0ZXJFeHBpcnkiOnRydWUsImlvc0lkZW50aWZpZXIiOlsia3JpdHRpbjEzMzkuZ2l0aHViLmlvIl0sImFuZHJvaWRJZGVudGlmaWVyIjpbImtyaXR0aW4xMzM5LmdpdGh1Yi5pbyJdLCJ3aW5kb3dzSWRlbnRpZmllciI6WyJrcml0dGluMTMzOS5naXRodWIuaW8iXSwid2ViSWRlbnRpZmllciI6WyJrcml0dGluMTMzOS5naXRodWIuaW8iXSwianNJZGVudGlmaWVyIjpbImtyaXR0aW4xMzM5LmdpdGh1Yi5pbyJdLCJpbWFnZVJlcG9ydENhY2hpbmciOnRydWV9Ckp2WGJKamZKSVlJbFg3OURsaHU1Zk50MHpXNXJyOENrY2szWmgwODE0TW5EeVQ0RkdSQ2puTFJDVG9HUWoybTRpaEhRSVlDendrdlFOS1pFVmdSb2dIenFRUmtsZ25LekR1aE13cjdhOFRWU25tSWhQb09yTnBtZTdzMkplRE9GMlUvTVdZd2dkY09LeEpjSjhRM2R6Y1QxdlIxQ2VrWFVtZC9qbTY4YUlrWVpVdVdWNy9jcjhiUlJuMnVHcW5qUTR5SmFHakFxNWcvT3dJQXNwMWFvOExuRnRHejV0TUw3a2NoOTh4bU56TUlLVXR6YTVxaFhHVnFXOWdaaWN2aXNWenh1Yk5QRWpXZVY3THBmZHoxNy95QjdBS1M4dEFjalV5TFFSZTlRUGVYaVB3M1NnRkx0VHdwVm1FUXNaK2ZBOWpnQUFpMFB0NjRyYmYvOXdoRHE5QT09';

// access the container you want to mount anylinejs into
const root = document.getElementById('root');

// inititalize anylinejs with optional presets
// presets will override some dimension configuration of your viewConfig and modules in anylinejs config
const Anyline = init({
    preset: 'meter',
    viewConfig,
    license: anylicense,
    element: root,
    anylinePath: '../../anylinejs', // path to the anylinejs folder from your html
});

Anyline.onResult = result => {
  console.log('Result: ', result);
  result.result.map(res => {
    document.getElementById("meterValue").innerHTML = escapeHtml(replaceVerticalBar(res.text)) + ' kWh' || 'kWh';
  });
 // window.location.reload(true);
};

Anyline.startScanning();

Anyline.onReport = (report) => {
    console.log('Anyline Reports: ', report);
};