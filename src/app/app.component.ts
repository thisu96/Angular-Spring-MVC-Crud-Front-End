import { Component,ViewChild} from '@angular/core';
import { Customer } from './dto/customer';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { CustomerService } from './services/customer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Front-End';

  customers: Array<Customer> = [];
  selectedCustomer: Customer = new Customer();
  tempItem: Customer = null;
  manuallySelected: boolean = false;
  @ViewChild("frmCustomer") frmCustomer: NgForm;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.loadAllCustomers();
  }

  loadAllCustomers(): void {
    this.customerService.getAllCustomers().subscribe(
      (result) => {
        this.customers = result;
      });
  }

  selectCustomer(customer: Customer): void {
    this.clear();
    this.selectedCustomer = customer;
    this.tempItem = Object.assign({}, customer);
    this.manuallySelected = true;
  }

  // setImage($event){
  //   const fil = event.target.f
  //   this.imageUrl = fil;
  //   console.log(this.imageUrl);
  // }

  clear(): void {
    let index = this.customers.indexOf(this.selectedCustomer);
    if (index !== -1) {
      this.customers[index] = this.tempItem;
      this.tempItem = null;
    }
    this.selectedCustomer = new Customer();
    this.manuallySelected = false;
  }

  saveCustomer(): void{
    this.customerService.saveCustomer(this.selectedCustomer).subscribe(
      (result)=>{
        if (result){
          alert("Congrats! You Sussefully Add Customer To Database! success")
          this.loadAllCustomers();
          this.clear();
        }else{
          alert("OOPs! Something wents wrong try again! error")
        }
      }
    )
  }

  deleteCustomer(customer: Customer): void {
    if (confirm("Are you sure you want to delete this Customer?")) {
      this.customerService.deleteCustomer(customer.customerName).subscribe(
        (result) => {
          if (result) {
            alert("Congrats! You Sussefully delete data! success")
            this.loadAllCustomers();
          } else {
            alert("OOPs! Failed to delete data! error")
          }
          this.loadAllCustomers();
        }
      )
    }
  }
}
