import { Component, OnInit } from '@angular/core';
import { ToastService } from 'ng-uikit-pro-standard';
import { Router } from '@angular/router';
import { CapabilityService } from '../../services/capability.service';
import { PagerService } from '../../services/pager.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-capabilities',
  templateUrl: './capabilities.page.html',
  styleUrls: ['./capabilities.page.scss']
})
export class CapabilitiesPage implements OnInit {
  allItems: Array<Object>; // array of all items to be paged
  auxItems: Array<Object>; // array used for keep the items

  // Pagination Variables
  pager: any = {}; // pager object
  pagedItems: any[]; // paged items

  // Variable for to catch the item selected
  itemSelected: String;

  modalTitle: String; // Variable for load the same modal for two operations
  modalData: Object; // For show the values will be updated

  // Variable q indica el tipo de item selected
  typeSelected: String;

  constructor(
    private capabilityService: CapabilityService,
    private pagerService: PagerService,
    private authService: AuthService,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    // Identifying the capability type
    this.typeSelected = this.router.url.replace('/', '');

    // Getting the data
    this.getCapabilities();

    // Setting the ModalData
    this.clearModalData();
  }

  getCapabilities() {
    this.capabilityService
      .getCapabilities(this.typeSelected)
      .subscribe(data => {
        if (!data['isEmpty']) {
          // set items
          this.allItems = this.auxItems = data['capabilities'];

          // initialize to page 1
          this.setPage(1);
        } else {
          console.log('There are no capabilities to display.');
        }
      });
  }

  // Esta funcion se crea para que los
  // controles de la validacion cuando
  // cargue ya extista un partnumber, model, etc
  // Ademas la uso para limpiar la data
  clearModalData() {
    this.modalData = {
      partnumber: '',
      model: '',
      description: '',
      manufacturer: ''
    };
    this.itemSelected = null;
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }

  filterIt(arr, searchKey) {
    return arr.filter(obj => {
      return Object.keys(obj).some(key => {
        return obj[key].includes(searchKey);
      });
    });
  }

  search(searchValue: string) {
    // Defino los campos por los que buscar, no por todo el object
    let newItems = this.auxItems.map(obj => ({
      partnumber: obj['partnumber'],
      model: obj['model'],
      description: obj['description'],
      manufacturer: obj['manufacturer']
    }));

    // Applying filters and updating allItems with the result
    this.allItems = this.filterIt(newItems, searchValue);

    // initialize to page 1
    this.setPage(1);
  }

  setAction(actionRequested) {
    this.modalTitle = actionRequested;

    if (actionRequested == 'Update') {
      // getting the selected item data
      let item = this.filterIt(this.auxItems, this.itemSelected);

      this.modalData = {
        _id: item[0]._id,
        type: item[0].type,
        partnumber: item[0]['partnumber'],
        model: item[0]['model'],
        description: item[0]['description'],
        manufacturer: item[0]['manufacturer']
      };
    }
  }

  action() {
    if (this.modalTitle == 'Add') {
      // Asigno el tipo de item selecionado al object existente
      this.modalData['type'] = this.typeSelected;

      this.capabilityService.addCapability(this.modalData).subscribe(data => {
        if (data['success']) {
          // Show Success Message
          this.toast.success(data['msg']);

          // Reload the data
          this.getCapabilities();
        } else {
          // Show Warning Message
          this.toast.warning(data['msg']);
        }
      });
    } else {
      this.capabilityService
        .updateCapability(this.modalData)
        .subscribe(data => {
          //
          if (data['success']) {
            // Show Success Message
            this.toast.success(data['msg']);

            // Reload the data
            this.getCapabilities();
          } else {
            // Show Warning Message
            this.toast.warning(data['msg']);
          }
        });
    }
    this.clearModalData();
  }

  remove(id) {
    this.capabilityService.removeItem(id).subscribe(data => {
      if (data['success']) {
        // Show Success Message
        this.toast.success(data['msg']);

        // Reload the data
        this.getCapabilities();
      } else {
        // Show Error Message
        this.toast.error(data['msg']);
      }
    });
    this.itemSelected = null;
  }
}
