import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule, TablePageEvent } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Category } from '@/dashboard/interfaces';
import { CategoriesService } from '@/dashboard/services/categories.service';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { AuthService } from '@/auth/services/auth.service';
// import { Category, CategoryService } from '../service/category.service';

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

interface ExportColumn {
    title: string;
    dataKey: string;
}

@Component({
    selector: 'app-categories-page',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        TextareaModule,
        SelectModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        TagModule,
        InputIconModule,
        IconFieldModule,
        ToggleSwitchModule,
        ConfirmDialogModule
    ],
    providers: [ConfirmationService],
    templateUrl: './categories-page.component.html'
})
export class CategoriesPageComponent implements OnInit {
    authService = inject(AuthService);
    private categoryService = inject(CategoriesService);
    private messageService = inject(MessageService);
    private confirmationService = inject(ConfirmationService);

    categoryDialog: boolean = false;

    categories = signal<Category[]>([]);

    category!: Category;

    submitted: boolean = false;

    @ViewChild('dt') dt!: Table;

    exportColumns!: ExportColumn[];

    cols!: Column[];

    exportCSV() {
        this.dt.exportCSV();
    }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.categoryService.getCategories().subscribe((data) => {
            this.categories.set(data);
        });

        this.cols = [
            { field: 'id', header: 'ID', customExportHeader: 'Category ID' },
            { field: 'name', header: 'Name' },
            { field: 'description', header: 'Image' }
        ];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew() {
        this.category = {};
        this.submitted = false;
        this.categoryDialog = true;
    }

    editCategory(category: Category) {
        this.category = { ...category };
        this.categoryDialog = true;
    }

    hideDialog() {
        this.categoryDialog = false;
        this.submitted = false;
    }

    deleteCategory(category: Category) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + category.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.categoryService.deleteCategory(category.id!).subscribe(
                    () => {
                        this.categories.set(this.categories().filter((val) => val.id !== category.id));
                        this.category = {};
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            key: 'successes',
                            detail: 'Category Deleted',
                            life: 3000
                        });
                    },
                    (error) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            key: 'errors',
                            detail: error.error.message || 'Failed to delete category',
                            life: 3000
                        });
                    }
                );
            }
        });
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.categories().length; i++) {
            if (this.categories()[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    saveCategory() {
        this.submitted = true;
        let _categories = this.categories();
        if (this.category.name?.trim()) {
            if (this.category.id) {
                this.categoryService.updateCategory(this.category.id, this.category).subscribe((category) => {
                    this.categoryService.getCategories().subscribe((data) => {
                        this.categories.set(data);
                    });

                    this.categories.set([..._categories]);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        key: 'successes',
                        detail: 'Category Updated',
                        life: 3000
                    });
                });
            } else {
                this.categoryService.createCategory(this.category).subscribe((category) => {
                    this.categories.set([..._categories, category]);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        key: 'successes',
                        detail: 'Category Created',
                        life: 3000
                    });
                });
            }

            this.categoryDialog = false;
            this.category = {};
        }
    }
}
