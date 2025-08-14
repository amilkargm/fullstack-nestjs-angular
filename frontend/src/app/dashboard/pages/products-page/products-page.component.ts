import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { Select, SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AuthService } from '@/auth/services/auth.service';
import { ProductsService } from '@/dashboard/services/products.service';
import { Category, Product } from '@/dashboard/interfaces';
import { CategoriesService } from '@/dashboard/services/categories.service';

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
    selector: 'app-crud',
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
        ConfirmDialogModule,
        SelectModule
    ],
    templateUrl: './products-page.component.html',
    providers: [ConfirmationService]
})
export class ProductsPageComponent implements OnInit {
    authService = inject(AuthService);
    private productService = inject(ProductsService);
    private categoryService = inject(CategoriesService);
    private messageService = inject(MessageService);
    private confirmationService = inject(ConfirmationService);

    productDialog: boolean = false;

    products = signal<Product[]>([]);

    categories = signal<Category[]>([]);

    product!: Product;

    selectedCategory!: Category;

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
        this.productService.getProducts().subscribe((data) => {
            this.products.set(data);
        });

        this.categoryService.getCategories().subscribe((data) => {
            this.categories.set(data);
        });

        this.cols = [
            { field: 'id', header: 'ID', customExportHeader: 'Product ID' },
            { field: 'name', header: 'Name' },
            { field: 'description', header: 'Image' },
            { field: 'category.name', header: 'Category' },
            { field: 'stock', header: 'stock' }
        ];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    editProduct(product: Product) {
        this.product = { ...product };
        this.productDialog = true;
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    deleteProduct(product: Product) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + product.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.productService.deleteProduct(product.id!).subscribe(
                    () => {
                        this.products.set(this.products().filter((val) => val.id !== product.id));
                        this.product = {};
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            key: 'successes',
                            detail: 'Product Deleted',
                            life: 3000
                        });
                    },
                    (error) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            key: 'errors',
                            detail: error.error.message || 'Failed to delete product',
                            life: 3000
                        });
                    }
                );
            }
        });
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.products().length; i++) {
            if (this.products()[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    saveProduct() {
        this.submitted = true;
        let _products = this.products();
        if (this.product.name?.trim()) {
            if (this.selectedCategory) {
                this.product.category = this.selectedCategory;
            }
            if (this.product.id) {
                this.productService.updateProduct(this.product.id, this.product).subscribe((product) => {
                    this.productService.getProducts().subscribe((data) => {
                        this.products.set(data);
                    });

                    this.products.set([..._products]);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        key: 'successes',
                        detail: 'Product Updated',
                        life: 3000
                    });
                });
            } else {
                this.productService.createProduct(this.product).subscribe((product) => {
                    this.products.set([..._products, product]);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        key: 'successes',
                        detail: 'Product Created',
                        life: 3000
                    });
                });
            }

            this.productDialog = false;
            this.product = {};
            this.selectedCategory = {};
        }
    }
}
