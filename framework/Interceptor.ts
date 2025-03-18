import {AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import { object } from 'zod';

export class Interceptor {
    static attach(apiClient : AxiosInstance) : void {
        apiClient.interceptors.request.use((request : InternalAxiosRequestConfig) => {
            console.log("Request Sent: ")
            console.log(`URL: ${request.url}`);
            console.log(`Method: ${request.method}`);
            console.log(`Headers: ${request.headers}`);
            if(request.data){
                console.log("Request Data:", JSON.stringify(request.data, null, 2));
            }
            
            return request;
        }, 
        (error) => {
            console.log("Error Request!!!");
            if(error.request){
                console.error(`Status : ${error.request.status}`);
                console.error(`Data : ${error.request.data}`);
            } else {
                console.error(`Error Message : ${error.message}`);
            }
            return Promise.reject(error);
        });

        apiClient.interceptors.response.use((response : AxiosResponse) => {
            console.log("Response received");
            console.log(`Response Status: ${response.status}`);
            console.log(`Headers: ${response.headers}`);
            if(response.data){
                console.log("Request Data:", JSON.stringify(response.data, null, 2));
            }
            return response;
        },
        (error) => {
            console.log("Error Response!!!");
            if(error.response){
                console.error(`Status : ${error.response.status}`);
                console.error(`Data : ${error.response.data}`);
            } else {
                console.error(`Error Message : ${error.message}`);
            }
            return Promise.reject(error);
        });
    }
}