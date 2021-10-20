// Handels all WebService calls
import AppConfig from './config';
import {ContactType} from '../types/DatabaseTypes';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
//import { logger } from "react-native-logs";

// const console = logger.createLogger({
//   levels: { log: 0, warn: 2, error: 3 }, transportOptions: {
//     colors: "ansi"
//   }
// });


// General purpose webservice api base on target URL, payload for POST method
// https://api.stackexchange.com/2.3/users/517757?site=stackoverflow
export const getWebserviceURL = ( userId:string): Promise<[]> => {
  const targetURL = AppConfig.baseUrl+userId+'?site='+AppConfig.site;
  console.log('targetURL: ', targetURL);
  var keepResponse: any, responseStatus:any;
  return new Promise((resolve, reject) => {
    try {
      fetch(targetURL, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: '', 
      })
        .then(function(response) {
          console.log('* * * response status:',response.status);
          if (!response.ok ) {
            console.error('Error in webservice call. status:',response.status);
            reject (response.status+' '+response.statusText)
          } else { responseStatus =response.status;}
         return (response.json());
        })
        .then((response) => {
          keepResponse = response;
          // console.log('Response:>>', response,'<<<');
        })
        .then(() => {
          try {
            // console.log('typeof response: ', typeof keepResponse);//,'>>', keepResponse,'<<');
            if (typeof keepResponse === 'object') {
              resolve(keepResponse)
              return;
            }
            const parsedJson = JSON.parse(keepResponse);
            console.log('JSON parse success for request URL:', AppConfig.baseUrl + targetURL);
            resolve(parsedJson);
          } catch {
            const rejectMsg = 'xJSON parse error in getWebserviceURL for Request: ' + payload + ' Response: ' + JSON.stringify(keepResponse);
            console.error('>>>keepResponse: ', keepResponse);
            reject(rejectMsg);
          }
        })
        .catch((err) => {
          console.log('******* response status:', responseStatus);
          console.error('getWebserviceURL() error:', err, 'for URL:', AppConfig.baseUrl + targetURL, 'Payload:', payload);
          console.log('keepResponse: ', keepResponse);
          reject('Check above response for possible error. ' + err);
        });
    } catch (error) {
      const rejectMsg = 'Reject error: [' + error + '] Response: ' + keepResponse;
      reject(rejectMsg);
    }
  });
};
// Get the file content itself from server, determine encoding type and store locally
export const getBlobURL = (targetURL: string, payload: string, filename: string,
  method: Methods = 'POST'): Promise<UpdateDocType> => {
  console.log('getBlobURL()  payload:', payload);
  return new Promise((resolve, reject) => {
    try {
      RNFetchBlob.fetch(method, AppConfig.baseUrl + targetURL,
        {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        JSON.stringify(payload))
        .then((response) => {
          const status = response.info().status;
          if (status === 200) {
            const encode = response.info().rnfbEncode; //'utf8' or base64
            var fileContent = response.data;
            const path = RNFS.DocumentDirectoryPath + '/' + filename; // DocumentDirectoryPath DownloadDirectoryPath
            // if (encode === 'base64') {
            //   const decode = base64.decode(fileContent);
            // }
            RNFS.writeFile(path, fileContent, encode)
              .then(() => {
                console.log('File written to:', path, 'size:', fileContent.length);
                const updateContent: UpdateDocType = {
                  ContentEncoded: encode, // utf8 or base64
                  LocalPath: path, // the local path for the file
                  FileContent: '' // fileContent // for now no need to store fileContent in db
                } //response.data} //
                resolve(updateContent);//'filename:' + filename + ' ,fileContent.length:' + fileContent.length);
              })
              .catch((err) => {
                console.warn('Write File:', path, 'Error:', err.message);
              });
          } else { // error, response status not 200
            console.warn('HTTP Response.status error:', status, 'response:', JSON.stringify(response));
            reject('Error getblob return status:' + status);
          }
        })
        .catch((errorMessage, statusCode) => {
          console.warn('ERROR getBlobURL response: ', errorMessage, 'statusCode:', statusCode);
          reject(statusCode);
        })
    } catch (error) {
      console.warn('fetch error:', error);
      reject(error);
    }
  });
}

//GraphService
export function getGraphService(accessToken: string): Promise<ContactType> {
  const graphUrl = 'https://graph.microsoft.com/v1.0/contacts';

  return new Promise((resolve, reject) => {
    fetch(graphUrl, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer' + accessToken,
        'Content-Type': 'application/json',
      }
    }).then(response => {
      if (response != null) {
        console.log('response:', response);
        var parsedPayload: ContactType = JSON.parse(response.toString());
        resolve(parsedPayload);
      } else {
        console.warn('A problem in getGraphService. response is null');
        reject('error from user photo');
      }
    })
      .catch(error => {
        console.warn('ERROR getGraphService error: ', error);
        reject(error);
      })
  });
}
