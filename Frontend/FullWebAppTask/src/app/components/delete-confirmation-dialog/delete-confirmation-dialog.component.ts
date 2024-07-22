import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-confirmation-dialog',
  standalone: true,
  imports: [],
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrl: './delete-confirmation-dialog.component.scss',
})
export class DeleteConfirmationDialogComponent {
  @Output() confirmDelete = new EventEmitter<boolean>();
  @Input() isDashboard = false;
  title = '';

  dashTitle = 'Are you sure you want to delete all the items?';
  deleteItemTitle = 'Are you sure you want to delete this item?';

  ngOnChanges() {
    this.isDashboard
      ? (this.title = this.dashTitle)
      : (this.title = this.deleteItemTitle);
  }

  onConfirm() {
    this.confirmDelete.emit(true);
  }

  onCancel() {
    this.confirmDelete.emit(false);
  }
}
