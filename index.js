let net;

async function app() {
  console.log('Loading mobilenet..');

  const webcamElement = document.getElementById('webcam');
  net = await mobilenet.load();
  console.log('Successfully loaded model');


  const webcam = await tf.data.webcam(webcamElement);
  setInterval(async () =>
{
    const img = await webcam.capture();
    const result = await net.classify(img);
  console.log(result);
  document.getElementById('console').innerHTML = `
  model prediction ${result[0].className}-----> probaility ${(result[0].probability)*100} %<br>
  model prediction ${result[1].className}-----> probaility ${(result[1].probability*100)} %<br>
  model prediction ${result[2].className}-----> probaility ${(result[2].probability*100)} %<br>
  `
    img.dispose();

    await tf.nextFrame();
  },1000); 
}

app();