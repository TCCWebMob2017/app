import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { StorageService } from "../services/storage.service";
import { AlertController, ToastController } from "@ionic/angular";
import { map, catchError } from "rxjs/operators";
//import { FieldMessage } from '../models/fieldmessage';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService, 
                public alertCtrl: AlertController,
                public toastController: ToastController,
                public alertController: AlertController) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //console.log('.ErrorInterceptor...');
        
        return next
            .handle(req)
    
            // /////////////////////////
            .pipe(
                map((event: HttpEvent<any>) => {
                  if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);
                  }
                  return event;      
                  
                }),
                catchError((error: HttpErrorResponse) => {
                    console.log('errorrrrrrr');
                    console.log(error.status);
                    console.log(error);
                    if (error.status === 401) {
                        //console.log(error.error);
                        //if (error.error.success === false) {
                            //console.log('');
                            this.presentToast('Login failed');
                        //} else {
                            //console.log('');
                            //this.router.navigate(['login']);
                        //}
                    }
                    return throwError(error);
                }));
            // /////////////////////////


        /*
        .catch((error, caught) => {

            let errorObj = error;
            if (errorObj.error) {
                errorObj = errorObj.error;
            }
            if (!errorObj.status) {
                errorObj = JSON.parse(errorObj);
            }

            console.log("Erro detectado pelo interceptor:");
            console.log(errorObj);

            switch(errorObj.status) {
                case 401:
                this.handle401();
                break;

                case 403:
                this.handle403();
                break;

                case 422:
                this.handle422(errorObj);
                break;

                default:
                this.handleDefaultEror(errorObj);
            }

            return Observable.throw(errorObj);
        }) as any; 
    }
    */

    /*
    handle403() {
        this.storage.setLocalUser(null);
    }
    */ 
    
    /*
    handle401() {
        let alert = this.alertCtrl.create({
            title: 'Erro 401: falha de autenticação',
            message: 'Email ou senha incorretos',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    }
    */ 
    
    /*
    handle422(errorObj) {
        let alert = this.alertCtrl.create({
            title: 'Erro 422: Validação',
            message: this.listErrors(errorObj.errors),
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    }

    handleDefaultEror(errorObj) {
        let alert = this.alertCtrl.create({
            title: 'Erro ' + errorObj.status + ': ' + errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
        */
    }

    /*
    private listErrors(messages : FieldMessage[]) : string {
        let s : string = '';
        for (var i=0; i<messages.length; i++) {
            s = s + '<p><strong>' + messages[i].fieldName + "</strong>: " + messages[i].message + '</p>';
        }
        return s;
    }
    */

   async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

}


export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};