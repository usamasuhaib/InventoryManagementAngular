import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InventoryItem } from '../models/inventory-item.model';
import { Observable } from 'rxjs';
import { InventoryItemDto } from '../DTOs/inventory-item-dto.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // getInventoryItems(): Observable<InventoryItem[]> {
  //   return this.http.get<InventoryItem[]>(`${this.baseUrl}/api/Inventory`);
  // }

  getInventoryItems(tenantId: string): Observable<InventoryItem[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'TenantId': tenantId // Include the TenantId header
    });

    return this.http.get<InventoryItem[]>(`${this.baseUrl}/api/Inventory/GetInventoryItems`, { headers });
  }

  createInventoryItem(inventoryItemDto: InventoryItemDto, tenantId: string): Observable<InventoryItemDto> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'TenantId': tenantId // Include the TenantId header
    });
  
    return this.http.post<InventoryItemDto>(`${this.baseUrl}/api/Inventory/CreateInventoryItem`, inventoryItemDto, { headers });
  }


}
