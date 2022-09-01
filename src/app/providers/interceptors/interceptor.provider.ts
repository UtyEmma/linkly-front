import { HTTP_INTERCEPTORS } from "@angular/common/http"
import { Provider } from "@angular/core"
import { HttpRequestInterceptor } from "./http/request/http-request.interceptor"
import { HttpResponseInterceptor } from "./http/response/http-response.interceptor"

export const INTERCEPTORS: Provider = [
	{provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true},
	{provide: HTTP_INTERCEPTORS, useClass: HttpResponseInterceptor, multi: true},
]
