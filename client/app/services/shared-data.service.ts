import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";

@Injectable()
export class SharedDataService {
  private dataObs$ = new Subject<any>();

  getData() {
    return this.dataObs$;
  }

  updateData(data: any) {
    this.dataObs$.next(data);
  }
}
