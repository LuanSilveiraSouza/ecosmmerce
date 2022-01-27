import { Observable } from 'rxjs';

export interface TransportService {
  calcTransport(req: TransportRequest): Observable<TransportResponse>;
}

export interface TransportRequest {
  origin: string;
  destiny: string;
}

export interface TransportResponse {
  origin: string;
  destiny: string;
  cost: string;
  cache: boolean;
}
