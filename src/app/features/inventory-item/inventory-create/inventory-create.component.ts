import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth/auth.service';
import { InventoryService } from '../../../services/inventory.service';
import { InventoryItemDto } from '../../../DTOs/inventory-item-dto.model';
import { WarehouseService } from '../../../services/warehouse.service';

@Component({
  selector: 'app-inventory-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inventory-create.component.html',
  styleUrl: './inventory-create.component.css'
})
export class InventoryCreateComponent {

  tenantId: string | null = '';
  InventoryForm!: FormGroup;



  constructor(private authService: AuthService, private warehouseService: WarehouseService, private inventoryService: InventoryService, private route: Router, private formBuilder: FormBuilder, private title: Title, private toaster: ToastrService) {
    this.tenantId = this.authService.getTenantId();
    this.InventoryForm = this.formBuilder.group({
      name: ['',Validators.required],
      description: ['',Validators.required],
      price: [0,Validators.required],
      quantity: [0,Validators.required],
      category: ['',Validators.required],
    
    });

  }

  ngOnInit(): void {
    this.title.setTitle(`Add Inventory`)

  }


  createInventoryItem():void{
    console.log(this.InventoryForm.value);
    if(this.InventoryForm.valid){
      const data:InventoryItemDto={
        name:this.InventoryForm.value.name!,
        description:this.InventoryForm.value.description!,
        price: this.InventoryForm.value.price!,
        quantity: this.InventoryForm.value.quantity!,
        category:this.InventoryForm.value.category!,

      }

      this.tenantId = this.authService.getTenantId();
      if (this.tenantId) {
        this.inventoryService.createInventoryItem(data, this.tenantId).subscribe(
          (createdItem) => {
            console.log('Inventory item created successfully', createdItem);
          },
          (error) => {
            console.error('Error creating inventory item', error);
          }
        );
      } else {
        console.error('Tenant ID is missing');
      }

    }

    else{
      alert("invalid data, try again please")
    }
  }






}
