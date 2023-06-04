// cognitiveservices-speech
// import { SpeechConfig, AudioConfig, SpeechSynthesizer, SpeechSynthesisOutputFormat } from 'microsoft-cognitiveservices-speech-sdk';
// import * as FileSystem from 'expo-file-system';

// Text to Speech
// const speechAzure = async (text) => {
//     const speechConfig = SpeechConfig.fromSubscription('7b74c9b728fd4f19a040e7671a9b9c43', 'eastus');
//     speechConfig.speechSynthesisVoiceName = 'es-CL-LorenzoNeural';
//     speechConfig.speechSynthesisOutputFormat = SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3; // Configurar el formato de salida de audio

//     const outputFileUri = await getOutputFileUri();

//     const audioConfig = AudioConfig.fromStreamOutput(await createAudioOutputStream(outputFileUri));
//     const synthesizer = new SpeechSynthesizer(speechConfig, audioConfig);

//     await synthesizer.speakTextAsync(text);

//     await synthesizer.close();
// }

// const getOutputFileUri = async () => {
//     const directory = FileSystem.cacheDirectory; // Directorio de salida (puedes cambiarlo según tus necesidades)
//     const filename = 'output.mp3'; // Nombre del archivo de salida

//     const fileUri = `${directory}${filename}`;

//     return fileUri;
// }

// const createAudioOutputStream = async (fileUri) => {
//     const { uri } = await FileSystem.createDownloadResumable(fileUri, fileUri).downloadAsync();
//     return {
//         write: (chunk) => {
//             FileSystem.writeAsStringAsync(uri, chunk, {
//                 encoding: FileSystem.EncodingType.Base64,
//                 append: true
//             });
//         },
//         close: () => {
//             // No es necesario hacer nada en este caso
//         }
//     };
// }

// export { speechAzure };
// cognitiveservices-speech
import { SpeechConfig, AudioConfig, SpeechSynthesizer } from 'microsoft-cognitiveservices-speech-sdk';
import 'react-native-get-random-values';


// Text to Speech
const speechAzure = (text) => {
    // return true;
    const speechConfig = SpeechConfig.fromSubscription('7b74c9b728fd4f19a040e7671a9b9c43', 'eastus');
    speechConfig.speechSynthesisVoiceName = 'es-CL-LorenzoNeural';
    // speechConfig.speechSynthesisLanguage = 'en-US';
    const audioConfig = AudioConfig.fromDefaultSpeakerOutput();
    const synthesizer = new SpeechSynthesizer(speechConfig, audioConfig);
    synthesizer.speakTextAsync(text);

}

export {speechAzure};