import { Observable } from 'rxjs';

export interface ITransportService {
    calcTransport(req: TransportRequest): Observable<any>;
}

export interface TransportRequest {
    origin: string;
    destiny: string;
}
