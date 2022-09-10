import { Injectable } from '@angular/core';
import { HttpRequest, HttpClient } from '@angular/common/http'

export type HttpResponseType = 'arraybuffer' | 'blob' | 'json' | 'text'

@Injectable({
  providedIn: 'root'
})


export class HttpService {

  private _http: any

  toast: boolean = false
  monitor: boolean = false
  headers: Record<string, string> = {}
  responseType!: string

  constructor(
    private _httpClient: HttpClient
  ) { }

  setToast(toast: boolean){
    this.toast = toast
    return this
  }
  
  setMonitor(monitor: boolean){
    this.monitor = monitor
    return this
  }

  setHeaders(headers: any){
    this.headers = headers
    return this
  }

  setResponseType(type: HttpResponseType){
    this.responseType = type
    return this
  }

  post(url: string, body: any){
    this._http = new HttpRequest('POST', url, {
      body: body,
      reportProgress: this.monitor,
      headers: this.headers,
      responseType: this.responseType
    })
  }

  send(){
    return this._httpClient.request(this._http).pipe()
  }
}
